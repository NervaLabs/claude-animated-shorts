// 014 — The City That Vanished Under Ash in Hours
"use strict";
function buildShots() {
  const P = (i) => C.roman(i);
  const ashFall = (g, t, a = 0.8) => { g.save(); g.globalAlpha = a; g.fillStyle = "#6a6470"; for (let i = 0; i < 160; i++) { const x = (rnd(i) * 1200 + Math.sin(t + i) * 20) % 1200 - 60, y = (rnd(i * 3) * 2100 + t * 260 * (0.6 + rnd(i * 7) * 0.6)) % 2100 - 100; g.fillRect(x, y, 5, 5); } g.restore(); };
  // 0 hook
  S2(0, { bg: "pompeii", blur: true, draw: (g, t) => { for (let i = 0; i < 2; i++) guy(g, P(i), { x: 300 + i * 480, y: 1840, h: 560, dir: i ? -1 : 1, expr: "neutral", look: 0.3, headTilt: -6, blink: blinkAt(t, i), t }); if (t > wt(0, "volcano") - 0.2) shout(g, 540, 1080, "“VOL-WHAT?”", 54, clamp((t - wt(0, "volcano") + 0.2) / 0.15), "#2f5fae"); },
    titles: [["Pompeii", "POMPEII", "label", { font: "Cinzel", size: 96 }], ["volcano", "NO WORD FOR “VOLCANO”", "stamp", { size: 86 }]] });
  ev(wt(0, "volcano"), "boing");
  // 1 79 AD: dormant, vineyards
  { const tY = wt(1, "79"), tD = wt(1, "dormant"), tV = wt(1, "vineyards");
    S2(1, { bg: "pompeii", keys: [[0, 700, 1000, 0.8, 0], [10, 600, 1200, 0.95, 0]], draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, P(i), { x: 200 + i * 300, y: 1800, h: 420, expr: "happy", armR: [1.6, -0.6], hold: { r: "cup" }, blink: blinkAt(t, i), t }); },
      titles: [[tY, "79 AD", "stamp", { size: 150 }], [tD, "VESUVIUS: ASLEEP FOR CENTURIES", "label", { size: 56 }], [tV, "JUST A MOUNTAIN OF VINEYARDS", "label", { fill: "#d9f2a0", size: 56 }]] });
    ev(tY, "boom", 0.5); }
  // 2 earthquakes for days
  { const tE = wt(2, "earthquakes"), tN = wt(2, "normal");
    S2(2, { bg: "pompeii", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, P(i), { x: 200 + i * 340, y: 1820, h: 460, expr: t > tN ? "happy" : "shock", bob: Math.sin(t * 40 + i) * 2, blink: blinkAt(t, i), t }); },
      titles: [[tE, "EARTHQUAKES FOR DAYS", "label", { fill: "#ffd0c0" }], [tN, "“TOTALLY NORMAL”", "stamp", { size: 100 }]] });
    for (let k = 0; k < 4; k++) { ev(tE + k * 0.8, "rumble", 0.4); KICKS.push({ t: tE + k * 0.8, a: 8 }); } }
  // 3 midday eruption
  { const tM = wt(3, "midday"), tEr = wt(3, "erupted"), tT = wt(3, "100,000");
    S2(3, { bg: "pompeii", keys: [[0, 700, 1000, 0.85, 0], [6, 700, 950, 0.75, 0]], draw: (g, t) => { if (t > tEr) { const k = clamp((t - tEr) / 3); for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (rnd(i) - 0.5) * 1.2, d = k * (300 + rnd(i * 3) * 900); ell(g, 800 + Math.cos(a) * d * 0.5, 500 + Math.sin(a) * d, 90 + k * 140 * rnd(i * 5), 80 + k * 100 * rnd(i * 7), ["#5a4a4a", "#6a5a5a", "#4a3a3a"][i % 3], 5); } boomFx(g, 800, 480, 300, (t - tEr) / 0.7); } },
      titles: [[tM, "MIDDAY...", "label"], [tEr, "ERUPTION", "stamp", { size: 130 }], [tT, "100,000× HIROSHIMA'S HEAT ENERGY", "label", { size: 52, fill: "#ffd0b0" }]] }, null);
    ev(tEr, "boom"); ev(tEr + 0.05, "crash"); KICKS.push({ t: tEr, a: 26 }); }
  // 4 buried in 24 hours; bread in ovens
  { const tTw = wt(4, "24"), tF = wt(4, "20"), tB = wt(4, "bread"), tFo = wt(4, "forever");
    S2(4, { bg: "pompeii", draw: (g, t) => { const k = clamp((t - tTw) / 3); g.fillStyle = "#8a8490"; g.fillRect(-900, 1700 - k * 700, 2900, 2000); if (t > tB - 0.2) { rect(g, 360, 1100, 360, 260, "#9a6a4a", 7, 120); ell(g, 540, 1260, 90, 50, "#3a2a1a", 5); for (let i = 0; i < 8; i++) line(g, [[540, 1260], [540 + Math.cos(i * 0.785) * 90, 1260 + Math.sin(i * 0.785) * 50]], 3, "#6a5a4a"); } },
      fg: (g, t) => ashFall(g, t, 0.6),
      titles: [[tTw, "WITHIN 24 HOURS", "label"], [tF, "BURIED UNDER 20 FEET OF ASH", "stamp", { size: 74 }], [tB, "BREAD STILL IN THE OVENS", "label", { fill: "#ffe08a" }], [tFo, "PRESERVED FOREVER", "label", { font: "Cinzel" }]] }, night(0.2));
    ev(tTw, "rumble"); ev(tB, "ding", 0.5); }
}
