// 073 — Why Early Bicycles Had Giant Front Wheels
"use strict";
function buildShots() {
  const RIDER = { ...C.gent(1), helmet: "bowler", hatCol: "#1c1422", hair: "#5a3a24" };
  const bike = (g, x, y, s, t, spin = 1) => { g.save(); g.translate(x, y); g.scale(s, s); const R = 300, r = 70; for (const [cx, cy, rr] of [[0, -R, R], [-360, -r, r]]) { g.save(); g.translate(cx, cy); g.rotate(t * spin * (cx ? 4 : 1)); g.beginPath(); g.arc(0, 0, rr, 0, TAU); g.lineWidth = 14; g.strokeStyle = INK; g.stroke(); for (let k = 0; k < 12; k++) line(g, [[0, 0], [Math.cos(k / 12 * TAU) * rr, Math.sin(k / 12 * TAU) * rr]], 3, "#5a5a66"); g.restore(); } g.beginPath(); g.moveTo(0, -R); g.quadraticCurveTo(-120, -R * 2 - 20, -360, -r); g.lineWidth = 14; g.strokeStyle = "#3a3a44"; g.stroke(); line(g, [[0, -R], [10, -R * 2 - 30]], 12, "#3a3a44"); line(g, [[-60, -R * 2 - 30], [80, -R * 2 - 30]], 10, "#3a3a44"); rect(g, -100, -R * 2 - 12, 90, 26, "#6b4024", 4, 10); const pa = t * spin; for (const sd of [0, Math.PI]) { line(g, [[0, -R], [Math.cos(pa + sd) * 70, -R + Math.sin(pa + sd) * 70]], 8, "#5a5a66"); } g.restore(); };
  // 0 hook
  S2(0, { bg: "street", blur: true, draw: (g, t) => { bike(g, 640, 1840, 1.3, t, 0.6); guy(g, RIDER, { x: 570, y: 1060, h: 380, expr: "proud", t, shadow: false }); },
    titles: [["penny-farthing", "THE PENNY-FARTHING", "stamp", { size: 100 }], ["5-foot", "A 5-FOOT FRONT WHEEL", "label"], ["gears", "NO GEARS YET", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "penny-farthing"), "ding");
  // 1 pedals on the axle: 1 turn = 1 rotation
  { const tP = wt(1, "pedals"), tO = wt(1, "one");
    S2(1, { bg: "street", keys: [[0, 540, 1300, 1.0, 0], [12, 600, 1400, 1.2, 0]], draw: (g, t) => { bike(g, 640, 1840, 1.3, t, 1.2); if (t > tP - 0.1) { ell(g, 640, 1450, 60, 60, "rgba(255,224,138,0.5)", 0); } if (t > tO - 0.1) { rect(g, 80, 900, 460, 180, "#fff6e6", 7, 14); strokeText(g, "1 PEDAL TURN", 310, 970, 44, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "= 1 WHEEL TURN", 310, 1040, 44, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [["1870s", "THE 1870s", "label"], [tP, "PEDALS BOLTED TO THE AXLE", "stamp", { size: 82 }]] });
    ev(tP, "clank"); }
  // 2 bigger wheel = faster
  { const tH = wt(2, "huge"), tF = wt(2, "faster");
    S2(2, { bg: "street", draw: (g, t) => { const sp = t > tF ? 900 : 300; g.save(); g.translate(-((t * sp) % 400), 0); for (let i = 0; i < 6; i++) line(g, [[i * 400, 1860], [i * 400 + 200, 1860]], 6, "#fff"); g.restore(); bike(g, 640, 1840, 1.3, t, t > tF ? 3 : 1); guy(g, RIDER, { x: 570, y: 1060, h: 380, expr: t > tF ? "laugh" : "happy", t, shadow: false }); if (t > tF) speedLines(g, t, 20); },
      titles: [[tH, "BIGGER WHEEL...", "label"], [tF, "= MORE SPEED", "stamp", { size: 120 }]] });
    ev(tF, "whoosh"); }
  // 3 the catch?
  { S2(3, { bg: "street", blur: true, draw: (g, t) => { bike(g, 640, 1840, 1.3, 0, 0); guy(g, RIDER, { x: 570, y: 1060, h: 380, expr: "nervous", t, shadow: false }); }, titles: [["catch", "THE CATCH?", "stamp", { size: 130 }]] });
    ev(wt(3, "catch"), "sting", 0.5); }
  // 4 a pebble → "taking a header"
  { const tPe = wt(4, "pebble"), tL = wt(4, "launched"), tHd = wt(4, "header");
    S2(4, { bg: "street", draw: (g, t) => { const k = clamp((t - tL) / 0.8); g.save(); g.translate(640, 1840); g.rotate(k * 0.4); bike(g, 0, 0, 1.3, k > 0 ? 0 : t, 1); g.restore(); if (t > tPe - 0.2) ell(g, 650, 1830, 24, 16, "#8a8a96", 4); const rx = lerp(570, 980, k), ry = lerp(1060, 1600, k) - Math.sin(k * Math.PI) * 300; g.save(); g.translate(rx, ry); g.rotate(k * 3); guy(g, RIDER, { x: 0, y: 0, h: 380, expr: k > 0 ? "shock" : "happy", armR: k > 0 ? [2.8, 0.3] : undefined, armL: k > 0 ? [-2.8, -0.3] : undefined, t, shadow: false }); g.restore(); },
      titles: [[tPe, "ONE PEBBLE...", "label"], [tL, "HEADFIRST OVER THE BARS", "label", { fill: "#ffd0c0" }], [tHd, "“TAKING A HEADER”", "stamp", { size: 110 }]] });
    ev(tPe, "pop"); ev(tL, "whoosh"); ev(tL + 0.8, "crash", 0.5); }
}
