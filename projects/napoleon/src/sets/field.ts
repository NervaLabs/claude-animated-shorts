// FIELD: open battle ground with variants (state.v). Flat within 35 m of the origin (where the actors stand).
//   0 Italy (green hills, cypresses, a river with the wooden bridge of Arcole at x 30)
//   1 Egypt (sand, the three pyramids of Giza on the horizon, the Nile strip, palms; the sphinx is a card)
//   2 Austerlitz (frosty rolling hills with the high Pratzen plateau to the east, x > 40)
//   3 Russia (snow plain, birches and dark pines)
//   4 Moscow (snow, the city skyline with onion domes behind a wall at z = -60; fires are cards)
//   5 Waterloo (green and wheat fields, a walled farmhouse - Hougoumont - at x -30, a low ridge)
//   6 plain (Leipzig / Laffrey: brown-green open ground)
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, sea, mountains, noise2, dirt, dryGrass, sand, ground, blocks, plaster, gable, roofHD, house } from "./kit.ts";
import { grassHD, rng } from "./paint.ts";

const F = (h: (x: number, z: number) => number) => (x: number, z: number) => h(x, z) * Math.min(1, Math.max(0, (Math.hypot(x, z) - 35) / 40)) ** 2;
const snowT = () => ground("snow", "#eef2fa", ["#dfe6f2", "#ffffff", "#d4dcea", "#e8eef8"]);
const frostT = () => ground("frost", "#b7c0a8", ["#a0ab92", "#d8ded0", "#c7cfba"]);

