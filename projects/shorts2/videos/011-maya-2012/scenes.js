// 011 — The Mayan Calendar Wasn't Predicting the End of the World
"use strict";
function buildShots() {
  const MAYA = (i = 0) => ({ ...C.aztec(i), helmet: "mayafeather", hairUnder: true });
  HATS.mayafeather = HATS.mayafeather || ((g, rx, ry, lw) => { for (let i = -2; i <= 2; i++) poly(g, [[i * rx * 0.25, -ry * 0.8], [i * rx * 0.4, -ry * 1.9], [i * rx * 0.25 + rx * 0.12, -ry * 0.8]], ["#2f9a5a", "#2f6fcf", "#e2453c", "#2f6fcf", "#2f9a5a"][i + 2], lw * 0.5, true); rect(g, -rx * 0.95, -ry * 0.85, rx * 1.9, ry * 0.3, "#e2b64b", lw * 0.7, 4); });
  const wheel = (g, x, y, r, rot, t) => { g.save(); g.translate(x, y); g.rotate(rot); ell(g, 0, 0, r, r, "#b8b0a0", 8); ell(g, 0, 0, r * 0.72, r * 0.72, "#c9c2b2", 5); ell(g, 0, 0, r * 0.3, r * 0.3, "#a8a090", 5); for (let i = 0; i < 20; i++) { const a = (i / 20) * TAU; g.save(); g.rotate(a); rect(g, -r * 0.08, -r * 0.95, r * 0.16, r * 0.18, "#a8a090", 3, 4); ell(g, 0, -r * 0.86, r * 0.03, r * 0.03, INK, 0); g.restore(); } g.restore(); };
  const odo = (g, x, y, digits, roll) => { rect(g, x - 360, y - 90, 720, 180, "#2a2430", 8, 16); digits.forEach((d, i) => { g.save(); g.beginPath(); g.rect(x - 330 + i * 136, y - 70, 120, 140); g.clip(); rect(g, x - 330 + i * 136, y - 70, 120, 140, "#f6f3ea", 4, 6); strokeText(g, String(d), x - 270 + i * 136, y - roll * 140, 70, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); }); };
  // 0 hook
  S2(0, { bg: "jungle", blur: true, draw: (g, t) => { guy(g, MAYA(0), { x: 300, y: 1840, h: 600, expr: t > wt(0, "never") ? "laugh" : "neutral", blink: blinkAt(t, 1), t }); if (t > wt(0, "2012") - 0.3) { const k = clamp((t - wt(0, "2012") + 0.3) / 1); ell(g, lerp(1100, 800, k), lerp(400, 900, k), 50, 50, "#7a6a5a", 5); } },
    titles: [["never", "THE MAYA NEVER PREDICTED...", "label", { size: 60 }], ["2012", "THE END OF THE WORLD (2012)", "stamp", { size: 72 }]] });
  ev(wt(0, "2012"), "boing");
  // 1 the Long Count, 5,125 years, 13th baktun
  { const tL = wt(1, "Long"), tF = wt(1, "5,125"), tB = wt(1, "13th"), tD = wt(1, "December");
    S2(1, { bg: "jungle", blur: true, draw: (g, t) => { wheel(g, 540, 1250, 360, (t - S(1)) * 0.3, t); guy(g, MAYA(1), { x: 900, y: 1840, h: 520, dir: -1, expr: "proud", armR: [2.2, -0.3], blink: blinkAt(t, 1), t }); },
      titles: [[tL, "THE LONG COUNT CALENDAR", "label", { font: "Cinzel", size: 58 }], [tF, "5,125-YEAR CYCLE", "stamp", { size: 96 }], [tB, "13TH BAKTUN ENDS", "label", { fill: "#ffe08a" }], [tD, "DEC 21, 2012", "stamp", { size: 110 }]] });
    ev(tL, "pop"); ev(tF, "boom", 0.5); ev(tD, "boom", 0.6); }
  // 2 an odometer rolling over → new year party
  { const tO = wt(2, "odometer"), tN = wt(2, "New");
    S2(2, { bg: "dark", draw: (g, t) => { const k = clamp((t - tO - 0.4) / 0.6); odo(g, 540, 1000, k < 1 ? [12, 19, 19, 17, 19] : [13, 0, 0, 0, 0], k > 0 && k < 1 ? (k * 3) % 1 : 0); if (t > tN - 0.2) { for (let i = 0; i < 6; i++) boomFx(g, 150 + i * 160, 500 + (i % 2) * 150, 90, ((t - tN) * 0.8 + i / 6) % 1.2); for (let i = 0; i < 4; i++) guy(g, MAYA(i), { x: 150 + i * 260, y: 1840, h: 440, expr: "laugh", ...danceState(t, i), blink: 0, t }); } },
      titles: [["apocalypse", "NOT AN APOCALYPSE", "label", { fill: "#ffd0c0" }], [tO, "JUST AN ODOMETER ROLLING OVER", "label", { size: 56 }], [tN, "HAPPY NEW CYCLE!", "stamp", { size: 100 }]] });
    ev(tO + 0.4, "ding"); ev(tN, "cheer"); for (let k = 0; k < 4; k++) ev(tN + k * 0.5, "boom", 0.3); }
  // 3 carvings with far-future dates
  { const tA = wt(3, "archaeologists"), tTh = wt(3, "thousands"), tK = wt(3, "keep");
    S2(3, { bg: "jungle", draw: (g, t) => { rect(g, 520, 1100, 340, 560, "#b8b0a0", 7, 10); for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) rect(g, 550 + c * 100, 1130 + r * 85, 80, 70, "#a8a090", 3, 12); guy(g, { ...C.scientist("#5a3b2a"), helmet: "pith" }, { x: 260, y: 1840, h: 580, expr: t > tTh ? "shock" : "neutral", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); if (t > tTh) { rect(g, 520, 820, 360, 150, "#fff6e6", 7, 14); strokeText(g, "4772 AD", 700, 895, 70, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); } },
      titles: [[tA, "CARVINGS FOUND", "label"], [tTh, "DATES FAR PAST 2012", "stamp", { size: 90 }], [tK, "LIFE GOES ON", "label", { fill: "#d9f2a0" }]] });
    ev(tTh, "ding"); ev(tK, "choir", 0.5); }
}
