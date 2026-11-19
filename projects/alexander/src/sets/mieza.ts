// MIEZA: Aristotle's school at the Sanctuary of the Nymphs. A grassy grove with a small stoa (z = -9), a rock wall
// with a cave mouth (x = -15), stone benches round a sand table at the centre, olive trees and cypresses.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, temple, tree, box, mesh, rock, sand, noise2, mountains, marble } from "./kit.ts";
import { grassHD } from "./paint.ts";

export const buildMieza = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  const h = (x: number, z: number) => (Math.hypot(x, z) < 22 ? 0 : noise2(x, z, 7) * 2.5 + Math.max(0, Math.hypot(x, z) - 22) * 0.06);
  terrain(root, 500, 100, h, grassHD(), 80);
  temple(ink, [2, 0, -11], 16, 5, 6, 4.6, { roof: "#b8573a" });
  // rock wall with a cave mouth
  const rk = lam({ map: rep(rock(), 3, 2) });
  for (let i = 0; i < 7; i++) { const b = box(5 + (i % 3), 6 + (i % 4) * 1.6, 5, rk, [-16 - (i % 2), 0, -12 + i * 4.2], ink, 0.3 * (i % 3)); b.userData.inkAngle = 40; }
  const cave = mesh(new THREE.CircleGeometry(2.2, 20, 0, Math.PI), lam({ color: "#2a2238" }), [-13.4, 0, 0], { parent: root, ink: false, shadow: false }); cave.rotation.y = Math.PI / 2;
  // benches + sand table
  const st = lam({ map: rep(marble("#ddd3c0"), 1, 1) });
  for (const [x, z, ry] of [[-4, 3, 0.4], [5, 4, -0.5], [0, -3.5, 0]] as const) box(3, 0.5, 0.8, st, [x, 0, z], ink, ry);
  box(3.6, 0.8, 2.4, lam({ color: "#8a6a4a" }), [1, 0, 0.5], ink);
  const top = mesh(new THREE.PlaneGeometry(3.3, 2.1), lam({ map: sand() }), [1, 0.81, 0.5], { parent: root, ink: false }); top.rotation.x = -Math.PI / 2;
  // trees
  for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2 + 0.3, r = 18 + (i % 4) * 6; const x = Math.cos(a) * r, z = Math.sin(a) * r; if (x < -10 && Math.abs(z) < 14) continue; tree(root, [x, h(x, z), z], i % 3 ? "olive" : "cypress", 1 + (i % 3) * 0.2, i + 20); }
  mountains(root, [0, 0, 0], 300, 14, 50, 110, "#8c96c0", 3);
  inkEdges(ink);
  return { root, anchors: { teacher: [-1.5, 0, 2.2], pupil: [3.2, 0, 2.8], table: [1, 0.81, 0.5], stoa: [2, 1.05, -8.5], cave: [-13, 0, 0] } };
};
