// 079 — How a Bear Became an Official Soldier in WWII
"use strict";
function buildShots() {
  const POL = (i) => ({ ...C.gi, tunic: "#6a6a4a", helmet: "cap", hatCol: "#6a6a4a" });
  const bear = (g, x, y, s, t, o = {}) => { g.save(); g.translate(x, y); g.scale((o.dir ?? 1) * s, s); const c = "#7a4a2a"; for (const lx of [-50, 50]) rect(g, lx - 34, -150, 68, 150, c, 6, 30); ell(g, 0, -260, 130, 150, c, 7); ell(g, 0, -230, 80, 100, "#9a6a4a", 0); const ar = o.arms ?? [0.4, 0.4]; for (const [sd, a] of [[-1, ar[0]], [1, ar[1]]]) { g.save(); g.translate(sd * 100, -340); g.rotate(sd * a); rect(g, -30, 0, 60, 150, c, 6, 30); g.restore(); } ell(g, 0, -440, 100, 90, c, 7); for (const sd of [-1, 1]) ell(g, sd * 70, -510, 30, 30, c, 6); ell(g, 0, -410, 44, 32, "#c9a07a", 4); ell(g, 0, -428, 14, 10, INK, 0); ell(g, -36, -460, 9, 11, INK, 0); ell(g, 36, -460, 9, 11, INK, 0); if (o.cap) { rect(g, -70, -540, 140, 40, "#6a6a4a", 5, 8); } g.restore(); };
  const crate = (g, x, y, s) => { rect(g, x - 70 * s, y - 60 * s, 140 * s, 120 * s, "#8a6a3a", 5, 6); line(g, [[x - 70 * s, y - 60 * s], [x + 70 * s, y + 60 * s]], 4, "#5a3a24"); strokeText(g, "100 LB", x, y, 26 * s, { fill: "#fff", lw: 0, shadow: false }); };
  // 0 hook: 500-lb bear, corporal
  S2(0, { bg: "camp", blur: true, draw: (g, t) => { bear(g, 540, 1840, 1.25, t, { cap: true, arms: [0.3, 2.6] }); },
    titles: [["500-pound", "A 500-POUND BEAR", "stamp", { size: 100 }], ["corporal", "CORPORAL, POLISH ARMY", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "corporal"), "horns");
  // 1 orphaned cub 1942; coffee, wrestling, saluting
  { const tA = wt(1, "orphaned"), tW = wt(1, "Wojtek"), tC = wt(1, "coffee"), tWr = wt(1, "wrestling"), tS = wt(1, "saluting");
    S2(1, { bg: "camp", draw: (g, t) => { if (t < tW - 0.2) { bear(g, 540, 1840, 0.5, t); guy(g, POL(0), { x: 260, y: 1840, h: 560, expr: "happy", blink: blinkAt(t, 1), t }); } else if (t < tWr - 0.2) { bear(g, 540, 1840, 1.0, t, { arms: [0.3, 2.0] }); if (t > tC - 0.2) { rect(g, 660, 1380, 60, 70, "#f6f3ea", 5, 10); } } else if (t < tS - 0.2) { const ph = Math.sin(t * 4); bear(g, 420 + ph * 20, 1840, 1.0, t, { arms: [2.0, 2.0] }); guy(g, POL(1), { x: 720 + ph * 20, y: 1840, h: 560, dir: -1, expr: "laugh", armR: [1.6, -0.2], lean: 10, blink: 0, t }); } else { bear(g, 380, 1840, 1.0, t, { cap: true, arms: [0.3, 2.9] }); guy(g, POL(2), { x: 760, y: 1840, h: 600, dir: -1, expr: "happy", armR: [2.6, -1.2], blink: blinkAt(t, 2), t }); } },
      titles: [[tA, "ADOPTED AS A CUB · 1942", "label"], [tW, "WOJTEK", "stamp", { size: 140 }], [tC, "DRANK COFFEE", "label"], [tWr, "WRESTLED THE TROOPS", "label", { fill: "#ffe08a" }], [tS, "SALUTED OFFICERS", "label"]] });
    ev(tW, "ding"); ev(tWr, "laugh"); ev(tS, "horns", 0.5); }
  // 2 Monte Cassino: carrying shell crates
  { const tM = wt(2, "Monte"), tC = wt(2, "crates"), tD = wt(2, "dropping");
    S2(2, { bg: "trench", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.06, 0]], draw: (g, t) => { const x = 200 + ((t - S(2)) * 120) % 800; bear(g, x, 1840, 1.0, t, { arms: [2.6, 2.6] }); if (t > tC - 0.3) crate(g, x, 1180, 1.4); for (let i = 0; i < 2; i++) guy(g, POL(i), { x: 860 + i * 120, y: 1840, h: 520, dir: -1, expr: "shock", blink: 0, t }); if (t > tD - 0.2) for (let i = 0; i < 4; i++) sparkle(g, x + Math.cos(i * 1.6) * 200, 1200 + Math.sin(i) * 120, 28, (t + i / 4) % 1); },
      titles: [[tM, "BATTLE OF MONTE CASSINO", "label", { font: "Cinzel" }], [tC, "CARRIED 100-LB SHELL CRATES", "stamp", { size: 76 }], [tD, "NEVER DROPPED ONE", "label", { fill: "#ffe08a" }]] });
    ev(tM, "rumble"); ev(tC, "stomp"); ev(tD, "cheer", 0.5); }
}
