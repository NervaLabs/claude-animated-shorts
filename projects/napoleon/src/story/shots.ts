// The shot list of "Napoleon Bonaparte: The Man Who Conquered Europe". Shots start at a narration word (index into
// words.json) 2 frames before it is spoken, so every visual beat lands 0-3 frames ahead of its word. Inside a shot,
// c.t counts frames from the shot start and c.w(i) is the shot-relative frame of word i. Camera keys are shot-relative.
import type { CamKey, Kick } from "../core/camera.ts";
import { FPS, words, frameOfWord, smooth, clamp01, lerp, lerp3, easeOut, hash, type V3 } from "../core/time.ts";
import type { CardDraw } from "../render/cards.ts";
import type { PointL } from "../render/engine.ts";
import type { Light } from "../render/lights.ts";
import { charCard, propCard, fxCard, army, walkPhase, CAST, type Who, type Pose } from "../chars/cast.ts";
import { drawMap, type MapState, type Realm } from "../overlay/maps.ts";
import { P, FRANCE_1789, EMPIRE_1812, CLIENTS_1812, RUSSIA, PRUSSIA, AUSTRIA, SWEDEN, BRITAIN, CORSICA, ROUTE_ITALY, ROUTE_EGYPT, ROUTE_EGYPT_BACK, ROUTE_RUSSIA, ROUTE_RETREAT, ROUTE_ELBA, ROUTE_HELENA, type LL } from "../overlay/geo.ts";
import { drawStamp, drawLabel, drawTitle, drawTag, drawSnow, drawRain } from "../overlay/text.ts";
import { Pen, bodyFront } from "../chars/toon.ts";

export type Cue = { f: number; kind: string; gain?: number; dur?: number };
export type C = { f: number; t: number; d: number; w: (i: number) => number };
type G2 = CanvasRenderingContext2D;
export type Shot = {
  id: string; from: number; scene: number; set?: string; v?: number; light?: Light;
  cams?: (c: C) => CamKey[]; kicks?: (c: C) => Kick[]; dof?: { cInf: number; focus?: number };
  actors?: (c: C) => CardDraw[]; state?: (c: C) => Record<string, number>; points?: (c: C) => PointL[];
  map?: (c: C) => MapState; paint?: (c: C, g: G2, W: number, H: number) => void; over?: (c: C, g: G2, W: number, H: number) => void;
  xin?: number; noCap?: (c: C) => boolean; cues?: (c: C) => Cue[]; amb?: string; shadowAt?: V3; shadowSize?: number;
  fade?: (c: C) => number; flash?: (c: C) => number; weather?: "snow" | "snowlight" | "rain";
  a?: number; b?: number;
};

// ---------- helpers
const SEED: Partial<Record<Who, number>> = { nap: 5, nap_young: 5, nap_crown: 5, nap_coat: 5, nap_boy: 6, josephine: 7, pope: 9, king: 11, wellington: 13, blucher: 15, general: 17 };
const ch = (who: Who, pos: V3, c: C, p: Partial<Pose> = {}, o: Parameters<typeof charCard>[3] = {}) => charCard({ who, seed: SEED[who] ?? 3, ...p }, pos, c.f, o);
const K = (f: number, pos: V3, look: V3, fov = 40, o: Partial<CamKey> = {}): CamKey => ({ f, pos, look, fov, ...o });
const kick = (f: number, a = 0.12): Kick => ({ f, a });
const st = (c: C, i: number) => c.t - c.w(i);
const u01 = (c: C, a: number, b: number) => clamp01((c.t - a) / Math.max(1, b - a));
const crowd = (who: Who, n: number, x0: number, x1: number, z0: number, z1: number, c: C, p: Partial<Pose> = {}, seed = 1): CardDraw[] => {
  const out: CardDraw[] = [];
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, hash(i, seed)), z = lerp(z0, z1, hash(i, seed + 7)); out.push(...ch(who, [x, 0, z], c, { v: i % 6, seed: 30 + (i % 6), facing: x < (x0 + x1) / 2 ? 1 : -1, ...p })); }
  return out;
};
/** a field gun firing every `period` frames from t0: recoil, muzzle flash, smoke */
const gun = (pos: V3, c: C, t0 = 0, period = 40, flip = false): CardDraw[] => {
  const dt = c.t - t0, ph = dt < 0 ? 0.99 : (dt % period) / period, out = propCard("cannon", pos, c.f, { anim: ph < 0.2 ? ph / 0.2 * 0.5 : 0, flip });
  const mx = pos[0] + (flip ? -1.1 : 1.1);
  if (dt >= 0 && ph < 0.12) out.push(fxCard("burst", [mx, pos[1] + 0.8, pos[2] + 0.1], 1.4, ph / 0.12, 3));
  if (dt >= 0 && ph < 0.7) out.push(fxCard("smoke", [mx + (flip ? -0.6 : 0.6), pos[1] + 1.0, pos[2] + 0.2], 2.2, ph / 0.7, 4));
  return out;
};
const gunCues = (t0: number, n: number, period = 40): Cue[] => Array.from({ length: n }, (_, i) => ({ f: t0 + i * period, kind: "cannon", gain: 0.55 }));
let IDX: (cap: string, from: number) => number = () => 0;

