// 071 — How London Solved the "Great Stink" of 1858
"use strict";
function buildShots() {
  const MP = (i) => ({ ...C.gent(i), helmet: "tophat", hatCol: "#1c1422" });
  const BAZ = { ...C.gent(1), tunic: "#2a2a3a", hair: "#3a2a1a", beard: "#3a2a1a", helmet: "tophat", hatCol: "#1c1422" };
  const stink = (g, t, k = 1, y0 = 1500) => { for (let i = 0; i < 8; i++) { const q = (t * 0.4 + i / 8) % 1; g.save(); g.globalAlpha = 0.6 * k * (1 - q); g.beginPath(); for (let s = 0; s <= 10; s++) { const y = y0 - q * 700 - s * 30, x = 80 + i * 130 + Math.sin(s * 0.9 + t * 2 + i) * 24; s ? g.lineTo(x, y) : g.moveTo(x, y); } g.lineWidth = 12; g.strokeStyle = "#8aa04a"; g.stroke(); g.restore(); } };
  const river = (g, t, col = "#6a6a3a") => { g.fillStyle = col; g.fillRect(-500, 1600, 2200, 700); for (let i = 0; i < 6; i++) line(g, [[-100 + ((t * 40 + i * 230) % 1400), 1700 + (i % 3) * 80], [20 + ((t * 40 + i * 230) % 1400), 1700 + (i % 3) * 80]], 6, "rgba(40,40,20,0.5)"); };
  const parl = (g) => { rect(g, 100, 900, 880, 700, "#c9b07a", 7); for (let i = 0; i < 7; i++) rect(g, 140 + i * 120, 1000, 60, 400, "#a08a5a", 4, 4); rect(g, 820, 500, 160, 1100, "#c9b07a", 7); poly(g, [[820, 500], [900, 360], [980, 500]], "#5a5a66", 6); ell(g, 900, 640, 50, 50, "#f6f0d0", 5); };
  // 0 hook
  S2(0, { bg: "street", blur: true, draw: (g, t) => { parl(g); river(g, t); stink(g, t, 1, 1600); },
    titles: [["Parliament", "PARLIAMENT NEARLY FLED LONDON", "label", { size: 58 }], ["smelled", "THE THAMES STANK", "stamp", { size: 110, fill: "#c8ffb0" }]] });
  ev(wt(0, "smelled"), "grumble");
  // 1 sewage + heatwave = boiling cesspool
  { const tT = wt(1, "two"), tSe = wt(1, "sewage"), tH = wt(1, "heatwave"), tC = wt(1, "cesspool");
    S2(1, { bg: "street", keys: [[0, 540, 1300, 1.0, 0], [12, 540, 1350, 1.08, 0]], draw: (g, t) => { river(g, t, t > tC ? "#5a5a2a" : "#6a6a3a"); if (t > tSe - 0.2) for (let i = 0; i < 5; i++) { rect(g, 60 + i * 220, 1400, 50, 220, "#6a6a72", 5, 4); g.save(); g.globalAlpha = 0.7; rect(g, 72 + i * 220, 1600, 26, 40 + Math.sin(t * 5 + i) * 10, "#6a5a2a", 0, 8); g.restore(); } if (t > tH - 0.2) sunStar(g, 880, 700, 130, "#ff9a3a"); if (t > tC - 0.2) { stink(g, t, 1.2, 1650); for (let i = 0; i < 6; i++) { const q = (t * 1.5 + i / 6) % 1; ell(g, 100 + i * 170, 1700 - q * 40, 14 * (1 - q), 14 * (1 - q), "#8a8a4a", 2); } } },
      titles: [[tT, "2,000,000 RESIDENTS", "label"], [tSe, "RAW SEWAGE → THE RIVER", "label", { fill: "#ffd0c0" }], [tH, "+ A SUMMER HEATWAVE", "stamp", { size: 92, fill: "#ffd0a0" }], [tC, "A BOILING CESSPOOL", "label", { fill: "#c8ffb0" }]] }, warm(0.2));
    ev(tSe, "splash", 0.5); ev(tC, "bubble"); }
  // 2 curtains soaked in chloride of lime
  { const tC = wt(2, "curtains"), tB = wt(2, "breathe");
    S2(2, { bg: "palace", draw: (g, t) => { for (let i = 0; i < 2; i++) { rect(g, 60 + i * 760, 700, 260, 1100, "#e9e4c8", 6, 10); for (let k = 0; k < 4; k++) line(g, [[90 + i * 760 + k * 60, 720], [90 + i * 760 + k * 60, 1780]], 3, "rgba(80,80,40,0.3)"); } for (let i = 0; i < 3; i++) guy(g, MP(i), { x: 330 + i * 210, y: 1840, h: 520, expr: t > tB ? "sick" : "neutral", armL: [-2.4, 0.6], blink: blinkAt(t, i), t }); stink(g, t, 0.5, 1800); },
      titles: [["Politicians", "INSIDE PARLIAMENT...", "label"], [tC, "CURTAINS SOAKED IN LIME", "stamp", { size: 86 }], [tB, "JUST TO BREATHE", "label", { fill: "#c8ffb0" }]] });
    ev(tC, "pour"); ev(tB, "gasp", 0.6); }
  // 3 Bazalgette's 1,100 miles of sewers
  { const tW = wt(3, "weeks"), tJ = wt(3, "Joseph"), tM = wt(3, "1,100"), tS = wt(3, "still");
    S2(3, { bg: "street", draw: (g, t) => { if (t < tM - 0.2) { guy(g, BAZ, { x: 320, y: 1840, h: 640, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); scroll(g, 760, 1360, 360, 480, "SEWERS", 5, 0.04); } else { rect(g, -400, -300, 1900, 2600, "#4a3a2a", 0); for (let r = 0; r < 4; r++) { g.beginPath(); g.ellipse(540, 1500, 520 - r * 110, 560 - r * 120, 0, Math.PI, 0); g.lineWidth = 34; g.strokeStyle = r % 2 ? "#a0523a" : "#8a4a32"; g.stroke(); } rect(g, -400, 1500, 1900, 800, "#3a3a2a", 0); g.fillStyle = "#5a6a5a"; g.fillRect(140, 1500, 800, 80); } },
      titles: [[tW, "WITHIN WEEKS...", "label"], [tJ, "JOSEPH BAZALGETTE", "label", { font: "Cinzel" }], [tM, "1,100 MILES OF SEWERS", "stamp", { size: 92 }], [tS, "STILL IN USE TODAY", "label", { fill: "#ffe08a" }]] });
    ev(tJ, "ding"); ev(tM, "build"); }
}
