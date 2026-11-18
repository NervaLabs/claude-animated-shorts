// 099 — Why Early Movies Were Filmed in Hollywood Because of Patents
"use strict";
function buildShots() {
  const ED = { ...C.gent(2), tunic: "#2a2a3a", hair: "#d9d9d9", helmet: null };
  const LAW = (i) => ({ ...C.suit(i), tunic: "#1c1422", helmet: "bowler", hatCol: "#1c1422" });
  const DIR = (i) => ({ ...C.gent(i), tunic: ["#7a3a2a", "#3a5a3a", "#5a3a5a"][i % 3], helmet: "cap", hatCol: "#5a4a3a" });
  const cam = (g, x, y, s, t) => { line(g, [[x - 60 * s, y], [x - 90 * s, y + 260 * s]], 7); line(g, [[x + 60 * s, y], [x + 90 * s, y + 260 * s]], 7); rect(g, x - 90 * s, y - 120 * s, 180 * s, 120 * s, "#3a3a44", 6, 10); for (const ox of [-50, 50]) { g.save(); g.translate(x + ox * s, y - 170 * s); g.rotate(t * 3); ell(g, 0, 0, 50 * s, 50 * s, "#3a3a44", 5); line(g, [[-40 * s, 0], [40 * s, 0]], 4, "#8a8a92"); g.restore(); } rect(g, x + 90 * s, y - 90 * s, 50 * s, 60 * s, "#5a5a66", 5, 6); };
  // 0 hook: running from Edison
  S2(0, { bg: "canyon", blur: true, draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, DIR(i), { x: 900 - i * 220 - ((t * 120) % 200), y: 1840, h: 520, dir: -1, expr: "scared", walk: t * 2.4 + i, blink: 0, t }); cam(g, 260, 1500, 1.0, t); },
    titles: [["Hollywood", "WHY HOLLYWOOD?", "stamp", { size: 110 }], ["Edison", "TO ESCAPE THOMAS EDISON", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "Edison"), "whoosh");
  // 1 Edison's patents in NJ; lawsuits
  { const tP = wt(1, "patents"), tN = wt(1, "Jersey"), tS = wt(1, "sued");
    S2(1, { bg: "street", draw: (g, t) => { guy(g, ED, { x: 300, y: 1840, h: 620, expr: "sly", armR: [2.2, -0.4], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); if (t > tP - 0.2) { rect(g, 560, 980, 420, 280, "#fff6e6", 7, 14); strokeText(g, "PATENT", 770, 1060, 56, { fill: "#1c1422", lw: 0, shadow: false, font: "Cinzel" }); cam(g, 770, 1210, 0.4, t); } if (t > tS - 0.2) for (let i = 0; i < 2; i++) guy(g, LAW(i), { x: 640 + i * 200, y: 1840, h: 560, dir: -1, expr: "angry", hold: { r: "scroll" }, blink: blinkAt(t, i + 2), t }); },
      titles: [[tP, "EDISON'S CAMERA PATENTS", "label"], [tN, "NEW JERSEY", "stamp", { size: 110 }], [tS, "HE SUED THE INDEPENDENTS", "label", { fill: "#ffd0c0" }]] });
    ev(tP, "clank"); ev(tS, "grumble"); }
  // 2 fled to Southern California: sun + 3,000 miles + the border
  { const tF = wt(2, "fled"), tSu = wt(2, "sunshine"), tT = wt(2, "3,000"), tM = wt(2, "Mexican");
    S2(2, { bg: "canyon", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.05, 0]], draw: (g, t) => { if (t < tT - 0.2) { sunStar(g, 860, 700, 130, "#ffcf4a"); for (let i = 0; i < 3; i++) palm(g, 120 + i * 420, 1800, 420, 5, t); cam(g, 540, 1500, 1.1, t); guy(g, DIR(0), { x: 300, y: 1840, h: 560, expr: "happy", blink: blinkAt(t, 1), t }); } else { timeline(g, 150, 930, 1500, 0, 3000, [{ y: 0, label: "NEW JERSEY" }, { y: 3000, label: "HOLLYWOOD", up: true }], clamp((t - tT) / 1.5)); if (t > tM - 0.2) { rect(g, 300, 1700, 480, 140, "#fff6e6", 7, 14); strokeText(g, "BORDER NEARBY", 540, 1775, 48, { fill: "#1c1422", lw: 0, shadow: false }); } } },
      titles: [[tF, "THEY FLED WEST", "label"], [tSu, "YEAR-ROUND SUNSHINE", "label", { fill: "#ffe08a" }], [tT, "3,000 MILES FROM HIS LAWYERS", "stamp", { size: 76 }], [tM, "...AND AN ESCAPE ROUTE", "label"]] });
    ev(tF, "whoosh"); ev(tT, "ding"); ev(tM, "laugh", 0.5); }
}
