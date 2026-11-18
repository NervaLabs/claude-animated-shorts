// 088 — Why Nintendo Was Founded in 1889 (generic visuals only: no logos, no game characters)
"use strict";
function buildShots() {
  const FY = { ...C.japanese(1), tunic: "#3a3a44", trim: "#c9a35a", hair: "#3a3a3a", beard: "#5a5a5a" };
  const card = (g, x, y, s, i, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -50 * s, -80 * s, 100 * s, 160 * s, "#c0392b", 5, 8 * s); rect(g, -42 * s, -72 * s, 84 * s, 144 * s, "#f6f3ea", 0, 6 * s); const c = ["#e07aa8", "#f2c443", "#7ac06a", "#2f4f9f"][i % 4]; for (let k = 0; k < 5; k++) ell(g, Math.cos(k * 1.26) * 18 * s, -10 * s + Math.sin(k * 1.26) * 18 * s, 12 * s, 12 * s, c, 2); line(g, [[0, 10 * s], [0, 60 * s]], 4 * s, "#3a7a3a"); g.restore(); };
  const pad = (g, x, y, s) => { rect(g, x - 160 * s, y - 70 * s, 320 * s, 140 * s, "#d9dde6", 6, 30 * s); rect(g, x - 120 * s, y - 14 * s, 70 * s, 28 * s, "#3a3a44", 0, 4); rect(g, x - 99 * s, y - 35 * s, 28 * s, 70 * s, "#3a3a44", 0, 4); ell(g, x + 70 * s, y + 10 * s, 18 * s, 18 * s, "#c0392b", 3); ell(g, x + 115 * s, y - 10 * s, 18 * s, 18 * s, "#c0392b", 3); };
  // 0 hook: same year as the Eiffel Tower
  S2(0, { bg: "japanVillage", blur: true, draw: (g, t) => { eiffel(g, 260, 1840, 900, "#8a6a4a", 1); for (let i = 0; i < 3; i++) card(g, 680 + i * 120, 1500, 1.4, i, (i - 1) * 0.2); },
    titles: [["Nintendo", "A FAMOUS GAME COMPANY", "label"], ["Eiffel", "SAME YEAR AS THE EIFFEL TOWER", "stamp", { size: 74 }]] });
  ev(wt(0, "Eiffel"), "ding");
  // 1 Fusajiro Yamauchi, Kyoto, Sept 1889: hanafuda cards
  { const tF = wt(1, "Fusajiro"), tK = wt(1, "Kyoto"), tS = wt(1, "September"), tH = wt(1, "Hanafuda");
    S2(1, { bg: "japanVillage", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1300, 1.05, 0]], draw: (g, t) => { guy(g, FY, { x: 300, y: 1840, h: 620, expr: "proud", armR: [1.6, -0.6], blink: blinkAt(t, 1), t }); rect(g, 520, 1500, 460, 60, "#8a5a32", 6, 8); if (t > tH - 0.6) for (let i = 0; i < 4; i++) card(g, 580 + i * 110, 1360, 1.0, i, (i - 1.5) * 0.12); },
      titles: [[tF, "FUSAJIRO YAMAUCHI", "label"], [tK, "KYOTO, JAPAN", "label", { font: "Cinzel" }], [tS, "SEPTEMBER 1889", "stamp", { size: 100 }], [tH, "HANDMADE HANAFUDA CARDS", "label", { fill: "#ffd0e0" }]] });
    ev(tS, "boom", 0.4); ev(tH, "pop"); }
  // 2 taxis, instant rice, toys → video games in the 1970s
  { const tT = wt(2, "taxi"), tR = wt(2, "rice"), tM = wt(2, "mechanical"), tV = wt(2, "1970s");
    S2(2, { bg: "japanVillage", draw: (g, t) => { const icons = [[tT, (x, y) => { rect(g, x - 110, y - 50, 220, 70, "#f2c443", 6, 14); rect(g, x - 60, y - 90, 120, 50, "#f2c443", 6, 10); ell(g, x - 60, y + 24, 22, 22, INK, 0); ell(g, x + 60, y + 24, 22, 22, INK, 0); }], [tR, (x, y) => { ell(g, x, y, 100, 40, "#f6f3ea", 6); ell(g, x, y - 20, 80, 40, "#ffffff", 4); }], [tM, (x, y) => { gear(g, x, y, 60, t); }]]; icons.forEach(([tt, fn], i) => { if (t > tt - 0.2 && t < tV - 0.2) fn(220 + i * 320, 1400); }); if (t > tV - 0.2) { pad(g, 540, 1400, 1.8); for (let i = 0; i < 5; i++) sparkle(g, 540 + Math.cos(i * 1.3) * 340, 1400 + Math.sin(i * 1.3) * 220, 30, (t * 0.7 + i / 5) % 1); } },
      titles: [[tT, "TAXIS", "label"], [tR, "INSTANT RICE", "label"], [tM, "TOYS", "label"], [tV, "THEN: VIDEO GAMES, 1970s", "stamp", { size: 86 }]] });
    ev(tT, "pop"); ev(tR, "pop"); ev(tM, "pop"); ev(tV, "ding"); }
}
