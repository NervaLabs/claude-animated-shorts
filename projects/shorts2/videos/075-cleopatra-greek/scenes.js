// 075 — Why Cleopatra Wasn't Actually Egyptian
"use strict";
function buildShots() {
  const CL = { ...C.cleo };
  const PT = { ...C.greek(1), tunic: "#f6f3ea", trim: "#2f4f9f", helmet: "crown", cape: "#7a1a4a", beard: "#5a3a24" };
  const tree = (g, t, k) => { const pts = [[540, 900], [300, 1150], [780, 1150], [200, 1400], [420, 1400], [660, 1400], [880, 1400], [540, 1650]]; const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 7], [5, 7]]; for (const [a, b] of edges) if (k > a / 8) line(g, [pts[a], pts[b]], 6, "#e2b64b"); pts.forEach(([x, y], i) => { if (k > i / 8) { ell(g, x, y, 56, 56, i === 7 ? "#7a1a4a" : "#f6f3ea", 5); strokeText(g, i === 7 ? "VII" : "Π", x, y + 14, 40, { fill: i === 7 ? "#fff" : "#2f4f9f", lw: 0, shadow: false }); } }); };
  // 0 hook
  S2(0, { bg: "egyptHall", blur: true, draw: (g, t) => { guy(g, CL, { x: 540, y: 1840, h: 700, expr: "sly", blink: blinkAt(t, 1), t }); },
    titles: [["Cleopatra", "CLEOPATRA VII", "label", { font: "Cinzel" }], ["Egyptian", "NOT ETHNICALLY EGYPTIAN", "stamp", { size: 90 }]] });
  ev(wt(0, "Egyptian"), "sting", 0.5);
  // 1 Ptolemaic dynasty, Macedonian Greek, from Alexander's general
  { const tPd = wt(1, "Ptolemaic"), tM = wt(1, "Macedonian"), tA = wt(1, "Alexander"), tY = wt(1, "323");
    S2(1, { bg: "egyptHall", draw: (g, t) => { guy(g, PT, { x: 540, y: 1840, h: 680, expr: "proud", armR: [2.2, -0.3], blink: blinkAt(t, 1), t }); if (t > tA - 0.2) guy(g, { ...C.greek(0), helmet: "laurel", tunic: "#f6f3ea", trim: "#e2b64b", cape: "#7a1a4a" }, { x: 200, y: 1840, h: 560, expr: "proud", blink: blinkAt(t, 2), t }); },
      titles: [[tPd, "THE PTOLEMAIC DYNASTY", "label", { font: "Cinzel" }], [tM, "MACEDONIAN GREEKS", "stamp", { size: 100 }], [tA, "FROM ALEXANDER'S GENERAL", "label", { fill: "#ffe08a" }], [tY, "323 BC", "stamp", { size: 130 }]] });
    ev(tM, "boom", 0.4); ev(tY, "horns"); }
  // 2 300 years: Greek-speaking, intermarried
  { const tT = wt(2, "300"), tG = wt(2, "Greek"), tB = wt(2, "bloodline");
    S2(2, { bg: "egyptHall", blur: true, draw: (g, t) => { tree(g, t, clamp((t - S(2)) / 4)); if (t > tG - 0.1) { rect(g, 60, 1760, 400, 120, "#fff6e6", 7, 14); strokeText(g, "ΕΛΛΗΝΙΚΑ", 260, 1830, 44, { fill: "#2f4f9f", lw: 0, shadow: false }); } },
      titles: [[tT, "NEARLY 300 YEARS", "label"], [tG, "THEY SPOKE GREEK", "stamp", { size: 100 }], [tB, "MARRIED WITHIN THE FAMILY", "label", { fill: "#ffd0c0" }]] });
    ev(tG, "ding"); }
  // 3 Cleopatra first to learn Egyptian
  { const tF = wt(3, "first"), tL = wt(3, "language");
    S2(3, { bg: "nile", draw: (g, t) => { guy(g, CL, { x: 320, y: 1840, h: 660, expr: "talk", mouthOpen: talk(t), armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); for (let i = 0; i < 2; i++) guy(g, C.egyptian(i), { x: 700 + i * 220, y: 1840, h: 560, dir: -1, expr: t > tL ? "happy" : "shock", blink: blinkAt(t, i + 2), t }); if (t > tL - 0.2) { rect(g, 520, 1000, 400, 160, "#fff6e6", 7, 14); for (let k = 0; k < 3; k++) { const x = 620 + k * 100; g.beginPath(); g.ellipse(x, 1050, 18, 24, 0, 0, TAU); g.lineWidth = 7; g.strokeStyle = "#2f4f9f"; g.stroke(); line(g, [[x, 1074], [x, 1130]], 7, "#2f4f9f"); line(g, [[x - 24, 1090], [x + 24, 1090]], 7, "#2f4f9f"); } } },
      titles: [[tF, "THE FIRST OF HER DYNASTY", "label"], [tL, "TO LEARN EGYPTIAN", "stamp", { size: 110 }]] });
    ev(tF, "pop"); ev(tL, "choir", 0.5); }
}
