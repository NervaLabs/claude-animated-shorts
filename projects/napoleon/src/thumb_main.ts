// YouTube thumbnail (rendered at 1920x1080, saved at 1280x720): golden Gaugamela battlefield with the Persian army
// (3D, blurred) + a big helmeted Alexander card (2D, sly) + a tilted map card of his empire + bold title text.
import wordsJson from "../voice/words.json";
import { setWords } from "./core/time.ts";
import { Engine } from "./render/engine.ts";
import { buildField } from "./sets/field.ts";
import { army, CAST } from "./chars/cast.ts";
import { Pen, bodyFront, fxBurst } from "./chars/toon.ts";
import { drawMap } from "./overlay/maps.ts";
import { loadFonts } from "./overlay/text.ts";

setWords(wordsJson as any);
const E = new Engine(1920, 1080);
E.addSet("field", buildField());
const W = 1920, H = 1080, INK = "#160f1c";

const text = (g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, fill: string | CanvasGradient, stroke = 26, rot = 0, font = "Cinzel") => {
  g.save(); g.translate(x, y); g.rotate(rot); g.font = `900 ${size}px ${font}, serif`;
  const wmax = 1000, wm = g.measureText(s).width; if (wm > wmax) g.scale(wmax / wm, wmax / wm); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  g.lineWidth = stroke + 12; g.strokeStyle = "rgba(0,0,0,0.35)"; g.strokeText(s, 6, 10);
  g.lineWidth = stroke; g.strokeStyle = INK; g.strokeText(s, 0, 0); g.fillStyle = fill; g.fillText(s, 0, 0); g.restore();
};

(window as any).renderThumb = (variant: number) => {
  const cards = [...army("persian", [-30, 0, -26], 5, 30, [2.1, 2.0], 0, {}), ...army("phalangite", [-14, 0, -6], 2, 14, [2, 1.8], 0, {})];
  E.frame({ layers: [{ alpha: 1, world: { set: "field", light: "golden", f: 0, cam: { pos: [6, 2.2, 10], look: [-2, 2.6, -12], fov: 46, roll: 0 }, cards, state: { v: 2 }, dof: { cInf: 20, focus: 3 } } }],
    over: (g) => {
      // warm vignette + light rays behind the hero
      const vg = g.createRadialGradient(W * 0.3, H * 0.55, H * 0.1, W * 0.3, H * 0.55, H * 1.1); vg.addColorStop(0, "rgba(255,190,90,0.25)"); vg.addColorStop(1, "rgba(40,10,40,0.55)");
      g.fillStyle = vg; g.fillRect(0, 0, W, H);
      g.save(); g.translate(W * 0.28, H * 0.55); g.globalAlpha = 0.42;
      for (let i = 0; i < 18; i++) { g.rotate(Math.PI / 9); g.fillStyle = i % 2 ? "#ffd65a" : "#ff8a2a"; g.beginPath(); g.moveTo(0, 0); g.lineTo(1400, -110); g.lineTo(1400, 110); g.fill(); }
      g.restore();
      // empire map card, tilted, top right
      const mc = document.createElement("canvas"); mc.width = 1920; mc.height = 1080; drawMap(mc.getContext("2d")!, { f: 0, view: [48, 32.5, 1.15], full: 1 }, 1920, 1080);
      g.save(); g.translate(W * 0.72, H * 0.6); g.rotate(0.05);
      const mw = 900, mh = 506;
      g.fillStyle = "rgba(0,0,0,0.4)"; g.fillRect(-mw / 2 + 14, -mh / 2 + 18, mw, mh);
      g.fillStyle = "#f6ecd2"; g.fillRect(-mw / 2 - 14, -mh / 2 - 14, mw + 28, mh + 28);
      g.drawImage(mc, -mw / 2, -mh / 2, mw, mh); g.lineWidth = 8; g.strokeStyle = INK; g.strokeRect(-mw / 2 - 14, -mh / 2 - 14, mw + 28, mh + 28);
      g.restore();
      // big Alexander
      const cv = document.createElement("canvas"); cv.width = 1200; cv.height = 2000; const cg = cv.getContext("2d")!; cg.scale(2, 2);
      bodyFront(new Pen(cg), CAST.alex_helm, { expr: variant === 1 ? "determined" : "sly", mode: "stand", seed: 5, facing: 1, wave: variant === 1 ? 1 : undefined });
      const hh = H * 1.55; g.drawImage(cv, W * 0.29 - hh * 0.3, H * 0.98 - hh * 0.62, hh * 0.6, hh);
      // title text
      const gold = g.createLinearGradient(0, -90, 0, 90); gold.addColorStop(0, "#fff6c8"); gold.addColorStop(0.5, "#ffd23a"); gold.addColorStop(0.52, "#f2a81e"); gold.addColorStop(1, "#c46a10");
      text(g, "BOY KING", W * 0.72, H * 0.16, 200, gold, 28, -0.03);
      // red banner: NEVER LOST A BATTLE
      g.save(); g.translate(W * 0.72, H * 0.92); g.rotate(-0.03);
      g.fillStyle = INK; g.fillRect(-470, -62, 940, 124); g.fillStyle = "#c0272d"; g.fillRect(-458, -50, 916, 100);
      g.font = "900 70px Inter, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ffffff"; g.fillText("NEVER LOST A BATTLE", 0, 4); g.restore();
      // impact star on the map
    } });
  return E.out.toDataURL("image/png");
};
loadFonts().then(() => { (window as any).ready = true; });
