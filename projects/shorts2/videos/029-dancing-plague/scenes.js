// 029 — The Year People Danced Until They Collapsed
"use strict";
function buildShots() {
  const TROF = { ...C.peasant(1), lady: true, hair: "#7a4a2a", tunic: "#8a3a4a" };
  const crowdDance = (g, t, n, tired = 0) => { for (let i = 0; i < n; i++) { const x = 120 + (i % 5) * 210 + (Math.floor(i / 5) % 2) * 100, y = 1840 - Math.floor(i / 5) * 90, h = 420 - Math.floor(i / 5) * 50; guy(g, C.peasant(i), { x, y, h, ...danceState(t * (1 - tired * 0.6), i), expr: tired > 0.5 ? "tired" : "shock", blink: 0, t, shadow: false }); } };
  // 0 hook
  S2(0, { bg: "town", blur: true, draw: (g, t) => crowdDance(g, t, 10), titles: [["danced", "THEY COULDN'T STOP DANCING", "label", { size: 66 }], ["weeks", "FOR WEEKS", "stamp", { size: 130 }]] });
  ev(wt(0, "weeks"), "drums");
  // 1 July 1518, Frau Troffea, no music
  { const tJ = wt(1, "July"), tF = wt(1, "Troffea"), tS = wt(1, "silently");
    S2(1, { bg: "town", draw: (g, t) => { guy(g, TROF, { x: 540, y: 1840, h: 620, ...danceState(t, 0), expr: "neutral", blink: blinkAt(t, 1), t }); if (t > tS) { g.save(); g.globalAlpha = 0.85; ell(g, 860, 1100, 90, 90, "#fff6e6", 6); strokeText(g, "♪", 860, 1110, 90, { fill: "#1c1422", lw: 0, shadow: false }); line(g, [[800, 1040], [920, 1160]], 12, "#c0392b"); g.restore(); } },
      titles: [[tJ, "JULY 1518 · STRASBOURG", "stamp", { size: 84 }], [tF, "FRAU TROFFEA", "label", { font: "Cinzel" }], [tS, "NO MUSIC. JUST DANCING.", "label", { fill: "#ffe08a" }]] });
    ev(tJ, "boom", 0.5); }
  // 2 400 people, exhausted
  { const tF = wt(2, "400"), tB = wt(2, "bled"), tC = wt(2, "collapsed");
    S2(2, { bg: "town", keys: [[0, 540, 1300, 0.95, 0], [12, 540, 1320, 0.85, 0]], draw: (g, t) => { const n = Math.round(lerp(4, 15, clamp((t - S(2)) / 3))); crowdDance(g, t, n, clamp((t - tB) / 2)); if (t > tC) for (let i = 0; i < 3; i++) guy(g, C.peasant(i + 5), { x: 200 + i * 340, y: 1900, h: 380, sit: true, lean: -40, expr: "tired", hideArms: true, t, shadow: false }); },
      titles: [[tF, "~400 PEOPLE", "stamp", { size: 130 }], [tB, "THEY COULDN'T STOP", "label", { fill: "#ffd0c0" }], [tC, "MANY COLLAPSED", "label"]] });
    ev(tF, "crowd"); ev(tC, "crash", 0.4); }
  // 3 musicians hired to "dance it out"
  { const tH = wt(3, "hired"), tD = wt(3, "dance"), tW = wt(3, "worse");
    S2(3, { bg: "town", draw: (g, t) => { guy(g, C.noble(0), { x: 180, y: 1840, h: 560, expr: "proud", armR: [2.4, -0.3], hold: { r: "scroll" }, blink: blinkAt(t, 1), t }); if (t > tH - 0.1) for (let i = 0; i < 2; i++) { guy(g, { ...C.peasant(i + 3), helmet: "beret", hatCol: "#c0392b" }, { x: 480 + i * 170, y: 1840, h: 460, expr: "happy", armR: [1.2 + Math.sin(t * 9 + i) * 0.3, -0.6], blink: 0, t }); strokeText(g, "♪", 520 + i * 170, 1260 - ((t * 1.5 + i * 0.5) % 1) * 200, 70, { fill: "#ffe08a" }); } if (t > tD) for (let i = 0; i < 3; i++) guy(g, C.peasant(i), { x: 820 + (i - 1) * 110, y: 1840 - i * 30, h: 380, ...danceState(t * 1.4, i), expr: "shock", blink: 0, t, shadow: false }); },
      titles: [[tH, "AUTHORITIES HIRED A BAND", "label"], [tD, "“DANCE IT OUT!”", "stamp", { size: 110 }], [tW, "IT GOT WORSE", "label", { fill: "#ffd0c0" }]] });
    ev(tD, "drums"); ev(tW, "sadtrombone", 0.6); }
  // 4 historians: stress + famine → mass hysteria
  { const tM = wt(4, "stress-induced"), tF = wt(4, "famine");
    S2(4, { bg: "library", blur: true, draw: (g, t) => { guy(g, C.scientist("#a0a0a0"), { x: 300, y: 1840, h: 600, expr: "talk", mouthOpen: talk(t), armR: [2.0, -0.3], blink: blinkAt(t, 1), t }); rect(g, 560, 1100, 420, 480, "#fff6e6", 7, 14); strokeText(g, "FAMINE", 770, 1200, 54, { fill: "#8a3a2a", lw: 0, shadow: false }); strokeText(g, "+ STRESS", 770, 1300, 54, { fill: "#8a3a2a", lw: 0, shadow: false }); strokeText(g, "↓", 770, 1400, 70, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "HYSTERIA", 770, 1500, 58, { fill: "#c0392b", lw: 0, shadow: false }); },
      titles: [[tM, "MASS HYSTERIA", "stamp", { size: 120 }], [tF, "TRIGGERED BY FAMINE", "label"]] });
    ev(tM, "sting", 0.5); }
}
