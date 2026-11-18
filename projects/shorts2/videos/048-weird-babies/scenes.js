// 048 — Why Medieval Paintings Have Weird-Looking Babies
"use strict";
function buildShots() {
  const MARY = { tunic: "#2f4f9f", trim: "#e2b64b", lady: true, robe: true, hair: "#5a3a24", cape: "#2f4f9f" };
  const frameP = (g, x, y, w, h, gold = "#c9a35a") => { rect(g, x - w / 2 - 30, y - h / 2 - 30, w + 60, h + 60, gold, 7, 8); rect(g, x - w / 2, y - h / 2, w, h, "#e9d4a0", 5); };
  const oldBaby = (g, x, y, s, t) => { ell(g, x, y + 60 * s, 70 * s, 80 * s, "#f6f3ea", 5); ell(g, x, y - 40 * s, 62 * s, 66 * s, "#e9c49a", 5); line(g, [[x - 40 * s, y - 70 * s], [x - 20 * s, y - 64 * s]], 4); line(g, [[x + 40 * s, y - 70 * s], [x + 20 * s, y - 64 * s]], 4); ell(g, x - 22 * s, y - 50 * s, 6 * s, 6 * s, INK, 0); ell(g, x + 22 * s, y - 50 * s, 6 * s, 6 * s, INK, 0); line(g, [[x - 18 * s, y - 12 * s], [x + 18 * s, y - 12 * s]], 4); line(g, [[x - 50 * s, y - 92 * s], [x - 30 * s, y - 100 * s]], 3, "#9a7a5a"); line(g, [[x + 50 * s, y - 92 * s], [x + 30 * s, y - 100 * s]], 3, "#9a7a5a"); for (const sd of [-1, 1]) line(g, [[x + sd * 30 * s, y - 28 * s], [x + sd * 44 * s, y - 20 * s]], 3, "#b98a6a"); g.save(); g.globalAlpha = 0.5; ell(g, x, y - 40 * s, 110 * s, 110 * s, "rgba(0,0,0,0)", 0); g.beginPath(); g.arc(x, y - 40 * s, 100 * s, 0, TAU); g.lineWidth = 8 * s; g.strokeStyle = "#f2c443"; g.stroke(); g.restore(); };
  const cuteBaby = (g, x, y, s, t) => { ell(g, x, y + 60 * s, 80 * s, 80 * s, "#f2c8a8", 5); ell(g, x, y - 40 * s, 72 * s, 70 * s, "#f6d3b8", 5); ell(g, x - 26 * s, y - 40 * s, 10 * s, 12 * s, INK, 0); ell(g, x + 26 * s, y - 40 * s, 10 * s, 12 * s, INK, 0); g.beginPath(); g.arc(x, y - 14 * s, 14 * s, 0.2, Math.PI - 0.2); g.lineWidth = 4; g.strokeStyle = INK; g.stroke(); ell(g, x - 46 * s, y - 20 * s, 12 * s, 8 * s, "#f2a0a0", 0); ell(g, x + 46 * s, y - 20 * s, 12 * s, 8 * s, "#f2a0a0", 0); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { frameP(g, 540, 1300, 640, 760); oldBaby(g, 540, 1340, 2.6, t); },
    titles: [["babies", "MEDIEVAL BABIES", "stamp", { size: 120 }], ["middle-aged", "LOOK LIKE TINY OLD MEN", "label", { fill: "#ffe08a" }], ["purpose", "...ON PURPOSE", "label"]] });
  ev(wt(0, "babies"), "boing");
  // 1 not lack of talent
  { const tT = wt(1, "talent");
    S2(1, { bg: "library", blur: true, draw: (g, t) => { guy(g, C.artist, { x: 320, y: 1840, h: 640, expr: "proud", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); frameP(g, 760, 1300, 300, 380); for (let i = 0; i < 3; i++) ell(g, 700 + i * 60, 1300 + Math.sin(i) * 40, 30, 30, ["#c0392b", "#2f4f9f", "#e2b64b"][i], 3); },
      titles: [[tT, "NOT A LACK OF TALENT", "stamp", { size: 96 }]] });
    ev(tT, "ding"); }
  // 2 nearly all were baby Jesus
  { const tJ = wt(2, "Jesus");
    S2(2, { bg: "palace", draw: (g, t) => { frameP(g, 540, 1300, 700, 820); guy(g, MARY, { x: 540, y: 1680, h: 560, expr: "calm", armR: [1.0, -0.8], armL: [-1.0, 0.8], blink: blinkAt(t, 1), t, shadow: false }); oldBaby(g, 540, 1420, 1.1, t); },
      titles: [["commissioned", "MOST COMMISSIONED BABY ART", "label", { size: 60 }], [tJ, "= BABY JESUS", "stamp", { size: 110 }]] });
    ev(tJ, "choir", 0.5); }
  // 3 theology: fully formed, wise → miniature adult
  { const tF = wt(3, "fully"), tM = wt(3, "miniature"), tC = wt(3, "chubby");
    S2(3, { bg: "palace", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1250, 1.12, 0]], draw: (g, t) => { frameP(g, 540, 1300, 560, 700); oldBaby(g, 540, 1340, 2.2, t); if (t > tF - 0.1) { const tags = [[tF, "FULLY FORMED", 260, 860], [wt(3, "wise"), "WISE", 820, 900], [wt(3, "unchanging"), "UNCHANGING", 540, 1760]]; for (const [tt, s, x, y] of tags) if (t > tt - 0.1) { rect(g, x - 170, y - 40, 340, 80, "#fff6e6", 6, 12); strokeText(g, s, x, y + 2, 38, { fill: "#1c1422", lw: 0, shadow: false }); } } },
      titles: [["theology", "CHURCH THEOLOGY", "label", { font: "Cinzel" }], [tM, "A MINIATURE ADULT", "stamp", { size: 100 }], [tC, "NOT A CHUBBY INFANT", "label", { fill: "#ffd0c0" }]] });
    ev(tM, "sting", 0.5); }
  // 4 Renaissance brings back cute babies
  { const tR = wt(4, "Renaissance"), tN = wt(4, "normal-looking");
    S2(4, { bg: "palace", draw: (g, t) => { frameP(g, 300, 1300, 380, 460); oldBaby(g, 300, 1330, 1.3, t); frameP(g, 780, 1300, 380, 460, "#e2b64b"); if (t > tN - 0.2) { cuteBaby(g, 780, 1330, 1.5, t); for (let i = 0; i < 4; i++) sparkle(g, 780 + Math.cos(i * 1.6) * 200, 1300 + Math.sin(i * 1.6) * 230, 28, (t * 0.7 + i / 4) % 1); } },
      titles: [[tR, "THE RENAISSANCE", "label", { font: "Cinzel" }], [tN, "NORMAL BABIES RETURN", "stamp", { size: 96 }]] });
    ev(tN, "ding"); }
}
