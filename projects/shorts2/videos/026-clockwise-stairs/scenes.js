// 026 — Why Medieval Castles Had Spiral Staircases Built Clockwise
"use strict";
function buildShots() {
  const ATT = { ...C.knight, tunic: "#c0392b" }, DEF = { ...C.knight, tunic: "#2f4f9f" };
  /** stylised cutaway of a clockwise spiral stair: steps sweep around a central pillar */
  const stair = (g, t, k = 1) => { rect(g, 140, 400, 800, 1400, "#8a8a98", 8, 10); g.save(); g.beginPath(); g.rect(150, 410, 780, 1380); g.clip(); g.fillStyle = "#3a3a48"; g.fillRect(150, 410, 780, 1380); for (let i = 0; i < 18; i++) { const y = 1760 - i * 78, ph = (i % 6) / 6, left = ph < 0.5, w = 360 * Math.sin(Math.PI * ((i % 3) + 1) / 4); const x0 = left ? 500 - w : 580; rect(g, x0, y - 30, w, 36, i % 2 ? "#c4c4d0" : "#b0b0bc", 4, 4); rect(g, x0, y + 6, w, 14, "#6a6a78", 0); } rect(g, 500, 410, 80, 1380, "#9a9aa8", 6); for (let r = 0; r < 14; r++) line(g, [[500, 450 + r * 100], [580, 450 + r * 100]], 2, "rgba(40,40,50,0.4)"); g.restore(); };
  // 0 hook
  S2(0, { bg: "castleNight", blur: true, draw: (g, t) => { stair(g, t); guy(g, DEF, { x: 700, y: 1000, h: 380, dir: -1, expr: "sly", hold: { r: "sword" }, swordAng: -2.2, armR: [2.2, -0.4], blink: blinkAt(t, 1), t, shadow: false }); },
    titles: [["deliberately", "DESIGNED ON PURPOSE", "label"], ["deadly", "A DEADLY ADVANTAGE", "stamp", { size: 96 }]] });
  ev(wt(0, "deadly"), "sting", 0.5);
  // 1 clockwise going up
  { const tC = wt(1, "clockwise");
    S2(1, { bg: "castleNight", draw: (g, t) => { stair(g, t); if (t > tC - 0.2) { g.save(); g.translate(540, 1100); g.rotate(-(t - tC) * 1.2); g.beginPath(); g.arc(0, 0, 330, 0, 4.5); g.lineWidth = 16; g.strokeStyle = "#ffe08a"; g.stroke(); poly(g, [[330, -10], [300, 40], [360, 40]], "#ffe08a", 4); g.restore(); } },
      titles: [["spiral", "STONE SPIRAL STAIRCASES", "label"], [tC, "CLOCKWISE ↻", "stamp", { size: 120 }]] });
    ev(tC, "whoosh"); }
  // 2 attacker's sword arm jammed against the pillar
  { const tR = wt(2, "right-handed"), tT = wt(2, "trapped"), tI = wt(2, "impossible");
    S2(2, { bg: "castleNight", keys: [[0, 540, 1350, 1.1, 0], [10, 560, 1400, 1.3, 0]], draw: (g, t) => { stair(g, t); guy(g, ATT, { x: 640, y: 1720, h: 420, dir: -1, expr: t > tT ? "angry" : "determined", hold: { r: "sword" }, swordAng: -2.4 + (t > tT ? Math.sin(t * 20) * 0.08 : 0), armR: [1.6 + (t > tT ? Math.sin(t * 20) * 0.05 : 0), -0.4], blink: 0, t, shadow: false }); if (t > tT) { shout(g, 470, 1230, "CLANG!", 44, clamp((t - tT) / 0.12), "#4a4a52"); sparkle(g, 540, 1420, 30, (t * 2) % 1); } },
      titles: [[tR, "MOST WARRIORS: RIGHT-HANDED", "label", { size: 56 }], [tT, "SWORD ARM TRAPPED", "stamp", { size: 96 }], [tI, "AGAINST THE PILLAR", "label", { fill: "#ffd0c0" }]] });
    ev(tT, "clank"); ev(tI, "clank", 0.5); }
  // 3 defenders above have room to swing
  { const tW = wt(3, "wide"), tS = wt(3, "slash");
    S2(3, { bg: "castleNight", keys: [[0, 540, 1100, 1.1, 0], [8, 520, 1000, 1.3, 0]], draw: (g, t) => { stair(g, t); guy(g, DEF, { x: 700, y: 1000, h: 400, dir: -1, expr: "shout", hold: { r: "sword" }, swordAng: -2.4 + Math.sin(t * 6) * 0.8, armR: [2.2 + Math.sin(t * 6) * 0.4, -0.4], blink: 0, t, shadow: false }); if (t > tW) { g.save(); g.globalAlpha = 0.35; ell(g, 860, 900, 160, 220, "#ffe08a", 0); g.restore(); } },
      titles: [[tW, "DEFENDERS: ROOM TO SWING", "stamp", { size: 82 }], [tS, "SLASHING DOWNWARD", "label", { fill: "#ffe08a" }]] });
    ev(tS, "whip"); ev(tS + 0.4, "whip", 0.6); }
  // 4 uneven steps trip intruders in the dark
  { const tU = wt(4, "uneven"), tTr = wt(4, "trip");
    S2(4, { bg: "castleNight", draw: (g, t) => { stair(g, t); const fall = clamp((t - tTr) / 0.6); g.save(); g.translate(560, 1600); g.rotate(fall * 1.2); guy(g, ATT, { x: 0, y: 120, h: 380, expr: fall > 0 ? "shock" : "determined", armL: fall > 0 ? [-2.8, 0] : undefined, armR: fall > 0 ? [2.8, 0] : undefined, blink: 0, t, shadow: false }); g.restore(); if (fall > 0) { for (let i = 0; i < 4; i++) sparkle(g, 560 + Math.cos(t * 6 + i * 1.6) * 90, 1380 + Math.sin(t * 6 + i) * 30, 24, (t * 2 + i / 4) % 1); } },
      titles: [[tU, "UNEVEN STEPS", "stamp", { size: 110 }], [tTr, "TO TRIP INTRUDERS IN THE DARK", "label", { size: 56 }]] }, night(0.25));
    ev(tTr, "crash", 0.5); ev(tTr + 0.2, "boing"); }
}
