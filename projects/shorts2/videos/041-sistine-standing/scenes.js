// 041 — How Michelangelo Painted the Sistine Chapel Standing Up
"use strict";
function buildShots() {
  const MIC = { ...C.artist, tunic: "#6a5a4a", trim: "#3a2a1a", hair: "#2a1a14", beard: "#2a1a14", helmet: null };
  const ceiling = (g) => { rect(g, -400, -300, 1900, 1200, "#e9d9b0", 0); for (let i = 0; i < 4; i++) { rect(g, -260 + i * 420, 600, 360, 240, ["#c9a07a", "#9ab0c8", "#c98a7a", "#a0b88a"][i], 6, 8); ell(g, -80 + i * 420, 720, 50, 40, "#e9c49a", 4); guy(g, { tunic: ["#c0392b", "#2f4f9f", "#e2b64b", "#3a8a3a"][i], robe: true }, { x: -180 + i * 420, y: 830, h: 180, expr: "calm", blink: 0, t: 0, shadow: false }); } rect(g, -400, 880, 1900, 30, "#9a8a6a", 0); };
  const scaff = (g) => { for (let i = 0; i < 4; i++) line(g, [[-100 + i * 380, 910], [-100 + i * 380, 2100]], 18, "#8a5a32"); rect(g, -300, 1500, 1700, 40, "#8a5a32", 6, 4); for (let i = 0; i < 3; i++) line(g, [[-100 + i * 380, 1540], [280 + i * 380, 2000]], 10, "#6b4024"); };
  // 0 hook: the lying-down myth
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { ceiling(g); scaff(g); g.save(); g.translate(770, 1440); g.rotate(-Math.PI / 2); guy(g, MIC, { x: 0, y: 0, h: 460, expr: "neutral", armR: [Math.PI, 0], blink: blinkAt(t, 1), t, shadow: false }); g.restore(); if (t > wt(0, "back") - 0.1) { line(g, [[300, 1150], [780, 1550]], 26, "#c0392b"); line(g, [[780, 1150], [300, 1550]], 26, "#c0392b"); } },
    titles: [["Sistine", "THE SISTINE CHAPEL", "label", { font: "Cinzel" }], ["back", "NOT LYING ON HIS BACK", "stamp", { size: 90 }]] });
  ev(wt(0, "back"), "boing");
  // 1 Hollywood myth
  { const tH = wt(1, "Hollywood");
    S2(1, { bg: "dark", draw: (g, t) => { rect(g, 160, 860, 760, 520, "#1c1422", 10, 18); rect(g, 190, 890, 700, 460, "#3a3a5a", 0, 10); g.save(); g.translate(540, 1150); g.rotate(-Math.PI / 2); guy(g, MIC, { x: 0, y: 0, h: 300, expr: "happy", armR: [Math.PI, 0], blink: 0, t, shadow: false }); g.restore(); for (let i = 0; i < 6; i++) ell(g, 160 + i * 150, 1560, 70, 90, "#2a2a3a", 0); },
      titles: [["myth", "A POPULAR MYTH", "stamp", { size: 110 }], [tH, "FROM HOLLYWOOD", "label", { fill: "#ffe08a" }]] });
    ev(tH, "sting", 0.5); }
  // 2 scaffolding, standing, head back, 4 years
  { const tSc = wt(2, "scaffolding"), tSt = wt(2, "standing"), tF = wt(2, "four");
    S2(2, { bg: "palace", keys: [[0, 540, 1300, 0.95, 0], [16, 540, 1250, 1.05, 0]], draw: (g, t) => { ceiling(g); if (t > tSc - 0.2) scaff(g); if (t > tSt - 0.2) { guy(g, MIC, { x: 540, y: 1500, h: 600, expr: "determined", headTilt: -20, armR: [Math.PI - 0.2 + Math.sin(t * 6) * 0.15, 0], blink: blinkAt(t, 1), t, shadow: false }); line(g, [[700, 920], [720, 1000]], 8, "#6b4024"); } if (t > tF - 0.2) { rect(g, 700, 1300, 300, 200, "#fff6e6", 7, 14); strokeText(g, "4 YEARS", 850, 1410, 60, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tSc, "HIS OWN SCAFFOLDING", "label"], [tSt, "PAINTING STANDING UP", "stamp", { size: 96 }], [tF, "HEAD TILTED BACK FOR 4 YEARS", "label", { size: 56 }]] });
    ev(tSc, "build"); ev(tF, "boom", 0.4); }
  // 3 paint drips, strained neck & eyes
  { const tD = wt(3, "dripped"), tN = wt(3, "neck");
    S2(3, { bg: "palace", blur: true, keys: [[0, 540, 1200, 1.15, 0], [6, 540, 1150, 1.25, 0]], draw: (g, t) => { ceiling(g); guy(g, MIC, { x: 540, y: 1900, h: 900, expr: t > tN ? "sick" : "tired", headTilt: -24, armR: [Math.PI - 0.2, 0], blink: 0, t, shadow: false }); if (t > tD - 0.2) for (let i = 0; i < 4; i++) { const q = ((t - tD) * 1.2 + i / 4) % 1; ell(g, 470 + i * 45, 900 + q * 200, 10, 16, ["#c9a07a", "#9ab0c8", "#c98a7a"][i % 3], 2); } },
      titles: [[tD, "PAINT DRIPPED ON HIS FACE", "label"], [tN, "NECK & EYES STRAINED", "stamp", { size: 92 }]] });
    ev(tD, "splat", 0.6); ev(tN, "grumble"); }
  // 4 the complaint poem
  { const tP = wt(4, "poem"), tH = wt(4, "heaven"), tBo = wt(4, "bow");
    S2(4, { bg: "library", blur: true, draw: (g, t) => { guy(g, MIC, { x: 300, y: 1840, h: 620, expr: "angry", armR: [1.4, -0.6], blink: blinkAt(t, 1), t }); scroll(g, 760, 1280, 380, 560, "", 0, 0.03); if (t > tP - 0.1) { strokeText(g, "My beard", 760, 1140, 40, { fill: "#5a3a24", lw: 0, shadow: false, font: "Cinzel" }); } if (t > tH - 0.1) strokeText(g, "→ heaven", 760, 1220, 40, { fill: "#5a3a24", lw: 0, shadow: false, font: "Cinzel" }); if (t > tBo - 0.1) strokeText(g, "my spine: a bow", 760, 1320, 36, { fill: "#5a3a24", lw: 0, shadow: false, font: "Cinzel" }); },
      titles: [[tP, "HE WROTE A COMPLAINT POEM", "label"], [tH, "“BEARD TOWARD HEAVEN”", "label", { fill: "#ffe08a" }], [tBo, "“SPINE BENT LIKE A BOW”", "stamp", { size: 80 }]] });
    ev(tP, "pop"); ev(tBo, "laugh", 0.5); }
}
