// 2D text overlays: word captions (reference style: one word, white heavy sans, thin black outline, lower middle,
// hard swap per word), the title card, year stamps and place labels (Cinzel, a Roman-inscription face).
// All sizes are specified at 1080 p and scale with the canvas height.
import cinzelUrl from "../../assets/fonts/cinzel.woff2";
import { clamp01, easeOut } from "../core/time.ts";

export const loadFonts = async () => {
  const f = new FontFace("Cinzel", `url(${cinzelUrl})`, { weight: "400 900" });
  await f.load(); (document as any).fonts.add(f);
  await (document as any).fonts.load('900 40px "Inter"'); await (document as any).fonts.load('900 40px "Cinzel"');
};
const INK = "#160f1c";
/** pop-in scale: overshoot 4 frames then settle */
export const pop = (t: number) => (t <= 0 ? 0 : t < 4 ? 0.6 + 0.55 * easeOut(t / 4) : t < 7 ? 1.15 - 0.15 * ((t - 4) / 3) : 1);

export const drawCaption = (g: CanvasRenderingContext2D, text: string, W: number, H: number) => {
  const k = H / 1080, size = 74 * k;
  g.save(); g.font = `900 ${size}px Inter, "DejaVu Sans", sans-serif`; g.textAlign = "center"; g.textBaseline = "alphabetic";
  g.lineJoin = "round"; g.miterLimit = 2;
  const x = W / 2, y = H * 0.86;
  g.lineWidth = 11 * k; g.strokeStyle = "#000"; g.strokeText(text, x, y);
  g.fillStyle = "#ffffff"; g.fillText(text, x, y);
  g.restore();
};

/** year stamp: big Cinzel numerals on a dark ribbon, top left, popping in at t = frames since start, out after `dur` */
export const drawStamp = (g: CanvasRenderingContext2D, text: string, t: number, dur: number, W: number, H: number, pos: [number, number] = [0.08, 0.16]) => {
  if (t < 0 || t > dur + 8) return;
  const k = H / 1080, s = pop(t) * (t > dur ? 1 - (t - dur) / 8 : 1), a = t > dur ? 1 - (t - dur) / 8 : 1;
  g.save(); g.globalAlpha *= clamp01(a); g.translate(pos[0] * W, pos[1] * H); g.scale(s, s); g.rotate(-0.04);
  g.font = `900 ${92 * k}px Cinzel, serif`; g.textBaseline = "middle"; g.textAlign = "left";
  const w = g.measureText(text).width;
  g.fillStyle = "rgba(22,15,28,0.82)"; g.beginPath(); g.roundRect(-28 * k, -64 * k, w + 56 * k, 128 * k, 14 * k); g.fill();
  g.lineWidth = 5 * k; g.strokeStyle = "#e2b64a"; g.stroke();
  const gr = g.createLinearGradient(0, -40 * k, 0, 40 * k); gr.addColorStop(0, "#fff3c4"); gr.addColorStop(0.55, "#f2c94c"); gr.addColorStop(1, "#c98a2a");
  g.fillStyle = gr; g.fillText(text, 0, 6 * k);
  g.restore();
};

/** place / name label: small Cinzel plate with a pointer, anchored at screen point (fx, fy) in 0..1 */
export const drawLabel = (g: CanvasRenderingContext2D, text: string, t: number, dur: number, W: number, H: number, fx: number, fy: number, o: { size?: number; sub?: string; col?: string } = {}) => {
  if (t < 0 || t > dur + 6) return;
  const k = H / 1080, s = pop(t), a = t > dur ? 1 - (t - dur) / 6 : 1;
  g.save(); g.globalAlpha *= clamp01(a); g.translate(fx * W, fy * H); g.scale(s, s);
  const size = (o.size ?? 46) * k;
  g.font = `900 ${size}px Cinzel, serif`; g.textAlign = "center"; g.textBaseline = "middle";
  const sub = o.sub;
  let w = g.measureText(text).width;
  if (sub) { g.font = `700 ${size * 0.5}px Cinzel, serif`; w = Math.max(w, g.measureText(sub).width); g.font = `900 ${size}px Cinzel, serif`; }
  const h = size * (sub ? 2.0 : 1.45);
  g.fillStyle = "#f6ecd2"; g.strokeStyle = INK; g.lineWidth = 5 * k;
  g.beginPath(); g.roundRect(-w / 2 - 26 * k, -h / 2, w + 52 * k, h, 10 * k); g.fill(); g.stroke();
  g.fillStyle = o.col ?? "#7a1f24"; g.fillText(text, 0, sub ? -size * 0.32 : 2 * k);
  if (sub) { g.font = `700 ${size * 0.5}px Cinzel, serif`; g.fillStyle = "#4a3a30"; g.fillText(sub, 0, size * 0.55); }
  g.restore();
};

