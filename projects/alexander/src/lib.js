// Alexander short — drawing library: helpers, ink shapes, cast (bean-head stickmen), animals, props, effects.
// Everything is deterministic in t (frame-exact renders). World units = pixels at camera zoom 1 (1080x1920 frame).
"use strict";
const W = 1080, H = 1920;
const INK = "#1c1422";
const SKIN = "#fdeedd";
const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
const sms = (t) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const easeBack = (t) => { t = clamp(t); const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const rnd = (s) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const hex = (c) => { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb = (a) => `rgb(${a.map((v) => Math.round(clamp(v, 0, 255))).join(",")})`;
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
const shade = (c, k) => "#" + hex(c).map((v) => Math.round(clamp(v * k, 0, 255)).toString(16).padStart(2, "0")).join("");
const mkCanvas = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };

// ---------- ink primitives ----------
function pathPts(g, pts, close = true) {
  g.beginPath();
  pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
  if (close) g.closePath();
}
/** smooth closed path through points (Catmull-Rom → bezier) */
function smoothPath(g, pts, close = true) {
  const n = pts.length;
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  const last = close ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const a = close || i > 0 ? p0 : p1, d = close || i < n - 2 ? p3 : p2;
    g.bezierCurveTo(p1[0] + (p2[0] - a[0]) / 6, p1[1] + (p2[1] - a[1]) / 6, p2[0] - (d[0] - p1[0]) / 6, p2[1] - (d[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (close) g.closePath();
}
function fillInk(g, fill, lw = 5, col = INK) {
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (lw) { g.lineWidth = lw; g.strokeStyle = col; g.lineJoin = "round"; g.lineCap = "round"; g.stroke(); }
}
function poly(g, pts, fill, lw = 5, smooth = false) { (smooth ? smoothPath : pathPts)(g, pts, true); fillInk(g, fill, lw); }
function ell(g, x, y, rx, ry, fill, lw = 5, rot = 0) { g.beginPath(); g.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot, 0, TAU); fillInk(g, fill, lw); }
function rect(g, x, y, w, h, fill, lw = 5, r = 0) { g.beginPath(); if (r) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); fillInk(g, fill, lw); }
function line(g, pts, w, col = INK, cap = "round") { g.lineCap = cap; g.lineJoin = "round"; pathPts(g, pts, false); g.lineWidth = w; g.strokeStyle = col; g.stroke(); }
/** limb with ink rim */
function limb(g, pts, w, col, ink = 3) { if (ink) line(g, pts, w + ink * 2); line(g, pts, w, col); }
function vgrad(g, y0, y1, stops) { const gr = g.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; }
function rgrad(g, x, y, r0, r1, stops) { const gr = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; }

/** soft painted shading: darken the far side of the current path (call after building a path) */
function shadeSide(g, x, y, r, ang, k = 0.22, col = "#2a1d4a") {
  g.save(); g.clip();
  const gr = g.createRadialGradient(x + Math.cos(ang) * r * 0.5, y + Math.sin(ang) * r * 0.5, r * 0.6, x + Math.cos(ang) * r * 0.5, y + Math.sin(ang) * r * 0.5, r * 1.6);
  gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, col);
  g.globalAlpha = k; g.fillStyle = gr; g.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
  g.restore();
}

// ---------- painted textures ----------
let NOISE = null;
function noiseCanvas() {
  if (NOISE) return NOISE;
  NOISE = mkCanvas(512, 512);
  const g = NOISE.getContext("2d"), im = g.createImageData(512, 512);
  for (let i = 0; i < 512 * 512; i++) {
    const x = i % 512, y = (i / 512) | 0;
    const v = 128 + 40 * (rnd(i * 0.37) - 0.5) + 30 * Math.sin(x * 0.05 + Math.sin(y * 0.03) * 2) * Math.sin(y * 0.04 + x * 0.01);
    im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  return NOISE;
}
/** overlay a painterly mottling on whatever is drawn (clip to current path first if wanted) */
function paintGrain(g, x, y, w, h, a = 0.08) {
  g.save(); g.globalAlpha = a; g.globalCompositeOperation = "overlay";
  g.fillStyle = g.createPattern(noiseCanvas(), "repeat"); g.fillRect(x, y, w, h);
  g.restore();
}

// ---------- cast ----------
/** outfit presets */
const OUT = {
  alexander: { tunic: "#b8262f", armor: "#e9c46a", trim: "#d4a632", cape: "#8f1d2c", hair: "#c58a3d", helmet: null, hairStyle: "lion" },
  alexHelm: { tunic: "#b8262f", armor: "#e9c46a", trim: "#d4a632", cape: "#8f1d2c", hair: "#c58a3d", helmet: "greek", crest: "#f3f0e6" },
  boy: { tunic: "#3e78c2", hair: "#c58a3d", hairStyle: "lion", kid: true },
  philip: { tunic: "#6b2a7a", armor: "#d9b44a", trim: "#f0d77a", cape: "#3b1f52", hair: "#3a2a22", beard: "#3a2a22", helmet: "crown", patch: true },
  aristotle: { tunic: "#eee8d6", trim: "#5b7fb2", hair: "#e9e9ef", beard: "#e9e9ef", bald: true, robe: true },
  soldier: { tunic: "#b8262f", armor: "#c9a35a", helmet: "greek", crest: "#c21f2b", shieldCol: "#c9973f" },
  persian: { tunic: "#5b3a8c", armor: "#e2b64b", helmet: "persian", trousers: "#d9a441" },
  darius: { tunic: "#4b2a7a", armor: "#e8c14d", trim: "#f2d36b", helmet: "tiara", beard: "#1f1a24", cape: "#d9a441" },
  general: { tunic: "#2f5d8f", armor: "#d9c08a", helmet: "greek", crest: "#2f2f3a", beard: "#5a3b2a" },
  guard: { tunic: "#2b2b38", armor: "#585868", helmet: "greek", crest: "#1f1f2a" },
  priest: { tunic: "#f3ecda", trim: "#d4a632", bald: true, robe: true },
  builder: { tunic: "#c98b4b", hair: "#3a2a22", cap: "#8a5a32" },
  cleo: { tunic: "#f4f0e2", trim: "#d4a632", hair: "#141018", helmet: "cleo", robe: true, lady: true },
  egyptian: { tunic: "#f4f0e2", trim: "#3f74b8", hair: "#141018", bob: true },
};

/**
 * Bean-head stickman. Origin = between the feet on the ground. o = outfit, s = state:
 * h height(px), f facing (-1..1), expr, armL/armR [shoulder angle, elbow bend] (0 = down, + = forward),
 * walk phase, bob, lean, blink (0..1), hold: {r?: item, l?: item}, look (eye shift), sit (no legs), mouthOpen
 */
function guy(g, o, s = {}) {
  const h = s.h ?? 420, u = h / 100, f = s.f ?? 0, dir = s.dir ?? 1;
  const lw = clamp(u * 1.15, 1.2, 6.5);
  const kid = o.kid ? 0.88 : 1;
  g.save();
  g.translate(s.x ?? 0, s.y ?? 0);
  if (dir < 0) g.scale(-1, 1);
  const ph = s.walk ?? null;
  const bob = ph != null ? Math.abs(Math.sin(ph * TAU)) * -2.2 * u : (s.bob ?? 0) * u;
  g.rotate(((s.lean ?? 0) * Math.PI) / 180);
  // ground contact shadow
  if (!s.sit && s.shadow !== false) { g.save(); g.globalAlpha = 0.28; ell(g, 0, 0, 20 * u, 3.6 * u, "#1a1030", 0); g.restore(); }
  g.translate(0, bob);
  const hipY = (o.robe || o.lady ? -22 : -26) * u * kid, neckY = -68 * u * kid + (kid < 1 ? 6 * u : 0);
  const headR = 15.5 * u, headY = neckY - headR * 0.9;
  const sh = [-8.5 * u, neckY + 4 * u], shR = [8.5 * u, neckY + 4 * u];
  // cape (behind)
  if (o.cape) {
    const wv = Math.sin((s.t ?? 0) * 5) * 3 * u + (s.wind ?? 0) * u;
    poly(g, [[-9 * u, neckY + 2 * u], [9 * u, neckY + 2 * u], [16 * u - wv * 0.3, hipY + 4 * u], [-14 * u - wv, hipY + 14 * u], [-20 * u - wv * 1.4, hipY + 6 * u]], o.cape, lw, true);
  }
  // legs
  const legW = 2.6 * u;
  if (!s.sit) {
    const sw = ph != null ? Math.sin(ph * TAU) * 9 * u : 0;
    const spread = s.spread ?? 4.5;
    const legs = [[-spread * u * 0.6, -sw], [spread * u * 0.6, sw]];
    const legCol = o.trousers ?? INK;
    for (const [lx, d] of legs) {
      const footX = lx + d, lift = ph != null ? Math.max(0, Math.sin((ph + (d > 0 ? 0 : 0.5)) * TAU)) * 3 * u : 0;
      limb(g, [[lx * 0.6, hipY], [footX, -lift - 1 * u]], legW, legCol, o.trousers ? lw * 0.8 : 0);
      ell(g, footX + 2.2 * u, -lift - 1 * u, 4.2 * u, 2.4 * u, o.boots ?? "#3a2418", lw * 0.6);
    }
  }
  // back arm
  const arm = (side, a) => {
    const [ang, bend] = a ?? [side < 0 ? -0.18 : 0.18, 0.15];
    const S = side < 0 ? sh : shR;
    const L1 = 13 * u * kid, L2 = 13 * u * kid;
    const e = [S[0] + Math.sin(ang) * L1, S[1] + Math.cos(ang) * L1];
    const hnd = [e[0] + Math.sin(ang + bend) * L2, e[1] + Math.cos(ang + bend) * L2];
    limb(g, [S, e, hnd], 2.6 * u, o.sleeve ?? INK, 0);
    return hnd;
  };
  const handBack = s.sit && s.hideArms ? null : arm(-1, s.armL);
  if (handBack) { if (s.hold?.l) item(g, s.hold.l, handBack, u, lw, s); g.beginPath(); g.arc(handBack[0], handBack[1], 3 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  // torso / tunic
  const tw = 11 * u, bw = (o.robe ? 19 : 16) * u * (o.lady ? 1.1 : 1);
  const torso = [[-tw, neckY + 1 * u], [tw, neckY + 1 * u], [tw + 2 * u, (neckY + hipY) / 2], [bw, hipY], [-bw, hipY], [-tw - 2 * u, (neckY + hipY) / 2]];
  smoothPath(g, [[-tw * 0.9, neckY], [tw * 0.9, neckY], [tw + 2.4 * u, neckY + 10 * u], [bw, hipY - 1 * u], [bw * 0.3, hipY + 1.2 * u], [-bw * 0.3, hipY + 1.2 * u], [-bw, hipY - 1 * u], [-tw - 2.4 * u, neckY + 10 * u]]);
  fillInk(g, o.tunic, 0);
  shadeSide(g, 0, (neckY + hipY) / 2, 22 * u, 0.4 * Math.PI + (s.light ?? 0), 0.35);
  smoothPath(g, [[-tw * 0.9, neckY], [tw * 0.9, neckY], [tw + 2.4 * u, neckY + 10 * u], [bw, hipY - 1 * u], [bw * 0.3, hipY + 1.2 * u], [-bw * 0.3, hipY + 1.2 * u], [-bw, hipY - 1 * u], [-tw - 2.4 * u, neckY + 10 * u]]);
  fillInk(g, null, lw);
  void torso;
  if (o.armor) { // cuirass + pteruges
    const ay = neckY + 3 * u, by = hipY - 9 * u;
    smoothPath(g, [[-tw * 0.62, ay + 2 * u], [tw * 0.62, ay + 2 * u], [tw * 0.95, (ay + by) / 2], [tw * 0.85, by], [-tw * 0.85, by], [-tw * 0.95, (ay + by) / 2]]);
    fillInk(g, o.armor, 0); shadeSide(g, 0, (ay + by) / 2, 14 * u, 0.4 * Math.PI, 0.35);
    smoothPath(g, [[-tw * 0.62, ay + 2 * u], [tw * 0.62, ay + 2 * u], [tw * 0.95, (ay + by) / 2], [tw * 0.85, by], [-tw * 0.85, by], [-tw * 0.95, (ay + by) / 2]]);
    fillInk(g, null, lw * 0.8);
    line(g, [[-tw * 0.3, ay + 8 * u], [-tw * 0.1, ay + 12 * u]], 1 * u, shade(o.armor, 0.7)); line(g, [[tw * 0.3, ay + 8 * u], [tw * 0.1, ay + 12 * u]], 1 * u, shade(o.armor, 0.7));
    line(g, [[-tw * 0.9, by - 2.5 * u], [tw * 0.9, by - 2.5 * u]], 1.8 * u, o.trim ?? shade(o.armor, 0.75));
    for (let i = -3; i <= 3; i++) { rect(g, i * 3.6 * u - 1.6 * u, by, 3.2 * u, 7 * u, shade(o.armor, i % 2 ? 0.92 : 0.8), lw * 0.45, 1 * u); }
  }
  if (o.trim && !o.armor) { line(g, [[-bw * 0.95, hipY - 2 * u], [bw * 0.95, hipY - 2 * u]], 2 * u, o.trim); line(g, [[-tw * 0.7, neckY + 1.5 * u], [0, neckY + 7 * u], [tw * 0.7, neckY + 1.5 * u]], 1.6 * u, o.trim); }
  if (s.sash) line(g, [[-tw * 0.8, neckY + 2 * u], [tw * 0.9, hipY - 3 * u]], 3 * u, s.sash);
  // front arm
  const handF = s.sit && s.hideArms ? null : arm(1, s.armR);
  if (handF) { if (s.hold?.r) item(g, s.hold.r, handF, u, lw, s); g.beginPath(); g.arc(handF[0], handF[1], 3 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  // head
  g.save();
  g.translate(0, headY);
  g.rotate(((s.headTilt ?? 0) * Math.PI) / 180);
  head(g, o, s, u, headR, lw, f);
  g.restore();
  g.restore();
}

function head(g, o, s, u, R, lw, f) {
  const rx = R * (o.kid ? 1.04 : 1), ry = R * 0.95;
  // back hair / helmet crest behind
  if (o.helmet === "cleo" || o.bob) { poly(g, [[-rx * 1.18, -ry * 0.4], [-rx * 1.12, ry * 0.75], [rx * 1.12, ry * 0.75], [rx * 1.18, -ry * 0.4]], o.hair, lw); }
  if (o.helmet === "greek") {
    const c = o.crest ?? "#c21f2b";
    smoothPath(g, [[-rx * 1.15, -ry * 0.75], [-rx * 0.6, -ry * 1.65], [rx * 0.4, -ry * 1.75], [rx * 1.1, -ry * 1.15], [rx * 0.9, -ry * 0.95], [0, -ry * 1.25], [-rx * 0.8, -ry * 0.75]]);
    fillInk(g, c, lw);
  }
  // face
  smoothPath(g, [[0, -ry], [rx * 0.92, -ry * 0.72], [rx * 1.02, 0], [rx * 0.82, ry * 0.72], [0, ry], [-rx * 0.82, ry * 0.72], [-rx * 1.02, 0], [-rx * 0.92, -ry * 0.72]]);
  fillInk(g, o.skin ?? SKIN, 0);
  shadeSide(g, 0, 0, R, 0.25 * Math.PI, 0.16, "#7a4a6a");
  smoothPath(g, [[0, -ry], [rx * 0.92, -ry * 0.72], [rx * 1.02, 0], [rx * 0.82, ry * 0.72], [0, ry], [-rx * 0.82, ry * 0.72], [-rx * 1.02, 0], [-rx * 0.92, -ry * 0.72]]);
  fillInk(g, null, lw);
  const fx = f * 4 * u;
  // hair (front)
  if (o.hair && !o.bald && !o.helmet && !o.bob) {
    if (o.hairStyle === "lion") {
      const pts = [];
      for (let i = 0; i <= 10; i++) { const a = Math.PI * (1.05 + 0.9 * (i / 10)); const r = R * (1.08 + (i % 2 ? 0.12 : 0)); pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.98]); }
      pts.push([rx * 0.95, -ry * 0.25], [rx * 0.5, -ry * 0.55], [rx * 0.1, -ry * 0.42], [-rx * 0.4, -ry * 0.58], [-rx * 0.9, -ry * 0.2]);
      poly(g, pts, o.hair, lw, true);
    } else {
      poly(g, [[-rx * 1.0, -ry * 0.1], [-rx * 0.95, -ry * 0.8], [0, -ry * 1.1], [rx * 0.95, -ry * 0.8], [rx * 1.0, -ry * 0.15], [rx * 0.6, -ry * 0.55], [-rx * 0.3, -ry * 0.5]], o.hair, lw, true);
    }
  }
  if (o.bald && o.hair) { // side tufts
    ell(g, -rx * 0.92, -ry * 0.05, rx * 0.22, ry * 0.32, o.hair, lw * 0.8);
    ell(g, rx * 0.92, -ry * 0.05, rx * 0.22, ry * 0.32, o.hair, lw * 0.8);
  }
  if (o.beard) {
    smoothPath(g, [[-rx * 0.85, ry * 0.05], [-rx * 0.7, ry * 0.75], [0 + fx * 0.5, ry * (o.bald ? 1.55 : 1.22)], [rx * 0.7, ry * 0.75], [rx * 0.85, ry * 0.05], [rx * 0.4, ry * 0.42], [fx * 0.5, ry * 0.5], [-rx * 0.4, ry * 0.42]]);
    fillInk(g, o.beard, lw);
  }
  face(g, s.expr ?? "neutral", u, rx, ry, fx, s.blink ?? 0, lw, o, s);
  // helmets / headwear in front
  const hm = o.helmet;
  if (hm === "greek") {
    smoothPath(g, [[-rx * 1.06, -ry * 0.15], [-rx * 1.0, -ry * 0.85], [0, -ry * 1.18], [rx * 1.0, -ry * 0.85], [rx * 1.06, -ry * 0.15], [rx * 0.8, -ry * 0.3], [0, -ry * 0.42], [-rx * 0.8, -ry * 0.3]]);
    fillInk(g, "#c9973f", 0); shadeSide(g, 0, -ry * 0.6, R, 0.2 * Math.PI, 0.3);
    smoothPath(g, [[-rx * 1.06, -ry * 0.15], [-rx * 1.0, -ry * 0.85], [0, -ry * 1.18], [rx * 1.0, -ry * 0.85], [rx * 1.06, -ry * 0.15], [rx * 0.8, -ry * 0.3], [0, -ry * 0.42], [-rx * 0.8, -ry * 0.3]]);
    fillInk(g, null, lw);
    line(g, [[-rx * 0.85, -ry * 0.42], [0, -ry * 0.55], [rx * 0.85, -ry * 0.42]], 2.6 * u, "#e7c15f");
    ell(g, -rx * 0.95, ry * 0.1, rx * 0.16, ry * 0.32, "#c9973f", lw * 0.7); // cheek guards
    ell(g, rx * 0.95, ry * 0.1, rx * 0.16, ry * 0.32, "#c9973f", lw * 0.7);
  } else if (hm === "persian") {
    smoothPath(g, [[-rx * 1.05, -ry * 0.1], [-rx * 0.95, -ry * 0.9], [-rx * 0.1, -ry * 1.5], [rx * 0.5, -ry * 1.3], [rx * 1.0, -ry * 0.85], [rx * 1.05, -ry * 0.1], [rx * 0.6, -ry * 0.38], [-rx * 0.6, -ry * 0.38]]);
    fillInk(g, "#e2b64b", lw);
    line(g, [[-rx * 0.95, -ry * 0.5], [rx * 0.95, -ry * 0.5]], 2.2 * u, "#8a3a2a");
  } else if (hm === "tiara") {
    poly(g, [[-rx * 0.85, -ry * 0.55], [-rx * 0.7, -ry * 1.75], [rx * 0.7, -ry * 1.75], [rx * 0.85, -ry * 0.55]], "#f2d36b", lw);
    for (let i = -2; i <= 2; i++) ell(g, i * rx * 0.3, -ry * 1.15, rx * 0.08, ry * 0.12, "#7b2e9a", lw * 0.4);
    line(g, [[-rx * 0.82, -ry * 0.7], [rx * 0.82, -ry * 0.7]], 2.6 * u, "#c0392b");
  } else if (hm === "crown") {
    if (o.hair) poly(g, [[-rx * 1.0, -ry * 0.1], [-rx * 0.95, -ry * 0.8], [0, -ry * 1.05], [rx * 0.95, -ry * 0.8], [rx * 1.0, -ry * 0.15], [rx * 0.6, -ry * 0.5], [-rx * 0.3, -ry * 0.45]], o.hair, lw, true);
    crown(g, 0, -ry * 0.78, rx * 0.95, ry * 0.55, lw);
  } else if (hm === "nemes") {
    poly(g, [[-rx * 1.0, -ry * 0.3], [-rx * 0.95, -ry * 0.9], [0, -ry * 1.12], [rx * 0.95, -ry * 0.9], [rx * 1.0, -ry * 0.3], [rx * 1.35, ry * 0.9], [rx * 0.9, ry * 0.95], [rx * 0.75, -ry * 0.35], [-rx * 0.75, -ry * 0.35], [-rx * 0.9, ry * 0.95], [-rx * 1.35, ry * 0.9]], "#e9c548", lw, false);
    for (let i = 0; i < 4; i++) { line(g, [[-rx * (0.92 + i * 0.1), -ry * 0.1 + i * ry * 0.25], [-rx * (1.0 + i * 0.08), -ry * 0.05 + i * ry * 0.25]], 2.4 * u, "#2f5fae"); line(g, [[rx * (0.92 + i * 0.1), -ry * 0.1 + i * ry * 0.25], [rx * (1.0 + i * 0.08), -ry * 0.05 + i * ry * 0.25]], 2.4 * u, "#2f5fae"); }
    line(g, [[-rx * 0.8, -ry * 0.55], [rx * 0.8, -ry * 0.55]], 2 * u, "#2f5fae");
    ell(g, 0, -ry * 0.75, rx * 0.1, ry * 0.12, "#d23b2b", lw * 0.5);
  } else if (hm === "cleo") {
    poly(g, [[-rx * 1.05, -ry * 0.1], [-rx * 0.95, -ry * 0.9], [0, -ry * 1.12], [rx * 0.95, -ry * 0.9], [rx * 1.05, -ry * 0.1], [rx * 0.75, -ry * 0.35], [-rx * 0.75, -ry * 0.35]], o.hair, lw, true);
    line(g, [[-rx * 0.95, -ry * 0.55], [rx * 0.95, -ry * 0.55]], 3 * u, "#e7c15f");
    poly(g, [[-2 * u, -ry * 0.6], [0, -ry * 1.15], [2 * u, -ry * 0.6]], "#e7c15f", lw * 0.6);
  } else if (hm === "diadem") {
    line(g, [[-rx * 0.97, -ry * 0.48], [0, -ry * 0.58], [rx * 0.97, -ry * 0.48]], 3.2 * u, "#f6f3ea");
  }
  if (s.crownOn) crown(g, 0, -ry * 0.95 - (s.crownDrop ?? 0), rx * 0.85, ry * 0.5, lw);
  if (o.cap) { poly(g, [[-rx * 1.0, -ry * 0.3], [-rx * 0.8, -ry * 1.0], [rx * 0.8, -ry * 1.0], [rx * 1.0, -ry * 0.3]], o.cap, lw, true); }
  if (s.sweat) { const k = s.sweat; poly(g, [[rx * 0.85, -ry * 0.55 + k * 4 * u], [rx * 0.98, -ry * 0.25 + k * 4 * u], [rx * 0.72, -ry * 0.25 + k * 4 * u]], "#bfe4ff", lw * 0.5, true); }
  if (s.coldCloth) { rect(g, -rx * 0.75, -ry * 0.8, rx * 1.5, ry * 0.32, "#f5f5f5", lw * 0.7, 3 * u); }
}

function crown(g, x, y, w, h, lw) {
  const pts = [[x - w, y + h * 0.5], [x - w, y - h * 0.1], [x - w * 0.6, y + h * 0.15], [x - w * 0.35, y - h * 0.55], [x, y + h * 0.05], [x + w * 0.35, y - h * 0.55], [x + w * 0.6, y + h * 0.15], [x + w, y - h * 0.1], [x + w, y + h * 0.5]];
  poly(g, pts, "#f2c443", lw);
  ell(g, x, y + h * 0.28, w * 0.12, h * 0.16, "#c0392b", lw * 0.5);
}

function face(g, expr, u, rx, ry, fx, blink, lw, o, s) {
  const ex = 5.6 * u, ey = -ry * 0.08, look = (s.look ?? 0) * 1.5 * u;
  const er = 1.85 * u;
  const eyes = [[-ex + fx + look, ey], [ex + fx + look, ey]];
  const drawEye = (x, y, kind, i) => {
    if (blink > 0.5 || kind === "closed") { line(g, [[x - 2.2 * u, y], [x + 2.2 * u, y]], 1.4 * u); return; }
    if (kind === "happy") { g.beginPath(); g.arc(x, y + 1 * u, 2.2 * u, Math.PI * 1.1, Math.PI * 1.9); g.lineWidth = 1.4 * u; g.strokeStyle = INK; g.stroke(); return; }
    if (kind === "shock") { ell(g, x, y, 3.4 * u, 3.8 * u, "#fff", 1.1 * u); g.beginPath(); g.arc(x, y, 1.3 * u, 0, TAU); g.fillStyle = INK; g.fill(); return; }
    if (kind === "tired") { g.beginPath(); g.arc(x, y, er, 0, TAU); g.fillStyle = INK; g.fill(); line(g, [[x - 2.6 * u, y - 0.6 * u], [x + 2.6 * u, y - 0.6 * u]], 1.5 * u, o.skin ?? SKIN); line(g, [[x - 2.6 * u, y - 1.2 * u], [x + 2.6 * u, y - 1.2 * u]], 1.2 * u); return; }
    g.beginPath(); g.arc(x, y, er * (kind === "small" ? 0.75 : 1), 0, TAU); g.fillStyle = INK; g.fill();
    void i;
  };
  const E = {
    neutral: ["dot", 0, 0, "dash"], determined: ["dot", 1, -0.6, "smirk"], happy: ["happy", 0, -1, "smile"], laugh: ["happy", 0, -1.4, "open"],
    shock: ["shock", 0, -2.2, "O"], angry: ["dot", 1.6, -1, "frown"], sad: ["dot", -1.4, 0.6, "frown"], sick: ["tired", -1, 0.4, "wave"],
    sly: ["dot", 1.2, 0.2, "smirk"], scared: ["small", -1.6, -1.2, "wave"], proud: ["happy", 0, -1, "smirk"], shout: ["dot", 1.6, -1.2, "shout"],
    closed: ["closed", 0, 0, "dash"], talk: ["dot", 0, -0.8, "talk"], calm: ["happy", 0, 0, "smile"],
  }[expr] ?? ["dot", 0, 0, "dash"];
  const [ek, angry, raise, mouth] = E;
  if (o.patch) { // Philip lost his right eye at Methone (354 BC)
    drawEye(eyes[1][0], eyes[1][1], ek, 1);
    ell(g, eyes[0][0], eyes[0][1], 3.2 * u, 3 * u, "#1c1422", 0);
    line(g, [[-rx * 0.95, -ry * 0.5], [rx * 0.9, ry * 0.05]], 1.2 * u);
  } else eyes.forEach(([x, y], i) => drawEye(x, y, ek, i));
  // brows
  if (expr !== "neutral" || o.beard) {
    eyes.forEach(([x, y], i) => {
      const sd = i ? 1 : -1, by = y - 4.6 * u + raise * u;
      line(g, [[x - 2.6 * u, by + (sd < 0 ? angry : -angry) * u * 0.6 * -sd * sd], [x + 2.6 * u, by + (sd < 0 ? -angry : angry) * u * 0.6 * sd * sd]], 1.3 * u, o.beard && !o.bald ? o.beard : INK);
    });
  }
  const mx = fx * 1.1 + (s.look ?? 0) * u, my = ry * 0.42;
  const m = s.mouthOpen > 0.5 && mouth === "dash" ? "talk" : mouth;
  if (m === "dash") line(g, [[mx - 3 * u, my], [mx + 3 * u, my]], 1.3 * u);
  else if (m === "smile") { g.beginPath(); g.arc(mx, my - 2.5 * u, 4 * u, Math.PI * 0.2, Math.PI * 0.8); g.lineWidth = 1.4 * u; g.strokeStyle = INK; g.stroke(); }
  else if (m === "smirk") line(g, [[mx - 3 * u, my + 0.4 * u], [mx + 1.5 * u, my + 0.4 * u], [mx + 3.6 * u, my - 1.3 * u]], 1.3 * u);
  else if (m === "frown") { g.beginPath(); g.arc(mx, my + 3.2 * u, 3.6 * u, Math.PI * 1.25, Math.PI * 1.75); g.lineWidth = 1.4 * u; g.strokeStyle = INK; g.stroke(); }
  else if (m === "open") { g.beginPath(); g.moveTo(mx - 4 * u, my - 1 * u); g.quadraticCurveTo(mx, my + 6 * u, mx + 4 * u, my - 1 * u); g.closePath(); fillInk(g, "#6b1f2c", 1 * u); }
  else if (m === "O") ell(g, mx, my + 0.6 * u, 2.2 * u, 3 * u, "#6b1f2c", 1 * u);
  else if (m === "shout") { g.beginPath(); g.moveTo(mx - 3.6 * u, my - 1.4 * u); g.lineTo(mx + 3.6 * u, my - 1.4 * u); g.quadraticCurveTo(mx + 2 * u, my + 4.6 * u, mx, my + 4.6 * u); g.quadraticCurveTo(mx - 2 * u, my + 4.6 * u, mx - 3.6 * u, my - 1.4 * u); fillInk(g, "#6b1f2c", 1 * u); }
  else if (m === "wave") line(g, [[mx - 3.4 * u, my], [mx - 1.7 * u, my - 1 * u], [mx, my], [mx + 1.7 * u, my - 1 * u], [mx + 3.4 * u, my]], 1.2 * u);
  else if (m === "talk") ell(g, mx, my, 2.4 * u, 1.6 * u + (s.mouthOpen ?? 0.6) * 1.4 * u, "#6b1f2c", 1 * u);
  void lw;
}

/** held items, drawn at the hand */
function item(g, it, hnd, u, lw, s) {
  const [x, y] = hnd;
  if (it === "spear" || it === "sarissa") {
    const L = (it === "sarissa" ? 120 : 75) * u, a = s.spearAng ?? -1.35;
    const p0 = [x - Math.cos(a) * L * 0.3, y - Math.sin(a) * L * 0.3], p1 = [x + Math.cos(a) * L * 0.7, y + Math.sin(a) * L * 0.7];
    limb(g, [p0, p1], 1.8 * u, "#8a5a32", lw * 0.4);
    const d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]];
    poly(g, [[p1[0] + d[0] * 8 * u, p1[1] + d[1] * 8 * u], [p1[0] + n[0] * 2.4 * u, p1[1] + n[1] * 2.4 * u], [p1[0] - n[0] * 2.4 * u, p1[1] - n[1] * 2.4 * u]], "#d6d9df", lw * 0.5);
  } else if (it === "sword") {
    const a = s.swordAng ?? -1.2, L = 30 * u, d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]];
    poly(g, [[x + n[0] * 1.6 * u, y + n[1] * 1.6 * u], [x + d[0] * L + n[0] * 1.1 * u, y + d[1] * L + n[1] * 1.1 * u], [x + d[0] * (L + 5 * u), y + d[1] * (L + 5 * u)], [x + d[0] * L - n[0] * 1.1 * u, y + d[1] * L - n[1] * 1.1 * u], [x - n[0] * 1.6 * u, y - n[1] * 1.6 * u]], "#e8ebf0", lw * 0.6);
    line(g, [[x - n[0] * 4 * u, y - n[1] * 4 * u], [x + n[0] * 4 * u, y + n[1] * 4 * u]], 2.2 * u, "#d4a632");
  } else if (it === "shield") {
    ell(g, x + 4 * u, y - 4 * u, 15 * u, 15 * u, s.shieldCol ?? "#c9973f", lw);
    ell(g, x + 4 * u, y - 4 * u, 11 * u, 11 * u, null, lw * 0.5);
    sunStar(g, x + 4 * u, y - 4 * u, 7 * u, "#7a1a22");
  } else if (it === "scroll") {
    rect(g, x - 2 * u, y - 12 * u, 9 * u, 16 * u, "#f3e7c4", lw * 0.6, 2 * u);
    ell(g, x + 2.5 * u, y - 12 * u, 5.5 * u, 2 * u, "#e2d09f", lw * 0.5);
    ell(g, x + 2.5 * u, y + 4 * u, 5.5 * u, 2 * u, "#e2d09f", lw * 0.5);
  } else if (it === "bag") {
    poly(g, [[x - 7 * u, y], [x + 7 * u, y], [x + 9 * u, y + 15 * u], [x - 9 * u, y + 15 * u]], "#d9c08a", lw * 0.7, true);
    line(g, [[x - 6 * u, y + 1 * u], [x + 6 * u, y + 1 * u]], 1.5 * u, "#8a5a32");
  } else if (it === "torch") {
    limb(g, [[x, y + 6 * u], [x + 2 * u, y - 18 * u]], 2.2 * u, "#6b4024", lw * 0.4);
    flame(g, x + 2 * u, y - 20 * u, 7 * u, s.t ?? 0);
  } else if (it === "cup") {
    poly(g, [[x - 5 * u, y - 7 * u], [x + 5 * u, y - 7 * u], [x + 2 * u, y + 1 * u], [x - 2 * u, y + 1 * u]], "#e7c15f", lw * 0.6);
  }
}

