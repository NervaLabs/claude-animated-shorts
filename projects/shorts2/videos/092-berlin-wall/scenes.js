// 092 — How the Berlin Wall Fell Because of a Press Conference Mistake
"use strict";
function buildShots() {
  const SCH = { ...C.suit(2), tunic: "#3a3a44", hair: "#d9d9d9" };
  const wall = (g, crack = 0) => { for (let i = 0; i < 9; i++) { rect(g, -200 + i * 170, 1100, 160, 760, "#b9b4a8", 5, 6); ell(g, -120 + i * 170, 1100, 80, 30, "#c9c4b8", 5); } for (let i = 0; i < 8; i++) strokeText(g, ["♥", "★", "!", "~"][i % 4], -100 + i * 170, 1500 + (i % 3) * 80, 70, { fill: ["#c0392b", "#2f4f9f", "#e2b64b", "#3a8a3a"][i % 4], lw: 0, shadow: false }); if (crack) { line(g, [[540, 1100], [500, 1400], [580, 1600], [520, 1860]], 8 * crack, INK); } };
  const desk = (g) => { rect(g, 80, 1500, 920, 60, "#6b4024", 6, 8); rect(g, 80, 1560, 920, 300, "#8a5a32", 6); for (let i = 0; i < 3; i++) { line(g, [[300 + i * 240, 1500], [320 + i * 240, 1380]], 6); ell(g, 320 + i * 240, 1370, 20, 26, "#3a3a44", 4); } };
  // 0 hook
  S2(0, { bg: "street", blur: true, draw: (g, t) => { wall(g, clamp((t - wt(0, "misread")) / 1)); },
    titles: [["fell", "THE BERLIN WALL FELL...", "stamp", { size: 92 }], ["misread", "BECAUSE OF A TV MISTAKE", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "misread"), "crack");
  // 1 Nov 9: Schabowski handed a memo
  { const tN = wt(1, "November"), tG = wt(1, "Schabowski"), tM = wt(1, "memo"), tNx = wt(1, "next");
    S2(1, { bg: "control", draw: (g, t) => { guy(g, SCH, { x: 540, y: 1500, h: 520, expr: "neutral", blink: blinkAt(t, 1), t, shadow: false }); desk(g); if (t > tM - 0.2) { g.save(); g.translate(760, 1440); g.rotate(-0.1); rect(g, -100, -70, 200, 140, "#fff6e6", 5, 4); for (let i = 0; i < 4; i++) line(g, [[-80, -40 + i * 28], [80, -40 + i * 28]], 3, "#9a9aa8"); g.restore(); } if (t > tNx - 0.2) { rect(g, 100, 820, 360, 160, "#fff6e6", 7, 14); strokeText(g, "START: TOMORROW", 280, 905, 34, { fill: "#2f4f9f", lw: 0, shadow: false }); } },
      titles: [[tN, "NOVEMBER 9, 1989", "stamp", { size: 100 }], [tG, "GÜNTER SCHABOWSKI", "label"], [tM, "A MEMO: EASIER TRAVEL", "label", { fill: "#ffe08a" }]] });
    ev(tN, "boom", 0.4); }
  // 2 "immediately, without delay"
  { const tW = wt(2, "When"), tI = wt(2, "immediately");
    S2(2, { bg: "control", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1250, 1.15, 0]], draw: (g, t) => { guy(g, SCH, { x: 540, y: 1500, h: 520, expr: t > tI ? "nervous" : "shock", mouthOpen: talk(t), blink: 0, t, shadow: false }); desk(g); if (t > tI - 0.2) shout(g, 540, 900, "IMMEDIATELY!", 60, clamp((t - tI + 0.2) / 0.15), "#c0392b"); },
      titles: [[tW, "“WHEN DOES IT START?”", "label"], [tI, "“...IMMEDIATELY.”", "stamp", { size: 110 }]] });
    ev(tI, "sting", 0.6); }
  // 3 crowds rush checkpoints; gates open
  { const tT = wt(3, "Thousands"), tO = wt(3, "open");
    S2(3, { bg: "street", draw: (g, t) => { wall(g, 0); if (t > tO - 0.2) { const k = clamp((t - tO) / 1); g.fillStyle = "#3a3a5a"; g.fillRect(540 - 200 * k, 1100, 400 * k, 760); rect(g, 380 - k * 200, 1100, 160, 760, "#b9b4a8", 5, 6); rect(g, 540 + k * 200, 1100, 160, 760, "#b9b4a8", 5, 6); } crowdHeads(g, -100, 1200, 1980, 4, 11, 1.4); for (let i = 0; i < 5; i++) sparkle(g, 140 + i * 200, 900 + (i % 2) * 80, 34, (t * 0.7 + i / 5) % 1); },
      titles: [[tT, "THOUSANDS RUSHED THE GATES", "label", { size: 60 }], [tO, "THE GATES OPENED", "stamp", { size: 110 }]] }, night(0.3));
    ev(tT, "crowd"); ev(tO, "cheer"); }
}
