// 078 — Why the Apollo 11 Astronauts Had to Clear Customs
"use strict";
function buildShots() {
  const AS = (i) => ({ ...C.astronaut });
  const form = (g, x, y, s, t, lines) => { rect(g, x - 240 * s, y - 320 * s, 480 * s, 640 * s, "#fff6e6", 7, 10); strokeText(g, "GENERAL DECLARATION", x, y - 260 * s, 30 * s, { fill: "#1c1422", lw: 0, shadow: false }); lines.forEach(([lab, val, on], i) => { const yy = y - 160 * s + i * 120 * s; strokeText(g, lab, x - 200 * s, yy, 26 * s, { fill: "#6a6a72", lw: 0, shadow: false, align: "left" }); line(g, [[x - 200 * s, yy + 50 * s], [x + 200 * s, yy + 50 * s]], 3, "#9a9aa8"); if (on) strokeText(g, val, x + 20 * s, yy + 34 * s, 34 * s, { fill: "#2f4f9f", lw: 0, shadow: false }); }); };
  // 0 hook
  S2(0, { bg: "moon", blur: true, draw: (g, t) => { for (let i = 0; i < 2; i++) guy(g, AS(i), { x: 340 + i * 400, y: 1840, h: 620, expr: "happy", blink: blinkAt(t, i), t }); if (t > wt(0, "Customs") - 0.2) form(g, 540, 1100, 0.6, t, [["FROM", "MOON", 1]]); },
    titles: [["moon", "BACK FROM THE MOON...", "label"], ["Armstrong", "ARMSTRONG & ALDRIN", "label"], ["Customs", "FILLED OUT A CUSTOMS FORM", "stamp", { size: 82 }]] });
  ev(wt(0, "Customs"), "ding");
  // 1 the form: departure Moon, cargo moon rock, no diseases... quarantine 21 days
  { const tSp = wt(1, "splashed"), tH = wt(1, "Honolulu"), tDe = wt(1, "departure"), tC = wt(1, "cargo"), tD = wt(1, "diseases"), tQ = wt(1, "21");
    S2(1, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [24, 540, 1300, 1.05, 0]], draw: (g, t) => {
      sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a");
      if (t < tDe - 0.2) { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); g.save(); g.translate(540, 1420 + Math.sin(t * 2) * 10); g.beginPath(); g.moveTo(-160, 60); g.lineTo(-100, -140); g.lineTo(100, -140); g.lineTo(160, 60); g.closePath(); g.fillStyle = "#c9c0b0"; g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke(); g.restore(); if (t > tH - 0.2) { palm(g, 140, 1300, 300, 5, t); palm(g, 960, 1320, 260, 5, t); } }
      else if (t < tQ - 0.2) { form(g, 540, 1300, 1.0, t, [["DEPARTURE FROM", "MOON", t > tDe], ["CARGO", "MOON ROCK & DUST", t > tC], ["DISEASES", "NONE", t > tD]]); }
      else { rect(g, 160, 1100, 760, 520, "#d9dde6", 8, 40); for (let i = 0; i < 3; i++) { rect(g, 220 + i * 230, 1180, 180, 180, "#9ab0c8", 5, 90); guy(g, AS(i), { x: 310 + i * 230, y: 1560, h: 300, expr: "happy", blink: blinkAt(t, i), t, shadow: false }); } rect(g, 380, 1660, 320, 140, "#fff6e6", 7, 14); strokeText(g, "DAY " + Math.min(21, 1 + Math.floor((t - tQ + 0.2) * 8)), 540, 1740, 54, { fill: "#1c1422", lw: 0, shadow: false }); }
    }, titles: [[tSp, "SPLASHDOWN, PACIFIC", "label"], [tH, "HONOLULU", "stamp", { size: 110 }], [tDe, "DEPARTURE: “MOON”", "label", { fill: "#ffe08a" }], [tC, "CARGO: MOON ROCKS", "label"], [tD, "NO CONTAGIOUS DISEASES", "label", { size: 60 }], [tQ, "...STILL 21 DAYS IN QUARANTINE", "stamp", { size: 74 }]] });
    ev(tSp, "splash"); ev(tDe, "pop"); ev(tC, "pop"); ev(tD, "pop"); ev(tQ, "boing"); }
}
