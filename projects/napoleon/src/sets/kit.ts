// Building kit for the ancient sets: painted materials (cached canvas textures) and low-poly pieces (Doric columns,
// pediments, Greek houses, mud-brick blocks, hills, trees, water). Round things opt out of crease ink
// (userData.ink = false) and rely on the depth silhouette ink.
import * as THREE from "three";
import { ctex, rep, rng, jit, roofHD, grassHD, stoneHD } from "./paint.ts";
import type { V3 } from "../core/time.ts";

export { rep, roofHD, grassHD, stoneHD };
export const lam = (o: { map?: THREE.Texture; color?: string; emissive?: string; side?: THREE.Side }) => {
  const m = new THREE.MeshLambertMaterial({ map: o.map ?? null, color: o.color ?? "#ffffff", side: o.side ?? THREE.FrontSide });
  if (o.emissive) m.emissive.set(o.emissive);
  return m;
};
const blot = (g: CanvasRenderingContext2D, r: () => number, W: number, H: number, n: number, rgb: string, a: number, s0: number, s1: number) => {
  for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, s = s0 + r() * (s1 - s0); const gr = g.createRadialGradient(x, y, 0, x, y, s); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(x - s, y - s, 2 * s, 2 * s); }
};
// ---- painted textures
export const marble = (col = "#efe9dc") => ctex("marble" + col, 512, 512, (g, r) => {
  g.fillStyle = col; g.fillRect(0, 0, 512, 512); blot(g, r, 512, 512, 40, "180,170,150", 0.08, 30, 120); blot(g, r, 512, 512, 25, "255,255,255", 0.12, 20, 90);
  g.strokeStyle = "rgba(150,140,130,0.25)"; g.lineWidth = 1.5; for (let i = 0; i < 6; i++) { g.beginPath(); let x = r() * 512, y = 0; g.moveTo(x, y); while (y < 512) { x += (r() - 0.5) * 40; y += 30; g.lineTo(x, y); } g.stroke(); }
});
export const blocks = (key: string, col: string, mortar: string, bw = 128, bh = 64) => ctex("blk" + key, 512, 512, (g, r) => {
  g.fillStyle = mortar; g.fillRect(0, 0, 512, 512);
  for (let y = 0, row = 0; y < 512; y += bh, row++) for (let x = -(row % 2) * bw / 2; x < 512; x += bw) { g.fillStyle = jit(r, col, 0.07, 3, 0.1); g.fillRect(x + 2, y + 2, bw - 4, bh - 4); }
  blot(g, r, 512, 512, 30, "90,70,50", 0.06, 20, 80);
});
export const plaster = (col: string) => ctex("plaster" + col, 512, 512, (g, r) => { g.fillStyle = col; g.fillRect(0, 0, 512, 512); blot(g, r, 512, 512, 50, "140,110,80", 0.06, 30, 140); blot(g, r, 512, 512, 30, "255,255,255", 0.08, 20, 100); g.fillStyle = "rgba(90,70,50,0.25)"; g.fillRect(0, 470, 512, 42); });
export const ground = (key: string, base: string, specks: string[]) => ctex("gnd" + key, 1024, 1024, (g, r) => {
  g.fillStyle = base; g.fillRect(0, 0, 1024, 1024);
  blot(g, r, 1024, 1024, 60, "255,255,255", 0.05, 60, 220); blot(g, r, 1024, 1024, 60, "60,40,30", 0.06, 60, 220);
  for (let i = 0; i < 900; i++) { g.fillStyle = specks[i % specks.length]; const x = r() * 1024, y = r() * 1024, s = 1.5 + r() * 3; g.fillRect(x, y, s * 2.2, s); }
});
export const sand = () => ground("sand", "#e7cf98", ["#d6b87a", "#f3e2b4", "#c9a66a"]);
export const dirt = () => ground("dirt", "#c9a877", ["#b08e5e", "#dcc196", "#a58459"]);
export const dryGrass = () => ground("drygrass", "#a9b862", ["#8fa04e", "#c4c97a", "#7d8f45", "#d6c98a"]);
export const paving = () => ctex("paving", 512, 512, (g, r) => {
  g.fillStyle = "#b9ab92"; g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 128) for (let x = 0; x < 512; x += 128) { g.fillStyle = jit(r, "#d8ccb4", 0.08, 4, 0.1); g.fillRect(x + 3, y + 3, 122, 122); }
  blot(g, r, 512, 512, 20, "90,70,50", 0.07, 30, 90);
});
export const flutes = (col = "#ece5d6") => ctex("flutes" + col, 256, 64, (g) => {
  g.fillStyle = col; g.fillRect(0, 0, 256, 64);
  for (let i = 0; i < 16; i++) { const gr = g.createLinearGradient(i * 16, 0, i * 16 + 16, 0); gr.addColorStop(0, "rgba(120,105,90,0.32)"); gr.addColorStop(0.5, "rgba(255,255,255,0.12)"); gr.addColorStop(1, "rgba(120,105,90,0.32)"); g.fillStyle = gr; g.fillRect(i * 16, 0, 16, 64); }
});
export const glazed = () => ctex("glazed", 1024, 512, (g, r) => { // Babylon: blue glazed bricks with yellow striding animals in relief rows
  g.fillStyle = "#1f4fa8"; g.fillRect(0, 0, 1024, 512);
  for (let y = 0; y < 512; y += 16) for (let x = (y / 16) % 2 ? -16 : 0; x < 1024; x += 32) { g.fillStyle = jit(r, "#2a5fbf", 0.12, 4, 0.1); g.fillRect(x + 1, y + 1, 30, 14); }
  const beast = (x: number, y: number, s: number) => {
    g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = "#f2c94c"; g.strokeStyle = "#7a4a1a"; g.lineWidth = 4;
    g.beginPath(); g.ellipse(0, 0, 70, 30, 0, 0, 6.283); g.fill(); g.stroke(); // body
    g.beginPath(); g.ellipse(78, -26, 28, 22, 0, 0, 6.283); g.fill(); g.stroke(); // head
    for (const lx of [-50, -30, 30, 50]) { g.beginPath(); g.rect(lx - 6, 18, 12, 46); g.fill(); g.stroke(); }
    g.beginPath(); g.moveTo(-70, -6); g.quadraticCurveTo(-110, -40, -96, -70); g.stroke();
    g.restore();
  };
  for (let i = 0; i < 4; i++) beast(130 + i * 250, 150, 0.9);
  for (let i = 0; i < 4; i++) beast(250 + i * 250, 390, 0.9);
  g.fillStyle = "#f6f1e4"; for (let x = 0; x < 1024; x += 64) { g.beginPath(); g.arc(x + 32, 18, 10, 0, 6.283); g.fill(); g.beginPath(); g.arc(x + 32, 494, 10, 0, 6.283); g.fill(); }
});
export const mudbrick = () => blocks("mud", "#d8b27a", "#b48e5c", 64, 28);
export const water = (key: string, deep: string, light: string) => ctex("water" + key, 1024, 1024, (g, r) => {
  g.fillStyle = deep; g.fillRect(0, 0, 1024, 1024);
  g.strokeStyle = light; g.lineCap = "round";
  for (let i = 0; i < 160; i++) { const x = r() * 1024, y = r() * 1024, w = 20 + r() * 60; g.lineWidth = 3 + r() * 3; g.globalAlpha = 0.5 + r() * 0.4; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w / 2, y - 8, x + w, y); g.stroke(); }
  g.globalAlpha = 1;
});
export const rock = () => ctex("rock", 512, 512, (g, r) => { g.fillStyle = "#a08f7a"; g.fillRect(0, 0, 512, 512); blot(g, r, 512, 512, 60, "60,45,40", 0.12, 20, 90); blot(g, r, 512, 512, 40, "230,220,200", 0.1, 20, 80); });
export const cloth = (col: string, stripe: string) => ctex("cloth" + col + stripe, 256, 256, (g) => { g.fillStyle = col; g.fillRect(0, 0, 256, 256); g.fillStyle = stripe; for (let x = 0; x < 256; x += 64) g.fillRect(x, 0, 18, 256); });

