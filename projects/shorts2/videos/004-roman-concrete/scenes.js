// 004 — Concrete That Gets Stronger in Seawater
"use strict";
function buildShots() {
  const harbor = (g, t, crumble = 0) => { sea(g, 1300, t, -900, 2000, "#3f8fc4", "#1f5f94"); for (let i = 0; i < 4; i++) { rect(g, -300 + i * 380, 1150, 300, 400, "#c9c2b2", 6, 6); for (let r = 0; r < 5; r++) line(g, [[-300 + i * 380, 1180 + r * 70], [i * 380, 1180 + r * 70]], 2.5, "rgba(80,70,60,0.35)"); } rect(g, -400, 1110, 1900, 60, "#b9b2a2", 6); };
  // 0 hook: Roman pier vs modern pillar
  S2(0, { bg: "beach", blur: true, draw: (g, t) => {
    g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); pillarCrumble(g, 270, 1700, 260, clamp((t - 1.5) / 3), t); strokeText(g, "MODERN", 270, 1800, 50, { fill: "#fff" }); g.restore();
    g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); rect(g, 680, 1100, 220, 600, "#c9c2b2", 6, 6); for (let r = 0; r < 6; r++) line(g, [[680, 1150 + r * 80], [900, 1150 + r * 80]], 2.5, "rgba(80,70,60,0.35)"); strokeText(g, "ROMAN", 790, 1800, 50, { fill: "#ffe08a" }); for (let i = 0; i < 3; i++) sparkle(g, 790 + Math.cos(i * 2) * 120, 1300 + i * 100, 24, (t * 0.7 + i / 3) % 1); g.restore();
    line(g, [[540, -200], [540, 2400]], 10); },
    titles: [["stronger", "ROMAN CONCRETE IS STRONGER", "stamp", { size: 70 }]] });
  ev(wt(0, "stronger"), "boom", 0.5);
  // 1 modern concrete crumbles in saltwater
  { const tF = wt(1, "50"), tSa = wt(1, "saltwater");
    S2(1, { bg: "beach", draw: (g, t) => { waves(g, 1600, t, -900, 2000, "#4f94c8", 20); for (let i = 0; i < 3; i++) pillarCrumble(g, 240 + i * 300, 1750, 260, clamp((t - tF + 0.3 - i * 0.2) / 2.5), t); },
      titles: [["steel-reinforced", "MODERN STEEL-REINFORCED", "label", { size: 60 }], [tF, "CRUMBLES IN 50–100 YEARS", "stamp", { size: 76 }], [tSa, "(IN SALTWATER)", "label", { fill: "#cfe9ff" }]] });
    ev(tF, "crack"); ev(tF + 0.8, "crash", 0.4); }
  // 2 Roman harbors: still standing
  { const tT = wt(2, "2,000"), tH = wt(2, "harder");
    S2(2, { bg: "sea", keys: [[0, 540, 1150, 0.85, 0], [8, 540, 1150, 0.92, 0]], draw: (g, t) => { harbor(g, t); for (let i = 0; i < 3; i++) guy(g, C.legion, { x: 100 + i * 360, y: 1110, h: 220, expr: "proud", blink: blinkAt(t, i), t, shadow: false }); },
      titles: [[tT, "2,000 YEARS OLD", "stamp", { size: 110 }], ["still", "STILL STANDING", "label"], [tH, "...AND GETTING HARDER", "label", { fill: "#ffe08a" }]] });
    ev(tT, "boom", 0.5); ev(tH, "ding"); }
  // 3 the recipe
  { const tV = wt(3, "volcanic"), tQ = wt(3, "quicklime"), tSw = wt(3, "seawater");
    S2(3, { bg: "forum", blur: true, draw: (g, t) => {
      g.save(); g.translate(540, 1720); ell(g, 0, 0, 260, 60, "#7a6a5a", 6); g.restore();
      const items = [[tV, "#5a5560", "ASH"], [tQ, "#f2efe6", "LIME"], [tSw, "#4f94c8", "SEAWATER"]];
      items.forEach(([tt, col, lab], i) => { if (t < tt - 0.2) return; const k = clamp((t - tt + 0.2) / 0.6); const x = 200 + i * 340; guy(g, C.roman(i), { x, y: 1880, h: 440, dir: x < 540 ? 1 : -1, expr: "determined", armR: [2.0, -0.6], blink: blinkAt(t, i), t }); g.save(); g.translate(lerp(x + (x < 540 ? 80 : -80), 540, k), lerp(1460, 1680, k)); rect(g, -40, -30, 80, 60, col, 4, 8); g.restore(); strokeText(g, lab, x, 1360, 40, { fill: "#fff" }); });
      smoothPath(g, [[1400, 1250], [1600, 700], [1750, 650], [1900, 1250]]); fillInk(g, "#7a6a6a", 5); },
      titles: [["secret", "THE SECRET RECIPE", "label"], [tV, "VOLCANIC ASH", "label", { fill: "#cfd0d8" }], [tQ, "+ QUICKLIME", "label"], [tSw, "+ SEAWATER", "label", { fill: "#cfe9ff" }]] });
    ev(tV, "pop"); ev(tQ, "pop"); ev(tSw, "splash", 0.5); }
  // 4 crystals seal the cracks
  { const tC = wt(4, "cracks"), tG = wt(4, "grow"), tS = wt(4, "seal");
    S2(4, { bg: "dark", draw: (g, t) => { crystalCrack(g, 540, 1250, 220, clamp((t - tG + 0.3) / 3), t); for (let i = 0; i < 6; i++) { const q = (t * 0.5 + i / 6) % 1; ell(g, 140 + i * 160, 1700 - q * 300, 14, 14, "rgba(120,200,255,0.6)", 2); } },
      titles: [[tC, "WATER SEEPS INTO CRACKS", "label", { size: 60, fill: "#cfe9ff" }], [tG, "CRYSTALS GROW", "stamp", { size: 110 }], [tS, "...AND SEAL THEM", "label", { fill: "#ffe08a" }]] });
    ev(tC, "bubble"); ev(tG, "sparkle"); ev(tS, "ding"); }
  // 5 the ocean heals it
  { const tD = wt(5, "destroys"), tH = wt(5, "heals");
    S2(5, { bg: "beach", draw: (g, t) => { waves(g, 1600, t, -900, 2000, "#4f94c8", 20); pillarCrumble(g, 270, 1750, 260, clamp((t - tD) / 2), t); rect(g, 680, 1150, 220, 600, "#c9c2b2", 6, 6); if (t > tH) for (let i = 0; i < 5; i++) sparkle(g, 790 + Math.cos(i * 1.3) * 140, 1250 + i * 90, 26, (t * 0.8 + i / 5) % 1); },
      titles: [[tD, "NATURE DESTROYS MODERN CONCRETE", "label", { size: 52 }], [tH, "THE OCEAN HEALS ROMAN CONCRETE", "stamp", { size: 64 }]] });
    ev(tD, "crack"); ev(tH, "choir", 0.6); }
}
