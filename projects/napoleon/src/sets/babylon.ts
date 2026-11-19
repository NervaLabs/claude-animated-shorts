// BABYLON: the Ishtar Gate (two glazed towers and an arch) in a glazed lower wall with a mud-brick upper wall,
// a processional way, palms, a stepped ziggurat behind. Interior chamber at x = 400: floor, three plastered walls
// with a frieze, a night window, columns; the shots place bed, lamps and figures.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, noise2, dirt, glazed, mudbrick, paving, plaster, column, mountains } from "./kit.ts";

export const buildBabylon = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  terrain(root, 900, 100, (x, z) => noise2(x, z, 12) * 0.8 * Math.min(1, Math.abs(x) / 20), dirt(), 90);
  const way = mesh(new THREE.PlaneGeometry(10, 120), lam({ map: rep(paving(), 3, 36) }), [0, 0.04, 40], { parent: root, ink: false }); way.rotation.x = -Math.PI / 2;
  const gz = lam({ map: rep(glazed(), 1, 1) }), mb = lam({ map: rep(mudbrick(), 6, 2) });
  // gate towers + arch
  for (const sx of [-1, 1]) { box(7, 16, 8, gz, [sx * 7.5, 0, 0], ink); for (let k = 0; k < 4; k++) box(1.2, 1.4, 8, gz, [sx * (5 + k * 1.7), 16, 0], ink); }
  box(8, 4, 8, gz, [0, 11, 0], ink);
  const arch = mesh(new THREE.PlaneGeometry(8, 11), lam({ color: "#2a1f36" }), [0, 5.5, 4.01], { parent: root, ink: false, shadow: false }); void arch;
  // walls
  for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) { box(14, 7, 5, i < 2 ? gz : mb, [sx * (18 + i * 14), 0, -1], ink); for (let k = 0; k < 5; k++) box(1.2, 1.2, 5, mb, [sx * (12.4 + i * 14 + k * 2.8), 7, -1], ink); }
  // ziggurat behind
  const zg = new THREE.Group(); zg.position.set(30, 0, -90); root.add(zg);
  for (let k = 0; k < 6; k++) box(60 - k * 9, 8, 60 - k * 9, mb, [0, k * 8, 0], zg);
  for (let i = 0; i < 16; i++) { const x = (i % 2 ? -1 : 1) * (8 + (i >> 1) * 4.5), z = 12 + (i >> 1) * 7; tree(root, [x, 0, z], "palm", 1.15, i + 120); }
  mountains(root, [0, 0, 0], 520, 8, 15, 35, "#b8a8b8", 13);
  // interior chamber at x = 400
  const I = new THREE.Group(); I.position.set(400, 0, 0); root.add(I);
  const fl = mesh(new THREE.PlaneGeometry(16, 14), lam({ map: rep(paving(), 4, 4) }), [0, 0.02, 0], { parent: I, ink: false }); fl.rotation.x = -Math.PI / 2;
  const pw = lam({ map: rep(plaster("#d9c49c"), 3, 1) });
  box(16, 6, 0.5, pw, [0, 0, -7], I); box(0.5, 6, 14, pw, [-8, 0, 0], I); box(0.5, 6, 14, pw, [8, 0, 0], I);
  box(16, 0.8, 0.6, gz, [0, 4.6, -6.7], I);
  const win = mesh(new THREE.PlaneGeometry(2.4, 2.8), lam({ color: "#3a3c9a", emissive: "#2a2c7a" }), [3.5, 2.6, -6.74], { parent: I, ink: false, shadow: false }); void win;
  const moon = mesh(new THREE.CircleGeometry(0.42, 20), lam({ color: "#f4f2ff", emissive: "#d8d6f6" }), [4.0, 3.3, -6.72], { parent: I, ink: false, shadow: false }); void moon;
  for (const x of [-5, 5]) column(I, [x, 0, -4], 6, 0.35, "#d8ccb4");
  inkEdges(ink); inkEdges(I);
  return { root, anchors: { gate: [0, 0, 4], way: [0, 0, 30], room: [400, 0, 0], bed: [398.5, 0, -3.5], window: [403.5, 2.6, -6.7] } };
};
