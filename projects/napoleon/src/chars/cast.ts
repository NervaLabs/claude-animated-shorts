// Our cast for the Alexander documentary, effect sprites and prop cards. Every card's texture key carries every
// input of its drawing (quantised), so a cached texture never depends on which frame drew it first.
import { Pen, bodyFront, bodySide, fxBurst, INK, mix, shade, townsfolk, type Outfit, type Expr, type Prop } from "./toon.ts";
import type { CardDraw } from "../render/cards.ts";
import { hash, type V3 } from "../core/time.ts";

export type Who = "nap_boy" | "cadet" | "nap_young" | "nap" | "nap_crown" | "nap_coat" | "josephine" | "pope" | "king" | "sans" | "fr_soldier" | "guard"
  | "redcoat" | "wellington" | "blucher" | "prussian" | "russian" | "austrian" | "mamluk" | "scholar" | "nelson" | "townsman" | "physician" | "general" | "builder";

const BOOT = "#141216", WHITE = "#f1ece0", BLUE = "#26386e", GOLD = "#e2b64a", HAIR_N = "#3a2a20";
export const CAST: Record<Who, Outfit> = {
  nap_boy: { jacket: "#2f4a8a", pants: "#2a2a3a", boots: BOOT, hat: "hair", hair: HAIR_N, forelock: true, lapels: "#b8312f", build: "kid", skin: "#f3d2b0" },
  cadet: { jacket: "#2f4a8a", pants: "#2a2a3a", boots: BOOT, hat: "hair", hair: "#7a5a3a", lapels: "#b8312f", build: "kid" },
  nap_young: { jacket: BLUE, pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: WHITE, epaulettes: GOLD, lapels: "#1f2d5a", skin: "#f3d2b0" },
  nap: { jacket: BLUE, pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: WHITE, epaulettes: GOLD, lapels: WHITE, skin: "#f3d2b0" },
  nap_crown: { jacket: "#a3182a", pants: "#2a2a3a", boots: GOLD, hat: "hair", hair: HAIR_N, forelock: true, crown: "wreath", cloak: "#a3182a", ermine: true, breeches: WHITE, skin: "#f3d2b0" },
  nap_coat: { jacket: "#7d7f86", pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: WHITE, lapels: "#6a6c73", skin: "#efcdb0", build: "stout" },
  josephine: { jacket: "#f6f2ea", pants: "#2a2a3a", boots: "#d8c8a8", hat: "hair", hair: "#2a1d18", dress: "#f6f2ea", crown: "gold", robeTrim: GOLD },
  pope: { jacket: "#f6f2ea", pants: "#2a2a3a", boots: "#c0272d", hat: "mitre", dress: "#f6f2ea", robeTrim: GOLD, skin: "#f0d0b0" },
  king: { jacket: "#2c3f8f", pants: "#2a2a3a", boots: BOOT, hat: "hair", hair: "#e8e4dc", crown: "gold", cloak: "#2c3f8f", ermine: true, breeches: WHITE, build: "stout" },
  sans: { jacket: "#8a5a3a", pants: "#2a2a3a", boots: "#5a3b2a", hat: "cap", cap: "#c0272d", breeches: "#e8dcc4", sash: "#27408b" },
  fr_soldier: { jacket: "#27408b", pants: "#2a2a3a", boots: BOOT, hat: "shako", tuft: "#c0272d", belt: WHITE, lapels: WHITE, breeches: WHITE, rifle: true },
  guard: { jacket: "#1f2d5a", pants: "#2a2a3a", boots: BOOT, hat: "bearskin", tuft: "#c0272d", belt: WHITE, lapels: WHITE, breeches: WHITE, rifle: true, moustache: "#2a1d18" },
  redcoat: { jacket: "#c0272d", pants: "#5a5a64", boots: BOOT, hat: "shako", tuft: WHITE, belt: WHITE, breeches: "#5a5a64", rifle: true },
  wellington: { jacket: "#2a3550", pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: "#e9dfc4", cloak: "#3a4560", skin: "#f3d6bc" },
  blucher: { jacket: "#1f2a4a", pants: "#2a2a3a", boots: BOOT, hat: "cap", cap: "#1c1a22", moustache: "#ece8e0", lapels: "#b8312f", breeches: "#8a8c94", build: "stout", skin: "#efcbb0" },
  prussian: { jacket: "#1f2a4a", pants: "#2a2a3a", boots: BOOT, hat: "shako", tuft: WHITE, belt: WHITE, breeches: "#8a8c94", rifle: true },
  russian: { jacket: "#2f5a3a", pants: "#2a2a3a", boots: BOOT, hat: "shako", tuft: "#2f5a3a", belt: WHITE, breeches: "#e8e4dc", rifle: true },
  austrian: { jacket: "#ece6d8", pants: "#2a2a3a", boots: BOOT, hat: "shako", tuft: "#1c1a22", belt: "#c9c2b0", breeches: "#8a9ab8", rifle: true },
  mamluk: { jacket: "#c2563a", pants: "#2a2a3a", boots: "#c9963f", hat: "turban", cap: "#f4f0e6", dress: "#c2563a", robeTrim: GOLD, sword: true, moustache: "#1d1a1a", skin: "#d9a47a" },
  scholar: { jacket: "#6a4a3a", pants: "#2a2a3a", boots: BOOT, hat: "tophat", breeches: "#d8ccb0" },
  nelson: { jacket: "#1f2a4a", pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: WHITE, epaulettes: GOLD, lapels: WHITE },
  townsman: { jacket: "#3f6fb5", pants: "#3b3f52", boots: "#4a3426", hat: "tophat" },
  physician: { jacket: "#2a2a30", pants: "#2a2a3a", boots: BOOT, hat: "hair", hair: "#9a958e", breeches: "#2a2a30" },
  general: { jacket: BLUE, pants: "#2a2a3a", boots: BOOT, hat: "bicorne", breeches: WHITE, epaulettes: GOLD, lapels: "#b8312f", moustache: "#4a3020" },
  builder: { jacket: "#8a6a4a", pants: "#2a2a3a", boots: BOOT, hat: "cap", cap: "#5a4a3a" },
};
for (const w of Object.keys(CAST) as Who[]) if (CAST[w].buttons === undefined && !CAST[w].belt) CAST[w].buttons = "none";
const SKINS = ["#ffe2c2", "#f5c9a0", "#ecd0b6", "#c99067"];
/** crowd variants: same design, varied skin / details */
export const variant = (who: Who, v: number): Outfit => {
  const o: Outfit = { ...CAST[who], skin: CAST[who].skin ?? SKINS[v % 4] };
  if (["fr_soldier", "redcoat", "prussian", "russian", "austrian", "guard"].includes(who)) { o.skin = SKINS[v % 3]; if (v % 3 === 1) o.moustache = "#3a2a20"; }
  if (who === "townsman") { const t = townsfolk(v); Object.assign(o, t); }
  if (who === "cadet") { o.hair = ["#7a5a3a", "#c9a46a", "#3a2a20", "#a8552a"][v % 4]; o.skin = SKINS[v % 3]; }
  if (who === "sans") { o.cap = v % 3 === 2 ? "#3a3a46" : "#c0272d"; o.jacket = ["#8a5a3a", "#5d7a3a", "#6a4a7a"][v % 3]; o.skin = SKINS[v % 4]; }
  if (who === "mamluk") { o.dress = o.jacket = ["#c2563a", "#2f8a6a", "#d9a441", "#7b5ac9"][v % 4]; o.cap = ["#f4f0e6", "#e2b64a", "#c0272d"][v % 3]; }
  return o;
};

