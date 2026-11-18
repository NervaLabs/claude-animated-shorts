// 044 — How the Great Fire of London Stopped the Plague
"use strict";
function buildShots() {
  const fires = (g, t, n = 8, y = 1300) => { for (let i = 0; i < n; i++) flame(g, 60 + i * 130, y + (i % 2) * 60, 60 + (i % 3) * 18, t + i); };
  const dome = (g, x, y, s, melt = 0) => { rect(g, x - 220 * s, y - 300 * s, 440 * s, 300 * s, "#c9c0b0", 6); g.beginPath(); g.ellipse(x, y - 300 * s, 180 * s, 200 * s * (1 - melt * 0.4), 0, Math.PI, 0); g.fillStyle = "#8a8a96"; g.fill(); g.lineWidth = 6; g.strokeStyle = INK; g.stroke(); rect(g, x - 20 * s, y - 560 * s * (1 - melt * 0.3), 40 * s, 80 * s, "#8a8a96", 5); if (melt) for (let i = 0; i < 5; i++) rect(g, x - 160 * s + i * 80 * s, y - 300 * s, 16 * s, 80 * s * melt + i * 6, "#9a9aa8", 3, 6); };
  const brickRow = (g) => { for (let i = 0; i < 4; i++) { rect(g, 40 + i * 260, 1150, 240, 650, "#a0523a", 6); for (let r = 0; r < 14; r++) line(g, [[40 + i * 260, 1180 + r * 44], [280 + i * 260, 1180 + r * 44]], 2, "rgba(60,20,10,0.4)"); for (let r = 0; r < 3; r++) rect(g, 90 + i * 260, 1230 + r * 180, 140, 110, "#f6f0d0", 4, 4); } };
  // 0 hook: 1666, 13,000 homes
  S2(0, { bg: "town", blur: true, draw: (g, t) => { medievalTown(g, -100, 1200, 1700, 3, true); fires(g, t, 9, 1400); },
    titles: [["1666", "LONDON, 1666", "stamp", { size: 120 }], ["13,000", "13,000 HOMES DESTROYED", "label", { fill: "#ffd0a0" }], ["ten", "FEWER THAN 10 RECORDED DEATHS?", "label", { size: 54 }]] }, night(0.55));
  ev(wt(0, "1666"), "boom", 0.5); ev(1.2, "rumble", 0.6);
  // 1 4 days; St Paul's lead roof melts
  { const tF = wt(1, "four"), tP = wt(1, "Paul's"), tM = wt(1, "melting");
    S2(1, { bg: "town", keys: [[0, 540, 1300, 1.0, 0], [10, 540, 1250, 1.1, 0]], draw: (g, t) => { if (t < tM - 0.3) { medievalTown(g, -100, 1200, 1700, 2, false); fires(g, t, 9, 1350); if (t > tF - 0.2) { rect(g, 700, 800, 300, 200, "#fff6e6", 7, 14); strokeText(g, "4 DAYS", 850, 910, 64, { fill: "#c0392b", lw: 0, shadow: false }); } } else { dome(g, 540, 1700, 1.6, clamp((t - tP) / 2)); fires(g, t, 9, 1750); } },
      titles: [[tF, "FOUR DAYS OF FLAMES", "label"], ["wooden", "WOODEN BUILDINGS", "label"], [tM, "THE LEAD ROOF MELTED...", "stamp", { size: 92 }], [tP, "...OF ST PAUL'S CATHEDRAL", "label", { font: "Cinzel" }]] }, night(0.5));
    ev(tF, "rumble"); ev(tM, "pour", 0.6); }
  // 2 slums cleared that fed the plague
  { const tS = wt(2, "slums"), tPl = wt(2, "Plague");
    S2(2, { bg: "town", draw: (g, t) => { for (let i = 0; i < 5; i++) halfTimber(g, 100 + i * 220, 1800, 200, 360, "#a08a6a", "#5a4a3a"); for (let i = 0; i < 4; i++) { const x = ((t * 140 + i * 300) % 1300) - 100; ell(g, x, 1820, 28, 14, "#6a6a72", 3); } if (t > tS) { g.save(); g.globalAlpha = clamp((t - tS) / 1.5); g.fillStyle = "#3a2a2a"; g.fillRect(-500, 1300, 2100, 600); g.restore(); fires(g, t, 9, 1600); } },
      titles: [["missed", "THE TRUE TOLL WAS LIKELY HIGHER", "label", { size: 52 }], [tS, "IT BURNED THE RAT-FILLED SLUMS", "label", { size: 56, fill: "#ffd0a0" }], [tPl, "THAT FED THE GREAT PLAGUE", "stamp", { size: 82 }]] }, night(0.25));
    ev(tS, "rumble"); }
  // 3 rebuilt in brick and stone; plague ends
  { const tB = wt(3, "brick"), tE = wt(3, "ending");
    S2(3, { bg: "town", draw: (g, t) => { brickRow(g); for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 200 + i * 340, y: 1860, h: 480, expr: "happy", blink: blinkAt(t, i), t }); },
      titles: [[tB, "REBUILT IN BRICK & STONE", "stamp", { size: 86 }], [tE, "NO MORE BUBONIC OUTBREAKS", "label", { size: 56, fill: "#c8ffb0" }]] });
    ev(tB, "build"); ev(tE, "choir", 0.5); }
}
