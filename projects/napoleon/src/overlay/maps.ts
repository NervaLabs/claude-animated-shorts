// The animated parchment map (2D), data-driven: each shot passes realms, routes, battles, dots, labels and a token.
// Equirectangular projection with cos(48 deg) for Europe; view = [centre lon, centre lat, zoom] (zoom 1 = 60 deg of
// longitude across the frame). Same look as the Alexander episode: teal sea, parchment land, plum coast ink.
import { feature } from "topojson-client";
import land50 from "world-atlas/land-50m.json";
import type { LL } from "./geo.ts";
import { clamp01, easeOut, hash } from "../core/time.ts";
import { pop } from "./text.ts";
import { Pen, bodyFront, fxBurst } from "../chars/toon.ts";
import { CAST, type Who } from "../chars/cast.ts";

export type MapLabel = { text: string; at: LL; t: number; dur?: number; sub?: string; size?: number; col?: string; dy?: number };
export type Realm = { polys: LL[][]; col: string; alpha: number; shift?: [number, number]; reveal?: { at: LL; r: number } };
export type Route = { pts: LL[]; u: number; col?: string; arrow?: boolean };
export type MapState = {
  view: [number, number, number]; f: number;
  realms?: Realm[]; routes?: Route[]; battles?: { at: LL; t: number }[]; dots?: { at: LL; t: number; col?: string }[];
  labels?: MapLabel[]; token?: { at: LL; who?: Who }; glows?: { at: LL; r: number; t: number; col?: [number, number, number] }[];
  dim?: number; cold?: number;
};

const RINGS: LL[][] = (() => {
  const fc: any = feature(land50 as any, (land50 as any).objects.land);
  const out: LL[][] = [];
  for (const ft of fc.features ?? [fc]) {
    const g = ft.geometry, polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly) {
      if (ring.length < 4) continue;
      let inside = false;
      for (const [x, y] of ring) if (x > -105 && x < 75 && y > -50 && y < 78) { inside = true; break; }
      if (inside) out.push(ring.map(([x, y]: number[]) => [Math.max(-130, Math.min(100, x)), Math.max(-60, Math.min(85, y))] as LL));
    }
  }
  return out;
})();
const RIVERS: LL[][] = [
  [[0.2, 49.4], [2.35, 48.86], [4.2, 48.3]], [[4.1, 51.9], [6.9, 51.4], [7.6, 50.3], [8.2, 49.0], [7.6, 47.6]],
  [[8.6, 48.0], [12.0, 48.9], [16.37, 48.21], [19.0, 47.5], [21, 44.8], [25, 43.7], [28.7, 45.2]], [[31.0, 31.5], [31.2, 30.1], [31.3, 28], [30.8, 27], [32.9, 24.1]],
  [[23.9, 54.9], [25.5, 54.2], [27.5, 53.8]], [[37.6, 55.75], [38.8, 55.1], [39.7, 54.3]],
];
const COSL = Math.cos((48 * Math.PI) / 180);
export const project = (view: [number, number, number], W: number, H: number) => {
  const [clon, clat, z] = view, s = (z * W) / (60 * COSL);
  return ([lon, lat]: LL): [number, number] => [W / 2 + (lon - clon) * COSL * s, H / 2 - (lat - clat) * s];
};
const pathLL = (g: CanvasRenderingContext2D, P: (p: LL) => [number, number], ring: LL[]) => { ring.forEach((q, i) => { const [x, y] = P(q); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath(); };
let grain: HTMLCanvasElement | null = null;
const paper = (W: number, H: number) => {
  if (grain && grain.width === W) return grain;
  grain = document.createElement("canvas"); grain.width = W; grain.height = H;
  const g = grain.getContext("2d")!;
  for (let i = 0; i < 2600; i++) { const x = hash(i, 1) * W, y = hash(i, 2) * H, r = 20 + hash(i, 3) * 120; const gr = g.createRadialGradient(x, y, 0, x, y, r); const d = hash(i, 4) > 0.5; gr.addColorStop(0, d ? "rgba(90,60,30,0.035)" : "rgba(255,255,255,0.04)"); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
  return grain;
};
const tokens: Record<string, HTMLCanvasElement> = {};
const tokenImg = (who: Who) => {
  if (tokens[who]) return tokens[who];
  const c = document.createElement("canvas"); c.width = 300; c.height = 500; const g = c.getContext("2d")!; g.scale(0.5, 0.5);
  bodyFront(new Pen(g), CAST[who], { expr: "determined", mode: "stand", seed: 5, vest: who === "nap" || who === "nap_coat" }); tokens[who] = c; return c;
};
/** points of a polyline up to fraction u of its length */
export const partial = (pts: LL[], u: number): LL[] => {
  if (u >= 1) return pts; if (u <= 0) return [pts[0]];
  const seg = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
  let d = u * L; const out: LL[] = [pts[0]];
  for (let i = 0; i < seg.length; i++) { if (d >= seg[i]) { out.push(pts[i + 1]); d -= seg[i]; continue; } const k = d / seg[i]; out.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]); break; }
  return out;
};
const fillRealm = (g: CanvasRenderingContext2D, P: any, r: Realm, k: number) => {
  if (r.alpha <= 0) return;
  g.save(); g.globalAlpha *= r.alpha; if (r.shift) g.translate(r.shift[0] * k, r.shift[1] * k);
  if (r.reveal) { const [x, y] = P(r.reveal.at); g.beginPath(); g.arc(x, y, r.reveal.r * k, 0, Math.PI * 2); g.clip(); }
  g.lineJoin = "round"; g.strokeStyle = "#3a1e2a"; g.lineWidth = 7 * k;
  for (const p of r.polys) { g.beginPath(); pathLL(g, P, p); g.stroke(); }
  g.fillStyle = r.col; for (const p of r.polys) { g.beginPath(); pathLL(g, P, p); g.fill(); }
  g.globalAlpha *= 0.18; g.strokeStyle = "#ffffff"; g.lineWidth = 2 * k;
  g.beginPath(); for (const p of r.polys) pathLL(g, P, p); g.clip();
  for (let x = -2000; x < 4000; x += 26 * k) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 1100, 1100 * 1.6); g.stroke(); }
  g.restore();
};

