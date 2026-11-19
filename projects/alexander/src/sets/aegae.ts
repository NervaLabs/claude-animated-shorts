// AEGAE: the theatre at night. A stepped half-ring of seats (lathe profile) facing +z onto a round orchestra at the
// origin, a stage building behind it (z = +11) with a gateway, torches round the orchestra (cards + point lights
// placed by the shots), the old palace hill behind in moonlight.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, column, box, mesh, paving, blocks, noise2, tree, mountains, marble } from "./kit.ts";
import { grassHD } from "./paint.ts";

export const buildAegae = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  terrain(root, 500, 90, (x, z) => (z < -6 ? Math.min(9, (-6 - z) * 0.55) + noise2(x, z, 2) * 1.5 : Math.hypot(x, z) > 30 ? noise2(x, z, 2) * 1.5 : 0), grassHD(), 70);
  const prof: THREE.Vector2[] = [new THREE.Vector2(8, 0)];
  for (let i = 0; i < 9; i++) { prof.push(new THREE.Vector2(8 + i * 1.1, 0.5 + i * 0.5)); prof.push(new THREE.Vector2(8 + (i + 1) * 1.1, 0.5 + i * 0.5)); }
  prof.push(new THREE.Vector2(8 + 9 * 1.1, 0));
  const seats = new THREE.Mesh(new THREE.LatheGeometry(prof, 48, Math.PI / 2, Math.PI), lam({ map: rep(blocks("seat", "#d8ccb4", "#b0a288", 64, 32), 18, 2) }));
  seats.rotation.y = Math.PI; seats.castShadow = seats.receiveShadow = true; seats.userData.inkAngle = 50; ink.add(seats);
  const orch = mesh(new THREE.CircleGeometry(7.8, 40), lam({ map: rep(paving(), 5, 5) }), [0, 0.03, 0], { parent: root, ink: false }); orch.rotation.x = -Math.PI / 2;
  // stage building with columns and a central gateway
  box(24, 5.5, 3, lam({ map: rep(blocks("skene", "#e2d6bc", "#bfae8e"), 5, 1) }), [0, 0, 12.5], ink);
  for (let i = 0; i < 8; i++) if (i !== 3 && i !== 4) column(ink, [-10.5 + i * 3, 0, 10.6], 4.4, 0.3, "#e8dfcc");
  mesh(new THREE.PlaneGeometry(3.4, 4), lam({ color: "#2a2238" }), [0, 2, 10.99], { parent: root, ink: false, shadow: false }).rotation.y = Math.PI;
  box(26, 0.6, 4, lam({ map: rep(marble(), 4, 1) }), [0, 5.5, 12.5], ink);
  for (let i = 0; i < 10; i++) tree(root, [-40 + i * 9, 0, 26 + (i % 2) * 5], "cypress", 1.1, 80 + i);
  mountains(root, [0, 0, 0], 260, 12, 40, 90, "#5d5aa0", 6);
  inkEdges(ink);
  const torches: [number, number, number][] = [[-7.2, 0, 3.2], [7.2, 0, 3.2], [-4.5, 0, 8.4], [4.5, 0, 8.4]];
  return { root, anchors: { gate: [0, 0, 10.4], centre: [0, 0, 0], seatL: [-11, 3, -3], seatR: [11, 3, -3] }, torches } as SetHandle & { torches: typeof torches };
};
