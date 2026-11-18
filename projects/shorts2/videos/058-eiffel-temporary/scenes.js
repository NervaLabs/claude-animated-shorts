// 058 — How the Eiffel Tower Was Supposed to Be Torn Down
"use strict";
function buildShots() {
  const GUS = { ...C.gent(1), beard: "#8a8a8a", hair: "#8a8a8a", tunic: "#2a2a3a", helmet: "tophat", hatCol: "#1c1422" };
  const ART = (i) => ({ ...C.artist, tunic: ["#7a3a2a", "#3a5a3a", "#5a3a5a"][i % 3], helmet: "beret", hatCol: ["#1c1422", "#c0392b", "#2f4f9f"][i % 3] });
  const scene = (g, k = 1) => { parisSky(g, -300, 1400, 1840); eiffel(g, 540, 1840, 1300, "#8a6a4a", k); };
  // 0 hook: 20-year expiration
  S2(0, { bg: "town", blur: true, draw: (g, t) => { scene(g); rect(g, 640, 1500, 380, 200, "#fff6e6", 7, 14); strokeText(g, "EXPIRES:", 830, 1570, 40, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "20 YEARS", 830, 1650, 56, { fill: "#c0392b", lw: 0, shadow: false }); },
    titles: [["Eiffel", "THE EIFFEL TOWER", "stamp", { size: 110 }], ["expiration", "HAD AN EXPIRATION DATE", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "expiration"), "sting", 0.5);
  // 1 1889 World's Fair entrance arch; artists hate it
  { const tT = wt(1, "temporary"), tY = wt(1, "1889"), tH = wt(1, "hated"), tS = wt(1, "smokestack");
    S2(1, { bg: "town", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.06, 0]], draw: (g, t) => { scene(g, clamp(0.3 + (t - S(1)) / 4)); if (t > tH - 0.2) for (let i = 0; i < 3; i++) guy(g, ART(i), { x: 200 + i * 340, y: 1860, h: 520, expr: "angry", armR: [2.6, 0.2], mouthOpen: talk(t + i), blink: 0, t }); },
      titles: [[tT, "A TEMPORARY ENTRANCE ARCH", "label"], [tY, "1889 WORLD'S FAIR", "stamp", { size: 100 }], [tH, "ARTISTS HATED IT", "label", { fill: "#ffd0c0" }], [tS, "“A GIGANTIC BLACK SMOKESTACK”", "label", { size: 54 }]] });
    ev(tY, "boom", 0.5); ev(tH, "grumble"); }
  // 2 scrap in 1909
  { const tY = wt(2, "1909");
    S2(2, { bg: "town", draw: (g, t) => { scene(g); if (t > tY - 0.2) { const k = clamp((t - tY + 0.2) / 0.3); g.save(); g.translate(540, 1300); g.rotate(-0.15); g.scale(k, k); rect(g, -300, -90, 600, 180, "rgba(255,246,230,0.95)", 8, 12); strokeText(g, "SCRAP: 1909", 0, 20, 80, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); } },
      titles: [["scrap", "THE PLAN: SCRAP IT", "label"], [tY, "IN 1909", "stamp", { size: 140 }]] });
    ev(tY, "clank"); }
  // 3 weather station + radio antenna → WWI → kept forever
  { const tG = wt(3, "Gustave"), tW = wt(3, "weather"), tR = wt(3, "radio"), tWW = wt(3, "War"), tF = wt(3, "forever");
    S2(3, { bg: "town", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1150, 1.15, 0]], draw: (g, t) => { scene(g); if (t < tW - 0.2) guy(g, GUS, { x: 840, y: 1860, h: 560, dir: -1, expr: "determined", blink: blinkAt(t, 1), t }); if (t > tW - 0.2) { rect(g, 500, 520, 80, 60, "#f6f3ea", 4, 6); line(g, [[540, 520], [540, 470]], 4); ell(g, 560, 466, 20, 8, "#9a9aa8", 3); } if (t > tR - 0.2) { line(g, [[540, 540], [540, 380]], 8); for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; g.beginPath(); g.arc(540, 380, 40 + q * 260, -2.4, -0.7); g.lineWidth = 8; g.strokeStyle = "#ffe08a"; g.stroke(); g.restore(); } } if (t > tF - 0.2) for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 300, 900 + Math.sin(i * 2) * 400, 34, (t * 0.7 + i / 6) % 1); },
      titles: [[tG, "GUSTAVE EIFFEL'S PLAN", "label", { font: "Cinzel" }], [tW, "A WEATHER STATION", "label"], [tR, "+ A RADIO ANTENNA", "stamp", { size: 100 }], [tWW, "VITAL IN WORLD WAR I", "label", { fill: "#ffe08a" }], [tF, "KEPT FOREVER", "stamp", { size: 120 }]] });
    ev(tR, "ding"); ev(tWW, "drums"); ev(tF, "choir", 0.5); }
}
