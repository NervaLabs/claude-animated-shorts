// 035 — Why People in Medieval Europe Rarely Drank Plain Water
"use strict";
function buildShots() {
  const mug = (g, x, y, s, foam = 1) => { rect(g, x - 50 * s, y - 120 * s, 100 * s, 120 * s, "#9a6a3a", 5, 10 * s); for (let i = 0; i < 3; i++) line(g, [[x - 50 * s, y - 100 * s + i * 40 * s], [x + 50 * s, y - 100 * s + i * 40 * s]], 3, "#6b4024"); g.beginPath(); g.arc(x + 48 * s, y - 60 * s, 32 * s, -1.57, 1.57); g.lineWidth = 10 * s; g.strokeStyle = INK; g.stroke(); if (foam) for (let i = 0; i < 4; i++) ell(g, x - 36 * s + i * 24 * s, y - 124 * s, 18 * s * foam, 14 * s * foam, "#fff6e6", 3); };
  const germ = (g, x, y, s, t, i) => { g.save(); g.translate(x, y); g.rotate(t + i); ell(g, 0, 0, 24 * s, 20 * s, "#7ac06a", 3); for (let k = 0; k < 6; k++) line(g, [[Math.cos(k) * 22 * s, Math.sin(k) * 18 * s], [Math.cos(k) * 34 * s, Math.sin(k) * 28 * s]], 3, "#4a8a3a"); ell(g, -6 * s, -4 * s, 4 * s, 4 * s, INK, 0); ell(g, 6 * s, -4 * s, 4 * s, 4 * s, INK, 0); g.restore(); };
  // 0 hook: beer for breakfast
  S2(0, { bg: "town", blur: true, draw: (g, t) => { guy(g, C.peasant(0), { x: 280, y: 1840, h: 580, expr: "happy", armR: [1.8, -0.8], blink: blinkAt(t, 1), t }); guy(g, C.noble(1), { x: 800, y: 1840, h: 600, dir: -1, expr: "happy", armR: [1.8, -0.8], blink: blinkAt(t, 2), t }); mug(g, 420, 1330, 1.1); mug(g, 660, 1310, 1.1); if (t > wt(0, "breakfast") - 0.2) { ell(g, 540, 1650, 120, 30, "#f6f3ea", 5); ell(g, 510, 1630, 30, 22, "#f2c443", 3); } },
    titles: [["peasants", "PEASANTS & NOBLES", "label"], ["beer", "WEAK BEER...", "stamp", { size: 92 }], ["breakfast", "FOR BREAKFAST", "label", { fill: "#ffe08a" }]] }, warm(0.1));
  ev(wt(0, "breakfast"), "ding");
  // 1 contaminated water
  { const tR = wt(1, "rivers"), tC = wt(1, "contaminated");
    S2(1, { bg: "town", draw: (g, t) => { well(g, 300, 1800, 280); g.fillStyle = t > tC ? "#6a7a4a" : "#4ea3c9"; g.fillRect(-900, 1830, 2900, 300); if (t > tC - 0.2) for (let i = 0; i < 6; i++) germ(g, 200 + i * 150 + Math.sin(t * 2 + i) * 20, 1300 + (i % 3) * 140, 2.4, t, i); guy(g, C.peasant(2), { x: 820, y: 1820, h: 520, dir: -1, expr: t > tC ? "sick" : "neutral", blink: blinkAt(t, 1), t }); },
      titles: [["sewage", "NO SEWAGE SYSTEMS", "label"], [tR, "RIVERS & WELLS...", "label"], [tC, "CONTAMINATED", "stamp", { size: 120, fill: "#c8ffb0" }]] });
    ev(tC, "gasp"); }
  // 2 brewing boils water → germs die
  { const tB = wt(2, "Brewing"), tBo = wt(2, "boiling"), tK = wt(2, "killed");
    S2(2, { bg: "stone", blur: true, draw: (g, t) => { vat(g, 540, 1800, 520, 420); for (let i = 0; i < 6; i++) { const q = (t * 1.1 + i / 6) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 360 + i * 70, 1360 - q * 400, 30 + q * 30, 30 + q * 30, "#e9e4dc", 0); g.restore(); } for (let i = 0; i < 5; i++) { const dead = t > tK + i * 0.12; g.save(); if (dead) { g.globalAlpha = clamp(1 - (t - tK - i * 0.12) / 0.6); } germ(g, 380 + i * 80, 1500, 1.6, t, i); g.restore(); } for (let i = 0; i < 4; i++) flame(g, 380 + i * 100, 1820, 60, t + i); },
      titles: [[tB, "BREWING ALE", "label"], [tBo, "BOILED THE WATER FIRST", "stamp", { size: 92 }], [tK, "KILLING THE GERMS", "label", { fill: "#c8ffb0" }]] });
    ev(tBo, "bubble"); ev(tK, "pop"); }
  // 3 small beer: 1–2%, calories, everyone drank it
  { const tS = wt(3, "small"), tP = wt(3, "percent"), tH = wt(3, "hydration"), tCa = wt(3, "calories"), tL = wt(3, "laborers");
    S2(3, { bg: "farm", draw: (g, t) => { if (t < tL - 0.2) { mug(g, 540, 1500, 3.0); if (t > tP - 0.2) { rect(g, 300, 900, 480, 170, "#fff6e6", 7, 14); strokeText(g, "1–2% ALCOHOL", 540, 990, 58, { fill: "#1c1422", lw: 0, shadow: false }); } } else { for (let i = 0; i < 3; i++) guy(g, C.peasant(i), { x: 200 + i * 300, y: 1840, h: 560, expr: "happy", armR: [1.8, -0.8], blink: blinkAt(t, i), t }); guy(g, C.kid(0), { x: 960, y: 1840, h: 360, dir: -1, expr: "happy", blink: blinkAt(t, 4), t }); } },
      titles: [[tS, "“SMALL BEER”", "stamp", { size: 120 }], [tH, "SAFE HYDRATION", "label", { fill: "#cfe9ff" }], [tCa, "+ EXTRA CALORIES", "label"], [tL, "FOR EVERYONE", "stamp", { size: 110 }]] }, warm(0.1));
    ev(tS, "pour"); ev(tL, "cheer", 0.5); }
}
