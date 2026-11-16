// Shared scene helpers (from the Alexander short)
"use strict";// The 23 shots of "Alexander the Great: The Boy Who Conquered an Empire". One block per narration sentence.

const GROUND = "#7aa04e";
let TMP = null;
/** draw fn into a temp screen-sized canvas, tint it flat, then composite (ghosts, shadows) */
function tinted(g, fn, col, alpha, xf) {
  if (!TMP) TMP = mkCanvas(W, H);
  const t = TMP.getContext("2d");
  t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H);
  t.save(); fn(t); t.restore();
  t.globalCompositeOperation = "source-in"; t.fillStyle = col; t.fillRect(0, 0, W, H); t.globalCompositeOperation = "source-over";
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = alpha; if (xf) xf(g); g.drawImage(TMP, 0, 0); g.restore();
}
/** current transform of g, to replay world drawing on the temp canvas */
const replay = (g) => { const m = g.getTransform(); return (t) => t.setTransform(m); };
const night = (k) => (g) => { g.globalCompositeOperation = "multiply"; g.fillStyle = `rgba(70,80,170,${k})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
const warm = (k) => (g) => { g.globalCompositeOperation = "soft-light"; g.fillStyle = `rgba(255,170,90,${k})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
const sky3 = (g, x, y, w, h, a, b, c) => { g.fillStyle = vgrad(g, y, y + h, [[0, a], [0.6, b], [1, c]]); g.fillRect(x, y, w, h); };
function sunGlow(g, x, y, r, col = "255,214,150") {
  g.fillStyle = rgrad(g, x, y, 0, r * 5, [[0, `rgba(${col},0.95)`], [0.2, `rgba(${col},0.45)`], [1, `rgba(${col},0)`]]);
  g.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);
  ell(g, x, y, r, r, "#fff2cf", 0);
}
function ground(g, y, col = GROUND, x0 = -1500, x1 = 2600, lw = 6) {
  g.fillStyle = vgrad(g, y, y + 900, [[0, col], [1, shade(col, 0.78)]]); g.fillRect(x0, y, x1 - x0, 2400);
  line(g, [[x0, y], [x1, y]], lw * 0.6, "rgba(28,20,34,0.55)");
  paintGrain(g, x0, y, x1 - x0, 1600, 0.1);
}
function grassTufts(g, x0, x1, y0, y1, n, seed, col = "#5f8a3a") {
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, rnd(seed + i)), y = lerp(y0, y1, rnd(seed * 2 + i)), s = 8 + (y - y0) * 0.02; line(g, [[x - s, y], [x - s * 0.3, y - s * 1.6], [x, y], [x + s * 0.4, y - s * 1.8], [x + s, y]], 3, col); }
}
function clouds(g, t, y, n, seed, col = "#fff7ec", sc = 1, x0 = -600, x1 = 1700) {
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, rnd(seed + i)) + t * 8 * (1 + rnd(i)), yy = y + rnd(seed * 4 + i) * 260, s = (90 + rnd(seed * 9 + i) * 90) * sc;
    g.save(); g.globalAlpha = 0.92;
    smoothPath(g, [[x - s * 1.6, yy], [x - s * 1.1, yy - s * 0.55], [x - s * 0.3, yy - s * 0.9], [x + s * 0.6, yy - s * 0.7], [x + s * 1.5, yy - s * 0.2], [x + s * 1.7, yy]]);
    fillInk(g, col, 4);
    g.restore();
  }
}
function crowdHeads(g, x0, x1, y, rows, seed, sc = 1) {
  const cols = ["#b8262f", "#3e78c2", "#d9a441", "#6a9a45", "#7b5ac9", "#efe6d2", "#c98b4b"];
  for (let r = 0; r < rows; r++) for (let x = x0 + (r % 2) * 22; x < x1; x += 44 * sc) {
    const yy = y + r * 46 * sc, k = rnd(seed + x * 0.1 + r);
    ell(g, x, yy + 18 * sc, 20 * sc, 22 * sc, cols[Math.floor(k * cols.length)], 3);
    ell(g, x, yy - 8 * sc, 15 * sc, 14 * sc, SKIN, 3);
  }
}
function rain(g, t, a = 0.5) {
  g.save(); g.globalAlpha = a; g.strokeStyle = "#d9e8ff"; g.lineWidth = 3;
  for (let i = 0; i < 140; i++) { const x = (rnd(i) * 1.2 * W + t * 300) % (W * 1.2) - 60, y = (rnd(i * 3) * H + t * 2400 * (0.8 + rnd(i * 7) * 0.4)) % (H + 200) - 100; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 18, y + 70); g.stroke(); }
  g.restore();
}

