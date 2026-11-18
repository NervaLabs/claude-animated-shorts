// 016 — The Bronze Age Collapse That Wiped Out Civilizations
"use strict";
function buildShots() {
  const burnCity = (g, t, x, label, k) => { g.save(); g.translate(x, 0); for (let i = 0; i < 3; i++) house(g, -150 + i * 150, 1500, 120, 120 + (i % 2) * 40, "#e9dcc0", "#b9532f", 4); if (k > 0) for (let i = 0; i < 3; i++) flame(g, -150 + i * 150, 1400, 30 + k * 20, t + i); strokeText(g, label, 0, 1620, 36, { font: "Cinzel", fill: "#fff6dc" }); g.restore(); };
  // 0 hook
  S2(0, { bg: "desert", blur: true, draw: (g, t) => { for (let i = 0; i < 4; i++) burnCity(g, t, 150 + i * 260, "", clamp((t - 2 - i * 0.4) / 1)); },
    titles: [["every", "EVERY CIVILIZATION...", "label"], ["collapsed", "COLLAPSED AT ONCE", "stamp", { size: 96 }], ["1177", "~1177 BC", "stamp", { size: 120 }]] }, night(0.15));
  ev(wt(0, "collapsed"), "crash", 0.5); ev(wt(0, "1177"), "boom", 0.6);
  // 1 one generation: Mycenae, Hittites, Egypt, Levant
  { const tM = wt(1, "Mycenaean"), tH = wt(1, "Hittite"), tE = wt(1, "Egypt"), tL = wt(1, "Levant"), tF = wt(1, "flames");
    S2(1, { bg: "dark", draw: (g, t) => { [[tM, "MYCENAE"], [tH, "HITTITES"], [tE, "EGYPT"], [tL, "LEVANT"]].forEach(([tt, lab], i) => { if (t > tt - 0.1) burnCity(g, t, 160 + i * 250, lab, t > tF ? 1 : 0.3); }); },
      titles: [["single", "WITHIN ONE GENERATION", "label"], [tF, "UP IN FLAMES", "stamp", { size: 110 }]] }, night(0.1));
    ev(tF, "crash"); ev(tF, "rumble"); }
  // 2 trade vanished; Greece forgot how to write
  { const tT = wt(2, "Trade"), tA = wt(2, "abandoned"), tW = wt(2, "write"), tF = wt(2, "400");
    S2(2, { bg: "greekCity", blur: true, draw: (g, t) => { if (t < tW - 0.3) { sailShip(g, { x: lerp(540, 1500, clamp((t - tT) / 2)), y: 1500, h: 300, t, dir: 1, hull: "#8a5a32" }); } else { guy(g, C.greek(0), { x: 360, y: 1840, h: 580, expr: "shock", armR: [1.8, -0.8], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); rect(g, 560, 1100, 360, 300, "#f3e3bb", 6, 6); strokeText(g, "???", 740, 1250, 100, { fill: "#5a1e28", lw: 0, shadow: false }); } },
      titles: [[tT, "TRADE: GONE", "label", { fill: "#ffd0c0" }], [tA, "CITIES: ABANDONED", "label", { fill: "#ffd0c0" }], [tW, "GREECE FORGOT HOW TO WRITE", "stamp", { size: 74 }], [tF, "...FOR 400 YEARS", "label", { fill: "#ffe08a" }]] });
    ev(tT, "sadtrombone", 0.4); ev(tW, "boing"); }
  // 3 the perfect storm (droughts, quakes, famine, Sea Peoples)
  { const tD = wt(3, "mega-droughts"), tEq = wt(3, "earthquakes"), tFa = wt(3, "famine"), tS = wt(3, "Sea");
    S2(3, { bg: "beach", draw: (g, t) => { if (t > tS - 0.2) { for (let i = 0; i < 3; i++) sailShip(g, { x: 1100 - (t - tS) * 120 - i * 260, y: 1350 + i * 30, h: 260, t, dir: -1, hull: "#3a2a2a", sail: "#5a4a4a", seed: i }); } else { const icons = [[tD, "☀", "#ffb36b"], [tEq, "≋", "#c9b07a"], [tFa, "∅", "#ffd0c0"]]; icons.forEach(([tt, ch, col], i) => { if (t < tt - 0.1) return; g.save(); g.translate(240 + i * 300, 1100); g.scale(easeBack(clamp((t - tt + 0.1) / 0.3)), easeBack(clamp((t - tt + 0.1) / 0.3))); ell(g, 0, 0, 110, 110, "#2a2430", 7); strokeText(g, ch, 0, 0, 110, { font: "serif", fill: col, lw: 0, shadow: false }); g.restore(); }); } },
      titles: [["Late", "THE LATE BRONZE AGE COLLAPSE", "label", { font: "Cinzel", size: 56 }], [tD, "DROUGHTS", "label", { fill: "#ffb36b" }], [tEq, "EARTHQUAKES", "label"], [tFa, "FAMINE", "label", { fill: "#ffd0c0" }], [tS, "...AND THE “SEA PEOPLES”", "stamp", { size: 82 }]] }, night(0.15));
    ev(tEq, "rumble"); KICKS.push({ t: tEq, a: 12 }); ev(tS, "sting", 0.6); }
}
