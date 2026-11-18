// 098 — How a Cat Survived Three Shipwrecks in WWII (non-graphic: ships are only shown listing in the distance)
"use strict";
function buildShots() {
  const SAM = "#2a2a32";
  const tuxCat = (g, x, y, s, t, dir = 1) => { cat(g, x, y, s, t, SAM, dir); ell(g, x + dir * s * 0.18, y - s * 0.32, s * 0.12, s * 0.1, "#f6f3ea", 0); };
  const listing = (g, x, y, h, t, k, col = "#5a6a7a") => { g.save(); g.translate(x, y + k * 80); g.rotate(k * 0.35); steamShip(g, { x: 0, y: 0, h, t, hull: col }); g.restore(); };
  const plank = (g, x, y, t) => { g.save(); g.translate(x, y + Math.sin(t * 2) * 10); g.rotate(Math.sin(t * 1.5) * 0.05); rect(g, -160, -16, 320, 32, "#8a5a32", 5, 6); g.restore(); };
  // 0 hook
  S2(0, { bg: "deck", blur: true, draw: (g, t) => { tuxCat(g, 540, 1800, 360, t); for (let i = 0; i < 3; i++) { rect(g, 280 + i * 200, 1040, 120, 120, "#fff6e6", 6, 14); strokeText(g, "✓", 340 + i * 200, 1110, 80, { fill: "#2f8a3a", lw: 0, shadow: false }); } },
    titles: [["Unsinkable", "“UNSINKABLE SAM”", "stamp", { size: 110 }], ["three", "SURVIVED 3 SHIPWRECKS", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "Unsinkable"), "ding");
  // 1 Bismarck 1941 → rescued on a plank
  { const tB = wt(1, "Bismarck"), tSa = wt(1, "sank"), tP = wt(1, "plank");
    S2(1, { bg: "sea", draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2f6f94", "#1f4f74"); if (t < tP - 0.2) listing(g, 540, 1420, 360, t, clamp((t - tSa) / 2), "#6a6a72"); else { plank(g, 540, 1500, t); tuxCat(g, 540, 1480 + Math.sin(t * 2) * 10, 200, t); rowboat(g, { x: 880, y: 1520, h: 200, t }); } },
      titles: [[tB, "BATTLESHIP BISMARCK, 1941", "label", { size: 60 }], [tSa, "IT SANK", "stamp", { size: 110 }], [tP, "RESCUED FROM A PLANK", "label", { fill: "#ffe08a" }]] });
    ev(tSa, "splash"); ev(tP, "ding", 0.6); }
  // 2 HMS Cossack, torpedoed
  { const tC = wt(2, "Cossack"), tT = wt(2, "torpedoed");
    S2(2, { bg: "sea", draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2f6f94", "#1f4f74"); listing(g, 540, 1420, 340, t, clamp((t - tT) / 2), "#5a6a7a"); if (t < tT) tuxCat(g, 640, 1250, 90, t); },
      titles: [[tC, "DESTROYER HMS COSSACK", "label"], [tT, "SUNK MONTHS LATER", "stamp", { size: 100 }]] });
    ev(tT, "boom", 0.5); }
  // 3 HMS Ark Royal sinks near Gibraltar → retires in Belfast
  { const tA = wt(3, "Ark"), tG = wt(3, "Gibraltar"), tBe = wt(3, "Belfast");
    S2(3, { bg: "sea", draw: (g, t) => { if (t < tBe - 0.2) { sea(g, 1300, t, -900, 2000, "#2f6f94", "#1f4f74"); g.save(); const k = clamp((t - tG) / 2); g.translate(540, 1420 + k * 80); g.rotate(k * 0.3); rect(g, -420, -60, 840, 100, "#6a6a72", 7, 8); rect(g, -440, -90, 880, 30, "#8a8a92", 6, 4); rect(g, 200, -200, 90, 120, "#6a6a72", 6, 6); g.restore(); } else { g.fillStyle = "#e9dcc0"; g.fillRect(-500, -500, 2200, 3000); rect(g, -400, 1700, 1900, 600, "#9a7a5a", 6); rect(g, 300, 1500, 480, 200, "#c0392b", 6, 30); tuxCat(g, 540, 1500, 260, t); for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.6) * 260, 1300 + Math.sin(i * 1.6) * 120, 26, (t * 0.7 + i / 4) % 1); } },
      titles: [[tA, "CARRIER HMS ARK ROYAL", "label"], [tG, "SANK NEAR GIBRALTAR", "stamp", { size: 92 }], [tBe, "RETIRED IN BELFAST", "label", { fill: "#ffe08a" }]] });
    ev(tG, "splash"); ev(tBe, "choir", 0.5); }
}
