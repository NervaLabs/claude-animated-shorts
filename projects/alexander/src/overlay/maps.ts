// The animated parchment map (2D). Equirectangular projection (cos 36 deg), view = [centre lon, centre lat, zoom].
// Layers: sea + wave marks, land + grain, rivers, realm fills (Persia, Macedon, the empire revealed along the route,
// successor kingdoms with cracks), plum coast ink, the dashed campaign route with battle icons, founded-city dots,
// the Greek-culture glow, labels, and an Alexander token at the route's head.
import { feature } from "topojson-client";
import land50 from "world-atlas/land-50m.json";
import { type LL, PERSIA, MACEDON, EMPIRE, PTOLEMAIC, SELEUCID, ANTIGONID, OTHER, RIVERS, ROUTE, CULTURE, FOUNDED } from "./geo.ts";
import { clamp01, easeOut, smooth, hash } from "../core/time.ts";
import { pop } from "./text.ts";
import { Pen, bodyFront, fxBurst } from "../chars/toon.ts";
import { CAST } from "../chars/cast.ts";

export type MapLabel = { text: string; at: LL; t: number; dur?: number; sub?: string; size?: number; col?: string; dy?: number };
export type MapState = {
  view: [number, number, number]; persia?: number; mac?: number; route?: number; empire?: number; full?: number; breakup?: number; culture?: number;
  founded?: number; labels?: MapLabel[]; token?: boolean; battles?: [number, number][]; f: number; dim?: number; tokenWho?: keyof typeof CAST;
};

// ---- coastline rings within the region, as lon/lat arrays
const RINGS: LL[][] = (() => {
  const fc: any = feature(land50 as any, (land50 as any).objects.land);
  const out: LL[][] = [];
  for (const ft of fc.features ?? [fc]) {
    const g = ft.geometry, polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly) {
      if (ring.length < 4) continue;
      let inside = false;
      for (const [x, y] of ring) if (x > -5 && x < 100 && y > 0 && y < 60) { inside = true; break; }
      if (inside) out.push(ring.map(([x, y]: number[]) => [Math.max(-20, Math.min(120, x)), Math.max(-10, Math.min(70, y))] as LL));
    }
  }
  return out;
})();

const COSL = Math.cos((36 * Math.PI) / 180);
export const project = (view: [number, number, number], W: number, H: number) => {
  const [clon, clat, z] = view, s = (z * W) / (72 * COSL);
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
let tokenImg: Record<string, HTMLCanvasElement> = {};
const token = (who: keyof typeof CAST) => {
  if (tokenImg[who]) return tokenImg[who];
  const c = document.createElement("canvas"); c.width = 300; c.height = 500; const g = c.getContext("2d")!; g.scale(0.5, 0.5);
  bodyFront(new Pen(g), CAST[who], { expr: "determined", mode: "stand", seed: 5 }); tokenImg[who] = c; return c;
};
const routePts = (u: number): LL[] => {
  const n = Math.max(0, Math.min(ROUTE.length - 1, u)), i = Math.floor(n), fr = n - i;
  const pts = ROUTE.slice(0, i + 1);
  if (fr > 0 && i + 1 < ROUTE.length) pts.push([ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * fr, ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * fr]);
  return pts;
};
const fillRealm = (g: CanvasRenderingContext2D, P: any, polys: LL[][], col: string, alpha: number, ink: number, k: number) => {
  if (alpha <= 0) return;
  g.save(); g.globalAlpha *= alpha;
  g.lineJoin = "round"; g.strokeStyle = "#3a1e2a"; g.lineWidth = 7 * k;
  for (const p of polys) { g.beginPath(); pathLL(g, P, p); g.stroke(); }
  g.fillStyle = col; for (const p of polys) { g.beginPath(); pathLL(g, P, p); g.fill(); }
  // hatch for a painted look
  g.globalAlpha *= 0.18; g.strokeStyle = "#ffffff"; g.lineWidth = 2 * k;
  g.beginPath(); for (const p of polys) pathLL(g, P, p); g.clip();
  for (let x = -2000; x < 4000; x += 26 * k) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 1100, 1100 * 1.6); g.stroke(); }
  g.restore(); void ink;
};

