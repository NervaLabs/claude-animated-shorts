// 091 — The Woman Who Biked Around the World in the 1890s
"use strict";
function buildShots() {
  const ANN = (bloomers) => ({ ...C.lady(2), tunic: bloomers ? "#2f4f7a" : "#7a1a4a", hair: "#3a2a1a", robe: !bloomers, helmet: "bowler", hatCol: "#3a2a1a" });
  const bike = (g, x, y, s, t, heavy = false) => { g.save(); g.translate(x, y); g.scale(s, s); for (const wx of [-170, 170]) { g.save(); g.translate(wx, -110); g.rotate(t * 5); g.beginPath(); g.arc(0, 0, 110, 0, TAU); g.lineWidth = 12; g.strokeStyle = INK; g.stroke(); for (let k = 0; k < 8; k++) line(g, [[0, 0], [Math.cos(k * 0.785) * 110, Math.sin(k * 0.785) * 110]], 3, "#5a5a66"); g.restore(); } const fc = heavy ? "#6b4024" : "#c0392b"; line(g, [[-170, -110], [-30, -110], [60, -260], [-80, -260], [-30, -110]], heavy ? 16 : 10, fc); line(g, [[60, -260], [170, -110]], heavy ? 16 : 10, fc); line(g, [[60, -260], [80, -320]], 10, fc); line(g, [[50, -320], [120, -320]], 10, INK); rect(g, -120, -282, 90, 24, "#3a2a1a", 4, 10); g.restore(); };
  // 0 hook: around the world in 16 months for a $10,000 bet
  S2(0, { bg: "street", blur: true, draw: (g, t) => { bike(g, 540, 1840, 1.3, t); guy(g, ANN(true), { x: 500, y: 1500, h: 420, expr: "proud", t, shadow: false }); },
    titles: [["globe", "AROUND THE WORLD BY BIKE", "stamp", { size: 86 }], ["16", "16 MONTHS · 1894", "label"], ["10,000", "FOR A $10,000 BET", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "10,000"), "cash");
  // 1 Annie Londonderry; 42-lb bike
  { const tA = wt(1, "Annie"), tM = wt(1, "mother"), tF = wt(1, "42-pound");
    S2(1, { bg: "street", draw: (g, t) => { guy(g, ANN(false), { x: 300, y: 1840, h: 620, expr: "determined", blink: blinkAt(t, 1), t }); if (t > tM - 0.2) for (let i = 0; i < 3; i++) guy(g, C.kid(i), { x: 120 + i * 90, y: 1900, h: 280, expr: "happy", blink: blinkAt(t, i + 3), t, shadow: false }); if (t > tF - 0.2) { bike(g, 760, 1840, 1.0, 0, true); rect(g, 620, 1040, 280, 140, "#fff6e6", 7, 14); strokeText(g, "42 LB", 760, 1115, 60, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tA, "ANNIE LONDONDERRY", "label", { font: "Cinzel" }], [tM, "MOTHER OF THREE, BOSTON", "label"], [tF, "A 42-POUND BICYCLE", "stamp", { size: 92 }]] });
    ev(tF, "clank"); }
  // 2 lighter bike, bloomers, sold ad space + lectures
  { const tSw = wt(2, "switched"), tB = wt(2, "bloomers"), tAd = wt(2, "ad"), tL = wt(2, "lectures");
    S2(2, { bg: "street", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.05, 0]], draw: (g, t) => { const light = t > tSw - 0.2; if (t < tL - 0.2) { bike(g, 600, 1840, 1.2, t * (light ? 2 : 0.6), !light); guy(g, ANN(t > tB - 0.2), { x: 560, y: 1530, h: 400, expr: light ? "happy" : "tired", t, shadow: false }); if (t > tAd - 0.2) { rect(g, 470, 1580, 240, 70, "#f2c443", 5, 8); strokeText(g, "AD SPACE", 590, 1617, 30, { fill: "#1c1422", lw: 0, shadow: false }); } } else { crowdHeads(g, -100, 1200, 1900, 3, 9, 1.2); guy(g, ANN(true), { x: 540, y: 1560, h: 560, expr: "talk", mouthOpen: talk(t), armR: [2.4, -0.3], blink: blinkAt(t, 1), t }); } },
      titles: [["muddy", "TOO SLOW IN THE MUD", "label"], [tSw, "A LIGHTER MEN'S BIKE", "label"], [tB, "SKIRTS → BLOOMERS", "stamp", { size: 100 }], [tAd, "SOLD AD SPACE ON HER BIKE", "label", { size: 58, fill: "#ffe08a" }], [tL, "+ LECTURES WORLDWIDE", "label"]] });
    ev(tSw, "whoosh"); ev(tB, "pop"); ev(tAd, "cash"); ev(tL, "cheer", 0.5); }
}
