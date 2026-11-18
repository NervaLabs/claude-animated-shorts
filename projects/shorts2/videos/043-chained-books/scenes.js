// 043 — Why Books Were Chained to Library Shelves
"use strict";
function buildShots() {
  const book = (g, x, y, s, col = "#8a3a2a", open = 0) => { if (open) { rect(g, x - 110 * s, y - 70 * s, 110 * s, 140 * s, "#f6f3ea", 5, 6); rect(g, x, y - 70 * s, 110 * s, 140 * s, "#f6f3ea", 5, 6); for (let i = 0; i < 5; i++) { line(g, [[x - 95 * s, y - 50 * s + i * 22 * s], [x - 15 * s, y - 50 * s + i * 22 * s]], 3, "#9a8a7a"); line(g, [[x + 15 * s, y - 50 * s + i * 22 * s], [x + 95 * s, y - 50 * s + i * 22 * s]], 3, "#9a8a7a"); } return; } rect(g, x - 70 * s, y - 90 * s, 140 * s, 180 * s, col, 6, 8 * s); rect(g, x - 50 * s, y - 70 * s, 100 * s, 50 * s, "#e2b64b", 4, 4); };
  const chain = (g, pts, t = 0) => { for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / 34)); for (let k = 0; k < n; k++) { const q = k / n; g.save(); g.translate(lerp(x0, x1, q), lerp(y0, y1, q)); g.rotate(Math.atan2(y1 - y0, x1 - x0) + (k % 2) * Math.PI / 2); g.beginPath(); g.ellipse(0, 0, 20, 10, 0, 0, TAU); g.lineWidth = 7; g.strokeStyle = "#5a5a66"; g.stroke(); g.restore(); } } };
  const desk = (g) => { poly(g, [[100, 1500], [980, 1500], [940, 1380], [140, 1380]], "#8a5a32", 7); rect(g, 120, 1500, 840, 50, "#6b4024", 6); line(g, [[100, 1580], [980, 1580]], 16, "#5a5a66"); rect(g, 160, 1550, 40, 300, "#6b4024", 5); rect(g, 880, 1550, 40, 300, "#6b4024", 5); };
  // 0 hook
  S2(0, { bg: "library", blur: true, draw: (g, t) => { desk(g); for (let i = 0; i < 3; i++) { book(g, 260 + i * 280, 1400, 1.0, ["#8a3a2a", "#2f4f9f", "#3a6a3a"][i]); chain(g, [[260 + i * 280, 1480], [260 + i * 280 + 40, 1580]]); } },
    titles: [["chain", "CHAINED BOOKS", "stamp", { size: 120 }]] });
  ev(wt(0, "chain"), "clank");
  // 1 a handwritten volume worth a fortune
  { const tF = wt(1, "fortune");
    S2(1, { bg: "library", draw: (g, t) => { book(g, 540, 1350, 2.4, "#7a1a4a"); if (t > tF - 0.2) for (let i = 0; i < 10; i++) { const q = (t * 0.9 + i / 10) % 1; ell(g, 240 + i * 66, 900 + q * 900, 18, 18, "#f2c443", 3); } },
      titles: [["printing", "BEFORE THE PRINTING PRESS...", "label"], [tF, "ONE BOOK = A FORTUNE", "stamp", { size: 100 }]] });
    ev(tF, "coins"); }
  // 2 chains to covers, locked to a rod on the desk
  { const tTh = wt(2, "theft"), tCh = wt(2, "chains"), tR = wt(2, "rod");
    S2(2, { bg: "library", keys: [[0, 540, 1350, 1.0, 0], [12, 600, 1450, 1.15, 0]], draw: (g, t) => { desk(g); book(g, 540, 1400, 1.4, "#2f4f9f"); if (t > tTh - 0.2 && t < tCh) { guy(g, { ...C.peasant(3), tunic: "#1c1422", helmet: "bandana", hatCol: "#1c1422" }, { x: 900, y: 1840, h: 560, dir: -1, expr: "sly", armR: [1.6, -0.2], blink: 0, t }); } if (t > tCh - 0.1) { const k = clamp((t - tCh) / 0.8); chain(g, [[540, 1500], [lerp(540, 700, k), lerp(1500, 1580, k)]]); } if (t > tR - 0.1) { ell(g, 700, 1580, 26, 26, "#9a9aa8", 5); rect(g, 680, 1600, 40, 50, "#9a9aa8", 4, 6); } },
      titles: [[tTh, "TO PREVENT THEFT", "label"], [tCh, "IRON CHAINS ON THE COVERS", "stamp", { size: 80 }], [tR, "LOCKED TO A METAL ROD", "label", { fill: "#d9d9e6" }]] });
    ev(tCh, "clank"); ev(tR, "clank", 0.6); }
  // 3 chain long enough to read on the lectern
  { const tL = wt(3, "lift"), tT = wt(3, "turn");
    S2(3, { bg: "library", draw: (g, t) => { desk(g); guy(g, C.monk, { x: 380, y: 1840, h: 640, expr: "happy", armR: [1.4, -0.7], blink: blinkAt(t, 1), t }); const up = clamp((t - tL) / 0.6); book(g, 640, lerp(1400, 1280, up), 1.2, "#3a6a3a", t > tT - 0.1 ? 1 : 0); chain(g, [[640, lerp(1480, 1360, up)], [700, 1580]]); if (t > tT) { g.save(); g.translate(640, 1280); g.scale(Math.cos((t - tT) * 6), 1); rect(g, 0, -84, 130, 168, "#f6f3ea", 4, 6); g.restore(); } },
      titles: [[tL, "JUST LONG ENOUGH TO READ", "label"], [tT, "...AND TURN THE PAGES", "stamp", { size: 90 }]] });
    ev(tL, "clank", 0.6); ev(tT, "whoosh", 0.6); }
}