export const buildShots = (): { shots: Shot[]; total: number } => {
  const W = words();
  IDX = (cap: string, from: number) => {
    const n = (s: string) => s.replace(/[^A-Za-z0-9]/g, "");
    for (let i = from; i < W.length; i++) if (n(W[i].cap) === n(cap)) return i;
    throw new Error(`word ${cap} after ${from}`);
  };
  const w = IDX;
  const S: Shot[] = [];
  const add = (s: Shot) => S.push(s);
  const titleAbs = frameOfWord(w("Napoleon", 36));
  const EU: [number, number, number] = [12, 48, 1.0];
  const fr = (a = 0.6): Realm => ({ polys: [FRANCE_1789, CORSICA], col: "#27408b", alpha: a });

  // ===================== S1 — THE HOOK =====================
  add({ id: "europe", from: 0, scene: 1, amb: "map",
    map: (c) => { const u = smooth(u01(c, 10, c.d)); return { f: c.f, view: [lerp(14, 3, u), lerp(50, 47, u), lerp(0.85, 1.9, u * u)], realms: [fr(0.2 + 0.5 * u)], labels: [{ text: "EUROPE", at: [16, 53], t: c.t - 4, dur: 60, size: 70, dy: 0 }, { text: "FRANCE", at: [2.4, 46.6], t: c.t - 70, size: 56, dy: 0 }] }; },
    cues: (c) => [{ f: 0, kind: "swell" }, { f: 10, kind: "whoosh" }, { f: 70, kind: "pop" }] });
  const sHook2 = w("He", 20);
  add({ id: "hero_map", from: sHook2, scene: 1, set: "room", v: 0, light: "interior", amb: "court", xin: 8,
    cams: (c) => [K(0, [0.6, 1.4, 4.2], [0, 1.9, -2], 40), K(c.w(w("twice.", sHook2)) - 6, [0.3, 1.7, 2.6], [0, 1.95, -2], 32, { dur: 10, roll: -4, creep: 0.004 })],
    kicks: (c) => [kick(c.w(w("crowned", sHook2)), 0.06), kick(c.w(w("twice.", sHook2)), 0.1)], dof: { cInf: 10 },
    actors: (c) => { const tc = st(c, w("crowned", sHook2)), tl = st(c, w("lost", sHook2));
      return [...ch("nap", [0, 0, -2], c, { vest: true, expr: tl > 0 ? "worried" : tc > 0 ? "proud" : "sly" }), ...(tc > 0 && tc < 40 ? [fxCard("sparkle", [0, 2.6, -1.9], 1.6, tc / 40, 2)] : [])]; },
    cues: (c) => [{ f: c.w(w("crowned", sHook2)), kind: "sparkle" }, { f: c.w(w("redrew", sHook2)), kind: "scribble", dur: 30 }, { f: c.w(w("twice.", sHook2)), kind: "boom" }] });
  const sName = w("His", 36);
  add({ id: "name", from: sName, scene: 1, set: "room", v: 0, light: "interior", amb: "court",
    cams: () => [K(0, [0.2, 1.8, 3.4], [0, 2.0, -2], 34, { creep: 0.004 })], dof: { cInf: 12 },
    actors: (c) => ch("nap", [0, 0, -2], c, { vest: true, expr: "proud" }),
    over: (c, g, Wd, H) => drawTitle(g, c.f - titleAbs, 66, Wd, H, ["NAPOLEON", "BONAPARTE"], [150, 120], "The Man Who Conquered Europe"),
    noCap: (c) => c.f - titleAbs > 0, cues: (c) => [{ f: c.w(w("Napoleon", sName)), kind: "title_hit" }] });

  // ===================== S2 — CHILDHOOD =====================
  const sBorn = w("He", 41);
  add({ id: "birth", from: sBorn, scene: 2, set: "coast", v: 0, light: "dawn", amb: "sea", flash: (c) => (c.t < 4 ? [0.9, 0.6, 0.35, 0.15][c.t] : 0),
    cams: (c) => [K(0, [1.9, 1.5, 5.6], [1.2, 0.9, 0], 36), K(c.w(w("Corsica,", sBorn)) - 6, [6, 4, 10], [0, 3, 30], 50, { dur: 30 })],
    dof: { cInf: 10 },
    actors: (c) => [...propCard("cradle", [2.0, 0, 0], c.f, { anim: st(c, w("born", sBorn)) > 0 ? 1 : 0 }), ...ch("townsman", [0.2, 0, -0.6], c, { v: 1, expr: "smile_closed", facing: 1 }),
      ...(st(c, w("French", sBorn)) > 0 ? propCard("flag_fr", [-3, 0, 6], c.f, { phase: (c.f / 30) % 1 }) : [])],
    over: (c, g, Wd, H) => { drawTitle(g, c.f - titleAbs, 66, Wd, H, ["NAPOLEON", "BONAPARTE"], [150, 120], "The Man Who Conquered Europe"); drawStamp(g, "AUG 15, 1769", st(c, w("fifteenth,", sBorn)), 80, Wd, H); drawLabel(g, "CORSICA", st(c, w("Corsica,", sBorn)), 70, Wd, H, 0.5, 0.18, { sub: "Ajaccio" }); },
    noCap: (c) => c.f - titleAbs < 76,
    cues: (c) => [{ f: 0, kind: "flash" }, { f: c.w(w("fifteenth,", sBorn)), kind: "stamp" }, { f: c.w(w("Corsica,", sBorn)), kind: "pop" }, { f: c.w(w("French", sBorn)), kind: "flag" }] });
  const sDad = w("His", 61);
  add({ id: "father", from: sDad, scene: 2, set: "coast", v: 0, light: "day", amb: "wind", xin: 6,
    cams: () => [K(0, [0.6, 1.6, 6.5], [0, 1.6, 0], 38)], dof: { cInf: 10 },
    actors: (c) => [...ch("townsman", [-1.2, 0, 0], c, { v: 2, expr: "angry", facing: 1, prop: ["hammer", 0] as any, wave: 0.5 }), ...army("fr_soldier", [1.4, 0, -1.5], 2, 2, [1.4, 1.4], c.f, {}),
      ...(st(c, w("against", sDad)) > 0 ? [fxCard("bang", [-1.2, 2.5, 0], 0.7, st(c, w("against", sDad)) / 24, 1)] : [])],
    cues: (c) => [{ f: c.w(w("against", sDad)), kind: "sting" }] });
  const sMock = w("At", 69);
  add({ id: "mocked", from: sMock, scene: 2, set: "school", light: "day", amb: "court", xin: 8,
    cams: () => [K(0, [0, 1.5, 7], [0, 1.2, 0], 40), K(4, [0, 1.4, 5.8], [0, 1.25, 0], 36, { dur: 100 })], dof: { cInf: 10 },
    actors: (c) => { const tm = st(c, w("mocked", sMock)); return [...ch("nap_boy", [0, 0, 0.3], c, { expr: tm > 0 ? "angry" : "neutral" }),
      ...[0, 1, 2].flatMap((k) => ch("cadet", [[-2.2, 1.7, 2.7][k], 0, -0.6], c, { v: k + 1, seed: 40 + k, expr: tm > 0 ? ((c.t + k * 5) % 24 < 12 ? "laugh" : "grin") : "neutral", facing: k ? -1 : 1 })),
      ...(st(c, w("accent.", sMock)) > 0 ? [fxCard("quest", [-2.2, 2.1, -0.6], 0.6, st(c, w("accent.", sMock)) / 24, 2)] : [])]; },
    over: (c, g, Wd, H) => drawLabel(g, "BRIENNE MILITARY SCHOOL", st(c, w("school", sMock)), 80, Wd, H, 0.5, 0.18, { size: 40, sub: "France, 1779" }),
    cues: (c) => [{ f: c.w(w("school", sMock)), kind: "pop" }, { f: c.w(w("mocked", sMock)), kind: "laugh_crowd" }] });
  const sBooks = w("So", 87);
  add({ id: "books", from: sBooks, scene: 2, set: "room", v: 1, light: "lamp", amb: "night", xin: 6,
    cams: () => [K(0, [0.8, 1.2, 3], [0, 0.8, -1.5], 36, { creep: 0.003 })], dof: { cInf: 12 },
    actors: (c) => [...ch("nap_boy", [0, 0, -1.5], c, { mode: "sit", expr: "determined" }), ...propCard("book", [-0.7, 0, -1.3], c.f, { scale: 0.9, anim: 0.5 }), ...propCard("book", [0.75, 0, -1.2], c.f, { scale: 0.8, anim: 1 }), ...propCard("lamp", [1.3, 0, -1.6], c.f), fxCard("flame", [1.45, 0.17, -1.56], 0.2, (c.f / 10) % 1, 2), fxCard("glow", [1.45, 0.17, -1.56], 1.3, 0, 2)],
    points: (c) => [{ pos: [1.3, 1.0, -1.0], color: "#ffb060", i: 5 * (0.92 + 0.08 * Math.sin(c.f * 0.5)), d: 10 }],
    cues: (c) => [{ f: c.w(w("books", sBooks)), kind: "page" }] });
  const sSnow = w("Legend", 97);
  add({ id: "snowball", from: sSnow, scene: 2, set: "school", light: "snow", amb: "wind", xin: 6, state: () => ({ snow: 1 }), weather: "snowlight",
    cams: (c) => [K(0, [3.4, 1.7, 6.8], [0, 1.2, -1.8], 46), K(c.w(w("battle.", sSnow)) - 4, [1.8, 1.5, 4.4], [0, 1.3, -0.5], 40, { dur: 20 })], kicks: (c) => [kick(c.w(w("battle.", sSnow)), 0.08)],
    actors: (c) => { const out = [...ch("nap_boy", [0, 0, 0], c, { expr: "determined", wave: Math.sin(c.t / 6) > 0 ? 1 : 0.4 })];
      for (let k = 0; k < 4; k++) out.push(...ch("cadet", [-4 + k * 1.3, 0, -3 + (k % 2)], c, { v: k, seed: 50 + k, expr: "grin", facing: 1 }), ...ch("cadet", [3 + k * 1.3, 0, -5 + (k % 2)], c, { v: k + 2, seed: 60 + k, expr: "shock", facing: -1 }));
      for (let k = 0; k < 5; k++) { const ph = ((c.t + k * 11) % 30) / 30; out.push(...propCard("snowball", [lerp(-3, 4, ph), 1.4 + 1.6 * Math.sin(Math.PI * ph), lerp(-2.5, -4.5, ph)], c.f)); }
      return out; },
    over: (c, g, Wd, H) => drawTag(g, "LEGEND SAYS", c.t - 2, 90, Wd, H),
    cues: (c) => [0, 1, 2, 3, 4, 5].map((k) => ({ f: 10 + k * 14, kind: "snowball", gain: 0.6 })) });
  const sOff = w("At", 111);
  add({ id: "officer", from: sOff, scene: 2, set: "school", light: "day", amb: "court", xin: 8, state: () => ({ snow: 0 }),
    cams: (c) => [K(0, [3, 1.6, 7.2], [0.8, 1.2, 0], 42), K(c.w(w("officer.", sOff)) - 20, [0.8, 1.5, 4.6], [0.4, 1.4, 0], 36, { dur: 20 })], dof: { cInf: 10 },
    actors: (c) => { const grown = st(c, w("sixteen,", sOff)) > 0; return [...ch(grown ? "nap_young" : "nap_boy", [0, 0, 0], c, { expr: grown ? "proud" : "determined" }), ...gun([2.4, 0, -1.2], c, c.w(w("artillery", sOff)), 999),
      ...(grown && st(c, w("sixteen,", sOff)) < 16 ? [fxCard("burst", [0, 1.6, 0.1], 2.6, st(c, w("sixteen,", sOff)) / 16, 1)] : [])]; },
    over: (c, g, Wd, H) => { drawLabel(g, "ÉCOLE MILITAIRE", st(c, w("Paris,", sOff)), 70, Wd, H, 0.5, 0.18, { sub: "Paris · course done in 1 year" }); drawStamp(g, "AGE 16", st(c, w("sixteen,", sOff)), 60, Wd, H); },
    cues: (c) => [{ f: c.w(w("Paris,", sOff)), kind: "pop" }, { f: c.w(w("sixteen,", sOff)), kind: "title_hit", gain: 0.6 }, { f: c.w(w("artillery", sOff)), kind: "cannon" }] });

  // ===================== S3 — THE REVOLUTION =====================
  const sRev = w("Then,", 130);
  add({ id: "revolution", from: sRev, scene: 3, set: "paris", light: "day", amb: "crowd_murmur", xin: 10,
    cams: () => [K(0, [0, 6, 24], [0, 2, -10], 48), K(2, [0, 3.5, 18], [0, 2.2, -10], 46, { dur: 100 })], kicks: (c) => [kick(c.w(w("upside", sRev)), 0.1)],
    actors: (c) => { const up = st(c, w("upside", sRev)) > 0; return [...crowd("sans", 16, -8, 8, -2, 10, c, { expr: up ? "laugh" : "angry", wave: up ? 1 : 0.5 }), ...[-6, 0, 6].flatMap((x, k) => propCard("flag_fr", [x, 0, 2 + k], c.f, { phase: ((c.f / 25) + k * 0.3) % 1, roll: up ? Math.sin(c.t / 5 + k) * 0.08 : 0 }))]; },
    over: (c, g, Wd, H) => { drawStamp(g, "1789", st(c, w("1789,", sRev)), 60, Wd, H); drawLabel(g, "THE FRENCH REVOLUTION", st(c, w("Revolution", sRev)), 70, Wd, H, 0.5, 0.18, { size: 48 }); },
    cues: (c) => [{ f: c.w(w("1789,", sRev)), kind: "stamp" }, { f: c.w(w("Revolution", sRev)), kind: "crowd" }, { f: c.w(w("upside", sRev)), kind: "boom" }] });
  const sKing = w("The", 143);
  add({ id: "king", from: sKing, scene: 3, set: "paris", light: "overcast", amb: "crowd_murmur",
    cams: () => [K(0, [0, 2.1, -18.2], [0, 2.3, -22.4], 34, { creep: 0.003 })], dof: { cInf: 10 },
    actors: (c) => { const tl = st(c, w("throne,", sKing)), crownY = tl < 0 ? 3.15 : Math.max(1.06, 3.15 - 0.01 * tl * tl);
      return [...propCard("throne", [0, 1.05, -22.6], c.f), ...(tl < 8 ? ch("king", [0, 1.05, -22.2], c, { expr: tl > 0 ? "shock" : "proud" }, { alpha: tl > 0 ? 1 - tl / 8 : 1 }) : []), ...(tl > 0 ? propCard("crown_fall", [0.2, crownY, -21.6], c.f, { roll: tl * 0.08, scale: 0.9 }) : [])]; },
    fade: (c) => 0.55 * smooth(u01(c, c.w(w("life.", sKing)) - 4, c.w(w("life.", sKing)) + 10)),
    cues: (c) => [{ f: c.w(w("throne,", sKing)), kind: "clink" }, { f: c.w(w("life.", sKing)), kind: "drum_hit", gain: 0.8 }] });
  const sTal = w("Suddenly,", 152);
  add({ id: "talent", from: sTal, scene: 3, set: "paris", light: "day", amb: "crowd_murmur",
    cams: () => [K(0, [0.4, 1.7, 5.5], [0, 1.7, 0], 38)], dof: { cInf: 10 },
    actors: (c) => [...ch("nap_young", [-1, 0, 0], c, { expr: st(c, w("talent", sTal)) > 0 ? "sly" : "neutral", facing: 1 }), ...ch("townsman", [1.3, 0, 0.2], c, { v: 0, expr: st(c, w("birth.", sTal)) > 0 ? "shock" : "proud", facing: -1 }),
      ...(st(c, w("talent", sTal)) > 0 ? [fxCard("sparkle", [-1, 2.3, 0.1], 1.2, (st(c, w("talent", sTal)) / 24) % 1, 2)] : [])],
    cues: (c) => [{ f: c.w(w("talent", sTal)), kind: "sparkle" }] });
  const sTou = w("In", 159);
  const fleet = (c: C, leave: number): CardDraw[] => [0, 1, 2].flatMap((k) => propCard("warship", [-30 + k * 26 - 0.08 * Math.max(0, c.t - leave), -0.4, -70 - k * 14 - 0.12 * Math.max(0, c.t - leave)], c.f, { rider: "redcoat", phase: ((c.f / 40) + k * 0.3) % 1 }));
  add({ id: "toulon", from: sTou, scene: 3, set: "coast", v: 1, light: "golden", amb: "sea", xin: 10,
    cams: (c) => [K(0, [-14, 5, 10], [-14, 2, -40], 46), K(c.w(w("cannons", sTou)) - 6, [-15.5, 2.2, 1.5], [-19, 1.2, -7], 42, { dur: 22 }), K(c.w(w("drove", sTou)) - 2, [-17, 3.2, 2], [-10, 1, -70], 46, { dur: 30 })],
    kicks: (c) => [kick(c.w(w("drove", sTou)), 0.08)],
    actors: (c) => { const tg = c.w(w("cannons", sTou)); return [...ch("nap_young", [-22, 0, -4], c, { expr: "determined", wave: c.t > tg - 10 ? 1 : undefined, facing: 1 }), ...gun([-20, 0, -8], c, tg, 34), ...gun([-15, 0, -8.5], c, tg + 12, 34),
      ...crowd("fr_soldier", 4, -24, -14, -6, -3, c, { expr: "determined" }, 3), ...fleet(c, c.w(w("drove", sTou)))]; },
    over: (c, g, Wd, H) => { drawStamp(g, "1793", st(c, w("1793,", sTou)), 60, Wd, H); drawLabel(g, "SIEGE OF TOULON", st(c, w("Toulon,", sTou)), 70, Wd, H, 0.5, 0.18, { sub: "Captain Bonaparte" }); },
    cues: (c) => [{ f: c.w(w("1793,", sTou)), kind: "stamp" }, { f: c.w(w("Toulon,", sTou)), kind: "pop" }, ...gunCues(c.w(w("cannons", sTou)), 6, 17)] });
  const sGen = w("At", 183);
  add({ id: "general", from: sGen, scene: 3, set: "coast", v: 1, light: "golden", amb: "wind",
    cams: (c) => [K(0, [-21.2, 1.55, 0.6], [-22, 1.4, -4], 34), K(c.w(w("general.", sGen)) - 4, [-21.4, 1.55, -0.6], [-22, 1.45, -4], 30, { dur: 8 })], kicks: (c) => [kick(c.w(w("general.", sGen)), 0.06)], dof: { cInf: 12 },
    actors: (c) => { const tg = st(c, w("general.", sGen)); return [...ch(tg > 0 ? "nap" : "nap_young", [-22, 0, -4], c, { expr: tg > 0 ? "proud" : "neutral" }), ...(tg > 0 && tg < 16 ? [fxCard("burst", [-22, 1.5, -4.1], 1.6, tg / 16, 1)] : []), ...(tg > 0 ? [fxCard("sparkle", [-22, 2.1, -3.8], 0.9, (tg / 24) % 1, 2)] : [])]; },
    over: (c, g, Wd, H) => drawLabel(g, "GENERAL AT 24", st(c, w("general.", sGen)), 50, Wd, H, 0.5, 0.18, { size: 52 }),
    cues: (c) => [{ f: c.w(w("general.", sGen)), kind: "title_hit" }] });
  const sRoy = w("Two", 191);
  add({ id: "royalists", from: sRoy, scene: 3, set: "paris", light: "day", amb: "crowd_murmur", xin: 8,
    cams: (c) => [K(0, [6, 3, 10], [0, 1.5, -16], 46), K(c.w(w("hero", sRoy)) - 8, [1, 2, -10], [0, 2.4, -22], 38, { dur: 24 })],
    kicks: (c) => gunCues(c.w(w("uprising,", sRoy)), 3, 14).map((q) => kick(q.f, 0.07)),
    actors: (c) => { const tu = c.w(w("uprising,", sRoy)), back = smooth(u01(c, tu + 10, tu + 50));
      return [...ch("nap_young", [0, 1.05, -23], c, { expr: "determined", wave: 1 }), ...gun([-3.2, 1.05, -22.6], c, tu, 14, true), ...gun([3.2, 1.05, -22.6], c, tu + 7, 14),
        ...crowd("townsman", 10, -6, 6, -12 + 10 * back, -4 + 10 * back, c, { expr: back > 0.2 ? "shock" : "angry", view: back > 0.2 ? "side" : "front", mode: back > 0.2 ? "march" : "stand", phase: walkPhase(c.f, 2) }, 5)]; },
    over: (c, g, Wd, H) => drawLabel(g, "HERO OF THE REVOLUTION", st(c, w("hero", sRoy)), 60, Wd, H, 0.5, 0.18, { size: 44, sub: "Paris, 1795" }),
    cues: (c) => [...gunCues(c.w(w("uprising,", sRoy)), 3, 14), { f: c.w(w("hero", sRoy)), kind: "crowd" }] });
  const sJos = w("Soon", 211);
  add({ id: "josephine", from: sJos, scene: 3, set: "paris", light: "golden", amb: "court",
    cams: () => [K(0, [0, 1.5, 5], [0, 1.4, 0], 34, { creep: 0.004 })], dof: { cInf: 12 },
    actors: (c) => [...ch("nap", [-0.75, 0, 0], c, { expr: "smile_closed", facing: 1 }), ...ch("josephine", [0.75, 0, 0], c, { expr: "smile_closed", facing: -1 }), ...(st(c, w("Josephine.", sJos)) > 0 ? [fxCard("sparkle", [0, 2.6, 0.1], 1.6, (st(c, w("Josephine.", sJos)) / 30) % 1, 3)] : [])],
    over: (c, g, Wd, H) => drawLabel(g, "JOSEPHINE", st(c, w("Josephine.", sJos)), 60, Wd, H, 0.5, 0.18, { sub: "married 1796" }),
    cues: (c) => [{ f: c.w(w("Josephine.", sJos)), kind: "lyre_flourish" }] });

  // ===================== S4 — ITALY =====================
  const sIt = w("In", 216);
  add({ id: "italy_map", from: sIt, scene: 4, amb: "map", xin: 10,
    map: (c) => ({ f: c.f, view: [10, 44.5, 3.4], realms: [fr(0.55)], routes: [{ pts: ROUTE_ITALY, u: smooth(u01(c, 10, c.d)) * 0.25 }], token: { at: P.Nice, who: "nap" }, labels: [{ text: "ITALY", at: [11.5, 43.2], t: c.t - 20, size: 56, dy: 0 }, { text: "ARMY OF ITALY", at: [7.3, 44.9], t: st(c, w("army", sIt)), size: 30 }] }),
    over: (c, g, Wd, H) => drawStamp(g, "1796", st(c, w("1796,", sIt)), 60, Wd, H),
    cues: (c) => [{ f: c.w(w("1796,", sIt)), kind: "stamp" }, { f: 10, kind: "scribble", dur: c.d - 10 }, { f: c.w(w("winning", sIt)), kind: "sparkle" }] });
  const sFast = w("He", 235);
  add({ id: "fast", from: sFast, scene: 4, set: "field", v: 0, light: "day", amb: "march", xin: 6,
    cams: (c) => { const x = -14 + 0.3 * c.t; return [K(0, [x - 2, 1.6, 9], [x + 2, 1.3, 0], 42, { creep: 0.001 })]; },
    actors: (c) => { const x = -14 + 0.3 * c.t; return [...army("fr_soldier", [x - 9, 0, -2], 3, 5, [1.4, 1.4], c.f, { march: true, side: true, phaseOff: 0.2 }), ...ch("nap", [x + 1, 0, 1.2], c, { view: "side", mode: "march", phase: walkPhase(c.f, 2.2), expr: "determined" }),
      fxCard("speed", [x - 2, 1.2, 1.4], 2.6, (c.t / 8) % 1, 1), fxCard("dust", [x - 3, 0.4, 1.0], 2, (c.t / 10) % 1, 2), ...crowd("austrian", 4, 12, 18, -4, 0, c, { expr: "shock" }, 9)]; },
    cues: (c) => [{ f: 0, kind: "march", dur: c.d }, { f: 4, kind: "whoosh" }] });
  const sVic = w("Lodi,", 246);
  add({ id: "victories", from: sVic, scene: 4, set: "field", v: 0, light: "golden", amb: "battle",
    cams: () => [K(0, [22, 2.2, 10], [30, 2, 0], 40), K(4, [24, 2, 8], [30, 2.2, 0], 38, { dur: 120 })], kicks: (c) => ["Lodi,", "Arcole,", "Rivoli:"].map((x) => kick(c.w(w(x, sVic)), 0.08)),
    actors: (c) => { const tp = st(c, w("peace.", sVic)); return [...propCard("horse", [26 + 0.04 * c.t, 1.7, 0.4], c.f, { rider: "nap", phase: (c.t / 10) % 1 }), ...propCard("flag_fr", [27.3 + 0.04 * c.t, 1.7, 0.2], c.f, { phase: (c.f / 25) % 1, scale: 0.8 }),
      ...army("fr_soldier", [22.2 + 0.04 * c.t, 1.7, -0.6], 1, 3, [1.25, 1.4], c.f, { march: true, side: true }), ...(tp > -6 ? [...ch("austrian", [39.5, 0, 1], c, { v: 1, expr: "worried", facing: -1 }), ...propCard("flag_white", [40.1, 0, 0.8], c.f, { phase: (c.f / 25) % 1, scale: 0.7 })] : [])]; },
    over: (c, g, Wd, H) => { ["Lodi,", "Arcole,", "Rivoli:"].forEach((x, k) => drawLabel(g, x.replace(/[,:]/, "").toUpperCase(), st(c, w(x, sVic)), 999, Wd, H, 0.22 + k * 0.28, 0.16, { size: 46, sub: ["May 1796", "Nov 1796", "Jan 1797"][k] })); drawLabel(g, "AUSTRIA MAKES PEACE · 1797", st(c, w("peace.", sVic)), 60, Wd, H, 0.5, 0.72, { size: 34 }); },
    cues: (c) => [...["Lodi,", "Arcole,", "Rivoli:"].map((x) => ({ f: c.w(w(x, sVic)), kind: "boom", gain: 0.6 })), { f: c.w(w("peace.", sVic)), kind: "sparkle" }, { f: 0, kind: "hooves", dur: c.d }] });
  const sCorp = w("His", 259);
  add({ id: "corporal", from: sCorp, scene: 4, set: "field", v: 0, light: "golden", amb: "crowd_murmur",
    cams: () => [K(0, [0, 1.5, 5.4], [0, 1.25, 0], 40)], dof: { cInf: 10 },
    actors: (c) => [...ch("nap", [0, 0, 0], c, { expr: "smile_closed" }), ...[-1, 1].flatMap((s, k) => [0, 1].flatMap((j) => ch("fr_soldier", [s * (1.5 + j * 1.2), 0, -0.6 - j * 0.6], c, { v: k * 2 + j, seed: 44 + k * 2 + j, expr: "grin", facing: s > 0 ? -1 : 1, wave: (c.t + k * 7 + j * 4) % 20 < 10 ? 1 : 0.6 })))],
    over: (c, g, Wd, H) => drawLabel(g, "\"THE LITTLE CORPORAL\"", st(c, w("little", sCorp)), 999, Wd, H, 0.5, 0.18, { size: 48 }),
    cues: (c) => [{ f: c.w(w("little", sCorp)), kind: "crowd", gain: 0.7 }] });
  const sShort = w("And", 266);
  add({ id: "not_short", from: sShort, scene: 4, set: "field", v: 0, light: "day", amb: "wind",
    cams: () => [K(0, [0.4, 1.4, 5.2], [0.4, 1.3, 0], 40)], dof: { cInf: 8 },
    actors: (c) => [...ch("nap", [-0.5, 0, 0], c, { expr: st(c, w("short.", sShort)) > 0 ? "angry" : "sly", vest: true }), ...ch("fr_soldier", [1.2, 0, 0], c, { v: 1, expr: "neutral" }), ...propCard("height_chart", [0.35, 0, -0.3], c.f)],
    over: (c, g, Wd, H) => { drawLabel(g, "5 ft 7 in · 1.69 m", st(c, w("five", sShort)), 999, Wd, H, 0.5, 0.18, { size: 48, sub: "average for his time" }); },
    cues: (c) => [{ f: c.w(w("short.", sShort)), kind: "sting" }, { f: c.w(w("five", sShort)), kind: "pop" }] });
  const sCart = w("The", 282);
  add({ id: "cartoon", from: sCart, scene: 4, set: "room", v: 1, light: "interior", amb: "court",
    cams: () => [K(0, [0.6, 1.5, 3.4], [0, 1.4, -2], 38, { creep: 0.004 })], dof: { cInf: 10 },
    actors: (c) => [...ch("scholar", [-1.2, 0, -2], c, { expr: "laugh", facing: 1 }), ...propCard("cartoon", [0.7, 0.2, -2.4], c.f, { scale: 1.3 })],
    over: (c, g, Wd, H) => drawTag(g, "BRITISH CARTOON, c. 1803", c.t - 4, 60, Wd, H),
    cues: (c) => [{ f: 4, kind: "laugh_crowd", gain: 0.5 }] });

  // ===================== S5 — EGYPT =====================
  const sEg = w("In", 289);
  add({ id: "egypt_map", from: sEg, scene: 5, amb: "map", xin: 10,
    map: (c) => { const u = smooth(u01(c, 8, c.w(w("Egypt,", sEg)) + 10)); return { f: c.f, view: [lerp(10, 22, u), lerp(42, 36, u), 1.6], realms: [fr(0.5)], routes: [{ pts: ROUTE_EGYPT, u }, { pts: [P.AlexandriaEg, [36, 28], [48, 20], [60, 18]], u: smooth(u01(c, c.w(w("India.", sEg)) - 20, c.d)), col: "#f2a8a8" }], token: { at: ROUTE_EGYPT[Math.min(ROUTE_EGYPT.length - 1, Math.floor(u * (ROUTE_EGYPT.length - 1)))] },
      labels: [{ text: "EGYPT", at: [30, 27], t: st(c, w("Egypt,", sEg)), size: 50, dy: 0 }, { text: "TO INDIA", at: [42, 23], t: st(c, w("India.", sEg)), size: 34, dy: 0 }] }; },
    over: (c, g, Wd, H) => drawStamp(g, "1798", st(c, w("1798,", sEg)), 60, Wd, H),
    cues: (c) => [{ f: c.w(w("1798,", sEg)), kind: "stamp" }, { f: 8, kind: "waves", dur: 60 }, { f: c.w(w("Egypt,", sEg)), kind: "pop" }] });
  const sPyr = w("Legend", 302);
  add({ id: "pyramids", from: sPyr, scene: 5, set: "field", v: 1, light: "day", amb: "wind", xin: 10,
    cams: (c) => [K(0, [2.4, 1.6, 8], [0, 1.4, 0], 40), K(c.w(w("pyramids.", sPyr)) - 20, [0, 3, 12], [0, 18, -200], 44, { dur: 30 })],
    actors: (c) => [...ch("nap", [0, 0, 2.5], c, { view: "front", expr: "proud", wave: 1, facing: -1 }), ...crowd("fr_soldier", 8, -5, 5, -3.5, -1, c, { expr: "shock" }, 11)],
    over: (c, g, Wd, H) => { drawTag(g, "LEGEND SAYS", c.t - 2, 90, Wd, H); drawLabel(g, "40 CENTURIES", st(c, w("forty", sPyr)), 999, Wd, H, 0.5, 0.2, { size: 56 }); },
    cues: (c) => [{ f: c.w(w("forty", sPyr)), kind: "title_hit", gain: 0.6 }] });
  const sBat = w("He", 319);
  add({ id: "pyramids_battle", from: sBat, scene: 5, set: "field", v: 1, light: "golden", amb: "battle",
    cams: () => [K(0, [9, 2.2, 10], [3, 1.3, -3], 44), K(4, [7, 1.9, 8], [3, 1.3, -3], 42, { dur: 70 })], kicks: (c) => [kick(20, 0.08), kick(44, 0.08)],
    actors: (c) => { const out = army("fr_soldier", [-4, 0, -2], 4, 4, [1.3, 1.3], c.f, {}); for (let k = 0; k < 4; k++) { const x = 14 - 0.18 * c.t + k * 2.2; out.push(...propCard("horse", [x, 0, -4 - k * 1.6], c.f, { flip: true, rider: "mamluk", phase: ((c.t + k * 3) / 8) % 1 }), fxCard("dust", [x + 2, 0.4, -3.8 - k * 1.6], 2, ((c.t + k * 4) / 12) % 1, k)); }
      for (let k = 0; k < 3; k++) { const t = (c.t + k * 13) % 30; out.push(fxCard("smoke", [-2 + k * 1.4, 1.4, -0.6], 1.8, t / 30, k + 3)); if (t < 4) out.push(fxCard("burst", [-2 + k * 1.4, 1.3, -0.4], 0.8, t / 4, k)); }
      return out; },
    over: (c, g, Wd, H) => drawLabel(g, "BATTLE OF THE PYRAMIDS", 10 + c.t - 10, 999, Wd, H, 0.5, 0.18, { size: 44, sub: "July 1798" }),
    cues: (c) => [{ f: 0, kind: "hooves", dur: 60 }, { f: 4, kind: "muskets", dur: 50 }, { f: 10, kind: "crowd" }] });
  const sSch = w("and", w("Pyramids,", sBat));
  add({ id: "scholars", from: sSch, scene: 5, set: "field", v: 1, light: "day", amb: "wind",
    cams: (c) => [K(0, [3, 1.6, 7], [0, 1.4, 0], 40), K(c.w(w("Rosetta", sSch)) - 6, [1.2, 1.2, 2.6], [1.2, 0.8, 0], 34, { dur: 14 })], dof: { cInf: 10 },
    actors: (c) => { const tr = st(c, w("Rosetta", sSch)); return [...crowd("scholar", 4, -3, 3, -1.5, 0.5, c, { expr: tr > 0 ? "shock" : "smile", wave: 0.4 }, 13), ...propCard("rosetta", [1.2, 0, -0.2], c.f), ...(tr > 0 ? [fxCard("sparkle", [1.2, 1.1, -0.1], 1.4, (tr / 24) % 1, 2)] : []), ...propCard("scroll", [-1.4, 0.9, 0.3], c.f, { scale: 0.7 })]; },
    over: (c, g, Wd, H) => { drawLabel(g, "100+ SCHOLARS", st(c, w("scholars,", sSch)), 60, Wd, H, 0.5, 0.18, { size: 44 }); drawLabel(g, "THE ROSETTA STONE", st(c, w("Rosetta", sSch)), 999, Wd, H, 0.5, 0.18, { size: 48, sub: "found 1799" }); },
    cues: (c) => [{ f: c.w(w("scholars,", sSch)), kind: "pop" }, { f: c.w(w("Rosetta", sSch)), kind: "sparkle" }] });
  const sNel = w("But", 340);
  add({ id: "nelson", from: sNel, scene: 5, set: "coast", v: 1, light: "dusk", amb: "sea", xin: 8,
    cams: () => [K(0, [0, 4, -6], [0, 2, -80], 46), K(2, [0, 3.5, -10], [0, 3, -80], 44, { dur: 100 })], kicks: (c) => [kick(c.w(w("destroyed", sNel)), 0.1)],
    actors: (c) => { const td = st(c, w("destroyed", sNel)); const out = [...propCard("warship", [-26, -0.4, -70], c.f, { rider: "redcoat", phase: (c.f / 40) % 1 }), ...propCard("warship", [26, -0.4, -76], c.f, { rider: "redcoat", phase: (c.f / 40 + 0.4) % 1, flip: true })];
      out.push(...propCard("warship", [0, -0.4, -90], c.f, { phase: (c.f / 40 + 0.2) % 1 }));
      if (td > 0) { out.push(fxCard("burst", [0, 6, -88], 14, clamp01(td / 14), 1), fxCard("smoke", [0, 10, -90], 18, clamp01(td / 60), 2)); for (let k = 0; k < 3; k++) out.push(fxCard("flame", [-4 + k * 4, 3 + k, -88], 4, ((c.f / 10) + k * 0.3) % 1, k)); }
      return out; },
    over: (c, g, Wd, H) => drawLabel(g, "BATTLE OF THE NILE", st(c, w("Nelson", sNel)), 999, Wd, H, 0.5, 0.18, { size: 44, sub: "Admiral Nelson, 1798" }),
    cues: (c) => [...gunCues(4, 4, 14), { f: c.w(w("destroyed", sNel)), kind: "explosion" }] });
  const sStr = w("The", 352);
  add({ id: "stranded", from: sStr, scene: 5, set: "field", v: 1, light: "golden", amb: "wind", xin: 6,
    cams: () => [K(0, [0, 1.6, 7], [0, 1.2, 0], 42, { creep: 0.003 })], dof: { cInf: 10 },
    actors: (c) => [...ch("nap", [0, 0, 0.5], c, { expr: st(c, w("goals.", sStr)) > -10 ? "worried" : "proud", vest: true }), ...[-3, -1.6, 1.6, 3].flatMap((x, k) => ch("fr_soldier", [x, 0, -0.5], c, { v: k, seed: 70 + k, mode: "sit", expr: k % 2 ? "sad" : "sick" }))],
    cues: (c) => [{ f: c.w(w("never", sStr)), kind: "sting", gain: 0.5 }] });

  // ===================== S6 — RULER OF FRANCE =====================
  const sBack = w("So", 363);
  add({ id: "slip_back", from: sBack, scene: 6, amb: "map", xin: 8,
    map: (c) => ({ f: c.f, view: [14, 40, 1.3], realms: [fr(0.55)], routes: [{ pts: ROUTE_EGYPT_BACK, u: smooth(u01(c, 0, c.d)) }], token: { at: ROUTE_EGYPT_BACK[Math.min(5, Math.floor(smooth(u01(c, 0, c.d)) * 5.99))] } }),
    cues: (c) => [{ f: 0, kind: "whoosh" }, { f: 0, kind: "scribble", dur: c.d }] });
  const sCoup = w("In", 369);
  add({ id: "coup", from: sCoup, scene: 6, set: "paris", light: "overcast", amb: "march", xin: 8,
    cams: (c) => [K(0, [5, 2, 4], [0, 1.6, -14], 44), K(c.w(w("Consul.", sCoup)) - 10, [0.4, 2.4, -16], [0, 2.6, -22.6], 36, { dur: 16 })], kicks: (c) => [kick(c.w(w("coup,", sCoup)), 0.1)],
    actors: (c) => [...army("guard", [-3, 0, -8 - 0.03 * c.t], 3, 4, [1.8, 1.8], c.f, { march: c.t < c.w(w("coup,", sCoup)) }), ...ch("nap", [0, 1.05, -22.6], c, { expr: st(c, w("Consul.", sCoup)) > 0 ? "proud" : "determined", vest: st(c, w("Consul.", sCoup)) > 0 })],
    over: (c, g, Wd, H) => { drawStamp(g, "NOV 1799", st(c, w("1799,", sCoup)), 60, Wd, H); drawLabel(g, "FIRST CONSUL", st(c, w("Consul.", sCoup)), 999, Wd, H, 0.5, 0.18, { size: 56 }); },
    cues: (c) => [{ f: c.w(w("1799,", sCoup)), kind: "stamp" }, { f: 0, kind: "march", dur: c.w(w("coup,", sCoup)) }, { f: c.w(w("coup,", sCoup)), kind: "drum_hit" }, { f: c.w(w("Consul.", sCoup)), kind: "title_hit" }] });
  const sCrown = w("Five", 382);
  add({ id: "coronation", from: sCrown, scene: 6, set: "notredame", light: "interior", amb: "cathedral", xin: 12,
    cams: (c) => [K(0, [0, 3, 20], [0, 3, -24], 48), K(4, [0, 2.4, 6], [0, 2.4, -24], 44, { dur: c.w(w("crown", sCrown)) - 10 }), K(c.w(w("crown", sCrown)) - 4, [0.8, 2.7, -17.8], [0, 2.85, -23], 36, { dur: 20 })],
    kicks: (c) => [kick(c.w(w("head.", sCrown)), 0.12)],
    actors: (c) => { const tt = c.w(w("took", sCrown)), th = c.w(w("head.", sCrown)), cy = c.t < tt ? 1.9 : c.t < th - 10 ? lerp(1.9, 4.0, smooth((c.t - tt) / 14)) : lerp(4.0, 3.02, smooth((c.t - th + 10) / 10)), landed = c.t >= th;
      const out = [...propCard("throne", [-3.6, 1.2, -25], c.f), ...ch("pope", [-3.6, 1.2, -24.6], c, { mode: "sit", expr: st(c, w("head.", sCrown)) > 0 ? "shock" : "neutral" }), ...ch("nap_crown", [0, 1.2, -23], c, { v: landed ? 0 : 1, expr: "proud", wave: c.t > tt - 4 && c.t < th + 6 ? 1 : undefined }),
        ...(landed ? [] : propCard("wreath", [0.05, cy, -22.8], c.f, { scale: 0.75, z: 2 })), ...crowd("townsman", 14, -6, 6, -16, 4, c, { expr: "smile" }, 17)];
      if (st(c, w("head.", sCrown)) > 0) out.push(fxCard("burst", [0, 3.0, -23.2], 1.8, clamp01(st(c, w("head.", sCrown)) / 14), 1), fxCard("sparkle", [0, 3.3, -22.5], 1.3, (st(c, w("head.", sCrown)) / 30) % 1, 2));
      return out; },
    over: (c, g, Wd, H) => { drawStamp(g, "DEC 2, 1804", st(c, w("1804,", sCrown)), 70, Wd, H); drawLabel(g, "NOTRE-DAME", st(c, w("Notre-Dame,", sCrown)), 60, Wd, H, 0.5, 0.18, { sub: "Paris" }); },
    cues: (c) => [{ f: 0, kind: "organ", dur: c.d }, { f: c.w(w("1804,", sCrown)), kind: "stamp" }, { f: c.w(w("crown", sCrown)), kind: "swell" }, { f: c.w(w("head.", sCrown)), kind: "title_hit" }] });
  const sEmp = w("Emperor", 406);
  add({ id: "emperor", from: sEmp, scene: 6, set: "notredame", light: "interior", amb: "cathedral",
    cams: () => [K(0, [0.2, 2.7, -19.6], [0, 2.7, -23], 32, { creep: 0.005 })], dof: { cInf: 12 },
    actors: (c) => [...ch("nap_crown", [0, 1.2, -23], c, { expr: "proud" }), fxCard("sparkle", [0, 3.2, -22.8], 1.2, (c.t / 30) % 1, 3)],
    over: (c, g, Wd, H) => drawLabel(g, "EMPEROR OF THE FRENCH", st(c, sEmp), 999, Wd, H, 0.5, 0.18, { size: 54 }),
    cues: () => [{ f: 0, kind: "crowd", gain: 0.8 }] });
  const sJc = w("Then", 410);
  add({ id: "empress", from: sJc, scene: 6, set: "notredame", light: "interior", amb: "cathedral",
    cams: () => [K(0, [2.6, 2.6, -19], [0, 2.2, -23], 38, { creep: 0.003 })], dof: { cInf: 10 },
    actors: (c) => [...ch("nap_crown", [-0.8, 1.2, -23.2], c, { expr: "smile_closed", wave: 0.9, facing: 1 }), ...ch("josephine", [0.8, 1.2, -22.8], c, { mode: "sit", expr: "smile_closed", facing: -1 }), ...(st(c, w("empress.", sJc)) > 0 ? [fxCard("sparkle", [0.8, 2.4, -22.7], 1.4, (st(c, w("empress.", sJc)) / 24) % 1, 2)] : [])],
    cues: (c) => [{ f: c.w(w("empress.", sJc)), kind: "sparkle" }] });
  const sPaint = w("The", 416);
  add({ id: "painting", from: sPaint, scene: 6, set: "room", v: 0, light: "interior", amb: "court", xin: 6,
    cams: () => [K(0, [0.4, 1.8, 4.2], [0, 1.8, -2], 40, { creep: 0.003 })], dof: { cInf: 8 },
    actors: (c) => [...propCard("painting", [0.6, 0.4, -2.6], c.f, { scale: 1.0 }), ...ch("scholar", [-1.6, 0, -1.8], c, { expr: st(c, w("three", sPaint)) > 0 ? "sick" : "proud", facing: 1, wave: 0.6 })],
    over: (c, g, Wd, H) => { drawLabel(g, "THE CORONATION OF NAPOLEON", 8 + c.t - 8, 999, Wd, H, 0.5, 0.14, { size: 38, sub: "Jacques-Louis David, 1805–1807" }); drawStamp(g, "~3 YEARS", st(c, w("three", sPaint)), 60, Wd, H, [0.7, 0.7]); },
    cues: (c) => [{ f: c.w(w("three", sPaint)), kind: "stamp" }] });

  // ===================== S7 — THE HEIGHT OF HIS POWER =====================
  const sAus = w("Exactly", 432);
  add({ id: "austerlitz", from: sAus, scene: 7, set: "field", v: 2, light: "fog", amb: "battle_far", xin: 12,
    cams: () => [K(0, [4, 2.2, 9.5], [0, 1.4, -3], 44), K(2, [3, 2, 8], [0, 1.4, -3], 42, { dur: 120 })],
    actors: (c) => [...ch("nap", [0, 0, 3], c, { expr: "sly", vest: true }), ...army("fr_soldier", [-8, 0, -6], 3, 8, [2, 1.8], c.f, {}), ...propCard("eagle", [3, 0, 2.4], c.f)],
    over: (c, g, Wd, H) => { drawStamp(g, "DEC 2, 1805", st(c, w("Exactly", sAus)) - 4, 70, Wd, H); drawLabel(g, "AUSTERLITZ", st(c, w("Austerlitz,", sAus)), 999, Wd, H, 0.5, 0.18, { sub: "the Battle of the Three Emperors" }); },
    cues: (c) => [{ f: 4, kind: "stamp" }, { f: c.w(w("Austerlitz,", sAus)), kind: "pop" }, { f: c.w(w("emperors", sAus)), kind: "drum_hit", gain: 0.6 }] });
  const sLure = w("He", 448);
  add({ id: "lure", from: sLure, scene: 7, set: "field", v: 2, light: "fog", amb: "battle_far",
    cams: () => [K(0, [12, 4, 18], [26, 3, -4], 46, { creep: 0.001 })],
    actors: (c) => { const u = smooth(u01(c, c.w(w("lured", sLure)) - 10, c.d)); return [...army("russian", [lerp(46, 26, u), lerp(10, 0.5, u), -8], 3, 6, [1.8, 1.6], c.f, { march: u > 0 && u < 1, side: true, flip: true }), ...army("austrian", [lerp(48, 30, u), lerp(10, 0.5, u), 2], 2, 5, [1.8, 1.6], c.f, { march: u > 0 && u < 1, side: true, flip: true }),
      ...army("fr_soldier", [-2, 0, -2], 2, 3, [1.6, 1.6], c.f, { expr: "nervous" })]; },
    over: (c, g, Wd, H) => drawLabel(g, "PRATZEN HEIGHTS", st(c, w("high", sLure)), 999, Wd, H, 0.75, 0.2, { size: 40 }),
    cues: (c) => [{ f: c.w(w("lured", sLure)) - 10, kind: "march", dur: 60 }, { f: c.w(w("weak,", sLure)), kind: "sting", gain: 0.4 }] });
  const sSun = w("Then,", 460);
  add({ id: "sun", from: sSun, scene: 7, set: "field", v: 2, light: "golden", amb: "battle", xin: 14,
    cams: (c) => [K(0, [-6, 2.4, 14], [10, 4, -10], 48), K(c.w(w("smashed", sSun)) - 4, [6, 1.6, 8], [20, 2, -2], 44, { dur: 14 })], kicks: (c) => [kick(c.w(w("smashed", sSun)), 0.14), kick(c.w(w("center.", sSun)), 0.1)],
    actors: (c) => { const tc = c.w(w("smashed", sSun)), x = c.t < tc ? 6 : 6 + 0.35 * (c.t - tc);
      return [fxCard("glow", [40, 20, -60], 50, 0, 1), ...army("fr_soldier", [x - 8, 0, -4], 3, 6, [1.6, 1.6], c.f, { march: true, side: true, stomp: 1.5 }), ...army("russian", [26, 0, -6], 2, 6, [1.8, 1.6], c.f, { expr: "shock" }), ...(c.t > tc ? [fxCard("clash", [22, 2, -4], 4, clamp01((c.t - tc) / 14), 2), fxCard("dust", [20, 0.6, -3], 5, ((c.t - tc) / 18) % 1, 3)] : [])]; },
    over: (c, g, Wd, H) => drawLabel(g, "THE SUN OF AUSTERLITZ", st(c, w("sun", sSun)), 60, Wd, H, 0.5, 0.18, { size: 44 }),
    cues: (c) => [{ f: c.w(w("sun", sSun)), kind: "swell" }, { f: c.w(w("smashed", sSun)), kind: "clash" }, { f: c.w(w("smashed", sSun)), kind: "crowd" }, ...gunCues(c.w(w("smashed", sSun)) + 4, 3, 10)] });
  const sMas = w("It", 473);
  add({ id: "masterpiece", from: sMas, scene: 7, set: "field", v: 2, light: "golden", amb: "battle_far",
    cams: () => [K(0, [0.3, 1.5, 4], [0, 1.45, 0], 32, { creep: 0.005 })], dof: { cInf: 14 },
    actors: (c) => [...ch("nap", [0, 0, 0], c, { expr: "proud", vest: true }), fxCard("sparkle", [0, 2.1, 0.1], 1.1, (c.t / 30) % 1, 2)],
    cues: () => [{ f: 0, kind: "title_hit", gain: 0.6 }] });
  const sJena = w("Then", 477);
  add({ id: "jena_map", from: sJena, scene: 7, amb: "map", xin: 8,
    map: (c) => ({ f: c.f, view: [14, 50, 1.55], realms: [fr(0.6)], battles: [{ at: P.Austerlitz, t: 99 }, { at: P.Jena, t: st(c, w("Jena", sJena)) }, { at: P.Friedland, t: st(c, w("Friedland", sJena)) }],
      labels: [{ text: "AUSTERLITZ 1805", at: P.Austerlitz, t: 30, size: 28, dy: 44 }, { text: "JENA 1806", at: P.Jena, t: st(c, w("Jena", sJena)), size: 28 }, { text: "FRIEDLAND 1807", at: P.Friedland, t: st(c, w("Friedland", sJena)), size: 28 }] }),
    cues: (c) => [{ f: c.w(w("Jena", sJena)), kind: "boom", gain: 0.6 }, { f: c.w(w("Friedland", sJena)), kind: "boom", gain: 0.6 }] });
  const sCtrl = w("Much", 486);
  add({ id: "empire_map", from: sCtrl, scene: 7, amb: "map",
    map: (c) => { const u = smooth(u01(c, 0, 30)); return { f: c.f, view: [12, 48, lerp(1.55, 1.1, u)], realms: [{ polys: CLIENTS_1812, col: "#7a8fd0", alpha: 0.55 * u }, { polys: EMPIRE_1812, col: "#27408b", alpha: 0.7 }], labels: [{ text: "FRENCH EMPIRE", at: [2.4, 46.8], t: c.t - 6, size: 44, dy: 0 }, { text: "ALLIES & CLIENT STATES", at: [14, 51.5], t: c.t - 20, size: 26, dy: 0 }], token: { at: P.Paris } }; },
    cues: () => [{ f: 0, kind: "swell" }] });
  const sCode = w("At", 494);
  add({ id: "code", from: sCode, scene: 7, set: "room", v: 0, light: "interior", amb: "court", xin: 8,
    cams: (c) => [K(0, [0.4, 1.6, 4], [0, 1.4, -2], 40), K(c.w(w("women", sCode)) - 6, [1.6, 1.5, 3], [1.4, 1.5, -1.6], 38, { dur: 16 })], dof: { cInf: 10 },
    actors: (c) => [...ch("nap", [-0.6, 0, -2], c, { expr: "proud", wave: 0.6, facing: 1 }), ...propCard("desk", [0.4, 0, -2.4], c.f), ...propCard("book", [0.4, 1.0, -2.2], c.f, { scale: 1.2 }), ...ch("townsman", [1.6, 0, -1.6], c, { v: 1, expr: st(c, w("women", sCode)) > 0 ? "angry" : "neutral", facing: -1 })],
    over: (c, g, Wd, H) => { drawLabel(g, "NAPOLEONIC CODE · 1804", st(c, w("Napoleonic", sCode)), 999, Wd, H, 0.5, 0.18, { size: 44 }); drawLabel(g, "EQUAL BEFORE THE LAW", st(c, w("equal", sCode)), 60, Wd, H, 0.32, 0.82, { size: 34 }); drawLabel(g, "BUT FEWER RIGHTS FOR WOMEN", st(c, w("women", sCode)), 60, Wd, H, 0.68, 0.82, { size: 30, col: "#8a1f24" }); },
    cues: (c) => [{ f: c.w(w("Napoleonic", sCode)), kind: "pop" }, { f: c.w(w("equal", sCode)), kind: "sparkle" }, { f: c.w(w("women", sCode)), kind: "sting", gain: 0.5 }] });
  const sLaw = w("Versions", 513);
  add({ id: "laws_world", from: sLaw, scene: 7, amb: "map", xin: 8,
    map: (c) => { const u = (k: number) => c.t - k * 6; return { f: c.f, view: [-25, 30, 0.42], realms: [fr(0.7)],
      glows: [[2, 47], [5, 51], [12, 43], [-4, 40], [20, 52], [-71, 46.8], [-91, 31], [-58, -20], [-70, -33], [-99, 20], [30, 30], [10, 34]].map((at, k) => ({ at: at as LL, r: 70, t: u(k), col: [255, 210, 110] as [number, number, number] })), labels: [{ text: "CIVIL LAW TODAY", at: [-25, 58], t: c.t - 10, size: 36, dy: 0 }] }; },
    cues: (c) => Array.from({ length: 6 }, (_, k) => ({ f: k * 12, kind: "pop", gain: 0.5 })) });

  // ===================== S8 — RUSSIA =====================
  const sRus = w("But", 523);
  add({ id: "invasion", from: sRus, scene: 8, set: "field", v: 6, light: "day", amb: "march", xin: 10,
    cams: () => [K(0, [0, 18, 40], [0, 0, -20], 50), K(2, [0, 12, 30], [0, 0, -30], 48, { dur: 120 })],
    actors: (c) => [...army("fr_soldier", [-30, 0, -40 + 0.06 * c.t], 8, 26, [2.4, 2.6], c.f, { march: true }), ...army("guard", [-10, 0, -10 + 0.06 * c.t], 3, 8, [2.4, 2.4], c.f, { march: true }), ...propCard("eagle", [0, 0, 0 + 0.06 * c.t], c.f)],
    over: (c, g, Wd, H) => { drawStamp(g, "1812", st(c, w("1812,", sRus)), 60, Wd, H); drawLabel(g, "600,000+ MEN", st(c, w("600,000", sRus)), 999, Wd, H, 0.5, 0.18, { size: 56, sub: "the invasion of Russia" }); },
    cues: (c) => [{ f: c.w(w("1812,", sRus)), kind: "stamp" }, { f: 0, kind: "march", dur: c.d }, { f: c.w(w("600,000", sRus)), kind: "title_hit", gain: 0.6 }] });
  const sRet = w("The", 534);
  add({ id: "russia_map", from: sRet, scene: 8, amb: "map", xin: 8,
    map: (c) => { const u = smooth(u01(c, 0, c.d)); return { f: c.f, view: [30, 54, 2.2], realms: [{ polys: [RUSSIA], col: "#3a7a4a", alpha: 0.35 }], routes: [{ pts: ROUTE_RUSSIA, u: u * 0.85 }],
      glows: [P.Vilnius, P.Vitebsk, P.Smolensk, P.Borodino].map((at, k) => ({ at, r: 60, t: c.t - 8 - k * 14 })), token: { at: ROUTE_RUSSIA[Math.min(4, Math.floor(u * 0.85 * 5.99))] }, labels: [{ text: "MOSCOW", at: P.Moscow, t: c.t - 4, size: 34 }] }; },
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d }, ...[0, 1, 2, 3].map((k) => ({ f: 8 + k * 14, kind: "fire", gain: 0.5 }))] });
  const sMos = w("He", 542);
  add({ id: "moscow", from: sMos, scene: 8, set: "field", v: 4, light: "dusk", amb: "fire", xin: 8,
    cams: (c) => [K(0, [2, 1.6, 12], [0, 6, -60], 44), K(c.w(w("fire.", sMos)) - 6, [1, 2.4, 16], [0, 10, -80], 48, { dur: 20 })],
    actors: (c) => { const tf = st(c, w("fire.", sMos)); const out = [...ch("nap_coat", [0, 0, 6], c, { expr: tf > 0 ? "shock" : st(c, w("empty,", sMos)) > 0 ? "worried" : "proud", vest: tf < 0 })];
      if (tf > -6) out.push(...fires(c, clamp01((tf + 6) / 24)));
      return out; },
    points: (c) => st(c, w("fire.", sMos)) > 0 ? [{ pos: [0, 8, -40], color: "#ff7a3a", i: 6 * clamp01(st(c, w("fire.", sMos)) / 30), d: 120 }] : [],
    over: (c, g, Wd, H) => drawLabel(g, "MOSCOW", st(c, w("Moscow,", sMos)), 60, Wd, H, 0.5, 0.18, { sub: "September 1812" }),
    cues: (c) => [{ f: c.w(w("Moscow,", sMos)), kind: "pop" }, { f: c.w(w("fire.", sMos)), kind: "fire", dur: 60 }] });
  const sWait = w("He", 553);
  add({ id: "wait", from: sWait, scene: 8, set: "field", v: 4, light: "night", amb: "fire",
    cams: () => [K(0, [0.3, 1.5, 9.8], [0, 1.4, 6], 36, { creep: 0.003 })], dof: { cInf: 12 },
    actors: (c) => { const tb = st(c, w("turned", sWait)); return [...fires(c, 1), ...ch("nap_coat", [0, 0, 6], c, tb > 0 ? { view: "side", mode: "march", phase: walkPhase(c.f, 1.2), expr: "sad" } : { expr: "worried", vest: true }, { flip: tb > 0 })]; },
    over: (c, g, Wd, H) => drawStamp(g, "35 DAYS", st(c, w("month", sWait)), 70, Wd, H, [0.62, 0.2]),
    cues: (c) => [{ f: c.w(w("month", sWait)), kind: "clock", dur: 40 }, { f: c.w(w("turned", sWait)), kind: "sting", gain: 0.5 }] });
  const sCold = w("Temperatures", 567);
  add({ id: "cold", from: sCold, scene: 8, set: "field", v: 3, light: "snow", amb: "blizzard", xin: 10, weather: "snow",
    cams: () => [K(0, [0.4, 1.7, 5], [0, 1.6, 0], 36, { creep: 0.004 })], dof: { cInf: 10 },
    actors: (c) => [...ch("fr_soldier", [0, 0, 0], c, { v: 2, expr: "sick" }), ...ch("fr_soldier", [-1.4, 0, -0.6], c, { v: 4, expr: "sad", mode: "sit" })],
    over: (c, g, Wd, H) => drawStamp(g, "−30°C", st(c, w("−30°C.", sCold)), 999, Wd, H, [0.62, 0.2]),
    cues: (c) => [{ f: c.w(w("−30°C.", sCold)), kind: "stamp" }] });
  const sHung = w("Hunger,", 571);
  add({ id: "retreat_snow", from: sHung, scene: 8, set: "field", v: 3, light: "snow", amb: "blizzard", weather: "snow",
    cams: (c) => { const x = 0.06 * c.t; return [K(0, [x + 4, 2.2, 12], [x - 2, 1.4, 0], 46, { creep: 0.001 })]; },
    actors: (c) => [...army("fr_soldier", [-8 + 0.06 * c.t, 0, -2], 3, 6, [1.8, 1.6], c.f, { march: true, side: true, flip: true, expr: "sick" }), ...ch("nap_coat", [0.06 * c.t - 2, 0, 1.5], c, { view: "side", mode: "march", phase: walkPhase(c.f, 1), expr: "sad" }, { flip: true }),
      ...[0, 1, 2].flatMap((k) => propCard("horse", [26 - 0.1 * c.t + k * 4, 2, -30 - k * 3], c.f, { flip: true, rider: "russian", phase: ((c.t + k * 3) / 9) % 1 }))],
    cues: (c) => [{ f: 0, kind: "march", dur: c.d, gain: 0.5 }, { f: c.w(w("attacks", sHung)), kind: "hooves", dur: 40 }] });
  const sFrac = w("Only", 580);
  add({ id: "fraction", from: sFrac, scene: 8, amb: "map", xin: 8,
    map: (c) => ({ f: c.f, view: [30, 54, 2.2], realms: [{ polys: [RUSSIA], col: "#3a7a4a", alpha: 0.35 }], routes: [{ pts: ROUTE_RUSSIA, u: 1, col: "#c8d4e8" }, { pts: ROUTE_RETREAT, u: smooth(u01(c, 0, c.d)), col: "#e85a5a" }], cold: 0.7,
      labels: [{ text: "600,000 → A SMALL FRACTION", at: [30, 58.5], t: c.t - 6, size: 34, dy: 0, col: "#8a1f24" }] }),
    over: (c, g, Wd, H) => drawSnow(g, c.f, Wd, H, 140),
    cues: (c) => [{ f: 0, kind: "drone_low" }] });

  // ===================== S9 — DOWNFALL =====================
  const sCoal = w("Now", 588);
  const coal: [string, LL[][], string][] = [["Russia,", [RUSSIA], "#3a7a4a"], ["Prussia,", [PRUSSIA], "#5a5a6a"], ["Austria,", [AUSTRIA], "#c9a14a"], ["Sweden", [SWEDEN], "#3a6ad8"], ["Britain", [BRITAIN], "#c0272d"]];
  add({ id: "coalition", from: sCoal, scene: 9, amb: "map", xin: 10,
    map: (c) => ({ f: c.f, view: [14, 51, 0.95], realms: [{ polys: EMPIRE_1812, col: "#27408b", alpha: 0.7 }, ...coal.map(([word, polys, col]) => ({ polys, col, alpha: 0.6 * clamp01(st(c, w(word, sCoal)) / 10) }))],
      routes: [[30, 54], [16, 55], [16, 48], [4, 55], [-1, 52]].map((s, k) => ({ pts: [s as LL, [8 + k * 0.6, 49.5] as LL], u: smooth(u01(c, c.w(w("joined", sCoal)) + k * 4, c.d)), col: "#ffd0d0" })) }),
    cues: (c) => [...coal.map(([word]) => ({ f: c.w(w(word, sCoal)), kind: "pop" })), { f: c.w(w("joined", sCoal)), kind: "swell" }] });
  const sLei = w("In", 600);
  add({ id: "leipzig", from: sLei, scene: 9, set: "field", v: 6, light: "overcast", amb: "battle", xin: 8,
    cams: () => [K(0, [0, 6, 20], [0, 1, -6], 48), K(2, [0, 4.5, 16], [0, 1.2, -6], 46, { dur: 100 })], kicks: (c) => [kick(c.w(w("beaten", sLei)), 0.12)],
    actors: (c) => { const out = [...army("fr_soldier", [-6, 0, 0], 3, 6, [1.8, 1.6], c.f, { expr: "worried" }), ...army("russian", [-18, 0, -8], 2, 6, [1.8, 1.6], c.f, {}), ...army("prussian", [6, 0, -8], 2, 6, [1.8, 1.6], c.f, {}), ...army("austrian", [-6, 0, -14], 2, 8, [1.8, 1.6], c.f, {})];
      for (let k = 0; k < 4; k++) out.push(fxCard("smoke", [-12 + k * 8, 2, -5], 4, ((c.t + k * 11) / 40) % 1, k));
      return out; },
    over: (c, g, Wd, H) => { drawStamp(g, "1813", st(c, w("1813,", sLei)), 60, Wd, H); drawLabel(g, "LEIPZIG", st(c, w("Leipzig,", sLei)), 999, Wd, H, 0.5, 0.18, { sub: "the Battle of the Nations" }); },
    cues: (c) => [{ f: c.w(w("1813,", sLei)), kind: "stamp" }, ...gunCues(6, 5, 18), { f: c.w(w("beaten", sLei)), kind: "boom" }] });
  const sAbd = w("The", 613);
  add({ id: "paris_falls", from: sAbd, scene: 9, set: "paris", light: "overcast", amb: "march", xin: 8,
    cams: () => [K(0, [6, 2.4, 14], [0, 1.6, -10], 46)],
    actors: (c) => [...army("russian", [-4, 0, 0 - 0.05 * c.t], 3, 3, [1.6, 1.8], c.f, { march: true }), ...army("prussian", [2, 0, 2 - 0.05 * c.t], 3, 3, [1.6, 1.8], c.f, { march: true })],
    over: (c, g, Wd, H) => drawLabel(g, "PARIS FALLS · 1814", 4 + c.t - 4, 999, Wd, H, 0.5, 0.18, { size: 44 }),
    cues: (c) => [{ f: 0, kind: "march", dur: c.d }] });
  const sThr = w("and", 620);
  add({ id: "abdicate", from: sThr, scene: 9, set: "room", v: 0, light: "interior", amb: "court", xin: 6,
    cams: () => [K(0, [0.4, 1.5, 3.2], [0, 1.4, -2], 36, { creep: 0.004 })], dof: { cInf: 10 },
    actors: (c) => [...ch("nap", [-0.4, 0, -2], c, { expr: "sad" }), ...propCard("desk", [0.5, 0, -2.4], c.f), ...propCard("bicorne_prop", [0.2, 1.0, -2.2], c.f)],
    over: (c, g, Wd, H) => drawLabel(g, "ABDICATION", st(c, w("throne.", sThr)), 999, Wd, H, 0.5, 0.18, { size: 50, sub: "April 1814" }),
    cues: (c) => [{ f: c.w(w("throne.", sThr)), kind: "drum_hit", gain: 0.7 }] });
  const sElba = w("He", 630);
  add({ id: "elba", from: sElba, scene: 9, set: "coast", v: 2, light: "day", amb: "sea", xin: 10,
    cams: (c) => [K(0, [0, 5, -18], [0, 2, 10], 48), K(c.w(w("Emperor,", sElba)) - 4, [1, 1.8, -4], [0, 1.6, 2], 38, { dur: 16 })],
    actors: (c) => { const tz = st(c, w("29", sElba)), x = tz > 0 ? 1.2 * Math.sin(tz / 12) : 0; return [...ch("nap", [x, 0, 2], c, { expr: st(c, w("Emperor,", sElba)) > 0 ? "sly" : "worried", vest: tz < 0, view: tz > 0 ? "side" : "front", mode: tz > 0 ? "march" : "stand", phase: walkPhase(c.f, 1.4) }, { flip: Math.cos(tz / 12) < 0 }), ...(st(c, w("Emperor,", sElba)) > 0 ? propCard("wreath", [x, 2.25, 2.1], c.f, { scale: 0.4 }) : [])]; },
    over: (c, g, Wd, H) => { drawLabel(g, "ELBA", st(c, w("Elba,", sElba)), 999, Wd, H, 0.5, 0.18, { sub: "29 km long" }); },
    cues: (c) => [{ f: c.w(w("Elba,", sElba)), kind: "pop" }, { f: c.w(w("Emperor,", sElba)), kind: "sparkle" }] });

  // ===================== S10 — RETURN AND WATERLOO =====================
  const sEsc = w("Ten", 655);
  add({ id: "escape", from: sEsc, scene: 10, set: "coast", v: 2, light: "night", amb: "sea", xin: 10,
    cams: () => [K(0, [6, 3, 8], [0, 1, -30], 46)],
    actors: (c) => [...[0, 1].flatMap((k) => propCard("ship", [-6 + k * 10 - 0.05 * c.t, -0.4, -30 - k * 6 - 0.05 * c.t], c.f, { phase: ((c.f / 40) + k * 0.4) % 1, scale: 0.6 })), ...army("guard", [-4, 0, -6], 2, 5, [1.6, 1.4], c.f, {}), ...ch("nap", [1.5, 0, -3], c, { expr: "sly", vest: true })],
    over: (c, g, Wd, H) => drawLabel(g, "~1,000 MEN", st(c, w("thousand", sEsc)), 999, Wd, H, 0.5, 0.18, { size: 50, sub: "February 1815" }),
    cues: (c) => [{ f: c.w(w("escaped,", sEsc)), kind: "whoosh" }, { f: c.w(w("thousand", sEsc)), kind: "pop" }] });
  const sLaf = w("When", 665);
  add({ id: "here_i_am", from: sLaf, scene: 10, set: "field", v: 6, light: "day", amb: "wind", xin: 8,
    cams: (c) => [K(0, [8, 1.8, 6], [0, 1.5, -2], 42), K(c.w(w("walked", sLaf)) - 4, [3, 1.6, 6], [0, 1.6, 0], 38, { dur: 30 }), K(c.w(w("here", sLaf)) - 6, [0.4, 1.5, 3.9], [0, 1.4, 0.5], 32, { dur: 12, creep: 0.006 })],
    actors: (c) => { const tw = c.w(w("walked", sLaf)), z = c.t < tw ? 3 : lerp(3, 0.5, smooth((c.t - tw) / 40)); return [...ch("nap", [0, 0, z], c, { expr: "determined", view: c.t > tw && c.t < tw + 40 ? "side" : "front", mode: c.t > tw && c.t < tw + 40 ? "march" : "stand", phase: walkPhase(c.f, 1.2), wave: st(c, w("here", sLaf)) > 0 ? 1 : undefined }, { flip: true }),
      ...[-2.4, -0.8, 0.8, 2.4].flatMap((x, k) => ch("fr_soldier", [x, 0, -2.5], c, { v: k, seed: 80 + k, expr: st(c, w("kill", sLaf)) > 0 ? "nervous" : "stern" }))]; },
    over: (c, g, Wd, H) => drawLabel(g, "LAFFREY, MARCH 1815", 6 + c.t - 6, 90, Wd, H, 0.5, 0.18, { size: 36 }),
    cues: (c) => [{ f: c.w(w("walked", sLaf)), kind: "steps", dur: 40 }, { f: c.w(w("here", sLaf)), kind: "drum_hit", gain: 0.6 }] });
  const sSw = w("They", 692);
  add({ id: "switch", from: sSw, scene: 10, set: "field", v: 6, light: "day", amb: "crowd_murmur",
    cams: () => [K(0, [0, 2, 6], [0, 1.8, -1], 42)], kicks: () => [kick(4, 0.1)],
    actors: (c) => [...ch("nap", [0, 0, 0.8], c, { expr: "grin" }), ...[-2.4, -0.8, 0.8, 2.4].flatMap((x, k) => ch("fr_soldier", [x, 0, -1.2], c, { v: k, seed: 80 + k, expr: "laugh", wave: (c.t + k * 5) % 16 < 8 ? 1 : 0.5 })), ...(c.t < 16 ? [fxCard("burst", [0, 1.6, 0.6], 2.0, c.t / 16, 1)] : [])],
    over: (c, g, Wd, H) => drawLabel(g, "\"VIVE L'EMPEREUR!\"", 2 + c.t - 2, 999, Wd, H, 0.5, 0.18, { size: 46 }),
    cues: () => [{ f: 2, kind: "crowd" }] });
  const sFled = w("The", 695);
  add({ id: "king_flees", from: sFled, scene: 10, set: "paris", light: "day", amb: "crowd_murmur", xin: 6,
    cams: () => [K(0, [5, 2, 6], [0, 1.4, -6], 44)],
    actors: (c) => [...ch("king", [4 - 0.12 * c.t, 0, -4], c, { view: "side", mode: "march", phase: walkPhase(c.f, 2.4), expr: "shock" }, { flip: true }), fxCard("speed", [5.4 - 0.12 * c.t, 1.4, -3.9], 2, (c.t / 8) % 1, 1),
      ...(st(c, w("back.", sFled)) > -6 ? ch("nap", [2.6, 0, -1], c, { expr: "sly", vest: true }) : [])],
    cues: (c) => [{ f: 0, kind: "whoosh" }, { f: c.w(w("back.", sFled)), kind: "title_hit", gain: 0.6 }] });
  const sHun = w("His", 703);
  add({ id: "hundred_days", from: sHun, scene: 10, amb: "map", xin: 6,
    map: (c) => ({ f: c.f, view: [6, 46, 3.2], realms: [fr(0.55)], routes: [{ pts: ROUTE_ELBA, u: smooth(u01(c, 0, c.d)) }], labels: [{ text: "THE HUNDRED DAYS", at: [3.5, 49.6], t: st(c, w("hundred", sHun)), size: 40, dy: 0 }, { text: "ELBA", at: P.Elba, t: 4, size: 28 }] }),
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d }] });
  const sWat = w("On", 710);
  add({ id: "waterloo", from: sWat, scene: 10, set: "field", v: 5, light: "overcast", amb: "rain", xin: 10, weather: "rain",
    cams: () => [K(0, [10, 6, 24], [-6, 1, -10], 48), K(2, [8, 4.5, 18], [-6, 1.2, -10], 46, { dur: 120 })],
    actors: (c) => [...army("redcoat", [-14, 0, -14], 2, 10, [1.6, 1.4], c.f, {}), ...propCard("horse", [-4, 0, -10], c.f, { rider: "wellington", flip: true }), ...propCard("flag_uk", [-10, 0, -16], c.f, { phase: (c.f / 25) % 1 }), ...army("fr_soldier", [-10, 0, 4], 2, 8, [1.8, 1.6], c.f, {})],
    over: (c, g, Wd, H) => { drawStamp(g, "JUNE 18, 1815", st(c, w("eighteenth,", sWat)), 70, Wd, H); drawLabel(g, "WATERLOO", st(c, w("Waterloo,", sWat)), 999, Wd, H, 0.5, 0.18, { sub: "Belgium" }); drawLabel(g, "WELLINGTON", st(c, w("Wellington.", sWat)), 60, Wd, H, 0.3, 0.6, { size: 34 }); },
    cues: (c) => [{ f: c.w(w("eighteenth,", sWat)), kind: "stamp" }, { f: c.w(w("Waterloo,", sWat)), kind: "pop" }, { f: c.w(w("Wellington.", sWat)), kind: "pop" }] });
  const sRain = w("Rain", 722);
  add({ id: "waterloo_battle", from: sRain, scene: 10, set: "field", v: 5, light: "overcast", amb: "rain", weather: "rain",
    cams: (c) => [K(0, [3, 1.9, 7], [-6, 1.3, -8], 44), K(c.w(w("Prussians", sRain)) - 6, [-8, 2.2, 14], [-20, 1.6, -2], 46, { dur: 20 })], kicks: (c) => [kick(c.w(w("held,", sRain)), 0.08), kick(c.w(w("broke.", sRain)), 0.14)],
    actors: (c) => { const tp = c.w(w("Prussians", sRain)), tb = st(c, w("broke.", sRain)), out = [...army("redcoat", [-10, 0, -12], 3, 8, [1.4, 1.2], c.f, { expr: "determined" }), ...gun([4, 0, -2], c, 0, 30, true)];
      out.push(...army("guard", [-8 + (tb > 0 ? 0.08 * tb : 0), 0, -5], 2, 6, [1.6, 1.4], c.f, { march: true, side: tb > 0, expr: tb > 0 ? "shock" : "determined", flip: tb > 0 }));
      if (c.t > tp - 10) out.push(...army("prussian", [-34 + 0.14 * (c.t - tp + 10), 0, -2], 3, 4, [1.6, 1.4], c.f, { march: true, side: true }), ...propCard("horse", [-30 + 0.14 * (c.t - tp + 10), 0, 1], c.f, { rider: "blucher", phase: (c.t / 9) % 1 }));
      return out; },
    over: (c, g, Wd, H) => { drawLabel(g, "BLÜCHER'S PRUSSIANS", st(c, w("Prussians", sRain)), 60, Wd, H, 0.3, 0.18, { size: 36 }); },
    cues: (c) => [...gunCues(0, 4, 30), { f: c.w(w("held,", sRain)), kind: "muskets", dur: 30 }, { f: c.w(w("Prussians", sRain)), kind: "march", dur: 60 }, { f: c.w(w("broke.", sRain)), kind: "crowd" }] });
  const sNear = w("Wellington", 740);
  add({ id: "nearest", from: sNear, scene: 10, set: "field", v: 5, light: "overcast", amb: "rain", weather: "rain",
    cams: () => [K(0, [0.3, 1.5, 3.8], [0, 1.45, 0], 32, { creep: 0.005 })], dof: { cInf: 12 },
    actors: (c) => ch("wellington", [0, 0, 0], c, { expr: "sly" }),
    over: (c, g, Wd, H) => drawLabel(g, "WELLINGTON", 4 + c.t - 4, 999, Wd, H, 0.5, 0.18, { size: 44, sub: "Duke of" }),
    cues: () => [{ f: 0, kind: "sting", gain: 0.6 }] });

  // ===================== S11 — FINAL EXILE AND DEATH =====================
  const sHel = w("This", 749);
  add({ id: "helena_map", from: sHel, scene: 11, amb: "map", xin: 12,
    map: (c) => ({ f: c.f, view: [-2, 16, 0.33], realms: [fr(0.5)], routes: [{ pts: ROUTE_HELENA, u: smooth(u01(c, 0, c.w(w("Helena,", sHel)) + 20)) }], token: { at: partial2(ROUTE_HELENA, smooth(u01(c, 0, c.w(w("Helena,", sHel)) + 20))), who: "nap_coat" },
      labels: [{ text: "SAINT HELENA", at: P.StHelena, t: st(c, w("Helena,", sHel)), size: 40 }, { text: "≈2,000 km FROM AFRICA", at: [-5.7, -21], t: st(c, w("2,000", sHel)), size: 26, dy: 0 }] }),
    cues: (c) => [{ f: 0, kind: "waves", dur: c.d }, { f: c.w(w("Helena,", sHel)), kind: "pop" }] });
  const sMem = w("He", 770);
  add({ id: "memoirs", from: sMem, scene: 11, set: "room", v: 1, light: "overcast", amb: "sea", xin: 10,
    cams: () => [K(0, [0.8, 1.6, 4], [0, 1.4, -2], 38, { creep: 0.003 })], dof: { cInf: 10 },
    actors: (c) => [...ch("nap_coat", [-1.2, 0, -2.2], c, { expr: "sad", wave: Math.sin(c.t / 10) > 0 ? 0.7 : 0.4, facing: 1 }), ...propCard("desk", [0.6, 0, -2.4], c.f), ...ch("scholar", [1.4, 0, -1.6], c, { mode: "sit", expr: "neutral", facing: -1 })],
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d, gain: 0.6 }] });
  const sDie = w("On", 778);
  add({ id: "death", from: sDie, scene: 11, set: "room", v: 1, light: "dusk", amb: "sea", xin: 12,
    cams: () => [K(0, [0.5, 1.4, 3.4], [0.6, 0.9, -2.4], 36, { creep: 0.002 })], dof: { cInf: 12 },
    actors: (c) => [...propCard("chair", [0.6, 0, -2.6], c.f), ...propCard("bicorne_prop", [0.6, 0.62, -2.5], c.f, { z: 2 })],
    fade: (c) => 0.4 * smooth(u01(c, c.w(w("died,", sDie)), c.w(w("died,", sDie)) + 30)),
    over: (c, g, Wd, H) => { drawStamp(g, "MAY 5, 1821", st(c, w("fifth,", sDie)), 70, Wd, H); drawLabel(g, "1769 – 1821", st(c, w("51", sDie)), 999, Wd, H, 0.5, 0.18, { sub: "aged 51" }); },
    cues: (c) => [{ f: c.w(w("fifth,", sDie)), kind: "stamp", gain: 0.6 }, { f: c.w(w("died,", sDie)), kind: "bell" }] });
  const s1840 = w("Nineteen", 793);
  add({ id: "return_1840", from: s1840, scene: 11, set: "paris", light: "snow", amb: "crowd_murmur", xin: 12, weather: "snowlight",
    cams: () => [K(0, [6, 3, 16], [0, 2, -10], 46), K(2, [4, 2.6, 12], [0, 2.4, -10], 44, { dur: 140 })],
    actors: (c) => [...propCard("coffin_cart", [-3 + 0.04 * c.t, 0, -2], c.f, { scale: 1.1 }), ...propCard("eagle", [-1 + 0.04 * c.t, 0, -2.6], c.f), ...crowd("townsman", 18, -9, 9, 2, 8, c, { expr: "sad" }, 21), ...crowd("guard", 6, -9, 9, -7, -5, c, { expr: "sad" }, 23)],
    over: (c, g, Wd, H) => drawLabel(g, "PARIS, 1840", st(c, w("Paris,", s1840)), 999, Wd, H, 0.5, 0.18, { sub: "to Les Invalides" }),
    cues: (c) => [{ f: c.w(w("Paris,", s1840)), kind: "drum_hit", gain: 0.5 }] });

  // ===================== S12 — LEGACY =====================
  const sCost = w("His", 809);
  add({ id: "cost", from: sCost, scene: 12, amb: "map", xin: 10,
    map: (c) => ({ f: c.f, view: [14, 49, 1.0], realms: [{ polys: EMPIRE_1812, col: "#27408b", alpha: 0.35 }], dim: 0.3,
      battles: [P.Lodi, P.Arcole, P.Rivoli, P.Pyramids, P.Austerlitz, P.Jena, P.Friedland, P.Borodino, P.Leipzig, P.Waterloo, [-3.7, 40.4] as LL, [-8.6, 41.1] as LL].map((at, k) => ({ at, t: c.t - k * 3 })) }),
    cues: (c) => [{ f: 0, kind: "drone_low" }] });
  const sOut = w("But", 815);
  add({ id: "outlived", from: sOut, scene: 12, amb: "map", xin: 8,
    map: (c) => ({ f: c.f, view: [12, 48, 1.1], realms: [fr(0.6)], glows: [[2, 47], [5, 51], [12, 43], [-4, 40], [10, 51], [20, 52], [5.5, 52.3], [8, 47]].map((at, k) => ({ at: at as LL, r: 120, t: c.t - k * 5, col: [255, 214, 120] as [number, number, number] })),
      labels: [{ text: "LAWS", at: [-2, 44], t: st(c, w("laws,", sOut)), size: 34, dy: 0 }, { text: "SCHOOLS", at: [14, 53.5], t: st(c, w("schools,", sOut)), size: 34, dy: 0 }, { text: "THE METRIC SYSTEM", at: [16, 44.5], t: st(c, w("metric", sOut)), size: 34, dy: 0 }] }),
    cues: (c) => [{ f: c.w(w("laws,", sOut)), kind: "pop" }, { f: c.w(w("schools,", sOut)), kind: "pop" }, { f: c.w(w("metric", sOut)), kind: "pop" }, { f: 0, kind: "swell" }] });
  const sQ = w("So,", 832);
  add({ id: "question", from: sQ, scene: 12, amb: "map", xin: 10,
    paint: (c, g, Wd, H) => {
      const u = smooth(u01(c, 0, c.d + 40));
      g.save(); g.filter = `blur(${Math.round(4 + 3 * u)}px)`; drawMap(g, { f: c.f, view: [12, 49, 1.25 - 0.2 * u], realms: [{ polys: CLIENTS_1812, col: "#7a8fd0", alpha: 0.5 }, { polys: EMPIRE_1812, col: "#27408b", alpha: 0.7 }] }, Wd, H); g.restore();
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(255,190,110,0.15)"); gr.addColorStop(1, "rgba(30,20,50,0.4)"); g.fillStyle = gr; g.fillRect(0, 0, Wd, H);
      const hh = H * (0.98 - 0.16 * u), ww = hh * 0.6; g.drawImage(HERO(), Wd / 2 - ww / 2, H * 1.02 - hh, ww, hh);
      const tb = st(c, w("brilliant", sQ)), ta = st(c, w("ambition", sQ));
      drawLabel(g, "BRILLIANT LEADER?", tb, 999, Wd, H, 0.2, 0.42, { size: 44, col: "#27408b" });
      drawLabel(g, "FATAL AMBITION?", ta, 999, Wd, H, 0.8, 0.42, { size: 44, col: "#8a1f24" });
      if (c.t > c.w(w("weakness?", sQ)) + 14) { g.globalAlpha = clamp01((c.t - c.w(w("weakness?", sQ)) - 14) / 12); drawLabel(g, "NAPOLEON BONAPARTE", 30, 999, Wd, H, 0.5, 0.12, { size: 54, sub: "1769 – 1821" }); g.globalAlpha = 1; }
    },
    cues: (c) => [{ f: 0, kind: "swell" }, { f: c.w(w("brilliant", sQ)), kind: "pop" }, { f: c.w(w("ambition", sQ)), kind: "pop" }, { f: c.w(w("weakness?", sQ)) + 14, kind: "title_hit", gain: 0.7 }] });

  const lastE = W[W.length - 1].e;
  const total = Math.ceil((lastE + 1.6) * FPS);
  S.forEach((s, i) => { s.a = i === 0 ? 0 : Math.max(0, frameOfWord(s.from) - 2); });
  S.forEach((s, i) => { s.b = i + 1 < S.length ? S[i + 1].a! : total; });
  return { shots: S, total };
};

