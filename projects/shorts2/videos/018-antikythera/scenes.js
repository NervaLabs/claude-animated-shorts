// 018 — The Ancient Greek Computer Found in a Shipwreck
"use strict";
function buildShots() {
  const DIVER = { tunic: "#3a4a6a", trim: "#c9c4b8", hair: "#2a1a14", moust: true, trousers: "#3a4a6a" };
  const lump = (g, x, y, s) => { smoothPath(g, [[x - 80 * s, y], [x - 60 * s, y - 60 * s], [x + 30 * s, y - 80 * s], [x + 90 * s, y - 20 * s], [x + 60 * s, y + 40 * s], [x - 50 * s, y + 40 * s]]); fillInk(g, "#5a7a6a", 5); };
  const underwater = (g, t) => { g.fillStyle = vgrad(g, -500, 2400, [[0, "#2f8ab8"], [1, "#0f3a5a"]]); g.fillRect(-900, -900, 2900, 3400); for (let i = 0; i < 14; i++) { const q = (t * 0.3 + i / 14) % 1; ell(g, rnd(i) * 1080, 1900 - q * 1600, 8, 8, "rgba(255,255,255,0.4)", 2); } smoothHills(g, -900, 2000, 1800, 120, "#c9b48a", 3, 5); };
  const gearBox = (g, x, y, s, t) => { rect(g, x - 220 * s, y - 220 * s, 440 * s, 440 * s, "#8a5a32", 7, 10); gear(g, x - 60 * s, y - 40 * s, 110 * s, t * 0.6, "#c9973f", 20); gear(g, x + 100 * s, y + 70 * s, 70 * s, -t * 0.9, "#b9873a", 14); gear(g, x + 80 * s, y - 120 * s, 50 * s, -t * 1.2, "#d4a74a", 10); gear(g, x - 120 * s, y + 130 * s, 50 * s, -t * 1.1, "#b9873a", 10); };
  // 0 hook
  S2(0, { bg: "dark", under: (g, t) => underwater(g, t), draw: (g, t) => { sailShip(g, { x: 540, y: 1780, h: 420, t: 0, list: 0.4, hull: "#5a4a3a", sail: "#9a9a8a" }); lump(g, 540, 1600, 1.2); },
    titles: [["2,000-year-old", "A 2,000-YEAR-OLD COMPUTER", "stamp", { size: 82 }], ["Aegean", "AT THE BOTTOM OF THE AEGEAN", "label", { size: 56 }]] });
  ev(0.2, "bubble");
  // 1 1901: sponge divers find a lump of bronze
  { const tY = wt(1, "1901"), tA = wt(1, "Antikythera"), tL = wt(1, "lump");
    S2(1, { bg: "dark", under: (g, t) => underwater(g, t), draw: (g, t) => { sailShip(g, { x: 840, y: 1780, h: 380, t: 0, list: 0.4, hull: "#5a4a3a", sail: "#9a9a8a" }); guy(g, DIVER, { x: 400, y: 1600 + Math.sin(t * 2) * 20, h: 460, expr: t > tL ? "shock" : "determined", lean: 30, armR: [2.2, -0.3], blink: blinkAt(t, 1), t, shadow: false }); if (t > tL - 0.2) lump(g, 600, 1400 + Math.sin(t * 2) * 20, 0.8); },
      titles: [[tY, "1901", "stamp", { size: 150 }], [tA, "ANTIKYTHERA SHIPWRECK", "label", { font: "Cinzel" }], [tL, "A CORRODED BRONZE LUMP", "label", { fill: "#d9f2a0" }]] });
    ev(tY, "boom", 0.5); ev(tL, "pop"); }
  // 2 X-rays: 30+ gears
  { const tX = wt(2, "X-rays"), tG = wt(2, "gears");
    S2(2, { bg: "dark", draw: (g, t) => { g.save(); g.fillStyle = "#0e1a3a"; g.fillRect(140, 700, 800, 900); g.restore(); rect(g, 140, 700, 800, 900, null, 8, 10); g.save(); g.globalAlpha = 0.85; gearBox(g, 540, 1150, 1.3, t); g.restore(); g.save(); g.globalCompositeOperation = "multiply"; g.fillStyle = "rgba(120,200,255,0.6)"; g.fillRect(140, 700, 800, 900); g.restore(); },
      titles: [[tX, "X-RAYS REVEALED...", "label", { fill: "#cfe9ff" }], [tG, "30+ PRECISION GEARS", "stamp", { size: 96 }]] });
    ev(tX, "ding"); ev(tG, "clank", 0.5); }
  // 3 sun, moon, planets, eclipses, the Olympics
  { const tY = wt(3, "100"), tS = wt(3, "sun"), tE = wt(3, "eclipses"), tO = wt(3, "Olympic");
    S2(3, { bg: "dark", draw: (g, t) => { gearBox(g, 540, 1500, 1.0, t); const k = t - S(3); ell(g, 540, 800, 70, 70, "#ffd24a", 5); ell(g, 540 + Math.cos(k) * 220, 800 + Math.sin(k) * 120, 30, 30, "#e9eef4", 4); ell(g, 540 + Math.cos(k * 0.6 + 2) * 340, 800 + Math.sin(k * 0.6 + 2) * 180, 22, 22, "#c0582a", 3); if (t > tE) { g.save(); g.globalAlpha = 0.85; ell(g, 560, 800, 66, 66, "#1c1422", 0); g.restore(); } if (t > tO) for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(380 + i * 80, 1080 + (i % 2) * 40, 34, 0, TAU); g.lineWidth = 8; g.strokeStyle = ["#2f6fcf", "#1c1422", "#c0392b", "#e2b64b", "#2f9a5a"][i]; g.stroke(); } },
      titles: [[tY, "~100 BC", "stamp", { size: 120 }], [tS, "SUN · MOON · PLANETS", "label", { fill: "#ffe08a" }], [tE, "PREDICTED ECLIPSES", "label"], [tO, "COUNTED DOWN TO THE OLYMPICS", "label", { size: 54, fill: "#cfe9ff" }]] });
    ev(tE, "sting", 0.5); ev(tO, "cheer", 0.4); }
  // 4 a millennium ahead
  { const tM = wt(4, "millennium");
    S2(4, { bg: "town", blur: true, draw: (g, t) => { gearBox(g, 540, 1500, 1.0, t); for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.6) * 300, 1300 + Math.sin(i) * 200, 30, (t * 0.7 + i / 4) % 1); },
      titles: [["Clockwork", "NOTHING LIKE IT AGAIN...", "label"], [tM, "...FOR 1,000+ YEARS", "stamp", { size: 104 }]] });
    ev(tM, "choir", 0.6); }
}
