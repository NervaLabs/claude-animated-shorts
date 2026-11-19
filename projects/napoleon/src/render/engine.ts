// The frame engine: one three.js world (sky dome, lights, all sets; only the active one is visible), a card layer,
// the post chain, and a 2D output canvas where world renders, 2D layers (maps, titles), captions and fades are
// composited. Everything is a pure function of the frame spec: no state carries between frames except caches.
import * as THREE from "three";
import { Post } from "./post.ts";
import { CardLayer, type CardDraw } from "./cards.ts";
import { LIGHTS, type Light } from "./lights.ts";
import type { CamOut } from "../core/camera.ts";
import type { V3 } from "../core/time.ts";

export type SetHandle = {
  root: THREE.Group; anchors: Record<string, V3>;
  update?: (f: number, state: Record<string, number>, light: Light) => void;
  /** geometry moves per frame: re-render the shadow map every frame */
  dynamic?: boolean;
};
export type PointL = { pos: V3; color: string; i: number; d: number };
export type WorldFrame = {
  set: string; light: Light; cam: CamOut; cards: CardDraw[]; state?: Record<string, number>; f: number;
  dof?: { cInf: number; focus: number }; ink?: number; shadowAt?: V3; shadowSize?: number; points?: PointL[];
};
export type Layer = { alpha: number; world?: WorldFrame; paint?: (g: CanvasRenderingContext2D, W: number, H: number) => void };
export type FrameSpec = { layers: Layer[]; over?: (g: CanvasRenderingContext2D, W: number, H: number) => void; fade?: number; flash?: number };

const SKY_VS = `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`;
const SKY_FS = `uniform vec3 uTop, uHor, uSun; uniform vec3 uSunDir; uniform float uMoon, uStars; varying vec3 vDir;
float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
void main(){
  vec3 d = normalize(vDir);
  float t = pow(clamp(d.y, 0.0, 1.0), 0.55);
  vec3 c = mix(uHor * 1.04, uTop, t);
  c = mix(c, uHor * 0.92, smoothstep(0.0, -0.08, d.y));
  float s = max(dot(d, normalize(uSunDir)), 0.0);
  c += uSun * pow(s, 18.0) * 0.25 * (1.0 - uMoon);
  if (uMoon > 0.5) {
    float m = smoothstep(0.9993, 0.9996, s);
    c = mix(c, vec3(0.97, 0.97, 1.0), m) + vec3(0.6, 0.6, 0.9) * pow(s, 60.0) * 0.35;
    vec3 q = floor(d * 260.0);
    float st = step(0.9975, h(q)) * smoothstep(0.05, 0.4, d.y);
    c += vec3(st) * 0.8 * uStars;
  }
  gl_FragColor = vec4(c, 1.0);
}`;

