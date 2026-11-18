// 062 — The President Who Kept a Pet Alligator in the White House
"use strict";
function buildShots() {
  const JQA = { ...C.gent(1), tunic: "#1c1422", trim: "#f6f3ea", hair: "#d9d9d9", helmet: null };
  const LAF = { tunic: "#1f2f6f", trim: "#e2b64b", helmet: "bicorne", hatCol: "#1c1422", hair: "#9a8a7a", cape: "#c0392b" };
  const gator = (g, x, y, s, t, dir = 1) => { g.save(); g.translate(x, y); g.scale(dir * s, s); const jaw = Math.max(0, Math.sin(t * 2)) * 0.3; ell(g, 0, 0, 200, 50, "#4a7a3a", 6); for (let i = 0; i < 6; i++) poly(g, [[-140 + i * 50, -40], [-120 + i * 50, -70], [-100 + i * 50, -40]], "#3a6a2a", 4); g.save(); g.translate(180, -10); g.rotate(-jaw); rect(g, 0, -30, 160, 34, "#4a7a3a", 5, 14); for (let i = 0; i < 5; i++) poly(g, [[20 + i * 28, 4], [30 + i * 28, 18], [40 + i * 28, 4]], "#fff", 2); g.restore(); rect(g, 180, 0, 150, 26, "#4a7a3a", 5, 12); ell(g, 230, -46, 16, 16, "#f2e04a", 4); ell(g, 232, -46, 5, 10, INK, 0); poly(g, [[-190, 0], [-340, 20], [-190, 30]], "#4a7a3a", 5); for (const lx of [-110, 90]) { line(g, [[lx, 30], [lx + Math.sin(t * 4) * 10, 70]], 18, "#4a7a3a"); } g.restore(); };
  const tub = (g, x, y) => { g.beginPath(); g.moveTo(x - 300, y - 180); g.lineTo(x + 300, y - 180); g.quadraticCurveTo(x + 300, y, x + 200, y); g.lineTo(x - 200, y); g.quadraticCurveTo(x - 300, y, x - 300, y - 180); g.fillStyle = "#f6f3ea"; g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke(); rect(g, x - 280, y - 200, 560, 30, "#e9e4dc", 5, 12); };
  // 0 hook
  S2(0, { bg: "whiteHouse", blur: true, draw: (g, t) => { guy(g, JQA, { x: 300, y: 1840, h: 640, expr: "sly", blink: blinkAt(t, 1), t }); gator(g, 760, 1780, 1.0, t, -1); },
    titles: [["Quincy", "JOHN QUINCY ADAMS", "label", { font: "Cinzel" }], ["alligator", "A LIVE ALLIGATOR", "stamp", { size: 110 }], ["bathroom", "IN A WHITE HOUSE BATHROOM", "label", { size: 60, fill: "#c8ffb0" }]] });
  ev(wt(0, "alligator"), "boing");
  // 1 1825 Lafayette's gift
  { const tY = wt(1, "1825"), tL = wt(1, "Lafayette"), tG = wt(1, "gifted");
    S2(1, { bg: "whiteHouse", draw: (g, t) => { guy(g, LAF, { x: 300, y: 1840, h: 640, expr: "happy", armR: [1.6, -0.5], blink: blinkAt(t, 1), t }); guy(g, JQA, { x: 820, y: 1840, h: 640, dir: -1, expr: t > tG ? "shock" : "happy", blink: blinkAt(t, 2), t }); if (t > tG - 0.2) { rect(g, 420, 1600, 260, 200, "#c0392b", 6, 8); rect(g, 530, 1600, 40, 200, "#f2c443", 0); gator(g, 550, 1560, 0.4, t); } },
      titles: [[tY, "1825", "stamp", { size: 160 }], [tL, "THE MARQUIS DE LAFAYETTE", "label", { font: "Cinzel", size: 58 }], [tG, "...BROUGHT A GIFT", "label", { fill: "#ffe08a" }]] });
    ev(tY, "boom", 0.4); ev(tG, "ding"); }
  // 2 kept in the East Room bathroom; guests shocked
  { const tE = wt(2, "East"), tSh = wt(2, "shocked"), tW = wt(2, "wash");
    S2(2, { bg: "victorianRoom", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.06, 0]], draw: (g, t) => { tub(g, 620, 1760); gator(g, 600, 1620, 0.9, t); if (t > tSh - 0.3) { guy(g, C.gent(2), { x: 180, y: 1840, h: 620, expr: "scared", armR: [2.8, 0.3], armL: [-2.8, -0.3], blink: 0, t }); shout(g, 240, 1060, "AAH!", 70, clamp((t - tSh + 0.3) / 0.15), "#c0392b"); } if (t > tW) guy(g, JQA, { x: 960, y: 1840, h: 560, dir: -1, expr: "laugh", blink: blinkAt(t, 3), t }); },
      titles: [[tE, "THE UNFINISHED EAST ROOM", "label"], ["months", "FOR MONTHS", "stamp", { size: 110 }], ["reportedly", "(SO THE STORY GOES)", "label", { size: 56 }], [tSh, "GUESTS GOT A SURPRISE", "label", { fill: "#ffd0c0" }]] });
    ev(tSh, "gasp"); ev(tW, "laugh", 0.6); }
}
