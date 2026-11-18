// 012 — How Genghis Khan Built the First Pony Express
"use strict";
function buildShots() {
  const KHAN = { ...C.mongol(1), tunic: "#7a2a2a", beard: "#1a1012", cape: "#e2b64b" };
  const station = (g, x, y, s, flag = true) => { ell(g, x, y - 40 * s, 110 * s, 60 * s, "#f3ecda", 5); poly(g, [[x - 110 * s, y - 40 * s], [x, y - 130 * s], [x + 110 * s, y - 40 * s]], "#e2d6b8", 5); rect(g, x - 20 * s, y - 70 * s, 40 * s, 70 * s, "#6b4024", 3); if (flag) { line(g, [[x + 120 * s, y], [x + 120 * s, y - 200 * s]], 6, "#6b4024"); flagCloth(g, x + 120 * s, y - 200 * s, 80 * s, 50 * s, ["#c0392b"], 0, 1, 3); } };
  const rider = (g, x, y, h, t, col = "#8a6a4a", flip = 1) => { const hs = horse(g, { x, y, h, phase: t * 2.6, t, col, dir: flip }); guy(g, C.mongol(0), { x: hs.saddle[0] + 6 * flip, y: hs.saddle[1] + h * 0.33, h: h * 0.75, sit: true, dir: flip, expr: "determined", armR: [2.0, -0.3], t, shadow: false }); };
  // 0 hook
  S2(0, { bg: "steppe", blur: true, draw: (g, t) => { rider(g, lerp(-300, 1400, ((t * 0.25) % 1)), 1760, 380, t); guy(g, KHAN, { x: 260, y: 1840, h: 600, expr: "proud", armR: [2.2, -0.3], blink: blinkAt(t, 1), t }); },
    titles: [["Genghis", "GENGHIS KHAN", "label", { font: "Cinzel" }], ["postal", "THE FASTEST MAIL ON EARTH", "stamp", { size: 80 }]] });
  ev(0.2, "gallop");
  // 1 relay stations every 25 miles
  { const tR = wt(1, "relay"), tT = wt(1, "25");
    S2(1, { bg: "steppe", keys: [[0, 540, 1300, 0.9, 0], [7, 540, 1300, 0.7, 0]], draw: (g, t) => { const n = 1 + Math.floor(clamp((t - tR) / 2) * 4); for (let i = 0; i < n; i++) station(g, -400 + i * 600, 1500, 1); if (t > tT) for (let i = 0; i < n - 1; i++) { line(g, [[-400 + i * 600 + 140, 1560], [-400 + (i + 1) * 600 - 140, 1560]], 4, "#fff6dc"); strokeText(g, "25 MI", -100 + i * 600, 1610, 40, { fill: "#fff6dc" }); } },
      titles: [[tR, "RELAY STATIONS", "stamp", { size: 110 }], [tT, "EVERY 25 MILES", "label", { fill: "#ffe08a" }]] });
    ev(tR, "build"); }
  // 2 gallop, horn, jump onto a fresh horse
  { const tG = wt(2, "gallop"), tH = wt(2, "horn"), tL = wt(2, "leap");
    S2(2, { bg: "steppe", draw: (g, t) => { station(g, 760, 1560, 1.1); horse(g, { x: 900, y: 1820, h: 360, t, col: "#2a2230", dir: -1, calm: true }); const k = clamp((t - tG) / (tL - tG)); if (t < tL) rider(g, lerp(-300, 520, k), 1800, 380, t); else { horse(g, { x: 520, y: 1800, h: 360, t, col: "#8a6a4a", shadow: true, headDown: 0.3 }); const q = clamp((t - tL) / 0.5); guy(g, C.mongol(0), { x: lerp(560, 900, q), y: lerp(1650, 1660, q) - Math.sin(q * Math.PI) * 200, h: 300, sit: q >= 1, expr: "shout", armL: [-2.6, 0], armR: [2.6, 0], t, shadow: false }); } if (t > tH && t < tL) shout(g, 520, 1100, "TOOOT!", 60, clamp((t - tH) / 0.15), "#e2b64b"); },
      titles: [["urgent", "URGENT ORDERS", "label"], [tG, "FULL GALLOP", "label", { fill: "#ffe08a" }], [tH, "BLOW THE HORN", "label"], [tL, "SWAP HORSES — NO STOPPING", "stamp", { size: 76 }]] });
    ev(tG, "gallop"); ev(tH, "horns"); ev(tL, "whoosh"); }
  // 3 the Yam: 200 miles a day
  { const tY = wt(3, "Yam"), tT = wt(3, "200");
    S2(3, { bg: "steppe", keys: [[0, 540, 1300, 1.0, 0], [6, 540, 1300, 1.05, 0]], draw: (g, t) => { rider(g, 540 + Math.sin(t * 2) * 20, 1760, 420, t); speedLines(g, t, 20, "rgba(255,255,255,0.6)"); if (t > tT - 0.2) { rect(g, 340, 920, 400, 170, "#fff6e6", 7, 14); strokeText(g, `${Math.min(200, Math.floor((t - tT + 0.2) * 160))} MI/DAY`, 540, 1005, 64, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tY, "“THE YAM”", "stamp", { size: 120 }], [tT, "UP TO 200 MILES A DAY", "label", { fill: "#ffe08a" }]] });
    ev(tY, "boom", 0.5); }
  // 4 weeks vs days
  { const tW = wt(4, "weeks"), tD = wt(4, "days");
    S2(4, { bg: "steppe", blur: true, draw: (g, t) => { g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); guy(g, C.knight, { x: 270, y: 1840, h: 520, expr: "sad", walk: (t * 0.3) % 1, blink: blinkAt(t, 1), t }); strokeText(g, "WEEKS", 270, 1200, 70, { fill: "#ffd0c0" }); g.restore(); g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); rider(g, 820, 1800, 360, t); strokeText(g, "DAYS", 810, 1200, 70, { fill: "#d9f2a0" }); g.restore(); line(g, [[540, -200], [540, 2400]], 10); },
      titles: [[tW, "EUROPE: WEEKS", "label", { fill: "#ffd0c0" }], [tD, "MONGOLS: DAYS", "stamp", { size: 110 }]] });
    ev(tW, "sadtrombone", 0.4); ev(tD, "gallop", 0.6); }
}
