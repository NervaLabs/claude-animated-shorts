// 019 — Why Egyptians Shaved Their Eyebrows for Cats
"use strict";
function buildShots() {
  const noBrows = (o) => ({ ...o, nobrows: true });
  const BASTET = { tunic: "#2a2430", trim: "#e7c15f", skin: "#d9a441", helmet: "catears", robe: true, lady: true };
  HATS.catears = HATS.catears || ((g, rx, ry, lw) => { for (const sd of [-1, 1]) poly(g, [[sd * rx * 0.3, -ry * 0.8], [sd * rx * 0.75, -ry * 1.6], [sd * rx * 0.95, -ry * 0.55]], "#d9a441", lw); });
  // 0 hook
  S2(0, { bg: "egyptHall", blur: true, draw: (g, t) => { guy(g, C.egyptian(0), { x: 340, y: 1840, h: 600, expr: t > wt(0, "eyebrows") ? "sad" : "happy", blink: blinkAt(t, 1), t }); cat(g, 760, 1820, 220, t, "#d9a441", -1); if (t > wt(0, "eyebrows")) { line(g, [[440, 1150], [520, 1110]], 8, "#c9c4b8"); rect(g, 500, 1080, 70, 40, "#c9c4b8", 4, 6); } },
    titles: [["cats", "THEY LOVED CATS SO MUCH...", "label", { size: 62 }], ["eyebrows", "THEY SHAVED THEIR EYEBROWS", "stamp", { size: 76 }]] });
  ev(wt(0, "eyebrows"), "boing", 0.5);
  // 1 sacred to Bastet
  { const tS = wt(1, "sacred"), tB = wt(1, "Bastet");
    S2(1, { bg: "egyptHall", draw: (g, t) => { if (t > tB - 0.2) { g.save(); g.globalAlpha = clamp((t - tB + 0.2) / 0.4); guy(g, BASTET, { x: 540, y: 1700, h: 620, expr: "proud", armR: [2.2, -0.3], blink: blinkAt(t, 3), t }); g.restore(); for (let i = 0; i < 5; i++) sparkle(g, 540 + Math.cos(i * 1.3) * 280, 1100 + Math.sin(i * 2) * 200, 28, (t * 0.7 + i / 5) % 1); } for (let i = 0; i < 3; i++) cat(g, 160 + i * 380, 1880, 160, t + i, ["#d9a441", "#2a2430", "#9a9a9a"][i]); },
      titles: [[tS, "SACRED PROTECTORS", "label"], [tB, "THE GODDESS BASTET", "stamp", { size: 96 }]] });
    ev(tB, "choir"); }
  // 2 killing a cat = death penalty
  { const tD = wt(2, "death");
    S2(2, { bg: "egyptHall", blur: true, draw: (g, t) => { guy(g, C.pharaoh, { x: 540, y: 1840, h: 640, expr: "stern", armR: [2.4, -0.2], blink: blinkAt(t, 1), t }); cat(g, 860, 1840, 200, t, "#d9a441", -1); },
      titles: [["Killing", "HARM A CAT, EVEN BY ACCIDENT?", "label", { size: 56 }], [tD, "DEATH PENALTY", "stamp", { size: 110 }]] });
    ev(tD, "sting", 0.5); }
  // 3 mourning; shaving eyebrows
  { const tM = wt(3, "mourning"), tSh = wt(3, "shaving");
    S2(3, { bg: "egyptHall", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, C.egyptian(i), { x: 120 + i * 260, y: 1840, h: 500, expr: "sad", sweat: 0, blink: blinkAt(t, i), t }); if (t > tSh) { const x = 380, y = 1300; line(g, [[x - 40, y + 30], [x + 30, y - 10]], 8, "#c9c4b8"); rect(g, x + 20, y - 30, 60, 36, "#c9c4b8", 4, 6); for (let k = 0; k < 4; k++) { const q = (t * 1.2 + k / 4) % 1; ell(g, x + 40 + q * 40, y - 60 + q * 120, 4, 2, INK, 0); } } },
      titles: [[tM, "THE WHOLE FAMILY MOURNED", "label"], [tSh, "EYEBROWS: SHAVED", "stamp", { size: 104 }]] });
    ev(tM, "drone", 0.5); ev(tSh, "boing", 0.4); }
  // 4 mummified cats + mummified mice
  { const tMu = wt(4, "mummified"), tSa = wt(4, "sarcophagi"), tMi = wt(4, "mice");
    S2(4, { bg: "egyptHall", keys: [[0, 540, 1350, 1.0, 0], [10, 540, 1400, 1.15, 0]], draw: (g, t) => { for (let i = 0; i < 3; i++) mummy(g, 280 + i * 260, 1800, 180, true); if (t > tSa - 0.2) rect(g, 160, 1560, 760, 120, "#c9973f", 6, 10); if (t > tMi - 0.2) for (let i = 0; i < 3; i++) { const x = 300 + i * 220; ell(g, x, 1520, 30, 16, "#e9dcc0", 3); for (let k = 0; k < 3; k++) line(g, [[x - 26, 1512 + k * 6], [x + 26, 1514 + k * 6]], 1.5, "rgba(120,100,70,0.6)"); ell(g, x + 30, 1510, 10, 9, "#e9dcc0", 2); } },
      titles: [[tMu, "MUMMIFIED CATS", "stamp", { size: 104 }], [tSa, "TINY SARCOPHAGI", "label", { fill: "#ffe08a" }], [tMi, "+ MUMMIFIED MICE (SNACKS)", "label", { size: 58 }]] });
    ev(tMu, "choir", 0.5); ev(tMi, "boing"); }
}
