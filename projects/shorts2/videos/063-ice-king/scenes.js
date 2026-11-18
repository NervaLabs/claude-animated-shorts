// 063 — Why Ice Was Once Harvested From Frozen Ponds and Shipped to India
"use strict";
function buildShots() {
  const TUD = { ...C.gent(1), tunic: "#2a2a3a", trim: "#d9d9e6", helmet: "tophat", hatCol: "#1c1422", hair: "#5a3a24" };
  const block = (g, x, y, s, a = 1) => { g.save(); g.globalAlpha = a; rect(g, x - 70 * s, y - 70 * s, 140 * s, 140 * s, "#cfe9ff", 5, 10 * s); line(g, [[x - 40 * s, y - 40 * s], [x - 10 * s, y - 50 * s]], 5 * s, "#ffffff"); g.restore(); };
  // 0 hook: ship lake ice halfway around the world
  S2(0, { bg: "lake", blur: true, draw: (g, t) => { for (let i = 0; i < 6; i++) block(g, 200 + (i % 3) * 170, 1700 - Math.floor(i / 3) * 140, 1.1); sailShip(g, { x: 820, y: 1700, h: 300, t, dir: -1, seed: 3 }); },
    titles: [["refrigerators", "BEFORE FRIDGES...", "label"], ["ice", "AMERICA SHIPPED POND ICE", "stamp", { size: 86 }], ["halfway", "HALFWAY AROUND THE WORLD", "label", { fill: "#cfe9ff" }]] }, night(0.1));
  ev(wt(0, "ice"), "crack");
  // 1 1806 Frederic Tudor, "Ice King", sawdust, ships
  { const tY = wt(1, "1806"), tF = wt(1, "Frederic"), tK = wt(1, "King"), tS = wt(1, "sawdust"), tSh = wt(1, "ships");
    S2(1, { bg: "lake", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => { if (t < tS - 0.2) { guy(g, { ...TUD, helmet: "crown" }, { x: 540, y: 1840, h: 660, expr: "proud", blink: blinkAt(t, 1), t }); if (t > tK - 0.2) for (let i = 0; i < 2; i++) guy(g, C.gent(i + 2), { x: 160 + i * 760, y: 1840, h: 500, dir: i ? -1 : 1, expr: "laugh", blink: 0, t }); } else if (t < tSh - 0.2) { rect(g, 260, 1300, 560, 520, "#c9a06a", 7, 10); for (let i = 0; i < 40; i++) ell(g, 280 + rnd(i) * 520, 1320 + rnd(i * 3) * 480, 6, 4, "#e9c88a", 0); block(g, 540, 1560, 1.6); } else { sea(g, 1300, t, -900, 2000, "#3f7fa4", "#1f5f84"); sailShip(g, { x: 540, y: 1500, h: 460, t, hull: "#6b4024", sail: "#f6f3ea", seed: 2 }); for (let i = 0; i < 3; i++) block(g, 420 + i * 120, 1460, 0.6); } },
      titles: [[tY, "1806, BOSTON", "stamp", { size: 110 }], [tF, "FREDERIC TUDOR", "label", { font: "Cinzel" }], [tK, "MOCKED AS THE “ICE KING”", "label", { fill: "#cfe9ff" }], [tS, "PACKED IN SAWDUST", "stamp", { size: 96 }], [tSh, "LOADED ONTO WOODEN SHIPS", "label"]] }, night(0.1));
    ev(tY, "boom", 0.4); ev(tK, "laugh", 0.6); ev(tSh, "splash"); }
  // 2 4-month voyage across the equator to Calcutta → fortune
  { const tSk = wt(2, "skeptics"), tF = wt(2, "four-month"), tE = wt(2, "equator"), tC = wt(2, "Calcutta"), tFo = wt(2, "fortune");
    S2(2, { bg: "sea", draw: (g, t) => { if (t < tC - 0.2) { sea(g, 1300, t, -900, 2000, "#2fa0c8", "#1f6f9a"); sunStar(g, 880, 700, 110, "#ffcf4a"); sailShip(g, { x: 480, y: 1500, h: 420, t, hull: "#6b4024", sail: "#f6f3ea", seed: 4 }); if (t > tE - 0.2) { g.save(); g.setLineDash([30, 20]); line(g, [[-400, 1600], [1500, 1600]], 6, "#ffe08a"); g.restore(); } if (t > tF - 0.2) { rect(g, 700, 1000, 320, 160, "#fff6e6", 7, 14); strokeText(g, "4 MONTHS", 860, 1085, 54, { fill: "#1c1422", lw: 0, shadow: false }); } } else { g.fillStyle = "#f2c88a"; g.fillRect(-500, -500, 2200, 3000); temple(g, 540, 1500, 700, 400, 6, "#f0e0c0", "#c9a07a", 6); block(g, 540, 1700, 1.6); guy(g, TUD, { x: 220, y: 1840, h: 600, expr: "laugh", blink: blinkAt(t, 1), t }); if (t > tFo - 0.2) for (let i = 0; i < 8; i++) { const q = (t * 0.9 + i / 8) % 1; ell(g, 600 + i * 50, 900 + q * 900, 16, 16, "#f2c443", 3); } } },
      titles: [[tSk, "“HE'S CRAZY!”", "label", { fill: "#ffd0c0" }], [tF, "A 4-MONTH VOYAGE", "label"], [tE, "ACROSS THE EQUATOR", "label", { fill: "#ffe08a" }], [tC, "THE ICE SURVIVED: CALCUTTA", "stamp", { size: 80 }], [tFo, "A FORTUNE", "label", { fill: "#ffe08a" }]] });
    ev(tE, "whoosh"); ev(tC, "choir", 0.5); ev(tFo, "coins"); }
}
