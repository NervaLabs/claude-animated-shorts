// 096 — Why Titanic's Lookouts Had No Binoculars
"use strict";
function buildShots() {
  const BLAIR = { ...C.captain, tunic: "#1c1f3a", hair: "#3a2a1a" };
  const LOOK = (i) => ({ ...C.sailor, tunic: "#1c1f3a", helmet: "cap", hatCol: "#1c1f3a" });
  const key = (g, x, y, s, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); g.beginPath(); g.arc(0, 0, 40 * s, 0, TAU); g.lineWidth = 16 * s; g.strokeStyle = "#c9a35a"; g.stroke(); rect(g, 30 * s, -10 * s, 160 * s, 20 * s, "#c9a35a", 4, 4); rect(g, 150 * s, 10 * s, 18 * s, 30 * s, "#c9a35a", 4, 2); rect(g, 116 * s, 10 * s, 18 * s, 22 * s, "#c9a35a", 4, 2); g.restore(); };
  const nest = (g, x, y) => { line(g, [[x, y + 200], [x, 2200]], 24, "#6b4024"); rect(g, x - 130, y, 260, 200, "#f6f3ea", 7, 10); };
  // 0 hook
  S2(0, { bg: "seaNight", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#1f2f4a", "#0f1f34"); nest(g, 540, 1000); for (let i = 0; i < 2; i++) guy(g, LOOK(i), { x: 490 + i * 100, y: 1010, h: 260, expr: "scared", blink: 0, t, shadow: false }); poly(g, [[900, 1620], [960, 1400], [1060, 1620]], "#e9f6ff", 6); },
    titles: [["lookouts", "TITANIC'S LOOKOUTS", "label"], ["binoculars", "HAD NO BINOCULARS", "stamp", { size: 110 }]] }, night(0.2));
  ev(wt(0, "binoculars"), "sting", 0.6);
  // 1 David Blair reassigned, walks off with the locker key
  { const tSo = wt(1, "Southampton"), tD = wt(1, "David"), tR = wt(1, "reassigned"), tK = wt(1, "key"), tP = wt(1, "pocket");
    S2(1, { bg: "deck", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => { const off = clamp((t - tR) / 3); guy(g, BLAIR, { x: lerp(500, -150, off), y: 1840, h: 620, dir: off > 0 ? -1 : 1, expr: "happy", walk: off > 0 && off < 1 ? t * 1.5 : undefined, blink: blinkAt(t, 1), t }); if (t > tK - 0.2) { key(g, 760, 1200, 1.4, Math.sin(t * 2) * 0.2); if (t > tP - 0.2) { g.save(); g.globalAlpha = 0.85; rect(g, 600, 1340, 320, 100, "#fff6e6", 7, 14); strokeText(g, "IN HIS POCKET", 760, 1392, 38, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); } } },
      titles: [[tSo, "SOUTHAMPTON, 1912", "label"], [tD, "OFFICER DAVID BLAIR", "label", { font: "Cinzel" }], [tR, "REASSIGNED LAST MINUTE", "stamp", { size: 92 }], [tK, "THE BINOCULAR LOCKER KEY", "label", { fill: "#ffe08a" }]] });
    ev(tR, "whoosh"); ev(tK, "ding"); }
  // 2 might not have helped — but the key sold for $130,000
  { const tE = wt(2, "experts"), tA = wt(2, "auction"), tY = wt(2, "2007"), tM = wt(2, "130,000");
    S2(2, { bg: "victorianRoom", draw: (g, t) => { if (t < tA - 0.2) { g.fillStyle = "#0f1f34"; g.fillRect(-500, -500, 2200, 3000); poly(g, [[440, 1600], [540, 1250], [660, 1600]], "#2a3a4a", 6); rect(g, 300, 900, 480, 160, "#fff6e6", 7, 14); strokeText(g, "MOONLESS NIGHT", 540, 985, 48, { fill: "#1c1422", lw: 0, shadow: false }); } else { museumCase(g, 540, 1500, 420, 360, (g) => key(g, 440, 1320, 1.0)); guy(g, C.gent(1), { x: 180, y: 1840, h: 560, expr: "shock", armR: [2.6, -0.2], blink: 0, t }); if (t > tM - 0.2) { rect(g, 600, 960, 420, 180, "#fff6e6", 7, 14); strokeText(g, "$130,000+", 810, 1050, 70, { fill: "#2f8a3a", lw: 0, shadow: false }); } } },
      titles: [[tE, "WOULD THEY HAVE HELPED? MAYBE NOT", "label", { size: 52 }], [tA, "THE KEY WENT TO AUCTION", "label"], [tY, "2007", "stamp", { size: 140 }], [tM, "SOLD: $130,000+", "stamp", { size: 100 }]] });
    ev(tA, "clank"); ev(tM, "cash"); }
}
