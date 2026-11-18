// 050 — Why Queen Elizabeth I Wore Toxic White Makeup
"use strict";
function buildShots() {
  const E1 = (skin = "#f6f3ee") => ({ ...C.queen, hair: "#c8502a", tunic: "#f6f3ea", trim: "#c9a35a", cape: "#3a1a4a", skin });
  const pot = (g, x, y, s) => { rect(g, x - 70 * s, y - 90 * s, 140 * s, 90 * s, "#d9dde6", 6, 14 * s); ell(g, x, y - 90 * s, 70 * s, 18 * s, "#f6f6f6", 5); };
  const skull = (g, x, y, s) => { ell(g, x, y, 40 * s, 36 * s, "#f6f3ea", 4); rect(g, x - 22 * s, y + 20 * s, 44 * s, 24 * s, "#f6f3ea", 4, 6); ell(g, x - 14 * s, y - 2 * s, 9 * s, 10 * s, INK, 0); ell(g, x + 14 * s, y - 2 * s, 9 * s, 10 * s, INK, 0); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { guy(g, E1(), { x: 540, y: 1840, h: 700, expr: "proud", blink: blinkAt(t, 1), t }); if (t > wt(0, "poisoning") - 0.2) { pot(g, 840, 1600, 1.3); skull(g, 840, 1440, 1.1); } },
    titles: [["Elizabeth", "QUEEN ELIZABETH I", "label", { font: "Cinzel" }], ["pale", "THAT FAMOUS PALE FACE...", "label"], ["poisoning", "WAS POISONING HER", "stamp", { size: 100, fill: "#c8ffb0" }]] });
  ev(wt(0, "poisoning"), "sting", 0.6);
  // 1 smallpox 1562 → Venetian ceruse (vinegar + white lead)
  { const tS = wt(1, "smallpox"), tC = wt(1, "Venetian"), tV = wt(1, "vinegar"), tL = wt(1, "lead");
    S2(1, { bg: "palace", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.06, 0]], draw: (g, t) => { if (t < tC - 0.2) { guy(g, E1("#f2d3a8"), { x: 540, y: 1840, h: 680, expr: "sad", blink: blinkAt(t, 1), t }); } else { guy(g, E1(t > tC + 0.6 ? "#f6f3ee" : "#f2d3a8"), { x: 320, y: 1840, h: 640, expr: "calm", armR: [2.4 + Math.sin(t * 6) * 0.2, -0.9], blink: blinkAt(t, 1), t }); pot(g, 760, 1640, 1.6); if (t > tV - 0.1) { rect(g, 860, 1380, 70, 140, "#a07a5a", 5, 10); strokeText(g, "VINEGAR", 895, 1560, 26, { fill: "#fff", lw: 0, shadow: false }); } if (t > tL - 0.1) { rect(g, 600, 1400, 140, 90, "#9a9aa8", 5, 6); strokeText(g, "Pb", 670, 1460, 50, { fill: "#1c1422", lw: 0, shadow: false }); } } },
      titles: [[tS, "SURVIVED SMALLPOX · 1562", "label", { size: 60 }], [tC, "“VENETIAN CERUSE”", "stamp", { size: 92 }], [tV, "VINEGAR", "label"], [tL, "+ TOXIC WHITE LEAD", "label", { fill: "#c8ffb0" }]] });
    ev(tS, "boom", 0.4); ev(tC, "sparkle"); ev(tL, "drone"); }
  // 2 decades of damage → thicker layers
  { const tH = wt(2, "hair"), tT = wt(2, "teeth"), tG = wt(2, "grey"), tTh = wt(2, "thicker");
    S2(2, { bg: "palace", blur: true, draw: (g, t) => { const grey = t > tG - 0.1 ? "#d9dad6" : "#f6f3ee"; const q = { ...E1(grey), hair: t > tH - 0.1 ? "#9a6a4a" : "#c8502a" }; guy(g, q, { x: 540, y: 1840, h: 700, expr: t > tT ? "sad" : "calm", blink: blinkAt(t, 1), t }); if (t > tTh - 0.1) { for (let i = 0; i < 3; i++) { const k = clamp((t - tTh - i * 0.3) / 0.3); g.save(); g.globalAlpha = 0.5 * k; ell(g, 540, 1180, 140 + i * 10, 150 + i * 10, "#ffffff", 0); g.restore(); } } },
      titles: [["decades", "OVER THE DECADES...", "label"], [tH, "HAIR LOSS", "label", { fill: "#ffd0c0" }], [tT, "BLACKENED TEETH", "label", { fill: "#ffd0c0" }], [tG, "GREY SKIN", "label", { fill: "#ffd0c0" }], [tTh, "THICKER LAYERS EVERY DAY", "stamp", { size: 86 }]] });
    ev(tH, "pop"); ev(tT, "pop"); ev(tG, "pop"); ev(tTh, "sad"); }
}
