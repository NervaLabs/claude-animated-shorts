// 009 — Why Purple Was Only for Royalty
"use strict";
function buildShots() {
  const snail = (g, x, y, s, t) => { const u = s / 100; ell(g, x, y, 60 * u, 18 * u, "#c9a87a", 3); g.save(); g.translate(x + 10 * u, y - 30 * u); g.beginPath(); for (let a = 0; a < 18; a++) { const r = 34 * u * (1 - a / 22), ang = a * 0.7; g.lineTo(Math.cos(ang) * r, Math.sin(ang) * r); } fillInk(g, "#8a5aa8", 3); g.restore(); line(g, [[x + 50 * u, y - 6 * u], [x + 66 * u, y - 30 * u]], 3 * u); };
  const cloth = (g, x, y, s, k) => { const u = s / 100; rect(g, x - 100 * u, y - 120 * u, 200 * u, 240 * u, "#f3ecda", 5, 6); rect(g, x - 100 * u, y + 100 * u - 40 * u * k, 200 * u, 40 * u * k, "#6b2a7a", 0); };
  // 0 hook
  S2(0, { bg: "forum", blur: true, draw: (g, t) => { guy(g, C.emperor, { x: 300, y: 1820, h: 620, expr: "proud", blink: blinkAt(t, 1), t }); guy(g, { ...C.roman(1), tunic: "#6b2a7a" }, { x: 800, y: 1820, h: 560, dir: -1, expr: "scared", blink: 0, t, sweat: (t * 0.8) % 1 }); if (t > wt(0, "punishable")) { strokeText(g, "✕", 800, 1100, 140, { fill: "#c0392b" }); } },
    titles: [["purple", "WEARING PURPLE...", "label", { fill: "#d9b0ff" }], ["punishable", "...COULD GET YOU KILLED", "stamp", { size: 86 }]] });
  ev(wt(0, "punishable"), "sting", 0.5);
  // 1 from sea-snail mucus
  { const tT = wt(1, "Tyrian"), tM = wt(1, "mucus"), tS = wt(1, "snails");
    S2(1, { bg: "beach", keys: [[0, 540, 1450, 1.0, 0], [10, 540, 1550, 1.3, 0]], draw: (g, t) => { for (let i = 0; i < 5; i++) snail(g, 200 + i * 180, 1700 + (i % 2) * 40, 150, t); if (t > tM) for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; ell(g, 380 + i * 180, 1700 + q * 60, 10, 14, "#8a4ab8", 2); } },
      titles: [[tT, "TYRIAN PURPLE", "stamp", { size: 110, fill: "#e0b0ff" }], [tM, "...FROM SNAIL MUCUS", "label", { fill: "#d9f2a0" }], [tS, "MEDITERRANEAN SEA SNAILS", "label", { size: 56 }]] });
    ev(tT, "boom", 0.5); ev(tM, "splat", 0.5); }
  // 2 12,000 snails per trim
  { const tN = wt(2, "12,000"), tT = wt(2, "trim");
    S2(2, { bg: "dark", draw: (g, t) => { const n = Math.floor(clamp((t - tN + 0.3) / 2) * 120); for (let i = 0; i < n; i++) snail(g, 90 + (i % 12) * 82, 700 + Math.floor(i / 12) * 70, 70, t); if (t > tT - 0.2) cloth(g, 540, 1650, 150, clamp((t - tT + 0.2) / 0.6)); },
      titles: [[tN, "~12,000 SNAILS", "stamp", { size: 110 }], [tT, "...FOR ONE TRIM", "label", { fill: "#e0b0ff" }]] });
    ev(tN, "pop"); ev(tN + 0.4, "pop"); ev(tN + 0.8, "pop"); }
  // 3 stinks; worth more than gold; banned
  { const tR = wt(3, "rotting"), tG = wt(3, "gold"), tL = wt(3, "laws"), tB = wt(3, "banning");
    S2(3, { bg: "forum", blur: true, draw: (g, t) => {
      if (t < tL - 0.1) { guy(g, C.roman(0), { x: 300, y: 1820, h: 560, expr: "sick", armR: [2.6, 1.4], blink: blinkAt(t, 1), t }); rect(g, 560, 1600, 300, 180, "#6b2a7a", 6, 10); for (let i = 0; i < 4; i++) { const q = (t * 0.8 + i / 4) % 1; g.save(); g.globalAlpha = 1 - q; line(g, [[600 + i * 60, 1580 - q * 200], [620 + i * 60, 1540 - q * 200], [600 + i * 60, 1500 - q * 200]], 8, "#8fbf3a"); g.restore(); } if (t > tG) { for (let i = 0; i < 4; i++) rect(g, 620 + (i % 2) * 90, 1300 - Math.floor(i / 2) * 50, 80, 44, "#f2c443", 4, 4); strokeText(g, "<", 710, 1450, 80, { fill: "#fff" }); } }
      else { guy(g, C.emperor, { x: 540, y: 1820, h: 620, expr: "stern", armR: [2.4, -0.2], blink: blinkAt(t, 1), t }); scrollUnrolled(g, 540, 1000, 600, 300, ["PURPLE: EMPERORS ONLY"], -0.03, clamp((t - tB + 0.3) / 0.3)); } },
      titles: [[tR, "STANK OF ROTTING FISH", "label", { fill: "#d9f2a0" }], [tG, "WORTH MORE THAN GOLD", "stamp", { size: 86 }], [tL, "BANNED FOR COMMONERS", "label", { fill: "#ffd0c0" }]] });
    ev(tR, "boing", 0.5); ev(tG, "cash"); ev(tB, "clank", 0.6); }
  // 4 still royal today
  { const tW = wt(4, "wealth");
    S2(4, { bg: "palace", draw: (g, t) => { guy(g, { ...C.king, tunic: "#6b2a7a", cape: "#6b2a7a" }, { x: 360, y: 1820, h: 620, expr: "proud", blink: blinkAt(t, 1), t }); guy(g, { ...C.queen, tunic: "#6b2a7a", cape: "#4b1a5a" }, { x: 720, y: 1820, h: 600, dir: -1, expr: "proud", blink: blinkAt(t, 2), t }); for (let i = 0; i < 5; i++) sparkle(g, 540 + Math.cos(i * 1.3) * 300, 1200 + Math.sin(i * 2) * 150, 26, (t * 0.7 + i / 5) % 1); },
      titles: [[tW, "PURPLE = ROYALTY", "stamp", { size: 110, fill: "#e0b0ff" }]] });
    ev(tW, "choir", 0.5); }
}
