import { test } from "node:test";
import assert from "node:assert/strict";
import { camAt, type CamKey } from "../src/core/camera.ts";

const keys: CamKey[] = [
  { f: 0, pos: [0, 0, 10], look: [0, 0, 0], fov: 40 },
  { f: 100, dur: 24, pos: [10, 0, 10], look: [10, 0, 0], fov: 40 },
  { f: 200, cut: true, pos: [50, 5, 5], look: [50, 0, 0], fov: 30 },
];
const near = (a: number, b: number, e = 1e-6) => Math.abs(a - b) < e;

test("glide midpoint is the average of two keys", () => {
  const c = camAt(keys, 112, { creep: 0 });
  assert.ok(near(c.pos[0], 5, 1e-6), String(c.pos[0]));
});
test("glide is symmetric (smootherstep speed profile)", () => {
  const x = (f: number) => camAt(keys, f, { creep: 0 }).pos[0];
  const v = (f: number) => x(f + 1) - x(f);
  assert.ok(near(v(100), v(123), 1e-9));
  assert.ok(v(111) > v(101) * 5);
  assert.ok(near(x(124), 10) && near(x(150), 10));
});
test("cut jumps on its own frame", () => {
  assert.ok(near(camAt(keys, 199, { creep: 0 }).pos[0], 10));
  assert.ok(near(camAt(keys, 200, { creep: 0 }).pos[0], 50));
});
test("kicks alternate sign and decay to zero over 7 frames", () => {
  const base = camAt(keys, 150, { creep: 0 }).pos[1];
  const off = [0, 1, 2, 3, 4, 5, 6, 7].map((d) => camAt(keys, 150 + d, { creep: 0, kicks: [{ f: 150, a: 0.2 }] }).pos[1] - base);
  for (let d = 0; d < 6; d++) assert.ok(Math.sign(off[d]) === -Math.sign(off[d + 1]) && off[d] !== 0, `d=${d} ${off}`);
  assert.ok(Math.abs(off[0]) > Math.abs(off[5]));
  assert.ok(near(off[7], 0));
});
test("holds creep: fov shrinks 0.15-0.35 %/f by default", () => {
  const a = camAt(keys, 130).fov, b = camAt(keys, 160).fov;
  const perF = (1 - b / a) / 30;
  assert.ok(perF >= 0.0015 && perF <= 0.0035, String(perF));
});
