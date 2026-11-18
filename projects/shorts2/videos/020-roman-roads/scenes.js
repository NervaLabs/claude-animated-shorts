// 020 — The Roman Road System Still Shapes Europe Today
"use strict";
function buildShots() {
  const road = (g, t, asphalt = 0) => { poly(g, [[440, 1250], [640, 1250], [1300, 2400], [-220, 2400]], "#b9b2a2", 6, false); for (let r = 0; r < 14; r++) { const y = 1260 + r * r * 6, w = 100 + r * 60; for (let i = -4; i <= 4; i++) rect(g, 540 - w + (i + 4) * w / 4.5, y, w / 4.6, 12 + r * 2, null, 1.5); } if (asphalt > 0) { g.save(); g.globalAlpha = asphalt; poly(g, [[450, 1250], [630, 1250], [1280, 2400], [-200, 2400]], "#3a3a40", 0, false); for (let r = 0; r < 8; r++) rect(g, 536, 1280 + r * r * 18, 8, 30 + r * 10, "#f2efe6", 0); g.restore(); } };
  // 0 hook: modern highway = Roman road
  S2(0, { bg: "farm", draw: (g, t) => { road(g, t, clamp((t - 2) / 2) * 0.85); if (t < 3) for (let i = 0; i < 3; i++) guy(g, C.legion, { x: 380 + i * 160, y: 1700 + i * 60, h: 300, expr: "determined", walk: t * 2, hold: { r: "spear" }, spearAng: -1.4, blink: 0, t }); else truck(g, { x: 540 + Math.sin(t) * 40, y: 1800, h: 260, col: "#3e78c2" }); },
    titles: [["highways", "TODAY'S HIGHWAYS...", "label"], ["blueprints", "...FOLLOW ROMAN BLUEPRINTS", "stamp", { size: 80 }]] });
  ev(2, "whoosh", 0.5);
  // 1 50,000 miles, Scotland to Iraq
  { const tF = wt(1, "50,000"), tS = wt(1, "Scotland"), tI = wt(1, "Iraq");
    S2(1, { bg: "map", draw: (g, t) => { rect(g, 80, 700, 920, 900, "#efdcb0", 8, 10); g.save(); g.beginPath(); g.rect(90, 710, 900, 880); g.clip(); g.fillStyle = "#79b2cf"; g.fillRect(90, 710, 900, 880); poly(g, [[90, 760], [300, 720], [420, 900], [700, 1000], [990, 900], [990, 1590], [90, 1590]], "#efdcb0", 5, true); poly(g, [[180, 760], [240, 730], [260, 860], [200, 880]], "#efdcb0", 5, true); g.restore(); const k = clamp((t - tF + 0.3) / 3); const pts = [[220, 760], [260, 880], [330, 1000], [420, 1120], [520, 1180], [640, 1160], [760, 1220], [900, 1250]]; g.save(); g.setLineDash([16, 10]); g.beginPath(); pts.forEach(([x, y], i) => { if (i / (pts.length - 1) <= k) i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.lineWidth = 10; g.strokeStyle = "#a8121c"; g.stroke(); g.restore(); if (t > tS) { ell(g, 220, 760, 14, 14, "#fff", 4); strokeText(g, "SCOTLAND", 300, 720, 40, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); } if (t > tI) { ell(g, 900, 1250, 14, 14, "#fff", 4); strokeText(g, "IRAQ", 900, 1310, 40, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); } },
      titles: [[tF, "50,000+ MILES OF ROAD", "stamp", { size: 92 }], [tS, "FROM SCOTLAND...", "label"], [tI, "...TO IRAQ", "label", { fill: "#ffe08a" }]] });
    ev(tF, "boom", 0.5); }
  // 2 how they built it: layers
  { const tD = wt(2, "trenches"), tC = wt(2, "crushed"), tG = wt(2, "gravel"), tDr = wt(2, "drainage"), tCr = wt(2, "crowned");
    S2(2, { bg: "dark", draw: (g, t) => { const L = [[tD, "#5a4a3a", "TRENCH"], [tC, "#8a8278", "CRUSHED STONE"], [tG, "#b9b2a2", "GRAVEL"], [tCr, "#c9c2b2", "PAVING STONES"]]; L.forEach(([tt, col, lab], i) => { if (t < tt - 0.1) return; const y = 1600 - i * 130; g.save(); g.beginPath(); g.moveTo(140, y + 130); g.lineTo(140, y); if (i === 3) g.quadraticCurveTo(540, y - 80, 940, y); else g.lineTo(940, y); g.lineTo(940, y + 130); g.closePath(); fillInk(g, col, 5); g.restore(); strokeText(g, lab, 540, y + 65, 40, { fill: "#fff" }); }); if (t > tDr) { for (const x of [100, 980]) rect(g, x - 30, 1250, 60, 480, "#4ea3c9", 5, 6); } if (t > tCr) for (let i = 0; i < 6; i++) { const q = (t * 1.2 + i / 6) % 1; ell(g, 300 + i * 100 + (i < 3 ? -q * 160 : q * 160), 1100 + q * 60, 8, 12, "#5ac8f0", 2); } },
      titles: [[tD, "DEEP TRENCHES", "label"], [tC, "CRUSHED STONE", "label"], [tG, "GRAVEL", "label"], [tDr, "DRAINAGE DITCHES", "label", { fill: "#cfe9ff" }], [tCr, "CROWNED: RAIN RUNS OFF", "stamp", { size: 80 }]] });
    ev(tD, "build"); ev(tCr, "splash", 0.4); }
  // 3 asphalt paved right on top
  { const tB = wt(3, "Britain"), tP = wt(3, "paved");
    S2(3, { bg: "farm", draw: (g, t) => { road(g, t, clamp((t - tP + 0.3) / 1)); if (t > tP) truck(g, { x: 560, y: 1820, h: 260, col: "#c0392b" }); },
      titles: [[tB, "BRITAIN · FRANCE · ITALY", "label", { size: 60 }], [tP, "ASPHALT ON TOP OF ROME", "stamp", { size: 82 }]] });
    ev(tP, "whoosh"); }
}