export const drawMap = (g: CanvasRenderingContext2D, st: MapState, W: number, H: number) => {
  const k = H / 1080, P = project(st.view, W, H), f = st.f;
  g.save();
  // sea
  const sg = g.createLinearGradient(0, 0, 0, H); sg.addColorStop(0, "#7fb2c4"); sg.addColorStop(1, "#6aa0b6"); g.fillStyle = sg; g.fillRect(0, 0, W, H);
  g.strokeStyle = "rgba(255,255,255,0.32)"; g.lineWidth = 3 * k; g.lineCap = "round";
  for (let i = 0; i < 90; i++) { const x = hash(i, 9) * W, y = hash(i, 10) * H, w = (24 + hash(i, 11) * 30) * k, dx = Math.sin(f / 30 + i) * 4 * k; g.beginPath(); g.moveTo(x + dx, y); g.quadraticCurveTo(x + dx + w / 2, y - 7 * k, x + dx + w, y); g.stroke(); }
  // land
  g.beginPath(); for (const r of RINGS) pathLL(g, P, r);
  g.fillStyle = "#ead4a0"; g.fill("evenodd");
  g.save(); g.clip("evenodd"); g.drawImage(paper(W, H), 0, 0); g.restore();
  // rivers
  g.strokeStyle = "#6aa0b6"; g.lineWidth = 4 * k; g.lineJoin = "round";
  for (const rv of RIVERS) { g.beginPath(); rv.forEach((q, i) => { const [x, y] = P(q); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke(); }
  // realms
  const brk = clamp01(st.breakup ?? 0);
  if (st.persia) fillRealm(g, P, PERSIA, "#7a4fae", 0.55 * st.persia, 1, k);
  if (st.mac) fillRealm(g, P, MACEDON, "#c9473a", 0.75 * st.mac, 1, k);
  const fullA = clamp01(st.full ?? 0) * (1 - brk);
  if (fullA > 0) fillRealm(g, P, EMPIRE, "#c9473a", 0.62 * fullA, 1, k);
  if ((st.empire ?? 0) > 0 && st.route !== undefined && fullA < 1) {
    // empire revealed around the visited route: clip to a union of growing circles
    g.save(); g.beginPath();
    const pts = routePts(st.route);
    for (let i = 0; i < pts.length; i++) { const [x, y] = P(pts[i]), rr = (st.view[2] * 230 * k) * (i === pts.length - 1 ? 0.6 : 1); g.moveTo(x + rr, y); g.arc(x, y, rr, 0, Math.PI * 2); }
    g.clip(); fillRealm(g, P, EMPIRE, "#c9473a", 0.62 * (st.empire ?? 0) * (1 - fullA), 1, k); g.restore();
  }
  if (brk > 0) {
    const sh = smooth(brk) * 10 * k, c = (dx: number, dy: number, fn: () => void) => { g.save(); g.translate(dx * sh, dy * sh); fn(); g.restore(); };
    c(-0.6, 1, () => fillRealm(g, P, [PTOLEMAIC], "#e2b64a", 0.75 * brk, 1, k));
    c(1, -0.2, () => fillRealm(g, P, [SELEUCID], "#3f7fb5", 0.7 * brk, 1, k));
    c(-1, -0.6, () => fillRealm(g, P, ANTIGONID, "#b8312f", 0.75 * brk, 1, k));
    fillRealm(g, P, [OTHER], "#a8a090", 0.45 * brk, 1, k);
  }
  // coast ink
  g.beginPath(); for (const r of RINGS) pathLL(g, P, r);
  g.strokeStyle = "#2c1a2a"; g.lineWidth = 3 * k; g.lineJoin = "round"; g.stroke();
  // culture glow
  if (st.culture) {
    CULTURE.forEach((c, i) => {
      const u = clamp01(st.culture! * 1.6 - i * 0.06); if (u <= 0) return;
      const [x, y] = P(c), rr = (40 + 160 * easeOut(u)) * k * st.view[2];
      const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, "rgba(255,226,140,0.75)"); gr.addColorStop(0.5, "rgba(255,200,90,0.3)"); gr.addColorStop(1, "rgba(255,200,90,0)");
      g.fillStyle = gr; g.fillRect(x - rr, y - rr, 2 * rr, 2 * rr);
      // little column glyph
      const s = pop(u * 40) * k; if (s > 0) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = "#f6ecd2"; g.strokeStyle = "#2c1a2a"; g.lineWidth = 3;
        g.beginPath(); g.rect(-14, -22, 28, 6); g.rect(-9, -16, 18, 28); g.rect(-16, 12, 32, 6); g.fill(); g.stroke(); g.restore(); }
    });
  }
  // route
  if (st.route !== undefined && st.route > 0) {
    const pts = routePts(st.route);
    g.save(); g.lineCap = "round"; g.lineJoin = "round";
    g.strokeStyle = "#2c1a2a"; g.lineWidth = 11 * k; g.setLineDash([]); g.beginPath(); pts.forEach((q, i) => { const [x, y] = P(q); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke();
    g.strokeStyle = "#fff3c4"; g.lineWidth = 6 * k; g.setLineDash([18 * k, 12 * k]); g.lineDashOffset = -f * 1.2 * k; g.stroke();
    g.restore();
  }
  // battles: [route index, frames since reached]
  for (const [ri, t] of st.battles ?? []) {
    if (t < 0) continue;
    const [x, y] = P(ROUTE[ri]);
    if (t < 12) { g.save(); g.translate(x, y); const s = 0.35 * k; g.scale(s, s); g.translate(-256, -256); fxBurst(new Pen(g), t / 12, "#fff3b0", 10, 30, 230); g.restore(); }
    const s = pop(t) * k; g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = "round";
    for (const a of [-1, 1]) { g.save(); g.rotate(a * 0.75); g.strokeStyle = "#2c1a2a"; g.lineWidth = 11; g.beginPath(); g.moveTo(0, -26); g.lineTo(0, 22); g.stroke(); g.strokeStyle = "#e8e4dc"; g.lineWidth = 5; g.stroke(); g.strokeStyle = "#2c1a2a"; g.lineWidth = 9; g.beginPath(); g.moveTo(-10, 12); g.lineTo(10, 12); g.stroke(); g.restore(); }
    g.restore();
  }
  // founded cities
  if (st.founded) FOUNDED.forEach((c, i) => {
    const t = st.founded! - i * 4; if (t <= 0) return;
    const [x, y] = P(c), s = pop(t) * k; g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = "#fff3c4"; g.strokeStyle = "#2c1a2a"; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 11, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = "#c9473a"; g.beginPath(); g.arc(0, 0, 5, 0, Math.PI * 2); g.fill(); g.restore();
  });
  // token at the route head
  if (st.token && st.route !== undefined) {
    const pts = routePts(st.route), [x, y] = P(pts[pts.length - 1]), img = token(st.tokenWho ?? "alex_helm");
    const h = 150 * k, w = h * 0.6, b = Math.abs(Math.sin(f / 4)) * 6 * k;
    g.save(); g.fillStyle = "rgba(30,20,40,0.35)"; g.beginPath(); g.ellipse(x, y + 2 * k, 26 * k, 8 * k, 0, 0, Math.PI * 2); g.fill();
    g.drawImage(img, x - w / 2, y - h * 0.97 - b, w, h); g.restore();
  }
  // labels
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
  // paper vignette
  const vg = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.0); vg.addColorStop(0, "rgba(60,30,20,0)"); vg.addColorStop(1, `rgba(60,30,20,${0.45 + (st.dim ?? 0)})`);
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
  if (st.dim) { g.fillStyle = `rgba(10,6,20,${st.dim})`; g.fillRect(0, 0, W, H); }
  g.restore();
};
/** screen boxes of a label set, for the overlap test */
export const labelBoxes = (labels: MapLabel[], view: [number, number, number], W: number, H: number) => {
  const P = project(view, W, H), k = H / 1080;
  return labels.map((L) => { const [x, y] = P(L.at), size = (L.size ?? 40) * k, w = L.text.length * size * 0.78, h = size * (L.sub ? 1.9 : 1.1); const cy = y + (L.dy ?? -40) * k + (L.sub ? size * 0.4 : 0); return { x0: x - w / 2, x1: x + w / 2, y0: cy - h / 2, y1: cy + h / 2, text: L.text }; });
};
