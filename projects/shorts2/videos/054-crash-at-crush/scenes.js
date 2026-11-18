// 054 — How a Train Crash Became a Paid Ticketed Event
"use strict";
function buildShots() {
  const loco = (g, x, y, s, t, dir = 1, col = "#2f4f9f") => { g.save(); g.translate(x, y); g.scale(dir * s, s); rect(g, -220, -200, 300, 150, "#2a2a32", 6, 30); rect(g, 60, -280, 160, 230, col, 6, 8); rect(g, 80, -260, 120, 80, "#f6f0d0", 5, 6); rect(g, -160, -290, 50, 100, "#2a2a32", 5, 6); rect(g, -180, -300, 90, 24, "#2a2a32", 5, 4); poly(g, [[-220, -50], [-300, -10], [-220, -10]], "#c0392b", 5); for (let i = 0; i < 3; i++) { g.save(); g.translate(-150 + i * 140, -20); g.rotate(t * 6); ell(g, 0, 0, 50, 50, "#c0392b", 6); line(g, [[-50, 0], [50, 0]], 5); line(g, [[0, -50], [0, 50]], 5); g.restore(); } g.restore(); for (let i = 0; i < 3; i++) { const q = (t * 1.4 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, x - dir * 135 * s - dir * q * 120 * s, y - 320 * s - q * 200 * s, (30 + q * 50) * s, (30 + q * 50) * s, "#e9e4dc", 0); g.restore(); } };
  const track = (g, y) => { for (let i = 0; i < 24; i++) rect(g, -400 + i * 80, y - 6, 40, 24, "#6b4024", 3); line(g, [[-400, y - 4], [1500, y - 4]], 8, "#7a7e8a"); };
  // 0 hook: 40,000 tickets
  S2(0, { bg: "farm", blur: true, draw: (g, t) => { crowdHeads(g, -100, 1200, 1450, 4, 3, 1.4); g.save(); g.translate(540, 1500); g.rotate(-0.06); rect(g, -260, -120, 520, 240, "#f2c443", 7, 10); strokeText(g, "ADMIT ONE", 0, -20, 60, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "TRAIN CRASH", 0, 60, 52, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); },
    titles: [["40,000", "40,000 PEOPLE", "stamp", { size: 120 }], ["crash", "PAID TO WATCH A TRAIN CRASH", "label", { size: 56 }]] });
  ev(wt(0, "40,000"), "crowd"); ev(wt(0, "crash"), "ding");
  // 1 1896 stunt near Waco
  { const tY = wt(1, "1896"), tP = wt(1, "publicity"), tF = wt(1, "four"), tT = wt(1, "35-ton"), tFi = wt(1, "50");
    S2(1, { bg: "farm", keys: [[0, 540, 1350, 0.9, 0], [16, 540, 1350, 0.85, 0]], draw: (g, t) => { track(g, 1700); if (t < tT - 0.2) { guy(g, { ...C.gent(2), helmet: "tophat" }, { x: 540, y: 1700, h: 600, expr: "sly", armR: [2.6, -0.3], blink: blinkAt(t, 1), t }); if (t > tF - 0.2) { rect(g, 700, 900, 320, 160, "#fff6e6", 7, 14); strokeText(g, "4 MILES", 860, 985, 56, { fill: "#1c1422", lw: 0, shadow: false }); } } else { const k = clamp((t - tFi + 0.5) / 4); loco(g, lerp(0, 260, k), 1700, 0.9, t, 1, "#2f4f9f"); loco(g, lerp(1080, 820, k), 1700, 0.9, t, -1, "#2f8a3a"); } },
      titles: [[tY, "1896, TEXAS", "stamp", { size: 120 }], [tP, "A PUBLICITY STUNT", "label"], [tF, "TEMPORARY TRACK NEAR WACO", "label", { size: 56 }], [tT, "TWO 35-TON TRAINS", "label"], [tFi, "HEAD-ON AT 50 MPH", "stamp", { size: 96 }]] });
    ev(tY, "boom", 0.5); ev(tT, "whistle"); ev(tFi, "rumble"); }
  // 2 crowd; boilers burst; the stunt turned tragic (non-graphic)
  { const tSp = wt(2, "Spectators"), tB = wt(2, "boilers"), tK = wt(2, "killing");
    S2(2, { bg: "farm", draw: (g, t) => { track(g, 1700); if (t < tB - 0.1) { const k = clamp((t - S(2)) / (tB - S(2))); loco(g, lerp(260, 430, k), 1700, 0.9, t, 1, "#2f4f9f"); loco(g, lerp(820, 650, k), 1700, 0.9, t, -1, "#2f8a3a"); crowdHeads(g, -100, 1200, 1980, 3, 5, 1.2); } else { const k = clamp((t - tB) / 1.2); boomFx(g, 540, 1500, 380 * Math.min(1, k * 2), k); smokePuff(g, 540, 1300, 300, k); crowdHeads(g, -100, 1200, 1980, 3, 5, 1.2); } },
      titles: [[tSp, "SPECTATORS PACKED THE HILLS", "label", { size: 56 }], [tB, "THE BOILERS EXPLODED", "stamp", { size: 96 }], [tK, "TWO ONLOOKERS DIED", "label", { fill: "#ffd0c0" }]] }, null);
    ev(tB, "boom"); ev(tB + 0.2, "crash"); ev(tK, "sad"); }
}
