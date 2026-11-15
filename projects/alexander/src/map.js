// Stylised map of the eastern Mediterranean → India (lon 12..80, lat 18..47).
"use strict";
const MK = 60;
const P = (lon, lat) => [(lon - 12) * MK, (47 - lat) * MK * 1.18];
const MAPW = 68 * MK, MAPH = 29 * MK * 1.18;
const PP = (a) => a.map(([lo, la]) => P(lo, la));
const WATER = {
  med: [[12, 41.5], [13, 41.2], [15.6, 40], [15.7, 38.3], [16.1, 38], [17, 38.9], [17.2, 40.4], [18.5, 40.1], [16.9, 41.1], [15.9, 41.9], [14, 42.9], [13.6, 43.5], [12.3, 44.5], [12.4, 45.4], [13.6, 45.7], [14.5, 45.2], [15.9, 43.5], [18, 42.6], [19.4, 41.8], [19.4, 40.3], [20.2, 39.5], [21.1, 38.3], [21.6, 37], [22.4, 36.4], [23.1, 36.5], [23, 37.4], [23.2, 38], [24.0, 38.2], [22.9, 39.4], [22.6, 40.5], [23.9, 40.8], [26, 40.8], [26.4, 40.2], [26.2, 39.4], [26.9, 38.6], [27.2, 37.5], [28, 36.7], [30.6, 36.8], [32.5, 36.1], [34.6, 36.8], [36.1, 36.6], [35.9, 35.2], [35.1, 33.2], [34.5, 31.5], [32.3, 31.2], [30, 31.4], [29, 30.9], [25, 31.7], [23, 32.6], [20, 30.8], [19, 30.3], [15.6, 31.6], [12, 33]],
  marmara: [[26.4, 40.2], [27.5, 40.9], [29, 41.1], [29.4, 40.7], [28, 40.3]],
  black: [[27.6, 42.5], [28, 43.8], [29.6, 45.3], [30.8, 46.5], [33.5, 46], [32.5, 45.4], [33.5, 44.5], [35.2, 44.8], [36.5, 45.2], [38, 47], [39.2, 47.1], [38.3, 46.1], [37.5, 45.3], [38.2, 44.4], [39.9, 43.4], [41.5, 42], [41.5, 41.5], [39.5, 41], [37, 41.1], [35, 42], [33.3, 42], [31.3, 41.1], [29.1, 41.2], [28.1, 41.6]],
  caspian: [[46.7, 44.5], [47.5, 45.5], [49.5, 46.5], [51.3, 47], [53, 46.9], [53.2, 45.2], [51.3, 44.5], [52.7, 42.2], [53, 40.6], [54, 38.9], [53.9, 37.3], [51.5, 36.8], [49.9, 37.5], [49, 38.4], [49.4, 40.2], [50.3, 40.4], [49.2, 41.1], [47.5, 42.9]],
  red: [[32.5, 29.9], [33.2, 28.2], [34.2, 27.8], [34.5, 29.5], [34.9, 29.5], [35, 28], [36.6, 25.8], [38.8, 21.7], [40, 18], [38, 18], [37.3, 21], [35.6, 23.9], [34, 26.7], [32.6, 29.8]],
  gulf: [[48, 30], [50.3, 29.2], [51.4, 27.9], [53.6, 26.7], [56.3, 27.2], [57.3, 25.8], [59.3, 25.4], [61.6, 25.2], [66.6, 25.4], [67.4, 24], [68.8, 23.2], [70.3, 22.6], [72.6, 21.3], [72.9, 19], [72.8, 17], [57.5, 17], [57.8, 19.5], [58.9, 21], [59.8, 22.5], [58.6, 23.6], [56.4, 24.9], [56.3, 26.3], [55, 25.5], [54, 24.2], [52, 24], [51.6, 25.3], [51.3, 26.1], [50.8, 24.8], [50.2, 26.2], [49.6, 27], [48.5, 28.4]],
  aral: [[58.3, 46.4], [61.5, 46.5], [61.2, 44], [59, 43.6], [58.2, 45]],
};
const ISLANDS = {
  sicily: [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.4, 37.6]],
  crete: [[23.5, 35.55], [26.3, 35.3], [26.1, 35.0], [24, 35.15]],
  cyprus: [[32.3, 35], [34.6, 35.7], [33.9, 34.6], [32.5, 34.65]],
  rhodes: [[27.7, 36.4], [28.2, 36.45], [28.1, 36.0], [27.75, 36.1]],
};
const RIVERS = {
  nile: [[31.2, 31.4], [31.1, 30.1], [31.3, 27.5], [32.7, 25.6], [32.9, 24], [32.6, 21.5], [32.9, 17]],
  euphrates: [[38.2, 39.3], [38.6, 36.7], [40.2, 35.1], [41.8, 34.2], [43.6, 32.6], [46.3, 31.0], [47.8, 30.4]],
  tigris: [[40.4, 38.6], [42.2, 37.1], [43.2, 36.0], [44.3, 33.4], [46.0, 32.2], [47.6, 30.8]],
  indus: [[74.5, 35.7], [72.6, 33.9], [71.5, 31.5], [70.2, 28.8], [68.5, 26.2], [67.8, 24.5]],
  oxus: [[71, 37.2], [67.5, 37.2], [64.5, 39.4], [61.5, 41.6], [59.7, 43.4]],
};
const EMPIRE = [[19.5, 42], [23, 42.5], [26.5, 42], [28, 41.6], [29, 41.2], [33, 42.2], [36, 41.8], [41.5, 41.5], [44, 41.7], [46.5, 41.9], [49.5, 41.6], [50, 37.5], [53.9, 37.3], [55, 40], [58, 42.5], [61, 43.2], [66, 41.8], [69.5, 41.6], [71, 40.4], [70.6, 38.4], [72, 37], [71.6, 35.6], [73.6, 35.2], [75.6, 32.4], [75.4, 30.8], [72, 28.6], [70.5, 26], [68.5, 24], [66.5, 25.3], [61.6, 25.2], [57.3, 25.8], [56.3, 27.2], [51.4, 27.9], [50.3, 29.2], [48, 30], [47, 29.6], [44, 31], [40, 31.6], [37, 30], [35, 29.5], [34, 28], [33.5, 26], [33, 24], [31, 23.6], [29.3, 25.4], [25.2, 28.9], [25, 31.7], [21, 34.5], [20, 37], [19.3, 40]];
const MACEDON = [[19.5, 42], [23, 42.3], [26.5, 41.8], [26.2, 40.6], [24, 40], [23.6, 38.2], [22.6, 36.4], [21.2, 37.6], [20.4, 39.4], [19.5, 40.5]];
const CITIES = {
  Pella: [22.5, 40.75], Issus: [36.2, 36.85], Gaugamela: [43.4, 36.6], Alexandria: [29.9, 31.2], Babylon: [44.4, 32.5],
  Persepolis: [52.9, 29.9], Bactra: [66.9, 36.8], Memphis: [31.25, 29.85], Tyre: [35.2, 33.27], Susa: [48.25, 32.2], Taxila: [72.8, 33.7],
  Antioch: [36.2, 36.2], Pergamon: [27.2, 39.1], "Ai-Khanoum": [69.4, 37.2], Seleucia: [44.5, 33.1], Athens: [23.7, 37.98],
};
const ROUTE = [[22.5, 40.75], [26.4, 40.2], [27.3, 40.2], [28, 38.5], [32, 39.6], [36.2, 36.85], [35.2, 33.27], [34.45, 31.5], [31.25, 29.85], [29.9, 31.2], [31.25, 29.85], [35.2, 33.27], [38.5, 36.4], [43.4, 36.6], [44.4, 32.5], [48.25, 32.2], [52.9, 29.9], [48.5, 34.8], [55, 36.5], [61.5, 36.5], [66.9, 36.8], [67, 39.65], [66.9, 36.8], [69.5, 34.8], [72.8, 33.7], [73.5, 32.9], [75.2, 31.5]];
const routeLen = (() => { const L = [0]; for (let i = 1; i < ROUTE.length; i++) L.push(L[i - 1] + Math.hypot(ROUTE[i][0] - ROUTE[i - 1][0], ROUTE[i][1] - ROUTE[i - 1][1])); return L; })();
/** route position at progress u (0..1) in lon/lat */
function routeAt(u) {
  const L = routeLen[routeLen.length - 1] * clamp(u);
  for (let i = 1; i < ROUTE.length; i++) if (routeLen[i] >= L) { const k = (L - routeLen[i - 1]) / (routeLen[i] - routeLen[i - 1] || 1); return [lerp(ROUTE[i - 1][0], ROUTE[i][0], k), lerp(ROUTE[i - 1][1], ROUTE[i][1], k), i]; }
  return [...ROUTE[ROUTE.length - 1], ROUTE.length - 1];
}
const KINGDOMS = [ // after 301 BC (simplified): drawn over the empire shape
  { name: "SELEUCID EMPIRE", col: "#d9a441", poly: [[12, 47], [80, 47], [80, 17], [12, 17]], lab: [55, 33.5], off: [40, 10] },
  { name: "PTOLEMAIC EGYPT", col: "#3f8fb5", poly: [[12, 33.6], [36.3, 33.6], [36.3, 29.2], [34.8, 17], [12, 17]], lab: [29.5, 27.2], off: [-30, 34] },
  { name: "MACEDON", col: "#c0392b", poly: [[12, 47], [26.1, 47], [26.1, 34], [12, 34]], lab: [21.5, 40.6], off: [-46, -10] },
  { name: "THRACE & ANATOLIA", col: "#6a9a45", poly: [[26.1, 47], [33.5, 47], [33.5, 36.4], [26.1, 36.4]], lab: [30, 38.8], off: [-8, -36] },
  { name: "MAURYAN INDIA", col: "#8d7aa8", poly: [[70.6, 47], [80, 47], [80, 17], [69.5, 17], [70.6, 30]], lab: [75, 28.6], off: [44, 18] },
];

