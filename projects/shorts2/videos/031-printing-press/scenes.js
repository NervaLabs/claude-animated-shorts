// 031 — How the Printing Press Changed the World Overnight
"use strict";
function buildShots() {
  const GUT = { tunic: "#5a3a24", trim: "#c9a35a", hair: "#4a3020", beard: "#4a3020", helmet: "beret", hatCol: "#3a2a1a" };
  const book = (g, x, y, s, col = "#8a3a2a", rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -40 * s, -55 * s, 80 * s, 110 * s, col, 5 * s, 6 * s); rect(g, -32 * s, -48 * s, 64 * s, 96 * s, "#f6f3ea", 0, 4 * s); rect(g, -40 * s, -55 * s, 16 * s, 110 * s, col, 0, 4 * s); g.restore(); };
  const press = (g, x, y, t, down = 0) => { rect(g, x - 220, y - 700, 60, 700, "#6b4024", 6); rect(g, x + 160, y - 700, 60, 700, "#6b4024", 6); rect(g, x - 240, y - 760, 480, 80, "#8a5a32", 6, 8); rect(g, x - 20, y - 680, 40, 200 + down * 60, "#9a9aa8", 5); rect(g, x - 160, y - 480 + down * 60, 320, 50, "#8a5a32", 6, 6); rect(g, x - 220, y - 300, 440, 60, "#8a5a32", 6, 6); rect(g, x - 140, y - 330, 280, 30, "#f6f3ea", 4); line(g, [[x, y - 640], [x + 200 * Math.cos(t * 2), y - 640 + 30 * Math.sin(t * 2)]], 12); };
  // 0 hook: a book = a house
  S2(0, { bg: "library", blur: true, draw: (g, t) => { book(g, 300, 1400, 3.2); strokeText(g, "=", 540, 1420, 160, { fill: "#fff" }); halfTimber(g, 800, 1650, 320, 380); },
    titles: [["1440", "BEFORE 1440...", "label"], ["house", "1 BOOK = 1 SMALL HOUSE", "stamp", { size: 90 }]] });
  ev(wt(0, "house"), "cash");
  // 1 monks copying, fewer than 30,000 books
  { const tM = wt(1, "Monks"), tT = wt(1, "30,000");
    S2(1, { bg: "library", draw: (g, t) => { rect(g, 160, 1500, 760, 50, "#8a5a32", 6, 6); for (let i = 0; i < 2; i++) { guy(g, C.monk, { x: 300 + i * 480, y: 1840, h: 520, expr: "tired", armR: [1.3 + Math.sin(t * 7 + i) * 0.15, -0.6], blink: blinkAt(t, i), t }); rect(g, 340 + i * 480, 1460, 160, 40, "#f6f3ea", 4); } if (t > tT - 0.2) { const n = Math.min(12, Math.floor((t - tT) * 10)); for (let i = 0; i < n; i++) book(g, 200 + (i % 6) * 135, 1100 - Math.floor(i / 6) * 120, 0.9, ["#8a3a2a", "#2f4f9f", "#3a6a3a"][i % 3]); } },
      titles: [[tM, "MONTHS PER COPY", "label"], ["skin", "WRITTEN ON ANIMAL SKIN", "label", { size: 56 }], [tT, "< 30,000 BOOKS IN EUROPE", "stamp", { size: 76 }]] });
    ev(tT, "pop"); }
  // 2 Gutenberg: movable type + ink + wine press
  { const tG = wt(2, "Gutenberg"), tMv = wt(2, "movable"), tI = wt(2, "ink"), tW = wt(2, "wine");
    S2(2, { bg: "library", blur: true, draw: (g, t) => { guy(g, GUT, { x: 240, y: 1840, h: 600, expr: "proud", armR: [2.3, -0.3], blink: blinkAt(t, 1), t }); if (t > tW - 0.2) press(g, 720, 1840, t, Math.abs(Math.sin(t * 3))); else { if (t > tMv - 0.1) for (let i = 0; i < 6; i++) { rect(g, 560 + (i % 3) * 120, 1250 + Math.floor(i / 3) * 120, 100, 100, "#9a9aa8", 5, 8); strokeText(g, "GUTENB"[i], 610 + (i % 3) * 120, 1300 + Math.floor(i / 3) * 120, 60, { fill: "#2a2a32", lw: 0, shadow: false }); } if (t > tI - 0.1) { ell(g, 740, 1600, 110, 40, "#1c1422", 6); } } },
      titles: [[tG, "JOHANNES GUTENBERG", "label", { font: "Cinzel" }], [tMv, "MOVABLE METAL TYPE", "label"], [tI, "+ OIL-BASED INK", "label"], [tW, "+ A WINE PRESS", "stamp", { size: 100 }]] });
    ev(tG, "ding"); ev(tW, "build"); }
  // 3 20 million books in 50 years
  { const tF = wt(3, "50"), tTw = wt(3, "20");
    S2(3, { bg: "library", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1350, 0.85, 0]], draw: (g, t) => { const n = Math.floor(clamp((t - tF) / 3.5) * 60); for (let i = 0; i < n; i++) book(g, 120 + (i % 10) * 95, 1800 - Math.floor(i / 10) * 125, 0.95, ["#8a3a2a", "#2f4f9f", "#3a6a3a", "#7a1a4a"][i % 4], (rnd(i) - 0.5) * 0.2); },
      titles: [[tF, "WITHIN 50 YEARS", "label"], [tTw, "20,000,000 BOOKS", "stamp", { size: 110 }]] });
    ev(tTw, "coins"); }
  // 4 literacy explodes, news for everyone
  { const tL = wt(4, "Literacy"), tN = wt(4, "news");
    S2(4, { bg: "town", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, C.peasant(i), { x: 160 + i * 250, y: 1840, h: 500, expr: t > tN ? "shock" : "happy", armR: [1.2, -0.8], armL: [-1.2, 0.8], blink: blinkAt(t, i), t }); if (t > tN - 0.2) for (let i = 0; i < 4; i++) newspaper(g, 160 + i * 250, 1600, 170, 130, "NEWS", 0.05 * (i - 1.5)); else for (let i = 0; i < 4; i++) book(g, 160 + i * 250, 1600, 1.0, ["#8a3a2a", "#2f4f9f"][i % 2]); },
      titles: [[tL, "LITERACY EXPLODED", "stamp", { size: 110 }], ["scientific", "IDEAS SPREAD FAST", "label"], [tN, "NEWS FOR EVERYONE", "label", { fill: "#ffe08a" }]] });
    ev(tL, "boom", 0.5); ev(tN, "crowd"); }
}
