// Post chain, specified at 1920x1080 and scaled by output height / 1080:
//   1. world -> rtW (colour + depth)                 [sky, sets, props: the inked layer]
//   2. cards -> rtC (colour + depth), each fragment depth-tested by hand against rtW's depth, so the world ink never
//      touches characters and characters stay correctly hidden behind walls
//   3. comp: world colour + ink (depth silhouettes + depth-normal creases), cards over it -> rtS (+ CoC in alpha)
//   4. half-res lens blur of rtS (gather, CoC-weighted 24 taps) -> rtB; quarter-res glow of bright warm pixels -> rtG
//   5. final: mix(sharp, blur, CoC) + glow, grade (lift/gamma/gain, saturation), vignette, fade/flash -> screen
import * as THREE from "three";

export type Grade = { lift: [number, number, number]; gamma: [number, number, number]; gain: [number, number, number]; sat: number; vignette: number };
export type PostParams = { cInf: number; focus: number; grade: Grade; ink: number; glow: number; fade: number; flash: number; fadeCol?: [number, number, number] };

const VS = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
const LIN = `uniform float uNear, uFar;
float linZ(float d){ float z = d * 2.0 - 1.0; return 2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }`;

const INK_FS = `${LIN}
uniform sampler2D tW, tWD, tC, tCD; uniform vec2 uPx; uniform float uInk, uLine, uCInf, uFocus, uMaxCoC;
varying vec2 vUv;
vec3 viewPos(vec2 uv){ float z = linZ(texture2D(tWD, uv).x); return vec3((uv - 0.5) * z, z); }
void main(){
  vec4 w = texture2D(tW, vUv);
  float dW = texture2D(tWD, vUv).x;
  float z = linZ(dW);
  // silhouettes: this pixel is inked when a neighbour within the line radius is clearly farther away (near side only,
  // so the line hugs the object in front); creases come from the ink edge geometry drawn in the world pass
  float far = 0.0;
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.785398;
    vec2 d = vec2(cos(a), sin(a)) * uPx * uLine;
    float z1 = linZ(texture2D(tWD, vUv + d).x), z2 = linZ(texture2D(tWD, vUv + d * 0.5).x);
    far = max(far, max(z1, z2) - z);
  }
  float sky = step(0.99999, dW);
  float e = smoothstep(0.06, 0.14, far / z) * uInk * (1.0 - sky);
  vec3 col = mix(w.rgb, vec3(0.043, 0.039, 0.047), e);
  // cards over the world
  vec4 c = texture2D(tC, vUv);
  float dC = texture2D(tCD, vUv).x;
  col = mix(col, c.rgb / max(c.a, 1e-4), c.a);
  float zz = (c.a > 0.5) ? linZ(dC) : z;
  float coc = clamp(uCInf * abs(1.0 - uFocus / zz), 0.0, uMaxCoC) / uMaxCoC;
  gl_FragColor = vec4(col, coc);
}`;

const BLUR_FS = `uniform sampler2D tS; uniform vec2 uPx; uniform float uMaxCoC; varying vec2 vUv;
void main(){
  vec4 c0 = texture2D(tS, vUv);
  vec3 acc = c0.rgb; float wsum = 1.0;
  float r0 = c0.a * uMaxCoC;
  for (int i = 0; i < 24; i++) {
    float fi = float(i);
    float a = fi * 2.39996; float rr = sqrt((fi + 0.5) / 24.0);
    vec2 off = vec2(cos(a), sin(a)) * rr * uMaxCoC * uPx;
    vec4 s = texture2D(tS, vUv + off);
    float rs = s.a * uMaxCoC, d = rr * uMaxCoC;
    // a sample contributes if its own blur reaches here (background bleeding behind sharp foreground is limited)
    float w = smoothstep(d - 1.5, d + 0.5, min(rs, r0 + 2.0) ) ;
    acc += s.rgb * w; wsum += w;
  }
  gl_FragColor = vec4(acc / wsum, c0.a);
}`;

const GLOW_FS = `uniform sampler2D tS; uniform vec2 uPx; varying vec2 vUv;
vec3 bright(vec3 c){ float l = dot(c, vec3(0.3, 0.59, 0.11)); float s = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
  return c * smoothstep(0.78, 0.95, l) * smoothstep(0.25, 0.5, s) * step(c.b, c.r); }
void main(){
  vec3 acc = vec3(0.0); float ws = 0.0;
  for (int x = -2; x <= 2; x++) for (int y = -2; y <= 2; y++) {
    float w = exp(-float(x * x + y * y) / 3.0);
    acc += bright(texture2D(tS, vUv + vec2(float(x), float(y)) * uPx * 10.0).rgb) * w; ws += w;
  }
  gl_FragColor = vec4(acc / ws, 1.0);
}`;

