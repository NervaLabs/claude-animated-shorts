// 082 — Why Oxford University Is Older Than the Aztec Empire
"use strict";
function buildShots() {
  const H2 = { ...C.king, tunic: "#7a1a2a", hair: "#b8642a", beard: "#b8642a" };
  const STU = (i) => ({ ...C.monk, tunic: ["#1c1422", "#3a2a1a", "#2a2a3a"][i % 3] });
  // 0 hook
  S2(0, { bg: "town", blur: true, draw: (g, t) => { gothicCollege(g, 540, 1800, 900, 700); },
    titles: [["Oxford", "OXFORD UNIVERSITY", "stamp", { size: 110 }], ["200", "200+ YEARS OLDER THAN...", "label"], ["Aztec", "THE AZTEC EMPIRE", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "Aztec"), "sting", 0.5);
  // 1 1096 teaching; 1167 Henry II bans Paris
  { const tY = wt(1, "1096"), tR = wt(1, "1167"), tH = wt(1, "Henry"), tP = wt(1, "Paris");
    S2(1, { bg: "town", draw: (g, t) => { if (t < tR - 0.2) { gothicCollege(g, 540, 1800, 820, 620); for (let i = 0; i < 3; i++) guy(g, STU(i), { x: 220 + i * 320, y: 1860, h: 460, expr: "happy", hold: { r: "scroll" }, blink: blinkAt(t, i), t }); } else { guy(g, H2, { x: 320, y: 1840, h: 660, expr: "angry", armR: [2.6, -0.2], blink: blinkAt(t, 1), t }); if (t > tP - 0.2) { rect(g, 600, 1000, 380, 300, "#fff6e6", 7, 14); strokeText(g, "PARIS", 790, 1120, 64, { fill: "#2f4f9f", lw: 0, shadow: false }); line(g, [[630, 1030], [950, 1270]], 18, "#c0392b"); line(g, [[950, 1030], [630, 1270]], 18, "#c0392b"); } } },
      titles: [[tY, "~1096 AD", "stamp", { size: 130 }], [tR, "1167", "stamp", { size: 130 }], [tH, "HENRY II BANS PARIS", "label", { fill: "#ffd0c0" }]] });
    ev(tY, "boom", 0.4); ev(tR, "boom", 0.4); ev(tP, "clank"); }
  // 2 Tenochtitlan 1325
  { const tT = wt(2, "Tenochtitlan"), tY = wt(2, "1325"), tC = wt(2, "centuries");
    S2(2, { bg: "lake", draw: (g, t) => { if (t < tC - 0.2) { const k = clamp((t - tT) / 2); g.save(); g.globalAlpha = Math.max(0.2, k); stepTemple(g, 540, 1700, 500); g.restore(); for (let i = 0; i < 3; i++) guy(g, C.aztec(i), { x: 200 + i * 340, y: 1860, h: 460, expr: "happy", blink: blinkAt(t, i), t }); } else { timeline(g, 150, 930, 1500, 1050, 1400, [{ y: 1096, label: "OXFORD" }, { y: 1325, label: "TENOCHTITLAN", up: true }], 1); } },
      titles: [[tT, "TENOCHTITLAN FOUNDED...", "label"], [tY, "1325", "stamp", { size: 150 }], [tC, "OXFORD: CENTURIES AHEAD", "label", { fill: "#ffe08a" }]] });
    ev(tY, "drums"); ev(tC, "ding"); }
}
