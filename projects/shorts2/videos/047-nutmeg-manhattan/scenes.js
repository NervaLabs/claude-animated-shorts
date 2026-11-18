// 047 — How a Single Spice Sparked Global Exploration
"use strict";
function buildShots() {
  const DUT = (i) => ({ ...C.gent(i), tunic: "#1c1422", trim: "#f6f3ea", helmet: "tophat", hatCol: "#1c1422" });
  const BRI = (i) => ({ ...C.gent(i), tunic: "#c0392b", trim: "#e2b64b", helmet: "tophat", hatCol: "#1c1422" });
  const nut = (g, x, y, s) => { ell(g, x, y, 60 * s, 48 * s, "#8a5a32", 6); for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(x, y, 60 * s * (1 - k * 0.2), 48 * s, 0, -1.2, 1.2); g.lineWidth = 4; g.strokeStyle = "#c0392b"; g.stroke(); } };
  const island = (g, x, y, w, col = "#d9c08a", palms = 2, t = 0) => { ell(g, x, y, w, w * 0.22, col, 6); g.save(); g.beginPath(); g.ellipse(x, y - 4, w * 0.8, w * 0.16, 0, Math.PI, 0); g.fillStyle = "#4a8a3a"; g.fill(); g.restore(); for (let i = 0; i < palms; i++) palm(g, x - w * 0.3 + i * w * 0.6 / Math.max(1, palms - 1), y - w * 0.1, w * 0.6, 5, t); };
  // 0 hook: nutmeg > gold
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => { nut(g, 300, 1450, 2.2); strokeText(g, ">", 540, 1480, 150, { fill: "#fff" }); for (let i = 0; i < 3; i++) rect(g, 680 + (i % 2) * 120, 1500 - Math.floor(i / 2) * 70, 140, 64, "#f2c443", 5, 8); },
    titles: [["nutmeg", "NUTMEG", "stamp", { size: 140 }], ["gold", "WORTH MORE THAN GOLD", "label", { fill: "#ffe08a" }], ["plague", "“IT CURES THE PLAGUE!”", "label", { fill: "#c8ffb0" }]] });
  ev(wt(0, "gold"), "cash");
  // 1 only grew on the Banda Islands
  { const tO = wt(1, "only"), tB = wt(1, "Banda");
    S2(1, { bg: "sea", draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2fa0c8", "#1f6f9a"); island(g, 540, 1460, 340, "#d9c08a", 3, t); if (t > tB - 0.2) { const k = clamp((t - tB + 0.2) / 0.4); g.save(); g.translate(540, 1000); g.scale(k, k); poly(g, [[-50, -60], [50, -60], [0, 40]], "#c0392b", 6); ell(g, 0, -80, 50, 50, "#c0392b", 6); ell(g, 0, -80, 18, 18, "#fff", 0); g.restore(); } },
      titles: [["1600s", "THE 1600s", "label"], [tO, "IT GREW IN ONE PLACE ONLY", "stamp", { size: 82 }], [tB, "THE BANDA ISLANDS", "label", { font: "Cinzel", fill: "#ffe08a" }]] });
    ev(tB, "ding"); }
  // 2 European powers fight for them (non-graphic)
  { const tW = wt(2, "wars");
    S2(2, { bg: "sea", draw: (g, t) => { sea(g, 1200, t, -900, 2000, "#2fa0c8", "#1f6f9a"); sailShip(g, { x: 260, y: 1420, h: 360, t, hull: "#3a2a1a", sail: "#f6f3ea", flag: ["#c0392b", "#fff", "#2f4f9f"], seed: 1 }); sailShip(g, { x: 820, y: 1440, h: 360, t, dir: -1, hull: "#6b2a2a", sail: "#f6f3ea", flag: ["#c0392b", "#fff"], seed: 2 }); if (t > tW - 0.2) for (let i = 0; i < 3; i++) { const q = ((t - tW) * 1.2 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 400 + q * 120, 1300 - i * 20, 40 + q * 50, 40 + q * 50, "#e9e4dc", 0); ell(g, 680 - q * 120, 1320 - i * 20, 40 + q * 50, 40 + q * 50, "#e9e4dc", 0); g.restore(); } },
      titles: [["European", "EUROPEAN POWERS", "label"], [tW, "FOUGHT WARS FOR THEM", "stamp", { size: 96 }]] });
    ev(tW, "cannon"); ev(tW + 0.5, "cannon", 0.6); }
  // 3 1667 treaty: Run ↔ Manhattan
  { const tY = wt(3, "1667"), tR = wt(3, "Run"), tM = wt(3, "Manhattan");
    S2(3, { bg: "victorianRoom", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1300, 1.05, 0]], draw: (g, t) => {
      if (t < tR - 0.2) { guy(g, DUT(0), { x: 260, y: 1840, h: 600, expr: "sly", blink: blinkAt(t, 1), t }); guy(g, BRI(1), { x: 820, y: 1840, h: 600, dir: -1, expr: "sly", blink: blinkAt(t, 2), t }); scroll(g, 540, 1350, 300, 380, "TREATY", 5, 0.03); }
      else { rect(g, 80, 900, 440, 700, "#fff6e6", 7, 14); rect(g, 560, 900, 440, 700, "#fff6e6", 7, 14); g.save(); g.beginPath(); g.rect(90, 910, 420, 680); g.clip(); g.fillStyle = "#4ea3c9"; g.fillRect(80, 900, 440, 700); island(g, 300, 1300, 140, "#d9c08a", 1, t); g.restore(); strokeText(g, "RUN", 300, 1500, 60, { fill: "#1c1422", lw: 0, shadow: false }); if (t > tM - 0.2) { g.save(); g.beginPath(); g.rect(570, 910, 420, 680); g.clip(); g.fillStyle = "#4ea3c9"; g.fillRect(560, 900, 440, 700); g.beginPath(); g.ellipse(780, 1250, 60, 230, 0.3, 0, TAU); g.fillStyle = "#8a7a4a"; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); g.restore(); strokeText(g, "MANHATTAN", 780, 1530, 50, { fill: "#1c1422", lw: 0, shadow: false }); } strokeText(g, "⇄", 540, 1250, 90, { fill: "#fff" }); }
    }, titles: [[tY, "1667", "stamp", { size: 160 }], [tR, "BRITAIN GAVE UP “RUN”", "label"], [tM, "THE DUTCH GAVE UP MANHATTAN", "stamp", { size: 76 }]] });
    ev(tY, "boom", 0.5); ev(tM, "sting", 0.6); }
}
