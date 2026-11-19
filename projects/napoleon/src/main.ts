// Page entry for the Napoleon documentary: builds every set once, then window.renderFrame(f) composes frame f from
// the shot list (crossfades stack the previous shot under the new one), captions from words.json, and fades.
import wordsJson from "../voice/words.json";
import { setWords, captionAt, frameOfWord, FPS } from "./core/time.ts";
import { camAt } from "./core/camera.ts";
import { Engine, type Layer } from "./render/engine.ts";
import * as THREE from "three";
import { buildCoast } from "./sets/coast.ts";
import { buildSchool } from "./sets/school.ts";
import { buildParis } from "./sets/paris.ts";
import { buildNotreDame } from "./sets/notredame.ts";
import { buildField } from "./sets/field.ts";
import { buildRoom } from "./sets/room.ts";
import { loadFonts, drawCaption, drawSnow, drawRain } from "./overlay/text.ts";
import { drawMap } from "./overlay/maps.ts";
import { EMPIRE_1812, CLIENTS_1812 } from "./overlay/geo.ts";
import { buildShots, type Shot, type C } from "./story/shots.ts";

setWords(wordsJson as any);
const { shots, total } = buildShots();
const E = new Engine(1920, 1080);
// the wall map in Napoleon's study: the Empire of 1812 painted once onto a canvas texture
const mapCanvas = document.createElement("canvas"); mapCanvas.width = 1024; mapCanvas.height = 640;
drawMap(mapCanvas.getContext("2d")!, { f: 0, view: [12, 49, 0.95], realms: [{ polys: CLIENTS_1812, col: "#7a8fd0", alpha: 0.5 }, { polys: EMPIRE_1812, col: "#27408b", alpha: 0.7 }] }, 1024, 640);
const mapTex = new THREE.CanvasTexture(mapCanvas); mapTex.colorSpace = THREE.SRGBColorSpace;
E.addSet("coast", buildCoast()); E.addSet("school", buildSchool()); E.addSet("paris", buildParis());
E.addSet("notredame", buildNotreDame()); E.addSet("field", buildField()); E.addSet("room", buildRoom(mapTex));

const ctxOf = (s: Shot, f: number): C => ({ f, t: f - s.a!, d: s.b! - s.a!, w: (i: number) => frameOfWord(i) - s.a! });
const layerOf = (s: Shot, f: number, alpha: number): Layer => {
  const c = ctxOf(s, f);
  const L: Layer = { alpha };
  if (s.set) {
    const cam = camAt(s.cams!(c), c.t, { kicks: s.kicks?.(c) });
    L.world = { set: s.set, light: s.light ?? "day", f, cam, cards: s.actors?.(c) ?? [], state: { ...(s.state?.(c) ?? {}), v: s.v ?? 0 },
      dof: s.dof ? { cInf: s.dof.cInf, focus: undefined as unknown as number } : undefined, points: s.points?.(c), shadowAt: s.shadowAt, shadowSize: s.shadowSize };
  }
  if (s.map || s.paint) L.paint = (g, W, H) => { if (s.map) drawMap(g, s.map(c), W, H); s.paint?.(c, g, W, H); };
  return L;
};
const shotIndex = (f: number) => { let i = shots.findIndex((s) => f >= s.a! && f < s.b!); return i < 0 ? shots.length - 1 : i; };

(window as any).TOTAL = total;
(window as any).renderFrame = (f: number) => {
  const t0 = performance.now();
  const i = shotIndex(f), s = shots[i], c = ctxOf(s, f);
  const layers: Layer[] = [];
  const x = s.xin ?? 0;
  if (x && i > 0 && f < s.a! + x) layers.push(layerOf(shots[i - 1], f, 1), layerOf(s, f, (f - s.a! + 1) / (x + 1)));
  else layers.push(layerOf(s, f, 1));
  const cap = s.noCap?.(c) ? null : captionAt(f / FPS);
  E.frame({ layers, over: (g, W, H) => {
    if (s.weather === "snow") drawSnow(g, f, W, H, 300, 1.1); else if (s.weather === "snowlight") drawSnow(g, f, W, H, 120, 0.3); else if (s.weather === "rain") drawRain(g, f, W, H);
    s.over?.(c, g, W, H); if (cap) drawCaption(g, cap, W, H); }, fade: s.fade?.(c), flash: s.flash?.(c) });
  return performance.now() - t0;
};
(window as any).grab = () => E.jpeg(0.93);
/** sound cue sheet: every shot's cues at absolute frames, ambience spans and scene spans */
(window as any).cueSheet = () => ({
  fps: FPS, total,
  cues: shots.flatMap((s) => (s.cues?.(ctxOf(s, s.a!)) ?? []).map((q) => ({ ...q, f: s.a! + q.f, shot: s.id }))),
  amb: shots.map((s) => ({ a: s.a, b: s.b, amb: s.amb ?? "", id: s.id, scene: s.scene })),
  shots: shots.map((s) => ({ id: s.id, a: s.a, b: s.b, scene: s.scene, set: s.set ?? "2d" })),
});
(window as any).E = E;
loadFonts().then(() => { (window as any).ready = true; });
