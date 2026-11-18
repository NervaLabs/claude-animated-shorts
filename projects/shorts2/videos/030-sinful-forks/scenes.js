// 030 — Why Fork Use Was Once Considered Sinful in Europe
"use strict";
function buildShots() {
  const PRIN = { tunic: "#7a1a4a", trim: "#e2b64b", hair: "#2a1a14", lady: true, robe: true, helmet: "crown", cape: "#3a1a5a" };
  const fork = (g, x, y, s, rot = 0, col = "#f2c443") => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -6 * s, 0, 12 * s, 110 * s, col, 4 * s, 6 * s); rect(g, -22 * s, -20 * s, 44 * s, 24 * s, col, 4 * s, 8 * s); rect(g, -22 * s, -70 * s, 10 * s, 54 * s, col, 4 * s, 4 * s); rect(g, 12 * s, -70 * s, 10 * s, 54 * s, col, 4 * s, 4 * s); g.restore(); };
  const table = (g) => { rect(g, -200, 1560, 1500, 60, "#8a5a32", 7, 8); rect(g, -200, 1610, 1500, 300, "#6b4024", 6); for (let i = 0; i < 3; i++) { ell(g, 220 + i * 320, 1550, 110, 26, "#f6f3ea", 5); meatChunk(g, 220 + i * 320, 1530, 40, i); } };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { guy(g, C.bishop, { x: 330, y: 1840, h: 640, expr: "angry", armR: [2.6, -0.4], blink: blinkAt(t, 1), t }); fork(g, 780, 1300, 3.2, 0.2 + Math.sin(t * 2) * 0.05); },
    titles: [["fork", "THE FORK", "stamp", { size: 140 }], ["insult", "“AN INSULT TO GOD!”", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "insult"), "gasp");
  // 1 knives, spoons, fingers
  { const tK = wt(1, "knives"), tS = wt(1, "spoons"), tF = wt(1, "fingers");
    S2(1, { bg: "castleNight", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, C.noble(i), { x: 220 + i * 320, y: 1720, h: 460, expr: "happy", armR: [1.6 + Math.sin(t * 6 + i) * 0.4, -0.6], blink: blinkAt(t, i), t, shadow: false }); table(g); },
      titles: [[tK, "KNIVES", "label"], [tS, "SPOONS", "label"], [tF, "...AND FINGERS", "stamp", { size: 110 }]] }, warm(0.15));
    ev(tF, "splat"); }
  // 2 Byzantine princess brings golden forks to Venice
  { const tB = wt(2, "Byzantine"), tG = wt(2, "golden"), tV = wt(2, "Venice"), tH = wt(2, "horrified");
    S2(2, { bg: "palace", draw: (g, t) => { guy(g, PRIN, { x: 300, y: 1840, h: 620, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); if (t > tG - 0.1) fork(g, 470, 1180, 1.6, 0.4); if (t > tH - 0.1) for (let i = 0; i < 2; i++) guy(g, C.monk, { x: 700 + i * 220, y: 1840, h: 540, dir: -1, expr: "shock", armR: [2.6, 0.2], armL: [-2.6, -0.2], blink: 0, t }); },
      titles: [[tB, "A BYZANTINE PRINCESS", "label", { font: "Cinzel" }], [tG, "GOLDEN TWO-PRONGED FORKS", "label", { fill: "#ffe08a" }], [tV, "VENICE, 11TH CENTURY", "stamp", { size: 84 }], [tH, "THE CLERGY: HORRIFIED", "label", { fill: "#ffd0c0" }]] });
    ev(tG, "sparkle"); ev(tH, "gasp"); }
  // 3 God gave us natural forks: fingers
  { const tN = wt(3, "natural"), tA = wt(3, "arrogant");
    S2(3, { bg: "palace", blur: true, draw: (g, t) => { guy(g, C.bishop, { x: 360, y: 1840, h: 660, expr: t > tA ? "angry" : "shout", mouthOpen: talk(t), armR: [2.8, 0], blink: blinkAt(t, 1), t }); if (t > tN - 0.2) { g.save(); g.translate(780, 1200); for (let i = 0; i < 5; i++) rect(g, -90 + i * 40, -120 - (i === 2 ? 30 : 0) + (i === 0 ? 60 : 0), 32, 140, SKIN, 5, 16); rect(g, -100, 0, 200, 150, SKIN, 6, 30); g.restore(); } },
      titles: [[tN, "“GOD GAVE US NATURAL FORKS”", "label", { size: 56 }], [tA, "ARROGANT VANITY!", "stamp", { size: 110 }]] });
    ev(tA, "clank"); }
  // 4 forks standard by the 1700s
  { const tY = wt(4, "1700s");
    S2(4, { bg: "victorianRoom", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 220 + i * 320, y: 1720, h: 460, expr: "happy", blink: blinkAt(t, i), t, shadow: false }); table(g); for (let i = 0; i < 3; i++) fork(g, 320 + i * 320, 1520, 0.9, 0.3, "#d9dde6"); },
      titles: [["standard", "STANDARD ONLY BY...", "label"], [tY, "THE 1700s", "stamp", { size: 140 }]] }, warm(0.1));
    ev(tY, "ding"); }
}
