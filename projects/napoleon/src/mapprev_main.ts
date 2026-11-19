import { drawMap } from "./overlay/maps.ts";
import { EMPIRE_1812, CLIENTS_1812, RUSSIA, ROUTE_RUSSIA, ROUTE_HELENA, P, FRANCE_1789 } from "./overlay/geo.ts";
import { loadFonts } from "./overlay/text.ts";
const W = 1920, H = 1080, c = document.createElement("canvas"); c.width = W; c.height = H; document.body.appendChild(c); const g = c.getContext("2d")!;
(window as any).renderFrame = (i: number) => {
  if (i === 0) drawMap(g, { f: 10, view: [14, 50, 1.05], realms: [{ polys: CLIENTS_1812, col: "#7a8fd0", alpha: 0.55 }, { polys: EMPIRE_1812, col: "#27408b", alpha: 0.7 }, { polys: [RUSSIA], col: "#3a7a4a", alpha: 0.4 }],
    routes: [{ pts: ROUTE_RUSSIA, u: 0.7 }], battles: [{ at: P.Austerlitz, t: 40 }, { at: P.Jena, t: 40 }], token: { at: P.Smolensk }, labels: [{ text: "FRENCH EMPIRE", at: [2, 47], t: 30, dy: 0 }, { text: "RUSSIA", at: [36, 58], t: 30, dy: 0 }], cold: 0.3 }, W, H);
  if (i === 1) drawMap(g, { f: 10, view: [0, 20, 0.45], realms: [{ polys: [FRANCE_1789], col: "#27408b", alpha: 0.6 }], routes: [{ pts: ROUTE_HELENA, u: 1 }], labels: [{ text: "SAINT HELENA", at: P.StHelena, t: 30 }] }, W, H);
  return 0;
};
(window as any).grab = () => c.toDataURL("image/jpeg", 0.9);
loadFonts().then(() => { (window as any).ready = true; });
