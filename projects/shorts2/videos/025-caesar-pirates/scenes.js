// 025 — How Julius Caesar Turned the Tables on Pirates
"use strict";
function buildShots() {
  const CAESAR = { tunic: "#f6f3ea", trim: "#7a1a4a", hair: "#5a3b2a", robe: true, cape: "#7a1a4a" };
  const PIR = (i) => ({ ...C.pirate(i), skin: ["#e9c49a", "#c99067"][i % 2] });
  const deckDraw = (g, t, fn) => fn(g, t);
  // 0 hook
  S2(0, { bg: "deck", blur: true, draw: (g, t) => { guy(g, CAESAR, { x: 540, y: 1840, h: 620, expr: t > wt(0, "raise") ? "sly" : "neutral", armR: [2.0, -0.3], blink: blinkAt(t, 1), t }); for (let i = 0; i < 2; i++) guy(g, PIR(i), { x: i ? 920 : 160, y: 1840, h: 540, dir: i ? -1 : 1, expr: t > wt(0, "raise") ? "shock" : "sly", hold: { r: "sword" }, swordAng: -1.2, armR: [1.4, -0.3], blink: blinkAt(t, 2 + i), t }); },
    titles: [["kidnapped", "CAESAR: KIDNAPPED BY PIRATES", "label", { size: 56 }], ["raise", "“RAISE MY RANSOM!”", "stamp", { size: 92 }]] });
  ev(wt(0, "raise"), "boing");
  // 1 75 BC, Cilician pirates, 20 talents
  { const tY = wt(1, "75"), tCi = wt(1, "Cilician"), tT = wt(1, "20");
    S2(1, { bg: "sea", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); sailShip(g, { x: 300, y: 1400, h: 380, t, hull: "#3a2a2a", sail: "#5a4a4a", flag: ["#1c1422"], seed: 1 }); sailShip(g, { x: 840, y: 1430, h: 320, t, dir: -1, hull: "#8a5a32", seed: 2 }); if (t > tT - 0.1) { rect(g, 340, 900, 400, 160, "#fff6e6", 7, 14); strokeText(g, "20 TALENTS", 540, 980, 64, { font: "Cinzel", fill: "#5a6a7a", lw: 0, shadow: false }); } },
      titles: [[tY, "75 BC", "stamp", { size: 150 }], [tCi, "CILICIAN PIRATES", "label", { font: "Cinzel" }], ["25-year-old", "CAESAR, AGE 25", "label"], [tT, "RANSOM: 20 TALENTS OF SILVER", "label", { size: 56, fill: "#d9d9e6" }]] });
    ev(tY, "boom", 0.5); ev(tT, "cash"); }
  // 2 "I'm worth at least 50"
  { const tL = wt(2, "laughed"), tF = wt(2, "50");
    S2(2, { bg: "deck", blur: true, draw: (g, t) => { guy(g, CAESAR, { x: 340, y: 1840, h: 620, expr: t > tL ? "laugh" : "angry", armR: [2.4, -0.4], blink: blinkAt(t, 1), t }); guy(g, PIR(0), { x: 800, y: 1840, h: 560, dir: -1, expr: "shock", blink: 0, t }); if (t > tF - 0.2) shout(g, 380, 1040, "AT LEAST 50!", 60, clamp((t - tF + 0.2) / 0.15), "#2f5fae", [360, 1240]); },
      titles: [["Offended", "OFFENDED.", "stamp", { size: 120 }], [tF, "“I'M WORTH 50!”", "label", { fill: "#ffe08a" }]] });
    ev(tL, "laugh"); }
  // 3 38 days of bossing pirates around
  { const tD = wt(3, "38"), tB = wt(3, "bossed"), tQ = wt(3, "quiet"), tJ = wt(3, "joked");
    S2(3, { bg: "deck", draw: (g, t) => { rect(g, 700, 900, 300, 260, "#fff6e6", 7, 14); rect(g, 700, 900, 300, 70, "#c0392b", 7, 14); strokeText(g, "DAY", 850, 935, 36, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, String(Math.min(38, 1 + Math.floor((t - S(3)) * 3.6))), 850, 1060, 90, { fill: "#1c1422", lw: 0, shadow: false });
      if (t > tQ - 0.2 && t < tJ) { guy(g, CAESAR, { x: 300, y: 1800, h: 520, sit: true, lean: -60, expr: "closed", hideArms: true, t, shadow: false }); shout(g, 420, 1160, "SHH!", 56, clamp((t - tQ + 0.2) / 0.15), "#2f5fae"); for (let i = 0; i < 2; i++) guy(g, PIR(i), { x: 640 + i * 200, y: 1840, h: 480, dir: -1, expr: "nervous", blink: 0, t }); }
      else { guy(g, CAESAR, { x: 300, y: 1840, h: 600, expr: t > tJ ? "sly" : "shout", mouthOpen: talk(t), armR: [2.4, -0.2], blink: blinkAt(t, 1), t }); for (let i = 0; i < 2; i++) guy(g, PIR(i), { x: 640 + i * 200, y: 1840, h: 480, dir: -1, expr: t > tJ ? "laugh" : "scared", blink: 0, t }); } },
      titles: [[tD, "38 DAYS AS A HOSTAGE", "label"], [tB, "HE BOSSED THEM AROUND", "label", { fill: "#ffe08a" }], [tQ, "“QUIET, I'M SLEEPING.”", "stamp", { size: 82 }], [tJ, "“I'LL BE BACK FOR YOU.”", "label", { fill: "#ffd0c0" }]] });
    ev(tQ, "snore"); ev(tJ, "laugh", 0.5); }
  // 4 he came back
  { const tR = wt(4, "raised"), tH = wt(4, "hunted"), tK = wt(4, "kept");
    S2(4, { bg: "sea", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); const n = 1 + Math.floor(clamp((t - tR) / 1.2) * 3); for (let i = 0; i < n; i++) sailShip(g, { x: lerp(-400, 200 + i * 260, clamp((t - tR) / 2)), y: 1350 + i * 60, h: 300, t, hull: "#6b2a3a", sail: "#e9dcc0", flag: ["#7a1a4a"], seed: i }); if (t > tK - 0.2) { guy(g, CAESAR, { x: 860, y: 1840, h: 600, dir: -1, expr: "determined", armR: [2.4, -0.2], hold: { r: "sword" }, swordAng: -1.4, blink: blinkAt(t, 1), t }); } },
      titles: [[tR, "HE RAISED A FLEET", "label"], [tH, "HUNTED THEM DOWN", "stamp", { size: 96 }], [tK, "...AND KEPT HIS PROMISE", "label", { fill: "#ffd0c0" }]] }, night(0.15));
    ev(tR, "horns"); ev(tK, "sting", 0.6); }
}