function mapBase(g, opt = {}) {
  const land = opt.land ?? "#ecd6a4", sea = opt.sea ?? "#5ea4c8", lw = opt.lw ?? 6;
  g.fillStyle = land; g.fillRect(-200, -200, MAPW + 400, MAPH + 400);
  paintGrain(g, -200, -200, MAPW + 400, MAPH + 400, 0.12);
  // relief: deserts/mountains tint
  const tint = (lon, lat, r, col, a) => { const [x, y] = P(lon, lat); g.save(); g.globalAlpha = a; g.fillStyle = rgrad(g, x, y, 0, r * MK, [[0, col], [1, col + "00"]]); g.fillRect(x - r * MK, y - r * MK, r * MK * 2, r * MK * 2); g.restore(); };
  tint(46, 24, 10, "#f0c87a", 0.8); tint(27, 24, 9, "#f0c87a", 0.7); tint(58, 33, 6, "#e9c27e", 0.6);
  tint(22, 41, 4, "#9fbf6e", 0.7); tint(33, 39, 6, "#b9c47a", 0.55); tint(31, 30.2, 1.5, "#8fbf5e", 0.8); tint(45, 33, 3, "#9fbf6e", 0.55); tint(72, 31, 4, "#9fbf6e", 0.6);
  // water
  for (const k in WATER) {
    const pts = PP(WATER[k]);
    poly(g, pts, sea, 0, true);
  }
  // coast glow + ink
  for (const k in WATER) {
    const pts = PP(WATER[k]);
    g.save(); smoothPath(g, pts); g.clip();
    smoothPath(g, pts); g.lineWidth = 34; g.strokeStyle = "rgba(170,220,240,0.55)"; g.stroke();
    g.restore();
    smoothPath(g, pts); g.lineWidth = lw; g.strokeStyle = INK; g.stroke();
  }
  for (const k in ISLANDS) poly(g, PP(ISLANDS[k]), land, lw, true);
  // mountains
  const mtn = (lon, lat, s) => { const [x, y] = P(lon, lat); poly(g, [[x - s, y], [x, y - s * 1.1], [x + s, y]], "#c9a874", lw * 0.6); line(g, [[x - s * 0.25, y - s * 0.82], [x, y - s * 1.1], [x + s * 0.3, y - s * 0.76]], lw * 0.9, "#fff8e6"); };
  [[33, 37.3], [35, 37.6], [37, 38.2], [46, 34], [48, 33], [50, 31.5], [52, 31], [44.5, 37.5], [52, 36], [55, 36.2], [68, 35.5], [70, 35.6], [72, 36], [74, 35], [43, 40], [46, 39], [22, 40.2], [21.5, 39.5]].forEach(([a, b], i) => mtn(a, b, 26 + (i % 3) * 8));
  for (const k in RIVERS) { smoothPath(g, PP(RIVERS[k]), false); g.lineWidth = 9; g.strokeStyle = sea; g.lineCap = "round"; g.stroke(); smoothPath(g, PP(RIVERS[k]), false); g.lineWidth = 3; g.strokeStyle = "rgba(28,20,34,0.5)"; g.stroke(); }
}
/** dark table backdrop + parchment card; fn draws the map content clipped to the card */
function mapFrame(g, fn) {
  g.fillStyle = "#1e2444"; g.fillRect(-7000, -7000, 18000, 18000);
  paintGrain(g, -3000, -3000, MAPW + 6000, MAPH + 6000, 0.12);
  g.save(); g.globalAlpha = 0.45; g.fillStyle = "#000"; g.fillRect(40, 60, MAPW, MAPH); g.restore();
  g.save(); g.beginPath(); g.rect(0, 0, MAPW, MAPH); g.clip(); fn(g); g.restore();
  g.beginPath(); g.rect(0, 0, MAPW, MAPH); g.lineWidth = 30; g.strokeStyle = "#8a5a32"; g.stroke(); g.lineWidth = 8; g.strokeStyle = INK; g.stroke();
  g.beginPath(); g.rect(-15, -15, MAPW + 30, MAPH + 30); g.lineWidth = 6; g.stroke();
}
function cityDot(g, name, sz = 30, fill = "#fff", showName = true, alpha = 1) {
  const [x, y] = P(...CITIES[name]);
  g.save(); g.globalAlpha = alpha;
  ell(g, x, y, 11, 11, fill, 5);
  if (showName) strokeText(g, name.toUpperCase(), x, y - 34, sz, { font: "Cinzel", fill: "#fff6dc", lw: sz * 0.22, spacing: 1 });
  g.restore();
}
/** red territory revealed along the route up to progress u */
function territory(g, u, col = "rgba(196,40,46,0.55)", full = false) {
  g.save();
  smoothPath(g, PP(EMPIRE)); g.clip();
  if (!full) {
    g.beginPath();
    const [, , idx] = routeAt(u);
    const L = routeLen[routeLen.length - 1] * u;
    for (let i = 0; i < ROUTE.length; i++) {
      if (routeLen[i] > L) break;
      const age = (L - routeLen[i]) / 6;
      const r = clamp(age, 0, 1) * 7.5 * MK + 1.2 * MK;
      const [x, y] = P(...ROUTE[i]); g.moveTo(x + r, y); g.arc(x, y, r, 0, TAU);
    }
    const [hx, hy] = routeAt(u), [X, Y] = P(hx, hy); g.moveTo(X + 1.6 * MK, Y); g.arc(X, Y, 1.6 * MK, 0, TAU);
    g.clip();
    void idx;
  }
  g.fillStyle = col; g.fillRect(-200, -200, MAPW + 400, MAPH + 400);
  // hatching for a painted feel
  g.globalAlpha = 0.18; g.strokeStyle = "#5a0e14"; g.lineWidth = 4;
  for (let x = -MAPH; x < MAPW; x += 26) { g.beginPath(); g.moveTo(x, MAPH + 100); g.lineTo(x + MAPH + 100, -100); g.stroke(); }
  g.restore();
}
function empireOutline(g, lw = 6, col = "#7a121a", dash = null) {
  g.save(); if (dash) g.setLineDash(dash); smoothPath(g, PP(EMPIRE)); g.lineWidth = lw; g.strokeStyle = col; g.stroke(); g.restore();
}
/** water on top again so territory never paints the seas */
function waterOver(g, opt = {}) {
  const sea = opt.sea ?? "#5ea4c8";
  for (const k of ["med", "black", "caspian", "red", "gulf", "marmara"]) {
    const pts = PP(WATER[k]); poly(g, pts, sea, 0, true);
    g.save(); smoothPath(g, pts); g.clip(); smoothPath(g, pts); g.lineWidth = 34; g.strokeStyle = "rgba(170,220,240,0.55)"; g.stroke(); g.restore();
    smoothPath(g, pts); g.lineWidth = opt.lw ?? 6; g.strokeStyle = INK; g.stroke();
  }
  for (const k in ISLANDS) poly(g, PP(ISLANDS[k]), opt.land ?? "#ecd6a4", opt.lw ?? 6, true);
}
function routeLine(g, u, lw = 10) {
  const L = routeLen[routeLen.length - 1] * u;
  const pts = [];
  for (let i = 0; i < ROUTE.length; i++) { if (routeLen[i] > L) break; pts.push(P(...ROUTE[i])); }
  const [hx, hy] = routeAt(u); pts.push(P(hx, hy));
  if (pts.length < 2) return pts[pts.length - 1];
  g.save(); g.setLineDash([lw * 2.2, lw * 1.4]);
  smoothPath(g, pts, false); g.lineWidth = lw + 6; g.strokeStyle = "#fff4d6"; g.stroke();
  smoothPath(g, pts, false); g.lineWidth = lw; g.strokeStyle = "#a8121c"; g.stroke();
  g.restore();
  return pts[pts.length - 1];
}