/** Vergina sun: 16-ray star, the Argead royal emblem */
function sunStar(g, x, y, r, col) {
  g.save(); g.translate(x, y); g.beginPath();
  for (let i = 0; i < 32; i++) { const a = (i / 32) * TAU, rr = i % 2 ? r * 0.42 : r; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  g.closePath(); g.fillStyle = col; g.fill(); g.restore();
}

function flame(g, x, y, r, t) {
  const k = 1 + 0.12 * Math.sin(t * 23) + 0.08 * Math.sin(t * 37);
  g.save();
  g.globalCompositeOperation = "lighter";
  g.fillStyle = rgrad(g, x, y, 0, r * 5, [[0, "rgba(255,190,90,0.35)"], [1, "rgba(255,120,40,0)"]]);
  g.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);
  g.restore();
  const fl = (s, col) => { g.beginPath(); g.moveTo(x - r * s, y); g.quadraticCurveTo(x - r * s, y - r * 1.2 * s * k, x + Math.sin(t * 9) * r * 0.3, y - r * 2.3 * s * k); g.quadraticCurveTo(x + r * s, y - r * 1.1 * s * k, x + r * s, y); g.quadraticCurveTo(x, y + r * 0.8 * s, x - r * s, y); g.fillStyle = col; g.fill(); };
  fl(1, "#ff8a1e"); fl(0.62, "#ffd24a"); fl(0.3, "#fff6c8");
}