export const drawMap = (g: CanvasRenderingContext2D, st: MapState, W: number, H: number) => {
  const k = H / 1080, P = project(st.view, W, H), f = st.f;
  g.save();
  const sg = g.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, "#7fb2c4"); sg.addColorStop(1, "#6aa0b6"); g.fillStyle = sg; g.fillRect(0, 0, W, H);
  g.strokeStyle = "rgba(255,255,255,0.32)"; g.lineWidth = 3 * k; g.lineCap = "round";
  for (let i = 0; i < 90; i++) { const x = hash(i, 9) * W, y = hash(i, 10) * H, w = (24 + hash(i, 11) * 30) * k, dx = Math.sin(f / 30 + i) * 4 * k; g.beginPath(); g.moveTo(x + dx, y); g.quadraticCurveTo(x + dx + w / 2, y - 7 * k, x + dx + w, y); g.stroke(); }
  g.beginPath(); for (const r of RINGS) pathLL(g, P, r);
  g.fillStyle = "#ead4a0"; g.fill("evenodd");
  g.save(); g.clip("evenodd"); g.drawImage(paper(W, H), 0, 0); g.restore();
  g.strokeStyle = "#6aa0b6"; g.lineWidth = 4 * k; g.lineJoin = "round";
  for (const rv of RIVERS) { g.beginPath(); rv.forEach((q, i) => { const [x, y] = P(q); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke(); }
  for (const r of st.realms ?? []) fillRealm(g, P, r, k);
  g.beginPath(); for (const r of RINGS) pathLL(g, P, r);
  g.strokeStyle = "#2c1a2a"; g.lineWidth = 3 * k; g.lineJoin = "round"; g.stroke();
  for (const gl of st.glows ?? []) {
    const u = clamp01(gl.t / 30); if (u <= 0) continue;
    const [x, y] = P(gl.at), rr = gl.r * k * easeOut(u) * (1 + 0.06 * Math.sin(f / 4)), c = gl.col ?? [255, 120, 40];
    const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},0.8)`); gr.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
    g.fillStyle = gr; g.fillRect(x - rr, y - rr, 2 * rr, 2 * rr);
  }
  for (const rt of st.routes ?? []) {
    const pts = partial(rt.pts, rt.u); if (pts.length < 2) continue;
    g.save(); g.lineCap = "round"; g.lineJoin = "round";
    g.strokeStyle = "#2c1a2a"; g.lineWidth = 11 * k; g.beginPath(); pts.forEach((q, i) => { const [x, y] = P(q); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke();
    g.strokeStyle = rt.col ?? "#fff3c4"; g.lineWidth = 6 * k; g.setLineDash([18 * k, 12 * k]); g.lineDashOffset = -f * 1.2 * k; g.stroke();
    if (rt.arrow !== false && rt.u > 0.02) { const [x1, y1] = P(pts[pts.length - 1]), [x0, y0] = P(pts[pts.length - 2]); const a = Math.atan2(y1 - y0, x1 - x0);
      g.setLineDash([]); g.translate(x1, y1); g.rotate(a); g.beginPath(); g.moveTo(14 * k, 0); g.lineTo(-12 * k, -12 * k); g.lineTo(-12 * k, 12 * k); g.closePath(); g.fillStyle = rt.col ?? "#fff3c4"; g.fill(); g.lineWidth = 4 * k; g.strokeStyle = "#2c1a2a"; g.stroke(); }
    g.restore();
  }
  for (const b of st.battles ?? []) {
    if (b.t < 0) continue;
    const [x, y] = P(b.at);
    if (b.t < 12) { g.save(); g.translate(x, y); const s = 0.35 * k; g.scale(s, s); g.translate(-256, -256); fxBurst(new Pen(g), b.t / 12, "#fff3b0", 10, 30, 230); g.restore(); }
    const s = pop(b.t) * k; g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = "round";
    for (const a of [-1, 1]) { g.save(); g.rotate(a * 0.75); g.strokeStyle = "#2c1a2a"; g.lineWidth = 11; g.beginPath(); g.moveTo(0, -26); g.lineTo(0, 22); g.stroke(); g.strokeStyle = "#e8e4dc"; g.lineWidth = 5; g.stroke(); g.strokeStyle = "#2c1a2a"; g.lineWidth = 9; g.beginPath(); g.moveTo(-10, 12); g.lineTo(10, 12); g.stroke(); g.restore(); }
    g.restore();
  }
  for (const d of st.dots ?? []) {
    if (d.t <= 0) continue;
    const [x, y] = P(d.at), s = pop(d.t) * k; g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = "#fff3c4"; g.strokeStyle = "#2c1a2a"; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 11, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = d.col ?? "#27408b"; g.beginPath(); g.arc(0, 0, 5, 0, Math.PI * 2); g.fill(); g.restore();
  }
  if (st.token) {
    const [x, y] = P(st.token.at), img = tokenImg(st.token.who ?? "nap");
    const h = 150 * k, w = h * 0.6, b = Math.abs(Math.sin(f / 4)) * 6 * k;
    g.save(); g.fillStyle = "rgba(30,20,40,0.35)"; g.beginPath(); g.ellipse(x, y + 2 * k, 26 * k, 8 * k, 0, 0, Math.PI * 2); g.fill();
    g.drawImage(img, x - w / 2, y - h * 0.97 - b, w, h); g.restore();
  }
  for (const L of st.labels ?? []) {
    const [x, y] = P(L.at);
    if (L.t < 0 || L.t > (L.dur ?? 1e9) + 6) continue;
    const s = pop(L.t), a = L.dur !== undefined && L.t > L.dur ? 1 - (L.t - L.dur) / 6 : 1;
    g.save(); g.globalAlpha *= clamp01(a); g.translate(x, y + (L.dy ?? -40) * k); g.scale(s, s);
    const size = (L.size ?? 40) * k;
    g.font = `900 ${size}px Cinzel, serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
    g.lineWidth = 9 * k; g.strokeStyle = "#f6ecd2"; g.strokeText(L.text, 0, 0); g.fillStyle = L.col ?? "#3a1e2a"; g.fillText(L.text, 0, 0);
    if (L.sub) { g.font = `700 ${size * 0.55}px Cinzel, serif`; g.lineWidth = 6 * k; g.strokeText(L.sub, 0, size * 0.85); g.fillStyle = "#5a4a3a"; g.fillText(L.sub, 0, size * 0.85); }
    g.restore();
  }
  if (st.cold) { g.fillStyle = `rgba(200,220,255,${0.35 * st.cold})`; g.fillRect(0, 0, W, H); }
  const vg = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.0); vg.addColorStop(0, "rgba(60,30,20,0)"); vg.addColorStop(1, `rgba(60,30,20,${0.45 + (st.dim ?? 0)})`);
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
  if (st.dim) { g.fillStyle = `rgba(10,6,20,${st.dim})`; g.fillRect(0, 0, W, H); }
  g.restore();
};
export const labelBoxes = (labels: MapLabel[], view: [number, number, number], W: number, H: number) => {
  const P = project(view, W, H), k = H / 1080;
  return labels.map((L) => { const [x, y] = P(L.at), size = (L.size ?? 40) * k, w = L.text.length * size * 0.78, h = size * (L.sub ? 1.9 : 1.1); const cy = y + (L.dy ?? -40) * k + (L.sub ? size * 0.4 : 0); return { x0: x - w / 2, x1: x + w / 2, y0: cy - h / 2, y1: cy + h / 2, text: L.text }; });
};
