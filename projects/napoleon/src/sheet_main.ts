// cast sheet: every character front + side, plus props and effects, on a flat backdrop (2D only)
import { charCard, propCard, fxCard, CAST, type Who } from "./chars/cast.ts";
const W = 1920, H = 1080, out = document.createElement("canvas"); out.width = W; out.height = H; document.body.appendChild(out);
const g = out.getContext("2d")!;
const put = (c: any, x: number, y: number, hpx: number) => {
  const s = hpx / c.ch, cv = document.createElement("canvas"); cv.width = c.cw * s; cv.height = c.ch * s; const cg = cv.getContext("2d")!; cg.scale(s, s); c.draw(cg);
  g.save(); if (c.flip) { g.translate(x + cv.width / 2, 0); g.scale(-1, 1); g.translate(-(x + cv.width / 2), 0); } g.drawImage(cv, x, y); g.restore();
};
(window as any).renderFrame = (page: number) => {
  g.fillStyle = "#cfd9e6"; g.fillRect(0, 0, W, H);
  const whos = Object.keys(CAST) as Who[];
  (window as any).__whos = whos.length;
  if (page === 0) whos.forEach((w, i) => {
    const x = (i % 13) * 147, y = Math.floor(i / 13) * 520 + 10;
    put(charCard({ who: w, expr: i % 3 ? "neutral" : "smile", seed: i + 2, vest: w === "nap" || w === "nap_coat" }, [0, 0, 0], 0)[0], x, y, 290);
    put(charCard({ who: w, view: "side", mode: "march", phase: 0.25, seed: i + 2, expr: "determined" }, [0, 0, 0], 0)[0], x + 5, y + 250, 250);
    g.fillStyle = "#222"; g.font = "14px sans-serif"; g.fillText(w, x + 4, y + 512);
  });
  if (page === 1) {
    const kinds = ["horse", "cannon", "warship", "flag_fr", "flag_uk", "eagle", "rosetta", "sphinx", "book", "painting", "snowball", "desk", "chair", "bicorne_prop", "coffin_cart", "cradle", "wreath", "torch", "scroll", "bed", "lamp", "throne"];
    kinds.forEach((k, i) => put(propCard(k as any, [0, 0, 0], 0, { rider: k === "horse" ? "nap" : k === "warship" ? "redcoat" : undefined, anim: k === "horse_rear" ? 1 : k === "geom" ? 1 : 0 })[0], (i % 8) * 240, Math.floor(i / 8) * 330 + 10, 280));
    ["dust", "burst", "clash", "speed", "sparkle", "flame", "smoke", "glow", "quest", "bang"].forEach((k, i) => put(fxCard(k as any, [0, 0, 0], 1, 0.4), i * 190, 820, 180));
  }
  if (page === 2) {
    const exprs = ["neutral", "sly", "determined", "sad", "sick", "proud", "worried", "angry", "shock", "grin", "laugh", "smile"];
    exprs.forEach((e, i) => { put(charCard({ who: "nap", expr: e as any, seed: 5, vest: i % 2 === 0 }, [0, 0, 0], 0)[0], (i % 6) * 320, Math.floor(i / 6) * 520, 520); g.fillStyle = "#222"; g.font = "20px sans-serif"; g.fillText(e, (i % 6) * 320 + 120, Math.floor(i / 6) * 520 + 510); });
  }
  return 0;
};
(window as any).grab = () => out.toDataURL("image/jpeg", 0.9);
(window as any).ready = true;
