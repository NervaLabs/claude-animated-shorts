// 017 — Why the Terracotta Army Had Real Weapons
"use strict";
function buildShots() {
  const TC = (i) => ({ tunic: "#b98a62", trim: "#a87a52", armor: "#9a7050", hair: "#8a6a4a", skin: "#c9a07a", beard: i % 3 === 0 ? "#8a6a4a" : null, moust: i % 2 === 0, trousers: "#a87a52", boots: "#8a6a4a" });
  const pit = (g, t, rows = 4) => { for (let r = 0; r < rows; r++) for (let i = 0; i < 9; i++) guy(g, TC(i + r), { x: -40 + i * 140 + (r % 2) * 70, y: 1280 + r * 150, h: 200 + r * 50, expr: "stern", hold: { r: "spear" }, spearAng: -1.5, armR: [1.2, -0.3], blink: 0, t }); };
  const sword = (g, x, y, s, rot, shine = 0) => { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); poly(g, [[-8 * u, 0], [-6 * u, -300 * u], [0, -330 * u], [6 * u, -300 * u], [8 * u, 0]], "#c9a86a", 3); rect(g, -30 * u, 0, 60 * u, 12 * u, "#8a6a3a", 3); rect(g, -6 * u, 12 * u, 12 * u, 60 * u, "#6b4024", 3); if (shine) sparkle(g, 0, -200 * u, 30 * u, shine); g.restore(); };
  // 0 hook
  S2(0, { bg: "dark", keys: [[0, 540, 1450, 1.0, 0], [7, 540, 1400, 0.9, 0]], draw: (g, t) => pit(g, t), titles: [["8,000", "8,000 CLAY SOLDIERS", "stamp", { size: 96 }], ["prop", "...WITH REAL WEAPONS", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "8,000"), "boom", 0.5);
  // 1 1974 discovery; every face unique; real weapons
  { const tF = wt(1, "farmers"), tY = wt(1, "1974"), tU = wt(1, "unique"), tR = wt(1, "real"), tC = wt(1, "crossbows");
    S2(1, { bg: "farm", draw: (g, t) => { if (t < tU - 0.2) { well(g, 600, 1780, 200); guy(g, C.peasant(0), { x: 300, y: 1840, h: 560, expr: t > tY ? "shock" : "determined", armR: [1.8, -0.5], blink: blinkAt(t, 1), t }); if (t > tY) guy(g, TC(0), { x: 720, y: 1700, h: 300, expr: "stern", t, shadow: false }); } else { for (let i = 0; i < 4; i++) guy(g, TC(i), { x: 150 + i * 260, y: 1840, h: 520, expr: ["stern", "neutral", "sly", "determined"][i], hold: t > tR ? { r: ["sword", "spear", "sword", "spear"][i] } : null, spearAng: -1.4, swordAng: -1.2, armR: [1.4, -0.3], blink: 0, t }); } },
      titles: [[tF, "FARMERS DIGGING A WELL", "label"], [tY, "1974", "stamp", { size: 150 }], [tU, "EVERY FACE UNIQUE", "label", { fill: "#ffe08a" }], [tR, "REAL BRONZE WEAPONS", "stamp", { size: 86 }], [tC, "SWORDS · SPEARS · CROSSBOWS", "label", { size: 54 }]] });
    ev(tY, "boom", 0.5); ev(tR, "clank"); }
  // 2 chromium oxide coating
  { const tC = wt(2, "chromium"), tP = wt(2, "patent");
    S2(2, { bg: "lab", blur: true, draw: (g, t) => { sword(g, 540, 1700, 260, 0, (t * 0.7) % 1); if (t > tC - 0.1) { rect(g, 230, 900, 620, 160, "#fff6e6", 7, 16); strokeText(g, "Cr₂O₃ COATING", 540, 980, 60, { fill: "#2f8a4a", lw: 0, shadow: false }); } },
      titles: [[tC, "CHROMIUM OXIDE COATING", "stamp", { size: 84 }], [tP, "PATENTED... IN THE 1900s", "label", { fill: "#ffe08a" }]] });
    ev(tC, "ding"); }
  // 3 still sharp after 2,200 years
  { const tT = wt(3, "2,200"), tS = wt(3, "slice");
    S2(3, { bg: "dark", draw: (g, t) => { sword(g, 400, 1700, 260, 0.6, 0.5); if (t > tS - 0.2) { const k = clamp((t - tS + 0.2) / 0.6); rect(g, 560 + k * 40, 1100 - k * 60, 200, 260, "#f6f3ea", 4, 2); rect(g, 560 - k * 40, 1360 + k * 60, 200, 100, "#f6f3ea", 4, 2); } },
      titles: [[tT, "AFTER 2,200 YEARS", "label"], [tS, "STILL SHARP ENOUGH TO CUT PAPER", "stamp", { size: 66 }]] });
    ev(tS, "whip"); }
}
