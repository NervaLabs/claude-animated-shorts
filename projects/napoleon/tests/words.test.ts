import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { setWords, words, wordStart, frameOfWord, captionAt, FPS } from "../src/core/time.ts";

setWords(JSON.parse(readFileSync(new URL("../voice/words.json", import.meta.url), "utf8")));

test("words are monotonic and well formed", () => {
  const w = words();
  for (let i = 0; i < w.length; i++) {
    assert.ok(w[i].s < w[i].e || w[i].e - w[i].s >= 0, `word ${i}`);
    if (i) assert.ok(w[i - 1].s <= w[i].s, `order at ${i}`);
  }
  assert.ok(w[0].s < 0.5 && w[0].cap === "One");
  assert.equal(w[w.length - 1].cap, "weakness?");
  assert.ok(w.some((x) => x.cap === "1769,"));
});

test("caption lookup", () => {
  const w = words();
  assert.equal(captionAt(wordStart(10) + 0.01), w[10].cap);
  assert.equal(captionAt(-1), null);
  assert.equal(captionAt(w[w.length - 1].e + 5), null);
  assert.equal(frameOfWord(10), Math.round(wordStart(10) * FPS));
});
