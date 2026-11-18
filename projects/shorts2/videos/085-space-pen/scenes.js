// 085 — The Space Pen Myth
"use strict";
function buildShots() {
  const pen = (g, x, y, s, rot = 0, col = "#9a9aa8") => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -14 * s, -160 * s, 28 * s, 300 * s, col, 5, 14 * s); poly(g, [[-14 * s, 140 * s], [0, 180 * s], [14 * s, 140 * s]], "#3a3a44", 4); rect(g, 10 * s, -150 * s, 10 * s, 90 * s, "#d9dde6", 3, 4); g.restore(); };
  const pencil = (g, x, y, s, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -14 * s, -160 * s, 28 * s, 300 * s, "#f2c443", 5, 4); poly(g, [[-14 * s, 140 * s], [0, 190 * s], [14 * s, 140 * s]], "#e9c89a", 4); poly(g, [[-5 * s, 176 * s], [0, 190 * s], [5 * s, 176 * s]], "#3a3a44", 0); rect(g, -14 * s, -180 * s, 28 * s, 24 * s, "#f2a0a0", 4, 4); g.restore(); };
  // 0 hook: the myth
  S2(0, { bg: "space", blur: true, draw: (g, t) => { pen(g, 320, 1300, 1.8, -0.2); strokeText(g, "VS", 540, 1320, 90, { fill: "#fff" }); pencil(g, 760, 1300, 1.8, 0.2); if (t > wt(0, "false") - 0.1) { g.save(); g.translate(540, 1300); g.rotate(-0.15); rect(g, -260, -80, 520, 160, "rgba(255,246,230,0.95)", 8, 12); strokeText(g, "MYTH", 0, 14, 100, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); } },
    titles: [["millions", "“NASA SPENT MILLIONS ON A PEN”", "label", { size: 58 }], ["pencil", "“SOVIETS USED A PENCIL”", "label"], ["false", "COMPLETELY FALSE", "stamp", { size: 100 }]] });
  ev(wt(0, "false"), "boing");
  // 1 both used pencils — risky in zero-g
  { const tB = wt(1, "both"), tG = wt(1, "graphite"), tS = wt(1, "short-circuit");
    S2(1, { bg: "control", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => { guy(g, C.astronaut, { x: 300, y: 1840 + Math.sin(t) * 20, h: 600, expr: t > tS ? "scared" : "happy", blink: blinkAt(t, 1), t }); guy(g, { ...C.astronaut, tunic: "#c0392b" }, { x: 780, y: 1840 + Math.cos(t) * 20, h: 600, dir: -1, expr: t > tS ? "scared" : "happy", blink: blinkAt(t, 2), t }); pencil(g, 540, 1200 + Math.sin(t * 1.4) * 40, 1.0, t * 0.6); if (t > tG - 0.2) for (let i = 0; i < 8; i++) { const a = t * 0.5 + i; ell(g, 540 + Math.cos(a) * (200 + i * 20), 1100 + Math.sin(a * 1.3) * 200, 6, 4, i % 2 ? "#3a3a44" : "#e9c89a", 0); } if (t > tS - 0.2) for (let i = 0; i < 3; i++) sparkle(g, 900 + i * 40, 900 + i * 30, 40, (t * 2 + i / 3) % 1); },
      titles: [[tB, "BOTH SIDES USED PENCILS", "stamp", { size: 92 }], [tG, "FLOATING GRAPHITE & SHAVINGS", "label", { size: 58 }], [tS, "SHORT-CIRCUIT RISK", "label", { fill: "#ffd0c0" }]] });
    ev(tB, "ding"); ev(tS, "crack", 0.5); }
  // 2 Paul Fisher's pen, sold to both for $2.95
  { const tP = wt(2, "Paul"), tO = wt(2, "own"), tSp = wt(2, "Space"), tBo = wt(2, "both"), tPr = wt(2, "2.95");
    S2(2, { bg: "lab", draw: (g, t) => { guy(g, { ...C.suit(1), tunic: "#3a3a44" }, { x: 300, y: 1840, h: 620, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); if (t > tSp - 0.2) { pen(g, 700, 1300, 2.0, 0.2); for (let i = 0; i < 4; i++) sparkle(g, 700 + Math.cos(i * 1.6) * 160, 1300 + Math.sin(i * 1.6) * 260, 28, (t * 0.7 + i / 4) % 1); } if (t > tO - 0.2 && t < tSp - 0.2) for (let i = 0; i < 6; i++) { const q = (t + i / 6) % 1; ell(g, 560 + i * 60, 1000 + q * 600, 16, 16, "#f2c443", 3); } if (t > tPr - 0.2) { rect(g, 560, 1660, 300, 140, "#fff6e6", 7, 14); strokeText(g, "$2.95", 710, 1740, 70, { fill: "#2f8a3a", lw: 0, shadow: false }); } },
      titles: [[tP, "INVENTOR PAUL FISHER", "label"], [tO, "WITH HIS OWN MONEY", "label", { fill: "#ffe08a" }], [tSp, "THE PRESSURIZED SPACE PEN", "stamp", { size: 84 }], [tBo, "SOLD TO NASA & THE SOVIETS", "label", { size: 58 }], [tPr, "$2.95 EACH", "stamp", { size: 110 }]] });
    ev(tSp, "ding"); ev(tPr, "cash"); }
}
