// 027 — The Plague Doctor Mask Was a 17th-Century Hazmat Suit
"use strict";
function buildShots() {
  const DOC = { tunic: "#1f1a24", trim: "#3a3040", helmet: "plague", robe: true, cape: "#141018", skin: "#e9c49a" };
  const herb = (g, x, y, s, t) => { for (let i = 0; i < 5; i++) { const a = i * 1.26 + t * 0.4; ell(g, x + Math.cos(a) * 14 * s, y + Math.sin(a) * 14 * s, 9 * s, 9 * s, ["#e07aa8", "#f2c443", "#7ac06a", "#c98a5a", "#b48ae0"][i], 2); } };
  const cloud = (g, x, y, r, a) => { g.save(); g.globalAlpha = a; for (let i = 0; i < 5; i++) ell(g, x + (i - 2) * r * 0.6, y + Math.sin(i * 2) * r * 0.25, r * 0.6, r * 0.45, "#7a9a5a", 0); g.restore(); };
  // 0 hook
  S2(0, { bg: "town", blur: true, draw: (g, t) => { guy(g, DOC, { x: 540, y: 1840, h: 700, expr: "neutral", blink: blinkAt(t, 1), t }); fog(g, t, 0.35); },
    titles: [["plague", "THE PLAGUE DOCTOR", "stamp", { size: 110 }], ["wasn't", "NOT FROM THE BLACK DEATH?", "label", { fill: "#d0ffd0" }]] }, night(0.35));
  ev(wt(0, "plague"), "sting", 0.6);
  // 1 1619, Charles de Lorme
  { const tY = wt(1, "1619"), tC = wt(1, "Charles");
    S2(1, { bg: "victorianRoom", draw: (g, t) => { const k = clamp((t - tC) / 0.6); guy(g, { tunic: "#3a2a4a", trim: "#e2b64b", hair: "#3a2a1a", robe: true, beard: "#3a2a1a" }, { x: 320, y: 1840, h: 600, expr: "proud", armR: [2.2, -0.3], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); if (k > 0) { g.save(); g.globalAlpha = k; guy(g, DOC, { x: 780, y: 1840, h: 600, dir: -1, expr: "neutral", blink: 0, t }); g.restore(); } },
      titles: [[tY, "1619", "stamp", { size: 160 }], [tC, "DR. CHARLES DE LORME", "label", { font: "Cinzel" }], ["French", "FRENCH ROYAL PHYSICIAN", "label", { size: 54 }]] });
    ev(tY, "boom", 0.5); ev(tC, "whoosh"); }
  // 2 miasma
  { const tB = wt(2, "bad"), tM = wt(2, "miasma");
    S2(2, { bg: "town", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, C.peasant(i), { x: 220 + i * 320, y: 1840, h: 520, expr: t > tB ? "sick" : "neutral", blink: blinkAt(t, i), t }); if (t > tB - 0.2) for (let i = 0; i < 6; i++) cloud(g, ((t * 60 + i * 230) % 1300) - 100, 1200 + Math.sin(t + i) * 60 + (i % 2) * 120, 140, 0.5 * clamp((t - tB + 0.2) / 0.6)); },
      titles: [[tB, "“BAD AIR”", "stamp", { size: 130, fill: "#c8ffb0" }], [tM, "MIASMA THEORY", "label", { font: "Cinzel" }]] }, night(0.25));
    ev(tB, "drone"); ev(tM, "gasp", 0.5); }
  // 3 beak packed with herbs
  { const tL = wt(3, "leather"), tF = wt(3, "flowers"), tH = wt(3, "herbs"), tCa = wt(3, "camphor"), tSp = wt(3, "spices"), tFi = wt(3, "filter");
    S2(3, { bg: "victorianRoom", blur: true, keys: [[0, 540, 1250, 1.0, 0], [10, 600, 1200, 1.15, 0]], draw: (g, t) => {
      g.save(); g.translate(540, 1250); poly(g, [[-200, -120], [380, 60], [-200, 140]], "#d9c8a0", 8); line(g, [[-200, 10], [300, 50]], 4, "rgba(60,40,20,0.4)"); g.restore();
      const items = [[tF, 0], [tH, 1], [tCa, 2], [tSp, 3]]; for (const [tt, j] of items) if (t > tt - 0.1) { const q = clamp((t - tt) / 0.4); herb(g, lerp(160 + j * 200, 420 + j * 60, q), lerp(1700, 1250 + (j % 2) * 30, q), 2.2, t); }
      if (t > tFi - 0.1) for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 960 - q * 500, 1260 + i * 20, 40, 18, "#7a9a5a", 0); g.restore(); }
    }, titles: [[tL, "6-INCH LEATHER BEAK", "label"], [tF, "DRIED FLOWERS", "label", { fill: "#ffc0e0" }], [tH, "HERBS", "label", { fill: "#c8ffb0" }], [tCa, "CAMPHOR", "label"], [tSp, "SPICES", "label", { fill: "#ffe08a" }], [tFi, "AN AIR FILTER", "stamp", { size: 110 }]] });
    ev(tF, "pop"); ev(tH, "pop"); ev(tCa, "pop"); ev(tSp, "pop"); ev(tFi, "whoosh"); }
  // 4 full-body suit: coat, gloves, goggles → hazmat
  { const tW = wt(4, "wax-coated"), tG = wt(4, "gloves"), tGo = wt(4, "goggles"), tHz = wt(4, "hazmat");
    S2(4, { bg: "town", keys: [[0, 540, 1300, 1.0, 0], [9, 540, 1250, 1.12, 0]], draw: (g, t) => { guy(g, DOC, { x: 540, y: 1840, h: 700, expr: "neutral", blink: blinkAt(t, 1), t });
      const tag = (tt, x, y, tx, ty, s) => { if (t < tt - 0.1) return; const a = clamp((t - tt) / 0.25); g.save(); g.globalAlpha = a; line(g, [[x, y], [tx, ty]], 5, "#fff"); rect(g, tx - 130, ty - 40, 260, 80, "#fff6e6", 6, 12); strokeText(g, s, tx, ty + 2, 36, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); };
      tag(tW, 560, 1600, 880, 1500, "WAX COAT"); tag(tG, 420, 1520, 200, 1400, "GLOVES"); tag(tGo, 560, 1270, 860, 1120, "GOGGLES"); },
      titles: [[tHz, "HISTORY'S FIRST HAZMAT SUIT", "stamp", { size: 76 }]] }, night(0.2));
    ev(tW, "pop"); ev(tG, "pop"); ev(tGo, "pop"); ev(tHz, "sting", 0.6); }
}
