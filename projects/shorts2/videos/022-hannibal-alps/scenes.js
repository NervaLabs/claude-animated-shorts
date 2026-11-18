// 022 — How Hannibal Crossed the Alps With War Elephants
"use strict";
function buildShots() {
  const HAN = { tunic: "#6b2a3a", trim: "#e2b64b", armor: "#c9973f", helmet: "greek", crest: "#2f2f3a", beard: "#2a1a14", cape: "#6b2a3a", skin: "#c99067" };
  const CARTH = (i) => ({ tunic: ["#6b2a3a", "#3a5a6a"][i % 2], trim: "#e2b64b", armor: "#a8aeb8", helmet: "greek", crest: "#e2b64b", skin: ["#c99067", "#a86a42"][i % 2], shieldCol: "#c9973f" });
  const snow = (g, t, a = 0.8) => { g.save(); g.globalAlpha = a; g.fillStyle = "#fff"; for (let i = 0; i < 120; i++) { const x = (rnd(i) * 1300 + Math.sin(t + i) * 30) % 1300 - 100, y = (rnd(i * 3) * 2100 + t * 200 * (0.6 + rnd(i * 7) * 0.6)) % 2100 - 100; g.beginPath(); g.arc(x, y, 4 + rnd(i * 5) * 5, 0, TAU); g.fill(); } g.restore(); };
  // 0 hook
  S2(0, { bg: "alps", draw: (g, t) => { for (let i = 0; i < 3; i++) elephant(g, { x: lerp(-200, 900, ((t - 0) * 0.06 + i * 0.25) % 1.2), y: 1700 + i * 40, h: 300, phase: t * 0.6 + i }); }, fg: (g, t) => snow(g, t),
    titles: [["37", "37 WAR ELEPHANTS", "stamp", { size: 100 }], ["Alps", "...OVER THE FROZEN ALPS", "label", { fill: "#cfe9ff" }]] });
  ev(0.2, "horns", 0.6);
  // 1 218 BC: Rome expects the sea
  { const tY = wt(1, "218"), tH = wt(1, "Hannibal"), tS = wt(1, "sea");
    S2(1, { bg: "beach", draw: (g, t) => { if (t < tS - 0.2) guy(g, HAN, { x: 540, y: 1840, h: 640, expr: "sly", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); else { for (let i = 0; i < 4; i++) guy(g, C.legion, { x: 120 + i * 260, y: 1840, h: 480, expr: "determined", look: 1, hold: { r: "spear", l: "shield" }, spearAng: -1.4, blink: blinkAt(t, i), t }); } },
      titles: [[tY, "218 BC", "stamp", { size: 150 }], [tH, "HANNIBAL BARCA OF CARTHAGE", "label", { font: "Cinzel", size: 56 }], [tS, "ROME WATCHES THE SEA...", "label", { fill: "#cfe9ff" }]] });
    ev(tY, "boom", 0.5); }
  // 2 the crossing: infantry, cavalry, elephants; storms, landslides, ambushes
  { const tI = wt(2, "50,000"), tC = wt(2, "9,000"), tE = wt(2, "37"), tSn = wt(2, "snowstorms"), tL = wt(2, "landslides"), tA = wt(2, "ambushes");
    S2(2, { bg: "alps", keys: [[0, 540, 1300, 0.9, 0], [14, 540, 1300, 0.85, 0]], draw: (g, t) => { const off = ((t - S(2)) * 60) % 240; for (let i = 0; i < 6; i++) guy(g, CARTH(i), { x: -200 + i * 240 + off, y: 1800, h: 320, expr: "determined", walk: t * 1.3 + i * 0.3, hold: { r: "spear" }, spearAng: -1.4, blink: 0, t, sweat: (t + i) % 1 }); if (t > tE - 0.2) elephant(g, { x: 300 + off, y: 1700, h: 280, phase: t * 0.6 }); if (t > tL && t < tA) for (let i = 0; i < 6; i++) { const q = ((t - tL) * 1.2 + i * 0.15) % 1; ell(g, 900 - q * 300 + i * 20, 1000 + q * 600, 30, 24, "#8a8278", 4); } if (t > tA) guy(g, { ...C.peasant(0), helmet: "kettlehat" }, { x: 900, y: 1700, h: 360, dir: -1, expr: "shout", hold: { r: "spear" }, spearAng: -0.6, t }); }, fg: (g, t) => { if (t > tSn) snow(g, t, 0.85); },
      titles: [[tI, "50,000 INFANTRY", "label"], [tC, "9,000 CAVALRY", "label"], [tE, "37 ELEPHANTS", "stamp", { size: 110 }], [tSn, "SNOWSTORMS", "label", { fill: "#cfe9ff" }], [tL, "LANDSLIDES", "label", { fill: "#d9c08a" }], [tA, "AMBUSHES", "label", { fill: "#ffd0c0" }]] });
    ev(tE, "horns", 0.6); ev(tL, "rumble"); ev(tA, "warcry"); }
  // 3 few elephants survived; three Roman armies crushed
  { const tO = wt(3, "handful"), tW = wt(3, "worked"), tT = wt(3, "three");
    S2(3, { bg: "farm", draw: (g, t) => { if (t < tW) { elephant(g, { x: 540, y: 1780, h: 320, phase: t * 0.3 }); guy(g, HAN, { x: 260, y: 1840, h: 560, expr: "sad", blink: blinkAt(t, 1), t }); } else { guy(g, HAN, { x: 540, y: 1840, h: 640, expr: "proud", armR: [2.6, 0], hold: { r: "sword" }, swordAng: -1.4, blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) { if (t < tT + i * 0.4) continue; g.save(); g.translate(180 + i * 360, 1180); rect(g, -90, -70, 180, 140, "#b8262f", 6, 10); line(g, [[-70, -50], [70, 50]], 14, "#1c1422"); line(g, [[70, -50], [-70, 50]], 14, "#1c1422"); g.restore(); } } },
      titles: [[tO, "ONLY A FEW ELEPHANTS SURVIVED", "label", { size: 56 }], [tW, "BUT IT WORKED", "stamp", { size: 110 }], [tT, "3 ROMAN ARMIES CRUSHED", "label", { fill: "#ffe08a" }]] });
    ev(tW, "boom", 0.6); for (let i = 0; i < 3; i++) ev(tT + i * 0.4, "impact", 0.5); }
}