const FINAL_FS = `uniform sampler2D tS, tB, tG; uniform vec3 uLift, uGamma, uGain, uFadeCol; uniform float uSat, uVig, uGlow, uFade, uFlash;
varying vec2 vUv;
void main(){
  vec4 s = texture2D(tS, vUv);
  vec3 b = texture2D(tB, vUv).rgb;
  vec3 c = mix(s.rgb, b, smoothstep(0.04, 0.35, s.a));
  c += texture2D(tG, vUv).rgb * uGlow;
  c = clamp(uGain * (c + uLift * (1.0 - c)), 0.0, 1.0);
  c = pow(c, 1.0 / uGamma);
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, uSat);
  vec2 q = vUv - 0.5; c *= 1.0 - uVig * smoothstep(0.35, 0.85, length(q * vec2(1.0, 0.75)) * 1.4);
  c = mix(c, uFadeCol, uFade);
  c = mix(c, vec3(1.0), uFlash);
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

const quad = (frag: string, uniforms: Record<string, THREE.IUniform>) => {
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VS, fragmentShader: frag, depthTest: false, depthWrite: false });
  const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
  return { scene: s, u: uniforms };
};

export class Post {
  r: THREE.WebGLRenderer; W: number; H: number; k: number;
  rtW: THREE.WebGLRenderTarget; rtC: THREE.WebGLRenderTarget; rtS: THREE.WebGLRenderTarget; rtB: THREE.WebGLRenderTarget; rtG: THREE.WebGLRenderTarget;
  ink; blur; glow; fin; oc = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  constructor(r: THREE.WebGLRenderer, W: number, H: number) {
    this.r = r; this.W = W; this.H = H; this.k = H / 1080;
    const mk = (w: number, h: number, depth: boolean) => new THREE.WebGLRenderTarget(w, h, {
      depthTexture: depth ? new THREE.DepthTexture(w, h) : undefined, depthBuffer: depth, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    this.rtW = mk(W, H, true); this.rtC = mk(W, H, true); this.rtS = mk(W, H, false);
    this.rtB = mk(W >> 1, H >> 1, false); this.rtG = mk(W >> 2, H >> 2, false);
    const maxCoC = 24 * this.k;
    this.ink = quad(INK_FS, {
      tW: { value: this.rtW.texture }, tWD: { value: this.rtW.depthTexture }, tC: { value: this.rtC.texture }, tCD: { value: this.rtC.depthTexture },
      uPx: { value: new THREE.Vector2(1 / W, 1 / H) }, uNear: { value: 0.2 }, uFar: { value: 1500 }, uInk: { value: 1 }, uLine: { value: 3 * this.k },
      uCInf: { value: 0 }, uFocus: { value: 10 }, uMaxCoC: { value: maxCoC } });
    this.blur = quad(BLUR_FS, { tS: { value: this.rtS.texture }, uPx: { value: new THREE.Vector2(1 / W, 1 / H) }, uMaxCoC: { value: maxCoC } });
    this.glow = quad(GLOW_FS, { tS: { value: this.rtB.texture }, uPx: { value: new THREE.Vector2(1 / W, 1 / H) } });
    this.fin = quad(FINAL_FS, { tS: { value: this.rtS.texture }, tB: { value: this.rtB.texture }, tG: { value: this.rtG.texture },
      uLift: { value: new THREE.Vector3() }, uGamma: { value: new THREE.Vector3(1, 1, 1) }, uGain: { value: new THREE.Vector3(1, 1, 1) },
      uSat: { value: 1 }, uVig: { value: 0.2 }, uGlow: { value: 0.8 }, uFade: { value: 0 }, uFlash: { value: 0 }, uFadeCol: { value: new THREE.Vector3() } });
  }
  /** world depth texture, for the hand depth test in the card shader */
  get worldDepth() { return this.rtW.depthTexture!; }
  render(world: THREE.Scene, cards: THREE.Scene, cam: THREE.PerspectiveCamera, p: PostParams) {
    const r = this.r, prof = (globalThis as any).__prof as number[] | undefined, gl = r.getContext();
    let tp = performance.now();
    const mark = (i: number) => { if (!prof) return; const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); const t = performance.now(); prof[i] = (prof[i] ?? 0) + t - tp; tp = t; };
    r.setClearColor(0x000000, 0);
    r.setRenderTarget(this.rtW); r.clear(); r.render(world, cam); mark(0);
    r.setRenderTarget(this.rtC); r.clear(); r.render(cards, cam); mark(1);
    const iu = this.ink.u;
    iu.uNear.value = cam.near; iu.uFar.value = cam.far; iu.uInk.value = p.ink; iu.uCInf.value = p.cInf * this.k; iu.uFocus.value = p.focus;
    r.setRenderTarget(this.rtS); r.render(this.ink.scene, this.oc); mark(2);
    r.setRenderTarget(this.rtB); r.render(this.blur.scene, this.oc); mark(3);
    r.setRenderTarget(this.rtG); r.render(this.glow.scene, this.oc); mark(4);
    const f = this.fin.u, g = p.grade;
    f.uLift.value.set(...g.lift); f.uGamma.value.set(...g.gamma); f.uGain.value.set(...g.gain); f.uSat.value = g.sat; f.uVig.value = g.vignette;
    f.uGlow.value = p.glow; f.uFade.value = p.fade; f.uFlash.value = p.flash; f.uFadeCol.value.set(...(p.fadeCol ?? [0, 0, 0]));
    r.setRenderTarget(null); r.render(this.fin.scene, this.oc); mark(5);
  }
}
