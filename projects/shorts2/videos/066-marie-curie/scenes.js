// 066 — The First Woman to Win a Nobel Prize, Twice
"use strict";
function buildShots() {
  const MC = { ...C.lady(2), tunic: "#1c1422", trim: "#3a3040", hair: "#8a6a4a" };
  const medal = (g, x, y, r, k = 1) => { g.save(); g.translate(x, y); g.scale(k, k); poly(g, [[-r * 0.5, -r * 1.6], [0, -r * 0.9], [r * 0.5, -r * 1.6]], "#2f4f9f", 4); ell(g, 0, 0, r, r, "#f2c443", 6); ell(g, 0, 0, r * 0.7, r * 0.7, "#e2b04a", 3); g.restore(); };
  const tube = (g, x, y, s, t) => { rect(g, x - 16 * s, y - 100 * s, 32 * s, 100 * s, "#cfe9ff", 4, 16 * s); rect(g, x - 12 * s, y - 50 * s, 24 * s, 46 * s, "#7affb0", 0, 12 * s); g.save(); g.globalAlpha = 0.35 + 0.2 * Math.sin(t * 4); ell(g, x, y - 30 * s, 50 * s, 50 * s, "#7affb0", 0); g.restore(); };
  // 0 hook
  S2(0, { bg: "lab", blur: true, draw: (g, t) => { guy(g, MC, { x: 540, y: 1840, h: 680, expr: "proud", blink: blinkAt(t, 1), t }); medal(g, 260, 1200, 70); medal(g, 820, 1200, 70); },
    titles: [["Marie", "MARIE CURIE", "label", { font: "Cinzel" }], ["two", "NOBELS IN TWO SCIENCES", "stamp", { size: 92 }], ["only", "STILL THE ONLY ONE", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "two"), "choir", 0.5);
  // 1 1903 physics, 1911 chemistry
  { const tP = wt(1, "Physics"), tC = wt(1, "Chemistry"), tR = wt(1, "radium");
    S2(1, { bg: "lab", draw: (g, t) => { guy(g, MC, { x: 300, y: 1840, h: 640, expr: "happy", blink: blinkAt(t, 1), t }); if (t > tP - 0.2) { medal(g, 680, 1200, 80, clamp((t - tP + 0.2) / 0.3)); strokeText(g, "PHYSICS 1903", 680, 1360, 40, { fill: "#fff" }); } if (t > tC - 0.2) { medal(g, 900, 1200, 80, clamp((t - tC + 0.2) / 0.3)); strokeText(g, "CHEM 1911", 900, 1360, 40, { fill: "#fff" }); } if (t > tR - 0.2) { tube(g, 720, 1700, 1.6, t); tube(g, 860, 1700, 1.6, t + 1); } },
      titles: [[tP, "1903: PHYSICS — RADIOACTIVITY", "label", { size: 56 }], [tC, "1911: CHEMISTRY", "stamp", { size: 96 }], [tR, "RADIUM & POLONIUM", "label", { fill: "#c8ffb0" }]] });
    ev(tP, "ding"); ev(tC, "ding"); }
  // 2 glowing tubes in her pockets
  { const tT = wt(2, "test"), tU = wt(2, "unaware");
    S2(2, { bg: "lab", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1400, 1.18, 0]], draw: (g, t) => { guy(g, MC, { x: 540, y: 1840, h: 700, expr: "calm", blink: blinkAt(t, 1), t }); tube(g, 640, 1640, 1.0, t); tube(g, 680, 1650, 1.0, t + 2); },
      titles: [[tT, "GLOWING TUBES IN HER POCKETS", "label", { size: 58, fill: "#c8ffb0" }], [tU, "UNAWARE OF THE DANGER", "stamp", { size: 92 }]] });
    ev(tT, "sparkle"); ev(tU, "heartbeat", 0.5); }
  // 3 notebooks still radioactive; lead-lined boxes
  { const tN = wt(3, "notebooks"), tL = wt(3, "lead-lined");
    S2(3, { bg: "library", blur: true, draw: (g, t) => { rect(g, 300, 1200, 480, 600, "#7a7e8a", 8, 14); if (t < tL - 0.2) { rect(g, 360, 1300, 360, 440, "#c9a07a", 6, 8); g.save(); g.globalAlpha = 0.3 + 0.15 * Math.sin(t * 5); ell(g, 540, 1500, 330, 330, "#7affb0", 0); g.restore(); } else { rect(g, 300, 1200, 480, 600, "#5a5e6a", 8, 14); strokeText(g, "Pb", 540, 1530, 160, { fill: "#d9dde6", lw: 0, shadow: false }); } },
      titles: [[tN, "HER 1890s NOTEBOOKS", "label"], ["radioactive", "STILL RADIOACTIVE", "stamp", { size: 100, fill: "#c8ffb0" }], [tL, "KEPT IN LEAD-LINED BOXES", "label"]] });
    ev(tN, "drone"); ev(tL, "clank"); }
}
