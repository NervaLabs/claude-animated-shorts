// 084 — The Christmas Truce of 1914
"use strict";
function buildShots() {
  const TOM = (i) => ({ ...C.tommy }), GER = (i) => ({ ...C.german1 });
  const xtree = (g, x, y, s, t) => { rect(g, x - 8 * s, y - 30 * s, 16 * s, 30 * s, "#6b4024", 3); for (let i = 0; i < 3; i++) poly(g, [[x - (60 - i * 14) * s, y - (30 + i * 40) * s], [x, y - (100 + i * 40) * s], [x + (60 - i * 14) * s, y - (30 + i * 40) * s]], "#2f6f3a", 4); for (let i = 0; i < 4; i++) { const fl = 0.6 + 0.4 * Math.sin(t * 9 + i * 2); ell(g, x - 30 * s + i * 20 * s, y - (50 + (i % 2) * 40) * s, 5 * s, 8 * s * fl, "#ffe08a", 0); } };
  const snow = (g, t) => { for (let i = 0; i < 50; i++) { const x = (rnd(i) * 1300 + Math.sin(t + i) * 20) % 1300 - 100, y = (rnd(i * 3) * 2000 + t * 60) % 2000; ell(g, x, y, 5, 5, "#fff", 0); } };
  const ball = (g, x, y, r) => { ell(g, x, y, r, r, "#f6f3ea", 4); ell(g, x, y, r * 0.35, r * 0.35, "#3a3a44", 0); };
  // 0 hook
  S2(0, { bg: "winterTrench", blur: true, draw: (g, t) => { guy(g, TOM(0), { x: 300, y: 1840, h: 600, expr: "happy", blink: blinkAt(t, 1), t }); guy(g, GER(0), { x: 780, y: 1840, h: 600, dir: -1, expr: "happy", blink: blinkAt(t, 2), t }); ball(g, 540 + Math.sin(t * 3) * 120, 1800 - Math.abs(Math.sin(t * 6)) * 120, 40); snow(g, t); },
    titles: [["Christmas", "CHRISTMAS DAY, WWI", "label"], ["soccer", "ENEMIES PLAYED SOCCER", "stamp", { size: 100 }]] }, night(0.15));
  ev(wt(0, "soccer"), "cheer", 0.5);
  // 1 Dec 1914: candles on trees, Silent Night
  { const tD = wt(1, "December"), tC = wt(1, "candles"), tS = wt(1, "Silent");
    S2(1, { bg: "winterTrench", draw: (g, t) => { for (let i = 0; i < 3; i++) xtree(g, 220 + i * 320, 1500, 2.2, t + i); for (let i = 0; i < 3; i++) guy(g, GER(i), { x: 200 + i * 340, y: 1860, h: 460, expr: "closed", mouthOpen: 0.4 + 0.3 * Math.sin(t * 3 + i), blink: 0, t }); if (t > tS - 0.2) for (let i = 0; i < 4; i++) strokeText(g, "♪", 180 + i * 240, 1200 - ((t * 0.7 + i / 4) % 1) * 300, 70, { fill: "#ffe08a" }); snow(g, t); },
      titles: [[tD, "DECEMBER 1914", "stamp", { size: 110 }], [tC, "CANDLES ON LITTLE TREES", "label", { fill: "#ffe08a" }], [tS, "“SILENT NIGHT”", "stamp", { size: 110 }]] }, night(0.3));
    ev(tD, "boom", 0.3); ev(tS, "choir", 0.6); }
  // 2 British sing back
  { const tB = wt(2, "British");
    S2(2, { bg: "winterTrench", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, TOM(i), { x: 200 + i * 340, y: 1860, h: 460, dir: -1, expr: "happy", mouthOpen: 0.4 + 0.3 * Math.sin(t * 3 + i), blink: 0, t }); for (let i = 0; i < 4; i++) strokeText(g, "♪", 180 + i * 240, 1200 - ((t * 0.7 + i / 4) % 1) * 300, 70, { fill: "#cfe9ff" }); snow(g, t); },
      titles: [[tB, "THE BRITISH SANG BACK", "stamp", { size: 96 }]] }, night(0.3));
    ev(tB, "choir", 0.5); }
  // 3 out of the trenches: handshakes, swaps, soccer → banned next year
  { const tCl = wt(3, "climbed"), tSh = wt(3, "shook"), tTr = wt(3, "traded"), tSo = wt(3, "soccer"), tBn = wt(3, "banned");
    S2(3, { bg: "winterTrench", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.05, 0]], draw: (g, t) => { if (t < tSo - 0.2) { guy(g, TOM(0), { x: 380, y: 1840, h: 600, expr: "happy", armR: t > tSh ? [1.4, 0] : undefined, blink: blinkAt(t, 1), t }); guy(g, GER(0), { x: 700, y: 1840, h: 600, dir: -1, expr: "happy", armR: t > tSh ? [1.4, 0] : undefined, blink: blinkAt(t, 2), t }); if (t > tTr - 0.2) for (let i = 0; i < 3; i++) ell(g, 500 + i * 40, 1300 - Math.abs(Math.sin(t * 4 + i)) * 60, 12, 12, "#e2b64b", 3); } else if (t < tBn - 0.2) { for (let i = 0; i < 4; i++) { const F = i % 2 ? GER : TOM; guy(g, F(i), { x: 150 + i * 260, y: 1840, h: 500, dir: i % 2 ? -1 : 1, expr: "laugh", walk: t * 2 + i, blink: 0, t }); } ball(g, 540 + Math.sin(t * 2.4) * 380, 1800 - Math.abs(Math.sin(t * 5)) * 160, 40); } else { rect(g, 240, 1000, 600, 340, "#fff6e6", 8, 14); strokeText(g, "1915:", 540, 1110, 60, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "BANNED", 540, 1220, 90, { fill: "#c0392b", lw: 0, shadow: false }); } snow(g, t); },
      titles: [[tCl, "THEY CLIMBED OUT", "label"], [tSh, "SHOOK HANDS", "label"], [tTr, "SWAPPED BUTTONS & GIFTS", "label"], [tSo, "PLAYED SOCCER", "stamp", { size: 120 }], [tBn, "...NEVER ALLOWED AGAIN", "label", { fill: "#ffd0c0" }]] }, night(0.15));
    ev(tSh, "pop"); ev(tSo, "cheer"); ev(tBn, "sad"); }
}
