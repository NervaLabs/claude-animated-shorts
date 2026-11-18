// 010 — The Library That Confiscated Every Book on Ships
"use strict";
function buildShots() {
  const OFF = { tunic: "#f4f0e2", trim: "#d4a632", hair: "#141018", skin: "#c99067", helmet: "nemes" };
  const scrollItem = (g, x, y, s, rot = 0) => { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); rect(g, -40 * u, -12 * u, 80 * u, 24 * u, "#f3e3bb", 3, 4); ell(g, -40 * u, 0, 8 * u, 14 * u, "#d9c08a", 3); ell(g, 40 * u, 0, 8 * u, 14 * u, "#d9c08a", 3); g.restore(); };
  const harbor = (g, t) => { sea(g, 1300, t, -900, 2000, "#2fa0c8", "#1f6f9a"); g.fillStyle = "#c9b49a"; g.fillRect(-900, 1550, 2900, 900); line(g, [[-900, 1550], [2000, 1550]], 6); rect(g, 1250, 700, 120, 600, "#f0d6b0", 6); flame(g, 1310, 690, 22, t); };
  // 0 hook
  S2(0, { bg: "nile", blur: true, under: (g, t) => harbor(g, t), draw: (g, t) => { sailShip(g, { x: 700, y: 1400, h: 380, t, dir: -1, hull: "#8a5a32" }); guy(g, OFF, { x: 260, y: 1840, h: 600, expr: "sly", armR: [2.4, -0.2], blink: blinkAt(t, 1), t }); },
    titles: [["Library", "THE GREAT LIBRARY OF ALEXANDRIA", "label", { font: "Cinzel", size: 52 }], ["mugging", "...MUGGED SHIPS", "stamp", { size: 110 }]] });
  ev(wt(0, "mugging"), "boing");
  // 1 every ship searched
  { const tP = wt(1, "Ptolemaic"), tS = wt(1, "searched");
    S2(1, { bg: "nile", under: (g, t) => harbor(g, t), draw: (g, t) => { sailShip(g, { x: 700, y: 1420, h: 360, t, dir: -1, hull: "#8a5a32" }); for (let i = 0; i < 2; i++) guy(g, OFF, { x: lerp(-200, 260 + i * 160, clamp((t - tS + 0.6) / 1)), y: 1840, h: 520, expr: "stern", walk: t < tS + 0.4 ? t * 2 : null, armR: [1.6, -0.3], blink: blinkAt(t, i), t }); },
      titles: [[tP, "THE PTOLEMIES' RULE:", "label", { font: "Cinzel" }], [tS, "EVERY SHIP SEARCHED", "stamp", { size: 90 }]] });
    ev(tS, "drums"); }
  // 2 scrolls seized
  { const tSe = wt(2, "seized");
    S2(2, { bg: "deck", draw: (g, t) => { guy(g, C.greek(0), { x: 820, y: 1840, h: 540, dir: -1, expr: "shock", armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t }); guy(g, OFF, { x: 300, y: 1840, h: 560, expr: "sly", armR: [1.2, 1.0], blink: blinkAt(t, 1), t }); for (let i = 0; i < 4; i++) scrollItem(g, 340 + i * 30, 1500 - i * 26, 120, 0.2); },
      titles: [[tSe, "SCROLLS: SEIZED", "stamp", { size: 110 }]] });
    ev(tSe, "whoosh"); }
  // 3 copy, keep the originals, return the copies
  { const tC = wt(3, "copy"), tK = wt(3, "keep"), tR = wt(3, "returning");
    S2(3, { bg: "library", blur: true, draw: (g, t) => { rect(g, 160, 1460, 760, 60, "#6b4024", 6, 6); for (let i = 0; i < 2; i++) guy(g, C.egyptian(i), { x: 260 + i * 280, y: 1460, h: 400, sit: true, expr: "determined", armR: [1.2, 0.8], blink: blinkAt(t, i), t, shadow: false }); if (t > tK) { scrollItem(g, 540, 1380, 200, 0); strokeText(g, "ORIGINAL → LIBRARY", 540, 1250, 44, { fill: "#ffe08a" }); } if (t > tR) { scrollItem(g, 860, 1700, 160, 0.3); strokeText(g, "COPY → SHIP", 860, 1600, 40, { fill: "#cfe9ff" }); } },
      titles: [[tC, "COPIED BY HAND...", "label"], [tK, "KEEP THE ORIGINALS", "stamp", { size: 96 }], [tR, "RETURN THE COPIES", "label", { fill: "#cfe9ff" }]] });
    ev(tK, "laugh", 0.5); ev(tR, "boing"); }
  // 4 half a million scrolls
  { const tH = wt(4, "half");
    S2(4, { bg: "library", keys: [[0, 540, 1250, 1.0, 0], [8, 540, 1200, 0.8, 0]], draw: (g, t) => { const n = Math.floor(clamp((t - tH + 0.5) / 2) * 60); for (let i = 0; i < n; i++) scrollItem(g, 120 + (i % 10) * 95, 1750 - Math.floor(i / 10) * 40, 100, (rnd(i) - 0.5) * 0.3); guy(g, OFF, { x: 900, y: 1840, h: 520, dir: -1, expr: "proud", armR: [2.7, 0], blink: blinkAt(t, 1), t }); },
      titles: [["ruthless", "A RUTHLESS POLICY", "label"], [tH, "~500,000 SCROLLS", "stamp", { size: 104 }]] });
    ev(tH, "choir", 0.5); }
}
