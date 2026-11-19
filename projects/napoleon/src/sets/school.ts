// SCHOOL: the royal military school at Brienne. A long two-storey building (z = -14) with rows of windows, wings
// at both ends, a gravel courtyard, lime trees. state.snow 0..1 whitens the ground (snowball-fight winter).
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, terrain, tree, box, mesh, gable, roofHD, mountains, ground } from "./kit.ts";
import { ctex, rng } from "./paint.ts";

const facade = (key: string, wm: number, hm: number) => ctex("schoolfac" + key, 1024, Math.round(1024 * hm / wm), (g) => {
  const W = 1024, H = Math.round(1024 * hm / wm), px = W / wm; const r = rng(4);
  g.fillStyle = "#e9dcc2"; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(150,120,90,${0.04 + r() * 0.05})`; g.fillRect(r() * W, r() * H, 20 + r() * 60, 10 + r() * 30); }
  for (let fl = 0; fl < 2; fl++) for (let x = 1.5; x < wm - 1; x += 3) { const y = H - (fl * 4 + 1.2) * px - 2.2 * px;
    g.fillStyle = "#3a3346"; g.fillRect(x * px, y, 1.2 * px, 2.2 * px); g.strokeStyle = "#f4ecd8"; g.lineWidth = 4; g.strokeRect(x * px, y, 1.2 * px, 2.2 * px);
    g.beginPath(); g.moveTo(x * px + 0.6 * px, y); g.lineTo(x * px + 0.6 * px, y + 2.2 * px); g.moveTo(x * px, y + 1.1 * px); g.lineTo(x * px + 1.2 * px, y + 1.1 * px); g.stroke(); }
  g.fillStyle = "rgba(90,70,50,0.3)"; g.fillRect(0, H - 0.5 * px, W, 0.5 * px);
});

export const buildSchool = (): SetHandle => {
  const root = new THREE.Group(), ink = new THREE.Group(); root.add(ink);
  const gravel = ground("gravel", "#c9bea4", ["#b0a488", "#ddd2ba", "#a89c80"]), snowT = ground("snowg", "#eef2fa", ["#dfe6f2", "#ffffff", "#d4dcea"]);
  const gm = lam({ map: rep(gravel, 30, 30) });
  const gmS = lam({ map: rep(snowT, 30, 30) });
  const gnd = terrain(root, 500, 60, () => 0, gravel, 40); gnd.material = gm;
  box(48, 8, 6, lam({ map: facade("main", 48, 8) }), [0, 0, -16], ink);
  gable(49, 7, 3, lam({ map: rep(roofHD("#5a5f6e", true), 6, 1) }), [0, 8, -16], ink);
  for (const sx of [-1, 1]) { box(8, 8, 26, lam({ map: rep(facade("wing", 26, 8), 1, 1) }), [sx * 28, 0, -4], ink); gable(27, 9, 3, lam({ map: rep(roofHD("#5a5f6e", true), 3, 1) }), [sx * 28, 8, -4], ink, Math.PI / 2); }
  for (let i = 0; i < 8; i++) tree(root, [-17 + i * 4.8, 0, 9 + (i % 2) * 2], "olive", 1.15, i + 3);
  mountains(root, [0, 0, 0], 300, 12, 20, 45, "#9aa6c4", 3);
  inkEdges(ink);
  return { root, anchors: { yard: [0, 0, 0] },
    update: (_f, st) => { gnd.material = (st.snow ?? 0) > 0.5 ? gmS : gm; } };
};
