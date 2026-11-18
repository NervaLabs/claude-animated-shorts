// 037 — How Coffee Was Once Banned as a Political Threat
"use strict";
function buildShots() {
  const CH2 = { ...C.king, hair: "#1a1012", beard: null, tunic: "#3a1a5a", cape: "#c0392b" };
  const SUL = { tunic: "#2f6f5a", trim: "#e2b64b", helmet: "turban", hatCol: "#f6f3ea", beard: "#2a1a14", robe: true, cape: "#7a1a4a" };
  const cup = (g, x, y, s, t) => { rect(g, x - 50 * s, y - 70 * s, 100 * s, 70 * s, "#f6f3ea", 5, 14 * s); ell(g, x, y - 70 * s, 50 * s, 12 * s, "#5a3420", 4); g.beginPath(); g.arc(x + 56 * s, y - 40 * s, 20 * s, -1.4, 1.4); g.lineWidth = 8 * s; g.strokeStyle = INK; g.stroke(); for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; line(g, [[x - 20 * s + i * 20 * s, y - 90 * s - q * 80 * s], [x - 10 * s + i * 20 * s, y - 120 * s - q * 80 * s]], 4 * s, "#e9e4dc"); g.restore(); } };
  const tables = (g, t, n, talkers = true) => { for (let i = 0; i < n; i++) { const x = 200 + (i % 3) * 340; guy(g, C.gent(i), { x: x - 60, y: 1840, h: 460, expr: talkers ? (i % 2 ? "shout" : "talk") : "happy", mouthOpen: talk(t + i), armR: [2.0 + Math.sin(t * 5 + i) * 0.4, -0.4], blink: blinkAt(t, i), t }); cup(g, x + 70, 1600, 0.9, t + i); } };
  const mug0 = (g, x, y) => { rect(g, x - 60, y - 140, 120, 140, "#9a6a3a", 5, 12); g.beginPath(); g.arc(x + 70, y - 70, 34, -1.4, 1.4); g.lineWidth = 12; g.strokeStyle = INK; g.stroke(); for (let i = 0; i < 4; i++) ell(g, x - 44 + i * 29, y - 144, 20, 16, "#fff6e6", 3); };
  // 0 hook
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => { cup(g, 540, 1500, 3.2, t); if (t > wt(0, "ban") - 0.2) { g.save(); g.globalAlpha = 0.9; ell(g, 540, 1380, 300, 300, "rgba(0,0,0,0)", 0); g.beginPath(); g.arc(540, 1380, 300, 0, TAU); g.lineWidth = 34; g.strokeStyle = "#c0392b"; g.stroke(); line(g, [[330, 1170], [750, 1590]], 34, "#c0392b"); g.restore(); } },
    titles: [["ban", "BANNED: COFFEE", "stamp", { size: 110 }], ["talk", "IT MADE PEOPLE TALK", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "ban"), "boom", 0.5);
  // 1 coffeehouses → awake, debating
  { const tC = wt(1, "coffeehouses"), tD = wt(1, "drunk"), tA = wt(1, "awake"), tP = wt(1, "politics");
    S2(1, { bg: "victorianRoom", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.1, 0]], draw: (g, t) => { tables(g, t, 3, t > tA); if (t > tD - 0.2 && t < tA - 0.1) { mug0(g, 540, 1080); line(g, [[440, 920], [640, 1120]], 22, "#c0392b"); line(g, [[640, 920], [440, 1120]], 22, "#c0392b"); }; if (t > tP - 0.2) for (let i = 0; i < 3; i++) newspaper(g, 200 + i * 340, 1150, 180, 120, "NEWS", (i - 1) * 0.1); },
      titles: [[tC, "COFFEEHOUSES SPREAD", "label"], ["1500s", "1500s–1600s", "stamp", { size: 110 }], [tD, "NOT DRUNK...", "label"], [tA, "WIDE AWAKE", "stamp", { size: 120 }], [tP, "DEBATING POLITICS", "label", { fill: "#ffd0c0" }]] }, warm(0.1));
    ev(tA, "ding"); ev(tP, "crowd"); }
  // 2 1675 Charles II shuts them
  { const tY = wt(2, "1675"), tCh = wt(2, "Charles"), tS = wt(2, "shut"), tSe = wt(2, "seminaries");
    S2(2, { bg: "palace", draw: (g, t) => { guy(g, CH2, { x: 360, y: 1840, h: 660, expr: t > tS ? "angry" : "proud", armR: [2.4, -0.3], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); if (t > tS - 0.1) { rect(g, 620, 1000, 360, 240, "#fff6e6", 7, 10); strokeText(g, "CLOSED", 800, 1130, 64, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tY, "1675", "stamp", { size: 160 }], [tCh, "KING CHARLES II", "label", { font: "Cinzel" }], [tSe, "“SEMINARIES OF SEDITION”", "label", { size: 56, fill: "#ffd0c0" }]] });
    ev(tY, "boom", 0.5); ev(tS, "clank"); }
  // 3 outrage → cancelled after 11 days
  { const tO = wt(3, "outrage"), tE = wt(3, "11");
    S2(3, { bg: "town", draw: (g, t) => { for (let i = 0; i < 5; i++) guy(g, C.gent(i), { x: 140 + i * 200, y: 1840, h: 480, expr: "angry", mouthOpen: talk(t + i), armR: [2.8 + Math.sin(t * 8 + i) * 0.2, 0], blink: 0, t }); if (t > tE - 0.2) { rect(g, 340, 900, 400, 260, "#fff6e6", 7, 14); rect(g, 340, 900, 400, 70, "#c0392b", 7, 14); strokeText(g, "DAYS", 540, 935, 36, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, String(Math.min(11, 1 + Math.floor((t - tE + 0.2) * 12))), 540, 1070, 100, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tO, "PUBLIC OUTRAGE", "stamp", { size: 110 }], [tE, "BAN CANCELLED IN 11 DAYS", "label", { fill: "#ffe08a" }]] });
    ev(tO, "crowd"); ev(tE, "cheer", 0.6); }
}
