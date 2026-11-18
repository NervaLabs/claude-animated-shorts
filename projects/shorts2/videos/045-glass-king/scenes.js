// 045 — The King Who Thought He Was Made of Glass
"use strict";
function buildShots() {
  const C6 = { ...C.king, tunic: "#2f4f9f", trim: "#e2b64b", cape: "#1f2f6f", hair: "#c9a35a" };
  const glassy = (g, x, y, h, t, alpha = 0.55) => { g.save(); g.globalAlpha = alpha; ell(g, x, y - h * 0.62, h * 0.32, h * 0.62, "#cfe9ff", 0); g.restore(); for (let i = 0; i < 3; i++) sparkle(g, x + (i - 1) * h * 0.2, y - h * (0.4 + i * 0.2), h * 0.05, (t * 0.7 + i / 3) % 1); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { guy(g, C6, { x: 540, y: 1840, h: 680, expr: "scared", armR: [0.6, 0.3], armL: [-0.6, -0.3], blink: blinkAt(t, 1), t }); glassy(g, 540, 1840, 680, t); },
    titles: [["Sixth", "KING CHARLES VI OF FRANCE", "label", { font: "Cinzel", size: 60 }], ["touch", "“DON'T TOUCH ME!”", "stamp", { size: 110 }], ["glass", "HE THOUGHT HE WAS GLASS", "label", { fill: "#cfe9ff" }]] });
  ev(wt(0, "touch"), "gasp"); ev(wt(0, "glass"), "sparkle");
  // 1 "Charles the Mad": terrified of shattering
  { const tM = wt(1, "Mad"), tS = wt(1, "shatter"), tW = wt(1, "wall");
    S2(1, { bg: "palace", draw: (g, t) => { const x = lerp(300, 720, clamp((t - S(1)) / 3)); guy(g, C6, { x, y: 1840, h: 640, expr: t > tS ? "scared" : "nervous", walk: t * 0.8, blink: blinkAt(t, 1), t }); rect(g, 880, 900, 200, 1000, "#c9b08a", 7); if (t > tS - 0.1) { g.save(); g.globalAlpha = 0.85; for (let i = 0; i < 6; i++) line(g, [[x, 1500], [x + Math.cos(i) * 220, 1500 + Math.sin(i) * 220]], 6, "#cfe9ff"); g.restore(); } },
      titles: [[tM, "“CHARLES THE MAD”", "stamp", { size: 100 }], [tS, "AFRAID HE'D SHATTER", "label", { fill: "#cfe9ff" }], [tW, "...BY BUMPING A WALL", "label"]] });
    ev(tM, "sting", 0.5); ev(tS, "shatter", 0.7); }
  // 2 iron rods in clothes, blankets before sitting
  { const tR = wt(2, "rods"), tB = wt(2, "blankets");
    S2(2, { bg: "palace", blur: true, draw: (g, t) => { if (t < tB - 0.2) { guy(g, C6, { x: 540, y: 1840, h: 680, expr: "determined", blink: blinkAt(t, 1), t }); if (t > tR - 0.1) for (let i = 0; i < 4; i++) { const k = clamp((t - tR - i * 0.15) / 0.3); g.save(); g.globalAlpha = k; rect(g, 440 + i * 60, 1420, 16, 360, "#7a7e8a", 4, 4); g.restore(); } } else { rect(g, 360, 1500, 360, 60, "#8a3a2a", 6, 8); rect(g, 380, 1560, 30, 280, "#6b4024", 5); rect(g, 670, 1560, 30, 280, "#6b4024", 5); for (let i = 0; i < 4; i++) ell(g, 540, 1460 - i * 110, 230 - i * 20, 70, ["#c9a07a", "#9ab0c8", "#c98a7a", "#a0b88a"][i], 6); ell(g, 540, 1040, 80, 80, "#f2d3a8", 6); ell(g, 515, 1030, 8, 10, INK, 0); ell(g, 565, 1030, 8, 10, INK, 0); } },
      titles: [[tR, "IRON RODS SEWN INTO HIS CLOTHES", "label", { size: 54 }], [tB, "WRAPPED IN BLANKETS TO SIT", "stamp", { size: 80 }]] });
    ev(tR, "clank"); ev(tB, "pop"); }
  // 3 the "glass delusion"
  { const tG = wt(3, "glass"), tSe = wt(3, "several");
    S2(3, { bg: "castleNight", draw: (g, t) => { for (let i = 0; i < 3; i++) { guy(g, C.noble(i), { x: 220 + i * 320, y: 1840, h: 540, expr: "scared", blink: blinkAt(t, i), t }); if (t > tSe - 0.2) glassy(g, 220 + i * 320, 1840, 540, t + i, 0.45); } },
      titles: [[tG, "THE “GLASS DELUSION”", "stamp", { size: 100, fill: "#cfe9ff" }], [tSe, "IT STRUCK SEVERAL NOBLES", "label"]] });
    ev(tG, "sparkle"); }
}
