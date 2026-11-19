// Time base: 30 fps, the narration word list, easing and a seeded RNG. Everything is a pure function of the frame.
export const FPS = 30;
export type V3 = [number, number, number];
export type Word = { cap: string; spoken: string[]; s: number; e: number; para: number };

let W: Word[] = [];
export const setWords = (list: Word[]) => { W = list; };
export const words = () => W;
export const wordStart = (i: number) => W[Math.max(0, Math.min(W.length - 1, i))].s;
export const wordEnd = (i: number) => W[Math.max(0, Math.min(W.length - 1, i))].e;
export const frameOfWord = (i: number) => Math.round(wordStart(i) * FPS);
/** index of the n-th (0-based) occurrence of a caption (punctuation ignored) at or after word `from` */
export const findWord = (cap: string, from = 0) => {
  const n = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (let i = from; i < W.length; i++) if (n(W[i].cap) === n(cap)) return i;
  throw new Error(`word "${cap}" not found after ${from}`);
};
/** caption shown at time t: the word being spoken, held through short gaps (<= 0.35 s) until the next word */
export const captionAt = (t: number): string | null => {
  if (!W.length || t < W[0].s || t > W[W.length - 1].e + 0.3) return null;
  let lo = 0, hi = W.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (W[m].s <= t) lo = m; else hi = m - 1; }
  const w = W[lo];
  if (t <= w.e + 0.35) return w.cap;
  return null;
};

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
export const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (u * 6 - 15) + 10); };
export const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3;
export const easeIn = (x: number) => clamp01(x) ** 3;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
/** 0 before a, ramps to 1 over d frames */
export const ramp = (f: number, a: number, d: number) => smooth((f - a) / Math.max(1, d));
/** mulberry32 */
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
/** stable hash noise in [0,1) */
export const hash = (a: number, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
