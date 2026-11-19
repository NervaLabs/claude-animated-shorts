// PELLA: the Macedonian palace on its hill. Courtyard (paved, 44 x 34 m) centred on the origin; palace front
// (8 Doric columns) at z = -16 facing +z; side colonnades; beyond the courtyard (+z) the hill falls away to the town
// and the plain, with a ring of mountains. Used for S1 (birth, hero), S2 (Philip, Bucephalus, pillow), S3 (coronation,
// boy-king), S8 (rule).
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, paving, dryGrass, terrain, temple, column, house, tree, mountains, box, marble, plaster, noise2, gable, roofHD, blocks } from "./kit.ts";
import { rng } from "./paint.ts";

export const pellaH = (x: number, z: number) => {
  const plateau = Math.max(0, z - 22) ;
  const fall = -14 * (1 - Math.exp(-plateau / 40));
  const side = Math.max(0, Math.abs(x) - 40) * 0.12;
  return fall + (plateau > 0 || Math.abs(x) > 34 ? noise2(x, z, 3) * 2.2 : 0) + side * 0.5 - (z < -40 ? 0 : 0);
};

export const buildPella = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  // ground: paved courtyard + terrain around
  const pv = new THREE.Mesh(new THREE.PlaneGeometry(46, 36), lam({ map: rep(paving(), 12, 9) })); pv.rotation.x = -Math.PI / 2; pv.position.set(0, 0.02, -1); pv.receiveShadow = true; pv.userData.ink = false; root.add(pv);
  terrain(root, 700, 140, pellaH, dryGrass(), 60);
  // palace front + back wing
  temple(ink, [0, 0, -18], 26, 11, 8, 7.5, { roof: "#c0573a" });
  box(40, 9, 10, lam({ map: rep(blocks("pal", "#e9dfc8", "#cdbfa4"), 8, 2) }), [0, 0, -30], ink);
  gable(42, 11, 2.6, lam({ map: rep(roofHD("#b84f34"), 5, 2) }), [0, 9, -30], ink);
  // side colonnades with walls behind
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 6; i++) column(ink, [sx * 17, 0, -10 + i * 3.6], 5, 0.36);
    box(1, 5.4, 22, lam({ map: rep(plaster("#e9dccb"), 4, 1) }), [sx * 20, 0, -1], ink);
    box(4.6, 0.5, 23, lam({ color: "#c0573a" }), [sx * 18.4, 5.2, -1], ink);
  }
  // low parapet at the courtyard edge, gate posts
  for (const sx of [-1, 1]) box(16, 1.0, 0.8, lam({ map: rep(marble(), 3, 1) }), [sx * 13, 0, 16.5], ink);
  for (const sx of [-1, 1]) box(1.4, 3.2, 1.4, lam({ map: rep(marble(), 1, 1) }), [sx * 4.6, 0, 16.5], ink);
  // throne dais at the palace steps
  box(5, 0.5, 3, lam({ map: rep(marble("#e6dcc8"), 1, 1) }), [0, 1.05, -10.4], ink);
  box(1.8, 1.0, 1.0, lam({ color: "#8a5a34" }), [0, 1.55, -11.4], ink);
  box(1.8, 2.0, 0.25, lam({ color: "#b8312f" }), [0, 1.55, -11.9], ink);
  // the town below: houses on the slope, cypresses, olives
  const r = rng(11);
  for (let i = 0; i < 70; i++) {
    const x = (r() - 0.5) * 220, z = 40 + r() * 190;
    if (Math.abs(x) < 8 && z < 70) continue;
    const w = 5 + r() * 4, d = 5 + r() * 4, h = 3 + r() * 2.5;
    house(ink, [x, pellaH(x, z) - 0.3, z], w, d, h, (r() - 0.5) * 0.5, ["#efe4cf", "#f3ead8", "#e6d6b8"][i % 3], ["#c0573a", "#b84f34", "#c86a44"][i % 3]);
  }
  for (let i = 0; i < 40; i++) { const x = (r() - 0.5) * 300, z = 25 + r() * 240; if (Math.abs(x) < 26 && z < 30) continue; tree(root, [x, pellaH(x, z), z], i % 3 ? "olive" : "cypress", 0.9 + r() * 0.5, i); }
  for (let i = 0; i < 8; i++) tree(root, [(i % 2 ? -1 : 1) * (24 + (i >> 1) * 3), 0, -6 + (i >> 1) * 6], "cypress", 1, 50 + i);
  // town walls far below + the plain + mountains (the "rugged mountain kingdom")
  for (let i = 0; i < 12; i++) box(18, 3.5, 2, lam({ map: rep(blocks("twall", "#d9caa8", "#b9a888"), 3, 1) }), [-110 + i * 19, pellaH(-110 + i * 19, 245) - 0.5, 245], ink);
  mountains(root, [0, -10, 120], 520, 16, 70, 160, "#8e96c0", 5, [0.15, Math.PI - 0.15]);
  mountains(root, [0, 0, -60], 360, 10, 60, 120, "#8a90b8", 9, [Math.PI + 0.2, Math.PI * 2 - 0.2]);
  inkEdges(ink);
  return {
    root,
    anchors: { court: [0, 0, 2], throne: [0, 1.55, -10.8], steps: [0, 1.05, -9.2], edge: [0, 0, 14], gate: [0, 0, 16.5], left: [-8, 0, 0], right: [8, 0, 0] },
  };
};
