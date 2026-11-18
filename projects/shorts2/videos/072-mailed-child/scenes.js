// 072 — The Postal Service Once Allowed Children to Be Mailed
"use strict";
function buildShots() {
  const MAY = { ...C.kid(1), lady: true, hair: "#c9a06a", tunic: "#c0392b" };
  const POST = { ...C.gent(2), tunic: "#2f4f7a", trim: "#e2b64b", helmet: "cap", hatCol: "#2f4f7a" };
  const stamp2 = (g, x, y, s, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -60 * s, -74 * s, 120 * s, 148 * s, "#fff6e6", 4, 4); rect(g, -48 * s, -60 * s, 96 * s, 100 * s, "#2f8a5a", 0, 2); strokeText(g, "1¢", 0, 70 * s - 20 * s, 34 * s, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); };
  const train = (g, x, y, t) => { rect(g, x, y - 220, 360, 200, "#3a3a44", 6, 14); rect(g, x + 300, y - 280, 70, 80, "#2a2a32", 5, 6); for (let i = 0; i < 2; i++) { rect(g, x - 380 - i * 380, y - 200, 360, 180, "#7a3a2a", 6, 10); for (let w = 0; w < 4; w++) rect(g, x - 360 - i * 380 + w * 86, y - 170, 60, 60, "#f6f0d0", 4, 4); } for (let i = 0; i < 6; i++) ell(g, x + 300 - i * 140, y - 10, 30, 30, "#2a2a32", 5); for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, x + 335 - q * 120, y - 300 - q * 160, 30 + q * 40, 30 + q * 40, "#e9e4dc", 0); g.restore(); } };
  // 0 hook
  S2(0, { bg: "americanTown", blur: true, draw: (g, t) => { guy(g, MAY, { x: 540, y: 1840, h: 440, expr: "happy", blink: blinkAt(t, 1), t }); stamp2(g, 600, 1720, 0.6, 0.1); },
    titles: [["Parcel", "US PARCEL POST, 1913", "label"], ["mailed", "PEOPLE MAILED THEIR KIDS", "stamp", { size: 86 }]] });
  ev(wt(0, "mailed"), "boing");
  // 1 50-lb limit; cheaper than a ticket
  { const tF = wt(1, "50"), tTr = wt(1, "train"), tS = wt(1, "stamps"), tP = wt(1, "pennies");
    S2(1, { bg: "americanTown", draw: (g, t) => { rect(g, 160, 1100, 340, 220, "#fff6e6", 7, 14); strokeText(g, "LIMIT:", 330, 1180, 40, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, t > tF - 0.1 ? "50 LB" : "", 330, 1260, 60, { fill: "#c0392b", lw: 0, shadow: false }); if (t > tTr - 0.1) { rect(g, 580, 1100, 340, 220, "#fff6e6", 7, 14); strokeText(g, "TICKET", 750, 1180, 40, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "$$$", 750, 1260, 60, { fill: "#c0392b", lw: 0, shadow: false }); } if (t > tS - 0.2) { guy(g, MAY, { x: 540, y: 1840, h: 420, expr: "happy", blink: blinkAt(t, 1), t }); stamp2(g, 600, 1730, 0.55, -0.1); } if (t > tP - 0.2) strokeText(g, "53¢", 820, 1600, 80, { fill: "#ffe08a" }); },
      titles: [[tF, "PACKAGES UP TO 50 POUNDS", "label"], [tTr, "TRAIN TICKETS: EXPENSIVE", "label", { fill: "#ffd0c0" }], [tS, "A STAMP ON THE COAT", "stamp", { size: 96 }], [tP, "= JUST PENNIES", "label", { fill: "#ffe08a" }]] });
    ev(tS, "pop"); ev(tP, "coins"); }
  // 2 1914: May Pierstorff mailed 73 miles
  { const tY = wt(2, "1914"), tM = wt(2, "May"), tSe = wt(2, "73"), tB = wt(2, "banned");
    S2(2, { bg: "farm", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1300, 1.04, 0]], draw: (g, t) => { if (t < tSe - 0.2) { guy(g, POST, { x: 300, y: 1840, h: 620, expr: "happy", blink: blinkAt(t, 1), t }); guy(g, MAY, { x: 720, y: 1840, h: 420, dir: -1, expr: "happy", blink: blinkAt(t, 2), t }); stamp2(g, 770, 1730, 0.55, 0.1); } else if (t < tB - 0.2) { line(g, [[-400, 1760], [1500, 1760]], 8, "#7a7e8a"); train(g, lerp(-200, 1200, clamp((t - tSe) / 4)), 1760, t); rect(g, 340, 900, 400, 180, "#fff6e6", 7, 14); strokeText(g, "73 MILES", 540, 990, 64, { fill: "#1c1422", lw: 0, shadow: false }); } else { rect(g, 240, 1000, 600, 340, "#fff6e6", 8, 14); strokeText(g, "NO HUMANS", 540, 1140, 64, { fill: "#c0392b", lw: 0, shadow: false }); strokeText(g, "IN THE MAIL", 540, 1230, 54, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tY, "1914", "stamp", { size: 160 }], [tM, "MAY PIERSTORFF, AGE 5", "label"], [tSe, "MAILED TO GRANDMA IN IDAHO", "label", { size: 58, fill: "#ffe08a" }], [tB, "THEN: BANNED", "stamp", { size: 120 }]] });
    ev(tY, "boom", 0.4); ev(tSe, "whistle"); ev(tB, "clank"); }
}