// ---------- animals & vehicles ----------
/** side-view horse facing +x, origin under the body at ground. s: {h, phase (gallop), rear 0..1, col, mane, calm, look} */
function horse(g, s) {
  const h = s.h ?? 300, u = h / 100, col = s.col ?? "#2a2230", lw = clamp(u * 1.15, 1.2, 6);
  const mane = s.mane ?? "#121016";
  const ph = s.phase ?? null, rear = s.rear ?? 0;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  if (s.shadow !== false) { g.save(); g.globalAlpha = 0.28; ell(g, 0, 0, 52 * u, 6 * u, "#1a1030", 0); g.restore(); }
  g.translate(-30 * u * rear * 0.3, 0);
  g.rotate(-rear * 0.55);
  const by = -58 * u + (ph != null ? Math.sin(ph * TAU * 2) * 2.5 * u : 0);
  const legs = [[-30, 0.0], [-22, 0.5], [26, 0.25], [34, 0.75]];
  const legDraw = (back) => legs.forEach(([lx, off], i) => {
    if ((i % 2 === 0) !== back) return;
    let a = ph != null ? Math.sin((ph + off) * TAU) * 0.55 : 0;
    if (rear > 0 && lx > 0) a = -1.1 * rear + Math.sin((s.t ?? 0) * 14 + i) * 0.25 * rear;
    const hip = [lx * u, by + 10 * u], knee = [hip[0] + Math.sin(a) * 26 * u, hip[1] + Math.cos(a) * 26 * u];
    const a2 = a + (lx > 0 ? -Math.max(0, a) * 1.4 - (rear > 0 ? 0.9 * rear : 0) : Math.max(0, -a) * 1.2);
    const hoof = [knee[0] + Math.sin(a2) * 23 * u, knee[1] + Math.cos(a2) * 23 * u];
    limb(g, [hip, knee, hoof], 6.4 * u, back ? shade(col, 0.75) : col, lw * 0.9);
    ell(g, hoof[0] + 1 * u, hoof[1], 4 * u, 2.5 * u, "#141018", lw * 0.6);
  });
  legDraw(true);
  // tail
  const tw = Math.sin((s.t ?? 0) * 6) * 5 * u;
  poly(g, [[-44 * u, by - 6 * u], [-62 * u, by + 6 * u + tw], [-66 * u, by + 34 * u + tw], [-52 * u, by + 24 * u], [-46 * u, by + 6 * u]], mane, lw, true);
  // body
  smoothPath(g, [[-46 * u, by - 4 * u], [-20 * u, by - 14 * u], [26 * u, by - 14 * u], [46 * u, by - 6 * u], [44 * u, by + 12 * u], [20 * u, by + 18 * u], [-26 * u, by + 18 * u], [-48 * u, by + 10 * u]]);
  fillInk(g, col, 0); shadeSide(g, 0, by, 40 * u, Math.PI * 0.5, 0.35);
  smoothPath(g, [[-46 * u, by - 4 * u], [-20 * u, by - 14 * u], [26 * u, by - 14 * u], [46 * u, by - 6 * u], [44 * u, by + 12 * u], [20 * u, by + 18 * u], [-26 * u, by + 18 * u], [-48 * u, by + 10 * u]]);
  fillInk(g, null, lw);
  // neck + head
  const nod = s.calm ? Math.sin((s.t ?? 0) * 3) * 0.05 : ph != null ? Math.sin(ph * TAU * 2) * 0.08 : 0;
  g.save(); g.translate(36 * u, by - 6 * u); g.rotate(nod + (s.headDown ?? 0));
  poly(g, [[-10 * u, 6 * u], [6 * u, -34 * u], [20 * u, -40 * u], [16 * u, -18 * u], [12 * u, 10 * u]], col, lw, true);
  // head
  smoothPath(g, [[6 * u, -44 * u], [20 * u, -48 * u], [44 * u, -30 * u], [46 * u, -22 * u], [36 * u, -18 * u], [14 * u, -26 * u]]);
  fillInk(g, col, lw);
  poly(g, [[8 * u, -46 * u], [6 * u, -58 * u], [14 * u, -48 * u]], col, lw * 0.8); // ear
  // mane
  poly(g, [[-8 * u, 0], [2 * u, -36 * u], [10 * u, -48 * u], [12 * u, -38 * u], [4 * u, -20 * u], [-2 * u, 4 * u]], mane, lw * 0.8, true);
  // eye
  const shock = s.eye === "shock";
  if (shock) { ell(g, 24 * u, -38 * u, 3.6 * u, 3.6 * u, "#fff", lw * 0.4); g.beginPath(); g.arc(25 * u, -38 * u, 1.4 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  else { g.beginPath(); g.arc(25 * u, -37 * u, 1.9 * u, 0, TAU); g.fillStyle = "#fff"; g.fill(); g.beginPath(); g.arc(25 * u, -37 * u, 1.2 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  g.beginPath(); g.arc(42 * u, -24 * u, 1.1 * u, 0, TAU); g.fillStyle = INK; g.fill();
  if (s.bridle) line(g, [[16 * u, -40 * u], [36 * u, -22 * u]], 1.6 * u, "#8a3a2a");
  g.restore();
  legDraw(false);
  if (s.blanket) { poly(g, [[-18 * u, by - 14 * u], [16 * u, by - 14 * u], [20 * u, by + 8 * u], [-22 * u, by + 8 * u]], s.blanket, lw, true); line(g, [[-21 * u, by + 5 * u], [19 * u, by + 5 * u]], 2 * u, "#d4a632"); }
  g.restore();
  return { saddle: [(s.x ?? 0) + (s.dir ?? 1) * -2 * u, (s.y ?? 0) + by - 12 * u] };
}

function chariot(g, s) {
  const h = s.h ?? 260, u = h / 100, lw = clamp(u * 1.2, 1.2, 6);
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.save(); g.globalAlpha = 0.28; ell(g, 0, 0, 40 * u, 5 * u, "#1a1030", 0); g.restore();
  line(g, [[10 * u, -26 * u], [60 * u, -36 * u]], 2.6 * u, "#6b4024");
  poly(g, [[-26 * u, -26 * u], [16 * u, -26 * u], [20 * u, -58 * u], [-22 * u, -52 * u]], "#d9a441", lw, false);
  line(g, [[-20 * u, -40 * u], [16 * u, -42 * u]], 2 * u, "#7b2e9a");
  const sp = (s.t ?? 0) * (s.speed ?? 0) * 6;
  ell(g, -4 * u, -18 * u, 18 * u, 18 * u, "#8a5a32", lw);
  for (let i = 0; i < 6; i++) { const a = sp + (i / 6) * TAU; line(g, [[-4 * u, -18 * u], [-4 * u + Math.cos(a) * 16 * u, -18 * u + Math.sin(a) * 16 * u]], 1.4 * u); }
  ell(g, -4 * u, -18 * u, 4 * u, 4 * u, "#d9a441", lw * 0.6);
  g.restore();
}

function elephant(g, s) {
  const h = s.h ?? 300, u = h / 100, lw = clamp(u * 1.2, 1.2, 6), col = "#8d8ea3";
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  const ph = s.phase ?? 0;
  for (const [lx, o] of [[-26, 0], [-12, 0.5], [18, 0.25], [30, 0.75]]) rect(g, lx * u + Math.sin((ph + o) * TAU) * 3 * u, -34 * u, 12 * u, 34 * u, shade(col, o === 0 || o === 0.25 ? 0.82 : 1), lw, 3 * u);
  ell(g, 0, -52 * u, 44 * u, 28 * u, col, lw);
  ell(g, 38 * u, -64 * u, 18 * u, 18 * u, col, lw);
  limb(g, [[50 * u, -60 * u], [58 * u, -40 * u], [54 * u, -18 * u]], 7 * u, col, lw * 0.8);
  ell(g, 28 * u, -62 * u, 12 * u, 16 * u, shade(col, 0.9), lw);
  g.beginPath(); g.arc(42 * u, -68 * u, 1.6 * u, 0, TAU); g.fillStyle = INK; g.fill();
  poly(g, [[48 * u, -52 * u], [62 * u, -48 * u], [50 * u, -48 * u]], "#f6f3ea", lw * 0.5);
  g.restore();
}

function bird(g, x, y, sz, t, peck = 0, col = "#f4f1ea") {
  g.save(); g.translate(x, y);
  const u = sz / 10;
  ell(g, 0, -6 * u, 7 * u, 5 * u, col, u);
  g.save(); g.translate(5 * u, -10 * u + peck * 4 * u); g.rotate(peck * 0.9);
  ell(g, 0, 0, 3.6 * u, 3.4 * u, col, u);
  poly(g, [[3 * u, -0.6 * u], [7 * u, 0.6 * u], [3 * u, 1.4 * u]], "#f0a43a", u * 0.6);
  g.beginPath(); g.arc(1 * u, -0.8 * u, 0.7 * u, 0, TAU); g.fillStyle = INK; g.fill();
  g.restore();
  line(g, [[-1 * u, -1.5 * u], [-1.5 * u, 0]], 0.8 * u); line(g, [[1.5 * u, -1.5 * u], [1.5 * u, 0]], 0.8 * u);
  void t;
  g.restore();
}
function flyBird(g, x, y, sz, t) {
  const fl = Math.sin(t * 18) * 0.6;
  line(g, [[x - sz, y - sz * fl * 0.6], [x - sz * 0.4, y - sz * 0.2], [x, y], [x + sz * 0.4, y - sz * 0.2], [x + sz, y - sz * fl * 0.6]], sz * 0.18);
}

// ---------- effects ----------
function dust(g, x, y, r, t, seed = 1, col = "#d9c39a") {
  for (let i = 0; i < 6; i++) {
    const a = rnd(seed + i) * TAU, d = r * (0.3 + rnd(seed * 3 + i) * 0.7) * (0.6 + t * 0.6);
    const rr = r * (0.35 + rnd(seed * 7 + i) * 0.3) * (0.7 + t * 0.6);
    g.save(); g.globalAlpha = clamp(1.2 - t, 0, 1) * 0.92;
    ell(g, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.45 - t * r * 0.4, rr, rr * 0.8, col, Math.max(1, r * 0.04));
    g.restore();
  }
}
function burst(g, x, y, r, t, col = "#fff3b0", rays = 12) {
  if (t <= 0 || t >= 1) return;
  g.save(); g.translate(x, y); g.globalAlpha = 1 - t;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * TAU + 0.2, r0 = r * (0.2 + t * 0.6), r1 = r * (0.5 + t * 0.8);
    poly(g, [[Math.cos(a - 0.08) * r0, Math.sin(a - 0.08) * r0], [Math.cos(a) * r1, Math.sin(a) * r1], [Math.cos(a + 0.08) * r0, Math.sin(a + 0.08) * r0]], col, Math.max(1.5, r * 0.025));
  }
  g.restore();
}
function speedLines(g, t, n = 26, col = "rgba(255,255,255,0.75)", horiz = true) {
  g.save();
  for (let i = 0; i < n; i++) {
    const y = rnd(i * 3.1) * H, x = ((rnd(i * 7.3) * 1.6 - t * 3.2 * (0.7 + rnd(i))) % 1.6 + 1.6) % 1.6 * W - W * 0.3;
    if (horiz) line(g, [[x, y], [x + 240 + rnd(i) * 220, y]], 5 + rnd(i * 2) * 6, col);
  }
  g.restore();
}
function sparkle(g, x, y, r, t) {
  g.save(); g.translate(x, y); g.rotate(t * 2); g.globalAlpha = clamp(Math.sin(clamp(t) * Math.PI), 0, 1);
  poly(g, [[0, -r], [r * 0.22, -r * 0.22], [r, 0], [r * 0.22, r * 0.22], [0, r], [-r * 0.22, r * 0.22], [-r, 0], [-r * 0.22, -r * 0.22]], "#fff6c8", r * 0.08);
  g.restore();
}
/** comic thought / speech bubble */
function bubble(g, x, y, w, h, tailX, tailY, fill = "#fffdf6", lw = 5) {
  g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, h * 0.45);
  g.moveTo(x - w * 0.08, y + h / 2 - 2); g.lineTo(tailX, tailY); g.lineTo(x + w * 0.08, y + h / 2 - 2);
  fillInk(g, fill, lw);
  g.beginPath(); g.roundRect(x - w / 2 + lw, y - h / 2 + lw, w - lw * 2, h - lw * 2, h * 0.4); g.fillStyle = fill; g.fill();
}

// ---------- environment pieces ----------
function sky(g, x, y, w, h, top, bot) { g.fillStyle = vgrad(g, y, y + h, [[0, top], [1, bot]]); g.fillRect(x, y, w, h); }
function hills(g, x0, x1, baseY, amp, col, seed, lw = 0, step = 60) {
  g.beginPath(); g.moveTo(x0, baseY + 2000);
  for (let x = x0; x <= x1 + step; x += step) {
    const y = baseY - amp * (0.55 + 0.3 * Math.sin(x * 0.004 + seed) + 0.15 * Math.sin(x * 0.011 + seed * 2.3));
    g.lineTo(x, y);
  }
  g.lineTo(x1 + step, baseY + 2000); g.closePath();
  g.fillStyle = col; g.fill();
  if (lw) { g.lineWidth = lw; g.strokeStyle = INK; g.stroke(); }
}
function smoothHills(g, x0, x1, baseY, amp, col, seed, lw = 0) {
  const pts = [[x0 - 50, baseY + 2600]];
  for (let x = x0 - 50; x <= x1 + 50; x += 90) pts.push([x, baseY - amp * (0.55 + 0.3 * Math.sin(x * 0.0035 + seed) + 0.15 * Math.sin(x * 0.009 + seed * 2.3))]);
  pts.push([x1 + 50, baseY + 2600]);
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; g.quadraticCurveTo(pts[i][0], pts[i][1], mx, my); }
  g.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]); g.closePath();
  g.fillStyle = col; g.fill();
  if (lw) { g.lineWidth = lw; g.strokeStyle = INK; g.stroke(); }
}
function cypress(g, x, y, h, col = "#2f5a3a", lw = 4) {
  poly(g, [[x, y - h], [x + h * 0.13, y - h * 0.55], [x + h * 0.1, y - h * 0.1], [x, y], [x - h * 0.1, y - h * 0.1], [x - h * 0.13, y - h * 0.55]], col, lw, true);
  g.save(); smoothPath(g, [[x, y - h], [x + h * 0.13, y - h * 0.55], [x + h * 0.1, y - h * 0.1], [x, y], [x - h * 0.1, y - h * 0.1], [x - h * 0.13, y - h * 0.55]]); shadeSide(g, x, y - h * 0.5, h * 0.2, 0, 0.4); g.restore();
}
function tree(g, x, y, h, col = "#4f8a3f", lw = 5, seed = 1) {
  limb(g, [[x, y], [x + h * 0.03, y - h * 0.5]], h * 0.07, "#7a4e2c", lw * 0.7);
  const blobs = [[0, -0.68, 0.3], [-0.2, -0.56, 0.22], [0.22, -0.58, 0.23], [0.05, -0.85, 0.22]];
  blobs.forEach(([bx, by, r], i) => { ell(g, x + bx * h, y + by * h, r * h * (1 + rnd(seed + i) * 0.1), r * h * 0.85, i % 2 ? shade(col, 0.9) : col, lw); });
}
function palm(g, x, y, h, lw = 5, t = 0) {
  const top = [x + h * 0.12, y - h];
  limb(g, [[x, y], [x + h * 0.05, y - h * 0.5], top], h * 0.055, "#9b6a3c", lw * 0.7);
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.48 + Math.sin(t * 1.5 + i) * 0.04, L = h * 0.42;
    const tip = [top[0] + Math.cos(a) * L, top[1] + Math.sin(a) * L * 0.6 + L * 0.35];
    const mid = [top[0] + Math.cos(a) * L * 0.5, top[1] + Math.sin(a) * L * 0.5 - L * 0.05];
    poly(g, [top, [mid[0] + 6, mid[1] - 10], tip, [mid[0] - 6, mid[1] + 10]], i % 2 ? "#3f8a4a" : "#4f9e55", lw * 0.8, true);
  }
}
function column(g, x, y, w, h, col = "#efe6d2", lw = 5) {
  rect(g, x - w / 2, y - h, w, h, col, lw);
  g.save(); g.beginPath(); g.rect(x - w / 2, y - h, w, h); shadeSide(g, x, y - h / 2, w, 0, 0.35); g.restore();
  for (let i = 1; i < 4; i++) line(g, [[x - w / 2 + (w * i) / 4, y - h + w * 0.25], [x - w / 2 + (w * i) / 4, y - w * 0.2]], Math.max(1.5, lw * 0.4), "rgba(60,40,70,0.35)");
  rect(g, x - w * 0.72, y - h - w * 0.32, w * 1.44, w * 0.32, col, lw);
  rect(g, x - w * 0.66, y - w * 0.22, w * 1.32, w * 0.22, col, lw);
}
function temple(g, x, y, w, h, n = 6, col = "#efe6d2", roof = "#c95b3c", lw = 5) {
  const cw = w / (n * 1.9);
  rect(g, x - w / 2 - cw, y - cw * 0.5, w + cw * 2, cw * 0.5, shade(col, 0.9), lw);
  rect(g, x - w / 2 - cw * 0.5, y - cw, w + cw, cw * 0.5, col, lw);
  for (let i = 0; i < n; i++) column(g, x - w / 2 + cw * 0.6 + (i * (w - cw * 1.2)) / (n - 1), y - cw, cw, h, col, lw);
  rect(g, x - w / 2 - cw * 0.6, y - cw - h - cw * 0.9, w + cw * 1.2, cw * 0.55, col, lw);
  poly(g, [[x - w / 2 - cw * 0.9, y - cw - h - cw * 0.9], [x, y - cw - h - cw * 0.9 - h * 0.32], [x + w / 2 + cw * 0.9, y - cw - h - cw * 0.9]], col, lw);
  poly(g, [[x - w / 2 + cw * 0.4, y - cw - h - cw * 1.25], [x, y - cw - h - cw * 1.0 - h * 0.25], [x + w / 2 - cw * 0.4, y - cw - h - cw * 1.25]], roof, lw * 0.8);
}
function banner(g, x, y, w, h, col, t, emblem = true, lw = 5) {
  line(g, [[x, y - h * 0.08], [x, y + h * 1.2]], lw * 1.2, "#6b4024");
  const wv = (k) => Math.sin(t * 3 + k * 3) * w * 0.06;
  poly(g, [[x, y], [x + w + wv(0), y + wv(0.3)], [x + w + wv(1), y + h + wv(1.3)], [x + w * 0.5 + wv(0.7), y + h * 0.85], [x + wv(0.4), y + h]], col, lw, false);
  if (emblem) sunStar(g, x + w * 0.5, y + h * 0.42, w * 0.3, "#f2c443");
}

// ---------- text ----------
function strokeText(g, txt, x, y, size, opt = {}) {
  g.save();
  g.font = `${opt.weight ?? 900} ${size}px ${opt.font ?? "Montserrat"}`;
  g.textAlign = opt.align ?? "center"; g.textBaseline = "middle";
  if (opt.spacing) g.letterSpacing = opt.spacing + "px";
  g.lineJoin = "round";
  if (opt.shadow !== false) { g.fillStyle = "rgba(10,6,20,0.45)"; g.fillText(txt, x + size * 0.04, y + size * 0.07); }
  g.lineWidth = opt.lw ?? size * 0.16; g.strokeStyle = opt.stroke ?? "#120c18"; g.strokeText(txt, x, y);
  g.fillStyle = opt.fill ?? "#fff"; g.fillText(txt, x, y);
  g.restore();
}
