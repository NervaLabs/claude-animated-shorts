// 094 — The Soviet Pepsi Fleet (generic soda & vodka bottles: no logos)
"use strict";
function buildShots() {
  const soda = (g, x, y, s) => { rect(g, x - 40 * s, y - 180 * s, 80 * s, 180 * s, "#1f3f8a", 6, 24 * s); rect(g, x - 16 * s, y - 230 * s, 32 * s, 56 * s, "#1f3f8a", 5, 8 * s); rect(g, x - 40 * s, y - 120 * s, 80 * s, 50 * s, "#c0392b", 0); rect(g, x - 40 * s, y - 95 * s, 80 * s, 10 * s, "#f6f3ea", 0); };
  const vodka = (g, x, y, s) => { rect(g, x - 36 * s, y - 200 * s, 72 * s, 200 * s, "#e9f6ff", 6, 10 * s); rect(g, x - 14 * s, y - 260 * s, 28 * s, 64 * s, "#e9f6ff", 5, 6 * s); rect(g, x - 36 * s, y - 130 * s, 72 * s, 60 * s, "#c0392b", 4, 4); };
  const sub = (g, x, y, s) => { ell(g, x, y, 200 * s, 36 * s, "#3a3a44", 5); rect(g, x - 30 * s, y - 80 * s, 70 * s, 50 * s, "#3a3a44", 5, 8); };
  // 0 hook
  S2(0, { bg: "sea", blur: true, draw: (g, t) => { sea(g, 1350, t, -900, 2000, "#2f6f94", "#1f4f74"); for (let i = 0; i < 4; i++) sub(g, 200 + i * 230, 1500 + (i % 2) * 60, 0.7); soda(g, 540, 1200, 1.8); },
    titles: [["1989", "1989", "label"], ["Pepsi", "A SODA COMPANY...", "label", { fill: "#cfe9ff" }], ["naval", "OWNED A NAVY", "stamp", { size: 120 }]] });
  ev(wt(0, "naval"), "horns");
  // 1 rubles worthless abroad
  { const tL = wt(1, "loved"), tR = wt(1, "rubles");
    S2(1, { bg: "street", draw: (g, t) => { for (let i = 0; i < 3; i++) { guy(g, C.soviet, { x: 220 + i * 320, y: 1840, h: 540, expr: "happy", blink: blinkAt(t, i), t }); soda(g, 300 + i * 320, 1500, 0.7); } if (t > tR - 0.2) { rect(g, 340, 900, 400, 200, "#fff6e6", 7, 14); strokeText(g, "RUBLES", 540, 990, 60, { fill: "#1c1422", lw: 0, shadow: false }); line(g, [[380, 940], [700, 1050]], 14, "#c0392b"); } },
      titles: [[tL, "THE USSR LOVED THE SODA", "label"], [tR, "RUBLES: NO GOOD ABROAD", "stamp", { size: 90 }]] });
    ev(tR, "sadtrombone", 0.6); }
  // 2 paid in vodka
  { const tV = wt(2, "vodka");
    S2(2, { bg: "street", draw: (g, t) => { soda(g, 300, 1700, 2.0); strokeText(g, "⇄", 540, 1500, 120, { fill: "#fff" }); for (let i = 0; i < 3; i++) vodka(g, 700 + i * 110, 1700, 1.2); },
      titles: [["Moscow", "SO MOSCOW PAID...", "label"], [tV, "IN VODKA", "stamp", { size: 140 }]] });
    ev(tV, "pour"); }
  // 3 17 subs + cruiser + frigate + destroyer → scrapped in Sweden
  { const tS = wt(3, "17"), tC = wt(3, "cruiser"), tSw = wt(3, "Swedish"), tSc = wt(3, "scrap");
    S2(3, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1320, 0.9, 0]], draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2f6f94", "#1f4f74"); if (t < tSw - 0.2) { const n = t > tS - 0.2 ? Math.min(17, 1 + Math.floor((t - tS + 0.2) * 12)) : 0; for (let i = 0; i < n; i++) sub(g, 80 + (i % 6) * 180, 1420 + Math.floor(i / 6) * 120, 0.45); if (t > tC - 0.2) steamShip(g, { x: 540, y: 1360, h: 220, t, dir: -1 }); } else { for (let i = 0; i < 9; i++) rect(g, 200 + rnd(i) * 600, 1500 + rnd(i * 3) * 200, 120, 40, "#6a6a72", 4, 6); if (t > tSc - 0.2) { rect(g, 300, 900, 480, 180, "#fff6e6", 7, 14); strokeText(g, "SCRAP METAL", 540, 990, 60, { fill: "#1c1422", lw: 0, shadow: false }); } } },
      titles: [[tS, "17 SUBMARINES", "stamp", { size: 110 }], [tC, "+ A CRUISER, FRIGATE & DESTROYER", "label", { size: 54 }], [tSw, "SOLD TO A SWEDISH FIRM", "label"], [tSc, "...FOR SCRAP", "stamp", { size: 110 }]] });
    ev(tS, "horns"); ev(tSc, "crash", 0.5); }
}
