// The shot list of "Alexander the Great: The Boy Who Conquered an Empire". Shots start at a narration word (index into
// words.json) 2 frames before it is spoken, so every visual beat lands 0-3 frames ahead of its word. Inside a shot,
// c.t counts frames from the shot start and c.w(i) is the shot-relative frame of word i. Camera keys are shot-relative.
import type { CamKey, Kick } from "../core/camera.ts";
import { FPS, words, frameOfWord, smooth, clamp01, lerp, lerp3, easeOut, hash, type V3 } from "../core/time.ts";
import type { CardDraw } from "../render/cards.ts";
import type { PointL } from "../render/engine.ts";
import type { Light } from "../render/lights.ts";
import { charCard, propCard, fxCard, army, walkPhase, shadowCard, CAST, type Who, type Pose } from "../chars/cast.ts";
import { drawMap, type MapState } from "../overlay/maps.ts";
import { CITY, R } from "../overlay/geo.ts";
import { drawStamp, drawLabel, drawTitle, drawTag } from "../overlay/text.ts";
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
  fade?: (c: C) => number; flash?: (c: C) => number;
  // resolved
  a?: number; b?: number;
};

// ---------- helpers
const SEED: Partial<Record<Who, number>> = { alex: 5, alex_helm: 5, alex_king: 5, alex_boy: 6, alex_sick: 5, philip: 9, aristotle: 11, darius: 13, parmenion: 15, porus: 17, general: 19, seer: 21, physician: 23 };
const ch = (who: Who, pos: V3, c: C, p: Partial<Pose> = {}, o: Parameters<typeof charCard>[3] = {}) => charCard({ who, seed: SEED[who] ?? 3, ...p }, pos, c.f, o);
const K = (f: number, pos: V3, look: V3, fov = 40, o: Partial<CamKey> = {}): CamKey => ({ f, pos, look, fov, ...o });
const kick = (f: number, a = 0.12): Kick => ({ f, a });
const st = (c: C, i: number) => c.t - c.w(i); // frames since word i
const u01 = (c: C, a: number, b: number) => clamp01((c.t - a) / Math.max(1, b - a));
const along = (a: V3, b: V3, u: number): V3 => lerp3(a, b, smooth(u));
let IDX: (cap: string, from: number) => number = () => 0;
const TORCH_PTS = (pts: V3[], c: C, i = 3.2): PointL[] => pts.slice(0, 4).map((q, k) => ({ pos: [q[0], q[1] + 2.4, q[2]], color: "#ffa64a", i: i * (0.9 + 0.1 * Math.sin(c.f * 0.4 + k * 2)), d: 16 }));
const torchCards = (pts: V3[], c: C): CardDraw[] => pts.flatMap((q, k) => [...propCard("torch", q, c.f), fxCard("flame", [q[0], q[1] + 2.35, q[2]], 0.75, ((c.f / 12 + k * 0.3) % 1), k + 1), fxCard("glow", [q[0], q[1] + 2.3, q[2]], 2.4, 0, k)]);

