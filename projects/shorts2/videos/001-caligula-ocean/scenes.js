// 001 — The Roman Emperor Who Declared War on the Ocean
"use strict";
function buildShots() {
  const surf = (g, t, y = 1440) => waves(g, y + Math.sin(t * 2) * 20, t, -900, 2000, "#4f94c8", 26);
  const stabbers = (g, t, n = 5, x0 = 80) => { for (let i = 0; i < n; i++) guy(g, C.legion, { x: x0 + i * 200, y: 1820 + (i % 2) * 30, h: 400, expr: "shout", armR: [2.0 + Math.sin(t * 9 + i) * 0.5, -0.4], hold: { r: i % 2 ? "spear" : "sword" }, spearAng: -0.3 + Math.sin(t * 9 + i) * 0.4, swordAng: -0.6 + Math.sin(t * 9 + i) * 0.7, blink: 0, t }); };
  // 0 hook
  S2(0, { bg: "beach", blur: true, draw: (g, t) => { surf(g, t); stabbers(g, t); }, titles: [["stab", "STAB THE OCEAN?!", "stamp", { size: 104 }]] });
  ev(0.3, "warcry"); ev(wt(0, "stab"), "splash");
  // 1 march to the Channel
  { const tY = wt(1, "40"), tC = wt(1, "Caligula"), tE = wt(1, "English"), tB = wt(1, "Britain");
    S2(1, { bg: "beach", keys: [[0, 300, 1350, 0.9, 0], [8, 700, 1350, 0.95, 0]], draw: (g, t) => {
      for (let i = 0; i < 12; i++) guy(g, C.legion, { x: lerp(-900, 0, clamp((t - S(1)) / 5)) + (i % 6) * 150 + 600, y: 1700 + Math.floor(i / 6) * 100, h: 340, expr: "determined", walk: t * 2, hold: { r: "spear", l: "shield" }, spearAng: -1.4, armR: [1.3, -0.3], blink: blinkAt(t, i), t });
      guy(g, C.emperor, { x: 980, y: 1820, h: 560, dir: -1, expr: "proud", armR: [2.4, -0.3], blink: blinkAt(t, 1), t }); },
      titles: [[tY, "40 AD", "stamp", { size: 150 }], [tC, "EMPEROR CALIGULA", "label", { font: "Cinzel" }], [tE, "THE ENGLISH CHANNEL", "label", { font: "Cinzel", fill: "#cfe9ff" }], [tB, "→ INVADE BRITAIN", "label"]] });
    ev(tY, "boom", 0.6); for (let k = 0; k < 8; k++) ev(S(1) + k * 0.6, "march", 0.35); }
  // 2 catapults vs the waves
  { const tCa = wt(2, "catapults"), tA = wt(2, "attack");
    S2(2, { bg: "beach", draw: (g, t) => {
      surf(g, t, 1460);
      for (let i = 0; i < 2; i++) { const ph = ((t - tCa) * 0.8 + i * 0.5) % 1; catapult(g, 160 + i * 300, 1800, 200, t > tCa ? Math.min(1, ph * 4) : 0); if (t > tCa) { const q = clamp((ph - 0.2) / 0.6); ell(g, lerp(160 + i * 300, 800 + i * 150, q), 1600 - Math.sin(q * Math.PI) * 500, 22, 22, "#6a6a72", 4); if (q >= 1) { g.save(); g.globalAlpha = 0.8; ell(g, 800 + i * 150, 1440, 50, 120, "#cfe9f6", 4); g.restore(); } } }
      if (t > tA) stabbers(g, t, 3, 640); },
      titles: [["lined", "LINE UP!", "label"], [tCa, "SIEGE CATAPULTS", "label", { fill: "#ffe08a" }], [tA, "ATTACK THE WAVES!", "stamp", { size: 92 }]] });
    ev(tCa, "whoosh"); ev(tCa + 0.8, "splash"); ev(tA, "warcry"); ev(tA + 0.5, "splash", 0.6); }
  // 3 hours of slashing → victory over Neptune
  { const tH = wt(3, "hours"), tV = wt(3, "victory"), tN = wt(3, "Neptune");
    S2(3, { bg: "beach", draw: (g, t) => {
      surf(g, t, 1460);
      if (t > tN - 0.3) neptune(g, 820, 1520, 420 * clamp((t - tN + 0.3) / 0.6), t, clamp((t - tN + 0.3) / 0.4));
      guy(g, C.emperor, { x: 300, y: 1820, h: 600, expr: t > tV ? "proud" : "neutral", armR: t > tV ? [2.8, 0] : [1.2, -0.3], armL: t > tV ? [-2.8, 0] : undefined, blink: blinkAt(t, 1), t });
      if (t < tV) { rect(g, 640, 980, 320, 150, "#fff6e6", 7, 14); strokeText(g, `${Math.min(6, 1 + Math.floor((t - S(3)) * 1.2))} HOURS`, 800, 1055, 56, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tH, "HOURS OF SLASHING", "label"], [tV, "VICTORY!", "stamp", { size: 130 }], [tN, "OVER NEPTUNE, GOD OF THE SEA", "label", { size: 52, fill: "#cfe9ff" }]] });
    ev(tH, "clash", 0.5); ev(tV, "cheer"); ev(tN, "choir", 0.5); }
  // 4 seashells as spoils of war
  { const tS = wt(4, "seashells"), tSp = wt(4, "spoils"), tR = wt(4, "Rome");
    S2(4, { bg: "beach", keys: [[0, 540, 1450, 1.05, 0], [9, 540, 1500, 1.15, 0]], draw: (g, t) => {
      surf(g, t, 1460);
      for (let i = 0; i < 5; i++) { const x = 80 + i * 230; guy(g, { ...C.legion, helmet: null, hair: "#5a3b2a" }, { x, y: 1840, h: 420, expr: "sad", armR: [1.2, 0.8], blink: blinkAt(t, i), t });
        g.save(); g.translate(x + 60, 1640); smoothPath(g, [[-50, 0], [-40, -40], [40, -40], [50, 0], [0, 12]]); fillInk(g, "#c9973f", 4); for (let k = 0; k < (t > tS ? 4 : 0); k++) { g.save(); g.translate(-24 + k * 16, -46 - (k % 2) * 8); g.beginPath(); for (let a = 0; a < 7; a++) g.lineTo(Math.cos(Math.PI + a * Math.PI / 6) * 13, Math.sin(Math.PI + a * Math.PI / 6) * 13); g.closePath(); fillInk(g, ["#f2c4b0", "#f6e6d0", "#e9a0a8"][k % 3], 2); g.restore(); } g.restore(); } },
      titles: [["triumph", "PROOF OF TRIUMPH:", "label"], [tS, "SEASHELLS", "stamp", { size: 120 }], [tSp, "“SPOILS OF WAR”", "stamp", { size: 96 }], [tR, "...FOR DISPLAY IN ROME", "label", { size: 58 }]] });
    ev(tS, "sparkle"); ev(tSp, "boing"); }
  // 5 historians debate
  { const tM = wt(5, "mind"), tH = wt(5, "humiliating");
    S2(5, { bg: "library", blur: true, draw: (g, t) => {
      guy(g, C.greek(1), { x: 260, y: 1820, h: 560, expr: "talk", mouthOpen: t < tH ? talk(t) : 0, armR: [1.9, -0.4], hold: { l: "scroll" }, blink: blinkAt(t, 1), t });
      guy(g, C.greek(0), { x: 820, y: 1820, h: 560, dir: -1, expr: t > tH ? "talk" : "sly", mouthOpen: t > tH ? talk(t) : 0, armR: [1.9, -0.4], blink: blinkAt(t, 2), t });
      if (t > tM - 0.2) shout(g, 280, 1040, "MAD?", 64, clamp((t - tM + 0.2) / 0.15), "#c0392b", [260, 1240]);
      if (t > tH - 0.1) shout(g, 800, 1000, "PUNISHMENT?", 52, clamp((t - tH + 0.1) / 0.15), "#2f5fae", [820, 1240]); },
      titles: [["Historians", "HISTORIANS STILL DEBATE", "label", { size: 60 }]] });
    ev(tM, "pop"); ev(tH, "pop"); }
}
