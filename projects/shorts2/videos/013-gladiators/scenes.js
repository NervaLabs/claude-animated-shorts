// 013 — Why Roman Gladiators Rarely Died in the Arena
"use strict";
function buildShots() {
  const GLA = (i) => ({ tunic: ["#b8262f", "#2f5f9f"][i % 2], trim: "#d4a632", armor: "#c9973f", helmet: "greek", crest: ["#e2b64b", "#c0392b"][i % 2], shieldCol: ["#b8262f", "#2f5f9f"][i % 2], trousers: null });
  const REF = { tunic: "#f6f3ea", trim: "#2a2a34", hair: "#5a3b2a", robe: true, beard: "#5a3b2a" };
  const duel = (g, t, end = false) => { guy(g, GLA(0), { x: 340, y: 1840, h: 540, expr: end ? "proud" : "shout", armR: [1.8 + Math.sin(t * 8) * 0.4, -0.3], hold: { r: "sword", l: end ? null : "shield" }, swordAng: -0.6 + Math.sin(t * 8) * 0.5, blink: 0, t }); guy(g, GLA(1), { x: 760, y: 1840, h: 540, dir: -1, expr: end ? "scared" : "shout", armR: end ? [2.8, 0] : [1.8 + Math.cos(t * 8) * 0.4, -0.3], armL: end ? [-2.8, 0] : undefined, hold: end ? null : { r: "sword", l: "shield" }, swordAng: -0.6, blink: 0, t }); };
  // 0 hook
  S2(0, { bg: "arena", blur: true, draw: (g, t) => duel(g, t), titles: [["rarely", "RARELY TO THE DEATH", "stamp", { size: 100 }]] });
  ev(0.2, "clash", 0.6); ev(0.8, "clash", 0.5); ev(wt(0, "rarely"), "boing");
  // 1 movies vs reality: superstar athletes
  { const tM = wt(1, "Movies"), tSu = wt(1, "superstar");
    S2(1, { bg: "arena", draw: (g, t) => { duel(g, t); if (t > tSu - 0.2) for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 360, 1200 + Math.sin(i * 2) * 150, 30, (t * 0.8 + i / 6) % 1); },
      titles: [[tM, "THE MOVIE VERSION: SLAUGHTER", "label", { size: 56, fill: "#ffd0c0" }], [tSu, "REALITY: SUPERSTAR ATHLETES", "stamp", { size: 74 }]] });
    ev(tSu, "cheer"); }
  // 2 cost like a luxury sports car
  { const tF = wt(2, "fortune"), tL = wt(2, "luxury");
    S2(2, { bg: "forum", blur: true, draw: (g, t) => { guy(g, GLA(0), { x: 320, y: 1840, h: 580, expr: "proud", blink: blinkAt(t, 1), t }); guy(g, { ...C.roman(1), tunic: "#6b2a7a", cape: "#6b2a7a" }, { x: 780, y: 1840, h: 560, dir: -1, expr: "sly", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 2), t }); if (t > tF - 0.1) { g.save(); g.translate(560, 1080); g.rotate(-0.05); rect(g, -200, -80, 400, 160, "#fff6e6", 7, 10); strokeText(g, "PRICE: $$$$$", 0, 0, 56, { fill: "#2f8a4a", lw: 0, shadow: false }); g.restore(); } },
      titles: [["Training", "TRAINING · FOOD · HOUSING", "label", { size: 58 }], [tF, "A FORTUNE", "stamp", { size: 120 }], [tL, "≈ A LUXURY SPORTS CAR", "label", { fill: "#ffe08a" }]] });
    ev(tF, "cash"); }
  // 3 referees and rules
  { const tR = wt(3, "referees");
    S2(3, { bg: "arena", draw: (g, t) => { duel(g, t); guy(g, REF, { x: 540, y: 1700, h: 480, expr: "stern", armR: [2.4, -0.4], hold: { r: "spear" }, spearAng: -1.0, blink: blinkAt(t, 3), t }); if (t > tR) shout(g, 540, 1000, "BREAK!", 60, clamp((t - tR) / 0.12), "#2f5fae"); },
      titles: [["investments", "PROTECT THE INVESTMENT", "label"], [tR, "REFEREES & RULES", "stamp", { size: 100 }]] });
    ev(tR, "whip"); }
  // 4 wounded / dropped shield → stop
  { const tW = wt(4, "wounded"), tD = wt(4, "dropped");
    S2(4, { bg: "arena", draw: (g, t) => { duel(g, t, t > tD); if (t > tD) { g.save(); g.translate(880, 1800); g.rotate(1.2); ell(g, 0, 0, 70, 70, "#2f5f9f", 6); g.restore(); } },
      titles: [[tW, "FIGHT ENDS WHEN WOUNDED...", "label"], [tD, "...OR THE SHIELD DROPS", "stamp", { size: 86 }]] });
    ev(tD, "clank"); }
  // 5 endorsements and fan clubs
  { const tO = wt(5, "olive"), tF = wt(5, "fan");
    S2(5, { bg: "forum", draw: (g, t) => { rect(g, 160, 820, 760, 420, "#fff6e6", 8, 12); guy(g, GLA(0), { x: 340, y: 1200, h: 340, expr: "proud", armR: [1.6, -0.6], blink: blinkAt(t, 1), t, shadow: false }); g.save(); g.translate(680, 1100); rect(g, -50, -120, 100, 160, "#9aa83a", 5, 30); rect(g, -20, -150, 40, 30, "#6b4024", 4); g.restore(); strokeText(g, "OLIVE OIL", 540, 900, 50, { font: "Cinzel", fill: "#5a6a2a", lw: 0, shadow: false }); if (t > tF - 0.1) for (let i = 0; i < 6; i++) guy(g, C.roman(i), { x: 80 + i * 185, y: 1880, h: 400, expr: "laugh", armR: [2.8, 0], bob: -Math.abs(Math.sin(t * 8 + i)) * 4, blink: 0, t }); },
      titles: [[tO, "CELEBRITY ENDORSEMENTS", "label", { fill: "#d9f2a0" }], [tF, "FAN CLUBS", "stamp", { size: 120 }]] });
    ev(tO, "ding"); ev(tF, "cheer"); }
}