export const buildField = (): SetHandle => {
  const root = new THREE.Group(); const V: THREE.Group[] = [];
  const mk = () => { const g = new THREE.Group(); root.add(g); V.push(g); return g; };
  // 0 Italy
  { const g = mk(), ink = new THREE.Group(); g.add(ink); terrain(g, 900, 110, F((x, z) => noise2(x, z, 1) * 4 + Math.max(0, Math.abs(z) - 60) * 0.1), grassHD(), 90);
    const riv = mesh(new THREE.PlaneGeometry(14, 600), lam({ color: "#5aa0c8" }), [30, 0.05, 0], { parent: g, ink: false, shadow: false }); riv.rotation.x = -Math.PI / 2;
    box(16, 0.5, 3, lam({ color: "#8a5a34" }), [30, 1.2, 0], ink); for (let i = 0; i < 4; i++) box(0.4, 1.4, 0.4, lam({ color: "#6a4a2a" }), [24 + i * 4, 0, 1.4], ink);
    for (let i = 0; i < 26; i++) { const x = -160 + (i * 37) % 320, z = (i % 2 ? -1 : 1) * (40 + (i * 13) % 90); tree(g, [x, F((a, b) => noise2(a, b, 1) * 4)(x, z), z], i % 3 ? "cypress" : "olive", 1.2, i); }
    mountains(g, [0, 0, 0], 420, 14, 80, 170, "#9aa8cc", 4); inkEdges(ink); }
  // 1 Egypt
  { const g = mk(); terrain(g, 1200, 100, F((x, z) => noise2(x, z, 2) * 2.5), sand(), 100);
    const st = lam({ map: rep(blocks("pyr", "#e2c48a", "#c9a46a", 48, 24), 8, 8) });
    for (const [x, z, s] of [[-80, -260, 70], [10, -300, 64], [80, -250, 34]] as const) { const p = mesh(new THREE.ConeGeometry(s * 0.75, s, 4), st, [x, s / 2, z], { parent: g, ink: false }); p.rotation.y = Math.PI / 4; }
    const nile = mesh(new THREE.PlaneGeometry(1200, 30), lam({ color: "#4f96b8" }), [0, 0.06, 90], { parent: g, ink: false, shadow: false }); nile.rotation.x = -Math.PI / 2;
    for (let i = 0; i < 20; i++) tree(g, [-200 + i * 21, 0, 70 - (i % 2) * 8], "palm", 1.2, i + 50); }
  // 2 Austerlitz
  { const g = mk(); terrain(g, 1000, 110, F((x, z) => noise2(x, z, 3) * 5 + (x > 40 ? Math.min(28, (x - 40) * 0.35) : 0)), frostT(), 90);
    for (let i = 0; i < 14; i++) { const x = -120 + i * 18, z = -70 - (i % 3) * 20; tree(g, [x, 0, z], "cypress", 1.1, i + 70); }
    mountains(g, [0, 0, 0], 480, 14, 40, 90, "#9aa6c4", 5); }
  // 3 Russia
  { const g = mk(); terrain(g, 1000, 110, F((x, z) => noise2(x, z, 4) * 3), snowT(), 90);
    const r = rng(3);
    for (let i = 0; i < 46; i++) { const x = (r() - 0.5) * 500, z = -50 - r() * 250; if (Math.abs(x) < 30 && z > -60) continue; tree(g, [x, 0, z], r() < 0.5 ? "cypress" : "olive", 1 + r() * 0.6, i + 90).traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh && m.geometry.type === "SphereGeometry") (m.material as THREE.MeshLambertMaterial).color.set(r() < 0.5 ? "#2f4a3a" : "#e8eef6"); }); }
    mountains(g, [0, 0, 0], 600, 10, 15, 40, "#c8d0e0", 6); }
  // 4 Moscow
  { const g = mk(), ink = new THREE.Group(); g.add(ink); terrain(g, 1000, 100, F((x, z) => noise2(x, z, 5) * 2), dryGrass(), 90);
    const wall = lam({ map: rep(blocks("kremlin", "#b8453a", "#8a3a30", 64, 32), 10, 1) });
    for (let i = 0; i < 9; i++) { box(14, 9, 3, wall, [-63 + i * 14, 0, -60], ink); box(2.5, 1.6, 3, wall, [-63 + i * 14 - 5, 9, -60], ink); box(2.5, 1.6, 3, wall, [-63 + i * 14 + 5, 9, -60], ink); }
    const cols = ["#e2b64a", "#3a8a5a", "#3a6ad8", "#c8283a", "#e2b64a"];
    for (let i = 0; i < 9; i++) { const x = -60 + i * 15, z = -80 - (i % 3) * 12, h = 14 + (i % 4) * 7;
      box(6, h, 6, lam({ color: i % 2 ? "#f0e8d8" : "#e8d0b0" }), [x, 0, z], ink);
      mesh(new THREE.SphereGeometry(3.6, 14, 10), lam({ color: cols[i % 5] }), [x, h + 2.5, z], { parent: g, ink: false }).scale.set(1, 1.25, 1);
      mesh(new THREE.ConeGeometry(1.4, 4.5, 10), lam({ color: cols[i % 5] }), [x, h + 7.2, z], { parent: g, ink: false }); }
    inkEdges(ink); }
  // 5 Waterloo
  { const g = mk(), ink = new THREE.Group(); g.add(ink); terrain(g, 1000, 110, F((x, z) => noise2(x, z, 6) * 3 + (z < -40 ? Math.min(6, (-40 - z) * 0.1) : 0)), grassHD(), 90);
    const wheat = mesh(new THREE.PlaneGeometry(60, 40), lam({ map: rep(ground("wheat", "#d9b860", ["#c9a648", "#e8cc78", "#b8963c"]), 6, 4) }), [40, 0.04, -30], { parent: g, ink: false, shadow: false }); wheat.rotation.x = -Math.PI / 2;
    const ww = lam({ map: rep(blocks("hgw", "#d8cbb0", "#b0a284", 64, 32), 4, 1) });
    for (let i = 0; i < 4; i++) box(10, 2.6, 0.8, ww, [-40 + i * 10, 0, -22], ink);
    house(ink, [-30, 0, -30], 12, 9, 6, 0, "#e8dcc4", "#8a3a30"); house(ink, [-44, 0, -32], 8, 7, 5, 0.3, "#e0d2b6", "#8a3a30");
    for (let i = 0; i < 10; i++) tree(g, [-60 + i * 4, 0, -42 - (i % 2) * 4], "olive", 1.3, i + 120);
    mountains(g, [0, 0, 0], 600, 10, 15, 30, "#a8b4c8", 7); inkEdges(ink); }
  // 6 plain
  { const g = mk(); terrain(g, 1000, 100, F((x, z) => noise2(x, z, 7) * 2.5), dryGrass(), 90);
    for (let i = 0; i < 12; i++) tree(g, [-150 + i * 27, 0, -70 - (i % 3) * 25], "olive", 1.2, i + 140);
    mountains(g, [0, 0, 0], 520, 12, 25, 60, "#a4a8c0", 8); }
  return { root, anchors: { centre: [0, 0, 0] }, update: (_f, st) => { V.forEach((g, i) => (g.visible = i === (st.v ?? 0))); } };
};
