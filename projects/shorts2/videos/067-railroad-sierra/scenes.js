// 067 — How the Transcontinental Railroad Was Built Without Modern Machines
"use strict";
function buildShots() {
  const WK = (i) => ({ tunic: ["#3a5a7a", "#5a4a3a", "#3a4a3a"][i % 3], trim: "#2a2a32", helmet: "mian", hatCol: "#c9a06a", hair: "#1a1012" });
  const cliff = (g) => { poly(g, [[200, -300], [1500, -300], [1500, 2300], [380, 2300], [300, 1400], [420, 800], [260, 300]], "#9a9aa4", 8); for (let i = 0; i < 9; i++) line(g, [[400 + rnd(i) * 900, rnd(i * 3) * 2000], [480 + rnd(i * 5) * 900, rnd(i * 7) * 2000 + 200]], 4, "rgba(60,60,70,0.4)"); };
  const basket = (g, x, y, t, i) => { line(g, [[x, y - 160], [x, -300]], 4, "#6b4024"); ell(g, x, y, 90, 50, "#c9a06a", 6); for (let k = -2; k <= 2; k++) line(g, [[x + k * 30, y - 40], [x + k * 30, y + 40]], 3, "#8a6a3a"); guy(g, WK(i), { x, y: y - 10, h: 320, expr: "determined", armR: [1.8 + Math.abs(Math.sin(t * 8 + i)) * 0.5, -0.7], blink: blinkAt(t, i), t, shadow: false }); };
  // 0 hook
  S2(0, { bg: "alps", blur: true, draw: (g, t) => { cliff(g); for (let i = 0; i < 2; i++) basket(g, 140 + i * 120, 1100 + i * 260, t, i); },
    titles: [["Sierra", "THE SIERRA NEVADA", "label", { font: "Cinzel" }], ["hand", "HAND TOOLS", "stamp", { size: 110 }], ["nitroglycerin", "+ NITROGLYCERIN", "label", { fill: "#ffd0a0" }]] });
  ev(wt(0, "hand"), "clank");
  // 1 1860s: 10,000+ Chinese laborers
  { const tY = wt(1, "1860s"), tT = wt(1, "10,000"), tD = wt(1, "dangerous");
    S2(1, { bg: "alps", draw: (g, t) => { for (let i = 0; i < 8; i++) guy(g, WK(i), { x: 80 + (i % 4) * 280 + Math.floor(i / 4) * 140, y: 1840 - Math.floor(i / 4) * 140, h: 500 - Math.floor(i / 4) * 80, expr: "determined", armR: [2.4 + Math.sin(t * 6 + i) * 0.4, -0.4], blink: blinkAt(t, i), t }); line(g, [[-400, 1880], [1500, 1880]], 10, "#7a7e8a"); },
      titles: [[tY, "THE 1860s", "label"], [tT, "10,000+ CHINESE LABORERS", "stamp", { size: 80 }], [tD, "THE MOST DANGEROUS STRETCH", "label", { size: 58, fill: "#ffd0c0" }]] });
    ev(tT, "march"); }
  // 2 baskets, chisel, explosives, hauled up, inches per day
  { const tB = wt(2, "baskets"), tF = wt(2, "1,000-foot"), tC = wt(2, "chiseled"), tE = wt(2, "explosives"), tH = wt(2, "hauled"), tI = wt(2, "inches");
    S2(2, { bg: "alps", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.06, 0]], draw: (g, t) => { cliff(g); const up = clamp((t - tH) / 1.2); basket(g, 200, lerp(1300, 600, up), t, 1); if (t > tE - 0.1 && t < tH + 1.6) { rect(g, 360, 1270, 30, 60, "#c0392b", 4, 4); line(g, [[375, 1270], [380, 1220]], 3); } if (t > tH + 1.2 && t < tI) { const k = clamp((t - tH - 1.2) / 0.6); g.save(); g.globalAlpha = 1 - k; boomFx(g, 380, 1280, 200 * Math.min(1, k * 3), k); g.restore(); } if (t > tI - 0.2) { rect(g, 520, 900, 440, 180, "#fff6e6", 7, 14); strokeText(g, "INCHES / DAY", 740, 995, 56, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tB, "HANGING IN REED BASKETS", "label"], [tF, "OVER 1,000-FOOT CLIFFS", "stamp", { size: 86 }], [tC, "CHISEL THE ROCK", "label"], [tE, "PACK EXPLOSIVES", "label", { fill: "#ffd0a0" }], [tH, "HAULED UP BEFORE THE BLAST", "label", { size: 58 }], [tI, "INCHES PER DAY", "stamp", { size: 110 }]] });
    ev(tC, "clank"); ev(tC + 0.4, "clank", 0.6); ev(tH + 1.2, "boom"); }
}
