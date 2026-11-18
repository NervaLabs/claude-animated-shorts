// 024 — The Ancient City Carved Entirely Into Pink Cliffs
"use strict";
function buildShots() {
  const NAB = (i) => ({ tunic: ["#d9c08a", "#c98a5a", "#9a6a4a"][i % 3], trim: "#7a3a2a", helmet: "turban", hatCol: ["#f3ecda", "#c0392b"][i % 2], skin: ["#c99067", "#b97a4a"][i % 2], beard: "#2a1a14", robe: true });
  const facade = (g, x, y, s, k = 1) => { g.save(); g.beginPath(); g.rect(x - 400 * s, y - 900 * s * k, 800 * s, 900 * s * k + 10); g.clip(); rect(g, x - 360 * s, y - 860 * s, 720 * s, 860 * s, "#d98a7a", 7, 6); temple(g, x, y, 560 * s, 380 * s, 6, "#e9a090", "#c97a6a", 5); poly(g, [[x - 200 * s, y - 640 * s], [x, y - 760 * s], [x + 200 * s, y - 640 * s]], "#e9a090", 5); rect(g, x - 70 * s, y - 860 * s, 140 * s, 220 * s, "#e9a090", 5, 60 * s); g.restore(); };
  // 0 hook
  S2(0, { bg: "canyon", draw: (g, t) => { facade(g, 540, 1400, 1.0); }, titles: [["Jordan", "JORDAN", "label", { font: "Cinzel" }], ["carved", "A CITY CARVED INTO CLIFFS", "stamp", { size: 82 }]] });
  ev(wt(0, "carved"), "boom", 0.5);
  // 1 300 BC: the Nabataeans build Petra
  { const tY = wt(1, "300"), tN = wt(1, "Nabataeans"), tP = wt(1, "Petra");
    S2(1, { bg: "canyon", draw: (g, t) => { facade(g, 540, 1400, 1.0, clamp(0.2 + (t - S(1)) / 5)); for (let i = 0; i < 3; i++) guy(g, NAB(i), { x: 220 + i * 320, y: 1840, h: 480, expr: "determined", armR: [1.8 + Math.abs(Math.sin(t * 8 + i)) * 0.8, -0.6], blink: blinkAt(t, i), t }); },
      titles: [[tY, "~300 BC", "stamp", { size: 140 }], [tN, "THE NABATAEANS", "label", { font: "Cinzel" }], [tP, "PETRA", "stamp", { size: 140, fill: "#ffc0a8" }]] });
    ev(tY, "boom", 0.5); ev(tN, "build"); }
  // 2 rose-red facades + hidden water system → oasis
  { const tR = wt(2, "rose-red"), tD = wt(2, "dams"), tC = wt(2, "cisterns"), tPi = wt(2, "pipes"), tF = wt(2, "floods"), tO = wt(2, "oasis");
    S2(2, { bg: "canyon", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1350, 0.9, 0]], draw: (g, t) => {
      facade(g, 540, 1400, 0.8);
      if (t > tD - 0.1) rect(g, 100, 1450, 300, 90, "#b97a6a", 5, 6);
      if (t > tC - 0.1) ell(g, 860, 1520, 120, 50, "#4ea3c9", 5);
      if (t > tPi - 0.1) { line(g, [[400, 1500], [740, 1520]], 18, INK); line(g, [[400, 1500], [740, 1520]], 12, "#c98a5a"); }
      if (t > tF - 0.1 && t < tO) { const q = clamp((t - tF) / 1.2); g.fillStyle = "#4ea3c9"; g.fillRect(-900, 1650 - q * 100, 2900, 900); }
      if (t > tO - 0.2) { for (let i = 0; i < 4; i++) palm(g, 100 + i * 280, 1780, 260, 5, t); ell(g, 540, 1800, 200, 50, "#4ea3c9", 5); for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; ell(g, 540 + (i - 1) * 30, 1780 - Math.sin(q * Math.PI) * 120, 8, 12, "#bfe9ff", 2); } }
    },
      titles: [[tR, "CARVED FROM ROSE-RED ROCK", "label", { fill: "#ffc0a8" }], [tD, "DAMS", "label", { fill: "#cfe9ff" }], [tC, "CISTERNS", "label", { fill: "#cfe9ff" }], [tPi, "CERAMIC PIPES", "label"], [tF, "CAPTURED FLASH FLOODS", "stamp", { size: 82 }], [tO, "A DESERT OASIS", "stamp", { size: 100 }]] });
    ev(tF, "splash"); ev(tO, "choir", 0.6); }
}