// ---------------- blinks + walk ----------------
/** 0 open, 0.5 half, 1 shut. One blink per 40-frame cell at a seeded offset: 4 frames (half, shut, shut, half),
 *  consecutive blinks 25-55 frames apart */
export const blinkAt = (seed: number, f: number) => {
  const cell = Math.floor(f / 40), off = 5 + Math.floor(hash(seed, cell) * 20), d = f - cell * 40 - off;
  return d === 0 || d === 3 ? 0.5 : d === 1 || d === 2 ? 1 : 0;
};
/** walk cycle phase 0..1 (one cycle = two steps); 1.4 Hz -> a step every ~10.7 frames */
export const walkPhase = (f: number, rate = 1.4, off = 0) => (((f / 30) * rate + off) % 1 + 1) % 1;
const q = (x: number, n: number) => Math.round(x * n) / n;

export type Pose = {
  who: Who; v?: number; view?: "front" | "side"; facing?: -1 | 0 | 1; expr?: Expr;
  mode?: "march" | "stroll" | "stand" | "sit" | "fall" | "push"; phase?: number; wave?: number; tilt?: number; headTilt?: number;
  look?: number; prop?: Prop; stomp?: number; seed?: number; blinkOff?: boolean; stride?: number; pose?: number; vest?: boolean;
};
const CH_W = 600, CH_H = 1000, CH_M = 2.16; // design canvas + its height in metres (SU = 0.00216)

/** a character card (+ its contact shadow) standing at pos; side view faces +x on screen unless flip */
export const charCard = (P: Pose, pos: V3, f: number, o: { flip?: boolean; scale?: number; alpha?: number; shadow?: boolean; lit?: number; z?: number } = {}): CardDraw[] => {
  const seed = P.seed ?? 3, view = P.view ?? "front";
  const blink = P.blinkOff ? 0 : blinkAt(seed + 17, f);
  const mode = P.mode ?? "stand", phase = q(P.phase ?? 0, 12);
  const outfit = variant(P.who, P.v ?? 0);
  const k = [P.who, P.v ?? 0, view, P.facing ?? 0, P.expr ?? "neutral", mode, phase, blink, q(P.wave ?? -9, 8), q(P.tilt ?? 0, 2), q(P.headTilt ?? 0, 2),
    q(P.look ?? 0, 4), JSON.stringify(P.prop ?? null), q(P.stomp ?? 1, 10), seed, q(P.stride ?? 1, 10), q(P.pose ?? 0, 10), P.vest ? 1 : 0].join("|");
  const sc = o.scale ?? 1;
  const draw = (g: CanvasRenderingContext2D) => {
    const p = new Pen(g);
    if (view === "side") bodySide(p, outfit, { phase, expr: P.expr, mode: mode === "stroll" ? "march" : (mode as any), blink, stomp: P.stomp, seed, stride: P.stride, pose: P.pose });
    else bodyFront(p, outfit, { phase, expr: P.expr, mode: mode as any, blink, facing: P.facing ?? 0, wave: P.wave, tilt: P.tilt, headTilt: P.headTilt, look: P.look, prop: P.prop ?? null, seed, vest: P.vest });
  };
  const out: CardDraw[] = [{ key: "ch:" + k, cw: CH_W, ch: CH_H, h: CH_M * sc, pos, draw, flip: o.flip, alpha: o.alpha, lit: o.lit, z: o.z }];
  if (o.shadow !== false) out.push(shadowCard(pos, 0.55 * sc));
  return out;
};
export const shadowCard = (pos: V3, w: number, alpha = 1): CardDraw => ({
  key: "shadow", cw: 300, ch: 300, h: w, pos, flat: true, shadow: true, anchor: 0.5, alpha, lit: 0,
  draw: (g) => { const gr = g.createRadialGradient(150, 150, 0, 150, 150, 150); gr.addColorStop(0, "rgba(28,18,48,0.6)"); gr.addColorStop(0.55, "rgba(28,18,48,0.32)"); gr.addColorStop(1, "rgba(28,18,48,0)"); g.setTransform(1, 0, 0, 0.42, 0, 87); g.fillStyle = gr; g.fillRect(0, 0, 300, 300); },
});

