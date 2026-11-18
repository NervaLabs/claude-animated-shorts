// 056 — Why Victorian Portraits Never Show People Smiling
"use strict";
function buildShots() {
  const camera = (g, x, y, s) => { line(g, [[x - 80 * s, y], [x - 120 * s, y + 420 * s]], 8); line(g, [[x + 80 * s, y], [x + 120 * s, y + 420 * s]], 8); line(g, [[x, y], [x, y + 420 * s]], 8); rect(g, x - 130 * s, y - 180 * s, 260 * s, 180 * s, "#6b4024", 6, 8); rect(g, x - 160 * s, y - 130 * s, 50 * s, 90 * s, "#2a2a32", 5, 6); ell(g, x - 160 * s, y - 85 * s, 30 * s, 40 * s, "#5a6a8a", 5); g.save(); g.globalAlpha = 0.9; rect(g, x - 120 * s, y - 260 * s, 300 * s, 90 * s, "#1c1422", 5, 10); g.restore(); };
  const PAIR = [{ ...C.gent(0), beard: "#5a3a24" }, { ...C.lady(1) }];
  const sitters = (g, t, expr, blur = 0) => { for (let i = 0; i < 2; i++) { if (blur) { g.save(); g.globalAlpha = 0.35; guy(g, PAIR[i], { x: 360 + i * 300 + 14, y: 1840, h: 600, expr, blink: 0, t, shadow: false }); g.restore(); } guy(g, PAIR[i], { x: 360 + i * 300, y: 1840, h: 600, expr, blink: 0, t }); } };
  const sepia = (k) => (g) => { g.globalCompositeOperation = "color"; g.fillStyle = `rgba(150,110,70,${k})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
  // 0 hook
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => sitters(g, t, "neutral"), titles: [["miserable", "WHY SO MISERABLE?", "stamp", { size: 110 }], ["slow", "NOT JUST SLOW CAMERAS", "label"]] }, sepia(0.7));
  ev(wt(0, "miserable"), "sting", 0.5);
  // 1 1840s exposures: seconds → blur, but improved fast
  { const tE = wt(1, "1840s"), tB = wt(1, "blurring"), tI = wt(1, "improved");
    S2(1, { bg: "victorianRoom", draw: (g, t) => { if (t < tI - 0.2) { sitters(g, t, "happy", t > tB - 0.2 ? 1 : 0); rect(g, 760, 860, 260, 180, "#fff6e6", 7, 14); strokeText(g, Math.min(15, Math.floor((t - tE) * 3)) + "s", 890, 970, 80, { fill: "#1c1422", lw: 0, shadow: false }); } else { camera(g, 540, 1400, 1.4); sparkle(g, 300, 1100, 70, (t * 1.5) % 1); } },
      titles: [[tE, "1840s: EXPOSURES TOOK SECONDS", "label", { size: 56 }], [tB, "SMILES BLURRED", "stamp", { size: 110 }], [tI, "...BUT CAMERAS GOT FASTER", "label", { fill: "#ffe08a" }]] }, sepia(0.5));
    ev(tB, "whoosh"); ev(tI, "ding"); }
  // 2 the real reason: grins = drunk, mad, rude
  { const tR = wt(2, "real"), tD = wt(2, "drunkenness"), tM = wt(2, "madness"), tP = wt(2, "manners");
    S2(2, { bg: "victorianRoom", blur: true, draw: (g, t) => { guy(g, C.gent(2), { x: 540, y: 1840, h: 700, expr: "laugh", blink: blinkAt(t, 1), t }); const tags = [[tD, "DRUNK?", 230, 1100], [tM, "MAD?", 850, 1000], [tP, "RUDE?", 820, 1400]]; for (const [tt, s, x, y] of tags) if (t > tt - 0.1) { const k = clamp((t - tt) / 0.2); g.save(); g.translate(x, y); g.scale(k, k); rect(g, -140, -50, 280, 100, "#fff6e6", 6, 14); strokeText(g, s, 0, 4, 56, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tR, "THE REAL REASON: CULTURE", "stamp", { size: 86 }]] }, sepia(0.4));
    ev(tD, "pop"); ev(tM, "pop"); ev(tP, "pop"); }
  // 3 like an oil painting: serious = class
  { const tO = wt(3, "oil"), tD = wt(3, "dignified"), tC = wt(3, "class");
    S2(3, { bg: "victorianRoom", draw: (g, t) => { picFrame(g, 540, 1300, 560, 720, (g) => { rect(g, 140, 800, 800, 1000, "#6a5a4a", 0); guy(g, { ...C.gent(0), beard: "#5a3a24" }, { x: 540, y: 1660, h: 640, expr: "neutral", blink: 0, t, shadow: false }); }); if (t > tC - 0.1) for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.6) * 330, 1300 + Math.sin(i * 1.6) * 420, 30, (t * 0.7 + i / 4) % 1); },
      titles: [[tO, "LIKE AN OIL PAINTING", "label", { font: "Cinzel" }], [tD, "A SERIOUS FACE", "stamp", { size: 110 }], [tC, "= CLASS", "label", { fill: "#ffe08a" }]] }, sepia(0.6));
    ev(tD, "ding"); }
}
