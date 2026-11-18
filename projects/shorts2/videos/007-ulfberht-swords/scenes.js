// 007 — Why Viking Swords Were Ahead of Their Time
"use strict";
function buildShots() {
  const blade = (g, x, y, s, rot, name = true, bent = 0, misspelled = false) => { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); g.beginPath(); g.moveTo(-8 * u, 0); g.quadraticCurveTo(-8 * u + bent * 60 * u, -200 * u, -4 * u + bent * 120 * u, -380 * u); g.lineTo(4 * u + bent * 120 * u, -380 * u); g.quadraticCurveTo(8 * u + bent * 60 * u, -200 * u, 8 * u, 0); g.closePath(); fillInk(g, "#d9dfe6", 4); rect(g, -40 * u, 0, 80 * u, 14 * u, "#c9973f", 4, 4); rect(g, -8 * u, 14 * u, 16 * u, 70 * u, "#6b4024", 4); ell(g, 0, 90 * u, 14 * u, 12 * u, "#c9973f", 3); if (name && !bent) { g.save(); g.translate(0, -200 * u); g.rotate(-Math.PI / 2); g.font = `900 ${16 * u}px Cinzel`; g.textAlign = "center"; g.fillStyle = "#3a3a44"; g.fillText(misspelled ? "+VLFBERH+T" : "+VLFBERH+T", 0, 6 * u); g.restore(); } g.restore(); };
  const forge = (g, t) => { rect(g, 600, 1500, 400, 280, "#5a4a4a", 6, 10); for (let i = 0; i < 3; i++) flame(g, 680 + i * 120, 1500, 40 + Math.sin(t * 6 + i) * 8, t + i); g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 800, 1450, 0, 500, [[0, "rgba(255,160,60,0.4)"], [1, "rgba(255,160,60,0)"]]); g.fillRect(300, 950, 1000, 1000); g.restore(); };
  // 0 hook
  S2(0, { bg: "fjord", blur: true, draw: (g, t) => { guy(g, C.viking(0), { x: 320, y: 1820, h: 620, expr: "proud", armR: [2.4, 0], blink: blinkAt(t, 1), t }); blade(g, 700, 1500, 140, 0.15 + Math.sin(t) * 0.05); for (let i = 0; i < 3; i++) sparkle(g, 720 + i * 20, 1100 + i * 120, 26, (t * 0.8 + i / 3) % 1); },
    titles: [["metallurgy", "VIKING STEEL", "label"], ["800", "800 YEARS AHEAD", "stamp", { size: 110 }]] });
  ev(wt(0, "800"), "boom", 0.5);
  // 1 800–1000 AD, "Ulfberht"
  { const tY = wt(1, "800"), tN = wt(1, "Ulfberht");
    S2(1, { bg: "fjord", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#3f6f94", "#1f4f74"); for (let i = 0; i < 4; i++) guy(g, C.viking(i), { x: 120 + i * 260, y: 1840, h: 460, expr: "determined", hold: { r: "sword", l: "shield" }, shieldCol: ["#c0392b", "#2f5f9f", "#e2b64b"][i % 3], swordAng: -1.3, armR: [1.6, -0.3], blink: blinkAt(t, i), t }); if (t > tN - 0.2) blade(g, 540, 1300, 200, Math.PI / 2 * 0.98, true); },
      titles: [[tY, "800–1000 AD", "stamp", { size: 120 }], [tN, "“ULFBERHT”", "stamp", { size: 120 }]] });
    ev(tY, "boom", 0.5); ev(tN, "clank"); }
  // 2 brittle vs crucible steel, 3,000°F
  { const tBr = wt(2, "brittle"), tC = wt(2, "crucible"), tT = wt(2, "3,000"), tI = wt(2, "impurities");
    S2(2, { bg: "stone", blur: true, draw: (g, t) => {
      if (t < tC - 0.2) { guy(g, C.knight, { x: 300, y: 1820, h: 560, expr: "shock", armR: [1.6, -0.4], blink: 0, t }); blade(g, 480, 1380, 160, 0.4, false, clamp((t - tBr) / 0.6)); }
      else { forge(g, t); guy(g, C.viking(2), { x: 260, y: 1820, h: 580, expr: "determined", armR: [2.0, -0.6], blink: blinkAt(t, 2), t }); if (t > tT) { rect(g, 360, 950, 360, 150, "#fff6e6", 7, 14); strokeText(g, "3,000°F", 540, 1025, 70, { fill: "#c0392b", lw: 0, shadow: false }); } } },
      titles: [[tBr, "ORDINARY SWORDS: BRITTLE", "label", { fill: "#ffd0c0" }], [tC, "CRUCIBLE STEEL", "stamp", { size: 110 }], [tI, "IMPURITIES: GONE", "label", { fill: "#ffe08a" }]] });
    ev(tBr, "crack"); ev(tC, "clank"); ev(tT, "bubble"); }
  // 3 trade routes for steel ingots
  { const tF = wt(3, "furs"), tR = wt(3, "Russian"), tC = wt(3, "Central");
    S2(3, { bg: "steppe", draw: (g, t) => { waves(g, 1500, t, -900, 2000, "#4ea3c9", 8); const k = clamp((t - tR) / 3); const x = lerp(-200, 1200, k); rowboat(g, { x, y: 1640, h: 200, t }); guy(g, C.viking(1), { x: x - 30, y: 1600, h: 300, expr: "happy", t, shadow: false }); if (t > tF) { rect(g, x + 40, 1560, 60, 40, "#9a6a3a", 4, 6); ell(g, x + 110, 1570, 18, 18, "#e2a03a", 3); } if (t > tC) { for (let i = 0; i < 3; i++) rect(g, 880 + i * 40, 1460 - i * 10, 80, 30, "#8a8f96", 4, 4); guy(g, C.mongol(0), { x: 950, y: 1520, h: 360, dir: -1, expr: "happy", t }); } },
      titles: [[tF, "FURS & AMBER", "label", { fill: "#ffe08a" }], [tR, "RUSSIAN RIVER ROUTES", "label"], [tC, "STEEL FROM CENTRAL ASIA", "stamp", { size: 82 }]] });
    ev(tR, "splash", 0.4); ev(tC, "cash"); }
  // 4 counterfeits with misspelled names
  { const tC = wt(4, "counterfeit"), tM = wt(4, "misspelled");
    S2(4, { bg: "town", blur: true, draw: (g, t) => { rect(g, 160, 1500, 760, 60, "#6b4024", 6, 6); for (let i = 0; i < 5; i++) blade(g, 260 + i * 140, 1500, 110, -0.1 + i * 0.05, true); guy(g, C.peasant(0), { x: 900, y: 1820, h: 520, dir: -1, expr: "sly", armR: [1.6, -0.3], blink: blinkAt(t, 1), t }); if (t > tM - 0.1) { rect(g, 260, 950, 560, 200, "#fff6e6", 7, 14); strokeText(g, "+VLFBERHT+", 540, 1020, 50, { font: "Cinzel", fill: "#1c1422", lw: 0, shadow: false }); line(g, [[440, 1050], [640, 1050]], 6, "#c0392b"); strokeText(g, "(TYPO!)", 540, 1100, 40, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [["unbreakable", "NEARLY UNBREAKABLE", "label"], [tC, "COUNTERFEITS!", "stamp", { size: 110 }], [tM, "...WITH SPELLING MISTAKES", "label", { fill: "#ffe08a" }]] });
    ev(tC, "cash"); ev(tM, "boing"); }
}
