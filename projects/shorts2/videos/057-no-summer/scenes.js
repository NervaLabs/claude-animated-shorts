// 057 — The Year There Was No Summer
"use strict";
function buildShots() {
  const snow = (g, t, a = 1) => { g.save(); g.globalAlpha = a; for (let i = 0; i < 70; i++) { const x = (rnd(i) * 1300 + Math.sin(t + i) * 30) % 1300 - 100, y = (rnd(i * 3) * 2000 + t * (80 + rnd(i * 5) * 60)) % 2000; ell(g, x, y, 5 + rnd(i * 7) * 5, 5 + rnd(i * 7) * 5, "#ffffff", 0); } g.restore(); };
  const volcano = (g, x, y, s, t, k = 0) => { poly(g, [[x - 500 * s, y], [x - 110 * s, y - 520 * s], [x + 110 * s, y - 520 * s], [x + 500 * s, y]], "#6a5a4a", 7); poly(g, [[x - 110 * s, y - 520 * s], [x - 60 * s, y - 440 * s], [x + 40 * s, y - 470 * s], [x + 110 * s, y - 520 * s]], "#d9532a", 4); if (k > 0) { for (let i = 0; i < 9; i++) { const q = (t * 0.6 + i / 9) % 1; g.save(); g.globalAlpha = 0.85 * (1 - q * 0.6); ell(g, x + Math.sin(i * 3) * 160 * q * s, y - 540 * s - q * 900 * s * k, (80 + q * 220) * s, (70 + q * 180) * s, "#5a5258", 0); g.restore(); } } };
  // 0 hook: June snow
  S2(0, { bg: "americanTown", draw: (g, t) => { for (let i = 0; i < 2; i++) guy(g, C.gent(i), { x: 340 + i * 400, y: 1840, h: 600, dir: i ? -1 : 1, expr: "shock", armR: [2.4, 0.3], blink: 0, t }); snow(g, t); rect(g, 380, 860, 320, 200, "#fff6e6", 7, 14); strokeText(g, "JUNE", 540, 940, 60, { fill: "#c0392b", lw: 0, shadow: false }); strokeText(g, "1816", 540, 1010, 50, { fill: "#1c1422", lw: 0, shadow: false }); },
    titles: [["snow", "SNOW IN JUNE?!", "stamp", { size: 120 }], ["England", "NEW ENGLAND, 1816", "label"]] }, night(0.15));
  ev(wt(0, "snow"), "gasp");
  // 1 Year Without a Summer
  { const tY = wt(1, "Without");
    S2(1, { bg: "americanTown", blur: true, draw: (g, t) => { sunStar(g, 540, 1200, 160, "#d9d9c0"); line(g, [[300, 960], [780, 1440]], 26, "#c0392b"); snow(g, t, 0.8); },
      titles: [[tY, "“THE YEAR WITHOUT A SUMMER”", "stamp", { size: 76 }]] }, night(0.2));
    ev(tY, "drone"); }
  // 2 Tambora 1815
  { const tA = wt(2, "1815"), tT = wt(2, "Tambora"), tL = wt(2, "largest"), tAs = wt(2, "ash");
    S2(2, { bg: "jungle", keys: [[0, 540, 1300, 1.0, 0], [12, 540, 1250, 0.9, 0]], draw: (g, t) => { const k = clamp((t - tL + 0.3) / 1.5); volcano(g, 540, 1800, 1.2, t, k); if (k > 0 && k < 0.6) boomFx(g, 540, 1180, 300 * k * 2, k * 1.6); },
      titles: [[tA, "APRIL 1815", "stamp", { size: 120 }], [tT, "MOUNT TAMBORA, INDONESIA", "label", { size: 60 }], [tL, "LARGEST ERUPTION ON RECORD", "stamp", { size: 80 }], [tAs, "ASH & SULFUR SKY-HIGH", "label", { fill: "#d9d9e6" }]] });
    ev(tL, "boom"); ev(tL + 0.3, "rumble"); }
  // 3 dust circles the globe
  { const tC = wt(3, "circled"), tB = wt(3, "blocking"), tD = wt(3, "dropping");
    S2(3, { bg: "space", draw: (g, t) => { ell(g, 540, 1300, 380, 380, "#3f7fa4", 8); g.save(); g.beginPath(); g.arc(540, 1300, 380, 0, TAU); g.clip(); for (let i = 0; i < 4; i++) ell(g, 380 + i * 120 + Math.sin(t * 0.5 + i) * 40, 1200 + (i % 2) * 180, 130, 90, "#5f9a4a", 0); g.restore(); const k = clamp((t - tC + 0.2) / 2); g.save(); g.globalAlpha = 0.7; g.beginPath(); g.arc(540, 1300, 430, -Math.PI / 2, -Math.PI / 2 + k * TAU); g.lineWidth = 70; g.strokeStyle = "#7a7268"; g.stroke(); g.restore(); if (t > tB - 0.1) { sunStar(g, 980, 700, 90, "#ffcf4a"); line(g, [[880, 780], [780, 880]], 10, "#c0392b"); } if (t > tD - 0.1) { rect(g, 100, 1800, 280, 140, "#fff6e6", 7, 14); strokeText(g, "−°C", 240, 1885, 60, { fill: "#2f4f9f", lw: 0, shadow: false }); } },
      titles: [[tC, "A DUST CLOUD CIRCLED EARTH", "label", { size: 60 }], [tB, "BLOCKING SUNLIGHT", "stamp", { size: 100 }], [tD, "TEMPERATURES DROPPED", "label", { fill: "#cfe9ff" }]] });
    ev(tC, "whoosh"); ev(tB, "drone"); }
  // 4 crops freeze; famine; Mary Shelley writes Frankenstein indoors
  { const tCr = wt(4, "Crops"), tF = wt(4, "famine"), tM = wt(4, "Mary"), tFr = wt(4, "Frankenstein");
    S2(4, { bg: "farm", draw: (g, t) => { if (t < tM - 0.2) { for (let i = 0; i < 7; i++) { const x = 100 + i * 140; line(g, [[x, 1840], [x + 10, 1660]], 8, t > tCr ? "#8a8a6a" : "#3a8a3a"); ell(g, x + 10, 1650, 26, 40, t > tCr ? "#c9d9e6" : "#4aa040", 4); } snow(g, t, 0.7); guy(g, C.peasant(0), { x: 760, y: 1840, h: 560, dir: -1, expr: t > tF ? "sad" : "shock", blink: blinkAt(t, 1), t }); } else { rect(g, -400, -200, 1900, 2400, "#5a4a3a", 0); rect(g, 640, 700, 340, 440, "#8aa0b8", 8, 8); for (let i = 0; i < 20; i++) line(g, [[660 + (i * 37) % 300, 720 + ((t * 600 + i * 70) % 400)], [650 + (i * 37) % 300, 760 + ((t * 600 + i * 70) % 400)]], 3, "#cfe9ff"); rect(g, 120, 1560, 840, 50, "#6b4024", 6); guy(g, { ...C.lady(2), hair: "#7a4a2a" }, { x: 380, y: 1840, h: 600, expr: "determined", armR: [1.3 + Math.sin(t * 8) * 0.08, -0.6], blink: blinkAt(t, 1), t }); if (t > tFr - 0.2) { rect(g, 560, 1420, 260, 140, "#3a5a3a", 6, 8); strokeText(g, "FRANKENSTEIN", 690, 1500, 26, { fill: "#f6f3ea", lw: 0, shadow: false }); } flame(g, 780, 1540, 40, t); } },
      titles: [[tCr, "CROPS FROZE", "stamp", { size: 120 }], [tF, "FAMINE", "label", { fill: "#ffd0c0" }], [tM, "MARY SHELLEY, STUCK INDOORS", "label", { size: 58 }], [tFr, "WROTE FRANKENSTEIN", "stamp", { size: 96 }]] }, night(0.15));
    ev(tCr, "crack"); ev(tF, "sad"); ev(tM, "rain"); ev(tFr, "sting", 0.6); }
}