/** Moscow burning behind its wall: flames + smoke columns, grown by g (0..1) */
const fires = (c: C, g: number): CardDraw[] => { const out: CardDraw[] = []; if (g <= 0) return out;
  for (let k = 0; k < 7; k++) { const x = -60 + k * 20, z = -66 - (k % 3) * 8, s = (10 + (k % 3) * 4) * Math.min(1, g * (1 + k * 0.15)); out.push(fxCard("flame", [x, 6 + s * 0.45, z], s, ((c.f / 10) + k * 0.27) % 1, k), fxCard("smoke", [x, 10 + s, z - 4], s * 2, ((c.f / 90) + k * 0.2) % 1, k + 2)); }
  return out; };
const partial2 = (pts: LL[], u: number): LL => { const i = Math.min(pts.length - 2, Math.floor(u * (pts.length - 1))), k = u * (pts.length - 1) - i; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; };
let HERO_C: HTMLCanvasElement | null = null;
const HERO = () => {
  if (HERO_C) return HERO_C;
  HERO_C = document.createElement("canvas"); HERO_C.width = 1200; HERO_C.height = 2000;
  const g = HERO_C.getContext("2d")!; g.scale(2, 2); bodyFront(new Pen(g), CAST.nap, { expr: "sly", mode: "stand", seed: 5, vest: true });
  return HERO_C;
};
export { drawSnow, drawRain };
