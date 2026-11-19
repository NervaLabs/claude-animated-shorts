// ROOM: interiors, variants (state.v): 0 the emperor's study at the Tuileries (green walls, a big map of Europe on
// the wall, the desk); 1 Longwood House on Saint Helena (plain yellowed walls, a window onto the grey sea).
import * as THREE from "three";
import type { SetHandle } from "../render/engine.ts";
import { inkEdges } from "../render/ink.ts";
import { lam, rep, box, mesh, plaster, paving } from "./kit.ts";
import { ctex } from "./paint.ts";

export const ROOM_MAP_KEY = "room-map";
export const buildRoom = (mapTex?: THREE.Texture): SetHandle => {
  const root = new THREE.Group(); const V: THREE.Group[] = [];
  for (let v = 0; v < 2; v++) {
    const g = new THREE.Group(); root.add(g); V.push(g); const ink = new THREE.Group(); g.add(ink);
    const fl = mesh(new THREE.PlaneGeometry(14, 12), lam({ map: rep(paving(), 4, 4), color: v ? "#b8a888" : "#c8a878" }), [0, 0.01, 0], { parent: g, ink: false }); fl.rotation.x = -Math.PI / 2;
    const wall = lam({ map: rep(plaster(v ? "#d8c89c" : "#5a7a5a"), 3, 1) });
    box(14, 5, 0.4, wall, [0, 0, -6], ink); box(0.4, 5, 12, wall, [-7, 0, 0], ink); box(0.4, 5, 12, wall, [7, 0, 0], ink);
    box(14, 0.3, 0.5, lam({ color: v ? "#a8987a" : "#c9a14a" }), [0, 4.2, -5.8], ink);
    if (v === 0 && mapTex) mesh(new THREE.PlaneGeometry(6.2, 3.5), lam({ map: mapTex }), [0, 2.6, -5.78], { parent: g, ink: false, shadow: false });
    if (v === 1) { mesh(new THREE.PlaneGeometry(2.4, 2.4), lam({ color: "#9ab8c8", emissive: "#5a7a8a" }), [3.2, 2.4, -5.78], { parent: g, ink: false, shadow: false });
      box(2.7, 0.2, 0.3, lam({ color: "#e8e0cc" }), [3.2, 1.1, -5.7], ink); }
    inkEdges(ink);
  }
  return { root, anchors: { centre: [0, 0, 0] }, update: (_f, st) => { V.forEach((g, i) => (g.visible = i === (st.v ?? 0))); } };
};
export { ctex };
