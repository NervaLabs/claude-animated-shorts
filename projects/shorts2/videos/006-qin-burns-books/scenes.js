// 006 — The Chinese Emperor Who Burned History (non-graphic)
"use strict";
function buildShots() {
  const bookPile = (g, x, y, s, burning, t) => { for (let i = 0; i < 9; i++) { const r = Math.floor(i / 4), c = i % 4; g.save(); g.translate(x - 120 + c * 70 + r * 35, y - r * 40); g.rotate((rnd(i) - 0.5) * 0.4); rect(g, -40, -22, 80, 44, ["#e9dcc0", "#d9c8a0", "#c9b48a"][i % 3], 4, 4); line(g, [[-30, -10], [30, -10]], 3, "rgba(60,40,20,0.4)"); g.restore(); } if (burning) for (let i = 0; i < 4; i++) flame(g, x - 80 + i * 55, y - 70, 30 + Math.sin(t * 5 + i) * 6, t + i); };
  // 0 hook
  S2(0, { bg: "chinaPalace", blur: true, draw: (g, t) => { guy(g, C.chinaEmp, { x: 300, y: 1820, h: 600, expr: "stern", armR: [2.2, -0.2], blink: blinkAt(t, 1), t }); bookPile(g, 760, 1780, 1, t > wt(0, "erase"), t); },
    titles: [["first", "CHINA'S FIRST EMPEROR", "label", { font: "Cinzel" }], ["erase", "ERASE ALL HISTORY", "stamp", { size: 104 }]] });
  ev(wt(0, "erase"), "boom", 0.5);
  // 1 213 BC, critics with old books
  { const tY = wt(1, "213"), tQ = wt(1, "Qin"), tC = wt(1, "criticize");
    S2(1, { bg: "chinaPalace", draw: (g, t) => { guy(g, C.chinaEmp, { x: 860, y: 1820, h: 600, dir: -1, expr: t > tC ? "angry" : "neutral", blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) guy(g, C.scholarCN(i), { x: 120 + i * 200, y: 1820, h: 500, expr: "talk", mouthOpen: talk(t + i), armR: [1.6, -0.4], hold: { r: "scroll" }, blink: blinkAt(t, 3 + i), t }); if (t > tC) shout(g, 300, 1080, "IN THE OLD DAYS...", 44, clamp((t - tC) / 0.15), "#2f5fae", [300, 1260]); },
      titles: [[tY, "213 BC", "stamp", { size: 150 }], [tQ, "QIN SHI HUANG", "label", { font: "Cinzel" }], [tC, "SCHOLARS CRITICIZE HIM", "label", { fill: "#ffd0c0" }]] });
    ev(tY, "boom", 0.5); ev(tC, "gasp"); }
  // 2 the burning (except medicine, agriculture, fortune-telling)
  { const tB = wt(2, "burned"), tE = wt(2, "except"), tM = wt(2, "medicine"), tA = wt(2, "agriculture"), tF = wt(2, "fortune-telling");
    S2(2, { bg: "chinaPalace", blur: true, draw: (g, t) => {
      bookPile(g, 540, 1780, 1, t > tB - 0.2, t);
      [[tM, "MEDICINE", "#6fbf5a"], [tA, "FARMING", "#e2b64b"], [tF, "FORTUNE", "#7b5ac9"]].forEach(([tt, lab, col], i) => { if (t < tt - 0.1) return; g.save(); g.translate(180 + i * 360, 1180); g.rotate((i - 1) * 0.05); g.scale(easeBack(clamp((t - tt + 0.1) / 0.3)), easeBack(clamp((t - tt + 0.1) / 0.3))); rect(g, -110, -70, 220, 140, col, 6, 8); strokeText(g, lab, 0, 0, 34, { fill: "#fff" }); g.restore(); }); },
      titles: [["history", "HISTORY · PHILOSOPHY · POETRY", "label", { size: 52 }], [tB, "BURNED", "stamp", { size: 140 }], [tE, "EXCEPT...", "label", { fill: "#ffe08a" }]] });
    ev(tB, "crash", 0.4); ev(tB, "drone"); }
  // 3 hidden books → the Great Wall
  { const tBr = wt(3, "branded"), tW = wt(3, "Great");
    S2(3, { bg: "greatWall", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, C.scholarCN(i), { x: 140 + i * 240, y: 1820, h: 440, expr: "sad", walk: (t * 0.6 + i * 0.25) % 1, armR: [2.6, 0.2], blink: blinkAt(t, i), t }); for (let i = 0; i < 4; i++) rect(g, 100 + i * 240, 1350, 80, 50, "#a8a090", 4); },
      titles: [["hiding", "CAUGHT WITH BANNED BOOKS?", "label", { size: 58 }], [tW, "→ BUILD THE GREAT WALL", "stamp", { size: 86 }]] });
    ev(tW, "build"); }
  // 4 460 scholars (sober)
  { const tN = wt(4, "460"), tS = wt(4, "silence");
    S2(4, { bg: "dark", draw: (g, t) => { for (let i = 0; i < 5; i++) { const x = 220 + i * 160; rect(g, x - 16, 1300, 32, 120, "#f2efe6", 4, 4); flame(g, x, 1292, 16, t + i); } rect(g, 120, 1420, 840, 50, "#5a3b2a", 5, 6); },
      titles: [[tN, "460 SCHOLARS", "label", { font: "Cinzel", fill: "#e6e0f2", size: 80 }], [tS, "SILENCED", "label", { font: "Cinzel", fill: "#e6e0f2", size: 80 }]] });
    ev(tN, "drone"); }
  // 5 the dynasty collapses 3 years after his death
  { const tC = wt(5, "collapsed"), tT = wt(5, "three");
    S2(5, { bg: "chinaPalace", draw: (g, t) => { const k = clamp((t - tC) / 1.2); g.save(); g.translate(540, 1500); g.rotate(k * 0.3); guy(g, C.chinaEmp, { x: 0, y: 300, h: 560, expr: "shock", t, blink: 0 }); g.restore(); if (k > 0) { dust(g, 540, 1800, 260, k, 3, "#c9b49a"); boomFx(g, 540, 1500, 400, k * 1.2); } },
      titles: [["Ironically", "IRONICALLY...", "label"], [tC, "THE DYNASTY COLLAPSED", "stamp", { size: 84 }], [tT, "3 YEARS AFTER HIS DEATH", "label", { fill: "#ffe08a" }]] });
    ev(tC, "crash"); KICKS.push({ t: tC, a: 18 }); }
}
