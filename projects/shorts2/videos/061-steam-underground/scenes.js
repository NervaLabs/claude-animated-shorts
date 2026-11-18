// 061 — How the London Underground Started With Steam Trains
"use strict";
function buildShots() {
  const loco = (g, x, y, s, t) => { g.save(); g.translate(x, y); g.scale(s, s); rect(g, -220, -200, 300, 150, "#2f6f3a", 6, 30); rect(g, 60, -280, 160, 230, "#2f6f3a", 6, 8); rect(g, 80, -260, 120, 80, "#f6f0d0", 5, 6); rect(g, -160, -290, 50, 100, "#2a2a32", 5, 6); for (let i = 0; i < 3; i++) { g.save(); g.translate(-150 + i * 140, -20); g.rotate(t * 6); ell(g, 0, 0, 50, 50, "#c0392b", 6); line(g, [[-50, 0], [50, 0]], 5); g.restore(); } for (let i = 0; i < 2; i++) { rect(g, 260 + i * 340, -220, 320, 190, "#7a3a2a", 6, 10); for (let w = 0; w < 4; w++) rect(g, 280 + i * 340 + w * 74, -190, 56, 60, "#f6f0d0", 4, 4); } g.restore(); };
  const smoke = (g, x, y, t, a = 0.8, n = 6) => { for (let i = 0; i < n; i++) { const q = (t * 0.7 + i / n) % 1; g.save(); g.globalAlpha = a * (1 - q); ell(g, x + q * 120, y - q * 500, 50 + q * 120, 40 + q * 100, "#2a2628", 0); g.restore(); } };
  const tunnel = (g) => { rect(g, -400, -300, 1900, 2600, "#3a2a24", 0); g.beginPath(); g.ellipse(540, 1600, 700, 900, 0, Math.PI, 0); g.closePath(); g.fillStyle = "#1c1418"; g.fill(); for (let r = 0; r < 3; r++) { g.beginPath(); g.ellipse(540, 1600, 700 + r * 40, 900 + r * 40, 0, Math.PI, 0); g.lineWidth = 16; g.strokeStyle = "#8a4a32"; g.stroke(); } rect(g, -400, 1600, 1900, 600, "#2a2228", 0); line(g, [[-400, 1720], [1500, 1720]], 8, "#7a7e8a"); };
  // 0 hook: subway on steam
  S2(0, { bg: "dark", draw: (g, t) => { tunnel(g); loco(g, 440, 1720, 0.9, t); smoke(g, 310, 1460, t); },
    titles: [["subway", "THE FIRST SUBWAY", "stamp", { size: 110 }], ["coal-burning", "RAN ON COAL & STEAM", "label", { fill: "#ffd0a0" }]] });
  ev(wt(0, "subway"), "whistle");
  // 1 Metropolitan Railway 1863, no electric trains
  { const tM = wt(1, "Metropolitan"), tY = wt(1, "1863"), tE = wt(1, "electric");
    S2(1, { bg: "street", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 200 + i * 340, y: 1840, h: 520, expr: "happy", blink: blinkAt(t, i), t }); if (t > tE - 0.2) { rect(g, 340, 900, 400, 220, "#fff6e6", 7, 14); strokeText(g, "ELECTRIC?", 540, 990, 54, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "NOT YET", 540, 1070, 54, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tM, "THE METROPOLITAN RAILWAY", "label", { font: "Cinzel" }], [tY, "LONDON, 1863", "stamp", { size: 110 }]] });
    ev(tY, "boom", 0.4); ev(tE, "boing"); }
  // 2 cut-and-cover; vents let smoke out
  { const tD = wt(2, "trenches"), tB = wt(2, "bricked"), tV = wt(2, "vents"), tSm = wt(2, "smoke");
    S2(2, { bg: "street", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 0.95, 0]], draw: (g, t) => { rect(g, -400, 1500, 1900, 700, "#5a4a3a", 0); if (t > tD - 0.1) rect(g, 100, 1560, 880, 300, "#2a2228", 6); if (t > tB - 0.1) { g.beginPath(); g.ellipse(540, 1860, 440, 300, 0, Math.PI, 0); g.lineWidth = 30; g.strokeStyle = "#8a4a32"; g.stroke(); } if (t > tV - 0.1) { rect(g, 480, 1440, 120, 140, "#4a4a52", 6, 6); } if (t > tSm - 0.2) smoke(g, 540, 1420, t, 0.85, 8); for (let i = 0; i < 2; i++) guy(g, C.gent(i + 2), { x: 140 + i * 800, y: 1520, h: 420, dir: i ? -1 : 1, expr: t > tSm ? "sick" : "neutral", blink: 0, t, shadow: false }); },
      titles: [[tD, "DIG A TRENCH", "label"], [tB, "BRICK IT OVER", "label"], [tV, "OPEN VENTS IN THE STREET", "label", { size: 60 }], [tSm, "FOR THE CHOKING SMOKE", "stamp", { size: 90 }]] });
    ev(tD, "build"); ev(tSm, "blowout", 0.5); }
  // 3 40,000 riders day one
  { const tF = wt(3, "40,000"), tR = wt(3, "revolutionizing");
    S2(3, { bg: "street", draw: (g, t) => { crowdHeads(g, -100, 1200, 1800, 4, 7, 1.4); if (t > tF - 0.1) { rect(g, 340, 960, 400, 200, "#fff6e6", 7, 14); strokeText(g, Math.min(40000, Math.floor((t - tF) * 30000)).toLocaleString("en-US"), 540, 1060, 72, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [["soot", "DESPITE THE SOOT...", "label"], [tF, "40,000 RIDERS ON DAY ONE", "stamp", { size: 82 }], [tR, "URBAN TRANSIT, REVOLUTIONIZED", "label", { size: 56, fill: "#ffe08a" }]] });
    ev(tF, "crowd"); ev(tR, "cheer", 0.5); }
}