/** title card: gold "ALEXANDER THE GREAT" popping word by word, subtitle rising; over a dark vignette */
export const drawTitle = (g: CanvasRenderingContext2D, t: number, dur: number, W: number, H: number) => {
  if (t < 0 || t > dur + 10) return;
  const k = H / 1080, out = t > dur ? 1 - (t - dur) / 10 : 1;
  g.save(); g.globalAlpha *= clamp01(out);
  const vg = g.createRadialGradient(W / 2, H * 0.45, H * 0.15, W / 2, H * 0.45, H * 0.85); vg.addColorStop(0, "rgba(10,6,20,0.25)"); vg.addColorStop(1, "rgba(10,6,20,0.75)");
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
  const words = ["ALEXANDER", "THE", "GREAT"], sizes = [150, 80, 150];
  let y = H * 0.34;
  const step = (i: number) => (i < 2 ? (sizes[i] + sizes[i + 1]) * 0.5 * k * 1.02 : sizes[i] * k * 0.6);
  words.forEach((w, i) => {
    const s = pop(t - i * 5); if (s <= 0) { y += step(i); return; }
    g.save(); g.translate(W / 2, y); g.scale(s, s);
    g.font = `900 ${sizes[i] * k}px Cinzel, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
    g.lineWidth = 16 * k; g.strokeStyle = INK; g.strokeText(w, 0, 0);
    const gr = g.createLinearGradient(0, -sizes[i] * k * 0.4, 0, sizes[i] * k * 0.4); gr.addColorStop(0, "#fff6d0"); gr.addColorStop(0.5, "#f2c94c"); gr.addColorStop(0.51, "#d9a33a"); gr.addColorStop(1, "#a8701f");
    g.fillStyle = gr; g.fillText(w, 0, 0); g.restore();
    y += step(i);
  });
  const st = clamp01((t - 14) / 8);
  if (st > 0) {
    g.globalAlpha *= st; g.font = `700 ${50 * k}px Cinzel, serif`; g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 9 * k; g.strokeStyle = INK; const yy = y + 30 * k + (1 - easeOut(st)) * 30 * k;
    g.strokeText("The Boy Who Conquered an Empire", W / 2, yy); g.fillStyle = "#f6ecd2"; g.fillText("The Boy Who Conquered an Empire", W / 2, yy);
  }
  g.restore();
};
/** small corner tag ("LEGEND SAYS", "ACCORDING TO PLUTARCH") */
export const drawTag = (g: CanvasRenderingContext2D, text: string, t: number, dur: number, W: number, H: number) => {
  if (t < 0 || t > dur + 6) return;
  const k = H / 1080, s = pop(t), a = t > dur ? 1 - (t - dur) / 6 : 1;
  g.save(); g.globalAlpha *= clamp01(a); g.translate(W - 70 * k, 80 * k); g.scale(s, s);
  g.font = `900 ${34 * k}px Cinzel, serif`; g.textAlign = "right"; g.textBaseline = "middle";
  const w = g.measureText(text).width;
  g.fillStyle = "rgba(22,15,28,0.8)"; g.beginPath(); g.roundRect(-w - 24 * k, -30 * k, w + 48 * k, 60 * k, 30 * k); g.fill();
  g.fillStyle = "#f2c94c"; g.fillText(text, 0, 2 * k); g.restore();
};
