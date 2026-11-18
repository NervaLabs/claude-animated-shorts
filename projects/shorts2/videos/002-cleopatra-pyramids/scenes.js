// 002 — Why Cleopatra Lived Closer to the iPhone Than the Pyramids (generic phone only)
"use strict";
function buildShots() {
  const TL = (g, t, k, marks) => timeline(g, 150, 930, 1500, -2600, 2030, marks, k);
  const M = { pyr: { y: -2560, label: "2560 BC", col: "#ffe08a" }, cleo: { y: -69, label: "69 BC", col: "#ffd0d0", up: true }, moon: { y: 1969, label: "1969", col: "#cfe9ff", up: true }, ph: { y: 2007, label: "2007", col: "#d9f2a0" } };
  // 0 hook: Cleopatra between a pyramid and a phone
  S2(0, { bg: "desert", blur: true, draw: (g, t) => {
    guy(g, C.cleo, { x: 540, y: 1820, h: 620, expr: "shock", look: t > wt(0, "iPhone") ? 1 : -1, blink: blinkAt(t, 1), t });
    if (t > wt(0, "iPhone") - 0.2) phone(g, 880, 1300, 180, 0.1 + Math.sin(t * 2) * 0.05);
  }, titles: [["Cleopatra", "CLEOPATRA", "label", { font: "Cinzel" }], ["iPhone", "CLOSER TO THE iPHONE...", "label", { size: 64 }], ["Great", "...THAN THE PYRAMIDS?!", "stamp", { size: 86 }]] });
  ev(wt(0, "iPhone"), "ding"); ev(wt(0, "Great"), "boing");
  // 1 Great Pyramid 2560 BC
  { const tY = wt(1, "2560");
    S2(1, { bg: "desert", draw: (g, t) => { pyramid(g, 640, 1300, 380, clamp(0.4 + (t - S(1)) * 0.15)); for (let i = 0; i < 3; i++) { const x = 200 + i * 160 - ((t * 40) % 160); rect(g, x - 60, 1620, 120, 90, "#d9b06a", 5); guy(g, C.egyptian(i), { x: x + 100, y: 1720, h: 320, expr: "determined", walk: t * 1.2 + i * 0.3, lean: 12, armR: [-1.4, 0.3], blink: blinkAt(t, i), t }); } },
      titles: [["Great", "THE GREAT PYRAMID OF GIZA", "label", { font: "Cinzel", size: 58 }], [tY, "2560 BC", "stamp", { size: 140 }]] });
    ev(tY, "boom", 0.6); }
  // 2 Cleopatra born 69 BC, 2,400 years later
  { const tC = wt(2, "69"), tM = wt(2, "2,400");
    S2(2, { bg: "map", draw: (g, t) => { TL(g, t, clamp((t - S(2)) / 1.5) * 0.53, [M.pyr, M.cleo]); if (t > tM) { line(g, [[150, 1620], [150 + 780 * 0.54, 1620]], 6, "#ffe08a"); strokeText(g, "2,400+ YEARS", 330, 1700, 54, { fill: "#ffe08a" }); } guy(g, C.cleo, { x: 580, y: 1300, h: 300, expr: "happy", blink: blinkAt(t, 1), t }); },
      titles: [[tC, "CLEOPATRA: 69 BC", "stamp", { size: 96 }], [tM, "2,400 YEARS LATER", "label", { fill: "#ffe08a" }]] });
    ev(tC, "boom", 0.5); }
  // 3 pyramids already a tourist attraction
  { const tT = wt(3, "tourist"), tR = wt(3, "Romans");
    S2(3, { bg: "desert", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, i % 2 ? C.roman(i) : C.egyptian(i), { x: 120 + i * 260, y: 1820 + (i % 2) * 30, h: 440, expr: i === 0 ? "shock" : "happy", look: -0.5, headTilt: -8, armR: i === 0 ? [2.5, -0.4] : [0.3, 0.2], blink: blinkAt(t, i), t }); },
      titles: [[tT, "ANCIENT TOURIST ATTRACTIONS", "label", { size: 58 }], [tR, "ROMAN TOURISTS!", "stamp", { size: 100 }]] });
    ev(tT, "ding"); }
  // 4 1969 moon landing, 2007 phone
  { const tA = wt(4, "Apollo"), tI = wt(4, "iPhone"), tJ = wt(4, "2,000");
    S2(4, { bg: "map", draw: (g, t) => {
      const k = t < tA ? 0.53 : lerp(0.53, 1, clamp((t - tA) / 2));
      TL(g, t, k, [M.pyr, M.cleo, M.moon, M.ph]);
      if (t > tA && t < tI) rocketV(g, 900, 1250, 110, t);
      if (t > tI) phone(g, 920, 1220, 150, 0.1);
      if (t > tJ) { line(g, [[150 + 780 * 0.545, 1620], [930, 1620]], 6, "#d9f2a0"); strokeText(g, "~2,000 YEARS", 760, 1700, 50, { fill: "#d9f2a0" }); }
      guy(g, C.cleo, { x: 580, y: 1300, h: 300, expr: t > tJ ? "shock" : "neutral", look: 1, blink: blinkAt(t, 1), t }); },
      titles: [[tA, "APOLLO 11 · 1969", "stamp", { size: 96 }], [tI, "FIRST iPHONE · 2007", "stamp", { size: 84 }], [tJ, "CLEOPATRA IS CLOSER TO US", "label", { size: 58 }]] });
    ev(tA, "whoosh"); ev(tI, "ding"); ev(tJ, "boing"); }
  // 5 ancient even to her
  { const tF = wt(5, "final");
    S2(5, { bg: "desert", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1200, 0.85, 0]], draw: (g, t) => { guy(g, C.cleo, { x: 360, y: 1820, h: 600, expr: "shock", look: 1, headTilt: -8, blink: blinkAt(t, 1), t }); for (let i = 0; i < 4; i++) sparkle(g, 700 + Math.cos(i * 1.6) * 200, 1100 + Math.sin(i) * 100, 26, (t * 0.7 + i / 4) % 1); },
      titles: [["ancient", "ANCIENT... EVEN TO HER", "stamp", { size: 92 }], [tF, "THE FINAL PHARAOH", "label", { font: "Cinzel" }]] });
    ev(tF, "choir", 0.5); }
}
