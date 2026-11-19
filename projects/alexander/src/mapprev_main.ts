import { drawMap } from "./overlay/maps.ts";
import { loadFonts, drawCaption, drawStamp, drawLabel, drawTitle } from "./overlay/text.ts";
const W = 1920, H = 1080, c = document.createElement("canvas"); c.width = W; c.height = H; document.body.appendChild(c); const g = c.getContext("2d")!;
(window as any).renderFrame = (i: number) => {
  if (i === 0) { drawMap(g, { view: [48, 32, 1], f: 30, route: 17.5, empire: 1, token: true, battles: [[2, 40], [5, 40], [14, 30]], labels: [{ text: "MACEDONIA", at: [22.5, 41.5], t: 30 }, { text: "EGYPT", at: [30.5, 27], t: 30 }, { text: "PERSIA", at: [55, 32], t: 30 }, { text: "ISSUS", at: [36.2, 36.8], t: 30, sub: "333 BC", size: 30 }] }, W, H); drawCaption(g, "Persepolis", W, H); drawStamp(g, "331 BC", 20, 60, W, H); }
  if (i === 1) { drawMap(g, { view: [48, 32, 1], f: 30, breakup: 1, culture: 0.6, labels: [{ text: "PTOLEMIES", at: [30, 26], t: 30, col: "#7a5a10" }, { text: "SELEUCIDS", at: [55, 33], t: 30, col: "#1f4a7a" }, { text: "ANTIGONIDS", at: [22, 41.5], t: 30, col: "#7a1f24" }] }, W, H); }
  if (i === 2) { g.fillStyle = "#557"; g.fillRect(0, 0, W, H); drawTitle(g, 40, 60, W, H); drawLabel(g, "PELLA", 20, 60, W, H, 0.5, 0.88, { sub: "capital of Macedonia" }); }
  return 0;
};
(window as any).grab = () => c.toDataURL("image/jpeg", 0.9);
loadFonts().then(() => { (window as any).ready = true; });
