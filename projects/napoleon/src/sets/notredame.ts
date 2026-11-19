// NOTRE-DAME, 2 December 1804: the nave. Two rows of tall columns (x = +-7) carrying pointed arches (cards drawn by
// the shots are not needed: arches are thin boxes), a raised choir with steps and an altar at z = -22, a red carpet
// up the nave, a glowing rose window high on the end wall, banners and candles.
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, box, mesh, column, blocks, marble } from "./kit.ts";
import { ctex } from "./paint.ts";

const rose = () => ctex("rose", 512, 512, (g) => {
  g.fillStyle = "#1a1830"; g.fillRect(0, 0, 512, 512);
  const cols = ["#3a6ad8", "#c8283a", "#e2b64a", "#2f8a6a", "#7b5ac9"];
  for (let ring = 4; ring >= 1; ring--) for (let k = 0; k < 16; k++) { const a0 = (k / 16) * Math.PI * 2, a1 = ((k + 1) / 16) * Math.PI * 2;
    g.beginPath(); g.moveTo(256, 256); g.arc(256, 256, ring * 60, a0, a1); g.closePath(); g.fillStyle = cols[(k + ring) % 5]; g.fill(); g.strokeStyle = "#1a1830"; g.lineWidth = 6; g.stroke(); }
  g.beginPath(); g.arc(256, 256, 40, 0, Math.PI * 2); g.fillStyle = "#f2c94c"; g.fill();
});

export const buildNotreDame = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  const stone = lam({ map: rep(blocks("nd", "#d6ccb8", "#b4a890", 96, 48), 8, 4) });
  const fl = mesh(new THREE.PlaneGeometry(30, 70), lam({ map: rep(blocks("ndfl", "#cfc4ae", "#a99c84", 128, 128), 6, 14) }), [0, 0, -10], { parent: root, ink: false }); fl.rotation.x = -Math.PI / 2;
  const carpet = mesh(new THREE.PlaneGeometry(3.4, 46), lam({ color: "#a3182a" }), [0, 0.02, 0], { parent: root, ink: false, shadow: false }); carpet.rotation.x = -Math.PI / 2;
  for (const sx of [-1, 1]) {
    box(1, 26, 70, stone, [sx * 15, 0, -10], ink);
    for (let i = 0; i < 8; i++) { column(ink, [sx * 7, 0, 18 - i * 5.5], 14, 0.55, "#ddd4c2"); box(0.6, 1.2, 5.5, stone, [sx * 7, 14.5, 15.25 - i * 5.5], ink); }
    for (let i = 0; i < 4; i++) { const b = mesh(new THREE.PlaneGeometry(1.6, 4), lam({ color: i % 2 ? "#27408b" : "#a3182a", side: THREE.DoubleSide }), [sx * 6.3, 9, 14 - i * 11], { parent: root, ink: false, shadow: false }); b.rotation.y = Math.PI / 2; }
  }
  box(30, 26, 1, stone, [0, 0, -40], ink);
  box(16, 1.2, 10, lam({ map: rep(marble("#e6dcc8"), 3, 2) }), [0, 0, -26], ink);
  box(12, 0.6, 2, lam({ map: rep(marble("#e6dcc8"), 3, 1) }), [0, 0, -20.4], ink);
  box(4, 1.4, 1.6, lam({ color: "#e2b64a" }), [0, 1.2, -29], ink);
  mesh(new THREE.CircleGeometry(5, 40), lam({ map: rose(), emissive: "#ffffff" }), [0, 17, -39.4], { parent: root, ink: false, shadow: false });
  const roof = mesh(new THREE.PlaneGeometry(30, 70), lam({ color: "#4a4058", side: THREE.DoubleSide }), [0, 26, -10], { parent: root, ink: false, shadow: false }); roof.rotation.x = Math.PI / 2;
  inkEdges(ink);
  return { root, anchors: { altar: [0, 1.2, -23], nave: [0, 0, 0] } };
};
