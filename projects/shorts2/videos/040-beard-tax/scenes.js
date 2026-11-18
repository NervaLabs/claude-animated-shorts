// 040 — Why Tudor England Taxed Men for Growing Beards
"use strict";
function buildShots() {
  const H8 = { ...C.king, tunic: "#7a1a2a", trim: "#e2b64b", hair: "#b8642a", beard: "#b8642a", cape: "#3a1a1a", fat: true };
  const E1 = { ...C.queen, hair: "#c8502a", tunic: "#f6f3ea", trim: "#c9a35a", cape: "#3a1a4a" };
  const MAN = (i, beard = true) => ({ ...C.gent(i), beard: beard ? ["#4a3020", "#2a1a14", "#8a5a2a"][i % 3] : null });
  const coin = (g, x, y, r) => { ell(g, x, y, r, r, "#f2c443", 4); strokeText(g, "£", x, y + r * 0.35, r * 1.1, { fill: "#a07a20", lw: 0, shadow: false }); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { guy(g, H8, { x: 540, y: 1840, h: 700, expr: "sly", armR: [2.4, -0.3], blink: blinkAt(t, 1), t }); if (t > wt(0, "tax") - 0.2) coin(g, 820, 1100, 80); },
    titles: [["Henry", "KING HENRY VIII", "label", { font: "Cinzel" }], ["beards", "A TAX ON BEARDS?!", "stamp", { size: 110 }]] });
  ev(wt(0, "beards"), "cash");
  // 1 1535: progressive tax by wealth unless you shave
  { const tY = wt(1, "1535"), tB = wt(1, "beard"), tSt = wt(1, "status"), tP = wt(1, "progressive"), tSh = wt(1, "shave");
    S2(1, { bg: "palace", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => {
      if (t < tP - 0.2) { guy(g, H8, { x: 540, y: 1840, h: 680, expr: t > tB ? "proud" : "neutral", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); if (t > tB - 0.1 && t < tSt) { g.save(); g.globalAlpha = 0.5; ell(g, 540, 1250, 120, 80, "#ffe08a", 0); g.restore(); } }
      else { for (let i = 0; i < 3; i++) { guy(g, MAN(i), { x: 220 + i * 320, y: 1840, h: 460 + i * 60, expr: "nervous", blink: blinkAt(t, i), t }); for (let k = 0; k <= i; k++) coin(g, 220 + i * 320, 1060 - i * 60 - k * 70, 40); } }
    }, titles: [[tY, "1535", "stamp", { size: 160 }], [tSt, "BEARDS = STATUS", "label"], [tP, "RICHER MEN PAID MORE", "label", { fill: "#ffe08a" }], [tSh, "...UNLESS THEY SHAVED", "stamp", { size: 92 }]] });
    ev(tY, "boom", 0.5); ev(tP, "coins"); }
  // 2 Elizabeth I revives it: beards older than two weeks
  { const tE = wt(2, "Elizabeth"), tR = wt(2, "revived"), tW = wt(2, "weeks");
    S2(2, { bg: "palace", draw: (g, t) => { guy(g, E1, { x: 320, y: 1840, h: 640, expr: "proud", armR: [2.2, -0.3], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); if (t > tW - 0.2) { rect(g, 600, 1000, 380, 300, "#fff6e6", 7, 14); for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) { rect(g, 620 + c * 50, 1060 + r * 100, 42, 80, r === 1 && c === 6 ? "#c0392b" : "#e9dcc0", 3, 4); } strokeText(g, "14 DAYS", 790, 1260, 44, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tE, "QUEEN ELIZABETH I", "label", { font: "Cinzel" }], [tR, "REVIVED THE TAX", "stamp", { size: 110 }], [tW, "BEARDS OVER 2 WEEKS OLD", "label", { fill: "#ffd0c0" }]] });
    ev(tR, "clank"); }
  // 3 can't pay → reach for the razor
  { const tA = wt(3, "afford"), tR = wt(3, "razor");
    S2(3, { bg: "victorianRoom", blur: true, draw: (g, t) => { const shaved = t > tR + 0.5; guy(g, MAN(1, !shaved), { x: 420, y: 1840, h: 680, expr: shaved ? "happy" : t > tA ? "sad" : "nervous", armR: t > tR - 0.1 ? [2.4 + Math.sin(t * 10) * 0.2, -0.6] : [0.4, 0.2], blink: blinkAt(t, 1), t }); if (t > tR - 0.1) { g.save(); g.translate(560, 1260); g.rotate(-0.4 + Math.sin(t * 10) * 0.2); rect(g, 0, -12, 140, 24, "#d9dde6", 5, 4); rect(g, -80, -10, 80, 20, "#6b4024", 4, 6); g.restore(); } if (shaved) for (let i = 0; i < 4; i++) sparkle(g, 420 + Math.cos(i * 1.6) * 160, 1250 + Math.sin(i) * 80, 26, (t + i / 4) % 1); },
      titles: [[tA, "CAN'T AFFORD IT?", "label"], [tR, "GRAB THE RAZOR", "stamp", { size: 110 }]] });
    ev(tR, "whip"); ev(tR + 0.5, "ding", 0.6); }
}
