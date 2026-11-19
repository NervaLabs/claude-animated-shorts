// Camera grammar (references/reports/motion.md): keyed poses; each key glides in from the previous pose with a
// symmetric smootherstep over `dur` frames (default 24) or cuts; every hold creeps in (fov shrink, default 0.2 %/f,
// counted from when the last key settled); impact kicks flip sign every frame and decay over 7 frames.
import { type V3, smoother, lerp, lerp3 } from "./time.ts";

export type CamKey = { f: number; dur?: number; cut?: boolean; pos: V3; look: V3; fov?: number; roll?: number; creep?: number };
export type Kick = { f: number; a?: number };
export type CamOut = { pos: V3; look: V3; fov: number; roll: number };

const pose = (k: CamKey) => ({ pos: k.pos, look: k.look, fov: k.fov ?? 40, roll: k.roll ?? 0 });

export const camAt = (keys: CamKey[], f: number, opts: { creep?: number; kicks?: Kick[] } = {}): CamOut => {
  let cur = pose(keys[0]);
  let settle = keys[0].f, creep = opts.creep ?? keys[0].creep ?? 0.002;
  for (let i = 1; i < keys.length && keys[i].f <= f; i++) {
    const k = keys[i], tgt = pose(k), dur = k.cut ? 0 : k.dur ?? 24;
    // the pose this key starts from is wherever the previous glide had got to at k.f
    const u = dur ? smoother((f - k.f) / dur) : 1;
    cur = { pos: lerp3(cur.pos, tgt.pos, u), look: lerp3(cur.look, tgt.look, u), fov: lerp(cur.fov, tgt.fov, u), roll: lerp(cur.roll, tgt.roll, u) };
    settle = k.f + dur;
    creep = opts.creep ?? k.creep ?? 0.002;
  }
  const held = Math.max(0, f - settle);
  let fov = cur.fov * Math.pow(1 - creep, held);
  let pos: V3 = [...cur.pos], roll = cur.roll;
  for (const kk of opts.kicks ?? []) {
    const d = f - kk.f;
    if (d < 0 || d >= 7) continue;
    const a = (kk.a ?? 0.12) * (1 - d / 7) * (d % 2 ? -1 : 1);
    pos = [pos[0] + a * 0.6, pos[1] + a, pos[2]];
    roll += a * 6;
  }
  return { pos, look: cur.look, fov, roll };
};
