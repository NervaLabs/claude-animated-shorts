// 097 — The Spanish Flu Got Its Name Because Spain Wasn't Censoring News
"use strict";
function buildShots() {
  const ALF = { ...C.king, tunic: "#7a1a2a", hair: "#3a2a1a", beard: null, cape: "#c9a35a" };
  const paper = (g, x, y, w, h, head, censored, rot = 0) => { newspaper(g, x, y, w, h, head, rot); if (censored) { g.save(); g.translate(x, y); g.rotate(rot); for (let i = 0; i < 3; i++) rect(g, -w * 0.38, -h * 0.05 + i * h * 0.16, w * 0.76, h * 0.1, "#1c1422", 0); g.restore(); } };
  // 0 hook
  S2(0, { bg: "street", blur: true, draw: (g, t) => { paper(g, 540, 1300, 520, 640, "“SPANISH” FLU", false, -0.05); if (t > wt(0, "Spain") - 0.2) { line(g, [[300, 1100], [780, 1500]], 22, "#c0392b"); } },
    titles: [["1918", "THE 1918 “SPANISH FLU”", "label"], ["Spain", "DIDN'T START IN SPAIN", "stamp", { size: 96 }]] });
  ev(wt(0, "Spain"), "sting", 0.5);
  // 1 wartime censorship
  { const tW = wt(1, "World"), tC = wt(1, "censored"), tM = wt(1, "morale");
    S2(1, { bg: "street", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 1.06, 0]], draw: (g, t) => { for (let i = 0; i < 4; i++) paper(g, 180 + i * 240, 1300 + (i % 2) * 80, 220, 300, ["US", "UK", "FR", "DE"][i], t > tC - 0.2, (i - 1.5) * 0.06); if (t > tC - 0.2) for (let i = 0; i < 4; i++) { g.save(); g.translate(180 + i * 240, 1100); g.rotate(-0.2); rect(g, -90, -30, 180, 60, "rgba(192,57,43,0.9)", 4, 6); strokeText(g, "CENSORED", 0, 4, 28, { fill: "#fff", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tW, "DURING WORLD WAR I", "label"], [tC, "NEWSPAPERS CENSORED", "stamp", { size: 96 }], [tM, "TO PROTECT MORALE", "label"]] });
    ev(tC, "clank"); }
  // 2 neutral Spain, free press; even the king fell ill
  { const tN = wt(2, "neutral"), tF = wt(2, "free"), tK = wt(2, "Alfonso");
    S2(2, { bg: "palace", draw: (g, t) => { if (t < tK - 0.2) { paper(g, 540, 1300, 520, 640, "EPIDEMIA", false, 0.04); } else { rect(g, 200, 1500, 680, 80, "#f6f3ea", 6, 10); rect(g, 200, 1580, 680, 260, "#8a5a32", 6); guy(g, ALF, { x: 540, y: 1500, h: 400, sit: true, expr: "sick", hideArms: true, t, shadow: false }); paper(g, 860, 1200, 200, 260, "EL REY", false, 0.1); } },
      titles: [[tN, "SPAIN STAYED NEUTRAL", "label"], [tF, "A FREE PRESS", "stamp", { size: 110 }], [tK, "EVEN KING ALFONSO XIII FELL ILL", "label", { size: 56 }]] });
    ev(tF, "ding"); ev(tK, "gasp"); }
  // 3 the world unfairly named it after Spain
  { const tR = wt(3, "read"), tU = wt(3, "unfairly");
    S2(3, { bg: "street", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, C.gent(i), { x: 160 + i * 250, y: 1840, h: 520, expr: "shock", armR: [1.2, -0.8], armL: [-1.2, 0.8], blink: blinkAt(t, i), t }); for (let i = 0; i < 4; i++) newspaper(g, 160 + i * 250, 1560, 170, 130, "SPAIN", 0.05 * (i - 1.5)); },
      titles: [[tR, "EVERYONE READ SPANISH PAPERS", "label", { size: 58 }], [tU, "AN UNFAIR NAME", "stamp", { size: 110 }]] });
    ev(tU, "sadtrombone", 0.6); }
}
