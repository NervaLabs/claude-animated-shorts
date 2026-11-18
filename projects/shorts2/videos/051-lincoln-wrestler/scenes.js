// 051 — Why Abraham Lincoln Is in the Wrestling Hall of Fame
"use strict";
function buildShots() {
  const ABE = { ...C.lincoln };
  const ABEy = { ...C.lincoln, helmet: null, beard: null, tunic: "#8a6a4a", trim: "#5a3a24", hair: "#1a1012" };
  const FOE = (i) => ({ ...C.peasant(i), tunic: ["#6b4024", "#3a5a3a", "#5a3a5a"][i % 3] });
  // 0 hook
  S2(0, { bg: "americanTown", blur: true, draw: (g, t) => { guy(g, ABE, { x: 540, y: 1840, h: 720, expr: "sly", armR: [2.4, -0.4], armL: [-2.4, 0.4], blink: blinkAt(t, 1), t }); },
    titles: [["Lincoln", "ABRAHAM LINCOLN", "label", { font: "Cinzel" }], ["wrestler", "ELITE WRESTLER", "stamp", { size: 120 }]] });
  ev(wt(0, "wrestler"), "boom", 0.5);
  // 1 6'4", long arms; ~300 matches, lost once
  { const tS = wt(1, "Standing"), tA = wt(1, "arms"), tT = wt(1, "300"), tO = wt(1, "once");
    S2(1, { bg: "farm", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1300, 1.05, 0]], draw: (g, t) => {
      if (t < tT - 0.3) { guy(g, ABEy, { x: 420, y: 1840, h: 820, expr: "proud", armR: t > tA ? [1.6, 0] : undefined, armL: t > tA ? [-1.6, 0] : undefined, blink: blinkAt(t, 1), t }); line(g, [[860, 1840], [860, 1020]], 6, "#fff"); strokeText(g, "6'4\"", 940, 1440, 60, { fill: "#fff" }); }
      else { const ph = Math.sin(t * 3); guy(g, ABEy, { x: 440 + ph * 30, y: 1840, h: 700, expr: "determined", armR: [1.4, -0.3], armL: [-1.0, 0.3], lean: 12, blink: 0, t }); guy(g, FOE(Math.floor(t)), { x: 700 + ph * 30, y: 1840, h: 600, dir: -1, expr: "angry", armR: [1.4, -0.3], lean: 12, blink: 0, t }); rect(g, 680, 900, 340, 240, "#fff6e6", 7, 14); strokeText(g, "W " + Math.min(299, Math.floor((t - tT + 0.3) * 60)), 850, 990, 54, { fill: "#2f8a3a", lw: 0, shadow: false }); strokeText(g, "L " + (t > tO ? 1 : 0), 850, 1080, 54, { fill: "#c0392b", lw: 0, shadow: false }); }
    }, titles: [[tS, "6-FOOT-4", "stamp", { size: 120 }], [tA, "UNUSUALLY LONG ARMS", "label"], [tT, "~300 FRONTIER MATCHES", "label", { fill: "#ffe08a" }], [tO, "LOST ONLY ONCE", "stamp", { size: 100 }]] });
    ev(tT, "crowd"); ev(tO, "ding"); }
  // 2 lifting opponents by their belts
  { const tL = wt(2, "lifting"), tB = wt(2, "belts");
    S2(2, { bg: "farm", draw: (g, t) => { const k = clamp((t - tL) / 0.6); guy(g, ABEy, { x: 440, y: 1840, h: 760, expr: k > 0 ? "laugh" : "determined", armR: [2.4 - k * 0.3, -0.2], armL: [-2.4 + k * 0.3, 0.2], blink: blinkAt(t, 1), t }); guy(g, FOE(2), { x: 600, y: 1840 - k * 380, h: 560, dir: -1, expr: k > 0 ? "shock" : "angry", armR: k > 0 ? [2.8, 0.3] : [1.2, -0.3], armL: k > 0 ? [-2.8, -0.3] : undefined, blink: 0, t }); if (k > 0) { rect(g, 520, 1840 - k * 380 - 230, 160, 26, "#5a3a24", 4, 4); } for (let i = 0; i < 3; i++) guy(g, FOE(i + 3), { x: 160 + i * 380, y: 1960, h: 360, expr: "shock", blink: 0, t, shadow: false }); },
      titles: [[tL, "LIFTED OPPONENTS CLEAN UP", "label"], [tB, "BY THEIR BELTS", "stamp", { size: 110 }]] });
    ev(tL, "gasp"); ev(tB, "boing"); }
  // 3 1992 Hall of Fame
  { const tY = wt(3, "1992"), tH = wt(3, "Hall");
    S2(3, { bg: "whiteHouse", draw: (g, t) => { guy(g, ABE, { x: 540, y: 1840, h: 700, expr: "proud", blink: blinkAt(t, 1), t }); if (t > tH - 0.2) { const k = clamp((t - tH + 0.2) / 0.3); g.save(); g.translate(540, 1500); g.scale(k, k); ell(g, 0, 0, 90, 90, "#f2c443", 7); strokeText(g, "★", 0, 20, 90, { fill: "#c08a20", lw: 0, shadow: false }); g.restore(); for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 280, 1200 + Math.sin(i * 2) * 200, 30, (t * 0.8 + i / 6) % 1); } },
      titles: [[tY, "1992", "stamp", { size: 160 }], [tH, "WRESTLING HALL OF FAME", "label", { fill: "#ffe08a" }]] });
    ev(tY, "boom", 0.5); ev(tH, "cheer", 0.6); }
}
