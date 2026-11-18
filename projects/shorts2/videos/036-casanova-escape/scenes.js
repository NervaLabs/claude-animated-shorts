// 036 — The Island Prison No One Escaped From, Until One Man Did
"use strict";
function buildShots() {
  const CAS = { ...C.gent(1), tunic: "#7a1a4a", trim: "#e2b64b", hair: "#3a2a1a" };
  const CASr = { ...CAS, tunic: "#8a7a6a", trim: "#6a5a4a" };
  const attic = (g) => { rect(g, -400, -300, 1900, 2600, "#4a3a2a", 0); for (let i = 0; i < 9; i++) line(g, [[-300 + i * 220, 400], [540, -100]], 18, "#2a1e14"); rect(g, -400, 1650, 1900, 500, "#6b4a2a", 6); for (let i = 0; i < 9; i++) line(g, [[-400 + i * 220, 1650], [-400 + i * 220, 2100]], 4, "#4a3020"); for (let i = 0; i < 5; i++) line(g, [[700 + i * 50, 900], [700 + i * 50, 1650]], 10, "#2a2a32"); };
  const roof = (g) => { poly(g, [[-400, 2200], [540, 1200], [1500, 2200]], "#7a7a86", 8); for (let i = 0; i < 10; i++) line(g, [[-300 + i * 200, 2200], [540, 1200]], 3, "rgba(30,30,40,0.35)"); };
  // 0 hook
  S2(0, { bg: "seaNight", blur: true, draw: (g, t) => { roof(g); guy(g, CASr, { x: 540, y: 1240, h: 520, expr: "sly", blink: blinkAt(t, 1), t, shadow: false }); },
    titles: [["Casanova", "GIACOMO CASANOVA", "label", { font: "Cinzel" }], ["impossible", "AN IMPOSSIBLE ESCAPE", "stamp", { size: 92 }]] }, night(0.3));
  ev(wt(0, "impossible"), "sting", 0.5);
  // 1 1755 The Leads, Doge's Palace
  { const tY = wt(1, "1755"), tL = wt(1, "Leads"), tD = wt(1, "Doge's");
    S2(1, { bg: "seaNight", draw: (g, t) => { if (t < tL - 0.2) { palace(g); } else { attic(g); guy(g, CASr, { x: 480, y: 1660, h: 560, expr: "sad", blink: blinkAt(t, 1), t, shadow: false }); } },
      titles: [[tY, "1755", "stamp", { size: 160 }], [tL, "“THE LEADS”", "label", { font: "Cinzel" }], [tD, "DOGE'S PALACE, VENICE", "label", { fill: "#ffe08a" }]] }, night(0.15));
    ev(tY, "boom", 0.5); ev(tL, "clank"); }
  // 2 bolt in a Bible → tunnel → roof → skylight → front gate
  { const tB = wt(2, "bolt"), tBi = wt(2, "Bible"), tT = wt(2, "tunneling"), tR = wt(2, "roof"), tSk = wt(2, "skylight"), tW = wt(2, "walked"), tF = wt(2, "fine");
    S2(2, { bg: "seaNight", keys: [[0, 540, 1300, 1.0, 0], [24, 540, 1300, 1.04, 0]], draw: (g, t) => {
      if (t < tR - 0.2) { attic(g); guy(g, CASr, { x: 440, y: 1660, h: 560, expr: "determined", armR: [1.4 + (t > tT ? Math.abs(Math.sin(t * 8)) * 0.6 : 0), -0.8], blink: blinkAt(t, 1), t, shadow: false }); if (t > tBi - 0.2) { rect(g, 560, 1480, 120, 150, "#3a2a1a", 5, 8); line(g, [[620, 1490], [620, 1620]], 6, "#c9a35a"); line(g, [[590, 1530], [650, 1530]], 6, "#c9a35a"); } if (t > tB - 0.1 && t < tBi - 0.2) { rect(g, 560, 1400, 20, 200, "#9a9aa8", 4); } if (t > tT) { ell(g, 380, 1700, 120 * clamp((t - tT) / 2), 30, "#1c1422", 0); } }
      else if (t < tW - 0.2) { roof(g); const x = lerp(260, 640, clamp((t - tR) / 2)); guy(g, CASr, { x, y: 1240 + Math.abs(x - 540) * 1.06, h: 460, expr: "scared", walk: t * 1.2, blink: 0, t, shadow: false }); g.save(); g.globalAlpha = 0.9; ell(g, 880, 280, 90, 90, "#f6f0d0", 4); g.restore(); if (t > tSk - 0.2) { rect(g, 640, 1560, 200, 120, "#e9d9a0", 6, 6); } }
      else { palace(g); const x = lerp(320, 960, clamp((t - tW) / 3)); guy(g, CAS, { x, y: 1840, h: 560, expr: "sly", walk: t * 1.5, blink: blinkAt(t, 1), t }); }
    }, titles: [[tB, "A SHARPENED IRON BOLT", "label"], [tBi, "HIDDEN IN A BIBLE", "label", { fill: "#ffe08a" }], [tT, "MONTHS OF DIGGING", "stamp", { size: 96 }], [tR, "OUT ONTO THE ROOF", "label"], [tSk, "DOWN A SKYLIGHT", "label"], [tW, "OUT THE FRONT GATE", "stamp", { size: 96 }], [tF, "IN FINE CLOTHES", "label", { fill: "#ffd0e8" }]] }, night(0.2));
    ev(tB, "clank"); ev(tT, "scramble"); ev(tR, "whoosh"); ev(tW, "sting", 0.6); }
  function palace(g) { rect(g, -300, 900, 1700, 1000, "#f0d8c8", 7); for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) { g.save(); g.beginPath(); g.arc(-200 + i * 130, 1180 + r * 380, 50, Math.PI, 0); g.lineTo(-150 + i * 130, 1400 + r * 380); g.lineTo(-250 + i * 130, 1400 + r * 380); g.closePath(); g.fillStyle = "#3a2a3a"; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); g.restore(); } for (let i = 0; i < 18; i++) for (let j = 0; j < 6; j++) if ((i + j) % 2) rect(g, -300 + i * 95, 920 + j * 40, 95, 40, "#e8b8b0", 0); rect(g, -300, 1840, 1700, 400, "#9a9aa8", 6); }
}
