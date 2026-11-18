// Engine: word timeline, camera, layer parallax, background cache, transitions, captions, post.
"use strict";
const WD = window.WORDS;
const SENT = WD.sentences, WORDS = WD.words, DUR = WD.duration;
const FPS = 30;
const S = (i) => SENT[i].s, E = (i) => SENT[i].e;
/** time of the n-th word in sentence i that starts with `w` (case-insensitive) */
function wt(i, w, n = 0) {
  const ws = WORDS.filter((x) => x.s >= SENT[i].s - 0.01 && x.e <= SENT[i].e + 0.01);
  const norm = (z) => z.toLowerCase().replace(/[^a-z0-9']/g, ""), q = norm(w);
  let hits = ws.filter((x) => norm(x.w) === q || norm(x.w) === q + "s" || norm(x.w).replace(/'s$/, "") === q);
  if (!hits.length) hits = ws.filter((x) => norm(x.w).startsWith(q));
  if (!hits.length) throw new Error(`word ${w} not in sentence ${i}`);
  return hits[Math.min(n, hits.length - 1)].s;
}
const blinkAt = (t, seed = 1) => { const p = 1.4 + rnd(seed) * 1.6; const ph = (t + rnd(seed * 3) * p) % p; return ph < 0.13 ? 1 : 0; };
/** mouth movement while the narrator voices a character line */
const talk = (t) => 0.5 + 0.5 * Math.sin(t * 26) * Math.sin(t * 7.3);

// ---------- camera ----------
/** keys: [lt, x, y, z, roll(deg)] ; glides use smootherstep, plus a creeping push-in on holds */
function camAt(lt, keys, creep = 0.006) {
  let k0 = keys[0], k1 = keys[0], u = 0;
  for (let i = 0; i < keys.length - 1; i++) if (lt >= keys[i][0]) { k0 = keys[i]; k1 = keys[i + 1]; u = (lt - k0[0]) / Math.max(1e-6, k1[0] - k0[0]); }
  if (lt >= keys[keys.length - 1][0]) { k0 = k1 = keys[keys.length - 1]; u = 0; }
  const e = sms(u);
  const z = lerp(k0[3], k1[3], e) * (1 + creep * lt);
  return { x: lerp(k0[1], k1[1], e), y: lerp(k0[2], k1[2], e), z, r: (lerp(k0[4] ?? 0, k1[4] ?? 0, e) * Math.PI) / 180 };
}
const BASE = { x: 540, y: 960 };
/** run fn in the camera's space for a layer of parallax p (1 = main plane, <1 far, >1 near) */
function layer(g, cam, p, fn) {
  g.save();
  g.translate(W / 2 + SHAKE.x * p, H / 2 + SHAKE.y * p);
  g.rotate(cam.r * Math.min(1, p));
  g.scale(1 + (cam.z - 1) * p, 1 + (cam.z - 1) * p);
  g.translate(-(BASE.x + (cam.x - BASE.x) * p), -(BASE.y + (cam.y - BASE.y) * p));
  fn(g);
  g.restore();
}
/** map world point to screen for a layer */
function toScreen(cam, p, x, y) {
  const z = 1 + (cam.z - 1) * p, cx = BASE.x + (cam.x - BASE.x) * p, cy = BASE.y + (cam.y - BASE.y) * p;
  let dx = (x - cx) * z, dy = (y - cy) * z; const r = cam.r * Math.min(1, p);
  return [W / 2 + dx * Math.cos(r) - dy * Math.sin(r), H / 2 + dx * Math.sin(r) + dy * Math.cos(r)];
}

// ---------- shake ----------
const KICKS = []; // {t, a}
let SHAKE = { x: 0, y: 0 };
function shakeAt(t) {
  let x = 0, y = 0;
  for (const k of KICKS) {
    const f = Math.round((t - k.t) * FPS);
    if (f < 0 || f > 9) continue;
    const d = Math.pow(0.68, f) * k.a, sgn = f % 2 ? -1 : 1;
    x += sgn * d * (0.6 + 0.4 * rnd(k.t * 10 + f)); y += -sgn * d * 0.7 * rnd(k.t * 20 + f);
  }
  return { x, y };
}

// ---------- background cache ----------
const CACHE = {};
/** cached painting of a static layer: region [ox, oy, w, h] in world coords at `sc` px per unit, optional blur (px at 1x) */
function cached(key, ox, oy, w, h, fn, sc = 1.5, blur = 0) {
  let c = CACHE[key];
  if (!c) {
    const cv = mkCanvas(Math.ceil(w * sc), Math.ceil(h * sc)), g = cv.getContext("2d");
    g.scale(sc, sc); g.translate(-ox, -oy); fn(g);
    if (blur) { const b = mkCanvas(cv.width, cv.height), bg = b.getContext("2d"); bg.filter = `blur(${blur * sc}px)`; bg.drawImage(cv, 0, 0); c = CACHE[key] = { cv: b }; }
    else c = CACHE[key] = { cv };
  }
  return (g) => g.drawImage(c.cv, ox, oy, w, h);
}

// ---------- shots ----------
const SHOTS = []; // {t0, tr: {type, d}, draw(g, t, lt)}
function shot(t0, draw, tr = { type: "cut", d: 0 }, grade = null) { SHOTS.push({ t0, draw, tr, grade }); }
const EVENTS = []; // sound events {t, k, v}
const ev = (t, k, v = 1) => EVENTS.push({ t, k, v });

// ---------- titles ----------
/** stamped title: scales from 1.6 → 1 with a slight overshoot, holds, fades */
function stamp(g, txt, x, y, size, t, t0, t1, opt = {}) {
  const a = t - t0; if (a < 0 || t > t1) return;
  const k = a < 0.22 ? lerp(1.8, 1, easeOut(a / 0.22)) : 1 + 0.012 * Math.sin(a * 2);
  const al = clamp(a / 0.08) * clamp((t1 - t) / 0.1);
  g.save(); g.font = `${opt.weight ?? 900} ${size}px ${opt.font ?? "Cinzel"}`; g.letterSpacing = (opt.spacing ?? 2) + "px"; const fit = Math.min(1, 960 / (g.measureText(txt).width + size * 0.3)); g.restore();
  g.save(); g.globalAlpha = al; g.translate(x, y); g.scale(k * fit, k * fit); g.rotate(((opt.rot ?? -3) * Math.PI) / 180);
  if (opt.plate) { g.save(); g.font = `${opt.weight ?? 900} ${size}px ${opt.font ?? "Cinzel"}`; const w = g.measureText(txt).width + size * 0.9; rect(g, -w / 2, -size * 0.72, w, size * 1.44, opt.plate, size * 0.08, size * 0.18); g.restore(); }
  strokeText(g, txt, 0, 0, size, { font: opt.font ?? "Cinzel", weight: opt.weight ?? 900, fill: opt.fill ?? "#ffe08a", lw: size * 0.14, spacing: opt.spacing ?? 2, shadow: opt.shadow });
  g.restore();
}
/** typewriter-ish label with a pop for each letter */
function label(g, txt, x, y, size, t, t0, t1, opt = {}) {
  const a = t - t0; if (a < 0 || t > t1) return;
  const n = Math.min(txt.length, Math.floor(a * 40) + 1);
  g.save(); g.font = `900 ${size}px ${opt.font ?? "Montserrat"}`; g.letterSpacing = (opt.spacing ?? 1) + "px"; const fit = Math.min(1, 980 / (g.measureText(txt).width + size * 0.3)); g.restore();
  g.save(); g.globalAlpha = clamp((t1 - t) / 0.1); g.translate(x, y); g.scale(fit, fit); g.translate(-x, -y);
  strokeText(g, txt.slice(0, n), x, y, size, { font: opt.font ?? "Montserrat", fill: opt.fill ?? "#fff", weight: 900, spacing: opt.spacing ?? 1 });
  g.restore();
}

// ---------- captions ----------
function captions(g, t) {
  let w = null;
  for (let i = 0; i < WORDS.length; i++) {
    const nx = WORDS[i + 1];
    const end = nx && nx.s - WORDS[i].e < 0.35 ? nx.s : WORDS[i].e + 0.15;
    if (t >= WORDS[i].s && t < end) { w = WORDS[i]; break; }
  }
  if (!w) return;
  const a = t - w.s, k = a < 0.1 ? lerp(1.22, 1, easeOut(a / 0.1)) : 1;
  const txt = w.w.replace(/[.,:;?!]+$/, "").replace(/^"|"$/g, "");
  g.save(); g.translate(W / 2, H * 0.705); g.scale(k, k);
  g.font = "900 96px Montserrat"; g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  const fit = Math.min(1, 1000 / (g.measureText(txt).width + 30)); g.scale(fit, fit);
  g.fillStyle = "rgba(0,0,0,0.35)"; g.fillText(txt, 4, 8);
  g.lineWidth = 15; g.strokeStyle = "#0e0a12"; g.strokeText(txt, 0, 0);
  g.fillStyle = "#ffffff"; g.fillText(txt, 0, 0);
  g.restore();
}

// ---------- frame ----------
let BUF = null;
function renderShot(g, i, t) {
  const s = SHOTS[i];
  g.save(); g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  s.draw(g, t, t - s.t0);
  g.restore();
  if (s.grade) { g.save(); s.grade(g, t, t - s.t0); g.restore(); }
}
function renderFrame(main, t) {
  const g = main.getContext("2d");
  SHAKE = shakeAt(t);
  let i = 0;
  for (let k = 0; k < SHOTS.length; k++) if (t >= SHOTS[k].t0) i = k;
  const s = SHOTS[i], lt = t - s.t0, tr = s.tr;
  if (i > 0 && tr.type !== "cut" && lt < tr.d) {
    if (!BUF) BUF = [mkCanvas(W, H), mkCanvas(W, H)];
    const u = lt / tr.d;
    if (tr.type === "xfade") {
      renderShot(BUF[0].getContext("2d"), i - 1, t); renderShot(g, i, t);
      g.save(); g.globalAlpha = 1 - sms(u); g.drawImage(BUF[0], 0, 0); g.restore();
    } else if (tr.type === "whip") {
      const out = u < 0.5;
      const b = BUF[1].getContext("2d");
      if (out) renderShot(b, i - 1, t); else renderShot(b, i, t);
      const off = out ? -sms(u * 2) * W * 0.6 : (1 - sms((u - 0.5) * 2)) * W * 0.6;
      g.save(); g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
      g.filter = `blur(${Math.round(28 * Math.sin(u * Math.PI))}px)`;
      g.drawImage(BUF[1], off * (tr.dir ?? 1), 0);
      g.drawImage(BUF[1], off * (tr.dir ?? 1) + (out ? W : -W) * (tr.dir ?? 1) * 0, 0);
      g.restore();
    } else if (tr.type === "black") {
      if (u < 0.5) renderShot(g, i - 1, t); else renderShot(g, i, t);
      g.save(); g.fillStyle = "#000"; g.globalAlpha = Math.sin(u * Math.PI); g.fillRect(0, 0, W, H); g.restore();
    } else if (tr.type === "flash") {
      renderShot(g, i, t);
      g.save(); g.fillStyle = tr.col ?? "#fff"; g.globalAlpha = 1 - easeOut(u); g.fillRect(0, 0, W, H); g.restore();
    } else if (tr.type === "iris") {
      renderShot(g, i - 1, t);
      renderShot(BUF[0].getContext("2d"), i, t);
      g.save(); g.beginPath(); g.arc(tr.x ?? W / 2, tr.y ?? H / 2, sms(u) * 1300, 0, TAU); g.clip(); g.drawImage(BUF[0], 0, 0); g.restore();
      g.save(); g.beginPath(); g.arc(tr.x ?? W / 2, tr.y ?? H / 2, sms(u) * 1300, 0, TAU); g.lineWidth = 14; g.strokeStyle = "#120c18"; g.stroke(); g.restore();
    }
  } else renderShot(g, i, t);
  // vignette
  g.save();
  g.fillStyle = rgrad(g, W / 2, H * 0.48, H * 0.32, H * 0.75, [[0, "rgba(0,0,0,0)"], [1, "rgba(10,4,20,0.42)"]]);
  g.fillRect(0, 0, W, H);
  g.restore();
  // seamless loop: the last LOOP_X seconds dissolve into the opening frame
  const LX = window.LOOP_X ?? 0.4;
  if (t > DUR - LX) {
    if (!BUF) BUF = [mkCanvas(W, H), mkCanvas(W, H)];
    const b = BUF[1].getContext("2d"); SHAKE = { x: 0, y: 0 }; renderShot(b, 0, 0);
    g.save(); g.globalAlpha = sms((t - (DUR - LX)) / LX); g.drawImage(BUF[1], 0, 0); g.restore();
  }
  captions(g, t);
}