export const buildShots = (): { shots: Shot[]; total: number } => {
  const W = words();
  IDX = (cap: string, from: number) => {
    const n = (s: string) => s.replace(/[^A-Za-z0-9]/g, ""); // case-sensitive: "His" must not match "his"
    for (let i = from; i < W.length; i++) if (n(W[i].cap) === n(cap)) return i;
    throw new Error(`word ${cap} after ${from}`);
  };
  const w = IDX;
  const S: Shot[] = [];
  const add = (s: Shot) => S.push(s);
  const AEGAE_T: V3[] = [[-7.2, 0, 3.2], [7.2, 0, 3.2], [-4.5, 0, 8.4], [4.5, 0, 8.4]];

  const titleAbs = frameOfWord(w("major", 47));
  // ===================== S1 — INTRODUCTION =====================
  add({ id: "birth", from: 0, scene: 1, set: "pella", light: "dawn", amb: "birds",
    cams: (c) => [K(0, [3.2, 1.25, 3.4], [2.2, 0.55, 0.2], 34), K(c.w(w("Pella,", 0)) - 4, [5.5, 3.4, 8.5], [1.5, 0.8, -2], 40, { dur: 34 })],
    dof: { cInf: 12, focus: 3.4 },
    actors: (c) => [...propCard("cradle", [2.2, 0, 0], c.f, { anim: c.t > c.w(w("born", 0)) ? 1 : 0 }), ...ch("courtier", [0.4, 0, -0.6], c, { v: 4, expr: "smile_closed", facing: 1 }), ...ch("philip", [4.2, 0, -1.4], c, { expr: "proud", facing: -1 })],
    over: (c, g, Wd, H) => { drawStamp(g, "356 BC", st(c, w("356 BC,", 0)), 70, Wd, H); drawLabel(g, "PELLA", st(c, w("Pella,", 0)), 50, Wd, H, 0.5, 0.17, { sub: "capital of Macedonia" }); },
    cues: (c) => [{ f: c.w(1), kind: "stamp" }, { f: c.w(w("born", 0)), kind: "sparkle" }, { f: c.w(w("Pella,", 0)), kind: "pop" }, { f: c.w(w("Pella,", 0)) - 4, kind: "whoosh", gain: 0.6 }] });
  add({ id: "kingdom", from: w("the", 8), scene: 1, set: "pella", light: "day", amb: "wind", xin: 6,
    cams: () => [K(0, [0, 7, 6], [0, 1, 40], 52), K(2, [0, 12, 12], [0, -6, 90], 54, { dur: 90 })],
    actors: (c) => army("phalangite", [-6, 0, -4], 2, 7, [2, 2], c.f, { march: false }),
    over: (c, g, Wd, H) => { drawLabel(g, "MACEDONIA", st(c, w("Macedonia,", 9)), 70, Wd, H, 0.5, 0.2, { size: 64, sub: "a rugged mountain kingdom" }); },
    cues: (c) => [{ f: c.w(w("Macedonia,", 9)), kind: "pop" }, { f: c.w(w("mountain", 9)), kind: "wind", gain: 0.6 }] });
  add({ id: "name", from: 25, scene: 1, set: "pella", light: "day", amb: "wind",
    cams: () => [K(0, [0.4, 1.5, 7.2], [0, 1.6, 2], 36), K(8, [0.2, 1.55, 6.0], [0, 1.7, 2], 32, { dur: 26 })], dof: { cInf: 12, focus: 7 },
    actors: (c) => ch("alex", [0, 0, 2], c, { expr: st(c, 27) > 0 ? "sly" : "neutral" }),
    over: (c, g, Wd, H) => drawLabel(g, "ALEXANDER", st(c, 28), 40, Wd, H, 0.5, 0.2, { size: 66 }),
    cues: (c) => [{ f: c.w(28), kind: "title_hit", gain: 0.6 }] });
  add({ id: "future_map", from: 29, scene: 1, xin: 8, amb: "map",
    map: (c) => ({ f: c.f, view: [47 + 3 * u01(c, 0, c.d), 33, 1.02 + 0.06 * u01(c, 0, c.d)], mac: 1, full: easeOut(u01(c, c.w(w("largest", 29)) - 10, c.w(w("seen.", 29)))), labels: [{ text: "MACEDONIA", at: [22.5, 42.8], t: c.t - 4 }] }),
    cues: (c) => [{ f: c.w(w("largest", 29)) - 10, kind: "swell" }] });
  add({ id: "never_lose", from: 47, scene: 1, set: "pella", light: "golden", amb: "wind",
    cams: (c) => [K(0, [1.2, 1.65, 6.4], [0, 1.85, 2], 32, { roll: -4.5, creep: 0.004 }), K(c.w(w("battle.", 47)) - 6, [0.9, 1.75, 5.4], [0, 1.9, 2], 28, { dur: 10, roll: -4.5, creep: 0.006 })],
    kicks: (c) => [kick(c.w(w("battle.", 47)), 0.1)], dof: { cInf: 14, focus: 4.4 },
    actors: (c) => [...ch("alex_helm", [0, 0, 2], c, { expr: "sly", facing: 0 }), ...army("phalangite", [-7, 0, -6], 2, 8, [2, 2], c.f, {})],
    over: (c, g, Wd, H) => drawTitle(g, c.f - titleAbs, 56, Wd, H),
    noCap: (c) => c.f - titleAbs > 0,
    cues: (c) => [{ f: c.w(w("battle.", 47)), kind: "boom" }, { f: c.w(w("major", 47)), kind: "title_hit" }] });

  // ===================== S2 — CHILDHOOD =====================
  const sPhil = w("His", 55);
  add({ id: "philip", from: sPhil, scene: 2, set: "pella", light: "day", amb: "court", flash: (c) => (c.t < 4 ? [0.9, 0.6, 0.35, 0.15][c.t] : 0),
    cams: (c) => [K(0, [0.3, 2.7, -3.2], [0, 2.7, -9.6], 38), K(c.w(w("eye", sPhil)) - 3, [0.1, 3.3, -6.9], [0, 3.35, -9.6], 30, { dur: 12, creep: 0.004 })],
    kicks: (c) => [kick(c.w(w("eye", sPhil)), 0.05)], dof: { cInf: 12, focus: 6.5 },
    actors: (c) => [...ch("philip", [0, 1.55, -9.6], c, { expr: st(c, w("eye", sPhil)) > 0 ? "stern" : "proud" }), ...propCard("throne", [0, 1.55, -10.8], c.f)],
    over: (c, g, Wd, H) => { drawTitle(g, c.f - titleAbs, 56, Wd, H); drawLabel(g, "PHILIP II", st(c, w("Philip", sPhil)), 60, Wd, H, 0.5, 0.18, { sub: "King of Macedonia" }); },
    noCap: (c) => c.f - titleAbs < 66,
    cues: (c) => [{ f: 0, kind: "flash" }, { f: c.w(w("Philip", sPhil)), kind: "pop" }, { f: c.w(w("eye", sPhil)), kind: "boom", gain: 0.5 }] });
  const sFarm = w("and", w("battle,", sPhil));
  add({ id: "army_drill", from: sFarm, scene: 2, set: "field", v: 0, light: "day", amb: "march", xin: 6,
    cams: () => [K(0, [6, 1.4, 14], [0, 1.6, 0], 40), K(4, [3, 1.2, 10], [0, 1.8, 0], 36, { dur: 60 })],
    kicks: (c) => [kick(c.w(w("dangerous", sFarm)), 0.08)],
    actors: (c) => [...army("phalangite", [-5, 0, -6 + 3 * u01(c, 0, c.d)], 4, 6, [2, 2], c.f, { march: true }), ...ch("philip", [5.5, 0, 4], c, { expr: st(c, w("dangerous", sFarm)) > 0 ? "grin" : "stern", facing: -1 })],
    cues: (c) => [{ f: c.w(w("dangerous", sFarm)), kind: "boom", gain: 0.6 }, { f: 0, kind: "march", dur: c.d }] });
  const sBuc = w("According", 80);
  const rear = (c: C) => 0.5 + 0.5 * Math.sin(c.t * 0.28);
  add({ id: "bucephalus", from: sBuc, scene: 2, set: "pella", light: "day", amb: "court", xin: 6,
    cams: () => [K(0, [7, 1.6, 12], [0, 1.6, 1], 42), K(6, [5.5, 1.5, 10], [-0.5, 1.7, 1], 38, { dur: 80 })],
    kicks: (c) => [0, 1, 2, 3].map((k) => kick(Math.round((Math.PI / 2 + k * 2 * Math.PI) / 0.28), 0.05)),
    actors: (c) => [...propCard("horse_rear", [-0.5, 0, 0], c.f, { anim: rear(c), phase: (c.t / 20) % 1 }),
      ...ch("courtier", [2.6 + 0.04 * c.t, 0, 2.4], c, { v: 1, expr: "shock", facing: 1, mode: "march", phase: walkPhase(c.f, 1.8) }), ...ch("guard", [-3.4 - 0.03 * c.t, 0, 2.6], c, { expr: "nervous", facing: -1 }),
      ...ch("alex_boy", [4.6, 0, 4.2], c, { expr: "sly", facing: -1 })],
    over: (c, g, Wd, H) => { drawTag(g, "ACCORDING TO PLUTARCH", c.t - 2, 80, Wd, H); drawLabel(g, "BUCEPHALUS", st(c, w("Bucephalus.", sBuc)), 60, Wd, H, 0.36, 0.2); },
    cues: (c) => [0, 1, 2, 3].map((k): Cue => ({ f: Math.round((Math.PI / 2 + k * 2 * Math.PI) / 0.28), kind: "neigh", gain: 0.7 })).concat([{ f: c.w(w("Bucephalus.", sBuc)), kind: "pop" }]) });
  const sShadow = w("Alexander", w("Bucephalus.", sBuc));
  add({ id: "shadow", from: sShadow, scene: 2, set: "pella", light: "golden", amb: "court",
    cams: (c) => [K(0, [3.2, 1.2, 6.6], [3.6, 1.05, 3.6], 34), K(c.w(w("shadow,", sShadow)) - 14, [1.2, 3.2, 5.5], [-0.6, 0.2, 1.4], 44, { dur: 16 })],
    dof: { cInf: 10, focus: 3 },
    actors: (c) => [...propCard("horse", [-0.6, 0, 0], c.f, { phase: 0.1 }), ...propCard("horse_shadow", [-0.6, 0, 1.12], c.f, { flat: true, phase: 0.1, yaw: Math.PI }),
      ...ch("alex_boy", [3.6, 0, 3.6], c, { expr: "sly", facing: -1 }), ...(st(c, w("shadow,", sShadow)) > 0 ? [fxCard("bang", [3.7, 1.75, 3.6], 0.8, st(c, w("shadow,", sShadow)) / 30, 2)] : [])],
    cues: (c) => [{ f: c.w(w("shadow,", sShadow)), kind: "pop" }, { f: c.w(w("shadow,", sShadow)) - 12, kind: "whoosh", gain: 0.5 }] });
  const sRide = w("so", sShadow);
  add({ id: "ride", from: sRide, scene: 2, set: "pella", light: "golden", amb: "court",
    cams: (c) => [K(0, [2, 1.6, 9], [0, 1.4, 0], 40), K(c.w(w("rode", sRide)) - 6, [6, 1.8, 11], [8, 1.5, 0], 44, { dur: 26 })],
    kicks: (c) => [kick(c.w(w("rode", sRide)), 0.08)],
    actors: (c) => {
      const tr = c.w(w("rode", sRide));
      if (c.t < tr) return [...propCard("horse", [0, 0, 0], c.f, { flip: c.t > c.w(w("turned", sRide)) + 6 }), ...ch("alex_boy", [1.6, 0, 0.6], c, { expr: "smile", facing: -1 }), fxCard("glow", [-8, 4, -6], 6, 0, 1)];
      const x = -2 + 0.32 * (c.t - tr);
      return [...propCard("horse", [x, 0, 0], c.f, { phase: (c.t / 8) % 1, rider: "alex_boy" }), fxCard("speed", [x - 2.4, 1.2, 0.1], 2.2, ((c.t - tr) / 10) % 1, 3), fxCard("dust", [x - 1.6, 0.3, 0.3], 1.4, ((c.t - tr) / 14) % 1, 4)];
    },
    cues: (c) => [{ f: c.w(w("rode", sRide)), kind: "hooves", dur: 40 }, { f: c.w(w("sun,", sRide)), kind: "sparkle" }] });
  const sTeach = w("Philip", 118);
  add({ id: "teacher", from: sTeach, scene: 2, set: "pella", light: "day", amb: "court",
    cams: () => [K(0, [0.6, 1.8, 7.5], [0, 1.6, 1.5], 38)], dof: { cInf: 12, focus: 6 },
    actors: (c) => [...ch("philip", [-1.1, 0, 1.4], c, { expr: st(c, w("money", sTeach)) > 0 ? "grin" : "proud", facing: 1 }), ...ch("alex_boy", [1.0, 0, 1.6], c, { expr: "smile", facing: -1 }),
      ...(st(c, w("money", sTeach)) > -4 ? [...propCard("sack", [-0.2, 0, 2.3], c.f), fxCard("sparkle", [-0.2, 0.7, 2.4], 1.0, (st(c, w("money", sTeach)) / 24) % 1, 2)] : [])],
    cues: (c) => [{ f: c.w(w("money", sTeach)), kind: "coins" }] });
  const sArist = w("So", sTeach);
  add({ id: "aristotle", from: sArist, scene: 2, set: "mieza", light: "day", amb: "birds", xin: 8,
    cams: () => [K(0, [-1, 1.8, 9], [-1.5, 1.6, 2], 42), K(2, [-1.3, 1.7, 6.5], [-1.5, 1.7, 2.2], 34, { dur: 34 })], dof: { cInf: 12, focus: 4.5 },
    actors: (c) => [...ch("aristotle", [-1.5, 0, 2.2], c, { expr: "smile", facing: 1 }), ...propCard("scroll", [-0.9, 0.95, 2.4], c.f, { scale: 0.8 })],
    over: (c, g, Wd, H) => drawLabel(g, "ARISTOTLE", st(c, w("Aristotle.", sArist)), 70, Wd, H, 0.5, 0.18, { sub: "philosopher" }),
    cues: (c) => [{ f: c.w(w("Aristotle.", sArist)), kind: "pop" }] });
  const sMieza = w("At", sArist);
  add({ id: "mieza", from: sMieza, scene: 2, set: "mieza", light: "day", amb: "birds",
    cams: () => [K(0, [9, 4, 14], [0, 1, 0], 44), K(4, [6, 2.6, 10], [1, 1.2, 1], 40, { dur: 60 })],
    actors: (c) => [...ch("aristotle", [-1.5, 0, 2.2], c, { expr: "smile", facing: 1, wave: Math.sin(c.t / 9) }), ...ch("alex_boy", [3.2, 0, 2.8], c, { expr: "neutral", facing: -1 }), ...ch("student", [4.6, 0, 1.6], c, { v: 2, expr: "neutral", facing: -1 })],
    over: (c, g, Wd, H) => drawLabel(g, "MIEZA", st(c, w("Mieza,", sMieza)), 60, Wd, H, 0.5, 0.18, { sub: "school of Aristotle" }),
    cues: (c) => [{ f: c.w(w("Mieza,", sMieza)), kind: "pop" }] });
  const sSubj = w("philosophy,", sMieza);
  add({ id: "subjects", from: sSubj, scene: 2, set: "mieza", light: "day", amb: "birds",
    cams: () => [K(0, [1.2, 3.1, 3.6], [1, 0.8, 0.5], 40), K(6, [1.2, 2.8, 3.1], [1, 0.8, 0.5], 38, { dur: 80 })], dof: { cInf: 10, focus: 3.4 },
    actors: (c) => {
      const out: CardDraw[] = [];
      const items: [string, number, V3][] = [["scroll", w("philosophy,", sSubj), [0, 0.82, 0.9]], ["geom", w("mathematics,", sSubj), [1.1, 0.82, 0.35]], ["tablet", w("science", sSubj), [2.1, 0.82, 0.9]], ["sack", w("medicine,", sSubj), [2.2, 0.82, 0.1]]];
      for (const [kind, wi, pos] of items) { const t = st(c, wi); if (t < 0) continue; out.push(...propCard(kind as any, pos, c.f, { flat: kind === "geom", anim: clamp01(t / 30), scale: kind === "geom" ? 0.6 : 0.7 })); if (t < 14) out.push(fxCard("puff", [pos[0], pos[1] + 0.2, pos[2]], 0.6, t / 14, 3)); }
      return out;
    },
    cues: (c) => ["philosophy,", "mathematics,", "science", "medicine,"].map((x) => ({ f: c.w(w(x, sSubj)), kind: "pop" })) });
  const sThink = w("and", w("medicine,", sSubj));
  add({ id: "think", from: sThink, scene: 2, set: "mieza", light: "day", amb: "birds",
    cams: () => [K(0, [1, 1.6, 6.4], [0.8, 1.7, 2.4], 36)], dof: { cInf: 12, focus: 4 },
    actors: (c) => [...ch("aristotle", [-0.3, 0, 2.2], c, { expr: "smile", facing: 1, wave: 0.9 }), ...ch("alex_boy", [1.9, 0, 2.6], c, { expr: st(c, w("think.", sThink)) > 0 ? "determined" : "neutral", facing: -1 }),
      ...(st(c, w("think.", sThink)) > 0 ? [fxCard("sparkle", [1.9, 1.6, 2.7], 0.8, (st(c, w("think.", sThink)) / 24) % 1, 3)] : [])],
    cues: (c) => [{ f: c.w(w("think.", sThink)), kind: "sparkle" }] });
  const sIliad = w("Alexander", 159);
  const bedAt: V3 = [-14.4, 0, 3];
  add({ id: "iliad", from: sIliad, scene: 2, set: "pella", light: "lamp", amb: "night", xin: 8,
    cams: (c) => [K(0, [-11, 1.6, 7.5], [-14.4, 0.7, 3], 40), K(c.w(w("pillow...", sIliad)) - 10, [-13, 1.25, 5], [-14.6, 0.8, 3], 34, { dur: 20 })], dof: { cInf: 12, focus: 3 },
    actors: (c) => [...propCard("bed", bedAt, c.f), ...ch("alex_boy", [bedAt[0] - 0.1, 0.62, bedAt[2] + 0.05], c, { expr: "smile_closed", blinkOff: true }, { shadow: false }).map((d) => ({ ...d, roll: -Math.PI / 2, pos: [bedAt[0] + 0.15, 0.9, bedAt[2] + 0.06] as V3, anchor: 0.5, z: 1 })),
      ...propCard("pillow", [bedAt[0] - 0.95, 0.68, bedAt[2] + 0.08], c.f, { z: 2 }), ...(st(c, w("Iliad", sIliad)) > 0 ? propCard("scroll", [bedAt[0] - 0.75, 0.64, bedAt[2] + 0.12], c.f, { scale: 0.6, z: 3 }) : []),
      ...propCard("lamp", [bedAt[0] + 1.6, 0, bedAt[2] - 0.3], c.f), fxCard("flame", [bedAt[0] + 1.75, 0.17, bedAt[2] - 0.26], 0.22, (c.f / 10) % 1, 2), fxCard("glow", [bedAt[0] + 1.75, 0.17, bedAt[2] - 0.26], 1.4, 0, 2)],
    points: (c) => [{ pos: [bedAt[0] + 1.6, 1.2, bedAt[2]], color: "#ffb060", i: 5 * (0.92 + 0.08 * Math.sin(c.f * 0.5)), d: 12 }],
    over: (c, g, Wd, H) => drawLabel(g, "THE ILIAD", st(c, w("Iliad", sIliad)), 60, Wd, H, 0.5, 0.18, { sub: "by Homer" }),
    cues: (c) => [{ f: c.w(w("Iliad", sIliad)), kind: "pop" }] });
  const sDag = w("right", sIliad);
  add({ id: "dagger", from: sDag, scene: 2, set: "pella", light: "lamp", amb: "night",
    cams: () => [K(0, [bedAt[0] - 0.4, 1.35, bedAt[2] + 2.6], [bedAt[0] - 0.9, 0.7, bedAt[2] + 0.1], 32, { roll: 4, creep: 0.006 })], kicks: (c) => [kick(c.w(w("dagger.", sDag)), 0.04)], dof: { cInf: 14, focus: 1.3 },
    actors: (c) => [...propCard("bed", bedAt, c.f), ...propCard("pillow", [bedAt[0] - 0.95, 0.68, bedAt[2] + 0.08], c.f, { z: 2 }), ...propCard("scroll", [bedAt[0] - 0.75, 0.64, bedAt[2] + 0.12], c.f, { scale: 0.6, z: 3 }),
      ...propCard("dagger", [bedAt[0] - 1.25, 0.7, bedAt[2] + 0.3], c.f, { scale: 1.1, z: 4 }),
      ...(st(c, w("dagger.", sDag)) > 0 ? [fxCard("bang", [bedAt[0] - 1.2, 1.05, bedAt[2] + 0.2], 0.35, st(c, w("dagger.", sDag)) / 24, 1)] : [])],
    points: (c) => [{ pos: [bedAt[0] + 1.6, 1.2, bedAt[2]], color: "#ffb060", i: 5 * (0.92 + 0.08 * Math.sin(c.f * 0.5)), d: 12 }],
    cues: (c) => [{ f: c.w(w("dagger.", sDag)), kind: "sting" }] });
  const sWar = w("His", 178);
  add({ id: "war_lesson", from: sWar, scene: 2, set: "field", v: 5, light: "day", amb: "wind", xin: 6,
    cams: () => [K(0, [2, 1.9, 6.5], [0, 0.8, 0], 40), K(6, [1.5, 1.7, 5.4], [0, 0.9, 0], 36, { dur: 60 })], dof: { cInf: 10, focus: 5 },
    actors: (c) => [...ch("general", [-1.6, 0, 0], c, { expr: "stern", facing: 1, wave: 0.4 }), ...ch("alex", [1.6, 0, 0.3], c, { expr: st(c, w("war.", sWar)) > 0 ? "determined" : "neutral", facing: -1 }),
      ...[0, 1, 2, 3, 4, 5].flatMap((k) => propCard(k < 3 ? "token_m" : "token_p", [-0.6 + (k % 3) * 0.35 + (k < 3 ? 0 : 0.2), 0, 1.2 + (k < 3 ? 0 : 0.6) - 0.15 * Math.max(0, Math.min(1, st(c, w("war.", sWar)) / 20)) * (k < 3 ? -1 : 0)], c.f, { scale: 1.6 }))],
    cues: (c) => [{ f: c.w(w("war.", sWar)), kind: "boom", gain: 0.5 }] });
  const sChaer = w("At", sWar);
  add({ id: "chaeronea", from: sChaer, scene: 2, set: "field", v: 0, light: "golden", amb: "battle",
    cams: (c) => [K(0, [-10, 1.8, 9], [-10, 1.4, 0], 42), K(10, [8, 1.9, 10], [6, 1.4, 0], 44, { dur: 100 })],
    kicks: (c) => [kick(c.w(w("charge", sChaer)), 0.12), kick(c.w(w("charge", sChaer)) + 16, 0.06)],
    actors: (c) => {
      const t0 = 0, x = -12 + 0.22 * Math.max(0, c.t - t0);
      const out = [...propCard("horse", [x, 0, 0], c.f, { phase: (c.t / 8) % 1, rider: "alex_helm" }), ...army("phalangite", [-14 + 0.05 * c.t, 0, -12], 2, 10, [1.8, 1.6], c.f, { march: true, side: true })];
      for (let k = 0; k < 4; k++) out.push(...propCard("horse", [x - 3 - k * 2.5, 0, -2 - (k % 2) * 2], c.f, { phase: ((c.t + k * 3) / 8) % 1, rider: "general" }));
      if (c.t > t0) out.push(fxCard("speed", [x - 2.5, 1.2, 0.2], 2.4, (c.t / 10) % 1, 1), fxCard("dust", [x - 2, 0.4, 0.6], 2, (c.t / 12) % 1, 2), fxCard("dust", [x - 7, 0.4, -1.4], 2.5, ((c.t + 6) / 12) % 1, 3));
      return out;
    },
    over: (c, g, Wd, H) => drawLabel(g, "CHAERONEA", st(c, w("Chaeronea,", sChaer)), 60, Wd, H, 0.5, 0.18, { sub: "338 BC" }),
    cues: (c) => [{ f: c.w(w("cavalry", sChaer)) - 10, kind: "hooves", dur: 70 }, { f: c.w(w("charge", sChaer)), kind: "crowd" }, { f: c.w(w("Chaeronea,", sChaer)), kind: "pop" }] });
  const sGreece = w("and", w("Chaeronea,", sChaer));
  add({ id: "greece", from: sGreece, scene: 2, set: "field", v: 0, light: "golden", amb: "wind",
    cams: () => [K(0, [3, 1.2, 8], [0, 2.2, 0], 40, { roll: -3 })], kicks: (c) => [kick(c.w(w("Greece.", sGreece)), 0.1)], dof: { cInf: 10, focus: 7.5 },
    actors: (c) => [...ch("philip", [-1.2, 0, 0], c, { expr: "grin", facing: 1 }), ...ch("alex_helm", [1.2, 0, 0.2], c, { expr: "proud", facing: -1 }),
      ...propCard("flag_mac", [0, Math.max(0, 1.5 - 0.15 * Math.max(0, st(c, w("Greece.", sGreece)) + 8)), -0.4], c.f, { phase: (c.f / 30) % 1 })],
    cues: (c) => [{ f: c.w(w("Greece.", sGreece)), kind: "boom" }, { f: c.w(w("Greece.", sGreece)), kind: "crowd", gain: 0.6 }] });

  // ===================== S3 — BECOMING KING =====================
  const sThen = w("Then,", 205);
  add({ id: "changed", from: sThen, scene: 3, set: "aegae", light: "night", amb: "night", xin: 14,
    cams: () => [K(0, [0, 14, -26], [0, 1, 4], 46), K(2, [0, 10, -20], [0, 1, 4], 44, { dur: 80 })],
    actors: (c) => torchCards(AEGAE_T, c), points: (c) => TORCH_PTS(AEGAE_T, c),
    over: (c, g, Wd, H) => drawStamp(g, "336 BC", st(c, w("336 BC,", sThen)), 60, Wd, H),
    cues: (c) => [{ f: c.w(w("336 BC,", sThen)), kind: "stamp" }, { f: c.w(w("changed.", sThen)), kind: "drum_hit" }] });
  const sWed = w("At", sThen);
  add({ id: "wedding", from: sWed, scene: 3, set: "aegae", light: "night", amb: "crowd_murmur",
    cams: (c) => [K(0, [5, 2.2, 3], [-6, 2.6, -8], 44), K(c.w(w("walked", sWed)) - 10, [-3, 2.4, -4], [0, 1.4, 7], 40, { dur: 30 })],
    actors: (c) => {
      const out = torchCards(AEGAE_T, c);
      for (let i = 0; i < 26; i++) { const a = Math.PI * (0.08 + 0.84 * (i / 25)), r = 9.2 + (i % 3) * 2.2, y = 0.5 + (i % 3) * 1.1; out.push(...ch("courtier", [Math.cos(a) * r, y, -Math.sin(a) * r + 0.5], c, { v: i % 5, mode: "sit", expr: i % 4 ? "smile" : "grin", seed: 30 + (i % 6) }, { shadow: false })); }
      const tw = c.w(w("walked", sWed)), x = st(c, w("walked", sWed)) > 0 ? lerp(10, 2.5, smooth((c.t - tw) / 70)) : 10;
      out.push(...ch("philip", [0, 0, x], c, { expr: "proud", view: c.t > tw && c.t < tw + 70 ? "front" : "front", mode: c.t > tw && c.t < tw + 70 ? "stroll" : "stand", phase: walkPhase(c.f) }));
      for (const sx of [-1, 1]) out.push(...ch("guard", [sx * 1.4, 0, x + 1.2], c, { expr: "neutral", mode: c.t > tw && c.t < tw + 70 ? "stroll" : "stand", phase: walkPhase(c.f, 1.4, 0.5) }));
      return out;
    }, points: (c) => TORCH_PTS(AEGAE_T, c),
    over: (c, g, Wd, H) => drawLabel(g, "AEGAE", st(c, w("Aegae,", sWed)), 60, Wd, H, 0.5, 0.18, { sub: "the old capital" }),
    cues: (c) => [{ f: c.w(w("wedding", sWed)), kind: "lyre_flourish" }, { f: c.w(w("Aegae,", sWed)), kind: "pop" }] });
  const sAss = w("and", w("theatre...", sWed));
  add({ id: "assassination", from: sAss, scene: 3, set: "aegae", light: "night", amb: "night",
    cams: (c) => [K(0, [1.5, 1.3, -1], [0, 1.6, 9], 38, { roll: 4, creep: 0.004 }), K(c.w(w("assassinated", sAss)) + 8, [0.4, 0.5, 1.2], [0, 0.1, 2.8], 34, { cut: true, creep: 0.003 })],
    fade: (c) => { const t = st(c, w("assassinated", sAss)); return t < 0 ? 0 : t < 8 ? 1 : t < 20 ? 1 - (t - 8) / 12 : 0; },
    actors: (c) => {
      const ta = c.w(w("assassinated", sAss)), out = torchCards(AEGAE_T, c);
      if (c.t < ta) {
        // a bodyguard's long shadow sliding over the stage wall: a dark card, never the act itself
        out.push(...ch("guard", [-2.4 + 0.02 * c.t, 0, 10.2], c, { expr: "angry" }, { scale: 1.6, alpha: 0.85, lit: 0, shadow: false }).map((d) => ({ ...d, key: d.key + "|sil", draw: (g: CanvasRenderingContext2D) => { d.draw(g); g.globalCompositeOperation = "source-in"; g.fillStyle = "#120c1c"; g.fillRect(0, 0, 600, 1000); } })));
        out.push(...ch("philip", [0, 0, 4], c, { expr: "proud" }));
      } else {
        const t = c.t - ta - 8, y = t < 0 ? 1.6 : Math.max(0, 1.6 - 0.012 * t * t) + (t > 11.5 ? Math.abs(Math.sin((t - 11.5) * 0.5)) * 0.25 * Math.exp(-(t - 11.5) * 0.12) : 0);
        out.push(...propCard("crown_fall", [0, y, 2.8], c.f, { roll: t > 11.5 ? 0.3 : -0.4 + 0.06 * t }));
      }
      return out;
    }, points: (c) => TORCH_PTS(AEGAE_T, c, 2.6),
    cues: (c) => [{ f: c.w(w("assassinated", sAss)), kind: "drum_hit", gain: 1.2 }, { f: c.w(w("assassinated", sAss)) + 20, kind: "clink" }] });
  const s20 = w("Alexander", sAss);
  add({ id: "twenty", from: s20, scene: 3, set: "aegae", light: "night", amb: "night",
    cams: () => [K(0, [0.3, 1.7, 3.6], [0, 1.75, 0], 32, { creep: 0.003 })], dof: { cInf: 14, focus: 3.6 },
    actors: (c) => [...ch("alex", [0, 0, 0], c, { expr: "sad" }), ...torchCards([AEGAE_T[0], AEGAE_T[1]], c)], points: (c) => TORCH_PTS(AEGAE_T, c, 3.4),
    over: (c, g, Wd, H) => drawLabel(g, "AGE 20", st(c, w("twenty", s20)), 40, Wd, H, 0.5, 0.18),
    cues: (c) => [{ f: c.w(w("twenty", s20)), kind: "pop", gain: 0.6 }] });
  const sKing = w("Overnight,", s20);
  add({ id: "king", from: sKing, scene: 3, set: "pella", light: "dawn", amb: "court", xin: 8,
    cams: (c) => [K(0, [0, 1.6, -1.8], [0, 2.7, -9.6], 40), K(c.w(w("king.", sKing)) - 4, [0, 1.8, -4.2], [0, 3.0, -9.6], 34, { dur: 12 })], kicks: (c) => [kick(c.w(w("king.", sKing)), 0.08)], dof: { cInf: 10, focus: 6 },
    actors: (c) => [...ch("alex_king", [0, 1.55, -9.6], c, { expr: "proud" }), ...propCard("throne", [0, 1.55, -10.8], c.f), ...(st(c, w("king.", sKing)) > 0 ? [fxCard("sparkle", [0, 3.1, -9.5], 2, (st(c, w("king.", sKing)) / 30) % 1, 1), fxCard("burst", [0, 2.7, -9.8], 3, clamp01(st(c, w("king.", sKing)) / 14), 2)] : []),
      ...army("phalangite", [-7.5, 0, -8], 2, 2, [1.8, 1.6], c.f, {}), ...army("phalangite", [5.7, 0, -8], 2, 2, [1.8, 1.6], c.f, {})],
    cues: (c) => [{ f: c.w(w("king.", sKing)), kind: "title_hit" }, { f: c.w(w("king.", sKing)), kind: "crowd", gain: 0.6 }] });
  const sPush = w("Some", sKing);
  add({ id: "push_around", from: sPush, scene: 3, set: "field", v: 0, light: "day", amb: "wind", xin: 6,
    cams: () => [K(0, [0, 1.6, 7], [0, 1.6, 0], 40), K(4, [0, 1.5, 6], [0, 1.6, 0], 36, { dur: 70 })],
    actors: (c) => [0, 1, 2, 3].flatMap((k) => ch("courtier", [-2.4 + k * 1.6, 0, (k % 2) * 0.5], c, { v: k + 1, expr: (c.t + k * 5) % 24 < 12 ? "laugh" : "grin", facing: k < 2 ? 1 : -1, wave: k === 1 ? 0.6 : undefined, seed: 40 + k })),
    cues: (c) => [{ f: c.w(w("boy-king", sPush)), kind: "laugh_crowd" }] });
  const sWrong = w("They", sPush);
  add({ id: "wrong", from: sWrong, scene: 3, set: "field", v: 0, light: "golden", amb: "wind",
    cams: () => [K(0, [0.6, 1.8, 3.8], [0, 1.9, 0], 30, { roll: 4.5, creep: 0.008 })], kicks: (c) => [kick(c.w(w("wrong.", sWrong)), 0.1)], dof: { cInf: 14, focus: 3.8 },
    actors: (c) => ch("alex_helm", [0, 0, 0], c, { expr: "angry" }),
    cues: (c) => [{ f: c.w(w("wrong.", sWrong)), kind: "boom" }] });
  const sFace = w("He", sWrong);
  add({ id: "turn_east", from: sFace, scene: 3, set: "field", v: 0, light: "golden", amb: "march",
    cams: (c) => [K(0, [0, 2.4, 16], [0, 1.4, 0], 44), K(c.w(w("turned", sFace)) - 2, [3, 1.5, 5], [0, 1.7, 0], 38, { dur: 18 }), K(c.w(w("empire", sFace)) - 6, [3, 4, 6], [40, 14, -40], 50, { dur: 30 })],
    actors: (c) => [...army("phalangite", [-14 + 0.06 * c.t, 0, -4], 3, 8, [1.6, 1.6], c.f, { march: true, side: true }), ...ch("alex_helm", [0, 0, 0], c, { expr: "determined", view: c.t > c.w(w("turned", sFace)) ? "side" : "front", mode: "stand" })],
    cues: (c) => [{ f: 0, kind: "march", dur: c.d }, { f: c.w(w("empire", sFace)) - 6, kind: "whoosh" }] });

  // ===================== S4 — CONQUERING PERSIA =====================
  const sPers = w("Persian", 270) - 1;
  add({ id: "persia_map", from: sPers, scene: 4, xin: 10, amb: "map",
    map: (c) => ({ f: c.f, view: [46, 32.5, 1], mac: 1, persia: easeOut(u01(c, 0, 30)), labels: [{ text: "MACEDONIA", at: [22.5, 42.8], t: c.t }, { text: "PERSIAN EMPIRE", at: [52, 34], t: c.t - 12, size: 56 }, { text: "EGYPT", at: [30.5, 26.5], t: st(c, w("Egypt", sPers)) }, { text: "INDIA", at: [74, 28], t: st(c, w("India,", sPers)) }] }),
    cues: (c) => [{ f: 0, kind: "swell" }, { f: c.w(w("Egypt", sPers)), kind: "pop" }, { f: c.w(w("India,", sPers)), kind: "pop" }] });
  const sDar = w("and", w("India,", sPers));
  add({ id: "darius", from: sDar, scene: 4, set: "field", v: 2, light: "day", amb: "battle_far", xin: 6,
    cams: (c) => [K(0, [0, 2.1, 4.6], [0, 2.3, 0], 32), K(c.w(w("armies", sDar)) - 4, [0, 9, 24], [0, 1, -20], 48, { dur: 34 })], dof: { cInf: 12, focus: 4.6 },
    actors: (c) => [...ch("darius", [0, 0, 0], c, { expr: st(c, w("bigger", sDar)) > 0 ? "sly" : "stern" }), ...army("persian", [-22, 0, -30], 6, 22, [2, 2.2], c.f, { march: false })],
    over: (c, g, Wd, H) => drawLabel(g, "DARIUS III", st(c, w("Darius", sDar)), 50, Wd, H, 0.5, 0.18, { sub: "King of Persia" }),
    cues: (c) => [{ f: c.w(w("Darius", sDar)), kind: "pop" }, { f: c.w(w("armies", sDar)) - 4, kind: "whoosh" }, { f: c.w(w("armies", sDar)), kind: "crowd" }] });
  const sCross = w("In", sDar);
  add({ id: "crossing", from: sCross, scene: 4, set: "field", v: 3, light: "golden", amb: "sea", xin: 8,
    cams: () => [K(0, [14, 4, 18], [0, 1, -6], 46), K(4, [10, 3, 14], [0, 1, -8], 44, { dur: 90 })],
    actors: (c) => [...[0, 1, 2].flatMap((k) => propCard("ship", [-18 + k * 14, -0.4, -24 - (k % 2) * 8], c.f, { phase: ((c.f / 40) + k * 0.3) % 1 })), ...army("phalangite", [-8, 0, -11 + 0.04 * c.t], 3, 7, [1.8, 1.6], c.f, { march: true })],
    over: (c, g, Wd, H) => { drawStamp(g, "334 BC", st(c, w("334 BC,", sCross)), 60, Wd, H); drawLabel(g, "HELLESPONT", st(c, w("Asia", sCross)), 60, Wd, H, 0.5, 0.18, { sub: "from Europe into Asia" }); drawLabel(g, "40,000 MEN", st(c, w("40,000", sCross)), 50, Wd, H, 0.72, 0.5, { size: 54 }); },
    cues: (c) => [{ f: c.w(w("334 BC,", sCross)), kind: "stamp" }, { f: c.w(w("40,000", sCross)), kind: "pop" }, { f: 0, kind: "march", dur: c.d }] });
  const sSpear = w("Legend", sCross);
  add({ id: "spear", from: sSpear, scene: 4, set: "field", v: 3, light: "golden", amb: "sea",
    cams: (c) => [K(0, [3, 1.6, 6], [0, 1.6, 0], 40), K(c.w(w("threw", sSpear)) + 2, [5, 1.4, 6], [5, 0.9, 0], 40, { dur: 14 })],
    kicks: (c) => [kick(c.w(w("beach", sSpear)), 0.14)],
    actors: (c) => {
      const tt = c.w(w("threw", sSpear)), ti = c.w(w("beach", sSpear)), out = [...ch("alex_helm", [0, 0, 0], c, { expr: c.t > ti ? "proud" : "determined", wave: c.t > tt - 6 && c.t < tt + 4 ? 1 : undefined, facing: 1 })];
      if (c.t >= tt && c.t < ti) { const u = (c.t - tt) / Math.max(1, ti - tt); out.push(...propCard("spear_beach", [lerp(0.6, 5, u), 1.9 + 2.2 * Math.sin(Math.PI * u) - 1.8 * u, 0], c.f, { roll: -1.2 + 1.0 * u, scale: 0.8 })); }
      if (c.t >= ti) { out.push(...propCard("spear_beach", [5, -0.4, 0], c.f, { roll: 0.25, scale: 0.8 })); if (c.t - ti < 18) out.push(fxCard("dust", [5, 0.3, 0.1], 1.6, (c.t - ti) / 18, 2), fxCard("burst", [5, 0.4, 0.1], 1.4, (c.t - ti) / 12, 3)); }
      return out;
    },
    over: (c, g, Wd, H) => drawTag(g, "LEGEND SAYS", c.t - 2, 90, Wd, H),
    cues: (c) => [{ f: c.w(w("threw", sSpear)), kind: "whoosh" }, { f: c.w(w("beach", sSpear)), kind: "thunk" }, { f: c.w(w("claiming", sSpear)), kind: "crowd", gain: 0.6 }] });
  const sIssus = w("In", sSpear);
  const issusArmies = (c: C, squeeze = 0): CardDraw[] => [
    ...army("phalangite", [-14, 0, 10], 3, 14, [2, 1.8], c.f, {}),
    ...army("persian", [-22 + squeeze * 4, 0, -14], 5, 22, [2 - squeeze * 0.35, 1.6 - squeeze * 0.3], c.f, { expr: squeeze > 0.5 ? "worried" : undefined, jitter: 0.25 + squeeze }),
    ...propCard("chariot", [0, 0, -7], c.f, { rider: "darius" }), ...propCard("horse", [0, 0, 7], c.f, { flip: true, rider: "alex_helm" }),
    ...propCard("flag_per", [-4, 0, -9], c.f, { phase: (c.f / 30) % 1 }), ...propCard("flag_mac", [3, 0, 8.4], c.f, { phase: (c.f / 30) % 1 })];
  add({ id: "issus", from: sIssus, scene: 4, set: "field", v: 1, light: "day", amb: "battle_far", xin: 8,
    cams: () => [K(0, [22, 9, 0], [0, 0.5, 0], 48), K(4, [18, 7, 0], [0, 1, 0], 46, { dur: 90 })],
    actors: (c) => issusArmies(c),
    over: (c, g, Wd, H) => { drawStamp(g, "333 BC", st(c, w("333 BC,", sIssus)), 60, Wd, H); drawLabel(g, "ISSUS", st(c, w("Issus,", sIssus)), 70, Wd, H, 0.5, 0.18); },
    cues: (c) => [{ f: c.w(w("333 BC,", sIssus)), kind: "stamp" }, { f: c.w(w("Issus,", sIssus)), kind: "pop" }, { f: c.w(w("met.", sIssus)), kind: "drum_hit" }] });
  const sSqz = w("Darius", sIssus);
  add({ id: "squeeze", from: sSqz, scene: 4, set: "field", v: 1, light: "day", amb: "battle_far",
    cams: (c) => [K(0, [0, 38, 40], [0, 0, -8], 50), K(c.w(w("mountains", sSqz)) - 4, [18, 30, 34], [30, 6, -12], 52, { dur: 26 }), K(c.w(w("sea,", sSqz)) - 4, [-18, 30, 34], [-40, 0, -12], 52, { dur: 26 }), K(c.w(w("numbers", sSqz)) - 4, [0, 6, 6], [0, 1.2, -14], 44, { dur: 26 })],
    actors: (c) => issusArmies(c, smooth(u01(c, c.w(w("squeezed", sSqz)), c.w(w("numbers", sSqz))))),
    cues: (c) => [{ f: c.w(w("mountains", sSqz)) - 4, kind: "whoosh", gain: 0.5 }, { f: c.w(w("sea,", sSqz)) - 4, kind: "whoosh", gain: 0.5 }, { f: c.w(w("help.", sSqz)), kind: "squish" }] });
  const sCharge = w("Alexander", sSqz);
  add({ id: "charge_issus", from: sCharge, scene: 4, set: "field", v: 1, light: "day", amb: "battle",
    cams: (c) => { const x = lerp(-10, 6, c.t / c.d); return [K(0, [x - 3.5, 1.5, 12], [x, 1.4, 5], 42, { creep: 0.001 })]; }, kicks: (c) => [kick(8, 0.08), kick(24, 0.08), kick(40, 0.08)],
    actors: (c) => { const x = lerp(-10, 6, c.t / c.d); return [...propCard("horse", [x, 0, 5], c.f, { phase: (c.t / 7) % 1, rider: "alex_helm" }), fxCard("dust", [x - 2, 0.4, 5.2], 2.4, (c.t / 10) % 1, 1), fxCard("speed", [x - 2.6, 1.3, 5.2], 2.4, (c.t / 8) % 1, 2), ...army("persian", [4, 0, -2], 2, 7, [2, 2], c.f, { expr: "shock" })]; },
    cues: (c) => [{ f: 0, kind: "hooves", dur: c.d }, { f: 4, kind: "crowd" }] });
  const sFled = w("and", sCharge);
  const fleeX = (c: C, t0: number) => -0.012 * Math.max(0, c.t - t0) ** 2;
  const flee = (c: C, t0: number) => { const t = Math.max(0, c.t - t0), x = fleeX(c, t0); return [...propCard("chariot", [x, 0, 6], c.f, { flip: t > 0, phase: (c.t / 6) % 1, rider: "darius" }), ...(t > 0 ? [fxCard("dust", [x + 2.6, 0.5, 6.2], 2.2, (t / 10) % 1, 1), fxCard("speed", [x + 3.4, 1.2, 6.2], 2.4, (t / 8) % 1, 2)] : [])]; };
  add({ id: "darius_flees", from: sFled, scene: 4, set: "field", v: 1, light: "day", amb: "battle",
    cams: (c) => { const x = fleeX(c, c.w(w("around", sFled))) * 0.85; return [K(0, [x + 2, 1.7, 15], [x, 1.4, 6], 40, { creep: 0.001 })]; }, kicks: (c) => [kick(c.w(w("around", sFled)), 0.06)],
    actors: (c) => flee(c, c.w(w("around", sFled))),
    cues: (c) => [{ f: c.w(w("around", sFled)), kind: "neigh" }, { f: c.w(w("fled.", sFled)), kind: "wheels", dur: 40 }, { f: c.w(w("fled.", sFled)), kind: "whoosh" }] });
  const sOffer = w("offered", sFled) - 1;
  add({ id: "offer", from: sOffer, scene: 4, set: "field", v: 5, light: "day", amb: "wind", xin: 6,
    cams: () => [K(0, [0.4, 1.7, 6], [0, 1.6, 0], 38)], dof: { cInf: 10, focus: 6 },
    actors: (c) => [...ch("persian", [-1.4, 0, 0], c, { v: 3, expr: "nervous", facing: 1, wave: 0.2 }), ...ch("alex", [1.4, 0, 0.2], c, { expr: st(c, w("peace.", sOffer)) > 0 ? "sly" : "neutral", facing: -1 }),
      ...propCard("scroll", [-0.4, 1.0, 0.3], c.f, { scale: 0.7 }), ...(st(c, w("huge", sOffer)) > 0 ? [fxCard("sparkle", [-0.4, 1.1, 0.4], 1, (st(c, w("huge", sOffer)) / 24) % 1, 2)] : [])],
    cues: (c) => [{ f: c.w(w("huge", sOffer)), kind: "sparkle" }] });
  const sParm = w("His", sOffer);
  add({ id: "parmenion", from: sParm, scene: 4, set: "field", v: 5, light: "day", amb: "wind",
    cams: () => [K(0, [-0.6, 1.75, 4.6], [-0.6, 1.8, 0], 32, { creep: 0.003 })], dof: { cInf: 12, focus: 4.6 },
    actors: (c) => [...ch("parmenion", [-1.1, 0, 0], c, { expr: st(c, w("take", sParm)) > 0 ? "grin" : "sly", facing: 1, wave: st(c, w("If", sParm)) > 0 ? 0.5 : undefined }), ...ch("alex", [1.2, 0, 0.3], c, { expr: "neutral", facing: -1 })],
    over: (c, g, Wd, H) => drawLabel(g, "PARMENION", st(c, w("Parmenion", sParm)), 50, Wd, H, 0.3, 0.18, { sub: "Alexander's general" }),
    cues: (c) => [{ f: c.w(w("Parmenion", sParm)), kind: "pop" }] });
  const sRep = w("replied,", sParm) - 1;
  add({ id: "reply", from: sRep, scene: 4, set: "field", v: 5, light: "day", amb: "wind",
    cams: (c) => [K(0, [0.8, 1.75, 4.4], [0.9, 1.85, 0], 32), K(c.w(w("Parmenion.\"", sRep)) - 4, [0.95, 1.85, 3.2], [1.0, 1.95, 0.3], 26, { dur: 8, creep: 0.006 })], kicks: (c) => [kick(c.w(w("Parmenion.\"", sRep)), 0.06)], dof: { cInf: 12, focus: 4 },
    actors: (c) => [...ch("parmenion", [-1.1, 0, 0], c, { expr: st(c, w("Parmenion.\"", sRep)) > 4 ? "worried" : "sly", facing: 1 }), ...ch("alex", [1.2, 0, 0.3], c, { expr: "sly", facing: -1 })],
    cues: (c) => [{ f: c.w(w("Parmenion.\"", sRep)), kind: "sting" }] });
  const sGau = w("In", sRep);
  add({ id: "gaugamela", from: sGau, scene: 4, set: "field", v: 2, light: "golden", amb: "battle_far", xin: 8,
    cams: () => [K(0, [0, 12, 34], [0, 1, -14], 50), K(2, [0, 9, 28], [0, 1, -14], 48, { dur: 90 })],
    actors: (c) => [...army("persian", [-40, 0, -34], 5, 34, [2.4, 2.2], c.f, {}), ...army("phalangite", [-14, 0, 10], 3, 14, [2, 1.8], c.f, {}),
      ...[-24, -12, 0, 12, 24].flatMap((x) => propCard("chariot", [x, 0, -22], c.f, { flip: true, phase: 0 }))],
    over: (c, g, Wd, H) => { drawStamp(g, "331 BC", st(c, w("331 BC,", sGau)), 60, Wd, H); drawLabel(g, "GAUGAMELA", st(c, w("Gaugamela,", sGau)), 80, Wd, H, 0.5, 0.18); },
    cues: (c) => [{ f: c.w(w("331 BC,", sGau)), kind: "stamp" }, { f: c.w(w("Gaugamela,", sGau)), kind: "pop" }, { f: c.w(w("scythed", sGau)), kind: "blades" }] });
  const sGap = w("Alexander's", sGau);
  add({ id: "gaps", from: sGap, scene: 4, set: "field", v: 2, light: "golden", amb: "battle",
    cams: () => [K(0, [7, 4.2, 13], [0, 1, -1], 44, { creep: 0.002 })],
    kicks: (c) => [kick(c.w(w("through.", sGap)), 0.12)],
    actors: (c) => {
      const op = smooth(u01(c, c.w(w("gaps", sGap)) - 4, c.w(w("gaps", sGap)) + 16)) * 2.2, tr = c.w(w("roll", sGap)) - 8;
      const out = [...army("phalangite", [-1.6, 0, 1.6 + op], 3, 3, [1.6, 1.6], c.f, { expr: op > 1 ? "sly" : undefined }), ...army("phalangite", [-1.6, 0, -1.6 - op - 6.4], 5, 3, [1.6, 1.6], c.f, { expr: op > 1 ? "sly" : undefined })];
      const x = c.t < tr ? -30 : -30 + 0.75 * (c.t - tr);
      out.push(...propCard("chariot", [x, 0, -0.8], c.f, { phase: (c.t / 5) % 1, rider: "persian" }));
      if (c.t > tr) out.push(fxCard("dust", [x - 2.4, 0.5, -0.6], 2.4, ((c.t - tr) / 10) % 1, 3), fxCard("speed", [x - 3, 1.2, -0.6], 2.4, ((c.t - tr) / 8) % 1, 4));
      return out;
    },
    cues: (c) => [{ f: c.w(w("gaps", sGap)), kind: "shuffle" }, { f: c.w(w("roll", sGap)) - 8, kind: "wheels", dur: 50 }, { f: c.w(w("through.", sGap)), kind: "whoosh" }] });
  const sWeak = w("Then", sGap);
  add({ id: "weak_spot", from: sWeak, scene: 4, set: "field", v: 2, light: "golden", amb: "battle",
    cams: (c) => [K(0, [12, 2, 10], [0, 1.4, -6], 42), K(c.w(w("charged...", sWeak)) - 4, [-6, 1.5, 8], [-14, 1.4, -4], 44, { dur: 20 })], kicks: (c) => [kick(c.w(w("charged...", sWeak)), 0.12)],
    actors: (c) => { const tc = c.w(w("charged...", sWeak)), x = c.t < tc ? 6 : 6 - 0.4 * (c.t - tc);
      return [...army("persian", [-12, 0, -10], 3, 12, [2, 1.8], c.f, { expr: "worried" }), ...propCard("horse", [x, 0, -2], c.f, { flip: true, phase: (c.t / 7) % 1, rider: "alex_helm" }),
        ...(st(c, w("spot,", sWeak)) > 0 ? [fxCard("sparkle", [0, 2.2, -8], 2, (st(c, w("spot,", sWeak)) / 20) % 1, 4)] : []), ...(c.t > tc ? [fxCard("speed", [x + 2.4, 1.3, -1.9], 2.4, (c.t / 8) % 1, 2), fxCard("dust", [x + 2, 0.4, -1.6], 2.4, (c.t / 10) % 1, 1)] : [])]; },
    cues: (c) => [{ f: c.w(w("spot,", sWeak)), kind: "sparkle" }, { f: c.w(w("charged...", sWeak)), kind: "hooves", dur: 40 }, { f: c.w(w("charged...", sWeak)), kind: "crowd" }] });
  const sFled2 = w("and", sWeak);
  add({ id: "darius_flees2", from: sFled2, scene: 4, set: "field", v: 2, light: "golden", amb: "battle",
    cams: (c) => { const x = fleeX(c, 2) * 0.85; return [K(0, [x + 2, 1.7, 15], [x, 1.4, 6], 40, { creep: 0.001 })]; },
    actors: (c) => flee(c, 2), cues: () => [{ f: 2, kind: "wheels", dur: 40 }, { f: 2, kind: "whoosh" }] });
  const sAgain = w("Again.", sFled2);
  add({ id: "again", from: sAgain, scene: 4, set: "field", v: 2, light: "golden", amb: "wind",
    cams: () => [K(0, [0.2, 1.8, 3.4], [0, 1.85, 0], 30)], dof: { cInf: 14, focus: 3.4 },
    actors: (c) => ch("alex_helm", [0, 0, 0], c, { expr: "neutral", blinkOff: true }), cues: () => [{ f: 0, kind: "sting", gain: 0.6 }] });

  // ===================== S5 — HIS EMPIRE =====================
  const sBab = w("Babylon,", 440);
  add({ id: "babylon", from: sBab, scene: 5, set: "babylon", light: "day", amb: "march", xin: 10,
    cams: () => [K(0, [14, 3, 30], [0, 6, 0], 46), K(4, [10, 2.4, 24], [0, 6, 2], 44, { dur: 90 })],
    actors: (c) => [...army("phalangite", [-1.8, 0, 26 - 0.07 * c.t], 6, 3, [1.8, 2.2], c.f, { march: true }), ...propCard("flag_mac", [2.6, 0, 18 - 0.07 * c.t], c.f, { phase: (c.f / 30) % 1 })],
    over: (c, g, Wd, H) => { drawLabel(g, "BABYLON", st(c, sBab), 70, Wd, H, 0.3, 0.18); drawLabel(g, "SUSA", st(c, w("Susa", sBab)), 60, Wd, H, 0.52, 0.18, { size: 40 }); drawLabel(g, "PERSEPOLIS", st(c, w("Persepolis", sBab)), 50, Wd, H, 0.74, 0.18, { size: 40 }); },
    cues: (c) => [{ f: 0, kind: "march", dur: c.d }, { f: c.w(sBab), kind: "pop" }, { f: c.w(w("Susa", sBab)), kind: "pop" }, { f: c.w(w("Persepolis", sBab)), kind: "pop" }] });
  const sAsia = w("and", w("Persepolis", sBab));
  add({ id: "king_asia", from: sAsia, scene: 5, set: "babylon", light: "golden", amb: "court",
    cams: () => [K(0, [9.5, 1.75, 13.6], [9, 1.95, 9], 32)], kicks: (c) => [kick(c.w(w("Asia.", sAsia)), 0.08)], dof: { cInf: 10, focus: 6 },
    actors: (c) => [...ch("alex_king", [9, 0, 9], c, { expr: "proud" }), ...(st(c, w("Asia.", sAsia)) > 0 ? [fxCard("burst", [9, 2.2, 8.8], 3, clamp01(st(c, w("Asia.", sAsia)) / 14), 2), fxCard("sparkle", [9, 2.4, 9.1], 2, (st(c, w("Asia.", sAsia)) / 30) % 1, 3)] : [])],
    over: (c, g, Wd, H) => drawLabel(g, "KING OF ASIA", st(c, w("Asia.", sAsia)), 40, Wd, H, 0.5, 0.18, { size: 60 }),
    cues: (c) => [{ f: c.w(w("Asia.", sAsia)), kind: "title_hit" }] });
  const sStop = w("But", sAsia);
  add({ id: "no_stop", from: sStop, scene: 5, set: "babylon", light: "golden", amb: "wind",
    cams: () => [K(0, [13, 1.6, 15], [10, 1.6, 9], 40)],
    actors: (c) => ch("alex_helm", [7 + 0.12 * c.t, 0, 9], c, { view: "side", mode: "march", phase: walkPhase(c.f, 1.6), expr: "determined" }),
    cues: () => [{ f: 2, kind: "whoosh" }] });
  const sWest = w("His", sStop);
  const routeKeys = (c: C, keys: [number, number][]) => { // [shot frame, route index] piecewise
    let r = keys[0][1];
    for (let i = 1; i < keys.length; i++) if (c.t >= keys[i - 1][0]) r = lerp(keys[i - 1][1], keys[i][1], smooth((c.t - keys[i - 1][0]) / Math.max(1, keys[i][0] - keys[i - 1][0])));
    return r;
  };
  const battlesUpTo = (r: number, t: number, at: Record<number, number>): [number, number][] => [R.granicus, R.issus, R.gaugamela, R.hydaspes].filter((i) => r >= i).map((i) => [i, at[i] !== undefined ? t - at[i] : 99]);
  add({ id: "map_west", from: sWest, scene: 5, xin: 8, amb: "map",
    map: (c) => { const r = routeKeys(c, [[0, 0], [c.w(w("Egypt,", sWest)), R.alexandria], [c.d, R.persepolis]]);
      return { f: c.f, view: [40 + 6 * u01(c, 0, c.d), 33, 1.25], route: r, empire: 1, token: true, battles: battlesUpTo(r, 99, {}),
        labels: [{ text: "GREECE", at: [22, 38.8], t: c.t, dy: 0 }, { text: "EGYPT", at: [30, 27], t: st(c, w("Egypt,", sWest)), sub: "welcomed as pharaoh", dy: 0 }] }; },
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d }, { f: c.w(w("Egypt,", sWest)), kind: "pop" }, { f: c.w(w("pharaoh.", sWest)), kind: "title_hit", gain: 0.5 }] });
  const sEast = w("Now", sWest);
  add({ id: "map_east", from: sEast, scene: 5, amb: "map",
    map: (c) => {
      const tB = c.w(w("Bactria", sEast)), tS = c.w(w("Sogdiana,", sEast)), tI = c.w(w("Indus", sEast)), tH = c.w(w("Hydaspes", sEast));
      const r = routeKeys(c, [[0, R.persepolis], [tB, R.bactra], [tS, R.maracanda], [tI, 24], [tH, R.hydaspes], [c.d, R.hydaspes]]);
      return { f: c.f, view: [lerp(50, 62, u01(c, 0, c.d)), 34, 1.45], route: r, empire: 1, token: true, battles: battlesUpTo(r, c.t, { [R.hydaspes]: tH }),
        labels: [{ text: "PERSIA", at: [54, 31], t: c.t, dy: 0 }, { text: "BACTRIA", at: [66.9, 35.6], t: st(c, w("Bactria", sEast)), sub: "Afghanistan", dy: 0 }, { text: "SOGDIANA", at: [66.0, 41.0], t: st(c, w("Sogdiana,", sEast)), sub: "Uzbekistan", dy: 0 },
          { text: "INDIA", at: [75, 27.5], t: st(c, w("India,", sEast)), dy: 0 }, { text: "HYDASPES", at: [73, 33.6], t: tH - c.t <= 0 ? c.t - tH : -1, sub: "326 BC", size: 34, dy: -50 }] };
    },
    over: (c, g, Wd, H) => drawStamp(g, "326 BC", st(c, w("326 BC,", sEast)), 50, Wd, H),
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d }, ...["Bactria", "Sogdiana,", "India,"].map((x) => ({ f: c.w(w(x, sEast)), kind: "pop" })), { f: c.w(w("326 BC,", sEast)), kind: "stamp" }] });
  const sPorus = w("where", w("India,", sEast));
  add({ id: "porus", from: sPorus, scene: 5, set: "field", v: 4, light: "day", amb: "battle", xin: 8,
    cams: (c) => [K(0, [2, 2.4, 12], [0, 2.2, -2], 44), K(c.w(w("elephants", sPorus)) - 6, [-0.5, 1.6, 7], [-3, 2.8, -3], 40, { dur: 24 })], kicks: (c) => [kick(c.w(w("elephants", sPorus)), 0.1), kick(c.w(w("beat", sPorus)), 0.08)],
    actors: (c) => [...propCard("elephant", [-3, 0, -3], c.f, { phase: (c.f / 40) % 1 }), ...ch("porus", [-3.2, 2.6, -3.05], c, { expr: "angry" }, { shadow: false, z: 1 }),
      ...propCard("horse", [3.2, 0, -1], c.f, { flip: true, rider: "alex_helm", phase: (c.t / 9) % 1 }), ...army("phalangite", [4, 0, -6], 2, 4, [1.8, 1.6], c.f, {}),
      fxCard("dust", [0, 0.5, -3], 3, (c.t / 16) % 1, 2), ...(st(c, w("beat", sPorus)) > 0 && st(c, w("beat", sPorus)) < 14 ? [fxCard("clash", [0, 2, -3], 2.4, st(c, w("beat", sPorus)) / 14, 4)] : [])],
    over: (c, g, Wd, H) => { drawLabel(g, "KING PORUS", st(c, w("Porus", sPorus)), 60, Wd, H, 0.3, 0.18); drawLabel(g, "HYDASPES RIVER", st(c, w("Hydaspes", sPorus)), 60, Wd, H, 0.68, 0.18, { sub: "326 BC", size: 40 }); },
    cues: (c) => [{ f: c.w(w("beat", sPorus)), kind: "clash" }, { f: c.w(w("elephants", sPorus)), kind: "trumpet" }, { f: c.w(w("Porus", sPorus)), kind: "pop" }, { f: c.w(w("Hydaspes", sPorus)), kind: "pop" }] });
  const sTired = w("There,", sPorus);
  add({ id: "refuse", from: sTired, scene: 5, set: "field", v: 5, light: "dusk", amb: "wind", xin: 8,
    cams: () => [K(0, [0, 1.6, 9], [0, 1.0, 0], 42), K(4, [0, 1.5, 7.6], [0, 1.1, 0], 38, { dur: 100 })], dof: { cInf: 10, focus: 7.5 },
    actors: (c) => [...[0, 1, 2, 3, 4, 5].flatMap((k) => ch("phalangite", [-4 + k * 1.6, 0, (k % 2) * 0.8], c, { v: k, mode: "sit", expr: k % 2 ? "sick" : "sad", seed: 50 + k, headTilt: st(c, w("refused", sTired)) > 0 && k === 2 ? 6 * Math.sin(c.t / 4) : 0 })),
      ...ch("alex", [5, 0, 1.6], c, { expr: st(c, w("refused", sTired)) > 0 ? "sad" : "determined", facing: -1 })],
    over: (c, g, Wd, H) => drawLabel(g, "8 YEARS OF MARCHING", st(c, w("eight", sTired)), 70, Wd, H, 0.5, 0.18, { size: 44 }),
    cues: (c) => [{ f: c.w(w("exhausted", sTired)), kind: "groan" }, { f: c.w(w("refused", sTired)), kind: "sting", gain: 0.5 }] });
  const sBack = w("So,", sTired);
  add({ id: "turn_back", from: sBack, scene: 5, xin: 8, amb: "map",
    map: (c) => { const r = routeKeys(c, [[0, R.hyphasis], [c.d, R.end]]); return { f: c.f, view: [58, 31, 1.25], route: r, empire: 1, token: true, battles: battlesUpTo(r, 99, {}), labels: [{ text: "BABYLON", at: CITY.Babylon, t: c.d - c.t < 30 ? 30 - (c.d - c.t) : -1, dy: -46 }] }; },
    cues: (c) => [{ f: 0, kind: "scribble", dur: c.d }] });

  // ===================== S6 — ALEXANDRIA =====================
  const sFound = w("Along", 530);
  add({ id: "founded", from: sFound, scene: 6, amb: "map",
    map: (c) => ({ f: c.f, view: [52, 32, 1.05], route: R.end, empire: 1, founded: Math.max(0, c.t - c.w(w("founded", sFound))) * 0.6, battles: battlesUpTo(R.end, 99, {}),
      labels: [{ text: "ALEXANDRIA", at: CITY.Alexandria, t: st(c, w("himself.", sFound)), size: 28, dy: -34 }, { text: "ALEXANDRIA", at: CITY.Herat, t: st(c, w("himself.", sFound)) - 4, size: 28, dy: -34 }, { text: "ALEXANDRIA", at: CITY.Kandahar, t: st(c, w("himself.", sFound)) - 8, size: 28, dy: 40 }, { text: "ALEXANDRIA", at: [69.6, 40.3], t: st(c, w("himself.", sFound)) - 12, size: 28, dy: -34 }] }),
    cues: (c) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ f: c.w(w("founded", sFound)) + Math.round(i * 4 / 0.6), kind: "pop", gain: 0.5 })) });
  const sEgypt = w("most", sFound) - 1;
  add({ id: "egypt_zoom", from: sEgypt, scene: 6, amb: "map",
    map: (c) => { const u = smooth(u01(c, 0, c.d)); return { f: c.f, view: [lerp(52, 30.5, u), lerp(32, 30.6, u), lerp(1.05, 5.5, u * u)], route: R.end, empire: 1, labels: [{ text: "EGYPT", at: [30.4, 28.4], t: c.t - 6, dy: 0 }] }; },
    cues: () => [{ f: 0, kind: "whoosh" }] });
  const sMark = w("Earlier,", sEgypt);
  add({ id: "mark_city", from: sMark, scene: 6, set: "alexandria", light: "day", amb: "sea", xin: 10, state: () => ({ build: 0, light: 0, lib: 0 }),
    cams: () => [K(0, [6, 2.4, 22], [0, 1.4, 8], 44), K(4, [4, 2, 18], [0, 1.5, 8], 40, { dur: 90 })],
    actors: (c) => [...ch("alex_king", [0, 0, 10], c, { expr: "determined", wave: st(c, w("marked", sMark)) > 0 ? 1 : undefined, facing: -1 }), ...ch("builder", [-2.2, 0, 11], c, { v: 0, expr: "neutral", facing: 1 }), ...ch("builder", [2.4, 0, 11.4], c, { v: 1, expr: "neutral", facing: -1 })],
    over: (c, g, Wd, H) => { drawStamp(g, "331 BC", st(c, w("331 BC,", sMark)), 60, Wd, H); drawLabel(g, "ALEXANDRIA", st(c, w("city", sMark)), 70, Wd, H, 0.5, 0.18, { sub: "on the Mediterranean coast" }); },
    cues: (c) => [{ f: c.w(w("331 BC,", sMark)), kind: "stamp" }, { f: c.w(w("city", sMark)), kind: "pop" }] });
  const flourLines = (c: C, prog: number, eaten: number): CardDraw[] => {
    const out: CardDraw[] = [];
    for (let i = 0; i < 9; i++) {
      const u = clamp01(prog * 9 - i), along = i < 5;
      if (u <= 0) continue;
      const len = 22 * u * (1 - eaten * (hash(i, 3) * 0.6 + 0.3));
      out.push({ key: `flour|${Math.round(len * 4)}|${along}`, cw: 40, ch: 400, h: Math.max(0.1, len), pos: along ? [-12 + i * 6, 0.02, 14 - len / 2] as V3 : [-12 + len / 2, 0.02, 2 + (i - 5) * 6] as V3, flat: true, yaw: along ? 0 : Math.PI / 2, shadow: true, anchor: 0.5, lit: 0.6,
        draw: (g) => { g.fillStyle = "#fbf6e8"; g.fillRect(8, 0, 24, 400); g.fillStyle = "rgba(255,255,255,0.8)"; g.fillRect(14, 0, 8, 400); } });
    }
    return out;
  };
  const sFlour = w("Legend", sMark);
  add({ id: "flour", from: sFlour, scene: 6, set: "alexandria", light: "day", amb: "sea", state: () => ({ build: 0, light: 0, lib: 0 }),
    cams: () => [K(0, [0, 18, 26], [0, 0, 6], 46), K(2, [2, 14, 22], [0, 0, 6], 44, { dur: 90 })],
    actors: (c) => [...flourLines(c, u01(c, c.w(w("streets", sFlour)) - 10, c.d), 0), ...ch("builder", [-12 + 22 * u01(c, c.w(w("streets", sFlour)) - 10, c.d), 0, 14.6], c, { v: 0, view: "side", mode: "march", phase: walkPhase(c.f), expr: "neutral", prop: null }), ...propCard("sack", [-12 + 22 * u01(c, c.w(w("streets", sFlour)) - 10, c.d) + 0.5, 0.4, 14.8], c.f, { scale: 0.8 })],
    over: (c, g, Wd, H) => { drawTag(g, "LEGEND SAYS", c.t - 2, 90, Wd, H); drawLabel(g, "BARLEY FLOUR", st(c, w("flour,", sFlour)), 50, Wd, H, 0.5, 0.2, { size: 44 }); },
    cues: (c) => [{ f: c.w(w("streets", sFlour)) - 10, kind: "pour", dur: c.d - c.w(w("streets", sFlour)) + 10 }] });
  const sBirds = w("and", w("flour,", sFlour));
  add({ id: "birds", from: sBirds, scene: 6, set: "alexandria", light: "day", amb: "sea", state: () => ({ build: 0, light: 0, lib: 0 }),
    cams: (c) => [K(0, [2, 9, 24], [0, 0.5, 8], 44), K(c.w(w("seers", sBirds)) - 6, [3, 1.7, 15], [0, 1.8, 10], 38, { dur: 22 })], kicks: (c) => [kick(c.w(w("feed", sBirds)), 0.06)],
    actors: (c) => {
      const eat = smooth(u01(c, c.w(w("ate", sBirds)), c.w(w("seers", sBirds)))), out = flourLines(c, 1, eat);
      for (let i = 0; i < 12; i++) { const land = smooth(u01(c, 4 + i * 2, 30 + i * 2)), x = -12 + (i % 6) * 4.4 + hash(i, 1) * 2, z = 3 + Math.floor(i / 6) * 9; out.push(...propCard("bird", [x + (1 - land) * 6, lerp(10, 0.05, land), z], c.f, { phase: land < 1 ? (c.f / 5 + i * 0.3) % 1 : 0.25 })); }
      const ts = c.w(w("seers", sBirds));
      if (c.t > ts - 4) out.push(...ch("seer", [0, 0, 10], c, { expr: st(c, w("feed", sBirds)) > 0 ? "laugh" : "proud", wave: 1 }), ...(st(c, w("feed", sBirds)) > 0 ? [fxCard("sparkle", [0, 2.6, 10.1], 2, (st(c, w("feed", sBirds)) / 24) % 1, 2)] : []));
      return out;
    },
    cues: (c) => [{ f: 4, kind: "birds", dur: 50 }, { f: c.w(w("feed", sBirds)), kind: "sparkle" }] });
  const sGrow = w("Alexandria", sBirds);
  add({ id: "grow", from: sGrow, scene: 6, set: "alexandria", light: "golden", amb: "sea", xin: 6,
    state: (c) => ({ build: smooth(u01(c, 4, c.w(w("famous", sGrow)))), light: smooth(u01(c, c.w(w("lighthouse", sGrow)) - 16, c.w(w("lighthouse", sGrow)) + 10)), lib: smooth(u01(c, c.w(w("library,", sGrow)) - 14, c.w(w("library,", sGrow)) + 10)) }),
    cams: (c) => [K(0, [-10, 40, 74], [0, 0, -10], 50), K(4, [-4, 30, 60], [6, 0, -24], 50, { dur: c.w(w("lighthouse", sGrow)) - 4 }), K(c.w(w("library,", sGrow)) - 16, [-6, 14, 40], [-28, 3, 10], 46, { dur: 22 })],
    shadowSize: 90,
    over: (c, g, Wd, H) => { drawLabel(g, "LIGHTHOUSE", st(c, w("lighthouse", sGrow)), 70, Wd, H, 0.7, 0.18, { sub: "Pharos" }); drawLabel(g, "LIBRARY", st(c, w("library,", sGrow)), 70, Wd, H, 0.3, 0.18); drawTag(g, "BUILT BY THE PTOLEMIES", st(c, w("both", sGrow)), 70, Wd, H); },
    cues: (c) => [{ f: 4, kind: "build", dur: c.w(w("famous", sGrow)) - 4 }, { f: c.w(w("lighthouse", sGrow)), kind: "pop" }, { f: c.w(w("library,", sGrow)), kind: "pop" }, { f: c.w(w("both", sGrow)), kind: "pop", gain: 0.5 }] });

  // ===================== S7 — HIS DEATH =====================
  const sNever = w("Alexander", 620);
  add({ id: "never_saw", from: sNever, scene: 7, set: "alexandria", light: "dusk", amb: "sea", state: () => ({ build: 1, light: 1, lib: 1 }), xin: 10,
    cams: () => [K(0, [-4, 2.2, -19], [2, 3, 6], 44)],
    actors: (c) => ch("alex_king", [-1 - 0.05 * c.t, 0, -13], c, { view: "side", mode: "march", phase: walkPhase(c.f, 1.2), expr: "sad" }, { flip: true }) });
  const sIll = w("In", sNever);
  add({ id: "babylon_night", from: sIll, scene: 7, set: "babylon", light: "night", amb: "night", xin: 12,
    cams: () => [K(0, [0, 3, 34], [0, 8, 0], 46), K(2, [0, 2.6, 28], [0, 8, 0], 44, { dur: 80 })],
    over: (c, g, Wd, H) => { drawStamp(g, "323 BC", st(c, w("323 BC,", sIll)), 60, Wd, H); drawLabel(g, "BABYLON", st(c, w("Babylon,", sIll)), 50, Wd, H, 0.5, 0.18, { sub: "June 323 BC" }); },
    cues: (c) => [{ f: c.w(w("323 BC,", sIll)), kind: "stamp", gain: 0.6 }] });
  const bedB: V3 = [398.5, 0, -3.5];
  const lampB: V3 = [400.4, 0, -3.9];
  const room = (c: C, flame = 1, extra: CardDraw[] = []): CardDraw[] => [...propCard("bed", bedB, c.f), ...propCard("lamp", lampB, c.f), ...(flame > 0 ? [fxCard("flame", [lampB[0] + 0.15, 0.17, lampB[2] + 0.04], 0.22 * flame, (c.f / 10) % 1, 2), fxCard("glow", [lampB[0] + 0.15, 0.17, lampB[2] + 0.04], 1.4 * flame, 0, 2)] : []), ...extra];
  const lampPts = (c: C, k = 1): PointL[] => [{ pos: [lampB[0], 1.3, lampB[2] + 0.6], color: "#ffb060", i: 6 * k * (0.92 + 0.08 * Math.sin(c.f * 0.5)), d: 14 }];
  const sFever = w("he", w("Babylon,", sIll));
  add({ id: "fever", from: sFever, scene: 7, set: "babylon", light: "lamp", amb: "night", xin: 8,
    cams: () => [K(0, [401.5, 1.7, 3.5], [398.8, 0.9, -3.3], 38, { creep: 0.003 })], dof: { cInf: 10, focus: 6 },
    actors: (c) => room(c, 1, [...ch("alex_sick", [bedB[0], 0.9, bedB[2]], c, { expr: "sick" }, { shadow: false }).map((d) => ({ ...d, roll: -Math.PI / 2, pos: [bedB[0] + 0.1, 0.92, bedB[2] + 0.08] as V3, anchor: 0.5, z: 1 })), ...propCard("pillow", [bedB[0] - 0.95, 0.66, bedB[2] + 0.1], c.f, { z: 2 }), ...ch("physician", [bedB[0] + 1.7, 0, bedB[2] + 1.2], c, { expr: "worried", facing: -1 })]),
    points: (c) => lampPts(c), cues: (c) => [{ f: c.w(w("fever.", sFever)), kind: "drone_low" }] });
  const sDead = w("Days", sFever);
  add({ id: "lamp_out", from: sDead, scene: 7, set: "babylon", light: "lamp", amb: "night",
    cams: () => [K(0, [lampB[0] + 1.3, 0.85, lampB[2] + 2.2], [lampB[0] + 0.1, 0.3, lampB[2]], 32, { creep: 0.002 })], dof: { cInf: 14, focus: 2.5 },
    actors: (c) => { const td = c.w(w("dead,", sDead)), fl = c.t < td ? 1 : Math.max(0, 1 - (c.t - td) / 6); return room(c, fl, [...(c.t > td && c.t - td < 50 ? [fxCard("smoke", [lampB[0] + 0.15, 0.4 + (c.t - td) * 0.01, lampB[2] + 0.04], 0.8, (c.t - td) / 50, 3)] : [])]); },
    points: (c) => lampPts(c, st(c, w("dead,", sDead)) < 0 ? 1 : Math.max(0.15, 1 - st(c, w("dead,", sDead)) / 6)),
    over: (c, g, Wd, H) => drawLabel(g, "356 – 323 BC", st(c, w("thirty-two", sDead)), 80, Wd, H, 0.5, 0.18, { sub: "aged 32" }),
    cues: (c) => [{ f: c.w(w("dead,", sDead)), kind: "blowout" }, { f: c.w(w("dead,", sDead)), kind: "bell" }] });
  const sWhy = w("To", sDead);
  add({ id: "mystery", from: sWhy, scene: 7, set: "babylon", light: "lamp", amb: "night",
    cams: () => [K(0, [400, 1.7, 4.4], [400, 1.6, 0], 38, { creep: 0.003 })], dof: { cInf: 10, focus: 4.4 },
    actors: (c) => [...ch("physician", [399, 0, 0], c, { expr: "worried", facing: 1, headTilt: 4 }), ...ch("general", [401, 0, 0.2], c, { v: 0, expr: "nervous", facing: -1 }), ...(st(c, w("knows", sWhy)) > 0 ? [fxCard("quest", [399, 2.5, 0], 0.7, st(c, w("knows", sWhy)) / 30, 1), fxCard("quest", [401.1, 2.6, 0.2], 0.7, Math.max(0, st(c, w("knows", sWhy)) - 6) / 30, 2)] : [])],
    points: (c) => [{ pos: [400, 2.4, 2], color: "#ffb060", i: 2.5, d: 12 }], cues: (c) => [{ f: c.w(w("knows", sWhy)), kind: "pop" }, { f: c.w(w("knows", sWhy)) + 6, kind: "pop" }] });

  // ===================== S8 — LEGACY =====================
  const sHeir = w("He", 660);
  add({ id: "no_heir", from: sHeir, scene: 8, set: "pella", light: "dusk", amb: "wind", xin: 10,
    cams: () => [K(0, [0, 1.6, -4], [0, 1.8, -10.6], 36, { creep: 0.003 })], dof: { cInf: 10, focus: 6.6 },
    actors: (c) => [...propCard("throne", [0, 1.55, -10.8], c.f), ...propCard("crown_fall", [0, 2.12, -10.6], c.f, { z: 1 })] });
  const sStrong = w("Asked", sHeir);
  add({ id: "strongest", from: sStrong, scene: 8, set: "pella", light: "dusk", amb: "wind",
    cams: (c) => [K(0, [0, 1.8, -1], [0, 1.8, -9], 40), K(c.w(w("strongest.\"", sStrong)) - 4, [0, 1.8, -3.5], [0, 1.9, -9], 34, { dur: 10 })], kicks: (c) => [kick(c.w(w("strongest.\"", sStrong)), 0.1)],
    actors: (c) => { const tS = st(c, w("strongest.\"", sStrong)); return [...propCard("throne", [0, 1.55, -10.8], c.f), ...[0, 1, 2].flatMap((k) => ch("general", [-2.4 + k * 2.4, 0, -7.4 + (k === 1 ? -0.4 : 0)], c, { v: k, seed: 60 + k, expr: tS > 0 ? "sly" : "neutral", facing: k === 0 ? 1 : k === 2 ? -1 : 0, look: tS > 0 ? (k === 0 ? 1 : -1) : 0 })),
      ...(tS > 0 ? [0, 1, 2].map((k) => fxCard("bang", [-2.4 + k * 2.4, 2.6, -7.3], 0.6, (tS - k * 3) / 24, k)) : [])]; },
    over: (c, g, Wd, H) => drawTag(g, "AS THE STORY GOES", c.t - 2, 70, Wd, H),
    cues: (c) => [{ f: c.w(w("strongest.\"", sStrong)), kind: "sting" }] });
  const sBreak = w("His", sStrong);
  add({ id: "breakup", from: sBreak, scene: 8, xin: 8, amb: "map",
    map: (c) => { const tb = c.w(w("broke", sBreak)); return { f: c.f, view: [48 + 2.5 * u01(c, 0, c.d), 32.5 - 0.6 * u01(c, 0, c.d), 1.05 + 0.08 * u01(c, 0, c.d)], full: 1, breakup: smooth(u01(c, tb, tb + 24)),
      labels: [{ text: "PTOLEMIES", at: [30, 26], t: st(c, w("Ptolemies", sBreak)), sub: "Egypt", col: "#7a5a10", dy: 0 }, { text: "SELEUCIDS", at: [55, 33.5], t: st(c, w("Seleucids", sBreak)), sub: "Asia", col: "#1f4a7a", dy: 0 }, { text: "ANTIGONIDS", at: [22.2, 43.2], t: st(c, w("Antigonids", sBreak)), sub: "Macedonia", col: "#7a1f24", dy: 0 }] }; },
    cues: (c) => [{ f: c.w(w("fought", sBreak)), kind: "clash", gain: 0.5 }, { f: c.w(w("broke", sBreak)), kind: "crack" }, ...["Ptolemies", "Seleucids", "Antigonids"].map((x) => ({ f: c.w(w(x, sBreak)), kind: "pop" }))] });
  const sLeg = w("But", sBreak);
  add({ id: "not_land", from: sLeg, scene: 8, amb: "map",
    map: (c) => ({ f: c.f, view: [50.5 - 2.5 * u01(c, 0, c.d), 31.9 + 0.6 * u01(c, 0, c.d), 1.13 - 0.08 * u01(c, 0, c.d)], full: 1, breakup: 1 - 0.7 * smooth(u01(c, 0, c.d)) }) });
  const sCult = w("Greek", sLeg);
  add({ id: "culture", from: sCult, scene: 8, amb: "map",
    map: (c) => ({ f: c.f, view: [48 + 4 * u01(c, 0, c.d), 32.5, 1.05], full: 0.3, culture: smooth(u01(c, 0, c.w(w("blending", sCult)))),
      labels: [{ text: "HELLENISTIC AGE", at: [50, 26.5], t: st(c, w("Hellenistic", sCult)), size: 70, col: "#7a1f24", dy: 0 }, { text: "GREEK LANGUAGE · ART · IDEAS", at: [48, 44.5], t: c.t - 4, size: 34, dy: 0 }] }),
    cues: (c) => [{ f: 0, kind: "swell" }, { f: c.w(w("Hellenistic", sCult)), kind: "title_hit" }] });
  const s13 = w("He", sCult);
  add({ id: "thirteen", from: s13, scene: 8, set: "pella", light: "golden", amb: "wind", xin: 8,
    cams: () => [K(0, [0.3, 1.7, 6], [0, 1.95, 2], 34, { creep: 0.003 })], dof: { cInf: 12, focus: 6 },
    actors: (c) => ch("alex_king", [0, 0, 2], c, { expr: "proud" }),
    over: (c, g, Wd, H) => drawStamp(g, "336 – 323 BC", st(c, w("thirteen", s13)), 60, Wd, H, [0.32, 0.16]),
    cues: (c) => [{ f: c.w(w("thirteen", s13)), kind: "stamp" }] });
  const sEnd = w("People", s13);
  add({ id: "finale", from: sEnd, scene: 8, xin: 10, amb: "map",
    paint: (c, g, Wd, H) => {
      const u = smooth(u01(c, 0, c.d + 30));
      g.save(); g.filter = `blur(${Math.round(4 + 3 * u)}px)`;
      drawMap(g, { f: c.f, view: [48, 32.5, 1.25 - 0.15 * u], full: 1, culture: 1 }, Wd, H);
      g.restore();
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(255,190,110,0.18)"); gr.addColorStop(1, "rgba(60,20,40,0.35)"); g.fillStyle = gr; g.fillRect(0, 0, Wd, H);
      const hh = H * (0.95 - 0.12 * u), ww = hh * 0.6, x = Wd / 2 - ww / 2, y = H * 1.02 - hh;
      const cv = HERO(); g.drawImage(cv, x, y, ww, hh);
      for (let i = 0; i < 30; i++) { const px = (hash(i, 1) * Wd + c.f * (0.3 + hash(i, 2))) % Wd, py = (hash(i, 3) * H - c.f * 0.4 * hash(i, 4) + H) % H; g.fillStyle = `rgba(255,235,180,${0.25 + 0.4 * hash(i, 5)})`; g.beginPath(); g.arc(px, py, 2 + 3 * hash(i, 6), 0, 6.283); g.fill(); }
      if (c.t > c.w(w("years.", sEnd)) + 8) { const a = clamp01((c.t - c.w(w("years.", sEnd)) - 8) / 14); g.globalAlpha = a; drawLabel(g, "ALEXANDER THE GREAT", 30, 999, Wd, H, 0.5, 0.12, { size: 56, sub: "356 – 323 BC" }); g.globalAlpha = 1; }
    },
    cues: (c) => [{ f: 0, kind: "swell" }, { f: c.w(w("years.", sEnd)) + 8, kind: "title_hit", gain: 0.7 }] });

  // ---- resolve frames
  const lastE = W[W.length - 1].e;
  const total = Math.ceil((lastE + 1.0) * FPS);
  S.forEach((s, i) => { s.a = i === 0 ? 0 : Math.max(0, frameOfWord(s.from) - 2); });
  S.forEach((s, i) => { s.b = i + 1 < S.length ? S[i + 1].a! : total; });
  return { shots: S, total };
};

let HERO_C: HTMLCanvasElement | null = null;
const HERO = () => {
  if (HERO_C) return HERO_C;
  HERO_C = document.createElement("canvas"); HERO_C.width = 1200; HERO_C.height = 2000;
  const g = HERO_C.getContext("2d")!; g.scale(2, 2); bodyFront(new Pen(g), CAST.alex_king, { expr: "proud", mode: "stand", seed: 5, light: -2.1 });
  return HERO_C;
};