// ---------------- effects (t = 0..1 progress) ----------------
type FxKind = "dust" | "burst" | "clash" | "speed" | "sparkle" | "flame" | "smoke" | "glow" | "puff" | "quest" | "bang";
export const fxCard = (kind: FxKind, pos: V3, size: number, t: number, seed = 1, o: { flip?: boolean; alpha?: number; emissive?: boolean } = {}): CardDraw => {
  const tq = q(t, 16), sq = seed % 6;
  return { key: `fx:${kind}:${tq}:${sq}`, cw: 512, ch: 512, h: size, pos, anchor: 0.5, flip: o.flip, alpha: o.alpha, lit: kind === "flame" || kind === "glow" ? 0 : 0.6,
    emissive: o.emissive ?? (kind === "flame" || kind === "glow" || kind === "sparkle" || kind === "burst"), z: 3,
    draw: (g) => drawFx(g, kind, tq, sq) };
};
const drawFx = (g: CanvasRenderingContext2D, kind: FxKind, t: number, s: number) => {
  const p = new Pen(g); p.ol = 7;
  const r = (k: number) => hash(s * 13 + k, 7);
  if (kind === "dust" || kind === "puff" || kind === "smoke") {
    const col = kind === "smoke" ? "#8c8aa0" : "#dcc7a0", n = kind === "puff" ? 5 : 8;
    g.globalAlpha = Math.max(0, 1 - Math.max(0, t - 0.55) / 0.45);
    for (let i = 0; i < n; i++) {
      const a = r(i) * Math.PI * 2, d = (0.15 + 0.6 * t) * 200 * (0.4 + r(i + 20)), rr = (30 + 55 * r(i + 40)) * (0.6 + 0.9 * t);
      const x = 256 + Math.cos(a) * d, y = 330 - Math.abs(Math.sin(a)) * d * 0.8 - t * 60 * (kind === "smoke" ? 3 : 1);
      p.ell(x, y, rr, rr * 0.86, shade(col, 0.92 + 0.12 * r(i + 60)), 6);
    }
  } else if (kind === "burst") fxBurst(p, t, "#fff3b0", 10, 30, 230);
  else if (kind === "clash") {
    fxBurst(p, t, "#ffffff", 8, 20, 200);
    for (let i = 0; i < 6; i++) { const a = r(i) * Math.PI * 2, d = 60 + 150 * t; p.poly([[256 + Math.cos(a) * d, 256 + Math.sin(a) * d], [256 + Math.cos(a + 0.1) * (d + 30), 256 + Math.sin(a + 0.1) * (d + 30)], [256 + Math.cos(a - 0.1) * (d + 24), 256 + Math.sin(a - 0.1) * (d + 24)]], "#ffe07a", 4); }
  } else if (kind === "speed") {
    g.globalAlpha = 1 - t * 0.6;
    for (let i = 0; i < 7; i++) { const y = 80 + i * 55 + r(i) * 20, x0 = 40 + r(i + 9) * 120; p.stroke([[x0, y], [x0 + 220 + r(i + 3) * 120, y]], 9, "#ffffff"); }
  } else if (kind === "sparkle") {
    for (let i = 0; i < 4; i++) {
      const x = 120 + r(i) * 270, y = 120 + r(i + 5) * 270, sz = (30 + 50 * r(i + 8)) * Math.sin(Math.PI * Math.min(1, (t * 1.6 + r(i + 2) * 0.5) % 1));
      if (sz <= 1) continue;
      p.poly([[x, y - sz], [x + sz * 0.22, y - sz * 0.22], [x + sz, y], [x + sz * 0.22, y + sz * 0.22], [x, y + sz], [x - sz * 0.22, y + sz * 0.22], [x - sz, y], [x - sz * 0.22, y - sz * 0.22]], "#fff6c8", 4);
    }
  } else if (kind === "flame") {
    const w = 1 + 0.08 * Math.sin(t * 6.283 * 2 + s), h = 1 + 0.1 * Math.sin(t * 6.283 * 3 + s * 2);
    const fl = (sx: number, sy: number, col: string) => p.poly([[256 - 90 * sx * w, 400], [256 - 70 * sx * w, 300], [256 - 20 * sx, 200 - 60 * sy * h], [256 + 10 * sx * w, 60 + 120 * (1 - sy) * h], [256 + 40 * sx, 220], [256 + 85 * sx * w, 310], [256 + 80 * sx * w, 400], [256, 440]], col, 0);
    fl(1, 1, "#ff7a2a"); fl(0.72, 0.8, "#ffb43a"); fl(0.42, 0.55, "#fff1a0");
  } else if (kind === "glow") {
    const gr = g.createRadialGradient(256, 256, 0, 256, 256, 256); gr.addColorStop(0, "rgba(255,220,150,0.85)"); gr.addColorStop(0.4, "rgba(255,170,90,0.35)"); gr.addColorStop(1, "rgba(255,150,80,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  } else if (kind === "quest" || kind === "bang") {
    const sz = 1 - (1 - Math.min(1, t * 4)) ** 3;
    g.translate(256, 300); g.scale(sz, sz); g.translate(-256, -300);
    g.font = "900 300px Arial Black, Arial, sans-serif"; g.textAlign = "center"; g.lineWidth = 22; g.strokeStyle = INK; g.lineJoin = "round";
    const ch = kind === "quest" ? "?" : "!";
    g.strokeText(ch, 256, 400); g.fillStyle = kind === "quest" ? "#ffffff" : "#ffd23a"; g.fillText(ch, 256, 400);
  }
};

// ---------------- props (side view, facing screen-right unless flipped) ----------------
type PropKind = "horse" | "horse_rear" | "chariot" | "elephant" | "ship" | "bird" | "scroll" | "dagger" | "flag_mac" | "flag_per" | "torch" | "wreath"
  | "token_m" | "token_p" | "geom" | "pillow" | "bed" | "lamp" | "crown_fall" | "tablet" | "sack" | "brazier" | "spear_beach" | "cradle" | "horse_shadow" | "throne"
  | "height_chart" | "cartoon" | "flag_white" | "cannon" | "warship" | "flag_fr" | "flag_uk" | "eagle" | "rosetta" | "sphinx" | "book" | "painting" | "snowball" | "desk" | "chair" | "bicorne_prop" | "coffin_cart";
export const PROP_SIZE: Record<PropKind, [number, number, number]> = { // canvas w, h, metres tall
  horse: [1100, 900, 2.3], horse_rear: [1100, 1000, 2.6], chariot: [1400, 900, 2.0], elephant: [1300, 1100, 3.6], ship: [1600, 1200, 9], bird: [300, 200, 0.45],
  scroll: [500, 300, 0.5], dagger: [300, 120, 0.35], flag_mac: [500, 1400, 4.2], flag_per: [500, 1400, 4.2], torch: [200, 900, 2.2], wreath: [300, 200, 0.4],
  token_m: [120, 160, 0.16], token_p: [120, 160, 0.16], geom: [1000, 1000, 2.2], pillow: [600, 240, 0.4], bed: [1400, 600, 1.1], lamp: [300, 400, 0.55],
  crown_fall: [320, 220, 0.42], tablet: [400, 300, 0.4], sack: [300, 360, 0.6], brazier: [400, 600, 1.2], spear_beach: [200, 1200, 3.4],
  cradle: [700, 500, 0.9], horse_shadow: [1100, 900, 2.3], throne: [500, 700, 1.6],
  height_chart: [300, 1100, 2.2], cartoon: [700, 900, 1.3], flag_white: [500, 1400, 3.2],
  cannon: [1000, 600, 1.5], warship: [1800, 1500, 14], flag_fr: [500, 1400, 4.2], flag_uk: [500, 1400, 4.2], eagle: [400, 1300, 3.0], rosetta: [500, 640, 1.1],
  sphinx: [1400, 800, 9], book: [500, 380, 0.5], painting: [1200, 800, 3.2], snowball: [120, 120, 0.22], desk: [900, 600, 1.0], chair: [400, 700, 1.1], bicorne_prop: [400, 200, 0.4], coffin_cart: [1500, 900, 3.0],
};
export const propCard = (kind: PropKind, pos: V3, f: number, o: { flip?: boolean; phase?: number; scale?: number; rider?: Who; roll?: number; flat?: boolean; yaw?: number; anim?: number; z?: number; alpha?: number } = {}): CardDraw[] => {
  const [cw, ch, hm] = PROP_SIZE[kind];
  const ph = q(o.phase ?? 0, 12), an = q(o.anim ?? 0, 12);
  const out: CardDraw[] = [{ key: `pr:${kind}:${ph}:${an}:${o.rider ?? ""}`, cw, ch, h: hm * (o.scale ?? 1), pos, flip: o.flip, roll: o.roll, flat: o.flat, yaw: o.yaw,
    anchor: o.flat ? 0.5 : 0.97, z: o.z, alpha: o.alpha, emissive: kind === "lamp" ? false : undefined,
    draw: (g) => drawProp(g, kind, ph, an, o.rider) }];
  if (!o.flat && (kind === "horse" || kind === "chariot" || kind === "elephant" || kind === "horse_rear")) out.push(shadowCard(pos, hm * (o.scale ?? 1) * 0.9));
  void f;
  return out;
};
const leg = (p: Pen, x: number, y: number, len: number, a: number, w: number, col: string) => {
  const kx = x + Math.sin(a) * len * 0.5, ky = y + Math.cos(a) * len * 0.5, fx = kx + Math.sin(a * 0.4) * len * 0.5, fy = ky + Math.cos(a * 0.4) * len * 0.5;
  p.stroke([[x, y], [kx, ky], [fx, fy]], w + 6, INK); p.stroke([[x, y], [kx, ky], [fx, fy]], w, col);
  p.ell(fx + 3, fy, w * 0.75, w * 0.45, INK, 0);
};
const drawHorse = (p: Pen, ph: number, col: string, rear: number, dx = 0, dy = 0) => {
  const g = p.g; g.save(); g.translate(dx, dy);
  const two = Math.PI * 2, b = 6 * Math.sin(two * ph * 2);
  if (rear) { g.translate(560, 820); g.rotate(-0.42 * rear); g.translate(-560, -820); }
  const by = 430 + b, mane = shade(col, 0.6);
  for (const [x, o2, far] of [[700, 0.5, 1], [380, 0, 1], [720, 0, 0], [400, 0.5, 0]] as const) leg(p, x, by + 60, 300, rear && x > 600 ? 0 : 0.5 * Math.sin(two * (ph + o2)), 22, far ? shade(col, 0.75) : col);
  p.ell(550, by, 250, 110, col, 9); // body
  p.poly([[720, by - 40], [840, by - 230], [900, by - 250], [930, by - 200], [800, by + 10]], col, 9); // neck
  p.ell(920, by - 220, 85, 48, col, 9, 0, 360, 35); // head
  p.poly([[815, by - 255], [835, by - 300], [855, by - 255]], col, 7); // ear
  p.dot(905, by - 245, 8); // eye
  p.poly([[880, by - 238], [895, by - 252], [905, by - 236]], "#ffffff", 0); // white star (Bucephalus)
  p.stroke([[760, by - 120], [820, by - 240], [850, by - 265]], 26, mane); // mane
  p.stroke([[300, by - 40], [230, by + 60 + 12 * Math.sin(two * ph)], [210, by + 160]], 22, mane); // tail
  g.restore();
};
const drawProp = (g: CanvasRenderingContext2D, kind: PropKind, ph: number, an: number, rider?: Who) => {
  const p = new Pen(g); p.ol = 9;
  const two = Math.PI * 2;
  switch (kind) {
    case "horse": case "horse_rear": {
      drawHorse(p, ph, "#2a2430", kind === "horse_rear" ? an : 0, 0, kind === "horse_rear" ? 100 : 0);
      if (rider) { g.save(); g.translate(330, -150 + (kind === "horse_rear" ? 30 : 0) + 6 * Math.sin(two * ph * 2)); g.scale(0.78, 0.78); bodySide(new Pen(g), CAST[rider], { mode: "push", pose: 0.25, expr: "determined", seed: 7, phase: ph }); g.restore(); }
      break;
    }
    case "chariot": {
      drawHorse(p, ph, "#d8c8a8", 0, 420, 0);
      p.poly([[170, 380], [560, 380], [600, 600], [150, 600]], "#d9a441", 9); // car
      p.band([[560, 560], [900, 520]], "#7a4b2a", 14, 5);
      const wr = 150, wx = 360, wy = 680;
      p.ell(wx, wy, wr, wr, "#8a5a34", 9); p.ell(wx, wy, wr * 0.78, wr * 0.78, null, 6);
      for (let i = 0; i < 8; i++) { const a = i * (two / 8) + ph * two; p.stroke([[wx, wy], [wx + Math.cos(a) * wr * 0.78, wy + Math.sin(a) * wr * 0.78]], 8); }
      p.poly([[wx + 10, wy - 10], [wx + 300, wy - 30], [wx + 10, wy + 14]], "#c9ccd2", 6); // scythe
      if (rider) { g.save(); g.translate(120, -170); g.scale(0.8, 0.8); bodySide(new Pen(g), CAST[rider], { mode: "stand", expr: "shock", seed: 9 }); g.restore(); }
      break;
    }
    case "elephant": {
      const col = "#9a98a8", by = 560;
      for (const [x, o2, far] of [[900, 0.5, 1], [420, 0, 1], [930, 0, 0], [450, 0.5, 0]] as const) { const a = 0.25 * Math.sin(two * (ph + o2)); p.stroke([[x, by], [x + Math.sin(a) * 120, by + 330]], 90 + 8, INK); p.stroke([[x, by], [x + Math.sin(a) * 120, by + 330]], 90, far ? shade(col, 0.8) : col); }
      p.ell(660, by - 40, 380, 240, col, 10);
      p.ell(1040, by - 160, 170, 150, col, 10);
      p.stroke([[1150, by - 120], [1200, by + 60], [1170, by + 230], [1220, by + 290]], 60 + 10, INK); p.stroke([[1150, by - 120], [1200, by + 60], [1170, by + 230], [1220, by + 290]], 60, col);
      p.poly([[1120, by - 40], [1240, by + 10], [1130, by]], "#f6f3ea", 6);
      p.ell(980, by - 140, 110, 150, shade(col, 0.88), 8); p.dot(1080, by - 200, 10);
      p.poly([[520, by - 270], [840, by - 270], [800, by - 160], [560, by - 160]], "#c0353a", 8); // saddle cloth
      break;
    }
    case "ship": {
      const sway = 8 * Math.sin(two * ph);
      g.translate(0, sway);
      p.poly([[400, 300], [800, 280], [820, 1000], [780, 1000]], "#f1ece0", 9); // sail
      p.band([[800, 200], [800, 1020]], "#7a4b2a", 18, 5);
      p.poly([[80, 980], [1520, 980], [1400, 1160], [200, 1160]], "#8a5a34", 10);
      p.band([[60, 980], [1540, 980]], "#c0353a", 22, 5);
      for (let i = 0; i < 10; i++) p.stroke([[260 + i * 110, 1120], [220 + i * 110, 1200]], 10);
      p.ell(1450, 960, 60, 40, "#d9a441", 8);
      break;
    }
    case "bird": {
      const fl = Math.sin(two * ph) * 60;
      p.stroke([[40, 100 - fl], [150, 110], [260, 100 - fl]], 18, "#f6f3ea"); p.stroke([[40, 100 - fl], [150, 110], [260, 100 - fl]], 6, INK);
      p.ell(150, 115, 30, 18, "#f6f3ea", 6);
      break;
    }
    case "scroll": p.poly([[60, 60], [440, 60], [440, 240], [60, 240]], "#f3e3bd", 8); for (let i = 0; i < 6; i++) p.stroke([[100, 95 + i * 24], [400 - (i % 3) * 40, 95 + i * 24]], 6, "#8a6a4a"); p.ell(60, 150, 26, 100, "#e2cf9e", 8); p.ell(440, 150, 26, 100, "#e2cf9e", 8); break;
    case "dagger": p.poly([[20, 60], [190, 46], [230, 60], [190, 74]], "#c9ccd2", 6); p.band([[180, 30], [180, 90]], "#d9a441", 12, 4); p.band([[180, 60], [280, 60]], "#7a4b2a", 18, 5); break;
    case "flag_mac": case "flag_per": {
      p.band([[60, 40], [60, 1400]], "#7a4b2a", 22, 6);
      const wave = (i: number) => 18 * Math.sin(two * (ph + i * 0.12));
      if (kind === "flag_mac") {
        const pts: [number, number][] = []; for (let i = 0; i <= 8; i++) pts.push([70 + i * 50, 80 + wave(i)]); for (let i = 8; i >= 0; i--) pts.push([70 + i * 50, 420 + wave(i)]);
        p.poly(pts, "#b8312f", 8);
        const cx = 270, cy = 250 + wave(4);
        for (let k = 0; k < 16; k++) { const a = (k * two) / 16; p.poly([[cx + Math.cos(a - 0.09) * 30, cy + Math.sin(a - 0.09) * 30], [cx + Math.cos(a) * 120, cy + Math.sin(a) * 120], [cx + Math.cos(a + 0.09) * 30, cy + Math.sin(a + 0.09) * 30]], "#f2c94c", 0); }
        p.dot(cx, cy, 34, "#f2c94c");
      } else {
        p.poly([[60, 60], [200, 0], [340, 60], [270, 120], [200, 90], [130, 120]], "#e2b64a", 8); // golden eagle-like standard
        const pts: [number, number][] = []; for (let i = 0; i <= 7; i++) pts.push([70 + i * 50, 160 + wave(i)]); for (let i = 7; i >= 0; i--) pts.push([70 + i * 50, 480 + wave(i)]);
        p.poly(pts, "#5b2d8c", 8);
        p.poly([[150, 260], [270, 260], [300, 380], [120, 380]], "#e2b64a", 6);
      }
      break;
    }
    case "torch": p.band([[100, 300], [100, 900]], "#6a4a2a", 26, 7); p.poly([[60, 280], [140, 280], [120, 330], [80, 330]], "#4a3a30", 7); break;
    case "wreath": case "crown_fall": {
      p.band([[150, 150], [120, 205]], "#c0353a", 14, 4); p.band([[170, 150], [205, 200]], "#c0353a", 14, 4);
      for (let i = 0; i < 26; i++) { const a = (i / 26) * Math.PI * 2; p.ell(160 + Math.cos(a) * 118, 100 + Math.sin(a) * 48, 24, 12, i % 2 ? "#e2b64a" : "#f2cf5a", 5, 0, 360, (a * 180) / Math.PI + 90); }
      break;
    }
    case "token_m": case "token_p": p.ell(60, 120, 40, 22, kind === "token_m" ? "#b8312f" : "#5b2d8c", 6); p.poly([[30, 120], [60, 20], [90, 120]], kind === "token_m" ? "#b8312f" : "#5b2d8c", 6); break;
    case "geom": { // geometry drawn in sand: circle, triangle, construction lines, revealed by anim 0..1
      g.globalAlpha = 0.9; g.lineCap = "round";
      const L = an;
      g.strokeStyle = "#6a4a2a"; g.lineWidth = 14;
      g.beginPath(); g.arc(500, 520, 300, 0, two * Math.min(1, L * 2)); g.stroke();
      if (L > 0.5) { const k = (L - 0.5) * 2; g.beginPath(); g.moveTo(500, 220); g.lineTo(500 + (240 - 0) * Math.min(1, k * 3), 220 + 480 * Math.min(1, k * 3)); if (k > 0.33) g.lineTo(240 + 520 * Math.min(1, (k - 0.33) * 3) , 700); if (k > 0.66) g.lineTo(500, 220); g.stroke(); }
      break;
    }
    case "pillow": p.ell(300, 140, 270, 90, "#f1ece0", 8); break;
    case "bed": p.poly([[60, 300], [1340, 300], [1340, 420], [60, 420]], "#8a5a34", 9); p.poly([[80, 230], [1320, 230], [1320, 310], [80, 310]], "#e8dcc4", 8); for (const x of [90, 1310]) p.band([[x, 410], [x, 590]], "#6a4a2a", 30, 7); p.band([[70, 120], [70, 410]], "#6a4a2a", 30, 7); break;
    case "lamp": p.ell(150, 330, 110, 45, "#c9963f", 8); p.poly([[230, 320], [290, 300], [280, 330]], "#c9963f", 6); p.band([[150, 340], [150, 390]], "#8a6a3a", 30, 6); break;
    case "tablet": p.poly([[40, 40], [360, 40], [360, 260], [40, 260]], "#a87a4a", 8); p.poly([[70, 70], [330, 70], [330, 230], [70, 230]], "#3a3036", 4); for (let i = 0; i < 4; i++) p.stroke([[100, 100 + i * 32], [300 - i * 30, 100 + i * 32]], 5, "#e8e0cc"); break;
    case "sack": p.poly([[60, 340], [40, 160], [110, 90], [190, 90], [260, 160], [240, 340]], "#d8c8a0", 8); p.stroke([[110, 100], [190, 100]], 8, "#8a6a4a"); break;
    case "brazier": p.poly([[60, 120], [340, 120], [280, 260], [120, 260]], "#4a3a30", 8); p.band([[200, 260], [200, 560]], "#4a3a30", 20, 6); p.band([[110, 580], [290, 580]], "#4a3a30", 20, 6); break;
    case "spear_beach": p.band([[100, 1180], [100, 120]], "#9a6a3a", 26, 7); p.poly([[70, 150], [100, 20], [130, 150]], "#c9ccd2", 7); break;
    case "cradle": { // wicker basket on rockers, swaddled baby with a tiny bean head, eyes per anim (0 shut, 1 open)
      p.poly([[90, 260], [610, 260], [560, 430], [140, 430]], "#c9a06a", 9);
      for (let i = 0; i < 7; i++) p.stroke([[150 + i * 68, 270], [170 + i * 62, 420]], 5, "#9a7448");
      p.arc(350, 470, 300, 60, 200, 340, 12, "#8a5a34");
      p.ell(330, 250, 190, 70, "#f3ead8", 8); // swaddle
      p.ell(470, 205, 78, 72, "#ffe2c2", 9); // head
      p.arc(470, 155, 70, 40, 200, 340, 9, "#b5793a");
      if (an > 0.5) { p.dot(448, 205, 9); p.dot(494, 205, 9); } else { p.stroke([[436, 207], [458, 207]], 6); p.stroke([[482, 207], [504, 207]], 6); }
      p.arc(472, 230, 14, 8, 20, 160, 5);
      break;
    }
    case "horse_shadow": { g.globalAlpha = 0.55; const c2 = document.createElement("canvas"); c2.width = 1100; c2.height = 900; drawHorse(new Pen(c2.getContext("2d")!), ph, "#1a1226", 0); const cg = c2.getContext("2d")!; cg.globalCompositeOperation = "source-in"; cg.fillStyle = "#1a1226"; cg.fillRect(0, 0, 1100, 900); g.drawImage(c2, 0, 0); break; }
    case "height_chart": { p.poly([[60, 40], [240, 40], [240, 1080], [60, 1080]], "#f3ead8", 8);
      for (let i = 0; i <= 20; i++) { const y = 1080 - i * 50; p.stroke([[60, y], [i % 2 ? 120 : 170, y]], i % 2 ? 4 : 7); }
      p.band([[40, 1080 - 0.775 * 1000], [260, 1080 - 0.775 * 1000]], "#c0272d", 12, 3); break; }
    case "cartoon": { p.poly([[20, 20], [680, 20], [680, 880], [20, 880]], "#c9963f", 12); p.poly([[60, 60], [640, 60], [640, 840], [60, 840]], "#f6eedc", 5);
      g.save(); g.translate(250, 460); g.scale(0.36, 0.36); bodyFront(new Pen(g), CAST.nap, { expr: "angry", mode: "stand", seed: 5 }); g.restore();
      g.font = "900 64px Cinzel, serif"; g.textAlign = "center"; g.fillStyle = "#3a1e2a"; g.fillText("LITTLE", 350, 160); g.fillText("BONEY", 350, 230); break; }
    case "flag_white": { p.band([[60, 40], [60, 1400]], "#7a4b2a", 22, 6); const pts: [number, number][] = []; for (let i = 0; i <= 8; i++) pts.push([70 + i * 50, 80 + 16 * Math.sin(two * (ph + i * 0.12))]); for (let i = 8; i >= 0; i--) pts.push([70 + i * 50, 400 + 16 * Math.sin(two * (ph + i * 0.12))]); p.poly(pts, "#f8f6f0", 7); break; }
    case "cannon": { // field gun, side view; anim = recoil 0..1
      const rc = -40 * Math.sin(Math.PI * Math.min(1, an * 2));
      g.translate(rc, 0);
      p.band([[120, 520], [520, 330]], "#6a4a2a", 34, 8); // trail
      p.poly([[300, 300], [880, 250], [900, 300], [320, 360]], "#3a3a40", 9); p.ell(880, 275, 22, 30, "#2a2a30", 7);
      p.band([[300, 330], [320, 300]], "#2a2a30", 30, 7);
      const wr = 150, wx = 420, wy = 430; p.ell(wx, wy, wr, wr, "#8a5a34", 9); p.ell(wx, wy, wr * 0.8, wr * 0.8, null, 6);
      for (let i = 0; i < 10; i++) { const a = (i * Math.PI) / 5; p.stroke([[wx, wy], [wx + Math.cos(a) * wr * 0.8, wy + Math.sin(a) * wr * 0.8]], 8); }
      p.ell(wx, wy, 22, 22, "#3a3a40", 6);
      break;
    }
    case "warship": { // three-masted ship of the line; rider = flag nation ("redcoat" = British, else French)
      const sway = 10 * Math.sin(two * ph); g.translate(0, sway);
      const brit = rider === "redcoat", fl = brit ? "#c0272d" : "#27408b";
      for (const [x, h] of [[520, 820], [900, 980], [1260, 760]] as const) { p.band([[x, 1180], [x, 1180 - h]], "#6a4a2a", 18, 5); for (let k = 0; k < 3; k++) { const y = 1180 - h + 80 + k * (h / 3.4); p.poly([[x - 150 + k * 10, y], [x + 150 - k * 10, y], [x + 130 - k * 10, y + h / 4.2], [x - 130 + k * 10, y + h / 4.2]], "#f3ece0", 7); } }
      p.poly([[100, 1160], [1720, 1160], [1560, 1440], [260, 1440]], "#5a3a24", 10);
      p.band([[100, 1220], [1720, 1220]], "#d9a441", 20, 4); for (let i = 0; i < 12; i++) p.poly([[260 + i * 110, 1250], [310 + i * 110, 1250], [310 + i * 110, 1290], [260 + i * 110, 1290]], "#1c1a22", 3);
      if (brit) { p.poly([[900, 40], [1080, 40], [1080, 140], [900, 140]], "#27408b", 5); p.band([[900, 40], [1080, 140]], "#f3ece0", 16, 0); p.band([[1080, 40], [900, 140]], "#f3ece0", 16, 0); p.band([[900, 40], [1080, 140]], "#c0272d", 6, 0); p.band([[1080, 40], [900, 140]], "#c0272d", 6, 0); p.band([[900, 90], [1080, 90]], "#f3ece0", 26, 0); p.band([[990, 40], [990, 140]], "#f3ece0", 26, 0); p.band([[900, 90], [1080, 90]], "#c0272d", 12, 0); p.band([[990, 40], [990, 140]], "#c0272d", 12, 0); }
      else for (let k = 0; k < 3; k++) p.poly([[900 + k * 60, 40], [960 + k * 60, 40], [960 + k * 60, 140], [900 + k * 60, 140]], ["#27408b", "#f3ece0", "#c0272d"][k], 4);
      void fl;
      break;
    }
    case "flag_fr": case "flag_uk": {
      p.band([[60, 40], [60, 1400]], "#7a4b2a", 22, 6);
      const wave = (i: number) => 16 * Math.sin(two * (ph + i * 0.12));
      const quad = (x0: number, x1: number, col: string) => { const pts: [number, number][] = []; for (let i = 0; i <= 3; i++) pts.push([x0 + ((x1 - x0) * i) / 3, 80 + wave(x0 / 50 + i)]); for (let i = 3; i >= 0; i--) pts.push([x0 + ((x1 - x0) * i) / 3, 400 + wave(x0 / 50 + i)]); p.poly(pts, col, 6); };
      if (kind === "flag_fr") { quad(70, 207, "#27408b"); quad(207, 344, "#f3ece0"); quad(344, 480, "#c0272d"); }
      else { quad(70, 480, "#27408b"); const w4 = wave(4); p.band([[70, 85 + w4], [480, 395 + w4]], "#f3ece0", 46, 0); p.band([[480, 85 + w4], [70, 395 + w4]], "#f3ece0", 46, 0); p.band([[70, 85 + w4], [480, 395 + w4]], "#c0272d", 14, 0); p.band([[480, 85 + w4], [70, 395 + w4]], "#c0272d", 14, 0); p.band([[70, 240 + wave(4)], [480, 240 + wave(4)]], "#f3ece0", 60, 0); p.band([[275, 85 + wave(4)], [275, 395 + wave(4)]], "#f3ece0", 60, 0); p.band([[70, 240 + wave(4)], [480, 240 + wave(4)]], "#c0272d", 30, 0); p.band([[275, 85 + wave(4)], [275, 395 + wave(4)]], "#c0272d", 30, 0); }
      break;
    }
    case "eagle": { // imperial eagle standard
      p.band([[200, 260], [200, 1290]], "#27408b", 20, 5);
      p.poly([[200, 60], [120, 120], [40, 90], [100, 190], [170, 210], [150, 260], [250, 260], [230, 210], [300, 190], [360, 90], [280, 120]], "#e2b64a", 8);
      p.poly([[90, 280], [310, 280], [310, 330], [90, 330]], "#e2b64a", 6);
      for (let k = 0; k < 3; k++) p.poly([[100 + k * 70, 340], [170 + k * 70, 340], [170 + k * 70, 560], [100 + k * 70, 560]], ["#27408b", "#f3ece0", "#c0272d"][k], 5);
      break;
    }
    case "rosetta": p.poly([[60, 120], [200, 40], [440, 70], [460, 620], [40, 620]], "#4a4650", 9); for (let i = 0; i < 18; i++) p.stroke([[90, 140 + i * 26], [410 - (i % 4) * 12, 140 + i * 26]], 4, i < 5 ? "#a8a4b0" : i < 11 ? "#8a8690" : "#9a96a2"); break;
    case "sphinx": p.poly([[80, 760], [80, 560], [300, 470], [900, 470], [1000, 380], [1000, 200], [1080, 120], [1220, 130], [1280, 220], [1290, 520], [1340, 760]], "#d9b77a", 10); p.poly([[1020, 220], [1000, 420], [1060, 420], [1080, 260]], "#c9a46a", 6); p.ell(1200, 260, 12, 10, INK, 0); p.stroke([[1170, 330], [1230, 330]], 7); break;
    case "book": p.poly([[40, 60], [460, 40], [470, 330], [50, 350]], "#27408b", 9); p.band([[60, 70], [70, 340]], "#e2b64a", 18, 4); g.font = "900 54px Cinzel, serif"; g.fillStyle = "#e2b64a"; g.textAlign = "center"; g.fillText("CODE", 270, 170); g.fillText("CIVIL", 270, 245); break;
    case "painting": { p.poly([[20, 20], [1180, 20], [1180, 780], [20, 780]], "#c9963f", 14); p.poly([[70, 70], [1130, 70], [1130, 730], [70, 730]], "#6a3a2a", 6);
      for (let i = 0; i < 14; i++) { const x = 130 + i * 72, y = 470 + (i % 3) * 20; p.ell(x, y, 26, 30, "#f0d0b0", 4); p.poly([[x - 30, y + 30], [x + 30, y + 30], [x + 36, y + 200], [x - 36, y + 200]], ["#a3182a", "#f6f2ea", "#27408b", "#2a2a30"][i % 4], 4); }
      p.ell(600, 340, 30, 34, "#f0d0b0", 4); p.poly([[560, 380], [640, 380], [660, 600], [540, 600]], "#a3182a", 4); p.ell(600, 300, 34, 12, "#e2b64a", 3); break; }
    case "snowball": p.ell(60, 60, 50, 50, "#f6f8ff", 7); break;
    case "desk": p.poly([[60, 220], [840, 220], [840, 280], [60, 280]], "#6a4a2a", 9); for (const x of [100, 800]) p.band([[x, 280], [x, 580]], "#5a3a20", 24, 6); p.poly([[300, 160], [560, 150], [580, 220], [290, 220]], "#f3ead8", 6); p.stroke([[600, 210], [690, 80]], 8, "#f6f3ea"); p.ell(620, 205, 20, 12, "#2a2a30", 5); break;
    case "chair": p.band([[90, 680], [90, 60]], "#6a4a2a", 26, 6); p.band([[90, 360], [330, 360]], "#6a4a2a", 30, 6); p.band([[330, 360], [330, 680]], "#6a4a2a", 24, 6); p.poly([[90, 60], [140, 60], [140, 340], [90, 340]], "#7a2a2a", 5); break;
    case "bicorne_prop": { const pts: [number, number][] = [[20, 170], [80, 70], [200, 30], [320, 70], [380, 170], [200, 140]]; p.poly(pts, "#1c1a22", 8); p.ell(260, 95, 18, 18, "#c8283a", 4); p.ell(260, 95, 11, 11, "#f4f1ea", 0); p.ell(260, 95, 5, 5, "#27408b", 0); break; }
    case "coffin_cart": { p.poly([[200, 380], [1300, 380], [1260, 620], [240, 620]], "#1c1a22", 9); p.poly([[380, 160], [1120, 160], [1180, 380], [320, 380]], "#e2b64a", 8); p.poly([[640, 40], [860, 40], [900, 160], [600, 160]], "#a3182a", 7); for (const x of [380, 1120]) { p.ell(x, 700, 140, 140, "#6a4a2a", 9); p.ell(x, 700, 100, 100, null, 6); } break; }
    case "throne": p.poly([[100, 680], [400, 680], [400, 380], [100, 380]], "#8a5a34", 9); p.poly([[120, 380], [380, 380], [360, 60], [140, 60]], "#b8312f", 9); p.poly([[80, 400], [420, 400], [420, 350], [80, 350]], "#e2b64a", 8); break;
  }
};

/** a block of soldiers in rows (phalanx / Persian host): returns cards for each, varied, optionally marching */
export const army = (who: Who, origin: V3, rows: number, cols: number, gap: [number, number], f: number, o: { march?: boolean; side?: boolean; flip?: boolean; phaseOff?: number; stomp?: number; expr?: Expr; jitter?: number; shadow?: boolean } = {}): CardDraw[] => {
  const out: CardDraw[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const v = r * 7 + c * 3, vv = v % 6, jx = (hash(v, 1) - 0.5) * (o.jitter ?? 0.25), jz = (hash(v, 2) - 0.5) * (o.jitter ?? 0.25);
    const pos: V3 = [origin[0] + c * gap[0] + jx, origin[1], origin[2] + r * gap[1] + jz];
    const phase = o.march ? walkPhase(f, 1.4, hash(v, 3) * 0.15 + (o.phaseOff ?? 0)) : 0;
    out.push(...charCard({ who, v: vv, view: o.side ? "side" : "front", mode: o.march ? "march" : "stand", phase: Math.round(phase * 6) / 6, seed: 20 + vv, expr: o.expr, stomp: o.stomp, blinkOff: true }, pos, f, { flip: o.flip, shadow: o.shadow }));
  }
  return out;
};
export { mix };
