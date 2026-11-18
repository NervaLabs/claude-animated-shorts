// 023 — Why Vikings Brought Cats on Ships
"use strict";
function buildShots() {
  const FREYJA = { tunic: "#2f6f9a", trim: "#e7c15f", hair: "#e9c45a", helmet: null, robe: true, lady: true, cape: "#7a2a4a" };
  const longship = (g, x, y, h, t) => { sailShip(g, { x, y, h, t, hull: "#6b4024", stripe: "#c9a35a", sail: "#c0392b", masts: [[6, 1.0]], seed: 2 }); };
  const rat = (g, x, y, s) => { ell(g, x, y, 24 * s, 12 * s, "#6a6a72", 3); ell(g, x + 22 * s, y - 4 * s, 10 * s, 8 * s, "#6a6a72", 3); line(g, [[x - 22 * s, y], [x - 44 * s, y - 8 * s]], 3, "#6a6a72"); g.beginPath(); g.arc(x + 26 * s, y - 6 * s, 2 * s, 0, TAU); g.fillStyle = INK; g.fill(); };
  // 0 hook
  S2(0, { bg: "fjord", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#3f6f94", "#1f4f74"); longship(g, 540, 1500, 520, t); cat(g, 560, 1400, 120, t, "#d9a441"); },
    titles: [["cats", "VIKING SHIP CATS", "stamp", { size: 110 }], ["crew", "ESSENTIAL CREW", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "cats"), "ding");
  // 1 grain & fish in the hull → rats
  { const tG = wt(1, "grain"), tR = wt(1, "rats");
    S2(1, { bg: "stone", blur: true, draw: (g, t) => { for (let i = 0; i < 4; i++) barrel(g, 200 + i * 220, 1780, 200, "#9a6a3a"); for (let i = 0; i < 3; i++) rect(g, 240 + i * 260, 1500, 160, 100, "#d9c08a", 5, 10); if (t > tR - 0.2) for (let i = 0; i < 6; i++) rat(g, ((t * 120 + i * 200) % 1300) - 100, 1820 + (i % 2) * 20, 1.4); },
      titles: [["North", "NORTH ATLANTIC VOYAGES", "label"], [tG, "MONTHS OF GRAIN & FISH", "label", { fill: "#ffe08a" }], [tR, "RATS!", "stamp", { size: 140 }]] });
    ev(tR, "scramble"); }
  // 2 cats hunt the rats
  { const tH = wt(2, "hunt");
    S2(2, { bg: "stone", blur: true, draw: (g, t) => { for (let i = 0; i < 3; i++) barrel(g, 240 + i * 300, 1780, 200, "#9a6a3a"); const x = ((t - S(2)) * 240) % 1400 - 200; rat(g, x + 160, 1820, 1.4); cat(g, x, 1840, 150, t, "#d9a441"); },
      titles: [[tH, "CATS: PEST CONTROL", "stamp", { size: 96 }]] });
    ev(tH, "boing"); }
  // 3 Freyja's cat chariot; a kitten for newlyweds
  { const tF = wt(3, "Freyja"), tCh = wt(3, "chariot"), tK = wt(3, "kitten");
    S2(3, { bg: "fjord", draw: (g, t) => { if (t < tK - 0.2) { const x = 300 + Math.sin(t * 0.8) * 60; chariot(g, { x, y: 1700, h: 240, dir: 1, t }); for (let i = 0; i < 2; i++) cat(g, x + 260 + i * 130, 1720 + i * 20, 260, t + i, "#9a9a9a"); guy(g, FREYJA, { x: x - 4, y: 1620, h: 320, sit: true, expr: "proud", armR: [1.6, -0.3], t, shadow: false }); } else { for (let i = 0; i < 2; i++) guy(g, C.viking(i), { x: 330 + i * 360, y: 1840, h: 560, dir: i ? -1 : 1, expr: "happy", blink: blinkAt(t, i), t }); cat(g, 520, 1500, 110, t, "#d9a441"); for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.6) * 180, 1300 + Math.sin(i) * 80, 26, (t * 0.7 + i / 4) % 1); } },
      titles: [[tF, "THE GODDESS FREYJA", "label", { font: "Cinzel" }], [tCh, "A CHARIOT PULLED BY CATS", "stamp", { size: 82 }], [tK, "A KITTEN FOR NEWLYWEDS", "label", { fill: "#ffe08a" }]] });
    ev(tF, "choir", 0.5); ev(tK, "ding"); }
}
