// 055 — Napoleon Wasn't Actually Short
"use strict";
function buildShots() {
  const NAP = { tunic: "#1f2f6f", trim: "#e2b64b", helmet: "bicorne", hatCol: "#1c1422", hair: "#3a2a1a", cape: "#1c1422" };
  const GUARD = (i) => ({ tunic: "#1f2f6f", trim: "#f6f3ea", helmet: "busby", hatCol: "#1c1422", hair: "#3a2a1a" });
  const ruler = (g, x, y0, y1, marks) => { rect(g, x - 30, y1, 60, y0 - y1, "#f2c443", 5, 6); for (let k = 0; k <= 10; k++) line(g, [[x - 30, lerp(y0, y1, k / 10)], [x - (k % 5 ? 10 : 0), lerp(y0, y1, k / 10)]], 3); };
  const cartoon = (g, t) => { rect(g, 140, 860, 800, 760, "#f6ead0", 7, 10); guy(g, { ...NAP }, { x: 540, y: 1520, h: 260, expr: "angry", armR: [2.6, 0], blink: 0, t, shadow: false }); strokeText(g, "“LITTLE BONEY”", 540, 960, 54, { fill: "#8a3a2a", lw: 0, shadow: false, font: "Cinzel" }); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { if (t < wt(0, "propaganda") - 0.2) guy(g, NAP, { x: 540, y: 1840, h: 640, expr: "proud", blink: blinkAt(t, 1), t }); else cartoon(g, t); },
    titles: [["average", "NAPOLEON: AVERAGE HEIGHT", "stamp", { size: 86 }], ["propaganda", "“TINY”? BRITISH PROPAGANDA", "label", { fill: "#ffd0c0", size: 60 }]] });
  ev(wt(0, "average"), "boom", 0.4); ev(wt(0, "propaganda"), "laugh", 0.5);
  // 1 5'2" in French inches
  { const tY = wt(1, "1821"), tF = wt(1, "French"), tL = wt(1, "longer");
    S2(1, { bg: "victorianRoom", draw: (g, t) => { guy(g, NAP, { x: 380, y: 1840, h: 620, expr: "neutral", blink: blinkAt(t, 1), t }); ruler(g, 700, 1840, 1160); if (t > tF - 0.2) { rect(g, 760, 1100, 280, 200, "#fff6e6", 7, 14); strokeText(g, "5'2\"", 900, 1170, 60, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "FRENCH", 900, 1250, 40, { fill: "#2f4f9f", lw: 0, shadow: false }); } if (t > tL - 0.2) { rect(g, 160, 900, 600, 60, "#2f4f9f", 5, 8); rect(g, 160, 980, 520, 60, "#c0392b", 5, 8); strokeText(g, "FR INCH", 300, 935, 34, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, "EN INCH", 300, 1015, 34, { fill: "#fff", lw: 0, shadow: false }); } },
      titles: [[tY, "AT HIS DEATH, 1821", "label"], [tF, "5'2\" — IN FRENCH INCHES", "stamp", { size: 82 }], [tL, "FRENCH INCHES WERE LONGER", "label", { size: 60 }]] });
    ev(tF, "ding"); }
  // 2 converted: 5'6"–5'7", average
  { const tC = wt(2, "Converted"), tA = wt(2, "average");
    S2(2, { bg: "victorianRoom", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 160 + i * 220, y: 1840, h: 640, expr: "neutral", blink: blinkAt(t, i), t }); guy(g, NAP, { x: 860, y: 1840, h: 640, dir: -1, expr: "proud", blink: blinkAt(t, 5), t }); if (t > tA - 0.2) { line(g, [[60, 1200], [1020, 1200]], 6, "#ffe08a"); } },
      titles: [[tC, "IN MODERN TERMS: 5'6\"–5'7\"", "stamp", { size: 76 }], [tA, "TOTALLY AVERAGE", "label", { fill: "#ffe08a" }]] });
    ev(tA, "ding"); }
  // 3 surrounded by 6-foot Imperial Guard
  { const tG = wt(3, "Imperial"), tSi = wt(3, "6");
    S2(3, { bg: "palace", draw: (g, t) => { for (let i = 0; i < 4; i++) { const x = [130, 330, 750, 950][i]; guy(g, GUARD(i), { x, y: 1840, h: 820, dir: i < 2 ? 1 : -1, expr: "determined", hold: { r: "spear" }, blink: blinkAt(t, i), t }); } guy(g, NAP, { x: 540, y: 1840, h: 620, expr: "nervous", blink: blinkAt(t, 5), t }); },
      titles: [["small", "HE ONLY LOOKED SMALL", "label"], [tG, "BESIDE HIS IMPERIAL GUARD", "stamp", { size: 82 }], [tSi, "ALL OVER 6 FEET", "label", { fill: "#ffe08a" }]] });
    ev(tG, "march"); ev(tSi, "boing", 0.6); }
}
