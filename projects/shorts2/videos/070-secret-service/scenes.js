// 070 — Why Abraham Lincoln Created the Secret Service the Day He Was Shot (sober: no violence depicted)
"use strict";
function buildShots() {
  const ABE = { ...C.lincoln };
  const AGENT = (i) => ({ ...C.suit(i), tunic: "#1c1422", helmet: "bowler", hatCol: "#1c1422" });
  const cal = (g, x, y, s) => { rect(g, x - 170 * s, y - 150 * s, 340 * s, 300 * s, "#fff6e6", 7, 14); rect(g, x - 170 * s, y - 150 * s, 340 * s, 80 * s, "#c0392b", 7, 14); strokeText(g, "APRIL", x, y - 104 * s, 40 * s, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, "14", x, y + 40 * s, 120 * s, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "1865", x, y + 120 * s, 34 * s, { fill: "#6a6a72", lw: 0, shadow: false }); };
  const bill = (g, x, y, s, fake = false, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -150 * s, -66 * s, 300 * s, 132 * s, fake ? "#b8d0a0" : "#a8d08a", 5, 8); ell(g, 0, 0, 40 * s, 46 * s, "#7aa060", 3); strokeText(g, "$", -110 * s, -30 * s, 40 * s, { fill: "#3a6a2a", lw: 0, shadow: false }); if (fake) strokeText(g, "FAKE", 0, 14 * s, 50 * s, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); };
  // 0 hook: signed the day he was assassinated
  S2(0, { bg: "whiteHouse", blur: true, draw: (g, t) => { guy(g, ABE, { x: 320, y: 1840, h: 660, expr: "calm", armR: [1.4, -0.6], blink: blinkAt(t, 1), t }); scroll(g, 700, 1500, 260, 320, "SECRET SERVICE", 4, 0.03); if (t > wt(0, "April") - 0.2) cal(g, 760, 1000, 1.0); },
    titles: [["Secret", "HE CREATED THE SECRET SERVICE", "label", { size: 58 }], ["exact", "THE DAY HE WAS ASSASSINATED", "stamp", { size: 80 }]] });
  ev(wt(0, "April"), "drone");
  // 1 not to protect presidents
  { const tN = wt(1, "wasn't"), tP = wt(1, "protect");
    S2(1, { bg: "whiteHouse", draw: (g, t) => { guy(g, AGENT(0), { x: 540, y: 1840, h: 660, expr: "neutral", blink: blinkAt(t, 1), t }); if (t > tP - 0.1) { line(g, [[340, 1100], [740, 1600]], 26, "#c0392b"); line(g, [[740, 1100], [340, 1600]], 26, "#c0392b"); } },
      titles: [[tN, "EVEN STRANGER...", "label"], [tP, "NOT TO PROTECT PRESIDENTS", "stamp", { size: 82 }]] });
    ev(tP, "boing"); }
  // 2 a third of all currency was fake
  { const tC = wt(2, "Civil"), tT = wt(2, "one-third"), tCo = wt(2, "counterfeit");
    S2(2, { bg: "americanTown", keys: [[0, 540, 1300, 1.0, 0], [10, 540, 1300, 1.1, 0]], draw: (g, t) => { for (let i = 0; i < 9; i++) bill(g, 220 + (i % 3) * 320, 1100 + Math.floor(i / 3) * 220, 0.9, t > tCo - 0.1 && i % 3 === 2, (rnd(i) - 0.5) * 0.2); },
      titles: [[tC, "DURING THE CIVIL WAR", "label"], [tT, "1 IN 3 DOLLARS...", "stamp", { size: 110 }], [tCo, "WAS COUNTERFEIT", "label", { fill: "#ffd0c0" }]] });
    ev(tT, "cash"); ev(tCo, "sting", 0.5); }
  // 3 hunt counterfeiters; guarding presidents from 1901
  { const tH = wt(3, "hunt"), tY = wt(3, "1901");
    S2(3, { bg: "americanTown", draw: (g, t) => { if (t < tY - 0.2) { for (let i = 0; i < 2; i++) guy(g, AGENT(i), { x: 240 + i * 200, y: 1840, h: 600, expr: "determined", walk: t * 1.6, blink: blinkAt(t, i), t }); guy(g, { ...C.gent(3), tunic: "#5a3a24", helmet: "bandana", hatCol: "#1c1422" }, { x: 860, y: 1840, h: 560, dir: -1, expr: "scared", walk: t * 2, blink: 0, t }); bill(g, 860, 1460, 0.6, true); } else { for (let i = 0; i < 2; i++) guy(g, AGENT(i), { x: 300 + i * 480, y: 1840, h: 640, dir: i ? -1 : 1, expr: "determined", blink: blinkAt(t, i), t }); rect(g, 440, 1300, 200, 300, "#fff6e6", 7, 14); strokeText(g, "1901", 540, 1470, 60, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tH, "BUILT TO HUNT COUNTERFEITERS", "stamp", { size: 76 }], [tY, "GUARDING PRESIDENTS: FROM 1901", "label", { size: 56, fill: "#ffe08a" }]] });
    ev(tH, "whistle"); ev(tY, "ding"); }
}
