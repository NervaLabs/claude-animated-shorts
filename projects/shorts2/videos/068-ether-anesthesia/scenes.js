// 068 — Why Early Anesthesia Changed Surgery Forever (non-graphic: no wounds, no limbs shown)
"use strict";
function buildShots() {
  const SURG = { ...C.gent(2), tunic: "#2a2a3a", trim: "#f6f3ea", hair: "#5a3a24", beard: "#5a3a24" };
  const MOR = { ...C.gent(1), tunic: "#3a2a1a", trim: "#f6f3ea", hair: "#3a2a1a" };
  const watch = (g, x, y, r, secs) => { ell(g, x, y, r, r, "#f2c443", 6); ell(g, x, y, r * 0.82, r * 0.82, "#fff6e6", 4); rect(g, x - 12, y - r - 30, 24, 30, "#f2c443", 4); const a = secs / 60 * TAU - Math.PI / 2; line(g, [[x, y], [x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7]], 6, "#c0392b"); ell(g, x, y, 8, 8, INK, 0); };
  const bed = (g, calm) => { rect(g, 160, 1560, 760, 60, "#f6f3ea", 6, 10); rect(g, 180, 1620, 30, 220, "#6b4024", 5); rect(g, 870, 1620, 30, 220, "#6b4024", 5); rect(g, 260, 1460, 600, 110, "#c9d9e6", 6, 30); ell(g, 230, 1500, 60, 56, "#f2d3a8", 5); if (calm) { line(g, [[210, 1494], [226, 1494]], 4); line(g, [[236, 1494], [252, 1494]], 4); } else { ell(g, 216, 1490, 7, 9, INK, 0); ell(g, 246, 1490, 7, 9, INK, 0); ell(g, 231, 1520, 9, 12, INK, 0); } };
  // 0 hook: judged by speed
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => { guy(g, SURG, { x: 360, y: 1840, h: 640, expr: "determined", blink: blinkAt(t, 1), t }); watch(g, 760, 1300, 170, (t * 8) % 60); },
    titles: [["1846", "BEFORE 1846...", "label"], ["fast", "SURGEONS WERE JUDGED ON SPEED", "stamp", { size: 72 }]] });
  ev(wt(0, "fast"), "drums");
  // 1 no anesthesia; awake; speed prevented shock
  { const tW = wt(1, "awake"), tSp = wt(1, "speed");
    S2(1, { bg: "victorianRoom", draw: (g, t) => { bed(g, false); guy(g, SURG, { x: 860, y: 1840, h: 600, dir: -1, expr: "determined", blink: blinkAt(t, 1), t }); if (t > tSp - 0.2) watch(g, 540, 1100, 130, (t * 20) % 60); },
      titles: [["anesthesia", "NO ANESTHESIA", "stamp", { size: 110 }], [tW, "PATIENTS WIDE AWAKE", "label", { fill: "#ffd0c0" }], [tSp, "SPEED = SURVIVAL", "label", { fill: "#ffe08a" }]] }, night(0.15));
    ev(tW, "heartbeat"); }
  // 2 under 30 seconds
  { const tT = wt(2, "30");
    S2(2, { bg: "victorianRoom", blur: true, draw: (g, t) => { watch(g, 540, 1300, 300, Math.min(30, Math.max(0, (t - S(2)) * 10))); },
      titles: [["Top", "THE FASTEST SURGEONS", "label"], [tT, "UNDER 30 SECONDS", "stamp", { size: 110 }]] });
    ev(tT, "ding"); }
  // 3 Oct 1846: William Morton, ether
  { const tO = wt(3, "October"), tM = wt(3, "Morton"), tE = wt(3, "ether");
    S2(3, { bg: "palace", draw: (g, t) => { crowdHeads(g, -100, 1200, 1100, 3, 4, 1.0); bed(g, t > tE + 0.6); guy(g, MOR, { x: 860, y: 1840, h: 600, dir: -1, expr: "proud", armR: [1.6, -0.4], blink: blinkAt(t, 1), t }); if (t > tE - 0.2) { ell(g, 620, 1440, 60, 70, "#cfe9ff", 5); for (let i = 0; i < 3; i++) { const q = (t + i / 3) % 1; g.save(); g.globalAlpha = 0.6 * (1 - q); ell(g, 560 - q * 200, 1440 - q * 60, 30 + q * 30, 20 + q * 20, "#e9f6ff", 0); g.restore(); } } },
      titles: [[tO, "OCTOBER 1846, BOSTON", "stamp", { size: 86 }], [tM, "DENTIST WILLIAM MORTON", "label"], [tE, "ETHER GAS", "stamp", { size: 120, fill: "#cfe9ff" }]] });
    ev(tO, "boom", 0.4); ev(tE, "whoosh"); }
  // 4 zero pain
  { const tZ = wt(4, "zero"), tE = wt(4, "ending");
    S2(4, { bg: "palace", draw: (g, t) => { crowdHeads(g, -100, 1200, 1100, 3, 4, 1.0); bed(g, true); strokeText(g, "z", 300 + Math.sin(t * 2) * 10, 1380 - ((t * 0.6) % 1) * 100, 50, { fill: "#fff" }); if (t > tE - 0.2) for (let i = 0; i < 5; i++) sparkle(g, 200 + i * 170, 1050 + (i % 2) * 80, 30, (t * 0.7 + i / 5) % 1); },
      titles: [[tZ, "ZERO PAIN", "stamp", { size: 130 }], [tE, "SURGERY CHANGED OVERNIGHT", "label", { fill: "#ffe08a" }]] });
    ev(tZ, "choir", 0.5); ev(tE, "cheer", 0.5); }
}
