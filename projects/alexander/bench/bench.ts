import * as THREE from "three";
const W = 1920, H = 1080;
const canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H; document.body.appendChild(canvas);
const r = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
r.setPixelRatio(1); r.setSize(W, H, false);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x6688cc);
const cam = new THREE.PerspectiveCamera(40, W / H, 0.2, 800); cam.position.set(0, 4, 18);
scene.add(new THREE.HemisphereLight(0xbbccff, 0x443355, 1.2)); const sun = new THREE.DirectionalLight(0xffeedd, 2); sun.position.set(5, 10, 4); scene.add(sun);
const tex = (() => { const c = document.createElement("canvas"); c.width = c.height = 1024; const g = c.getContext("2d")!; for (let i = 0; i < 400; i++) { g.fillStyle = `hsl(${30 + Math.random() * 20},40%,${40 + Math.random() * 30}%)`; g.fillRect(Math.random() * 1024, Math.random() * 1024, 60, 30); } return new THREE.CanvasTexture(c); })();
const mat = new THREE.MeshLambertMaterial({ map: tex });
for (let i = 0; i < 300; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(1 + Math.random() * 3, 1 + Math.random() * 6, 1 + Math.random() * 3), mat); m.position.set((Math.random() - .5) * 80, 0, -Math.random() * 120); scene.add(m); }
const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), mat); ground.rotation.x = -Math.PI / 2; scene.add(ground);
const card = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5 });
for (let i = 0; i < 400; i++) { const s = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.8), card); s.position.set((Math.random() - .5) * 30, 0.9, -Math.random() * 40); scene.add(s); }
// post: depth+normal target, edge pass, blur pass
const rt = new THREE.WebGLRenderTarget(W, H, { depthTexture: new THREE.DepthTexture(W, H), samples: 0 });
const rt2 = new THREE.WebGLRenderTarget(W, H);
const quad = (frag: string, u: any) => { const m = new THREE.ShaderMaterial({ uniforms: u, vertexShader: "varying vec2 v;void main(){v=uv;gl_Position=vec4(position.xy,0.,1.);}", fragmentShader: frag }); const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m)); return s; };
const oc = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const edge = quad(`uniform sampler2D c,d;uniform vec2 px;varying vec2 v;
float L(vec2 o){float z=texture2D(d,v+o).x;return 0.2/(1.0-z*0.999);}
void main(){vec3 col=texture2D(c,v).rgb;float z=L(vec2(0));float e=0.;for(int i=0;i<4;i++){vec2 o=vec2(i==0?1.:i==1?-1.:0.,i==2?1.:i==3?-1.:0.)*px*1.5;e+=abs(L(o)-z);}e=smoothstep(.02,.06,e/z);gl_FragColor=vec4(mix(col,vec3(.04),e),1.);}`, { c: { value: rt.texture }, d: { value: rt.depthTexture }, px: { value: new THREE.Vector2(1 / W, 1 / H) } });
const blur = quad(`uniform sampler2D c;uniform vec2 px;varying vec2 v;void main(){vec3 a=vec3(0);for(int i=-6;i<=6;i++)for(int j=-6;j<=6;j+=3)a+=texture2D(c,v+vec2(i,j)*px*2.).rgb;gl_FragColor=vec4(a/65.,1.);}`, { c: { value: rt2.texture }, px: { value: new THREE.Vector2(1 / W, 1 / H) } });
(window as any).frame = (f: number, post: boolean) => {
  cam.position.x = Math.sin(f * .01) * 4; cam.lookAt(0, 2, -10);
  const t0 = performance.now();
  if (post) { r.setRenderTarget(rt); r.render(scene, cam); r.setRenderTarget(rt2); r.render(edge, oc); r.setRenderTarget(null); r.render(blur, oc); }
  else { r.setRenderTarget(null); r.render(scene, cam); }
  const px = new Uint8Array(4); r.getContext().readPixels(0, 0, 1, 1, 0x1908, 0x1401, px);
  return performance.now() - t0;
};
(window as any).grab = () => canvas.toDataURL("image/jpeg", 0.9);
