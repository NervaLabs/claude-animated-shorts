// 080 — Only 66 Years Between the First Flight and the Moon Landing
"use strict";
function buildShots() {
  const ORV = { ...C.gent(1), tunic: "#3a3a44", helmet: "cap", hatCol: "#3a3a44" };
  const flyer = (g, x, y, s, t) => { g.save(); g.translate(x, y); g.scale(s, s); for (const dy of [-60, 40]) rect(g, -320, dy, 640, 26, "#f0e6c8", 5, 4); for (let i = 0; i < 6; i++) line(g, [[-280 + i * 112, -40], [-280 + i * 112, 46]], 4, "#6b4024"); rect(g, 200, -20, 150, 20, "#f0e6c8", 4, 4); rect(g, -440, -30, 90, 60, "#f0e6c8", 4, 4); line(g, [[-350, 0], [-320, 0]], 4); for (const px of [-80, 80]) { g.save(); g.translate(px - 20, 10); g.scale(1, Math.sin(t * 30)); rect(g, -6, -60, 12, 120, "#6b4024", 3, 4); g.restore(); } g.restore(); };
  const lander = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); rect(g, -120, -260, 240, 150, "#c9c0b0", 6, 8); poly(g, [[-140, -110], [140, -110], [110, -20], [-110, -20]], "#e2b64b", 6); for (const sd of [-1, 1]) { line(g, [[sd * 110, -60], [sd * 200, 40]], 8); ell(g, sd * 200, 44, 30, 10, "#9a9aa8", 4); } g.restore(); };
  // 0 hook
  S2(0, { bg: "farm", blur: true, draw: (g, t) => { timeline(g, 150, 930, 1500, 1900, 1975, [{ y: 1903, label: "1903 FLIGHT" }, { y: 1969, label: "1969 MOON", up: true }], clamp(t / 4)); },
    titles: [["flight", "FIRST FLIGHT → THE MOON", "stamp", { size: 86 }], ["lifetime", "IN ONE LIFETIME", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "lifetime"), "ding");
  // 1 Dec 17 1903: 12 seconds, 120 feet
  { const tD = wt(1, "December"), tO = wt(1, "Orville"), tTw = wt(1, "12"), tF = wt(1, "120"), tW = wt(1, "wingspan");
    S2(1, { bg: "beach", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.04, 0]], draw: (g, t) => { if (t < tW - 0.2) { const k = clamp((t - tO) / 4); flyer(g, lerp(160, 860, k), 1500 - Math.sin(Math.min(1, k) * Math.PI) * 120, 0.7, t); guy(g, ORV, { x: lerp(160, 860, k) - 20, y: 1490 - Math.sin(Math.min(1, k) * Math.PI) * 120, h: 140, sit: true, expr: "happy", t, shadow: false }); if (t > tTw - 0.2) { rect(g, 360, 860, 360, 160, "#fff6e6", 7, 14); strokeText(g, "12 SEC", 540, 945, 64, { fill: "#1c1422", lw: 0, shadow: false }); } } else { g.save(); g.globalAlpha = 0.85; rect(g, 40, 1200, 1000, 70, "#9ab0c8", 5, 30); strokeText(g, "747 WINGSPAN: 195 FT", 540, 1240, 40, { fill: "#1c1422", lw: 0, shadow: false }); rect(g, 40, 1320, 620, 70, "#e2b64b", 5, 30); strokeText(g, "FIRST FLIGHT: 120 FT", 350, 1360, 40, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tD, "DECEMBER 17, 1903", "stamp", { size: 92 }], [tO, "ORVILLE WRIGHT", "label", { font: "Cinzel" }], [tTw, "12 SECONDS", "label"], [tF, "120 FEET", "stamp", { size: 120 }], [tW, "SHORTER THAN A JUMBO JET'S WINGS", "label", { size: 56, fill: "#ffe08a" }]] });
    ev(tD, "boom", 0.4); ev(tO, "plane"); ev(tW, "boing"); }
  // 2 65 years later: Armstrong on the moon carrying Wright fabric
  { const tSi = wt(2, "65"), tJ = wt(2, "July"), tN = wt(2, "Neil"), tFa = wt(2, "fabric");
    S2(2, { bg: "moon", draw: (g, t) => { lander(g, 760, 1700, 1.4); guy(g, C.astronaut, { x: 340, y: 1840, h: 620, expr: "happy", blink: blinkAt(t, 1), t }); if (t > tFa - 0.2) { rect(g, 220, 1440, 120, 80, "#f0e6c8", 5, 4); for (let i = 0; i < 4; i++) sparkle(g, 280 + Math.cos(i * 1.6) * 120, 1480 + Math.sin(i * 1.6) * 80, 24, (t + i / 4) % 1); } },
      titles: [[tSi, "JUST 65 YEARS LATER", "label"], [tJ, "JULY 20, 1969", "stamp", { size: 100 }], [tN, "NEIL ARMSTRONG ON THE MOON", "label", { size: 58 }], [tFa, "WITH WRIGHT FLYER FABRIC", "label", { fill: "#ffe08a" }]] });
    ev(tJ, "boom", 0.4); ev(tN, "choir", 0.5); ev(tFa, "sparkle"); }
}
