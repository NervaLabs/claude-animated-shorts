import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { setWords, words } from "../src/core/time.ts";
import { buildShots } from "../src/story/shots.ts";

setWords(JSON.parse(readFileSync(new URL("../../voice/words.json", import.meta.url), "utf8")));
const { shots, total } = buildShots();
const ctx = (s: any, f: number) => ({ f, t: f - s.a, d: s.b - s.a, w: (i: number) => Math.round(words()[i].s * 30) - s.a });

test("shots tile the video with no gaps or overlaps", () => {
  assert.equal(shots[0].a, 0);
  for (let i = 1; i < shots.length; i++) assert.equal(shots[i].a, shots[i - 1].b, shots[i].id);
  assert.equal(shots[shots.length - 1].b, total);
  assert.ok(total >= Math.ceil(words()[words().length - 1].e * 30) + 25);
});
test("shot count and lengths", () => {
  assert.ok(shots.length >= 60 && shots.length <= 95, String(shots.length));
  for (const s of shots) { const d = s.b! - s.a!; assert.ok(d >= 15, `${s.id} too short: ${d}`); assert.ok(d <= 520, `${s.id} too long: ${d}`); }
});
test("scene boundaries land on their first words", () => {
  const first = new Map<number, string>();
  for (const s of shots) if (!first.has(s.scene)) first.set(s.scene, words()[s.from].cap);
  assert.deepEqual([...first.entries()].sort((a, b) => a[0] - b[0]).map((e) => e[1]), ["In", "His", "Then,", "The", "Babylon,", "Along", "Alexander", "He"]);
});
test("every 3D shot has camera keys; every cue is inside the video", () => {
  for (const s of shots) {
    const c = ctx(s, s.a!);
    if (s.set) assert.ok((s.cams?.(c) ?? []).length > 0, s.id);
    for (const q of s.cues?.(c) ?? []) { const f = s.a! + q.f; assert.ok(f >= 0 && f < total, `${s.id} cue ${q.kind} at ${f}`); }
  }
});
