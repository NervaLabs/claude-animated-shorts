// 034 — Leonardo da Vinci Designed a Tank 400 Years Early
"use strict";
function buildShots() {
  const LEO = { ...C.artist, beard: "#d9d9d9", hair: "#d9d9d9", tunic: "#7a3a2a", helmet: "beret", hatCol: "#3a2a4a" };
  const PAPER = "#efe2c0", SEP = "#7a4a24";
  const tank = (g, x, y, s, t, ink = false, sab = false) => { const fc = ink ? PAPER : "#a07a4a", lc = ink ? SEP : INK; g.save(); g.translate(x, y); g.beginPath(); g.ellipse(0, 0, 300 * s, 200 * s, 0, Math.PI, 0); g.closePath(); g.fillStyle = fc; g.fill(); g.lineWidth = 6; g.strokeStyle = lc; g.stroke(); for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(0, 0, (300 - i * 60) * s, (200 - i * 40) * s, 0, Math.PI, 0); g.stroke(); } for (let i = -3; i <= 3; i++) { const a = Math.PI + (i + 3.5) / 7 * Math.PI; g.save(); g.rotate(0); g.translate(Math.cos(a) * 300 * s, Math.sin(a) * 200 * s + (i === -3 || i === 3 ? -10 : 0)); g.rotate(a + Math.PI / 2 * 0); g.fillStyle = ink ? PAPER : "#4a4a52"; g.fillRect(-4, -12 * s, 50 * s, 24 * s); g.strokeRect(-4, -12 * s, 50 * s, 24 * s); g.restore(); } g.beginPath(); g.moveTo(0, -200 * s); g.lineTo(0, -250 * s); g.stroke(); poly(g, [[-30 * s, -250 * s], [0, -300 * s], [30 * s, -250 * s]], fc, 5); for (const sd of [-1, 1]) { g.save(); g.translate(sd * 190 * s, 20 * s); g.rotate((sab && sd > 0 ? -t : t) * 2); g.beginPath(); g.arc(0, 0, 50 * s, 0, TAU); g.fillStyle = fc; g.fill(); g.stroke(); for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(k) * 50 * s, Math.sin(k) * 50 * s); g.stroke(); } g.restore(); } rect(g, -300 * s, 0, 600 * s, 20 * s, fc, 5); g.restore(); };
  // 0 hook
  S2(0, { bg: "library", blur: true, draw: (g, t) => { rect(g, 140, 820, 800, 640, PAPER, 6, 10); tank(g, 540, 1240, 1.0, t, true); guy(g, LEO, { x: 200, y: 1840, h: 560, expr: "sly", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); },
    titles: [["Leonardo", "LEONARDO DA VINCI", "label", { font: "Cinzel" }], ["tank", "DESIGNED A TANK", "stamp", { size: 110 }], ["1487", "...IN 1487", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "tank"), "boom", 0.5);
  // 1 turtle shell, cannons, 8 men cranking
  { const tTu = wt(1, "turtle"), tCa = wt(1, "cannons"), tE = wt(1, "eight");
    S2(1, { bg: "farm", keys: [[0, 540, 1350, 1.0, 0], [14, 540, 1350, 1.08, 0]], draw: (g, t) => { tank(g, 540, 1700, 1.4, t); if (t > tCa - 0.1) for (let i = 0; i < 5; i++) { const q = ((t - tCa) * 1.5 + i / 5) % 1; const a = Math.PI + (i + 1) / 6 * Math.PI; g.save(); g.globalAlpha = 1 - q; ell(g, 540 + Math.cos(a) * (440 + q * 200), 1700 + Math.sin(a) * (300 + q * 140), 40 + q * 50, 40 + q * 50, "#e9e4dc", 0); g.restore(); } if (t > tE - 0.1) { rect(g, 300, 900, 480, 160, "#fff6e6", 7, 14); strokeText(g, "8 MEN CRANKING", 540, 985, 52, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tTu, "A GIANT WOODEN TURTLE", "label"], ["metal", "+ METAL PLATES", "label"], [tCa, "CANNONS IN EVERY DIRECTION", "stamp", { size: 80 }]] });
    ev(tCa, "cannon"); ev(tCa + 0.5, "cannon", 0.6); ev(tE, "creak"); }
  // 2 gears turning opposite ways → jammed
  { const tO = wt(2, "opposite"), tJ = wt(2, "jammed");
    S2(2, { bg: "library", draw: (g, t) => { rect(g, 120, 900, 840, 700, PAPER, 6, 10); tank(g, 540, 1350, 1.2, t, true, t > tO - 0.2); if (t > tO - 0.2) { strokeText(g, "↻", 310, 1530, 90, { fill: "#2f8a3a" }); strokeText(g, "↺", 770, 1530, 90, { fill: "#c0392b" }); } if (t > tJ - 0.1) shout(g, 540, 1720, "JAMMED!", 70, clamp((t - tJ) / 0.15), "#c0392b"); },
      titles: [[tO, "GEARS TURN OPPOSITE WAYS", "label", { size: 60 }], [tJ, "THE WHEELS WOULD JAM", "stamp", { size: 92 }]] });
    ev(tO, "creak"); ev(tJ, "crash", 0.5); }
  // 3 deliberate sabotage
  { const tD = wt(3, "deliberately"), tSt = wt(3, "stolen");
    S2(3, { bg: "library", blur: true, draw: (g, t) => { guy(g, LEO, { x: 320, y: 1840, h: 640, expr: t > tD ? "sly" : "calm", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); rect(g, 600, 1180, 340, 420, "#6b4024", 7, 12); rect(g, 620, 1200, 300, 380, PAPER, 0, 8); strokeText(g, "NOTES", 770, 1260, 40, { fill: SEP, lw: 0, shadow: false }); if (t > tSt - 0.2) { guy(g, { ...C.peasant(3), tunic: "#1c1422", helmet: "bandana", hatCol: "#1c1422" }, { x: 920, y: 1840, h: 520, dir: -1, expr: "sly", walk: t * 2, blink: 0, t }); } },
      titles: [[tD, "DELIBERATE SABOTAGE?", "stamp", { size: 96 }], [tSt, "IN CASE IT WAS STOLEN", "label"]] });
    ev(tD, "sting", 0.5); }
}
