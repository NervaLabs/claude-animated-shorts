// 015 — How an Ancient Greek Measured the Earth With a Stick
"use strict";
function buildShots() {
  const ERA = { ...C.greek(0), tunic: "#3e78c2", beard: "#9a9a9a", hair: "#9a9a9a" };
  const stick = (g, x, y, h, shadowLen = 0) => { if (shadowLen) poly(g, [[x, y], [x + shadowLen, y + 6], [x + shadowLen, y - 6]], "rgba(40,30,50,0.55)", 0); line(g, [[x, y], [x, y - h]], 10, "#6b4024"); };
  // 0 hook
  S2(0, { bg: "desert", blur: true, draw: (g, t) => { guy(g, ERA, { x: 320, y: 1840, h: 600, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); stick(g, 680, 1800, 380, 120); if (t > wt(0, "circumference") - 0.2) { ell(g, 820, 1100, 160, 160, "#3f86c8", 6); ell(g, 780, 1060, 60, 44, "#6f9a4a", 0); ell(g, 860, 1150, 50, 40, "#6f9a4a", 0); } },
    titles: [["librarian", "A GREEK LIBRARIAN", "label"], ["circumference", "MEASURED THE EARTH", "stamp", { size: 96 }], ["stick", "...WITH A STICK", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "circumference"), "boom", 0.5);
  // 1 Syene: sun straight down a well
  { const tY = wt(1, "240"), tE = wt(1, "Eratosthenes"), tW = wt(1, "well");
    S2(1, { bg: "desert", draw: (g, t) => { well(g, 540, 1760, 260); if (t > tW - 0.2) { g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = "rgba(255,240,180,0.45)"; g.fillRect(470, 300, 140, 1460); g.restore(); } guy(g, ERA, { x: 220, y: 1840, h: 540, expr: t > tW ? "shock" : "neutral", look: 1, blink: blinkAt(t, 1), t }); },
      titles: [[tY, "~240 BC", "stamp", { size: 140 }], [tE, "ERATOSTHENES", "label", { font: "Cinzel" }], ["noon", "SOUTHERN EGYPT, SOLSTICE NOON", "label", { size: 54 }], [tW, "NO SHADOW IN THE WELL", "stamp", { size: 80 }]] });
    ev(tW, "ding"); }
  // 2 Alexandria: a 7.2° shadow
  { const tA = wt(2, "Alexandria"), tSh = wt(2, "7.2-degree");
    S2(2, { bg: "nile", draw: (g, t) => { stick(g, 540, 1800, 420, t > tSh - 0.3 ? 120 : 0); if (t > tSh - 0.3) { g.beginPath(); g.moveTo(540, 1380); g.lineTo(660, 1800); g.lineWidth = 4; g.setLineDash([12, 10]); g.strokeStyle = "#ffe08a"; g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(540, 1380, 120, Math.PI / 2 - 0.27, Math.PI / 2); g.lineWidth = 5; g.stroke(); strokeText(g, "7.2°", 600, 1560, 50, { fill: "#ffe08a" }); } guy(g, ERA, { x: 220, y: 1840, h: 540, expr: "determined", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); },
      titles: [[tA, "ALEXANDRIA, TO THE NORTH", "label", { font: "Cinzel", size: 58 }], [tSh, "A 7.2° SHADOW", "stamp", { size: 110 }]] });
    ev(tSh, "pop"); }
  // 3 1/50 of a circle → ×50 → within ~1%
  { const tF = wt(3, "one-fiftieth"), tM = wt(3, "multiplied"), tN = wt(3, "nailing"), tP = wt(3, "percent");
    S2(3, { bg: "dark", draw: (g, t) => { ell(g, 540, 1150, 360, 360, "#3f86c8", 8); ell(g, 460, 1060, 130, 90, "#6f9a4a", 0); ell(g, 640, 1250, 110, 90, "#6f9a4a", 0); const k = clamp((t - tF) / 1); g.beginPath(); g.moveTo(540, 1150); g.arc(540, 1150, 360, -Math.PI / 2, -Math.PI / 2 + (TAU / 50) * (t > tM ? 1 + clamp((t - tM) / 2.5) * 49 : k)); g.closePath(); g.save(); g.globalAlpha = 0.45; g.fillStyle = "#ffe08a"; g.fill(); g.restore(); if (t > tM) strokeText(g, `× ${Math.min(50, 1 + Math.floor((t - tM) * 20))}`, 540, 1640, 80, { fill: "#ffe08a" }); },
      titles: [[tF, "7.2° = 1/50 OF A CIRCLE", "label", { fill: "#ffe08a" }], [tM, "DISTANCE × 50", "stamp", { size: 110 }], [tN, "EARTH'S CIRCUMFERENCE", "label"], [tP, "~1% ACCURATE", "stamp", { size: 110 }]] });
    ev(tF, "pop"); ev(tM, "whoosh"); ev(tP, "choir", 0.6); }
}
