// ALEXANDRIA: the Mediterranean coast in Egypt. Sand ground, sea for z < -20, Pharos island offshore (x 40, z -80).
// state.build 0..1 raises the city blocks in a seeded order; state.light raises the lighthouse on Pharos;
// state.lib raises the library colonnade (x -30, z 10). Streets are drawn by the shots as flat flour-line cards.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, sea, noise2, sand, house, temple, blocks, marble, mountains } from "./kit.ts";
import { rng } from "./paint.ts";

export const buildAlexandria = (): SetHandle => {
  const root = new THREE.Group();
  terrain(root, 900, 110, (x, z) => (z < -20 ? -1.4 : noise2(x, z, 9) * 0.7 * Math.min(1, Math.max(0, (Math.hypot(x, z - 15) - 40) / 30))), sand(), 80);
  sea(root, 1200, [0, -0.5, -620], "#2b86b8", "#a8dcf0");
  terrain(root, 60, 20, (x, z) => Math.max(-1.5, 3.5 - Math.hypot(x - 40, z + 80) * 0.18), sand(), 6, [40, 0, -80]);
  // city blocks: grid of houses, each rises with state.build at its own seeded moment
  const r = rng(5), blocksG: { g: THREE.Group; t: number }[] = [];
  for (let i = -6; i <= 6; i++) for (let j = 0; j < 7; j++) {
    if (Math.abs(i) <= 1 && j < 2) continue;
    const x = i * 11 + (r() - 0.5) * 2, z = -8 + j * 11 + (r() - 0.5) * 2;
    if (x < -22 && x > -40 && z > 2 && z < 20) continue;
    const g = house(root, [x, 0, z], 6 + r() * 3, 6 + r() * 3, 3.5 + r() * 3, 0, ["#f2ead8", "#efe0c2", "#f6efe2"][(i + j + 9) % 3], ["#c0573a", "#c86a44"][(i + j + 9) % 2]);
    inkEdges(g); blocksG.push({ g, t: 0.05 + 0.8 * r() * (0.4 + 0.6 * (j / 7)) });
  }
  // library colonnade
  const lib = temple(root, [-30, 0, 11], 14, 8, 7, 5, { roof: "#c0573a" });
  // Pharos lighthouse: square base, octagon, cylinder, fire
  const lh = new THREE.Group(); lh.position.set(40, 1.5, -80); root.add(lh);
  const mm = lam({ map: rep(blocks("ph", "#efe6d2", "#d2c4a6", 64, 32), 2, 6) });
  box(12, 34, 12, mm, [0, 0, 0], lh); mesh(new THREE.CylinderGeometry(4.5, 5, 18, 8), mm, [0, 43, 0], { parent: lh });
  mesh(new THREE.CylinderGeometry(2.4, 2.8, 8, 12), mm, [0, 56, 0], { parent: lh, ink: false });
  const fire = mesh(new THREE.SphereGeometry(2.2, 10, 8), lam({ color: "#ffb43a", emissive: "#ffb43a" }), [0, 61.5, 0], { parent: lh, ink: false, shadow: false });
  for (let i = 0; i < 14; i++) { const x = -60 + i * 9, z = 70 + (i % 2) * 8; tree(root, [x, 0, z], "palm", 1.1, i + 90); }
  mountains(root, [0, 0, 60], 420, 10, 20, 45, "#c8b8b0", 11, [0.4, Math.PI - 0.4]);
  inkEdges(lib); inkEdges(lh);
  return {
    root, anchors: { shore: [0, 0, -6], centre: [0, 0, 14], pharos: [40, 1.5, -80], library: [-30, 0, 11] },
    update: (_f, st) => {
      const b = st.build ?? 1;
      for (const k of blocksG) { const u = Math.max(0, Math.min(1, (b - k.t) / 0.12)); k.g.visible = u > 0.01; k.g.scale.set(1, Math.max(0.01, u * u * (3 - 2 * u)), 1); }
      const L = st.light ?? 1; lh.visible = L > 0.01; lh.scale.set(1, Math.max(0.01, L), 1); fire.visible = L > 0.98;
      const lb = st.lib ?? 1; lib.visible = lb > 0.01; lib.scale.set(1, Math.max(0.01, lb), 1);
    },
  };
};
