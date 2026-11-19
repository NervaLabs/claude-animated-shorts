// Flat 2D cards (characters, effects, contact shadows) composited into the 3D world. Drawn on Canvas2D in design
// units, cached as textures by key at one of three resolutions chosen from the projected size. Upright cards turn
// about the vertical axis to face the camera (or keep a fixed yaw); flat cards lie on the ground. The fragment shader
// tests depth against the world by hand (Post.worldDepth), takes the scene light tint, a soft top-lit gradient and
// the scene fog. Cards are never inked by the world ink pass.
import * as THREE from "three";
import type { V3 } from "../core/time.ts";

export type CardDraw = {
  key: string; cw: number; ch: number; draw: (g: CanvasRenderingContext2D) => void;
  pos: V3; h: number; anchor?: number; flat?: boolean; yaw?: number; roll?: number; flip?: boolean;
  lit?: number; emissive?: boolean; alpha?: number; fixedYaw?: boolean; shadow?: boolean; z?: number;
};

const VS = `varying vec2 vUv; varying float vViewZ; varying float vYv;
void main(){ vUv = uv; vYv = uv.y; vec4 mv = modelViewMatrix * vec4(position, 1.0); vViewZ = -mv.z; gl_Position = projectionMatrix * mv; }`;
const FS = `uniform sampler2D map, tWD; uniform vec2 uRes; uniform vec3 uTint, uFog; uniform float uLit, uEm, uAlpha, uFogNear, uFogFar, uBias;
varying vec2 vUv; varying float vViewZ; varying float vYv;
void main(){
  float wd = texture2D(tWD, gl_FragCoord.xy / uRes).x;
  if (gl_FragCoord.z > wd + uBias) discard;
  vec4 t = texture2D(map, vUv);
  if (t.a < 0.02) discard;
  vec3 c = t.rgb;
  vec3 lit = mix(vec3(1.0), uTint * (0.93 + 0.1 * vYv), uLit);
  c = mix(c * lit, c * 1.15, uEm);
  float fogK = smoothstep(uFogNear, uFogFar, vViewZ) * (1.0 - uEm * 0.7);
  c = mix(c, uFog, fogK * 0.85);
  gl_FragColor = vec4(c, t.a * uAlpha);
}`;

type Tex = { tex: THREE.CanvasTexture; used: number };
export class CardLayer {
  scene = new THREE.Scene();
  private pool: THREE.Mesh[] = [];
  private used = 0;
  private texs = new Map<string, Tex>();
  private tick = 0;
  private geo = new THREE.PlaneGeometry(1, 1);
  private shared: Record<string, THREE.IUniform>;
  constructor(depth: THREE.DepthTexture, W: number, H: number) {
    this.shared = { tWD: { value: depth }, uRes: { value: new THREE.Vector2(W, H) }, uTint: { value: new THREE.Color(1, 1, 1) },
      uFog: { value: new THREE.Color() }, uFogNear: { value: 50 }, uFogFar: { value: 500 } };
  }
  setLight(tint: string, fog: string, near: number, far: number) {
    (this.shared.uTint.value as THREE.Color).set(tint); (this.shared.uFog.value as THREE.Color).set(fog);
    this.shared.uFogNear.value = near; this.shared.uFogFar.value = far;
  }
  private texture(c: CardDraw, scale: number) {
    const k = `${c.key}@${scale}`;
    let t = this.texs.get(k);
    if (!t) {
      const cv = document.createElement("canvas");
      cv.width = Math.max(4, Math.round(c.cw * scale)); cv.height = Math.max(4, Math.round(c.ch * scale));
      const g = cv.getContext("2d")!;
      g.scale(scale, scale); c.draw(g);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 1; tex.generateMipmaps = true; tex.minFilter = THREE.LinearMipmapLinearFilter;
      t = { tex, used: 0 }; this.texs.set(k, t);
      if (this.texs.size > 260) this.evict();
    }
    t.used = this.tick;
    return t.tex;
  }
  private evict() {
    const old = [...this.texs.entries()].sort((a, b) => a[1].used - b[1].used).slice(0, 60);
    for (const [k, v] of old) { if (v.used === this.tick) continue; v.tex.dispose(); this.texs.delete(k); }
  }
  begin() { this.tick++; this.used = 0; }
  private mesh() {
    let m = this.pool[this.used];
    if (!m) {
      const mat = new THREE.ShaderMaterial({ uniforms: { ...this.shared, map: { value: null }, uLit: { value: 1 }, uEm: { value: 0 }, uAlpha: { value: 1 }, uBias: { value: 1e-5 } },
        vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: true, side: THREE.DoubleSide });
      m = new THREE.Mesh(this.geo, mat); m.frustumCulled = false; this.pool.push(m); this.scene.add(m);
    }
    this.used++; m.visible = true;
    return m;
  }
  add(c: CardDraw, cam: THREE.PerspectiveCamera, Hpx: number) {
    const w = (c.h * c.cw) / c.ch;
    const dist = Math.max(0.5, cam.position.distanceTo(new THREE.Vector3(...c.pos)));
    const px = (c.h / (2 * dist * Math.tan((cam.fov * Math.PI) / 360))) * Hpx;
    const want = (px * 1.25) / c.ch, scale = want > 0.6 ? 1 : want > 0.3 ? 0.5 : want > 0.12 ? 0.25 : 0.125;
    const m = this.mesh(), mat = m.material as THREE.ShaderMaterial;
    mat.uniforms.map.value = this.texture(c, scale);
    mat.uniforms.uLit.value = c.lit ?? 1; mat.uniforms.uEm.value = c.emissive ? 1 : 0; mat.uniforms.uAlpha.value = c.alpha ?? 1;
    mat.depthWrite = !c.shadow; mat.uniforms.uBias.value = c.flat ? 4e-4 : 1e-5;
    m.renderOrder = c.shadow ? 1 : 2 + (c.z ?? 0);
    const anchor = c.anchor ?? 0.975;
    m.scale.set(c.flip ? -w : w, c.h, 1);
    m.rotation.set(0, 0, 0);
    if (c.flat) {
      m.position.set(c.pos[0], c.pos[1] + 0.02, c.pos[2]);
      m.rotation.set(-Math.PI / 2, 0, c.yaw ?? 0, "YXZ");
      m.rotation.order = "YXZ"; m.rotation.y = c.yaw ?? 0; m.rotation.x = -Math.PI / 2; m.rotation.z = 0;
    } else {
      const yaw = c.fixedYaw ? c.yaw ?? 0 : Math.atan2(cam.position.x - c.pos[0], cam.position.z - c.pos[2]);
      m.rotation.order = "YXZ"; m.rotation.y = yaw; m.rotation.z = c.roll ?? 0;
      // anchor point of the canvas sits at pos: lift the plane centre by (anchor - 0.5) * h along its own up
      const up = new THREE.Vector3(-Math.sin(c.roll ?? 0), Math.cos(c.roll ?? 0), 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      const d = (anchor - 0.5) * c.h;
      m.position.set(c.pos[0] + up.x * d, c.pos[1] + up.y * d, c.pos[2] + up.z * d);
    }
  }
  end(cam: THREE.PerspectiveCamera) {
    for (let i = this.used; i < this.pool.length; i++) this.pool[i].visible = false;
    // back-to-front within the same renderOrder: three sorts transparent objects by depth already
    void cam;
  }
}
