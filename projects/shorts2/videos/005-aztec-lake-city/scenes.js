// 005 — How the Aztecs Built a City on a Lake
"use strict";
function buildShots() {
  const city = (g, t, k) => { // Tenochtitlan rising on the lake; k = 0..1 growth
    smoothPath(g, [[0, 1400], [1080, 1400], [1140, 1480], [-60, 1480]]); fillInk(g, "#c9b07a", 6);
    if (k > 0.3) { g.save(); g.translate(540, 1400); g.scale(1, easeBack(clamp((k - 0.3) / 0.4))); stepTemple(g, 0, 0, 240); g.restore(); }
    for (let i = 0; i < 8; i++) { const q = clamp(k * 2 - i * 0.1); if (q <= 0) continue; g.save(); g.translate(60 + i * 140 - (i > 3 ? -100 : 0), 1400); g.scale(1, easeBack(q)); rect(g, -50, -90, 100, 90, "#e9dcc0", 4); poly(g, [[-56, -90], [0, -130], [56, -90]], "#c9a06a", 4); g.restore(); }
  };
  const chinampa = (g, x, y, s, t) => { rect(g, x - 120 * s, y - 20 * s, 240 * s, 40 * s, "#7a8a3a", 5, 8); for (let i = 0; i < 6; i++) ell(g, x - 100 * s + i * 40 * s, y - 30 * s, 16 * s, 22 * s, ["#5f9a48", "#e2453c", "#f2c443"][i % 3], 3); line(g, [[x - 110 * s, y - 20 * s], [x - 110 * s, y - 120 * s]], 6 * s, "#6b4024"); ell(g, x - 110 * s, y - 140 * s, 30 * s, 40 * s, "#4f8a3f", 3); };
  // 0 hook
  S2(0, { bg: "lake", keys: [[0, 540, 1200, 0.9, 0], [6, 540, 1150, 0.82, 0]], draw: (g, t) => { waves(g, 1250, t, -900, 2000, "#4ea3c9", 8); city(g, t, 1); },
    titles: [["island", "AN ISLAND METROPOLIS", "label"], ["London", "BIGGER THAN LONDON", "stamp", { size: 100 }]] });
  ev(wt(0, "London"), "boom", 0.5);
  // 1 driven onto a swampy island
  { const tD = wt(1, "driven"), tL = wt(1, "Lake");
    S2(1, { bg: "lake", draw: (g, t) => { waves(g, 1250, t, -900, 2000, "#4ea3c9", 8); smoothPath(g, [[200, 1420], [880, 1420], [940, 1500], [140, 1500]]); fillInk(g, "#8a8a5a", 6); for (let i = 0; i < 8; i++) line(g, [[240 + i * 80, 1420], [250 + i * 80, 1340]], 5, "#5f7a3a"); for (let i = 0; i < 4; i++) guy(g, C.aztec(i), { x: lerp(-200, 300 + i * 140, clamp((t - tD) / 1.5)), y: 1420, h: 300, expr: "sad", walk: t < tD + 1.5 ? t * 2 : null, blink: blinkAt(t, i), t, shadow: false }); },
      titles: [["central", "CENTRAL MEXICO", "label", { font: "Cinzel" }], [tD, "PUSHED ONTO A SWAMP", "stamp", { size: 90 }], [tL, "LAKE TEXCOCO", "label", { font: "Cinzel", fill: "#cfe9ff" }]] });
    ev(tD, "sadtrombone", 0.4); }
  // 2 chinampas
  { const tC = wt(2, "chinampas"), tW = wt(2, "willow");
    S2(2, { bg: "lake", draw: (g, t) => { waves(g, 1250, t, -900, 2000, "#4ea3c9", 8); const n = 1 + Math.floor(clamp((t - tC) / 3) * 5); for (let i = 0; i < n; i++) chinampa(g, 160 + (i % 3) * 380, 1500 + Math.floor(i / 3) * 220, 1.2, t); guy(g, C.aztec(1), { x: 540, y: 1400, h: 300, expr: "determined", armR: [1.8, -0.6], blink: blinkAt(t, 1), t, shadow: false }); },
      titles: [["leaving", "INSTEAD OF LEAVING...", "label"], [tC, "CHINAMPAS", "stamp", { size: 120 }], ["floating", "FLOATING REED GARDENS", "label", { fill: "#d9f2a0" }], [tW, "ANCHORED BY WILLOWS", "label"]] });
    ev(tC, "build"); }
  // 3 causeways, aqueducts, canals
  { const tCa = wt(3, "causeways"), tA = wt(3, "aqueducts"), tCn = wt(3, "canals");
    S2(3, { bg: "lake", keys: [[0, 540, 1250, 0.85, 0], [8, 540, 1200, 0.78, 0]], draw: (g, t) => { waves(g, 1250, t, -900, 2000, "#4ea3c9", 8); city(g, t, 0.6 + clamp((t - S(3)) / 6) * 0.4); if (t > tCa) { const k = clamp((t - tCa) / 1.2); rect(g, -900, 1420, 900 * k, 40, "#c9b49a", 5); rect(g, 1080, 1420, 900 * k, 40, "#c9b49a", 5); } if (t > tA) { for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(-300 + i * 120, 1300, 50, Math.PI, 0); g.lineWidth = 16; g.strokeStyle = "#b9a48a"; g.stroke(); } } },
      titles: [["two", "OVER 2 CENTURIES", "label"], [tCa, "STONE CAUSEWAYS", "label", { fill: "#ffe08a" }], [tA, "AQUEDUCTS", "label", { fill: "#cfe9ff" }], [tCn, "CANALS", "label"]] });
    ev(tCa, "build"); ev(tA, "splash", 0.4); }
  // 4 1519: the Spanish arrive and can't believe it
  { const tY = wt(4, "1519"), tR = wt(4, "200,000"), tB = wt(4, "botanical"), tRu = wt(4, "running"), tD = wt(4, "dreaming");
    S2(4, { bg: "lake", keys: [[0, 540, 1250, 0.9, 0], [14, 540, 1200, 0.82, 0]], draw: (g, t) => { waves(g, 1250, t, -900, 2000, "#4ea3c9", 8); city(g, t, 1); for (let i = 0; i < 3; i++) guy(g, C.conquistador, { x: 100 + i * 150, y: 1820, h: 460, expr: t > tD - 0.3 ? "shock" : "neutral", look: 1, blink: blinkAt(t, i), t }); if (t > tD - 0.3) shout(g, 300, 1100, "...?!", 60, clamp((t - tD + 0.3) / 0.15), "#c0392b"); },
      titles: [[tY, "1519", "stamp", { size: 150 }], [tR, "200,000+ RESIDENTS", "label", { fill: "#ffe08a" }], [tB, "BOTANICAL GARDENS", "label", { fill: "#d9f2a0" }], [tRu, "RUNNING WATER", "label", { fill: "#cfe9ff" }], [tD, "“ARE WE DREAMING?”", "stamp", { size: 88 }]] });
    ev(tY, "boom", 0.5); ev(tD, "choir", 0.5); }
}
