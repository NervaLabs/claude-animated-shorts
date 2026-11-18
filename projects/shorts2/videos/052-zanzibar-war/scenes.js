// 052 — The War That Lasted Only 38 Minutes
"use strict";
function buildShots() {
  const SUL = { tunic: "#f6f3ea", trim: "#c0392b", helmet: "turban", hatCol: "#c0392b", skin: "#7a4a2a", beard: "#1a1012", robe: true, cape: "#7a1a2a" };
  const clock = (g, x, y, r, mins) => { ell(g, x, y, r, r, "#fff6e6", 7); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line(g, [[x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82], [x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92]], 4); } const am = mins / 60 * TAU - Math.PI / 2, ah = (9 + mins / 60) / 12 * TAU - Math.PI / 2; line(g, [[x, y], [x + Math.cos(ah) * r * 0.5, y + Math.sin(ah) * r * 0.5]], 10); line(g, [[x, y], [x + Math.cos(am) * r * 0.78, y + Math.sin(am) * r * 0.78]], 6, "#c0392b"); ell(g, x, y, 10, 10, INK, 0); };
  const palace = (g, fire = 0, t = 0) => { rect(g, -400, 1480, 1000, 800, "#d9c08a", 6); g.save(); g.translate(-72, 310); g.scale(0.7, 0.7); rect(g, 160, 1100, 760, 600, "#f0e6d0", 7); for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) rect(g, 210 + i * 120, 1150 + r * 170, 70, 110, "#3a2a2a", 4, 4); rect(g, 160, 1060, 760, 60, "#8a5a32", 6); line(g, [[540, 1060], [540, 860]], 8); if (fire < 1) { g.save(); g.translate(540, 870); rect(g, 0, 0, 140 * (1 - fire), 80, "#c0392b", 4); g.restore(); } if (fire > 0) for (let i = 0; i < 6; i++) flame(g, 220 + i * 120, 1120 + (i % 2) * 40, 90 * Math.min(1, fire * 2), t + i); g.restore(); };
  const ship = (g, x, y, h, t) => steamShip ? steamShip(g, { x, y, h, t, dir: -1 }) : sailShip(g, { x, y, h, t, dir: -1 });
  // 0 hook
  S2(0, { bg: "sea", blur: true, draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); clock(g, 540, 1300, 300, Math.min(38, (t / 5) * 38)); },
    titles: [["shortest", "THE SHORTEST WAR EVER", "stamp", { size: 100 }]] });
  ev(wt(0, "shortest"), "boom", 0.5);
  // ultimatum
  { const i1 = si("August"), tA = wt(i1, "August"), tZ = wt(i1, "Zanzibar"), tW = wt(i1, "warships");
    S2(i1, { bg: "sea", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); palace(g); if (t > tW - 0.2) ship(g, 860, 1480, 260, t); },
      titles: [[tA, "AUGUST 27, 1896", "stamp", { size: 100 }], [tZ, "ZANZIBAR", "label", { font: "Cinzel" }], [tW, "BRITISH WARSHIPS", "label"], ["ultimatum", "ULTIMATUM: 9:00 AM", "stamp", { size: 96, fill: "#ffd0c0" }]] });
    ev(tA, "boom", 0.5); ev(tW, "horns"); }
  // refusal → 9:02 open fire
  { const i2 = si("refused", 1), tR = wt(i2, "refused"), tF = wt(i2, "fire"), tY = wt(i2, "yacht");
    S2(i2, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [12, 540, 1300, 1.08, 0]], draw: (g, t) => { if (t < tF - 0.3) { guy(g, SUL, { x: 540, y: 1840, h: 680, expr: "angry", armR: [2.4, 0.3], armL: [-2.4, -0.3], blink: blinkAt(t, 1), t }); } else { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); palace(g, clamp((t - tF) / 3), t); ship(g, 860, 1480, 260, t); if (t > tY - 0.2) { const k = clamp((t - tY) / 1.5); g.save(); g.translate(700, 1560 + k * 120); g.rotate(-k * 0.5); sailShip(g, { x: 0, y: 0, h: 160, t, seed: 3 }); g.restore(); } } },
      titles: [[tR, "THE SULTAN REFUSED", "label"], [tF, "9:02 · OPEN FIRE", "stamp", { size: 100 }], ["ablaze", "WOODEN PALACE ABLAZE", "label", { fill: "#ffd0a0" }], [tY, "HIS ONE YACHT SUNK", "label"]] });
    ev(tF, "cannon"); ev(tF + 0.4, "cannon", 0.7); ev(tF + 0.9, "cannon", 0.6); ev(tY, "splash"); }
  // 9:40 flag struck: 38 minutes
  { const i3 = si("flag", 2), tFl = wt(i3, "flag"), tM = wt(i3, "38");
    S2(i3, { bg: "sea", draw: (g, t) => { if (t < tM - 0.3) { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); palace(g, 1, t); } else clock(g, 540, 1300, 320, 38); },
      titles: [["forty", "9:40 · FLAG STRUCK", "label"], [tM, "38 MINUTES. WAR OVER.", "stamp", { size: 96 }]] });
    ev(tFl, "sad"); ev(tM, "ding"); }
}
