// 021 — The Richest Person in Human History
"use strict";
function buildShots() {
  const MUSA = { tunic: "#e2b64b", trim: "#c0392b", helmet: "crown", skin: "#6a3e24", beard: "#1a1012", robe: true, cape: "#c0392b" };
  const MALI = (i) => ({ tunic: ["#f3ecda", "#2f6f9a", "#c0392b"][i % 3], trim: "#e2b64b", helmet: "turban", hatCol: ["#f6f3ea", "#2f6f9a", "#e2b64b"][i % 3], skin: ["#6a3e24", "#7a4a2a", "#5a3420"][i % 3], robe: true });
  const camel = (g, x, y, s, t, gold = true) => { const u = s / 100; for (const [lx, o] of [[-30, 0], [-18, 0.5], [22, 0.25], [34, 0.75]]) { const a = Math.sin((t * 1.2 + o) * TAU) * 0.3; limb(g, [[lx * u, -60 * u], [lx * u + Math.sin(a) * 50 * u, 0]], 9 * u, "#c9965a", 3); } ell(g, 0, -80 * u, 50 * u, 28 * u, "#c9965a", 4); ell(g, -6 * u, -112 * u, 22 * u, 22 * u, "#c9965a", 4); limb(g, [[40 * u, -90 * u], [62 * u, -140 * u]], 14 * u, "#c9965a", 3); ell(g, 72 * u, -146 * u, 18 * u, 12 * u, "#c9965a", 3); if (gold) { rect(g, -50 * u, -128 * u, 30 * u, 36 * u, "#f2c443", 3, 4); rect(g, 20 * u, -128 * u, 30 * u, 36 * u, "#f2c443", 3, 4); } };
  const desertBG = "sahel";
  // 0 hook
  S2(0, { bg: desertBG, blur: true, draw: (g, t) => { guy(g, MUSA, { x: 540, y: 1840, h: 640, expr: "proud", armR: [2.6, 0], armL: [-2.6, 0], blink: blinkAt(t, 1), t }); for (let i = 0; i < 8; i++) sparkle(g, 540 + Math.cos(i * 0.8) * 340, 1200 + Math.sin(i * 1.3) * 220, 30, (t * 0.7 + i / 8) % 1); },
    titles: [["richest", "THE RICHEST HUMAN EVER", "stamp", { size: 92 }], ["tech", "NOT A TECH BILLIONAIRE", "label", { fill: "#cfe9ff" }], ["African", "A 14TH-CENTURY AFRICAN EMPEROR", "label", { size: 54, fill: "#ffe08a" }]] });
  ev(wt(0, "richest"), "cash");
  // 1 Mansa Musa, Mali, gold & salt
  { const tM = wt(1, "Mansa"), tG = wt(1, "gold"), tS = wt(1, "salt");
    S2(1, { bg: desertBG, draw: (g, t) => { guy(g, MUSA, { x: 300, y: 1840, h: 600, expr: "proud", armR: [2.2, -0.3], blink: blinkAt(t, 1), t }); if (t > tG - 0.2) for (let i = 0; i < 6; i++) rect(g, 620 + (i % 3) * 110, 1760 - Math.floor(i / 3) * 60, 100, 56, "#f2c443", 4, 6); if (t > tS - 0.2) for (let i = 0; i < 3; i++) rect(g, 640 + i * 110, 1600, 100, 56, "#f6f3ea", 4, 6); },
      titles: [[tM, "MANSA MUSA OF MALI", "label", { font: "Cinzel" }], [tG, "HALF THE WORLD'S GOLD", "stamp", { size: 90 }], [tS, "+ SALT", "label", { fill: "#f6f3ea" }]] });
    ev(tG, "cash"); }
  // 2 1324 pilgrimage caravan
  { const tY = wt(2, "1324"), tSi = wt(2, "60,000"), tE = wt(2, "80"), tT = wt(2, "300");
    S2(2, { bg: desertBG, keys: [[0, 540, 1350, 0.9, 0], [11, 540, 1350, 0.8, 0]], draw: (g, t) => { const off = ((t - S(2)) * 80) % 260; for (let i = 0; i < 6; i++) { camel(g, -200 + i * 260 + off, 1700, 170, t + i * 0.3); guy(g, MALI(i), { x: -300 + i * 260 + off, y: 1840, h: 340, expr: "happy", walk: t * 1.4 + i * 0.3, blink: blinkAt(t, i), t }); } },
      titles: [[tY, "1324: PILGRIMAGE TO MECCA", "stamp", { size: 80 }], [tSi, "60,000 PEOPLE", "label", { fill: "#ffe08a" }], [tE, "80 CAMELS", "label"], [tT, "300 LB OF GOLD EACH", "stamp", { size: 92 }]] });
    ev(tY, "boom", 0.5); ev(tT, "cash"); }
  // 3 gave away gold in Cairo → crashed the economy
  { const tC = wt(3, "Cairo"), tCr = wt(3, "crashed"), tD = wt(3, "decade");
    S2(3, { bg: "nile", draw: (g, t) => { guy(g, MUSA, { x: 280, y: 1840, h: 600, expr: "happy", armR: [2.0 + Math.sin(t * 8) * 0.3, -0.4], blink: blinkAt(t, 1), t }); for (let i = 0; i < 10; i++) { const q = ((t * 0.8 + i / 10) % 1); ell(g, 380 + q * 600, 1300 - Math.sin(q * Math.PI) * 300, 16, 16, "#f2c443", 3); } for (let i = 0; i < 3; i++) guy(g, C.egyptian(i), { x: 700 + i * 140, y: 1840, h: 440, dir: -1, expr: "laugh", armR: [2.6, 0], blink: 0, t }); if (t > tCr - 0.1) { rect(g, 340, 900, 420, 260, "#fff6e6", 7, 12); line(g, [[380, 960], [380, 1120], [720, 1120]], 5); g.beginPath(); g.moveTo(400, 980); g.lineTo(520, 990); g.lineTo(560, 1100); g.lineTo(700, 1110); g.lineWidth = 9; g.strokeStyle = "#c0392b"; g.stroke(); strokeText(g, "GOLD VALUE", 540, 870, 40, { fill: "#fff" }); } },
      titles: [[tC, "FREE GOLD IN CAIRO", "label", { fill: "#ffe08a" }], [tCr, "HE CRASHED EGYPT'S ECONOMY", "stamp", { size: 74 }], [tD, "...FOR OVER A DECADE", "label"]] });
    ev(tC, "cash"); ev(tCr, "sadtrombone", 0.6); }
}
