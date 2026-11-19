// PARIS: a cobbled square. Tall grey-roofed town houses line both sides (x = +-14), a classical church front with
// steps at the far end (z = -24, Saint-Roch), the gilded dome of the Invalides beyond the rooftops (x 30, z -90).
// Used for the Revolution, the royalist rising, Brumaire, 1814/1815 and the return of the body in 1840.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, box, mesh, gable, roofHD, temple, ground, column } from "./kit.ts";
import { ctex, rng, jit } from "./paint.ts";
import { cobbleHD } from "./paint.ts";

const townFacade = (key: string, wm: number, hm: number, wall: string) => ctex("pfac" + key, 512, Math.round(512 * hm / wm), (g) => {
  const W = 512, H = Math.round(512 * hm / wm), px = W / wm, r = rng(key.length * 7);
  g.fillStyle = wall; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) { g.fillStyle = `rgba(120,100,80,${0.04 + r() * 0.05})`; g.fillRect(r() * W, r() * H, 10 + r() * 40, 6 + r() * 20); }
  const fl = Math.floor(hm / 3.2);
  for (let k = 0; k < fl; k++) for (let x = 0.9; x < wm - 1.2; x += 2.4) { const y = H - (k * 3.2 + (k ? 0.9 : 0.4)) * px - 2.2 * px;
    if (k === 0) { g.fillStyle = ["#6a3a2a", "#2f4a6a", "#3a5a3a"][Math.floor(r() * 3)]; g.fillRect(x * px, y - 0.2 * px, 1.4 * px, 2.6 * px); continue; }
    g.fillStyle = "#3a3346"; g.fillRect(x * px, y, 1.2 * px, 2.0 * px); g.fillStyle = "#2a2a30"; g.fillRect(x * px - 4, y + 2.0 * px, 1.2 * px + 8, 4); }
});

export const buildParis = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  const gnd = terrain(root, 400, 40, () => 0, cobbleHD(), 60); void gnd;
  const r = rng(9);
  for (const sx of [-1, 1]) for (let i = 0; i < 8; i++) {
    const w = 7 + r() * 3, h = 12 + r() * 6, z = 14 - i * 9.5, x = sx * (14 + w / 2 * 0);
    box(6, h, 9, lam({ map: townFacade(`${sx}${i}`, 9, h, jit(r, "#e4d8c2", 0.06)) }), [x + sx * 3, 0, z], ink, sx > 0 ? -Math.PI / 2 : Math.PI / 2);
    gable(9.4, 6.4, 2.8, lam({ map: rep(roofHD("#5d6272", true), 2, 1) }), [x + sx * 3, h, z], ink, Math.PI / 2);
  }
  temple(ink, [0, 0, -30], 20, 9, 6, 9, { roof: "#8a8e9a", marbleCol: "#e2dccc" });
  // the Invalides dome, far away
  const D = new THREE.Group(); D.position.set(34, 0, -110); root.add(D);
  box(22, 14, 22, lam({ color: "#d8d0bc" }), [0, 0, 0], D); mesh(new THREE.CylinderGeometry(8, 8, 8, 20), lam({ color: "#d8d0bc" }), [0, 18, 0], { parent: D, ink: false });
  mesh(new THREE.SphereGeometry(8, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), lam({ color: "#d9a441", emissive: "#3a2a08" }), [0, 22, 0], { parent: D, ink: false });
  mesh(new THREE.ConeGeometry(1.2, 9, 8), lam({ color: "#e2b64a" }), [0, 34, 0], { parent: D, ink: false });
  inkEdges(ink);
  return { root, anchors: { square: [0, 0, 0], steps: [0, 1.05, -22] } };
};
