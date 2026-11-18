// 038 — Why Tulip Bulbs Cost More Than Houses in 1637
"use strict";
function buildShots() {
  const DUTCH = (i) => ({ ...C.gent(i), tunic: ["#1c1422", "#3a2a1a", "#2a2a3a"][i % 3], trim: "#f6f3ea" });
  const tulip = (g, x, y, s, t, c1 = "#c0392b", c2 = "#f6f3ea") => { line(g, [[x, y], [x + Math.sin(t) * 6 * s, y - 120 * s]], 6 * s, "#3a7a3a"); ell(g, x - 20 * s, y - 50 * s, 26 * s, 10 * s, "#4a8a3a", 3); g.save(); g.translate(x + Math.sin(t) * 6 * s, y - 140 * s); g.beginPath(); g.moveTo(-34 * s, -10 * s); g.lineTo(-30 * s, -50 * s); g.lineTo(-12 * s, -28 * s); g.lineTo(0, -56 * s); g.lineTo(12 * s, -28 * s); g.lineTo(30 * s, -50 * s); g.lineTo(34 * s, -10 * s); g.quadraticCurveTo(0, 40 * s, -34 * s, -10 * s); g.fillStyle = c1; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); for (let k = -1; k <= 1; k++) line(g, [[k * 14 * s, -36 * s], [k * 10 * s, 6 * s]], 5 * s, c2); g.restore(); };
  const bulb = (g, x, y, s) => { g.beginPath(); g.moveTo(x, y - 80 * s); g.quadraticCurveTo(x + 70 * s, y - 20 * s, x + 40 * s, y + 20 * s); g.lineTo(x - 40 * s, y + 20 * s); g.quadraticCurveTo(x - 70 * s, y - 20 * s, x, y - 80 * s); g.fillStyle = "#c9a07a"; g.fill(); g.lineWidth = 6; g.strokeStyle = INK; g.stroke(); line(g, [[x - 20 * s, y + 20 * s], [x - 26 * s, y + 40 * s]], 3, INK); line(g, [[x + 10 * s, y + 20 * s], [x + 14 * s, y + 42 * s]], 3, INK); };
  const canal = (g) => { for (let i = 0; i < 4; i++) { const x = 40 + i * 270; rect(g, x, 1000, 250, 700, ["#8a3a2a", "#5a3a2a", "#7a5a3a", "#9a4a3a"][i], 6); poly(g, [[x, 1000], [x + 125, 860], [x + 250, 1000]], ["#8a3a2a", "#5a3a2a", "#7a5a3a", "#9a4a3a"][i], 6); for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) rect(g, x + 40 + c * 100, 1080 + r * 180, 70, 110, "#f6f0d0", 4, 4); } g.fillStyle = "#3f7fa4"; g.fillRect(-900, 1700, 2900, 400); };
  // 0 hook: 1 bulb = 1 mansion
  S2(0, { bg: "town", blur: true, draw: (g, t) => { bulb(g, 260, 1500, 2.2); strokeText(g, "=", 500, 1480, 150, { fill: "#fff" }); halfTimber(g, 800, 1700, 380, 520, "#9a4a3a", "#5a2a1a"); },
    titles: [["bulb", "ONE FLOWER BULB", "label"], ["mansion", "= A CANAL MANSION", "stamp", { size: 96 }]] });
  ev(wt(0, "mansion"), "cash");
  // 1 Dutch Golden Age; tulips from the Ottomans = status
  { const tD = wt(1, "Dutch"), tO = wt(1, "Ottoman"), tS = wt(1, "status");
    S2(1, { bg: "town", draw: (g, t) => { canal(g); for (let i = 0; i < 2; i++) guy(g, DUTCH(i), { x: 300 + i * 480, y: 1840, h: 580, dir: i ? -1 : 1, expr: "proud", blink: blinkAt(t, i), t }); if (t > tO - 0.2) tulip(g, 540, 1700, 2.4, t); },
      titles: [[tD, "THE DUTCH GOLDEN AGE", "label", { font: "Cinzel" }], [tO, "TULIPS FROM THE OTTOMANS", "label", { size: 60, fill: "#ffd0c0" }], [tS, "THE ULTIMATE STATUS SYMBOL", "stamp", { size: 80 }]] });
    ev(tO, "sparkle"); }
  // 2 contract trading frenzy
  { const tC = wt(2, "contracts"), tM = wt(2, "Mania");
    S2(2, { bg: "victorianRoom", keys: [[0, 540, 1300, 1.0, 0], [9, 540, 1300, 1.12, 0]], draw: (g, t) => { for (let i = 0; i < 5; i++) guy(g, DUTCH(i), { x: 140 + i * 200, y: 1840, h: 480, expr: "shout", mouthOpen: talk(t + i), armR: [2.8, 0.1 * Math.sin(t * 9 + i)], hold: { r: "scroll" }, blink: 0, t }); if (t > tC) for (let i = 0; i < 5; i++) { const q = (t * 0.9 + i / 5) % 1; scroll(g, 140 + i * 210, 1200 - q * 500, 90, 60, "", 2, q * 3); } rect(g, 760, 760, 240, 160, "#fff6e6", 6, 12); g.beginPath(); for (let k = 0; k <= 10; k++) { const x = 780 + k * 20, y = 900 - Math.pow(k / 10, 2) * 120 * clamp((t - S(2)) / 4); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.lineWidth = 7; g.strokeStyle = "#2f8a3a"; g.stroke(); },
      titles: [[tC, "TRADING TULIP CONTRACTS", "label"], [tM, "“TULIP MANIA”", "stamp", { size: 120, fill: "#ffc0c0" }]] });
    ev(tC, "crowd"); ev(tM, "cash"); }
  // 3 Feb 1637 Semper Augustus → crash
  { const tF = wt(3, "February"), tSA = wt(3, "Semper"), tH = wt(3, "house"), tCr = wt(3, "crashed");
    S2(3, { bg: "victorianRoom", draw: (g, t) => { if (t < tCr - 0.2) { tulip(g, 540, 1800, 4.0, t, "#c0392b", "#f6f3ea"); for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 320, 1100 + Math.sin(i * 2) * 200, 30, (t * 0.7 + i / 6) % 1); } else { rect(g, 200, 900, 680, 500, "#fff6e6", 8, 14); g.beginPath(); g.moveTo(240, 1300); g.lineTo(560, 960); g.lineTo(600, 1360); g.lineTo(840, 1370); g.lineWidth = 12; g.strokeStyle = "#c0392b"; g.stroke(); for (let i = 0; i < 3; i++) guy(g, DUTCH(i), { x: 200 + i * 340, y: 1840, h: 480, expr: "shock", armR: [2.8, 0.2], armL: [-2.8, -0.2], blink: 0, t }); } },
      titles: [[tF, "FEBRUARY 1637", "stamp", { size: 110 }], [tSA, "“SEMPER AUGUSTUS”", "label", { font: "Cinzel", fill: "#ffd0c0" }], [tH, "= A FAMILY'S HALF-LIFETIME", "label", { size: 56 }], [tCr, "CRASHED OVERNIGHT", "stamp", { size: 100 }]] });
    ev(tF, "boom", 0.5); ev(tCr, "crash"); ev(tCr + 0.3, "sadtrombone", 0.6); }
}
