// 074 — How a Volcano Created the Most Famous Scream in Art
"use strict";
function buildShots() {
  const MUNCH = { ...C.artist, helmet: null, hair: "#c9a06a", tunic: "#2a2a3a", trim: "#5a5a66" };
  const redSky = (g, k = 1) => { g.save(); g.globalAlpha = k; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(-500, 200 + i * 130); for (let x = -500; x <= 1600; x += 100) g.lineTo(x, 200 + i * 130 + Math.sin(x / 180 + i) * 50); g.lineTo(1600, 200 + i * 130 + 140); g.lineTo(-500, 200 + i * 130 + 140); g.closePath(); g.fillStyle = ["#d9352a", "#e9602a", "#f2902a", "#e9502a", "#c92a2a", "#f2a03a", "#d9452a", "#e97a2a", "#c9302a"][i]; g.fill(); } g.restore(); };
  const fjordScene = (g, k) => { redSky(g, k); g.fillStyle = "#2a3a5a"; g.beginPath(); g.moveTo(-500, 1500); g.quadraticCurveTo(400, 1100, 1600, 1350); g.lineTo(1600, 2200); g.lineTo(-500, 2200); g.fill(); g.fillStyle = "#3a5a7a"; g.fillRect(-500, 1480, 2200, 120); line(g, [[-200, 2100], [1300, 1500]], 30, "#6b4024"); line(g, [[-200, 2000], [1300, 1440]], 8, "#6b4024"); };
  const volc = (g, x, y, k, t) => { poly(g, [[x - 500, y], [x - 100, y - 500], [x + 100, y - 500], [x + 500, y]], "#5a4a3a", 7); if (k > 0) { boomFx(g, x, y - 560, 240 * Math.min(1, k * 2), Math.min(1, k)); for (let i = 0; i < 8; i++) { const q = (t * 0.5 + i / 8) % 1; g.save(); g.globalAlpha = 0.7 * (1 - q); ell(g, x + Math.sin(i * 2) * 200 * q, y - 600 - q * 800, 90 + q * 200, 70 + q * 160, "#5a5258", 0); g.restore(); } } };
  // 0 hook
  S2(0, { bg: "dark", draw: (g, t) => { fjordScene(g, 1); guy(g, MUNCH, { x: 540, y: 1960, h: 760, expr: "scared", armR: [2.9, 0.4], armL: [-2.9, -0.4], blink: 0, t }); },
    titles: [["Munch's", "EDVARD MUNCH'S “THE SCREAM”", "label", { size: 58 }], ["volcanic", "INSPIRED BY A VOLCANO?", "stamp", { size: 92 }]] });
  ev(wt(0, "volcanic"), "rumble");
  // 1 1883 Krakatoa, heard 3,000 miles away
  { const tY = wt(1, "1883"), tK = wt(1, "Krakatoa"), tT = wt(1, "3,000");
    S2(1, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [10, 540, 1250, 0.9, 0]], draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2f6f94", "#1f4f74"); volc(g, 540, 1820, clamp((t - tK + 0.2) / 1.2), t); if (t > tT - 0.2) for (let i = 0; i < 3; i++) { const q = ((t - tT) * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; g.beginPath(); g.arc(540, 1260, 100 + q * 700, 0, TAU); g.lineWidth = 10; g.strokeStyle = "#ffe08a"; g.stroke(); g.restore(); } },
      titles: [[tY, "1883", "stamp", { size: 160 }], [tK, "KRAKATOA, INDONESIA", "label", { font: "Cinzel" }], [tT, "HEARD 3,000 MILES AWAY", "stamp", { size: 86 }]] });
    ev(tK, "boom"); ev(tK + 0.3, "rumble"); }
  // 2 dust circles the globe → red Norwegian sunsets → "blood and tongues of fire"
  { const tD = wt(2, "dust"), tN = wt(2, "Norway"), tB = wt(2, "blood");
    S2(2, { bg: "dark", draw: (g, t) => { if (t < tN - 0.3) { g.fillStyle = "#0a0a1a"; g.fillRect(-500, -500, 2200, 3000); ell(g, 540, 1300, 360, 360, "#3f7fa4", 8); const k = clamp((t - tD) / 2.5); g.save(); g.globalAlpha = 0.75; g.beginPath(); g.arc(540, 1300, 400, Math.PI * 0.6, Math.PI * 0.6 + k * TAU); g.lineWidth = 60; g.strokeStyle = "#8a7a6a"; g.stroke(); g.restore(); } else { fjordScene(g, clamp((t - tN + 0.3) / 1.5)); guy(g, MUNCH, { x: 540, y: 1960, h: 700, expr: t > tB ? "scared" : "shock", armR: t > tB ? [2.9, 0.4] : undefined, armL: t > tB ? [-2.9, -0.4] : undefined, blink: 0, t }); } },
      titles: [[tD, "DUST CIRCLED THE GLOBE", "label"], [tN, "NORWAY'S SKIES TURNED RED", "stamp", { size: 82 }], [tB, "“BLOOD AND TONGUES OF FIRE”", "label", { size: 56, fill: "#ffd0a0" }]] });
    ev(tD, "whoosh"); ev(tN, "drone"); ev(tB, "sting", 0.6); }
}
