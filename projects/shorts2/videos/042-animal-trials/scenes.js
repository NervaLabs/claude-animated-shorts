// 042 — The Medieval Trial Where Animals Were Put in Court
"use strict";
function buildShots() {
  const JUDGE = { tunic: "#1c1422", trim: "#c0392b", robe: true, hair: "#d9d9d9", helmet: "beret", hatCol: "#c0392b" };
  const LAW = { ...C.gent(2), tunic: "#2a2a3a", trim: "#f6f3ea", robe: true, helmet: "beret", hatCol: "#1c1422" };
  const rat = (g, x, y, s) => { ell(g, x, y, 24 * s, 12 * s, "#6a6a72", 3); ell(g, x + 22 * s, y - 4 * s, 10 * s, 8 * s, "#6a6a72", 3); line(g, [[x - 22 * s, y], [x - 44 * s, y - 8 * s]], 3, "#6a6a72"); ell(g, x + 26 * s, y - 6 * s, 2 * s, 2 * s, INK, 0); };
  const court = (g) => { rect(g, -300, 1200, 1700, 80, "#6b4024", 7); rect(g, 640, 1050, 420, 160, "#8a5a32", 7, 8); };
  // 0 hook: pigs, rats, insects on trial
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { pig(g, { x: 300, y: 1780, h: 1.6 * 120 }); for (let i = 0; i < 3; i++) rat(g, 620 + i * 90, 1800, 2.2); for (let i = 0; i < 5; i++) ell(g, 900 + Math.sin(t * 4 + i) * 40, 1400 + Math.cos(t * 5 + i) * 60, 10, 8, INK, 0); },
    titles: [["pigs", "PIGS", "label"], ["rats", "RATS", "label"], ["insects", "INSECTS", "label"], ["trial", "ON TRIAL", "stamp", { size: 140 }], ["lawyers", "WITH DEFENSE LAWYERS", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "trial"), "clank"); ev(wt(0, "pigs"), "oink");
  // 1 arrested, jailed, given representation
  { const tA = wt(1, "arrested"), tJ = wt(1, "jail"), tL = wt(1, "legal");
    S2(1, { bg: "stone", draw: (g, t) => { if (t < tL - 0.2) { pig(g, { x: 540, y: 1800, h: 1.9 * 120 }); if (t > tJ - 0.2) for (let i = 0; i < 7; i++) line(g, [[160 + i * 125, 1100], [160 + i * 125, 1900]], 16, "#2a2a32"); else guy(g, { ...C.knight, tunic: "#2f4f9f" }, { x: 860, y: 1840, h: 600, dir: -1, expr: "angry", hold: { r: "spear" }, blink: blinkAt(t, 1), t }); } else { pig(g, { x: 300, y: 1800, h: 1.4 * 120 }); guy(g, LAW, { x: 700, y: 1840, h: 620, dir: -1, expr: "proud", armR: [2.2, -0.4], hold: { r: "scroll" }, blink: blinkAt(t, 2), t }); } },
      titles: [["13th", "13TH–18TH CENTURIES", "label"], [tA, "ARRESTED", "stamp", { size: 120 }], [tJ, "JAILED", "stamp", { size: 120 }], [tL, "GIVEN A LAWYER", "stamp", { size: 110 }]] });
    ev(tA, "clank"); ev(tJ, "clank"); ev(tL, "ding"); }
  // 2 1522: rats too scared of cats to appear → postponed
  { const tY = wt(2, "1522"), tB = wt(2, "barley"), tT = wt(2, "terrified"), tP = wt(2, "postponed");
    S2(2, { bg: "palace", keys: [[0, 540, 1300, 1.0, 0], [22, 540, 1300, 1.06, 0]], draw: (g, t) => { court(g); guy(g, JUDGE, { x: 850, y: 1200, h: 440, dir: -1, expr: t > tP ? "tired" : "angry", blink: blinkAt(t, 2), t, shadow: false });
      guy(g, LAW, { x: 300, y: 1840, h: 620, expr: t > tT ? "talk" : "proud", mouthOpen: t > tT ? talk(t) : 0, armR: [2.4, -0.3], blink: blinkAt(t, 1), t });
      if (t > tB - 0.2 && t < tT) for (let i = 0; i < 3; i++) rat(g, 560 + i * 100, 1810, 2.0);
      if (t > tT - 0.1 && t < tP) { rect(g, 520, 1340, 460, 380, "#fff6e6", 7, 14); cat(g, 750, 1640, 200, t, "#d9a441"); for (let i = 0; i < 2; i++) rat(g, 620 + i * 260, 1450, 1.6); strokeText(g, "!!", 750, 1440, 70, { fill: "#c0392b", lw: 0, shadow: false }); }
      if (t > tP - 0.1) { rect(g, 520, 1450, 460, 160, "#fff6e6", 7, 14); strokeText(g, "POSTPONED", 750, 1540, 64, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tY, "1522, FRANCE", "stamp", { size: 110 }], [tB, "RATS ACCUSED: EATING BARLEY", "label", { size: 56 }], [tT, "“TOO SCARED OF CATS TO COME!”", "label", { size: 56, fill: "#ffe08a" }], [tP, "CASE POSTPONED", "stamp", { size: 110 }]] });
    ev(tY, "boom", 0.5); ev(tT, "laugh", 0.5); ev(tP, "clank"); }
}
