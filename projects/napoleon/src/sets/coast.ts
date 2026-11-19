// COAST: one Mediterranean / Atlantic shore set with variants (state.v):
//   0 Ajaccio, Corsica: ochre houses climbing a hill above the harbour, maquis, mountains
//   1 Toulon: harbour, a hill fort with a gun platform (x -30..-10) above the bay where the fleet lies (cards)
//   2 Elba: small harbour town (Portoferraio), fortress walls, a beach for the escape boats
//   3 Saint Helena: dark volcanic cliffs, sparse green, Longwood house on the plateau, grey Atlantic
// The sea is z < -20; actors stand on the flat shore around the origin.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, sea, noise2, sand, house, mountains, blocks, plaster, rock, dryGrass, gable, roofHD } from "./kit.ts";
import { rng, grassHD } from "./paint.ts";

const F = (h: (x: number, z: number) => number, r0 = 22) => (x: number, z: number) => h(x, z) * Math.min(1, Math.max(0, (Math.hypot(x, z) - r0) / 30)) ** 2;

export const buildCoast = (): SetHandle => {
  const root = new THREE.Group(); const V: THREE.Group[] = [];
  const mk = () => { const g = new THREE.Group(); root.add(g); V.push(g); return g; };
  const town = (g: THREE.Group, cx: number, cz: number, n: number, seed: number, hill: (x: number, z: number) => number, walls: string[], roofs: string[]) => {
    const r = rng(seed), ink = new THREE.Group(); g.add(ink);
    for (let i = 0; i < n; i++) { const x = cx + (r() - 0.5) * 70, z = cz + r() * 60; const w = 5 + r() * 3, d = 5 + r() * 3, h = 4 + r() * 4;
      house(ink, [x, hill(x, z) - 0.4, z], w, d, h, (r() - 0.5) * 0.4, walls[i % walls.length], roofs[i % roofs.length]); }
    inkEdges(ink);
  };
  // 0 Ajaccio
  { const g = mk(); const h = F((x, z) => (z < -20 ? -1.5 : Math.max(0, z - 5) * 0.35 + noise2(x, z, 2) * 2));
    terrain(g, 700, 110, (x, z) => (z < -20 ? -1.5 : h(x, z)), dryGrass(), 70); sea(g, 900, [0, -0.6, -470], "#2f86b8", "#a8dcf0");
    town(g, 0, 18, 26, 3, h, ["#e9c98a", "#f0d8a8", "#e2b07a", "#f3e4c4"], ["#c0573a", "#b84f34"]);
    for (let i = 0; i < 18; i++) { const x = -60 + i * 7, z = 10 + (i % 3) * 14; tree(g, [x, h(x, z), z], i % 4 ? "olive" : "cypress", 1, i); }
    mountains(g, [0, 0, 80], 260, 12, 70, 150, "#8e96c0", 4, [0.3, Math.PI - 0.3]); }
  // 1 Toulon
  { const g = mk(), ink = new THREE.Group(); g.add(ink);
    const h = F((x, z) => (z < -20 ? -1.5 : (x < -8 ? Math.min(14, (-8 - x) * 0.7) : 0) + noise2(x, z, 3) * 1.2));
    terrain(g, 700, 110, (x, z) => (z < -20 ? -1.5 : h(x, z)), dryGrass(), 70); sea(g, 900, [0, -0.6, -470], "#2a7aa8", "#9fd3ea");
    const fw = lam({ map: rep(blocks("fort", "#cdbb98", "#a8987a", 96, 48), 4, 1) });
    for (let i = 0; i < 4; i++) box(9, 3.2, 1.6, fw, [-26 + i * 6, h(-26 + i * 6, -10) - 0.3, -12 - (i % 2) * 0.5], ink, 0.1);
    box(14, 0.6, 10, lam({ map: rep(blocks("plat", "#b9a98a", "#988a6e", 64, 64), 3, 2) }), [-20, h(-20, -6) - 0.2, -6], ink);
    town(g, 40, 10, 16, 5, h, ["#e9d6b0", "#f0e2c8"], ["#c0573a"]);
    mountains(g, [0, 0, 60], 240, 10, 60, 130, "#8e96c0", 6, [0.3, Math.PI - 0.3]); inkEdges(ink); }
  // 2 Elba
  { const g = mk(), ink = new THREE.Group(); g.add(ink); const h = F((x, z) => (z < -20 ? -1.5 : Math.max(0, z - 10) * 0.3 + noise2(x, z, 4) * 1.5));
    terrain(g, 600, 100, (x, z) => (z < -20 ? -1.5 : h(x, z)), sand(), 60); sea(g, 900, [0, -0.6, -470], "#2a86b8", "#a8dcf0");
    town(g, 0, 24, 18, 7, h, ["#f0d8a8", "#e9c98a", "#f6eedc"], ["#c0573a", "#c86a44"]);
    const fw = lam({ map: rep(blocks("efort", "#d8c8a0", "#b0a080", 96, 48), 6, 1) });
    for (let i = 0; i < 6; i++) box(10, 4, 2, fw, [-35 + i * 10, h(-35 + i * 10, 52) - 0.4, 52], ink);
    mountains(g, [0, 0, 70], 200, 8, 40, 80, "#90a0c4", 8, [0.4, Math.PI - 0.4]); inkEdges(ink); }
  // 3 Saint Helena
  { const g = mk(), ink = new THREE.Group(); g.add(ink); const h = F((x, z) => (z < -20 ? -1.5 : noise2(x, z, 5) * 3 + Math.max(0, Math.abs(x) - 30) * 0.4), 18);
    terrain(g, 600, 100, (x, z) => (z < -20 ? -1.5 : h(x, z)), grassHD(), 60); sea(g, 900, [0, -0.6, -470], "#3a5f7a", "#9ab8c8");
    const rk = lam({ map: rep(rock(), 3, 3), color: "#7a6a62" });
    for (let i = 0; i < 9; i++) { const c = mesh(new THREE.ConeGeometry(14 + (i % 3) * 6, 30 + (i % 4) * 10, 6), rk, [-80 + i * 20, 8, -40 - (i % 2) * 12], { parent: g, ink: false }); c.rotation.y = i; }
    box(16, 4, 7, lam({ map: rep(plaster("#e8d8a8"), 3, 1) }), [6, 0, 14], ink); gable(17, 8, 2.2, lam({ map: rep(roofHD("#7a6a62"), 3, 1) }), [6, 4, 14], ink);
    for (let i = 0; i < 6; i++) tree(g, [-20 + i * 9, h(-20 + i * 9, 30), 30 + (i % 2) * 5], "olive", 0.9, i + 30);
    inkEdges(ink); }
  return { root, anchors: { shore: [0, 0, -8], fort: [-20, 0, -6] }, update: (_f, st) => { V.forEach((g, i) => (g.visible = i === (st.v ?? 0))); } };
};