// ---- pieces
export type Grp = THREE.Group;
export const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, pos: V3 = [0, 0, 0], o: { rotY?: number; ink?: boolean; shadow?: boolean; parent?: THREE.Object3D } = {}) => {
  const m = new THREE.Mesh(geo, mat); m.position.set(...pos); if (o.rotY) m.rotation.y = o.rotY;
  m.castShadow = o.shadow ?? true; m.receiveShadow = true; if (o.ink === false) m.userData.ink = false;
  o.parent?.add(m); return m;
};
export const box = (w: number, h: number, d: number, mat: THREE.Material, pos: V3, parent: THREE.Object3D, rotY = 0) =>
  mesh(new THREE.BoxGeometry(w, h, d), mat, [pos[0], pos[1] + h / 2, pos[2]], { rotY, parent });
export const column = (parent: THREE.Object3D, pos: V3, h: number, r: number, col = "#ece5d6") => {
  const sh = mesh(new THREE.CylinderGeometry(r * 0.86, r, h * 0.86, 16, 1), lam({ map: rep(flutes(col), 1, 1) }), [pos[0], pos[1] + h * 0.07 + h * 0.43, pos[2]], { parent, ink: false });
  mesh(new THREE.CylinderGeometry(r * 1.25, r * 0.86, h * 0.05, 16), lam({ color: col }), [pos[0], pos[1] + h * 0.93 + h * 0.025, pos[2]], { parent, ink: false });
  box(r * 2.7, h * 0.04, r * 2.7, lam({ color: col }), [pos[0], pos[1] + h * 0.955, pos[2]], parent);
  box(r * 2.4, h * 0.07, r * 2.4, lam({ color: col }), [pos[0], pos[1], pos[2]], parent);
  return sh;
};
/** gable prism along x: width w (x), depth d (z), height h */
export const gable = (w: number, d: number, h: number, mat: THREE.Material, pos: V3, parent: THREE.Object3D, rotY = 0) => {
  const s = new THREE.Shape(); s.moveTo(-d / 2, 0); s.lineTo(d / 2, 0); s.lineTo(0, h); s.lineTo(-d / 2, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }); geo.translate(0, 0, -w / 2); geo.rotateY(Math.PI / 2);
  const m = mesh(geo, mat, pos, { parent, rotY }); return m;
};
/** a temple / palace front: stylobate steps, a row of columns, architrave, pediment and tiled roof */
export const temple = (parent: THREE.Object3D, pos: V3, w: number, d: number, nCol: number, colH: number, o: { roof?: string; marbleCol?: string; rotY?: number; back?: boolean } = {}) => {
  const g = new THREE.Group(); g.position.set(...pos); g.rotation.y = o.rotY ?? 0; parent.add(g);
  const mm = lam({ map: rep(marble(o.marbleCol), w / 6, 1) });
  for (let i = 0; i < 3; i++) box(w + 2.4 - i * 0.8, 0.35, d + 2.4 - i * 0.8, mm, [0, i * 0.35, 0], g);
  const y0 = 1.05, r = colH * 0.075;
  for (let i = 0; i < nCol; i++) column(g, [-w / 2 + (i * w) / (nCol - 1), y0, d / 2 - r * 1.4], colH, r, o.marbleCol);
  if (o.back !== false) box(w - r * 3, colH, d - r * 5, lam({ map: rep(blocks("cella", "#e4d9c2", "#c9bba2"), (w - r * 3) / 4, colH / 4) }), [0, y0, -r * 1.5], g);
  box(w + r * 3, colH * 0.12, d + r * 1.5, mm, [0, y0 + colH, 0], g);
  box(w + r * 3.2, colH * 0.05, d + r * 1.8, lam({ color: "#c0573a" }), [0, y0 + colH * 1.12, 0], g);
  const ph = w * 0.16;
  gable(d + r * 2, w + r * 3.4, ph, lam({ map: rep(roofHD(o.roof ?? "#c0573a"), 3, 3) }), [0, y0 + colH * 1.17, 0], g, Math.PI / 2);
  return g;
};
/** whitewashed Greek house with a low tiled gable roof and a couple of dark windows (painted) */
export const house = (parent: THREE.Object3D, pos: V3, w: number, d: number, h: number, rotY = 0, wall = "#efe4cf", roof = "#c0573a") => {
  const g = new THREE.Group(); g.position.set(...pos); g.rotation.y = rotY; parent.add(g);
  box(w, h, d, lam({ map: plaster(wall) }), [0, 0, 0], g);
  for (const sx of [-1, 1]) { const win = mesh(new THREE.PlaneGeometry(0.7, 0.9), lam({ color: "#3a2c3a" }), [sx * w * 0.25, h * 0.62, d / 2 + 0.01], { parent: g, shadow: false }); win.userData.ink = false; }
  mesh(new THREE.PlaneGeometry(0.9, 1.7), lam({ color: "#6a4a3a" }), [0, 0.85, d / 2 + 0.01], { parent: g, shadow: false }).userData.ink = false;
  gable(w + 0.6, d + 0.6, h * 0.28, lam({ map: rep(roofHD(roof), 2, 2) }), [0, h, 0], g);
  return g;
};
/** smooth rolling terrain: a displaced plane, height f(x, z), painted, optionally vertex-tinted by height */
export const terrain = (parent: THREE.Object3D, size: number, seg: number, hfn: (x: number, z: number) => number, map: THREE.Texture, rep_: number, pos: V3 = [0, 0, 0]) => {
  const geo = new THREE.PlaneGeometry(size, size, seg, seg); geo.rotateX(-Math.PI / 2);
  const a = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < a.count; i++) a.setY(i, hfn(a.getX(i) + pos[0], a.getZ(i) + pos[2]));
  geo.computeVertexNormals();
  const m = mesh(geo, lam({ map: rep(map, rep_, rep_) }), pos, { parent, ink: false });
  m.castShadow = false; return m;
};
export const noise2 = (x: number, z: number, seed = 1) => {
  // cheap smooth value noise (sum of sines), deterministic
  return Math.sin(x * 0.031 + seed) * Math.cos(z * 0.027 + seed * 1.7) + 0.5 * Math.sin(x * 0.067 + z * 0.051 + seed * 2.3) + 0.25 * Math.cos(x * 0.13 - z * 0.11 + seed);
};
/** storybook tree: trunk + clustered canopy blobs (olive / cypress / palm) */
export const tree = (parent: THREE.Object3D, pos: V3, kind: "olive" | "cypress" | "palm" = "olive", s = 1, seed = 1) => {
  const g = new THREE.Group(); g.position.set(...pos); g.scale.setScalar(s); parent.add(g);
  const r = rng(seed * 7 + 3);
  const trunk = lam({ color: kind === "palm" ? "#9a7a4a" : "#6a4a32" });
  if (kind === "cypress") {
    mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.2, 6), trunk, [0, 0.6, 0], { parent: g, ink: false });
    mesh(new THREE.SphereGeometry(1, 10, 8), lam({ color: jit(r, "#3f6a3a", 0.08) }), [0, 3.8, 0], { parent: g, ink: false }).scale.set(0.9, 3.2, 0.9);
  } else if (kind === "palm") {
    const tr = mesh(new THREE.CylinderGeometry(0.16, 0.24, 6, 6), trunk, [0, 3, 0], { parent: g, ink: false }); tr.rotation.z = 0.08;
    for (let i = 0; i < 7; i++) { const leaf = mesh(new THREE.SphereGeometry(1, 8, 4), lam({ color: jit(r, "#4f8a3a", 0.1) }), [0, 6.1, 0], { parent: g, ink: false }); leaf.scale.set(2.2, 0.18, 0.5); leaf.rotation.y = (i * Math.PI * 2) / 7; leaf.rotation.z = -0.35; leaf.translateX(1.4); }
  } else {
    const t = mesh(new THREE.CylinderGeometry(0.16, 0.26, 1.8, 6), trunk, [0, 0.9, 0], { parent: g, ink: false }); t.rotation.z = (r() - 0.5) * 0.3;
    for (let i = 0; i < 5; i++) mesh(new THREE.SphereGeometry(0.9 + r() * 0.5, 10, 8), lam({ color: jit(r, "#7a9a5a", 0.1, 6) }), [(r() - 0.5) * 1.8, 2.3 + r() * 0.9, (r() - 0.5) * 1.6], { parent: g, ink: false });
  }
  return g;
};
export const sea = (parent: THREE.Object3D, size: number, pos: V3, deep = "#2f7fae", light = "#9fd3ea") => {
  const t = rep(water("sea" + deep, deep, light), size / 30, size / 30);
  const m = mesh(new THREE.PlaneGeometry(size, size), lam({ map: t }), pos, { parent, ink: false, shadow: false }); m.rotation.x = -Math.PI / 2;
  m.userData.water = t; return m;
};
/** distant mountain ridge as a few big displaced cones */
export const mountains = (parent: THREE.Object3D, center: V3, radius: number, n: number, hmin: number, hmax: number, col = "#8c93b8", seed = 1, arc: [number, number] = [0, Math.PI * 2]) => {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const a = arc[0] + ((arc[1] - arc[0]) * (i + r() * 0.5)) / n, h = hmin + r() * (hmax - hmin);
    const m = mesh(new THREE.ConeGeometry(h * 1.6, h, 7, 1), lam({ color: jit(r, col, 0.06, 4) }), [center[0] + Math.cos(a) * radius, center[1] + h / 2 - 2, center[2] + Math.sin(a) * radius], { parent, ink: false, shadow: false });
    m.rotation.y = r() * 3;
  }
};
