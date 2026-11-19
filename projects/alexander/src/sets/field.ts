// FIELD: open battle ground, one set with variants selected by state.v:
//   0 chaeronea (green rolling hills, olives)  1 issus (narrow coastal plain: sea at x < -40, mountains at x > 45,
//   shallow river along z = 0)  2 gaugamela (vast flat dry plain)  3 hellespont (beach: sea for z < -12, ships)
//   4 india (green, palms, the Hydaspes along z = -30)  5 camp (dusk plain with tents, the weary army)
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, sea, mountains, noise2, dirt, dryGrass, sand, cloth, gable } from "./kit.ts";
import { grassHD } from "./paint.ts";

/** terrain is flat within 35 m of the origin (where the actors stand), blending to full relief by 75 m */
const F = (h: (x: number, z: number) => number) => (x: number, z: number) => h(x, z) * Math.min(1, Math.max(0, (Math.hypot(x, z) - 35) / 40)) ** 2;
export const buildField = (): SetHandle => {
  const root = new THREE.Group();
  const V: THREE.Group[] = [];
  const mk = () => { const g = new THREE.Group(); root.add(g); V.push(g); return g; };
  // 0 chaeronea
  { const g = mk(); terrain(g, 900, 120, F((x, z) => noise2(x, z, 1) * 3 + Math.max(0, Math.abs(z) - 60) * 0.12), grassHD(), 90);
    for (let i = 0; i < 26; i++) { const x = -150 + (i * 37) % 300, z = (i % 2 ? -1 : 1) * (40 + (i * 13) % 90); tree(g, [x, noise2(x, z, 1) * 3, z], "olive", 1.2, i); }
    mountains(g, [0, 0, 0], 380, 14, 50, 120, "#8c96c0", 4); }
  // 1 issus
  { const g = mk(); terrain(g, 900, 120, F((x, z) => (x > 50 ? Math.min(30, (x - 50) * 0.22) + noise2(x, z, 2) * 3 : x < -40 ? -1.5 : noise2(x, z, 2) * 0.8)), dryGrass(), 90);
    sea(g, 900, [-490, -0.6, 0]); const riv = mesh(new THREE.PlaneGeometry(90, 6), lam({ color: "#5aa0c8" }), [0, 0.05, 0], { parent: g, ink: false, shadow: false }); riv.rotation.x = -Math.PI / 2;
    mountains(g, [230, 20, 0], 40, 12, 60, 130, "#8a8fb4", 5, [-1.4, 1.4]); }
  // 2 gaugamela
  { const g = mk(); terrain(g, 1200, 100, F((x, z) => noise2(x, z, 3) * 0.6 + Math.max(0, Math.hypot(x, z) - 300) * 0.05), dirt(), 110);
    mountains(g, [0, 0, 0], 560, 18, 25, 60, "#a49ab8", 6); }
  // 3 hellespont
  { const g = mk(); terrain(g, 700, 100, (x, z) => (z < -12 ? -1.2 : F((x2, z2) => noise2(x2, z2, 4) * 1.2 + Math.max(0, z2 - 40) * 0.08)(x, z)), sand(), 70);
    sea(g, 900, [0, -0.4, -462]);
    mountains(g, [0, 0, 0], 400, 12, 40, 90, "#8c96c0", 7, [0.3, Math.PI - 0.3]); }
  // 4 india
  { const g = mk(); terrain(g, 900, 110, F((x, z) => noise2(x, z, 5) * 1.5), grassHD(), 90);
    const riv = mesh(new THREE.PlaneGeometry(900, 24), lam({ color: "#4f96b8" }), [0, 0.06, -34], { parent: g, ink: false, shadow: false }); riv.rotation.x = -Math.PI / 2;
    for (let i = 0; i < 24; i++) { const x = -200 + i * 17, z = -50 - (i % 3) * 12; tree(g, [x, noise2(x, z, 5) * 1.5, z], "palm", 1.2, i + 40); }
    for (let i = 0; i < 10; i++) { const x = -120 + i * 25, z = 40 + (i % 2) * 15; tree(g, [x, noise2(x, z, 5) * 1.5, z], "palm", 1.1, i + 70); }
    mountains(g, [0, 0, 0], 420, 12, 60, 140, "#9098c4", 8); }
  // 5 camp
  { const g = mk(), ink = new THREE.Group(); g.add(ink); terrain(g, 900, 100, F((x, z) => noise2(x, z, 6) * 1.2), dryGrass(), 90);
    for (let i = 0; i < 9; i++) { const x = -26 + i * 6.5, z = -16 - (i % 2) * 7; box(4.4, 0.1, 4, lam({ color: "#d8c8a0" }), [x, 0, z], ink); gable(4.4, 4.4, 3, lam({ map: cloth(i % 2 ? "#d8c8a0" : "#c9b48a", "#b8312f") }), [x, 0.05, z], ink); }
    mountains(g, [0, 0, 0], 380, 14, 70, 150, "#7c78b0", 9); inkEdges(ink); }
  return { root, anchors: { centre: [0, 0, 0] }, update: (_f, st) => { V.forEach((g, i) => (g.visible = i === (st.v ?? 0))); } };
};