export class Engine {
  W: number; H: number;
  gl: HTMLCanvasElement; out: HTMLCanvasElement; g: CanvasRenderingContext2D;
  r: THREE.WebGLRenderer; post: Post; cards: CardLayer;
  world = new THREE.Scene(); cam: THREE.PerspectiveCamera;
  sky: THREE.Mesh; hemi: THREE.HemisphereLight; sun: THREE.DirectionalLight; points: THREE.PointLight[] = [];
  sets = new Map<string, SetHandle>();
  private shadowKey = "";
  constructor(W = 1920, H = 1080) {
    this.W = W; this.H = H;
    this.gl = document.createElement("canvas"); this.gl.width = W; this.gl.height = H;
    this.out = document.createElement("canvas"); this.out.width = W; this.out.height = H;
    document.body.appendChild(this.out);
    this.g = this.out.getContext("2d")!;
    this.r = new THREE.WebGLRenderer({ canvas: this.gl, antialias: false, preserveDrawingBuffer: true, alpha: false, powerPreference: "high-performance" });
    this.r.setPixelRatio(1); this.r.setSize(W, H, false);
    this.r.shadowMap.enabled = true; this.r.shadowMap.type = THREE.PCFShadowMap; this.r.shadowMap.autoUpdate = false;
    this.r.outputColorSpace = THREE.SRGBColorSpace; this.r.toneMapping = THREE.NoToneMapping;
    this.post = new Post(this.r, W, H);
    this.cards = new CardLayer(this.post.worldDepth, W, H);
    this.cam = new THREE.PerspectiveCamera(40, W / H, 0.2, 1500);
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 16), new THREE.ShaderMaterial({
      uniforms: { uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uSun: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3() },
        uMoon: { value: 0 }, uStars: { value: 0 } }, vertexShader: SKY_VS, fragmentShader: SKY_FS, side: THREE.BackSide, depthWrite: false, fog: false }));
    this.sky.renderOrder = -10; this.sky.frustumCulled = false;
    this.world.add(this.sky);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x888888, 1); this.world.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 2); this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048); this.sun.shadow.bias = -0.0004; this.sun.shadow.normalBias = 0.03; this.sun.shadow.radius = 3;
    this.world.add(this.sun); this.world.add(this.sun.target);
    for (let i = 0; i < 4; i++) { const p = new THREE.PointLight(0xffaa55, 0, 10, 1.6); this.points.push(p); this.world.add(p); }
    this.world.fog = new THREE.Fog(0xffffff, 50, 500);
  }
  addSet(name: string, s: SetHandle) { s.root.visible = false; this.sets.set(name, s); this.world.add(s.root); }

  renderWorld(wf: WorldFrame) {
    const L = LIGHTS[wf.light];
    for (const [n, s] of this.sets) s.root.visible = n === wf.set;
    const set = this.sets.get(wf.set);
    if (!set) throw new Error(`unknown set ${wf.set}`);
    set.update?.(wf.f, wf.state ?? {}, wf.light);
    // light
    const su = (this.sky.material as THREE.ShaderMaterial).uniforms;
    su.uTop.value.set(L.skyTop); su.uHor.value.set(L.skyHor); su.uSun.value.set(L.sun); su.uSunDir.value.set(...L.sunDir);
    su.uMoon.value = L.moon ? 1 : 0; su.uStars.value = L.stars ? 1 : 0;
    const fog = this.world.fog as THREE.Fog; fog.color.set(L.fog); fog.near = L.fogNear; fog.far = L.fogFar;
    this.hemi.color.set(L.hemiSky); this.hemi.groundColor.set(L.hemiGround); this.hemi.intensity = L.hemiI;
    this.sun.color.set(L.sun); this.sun.intensity = L.sunI;
    const c = wf.cam;
    const at = new THREE.Vector3(...(wf.shadowAt ?? c.look)), sd = new THREE.Vector3(...L.sunDir).normalize();
    this.sun.position.copy(at).addScaledVector(sd, 120); this.sun.target.position.copy(at);
    const S = wf.shadowSize ?? 40, sc = this.sun.shadow.camera;
    sc.left = -S; sc.right = S; sc.top = S; sc.bottom = -S; sc.near = 1; sc.far = 300; sc.updateProjectionMatrix();
    // the shadow map only changes with the set, light, shadow box or (for sets that animate) their state
    const sk = `${wf.set}|${wf.light}|${at.toArray().join(",")}|${S}|${set.dynamic ? JSON.stringify(wf.state ?? {}) + wf.f : ""}`;
    if (sk !== this.shadowKey) { this.r.shadowMap.needsUpdate = true; this.shadowKey = sk; }
    this.points.forEach((p, i) => {
      const q = wf.points?.[i];
      if (q) { p.position.set(...q.pos); p.color.set(q.color); p.intensity = q.i; p.distance = q.d; } else p.intensity = 0;
    });
    // camera
    const cam = this.cam;
    cam.position.set(...c.pos); cam.fov = c.fov; cam.up.set(0, 1, 0); cam.lookAt(...c.look);
    if (c.roll) cam.rotateZ((c.roll * Math.PI) / 180);
    cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    this.sky.position.copy(cam.position);
    // cards
    this.cards.setLight(L.card, L.fog, L.fogNear, L.fogFar);
    this.cards.begin();
    for (const cd of wf.cards) this.cards.add(cd, cam, this.H);
    this.cards.end(cam);
    const look = new THREE.Vector3(...c.look);
    this.post.render(this.world, this.cards.scene, cam, {
      cInf: wf.dof?.cInf ?? 0, focus: wf.dof?.focus ?? cam.position.distanceTo(look), grade: L.grade, ink: wf.ink ?? 1, glow: L.glow, fade: 0, flash: 0 });
  }

  frame(spec: FrameSpec) {
    const g = this.g, W = this.W, H = this.H;
    g.save(); g.globalAlpha = 1; g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
    for (const l of spec.layers) {
      if (l.alpha <= 0) continue;
      g.globalAlpha = Math.min(1, l.alpha);
      if (l.world) { this.renderWorld(l.world); g.drawImage(this.gl, 0, 0, W, H); }
      if (l.paint) {
        if (l.alpha >= 1) l.paint(g, W, H);
        else { // draw into a scratch canvas so the 2D layer fades as one picture
          const s = this.scratch(); const sg = s.getContext("2d")!; sg.setTransform(1, 0, 0, 1, 0, 0); sg.clearRect(0, 0, W, H); sg.globalAlpha = 1;
          l.paint(sg, W, H); g.drawImage(s, 0, 0);
        }
      }
    }
    g.globalAlpha = 1;
    spec.over?.(g, W, H);
    if (spec.fade) { g.globalAlpha = Math.min(1, spec.fade); g.fillStyle = "#000"; g.fillRect(0, 0, W, H); }
    if (spec.flash) { g.globalAlpha = Math.min(1, spec.flash); g.fillStyle = "#fff"; g.fillRect(0, 0, W, H); }
    g.restore();
  }
  private _scratch?: HTMLCanvasElement;
  private scratch() { if (!this._scratch) { this._scratch = document.createElement("canvas"); this._scratch.width = this.W; this._scratch.height = this.H; } return this._scratch; }
  jpeg(q = 0.92) { return this.out.toDataURL("image/jpeg", q); }
}
