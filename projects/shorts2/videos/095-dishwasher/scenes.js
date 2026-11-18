// 095 — How the Dishwasher Was Invented by a Socialite Tired of Chipped China
"use strict";
function buildShots() {
  const JC = { ...C.lady(1), tunic: "#5a2a4a", hair: "#3a2a1a" };
  const plate = (g, x, y, r, chip = false, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); ell(g, 0, 0, r, r, "#f6f3ea", 5); ell(g, 0, 0, r * 0.7, r * 0.7, "#e9eef6", 3); g.beginPath(); g.arc(0, 0, r * 0.85, 0, TAU); g.strokeStyle = "#2f4f9f"; g.lineWidth = 4; g.stroke(); if (chip) poly(g, [[r * 0.7, -r * 0.7], [r, -r * 0.4], [r * 0.9, -r * 0.9]], "#3a2a2a", 0); g.restore(); };
  const machine = (g, x, y, s, t, on = 0) => { rect(g, x - 200 * s, y - 360 * s, 400 * s, 360 * s, "#c98a5a", 7, 30 * s); g.save(); g.beginPath(); g.rect(x - 170 * s, y - 330 * s, 340 * s, 300 * s); g.clip(); for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { line(g, [[x - 150 * s + i * 90 * s, y - 320 * s + r * 150 * s], [x - 150 * s + i * 90 * s, y - 200 * s + r * 150 * s]], 4, "#5a5a66"); plate(g, x - 120 * s + i * 80 * s, y - 260 * s + r * 140 * s, 40 * s, false, 0); } if (on) for (let i = 0; i < 10; i++) { const q = (t * 2 + i / 10) % 1; ell(g, x - 160 * s + i * 34 * s, y - 40 * s - q * 260 * s, 6, 10, "#9ad0f0", 0); } g.restore(); };
  // 0 hook
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => { machine(g, 540, 1800, 1.4, t, 1); },
    titles: [["dishwasher", "THE DISHWASHER", "stamp", { size: 120 }], ["1886", "INVENTED IN 1886", "label"], ["chipped", "OVER CHIPPED CHINA", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "dishwasher"), "splash", 0.6);
  // 1 Josephine Cochrane, furious at broken heirlooms
  { const tJ = wt(1, "Josephine"), tR = wt(1, "rarely"), tF = wt(1, "furious"), tB = wt(1, "broke");
    S2(1, { bg: "victorianRoom", draw: (g, t) => { guy(g, JC, { x: 320, y: 1840, h: 640, expr: t > tF ? "angry" : "proud", blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) plate(g, 680 + i * 120, 1300, 60, t > tB - 0.2 && i === 1, t > tB ? Math.sin(t * 9) * 0.1 : 0); if (t > tB - 0.1) { g.save(); g.globalAlpha = clamp(1 - (t - tB) / 1.5); for (let i = 0; i < 5; i++) poly(g, [[800 + i * 18, 1380 + (t - tB) * 300 + i * 10], [820 + i * 18, 1390 + (t - tB) * 300], [806 + i * 18, 1404 + (t - tB) * 300]], "#f6f3ea", 3); g.restore(); } },
      titles: [[tJ, "JOSEPHINE COCHRANE", "label", { font: "Cinzel" }], [tR, "SHE RARELY WASHED DISHES", "label"], [tF, "FURIOUS!", "stamp", { size: 120 }], [tB, "HEIRLOOM PLATES KEPT BREAKING", "label", { size: 56, fill: "#ffd0c0" }]] });
    ev(tF, "grumble"); ev(tB, "shatter"); }
  // 2 measured, wire racks, copper boiler, water jets → 1893 prize
  { const tMe = wt(2, "measured"), tW = wt(2, "wire"), tP = wt(2, "pressure"), tWi = wt(2, "winning");
    S2(2, { bg: "lab", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => { if (t < tWi - 0.2) { if (t < tW - 0.2) { plate(g, 540, 1300, 160); line(g, [[380, 1500], [700, 1500]], 6, "#ffe08a"); strokeText(g, "↔", 540, 1560, 60, { fill: "#ffe08a" }); guy(g, JC, { x: 200, y: 1840, h: 560, expr: "determined", blink: blinkAt(t, 1), t }); } else machine(g, 540, 1800, 1.5, t, t > tP - 0.2 ? 1 : 0); } else { machine(g, 380, 1800, 1.0, t, 1); guy(g, JC, { x: 780, y: 1840, h: 620, dir: -1, expr: "laugh", armR: [2.8, 0.2], blink: blinkAt(t, 1), t }); const k = clamp((t - tWi) / 0.4); g.save(); g.translate(780, 1060); g.scale(k, k); ell(g, 0, 0, 80, 80, "#f2c443", 6); strokeText(g, "1ST", 0, 14, 44, { fill: "#a07a20", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tMe, "SHE MEASURED EVERY DISH", "label"], [tW, "WIRE RACKS IN A COPPER BOILER", "label", { size: 58 }], [tP, "WATER PRESSURE, NOT SCRUBBERS", "stamp", { size: 76 }], [tWi, "TOP PRIZE · 1893 WORLD'S FAIR", "label", { size: 58, fill: "#ffe08a" }]] });
    ev(tW, "build"); ev(tP, "splash"); ev(tWi, "cheer", 0.5); }
}
