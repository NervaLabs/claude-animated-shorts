// 29 — Boris Yeltsin's Midnight Pizza Run (1995)
"use strict";
window.MOOD = "comic";
const YEL = { tunic: "#f6f3ea", trim: "#d9d2bc", hair: "#ece8e0", hairStyle: "lion", trousers: SKIN, boots: SKIN, shorts: true };
const YELSUIT = { tunic: "#2a2a34", trim: "#f2efe6", hair: "#ece8e0", hairStyle: "lion", trousers: "#2a2a34", sash: null };
HATS.shades = (g, rx, ry, lw) => { rect(g, -rx * 0.75, -ry * 0.22, rx * 0.6, ry * 0.3, "#1c1422", lw * 0.4, 6); rect(g, rx * 0.15, -ry * 0.22, rx * 0.6, ry * 0.3, "#1c1422", lw * 0.4, 6); line(g, [[-rx * 0.15, -ry * 0.1], [rx * 0.15, -ry * 0.1]], 3); };
const AGENT = { tunic: "#1f1a24", trim: "#f2efe6", hair: "#2a1a14", helmet: "shades", hairUnder: true, trousers: "#1f1a24" };
const dcNight = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#0d1236", "#1f2650", "#3a4070");
  for (let i = 0; i < 60; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.4 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 2900 - 900, rnd(i * 7) * 1300 - 900, 3, 3); } g.globalAlpha = 1;
  // the White House across the street (distant)
  rect(g, 900, 900, 900, 260, "#e9e6e0", 6); rect(g, 1180, 840, 340, 320, "#f2efe6", 6); poly(g, [[1160, 840], [1350, 760], [1540, 840]], "#e9e6e0", 6); for (let i = 0; i < 6; i++) column(g, 1210 + i * 56, 1160, 22, 260, "#f6f3ea", 3);
  // Blair House (townhouse with a flag)
  rect(g, -500, 500, 900, 800, "#e9dcc0", 7); for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) rect(g, -440 + c * 170, 580 + r * 220, 90, 150, r === 2 && c === 2 ? "#ffe08a" : "#3a3a5a", 4);
  rect(g, -80, 1100, 160, 200, "#5a3b2a", 5, 40);
  g.fillStyle = "#4a4a54"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); line(g, [[-900, 1700], [2000, 1700]], 8, "#e7c15f");
  for (const x of [-700, 500, 1600]) { line(g, [[x, 1300], [x, 800]], 12, "#3a3a44"); ell(g, x, 790, 30, 20, "#ffe08a", 4); }
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
const pizza = (g, x, y, r, t) => { g.save(); g.translate(x, y); g.rotate(t); ell(g, 0, 0, r, r, "#e9b44a", 5); ell(g, 0, 0, r * 0.82, r * 0.82, "#d9483a", 0); for (let i = 0; i < 6; i++) ell(g, Math.cos(i) * r * 0.5, Math.sin(i * 1.3) * r * 0.5, r * 0.12, r * 0.12, "#8a2a2a", 0); g.restore(); };
function buildShots() {
  const dc = cached("dc", -900, -900, 2900, 3400, dcNight, 1.0);
  const dcB = cached("dcB", -900, -900, 2900, 3400, dcNight, 0.7, 5);
  const yelS = (t, extra = {}) => ({ expr: "happy", headTilt: Math.sin(t * 1.7) * 8, lean: Math.sin(t * 1.3) * 5, blink: blinkAt(t, 1), t, ...extra });
  // 0 — hook
  { const tY = wt(0, "1995"), tSS = wt(0, "Secret"), tU = wt(0, "underwear"), tP = wt(0, "pizza");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [6, 540, 1400, 1.08, 0]]);
      layer(g, cam, 0.7, dcB);
      layer(g, cam, 1, (g) => { guy(g, YEL, { x: 600, y: 1820, h: 620, ...yelS(t), armR: [2.8 + Math.sin(t * 6) * 0.2, 0] }); if (t > tSS) for (let i = 0; i < 2; i++) guy(g, AGENT, { x: i ? 1000 : 160, y: 1820, h: 600, dir: i ? -1 : 1, expr: "shock", blink: 0, t }); if (t > tP) shout(g, 640, 980, "TAXI! PIZZA!", 54, clamp((t - tP) / 0.12), "#c0392b", [640, 1200]); });
      stamp(g, "1995", 540, 330, 150, t, tY - 0.05, tSS - 0.05);
      label(g, "SECRET SERVICE FOUND...", 540, 330, 62, t, tSS, tU - 0.05);
      stamp(g, "...A PRESIDENT IN HIS UNDERWEAR", 540, 330, 56, t, tU, E(0) + 0.3);
    }, { type: "cut", d: 0 }, night(0.15));
    ev(tY, "boom", 0.5); ev(tU, "boing"); ev(tP, "pop");
  }
  // 1 — Blair House, state visit; slips past security
  { const t0 = S(1) - 0.1, tB = wt(1, "Blair"), tW = wt(1, "White"), tSl = wt(1, "slipped");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 300, 1100, 0.8, 0], [tW - t0, 900, 1100, 0.8, 0], [tSl - t0, 300, 1250, 0.95, 0], [10, 300, 1250, 0.98, 0]]);
      layer(g, cam, 1, (g) => {
        dc(g);
        if (t > tSl - 0.3) { const k = clamp((t - tSl + 0.3) / 2.5); guy(g, YELSUIT, { x: lerp(0, 500, k), y: 1500, h: 440, ...yelS(t), walk: t * 1.2, lean: -6 }); guy(g, AGENT, { x: -300, y: 1500, h: 440, expr: "neutral", look: 0, blink: blinkAt(t, 4), t }); g.save(); g.globalAlpha = 0.9; strokeText(g, "z", -280, 1150 - ((t * 60) % 60), 50, { fill: "#fff" }); g.restore(); }
      });
      label(g, "BLAIR HOUSE", 540, 330, 86, t, tB, tW - 0.05, { font: "Cinzel", fill: "#cfe0ff" });
      label(g, "ACROSS FROM THE WHITE HOUSE", 540, 330, 54, t, tW, tSl - 0.05);
      label(g, "PAST SECURITY...", 540, 330, 80, t, tSl, E(1) + 0.2, { fill: "#ffe08a" });
    }, { type: "flash", d: 0.2 }, night(0.15));
    ev(tB, "pop"); ev(tSl, "pop", 0.5); ev(tSl + 0.4, "snore");
  }
  // 2 — out on Pennsylvania Avenue in his underwear
  { const t0 = S(2) - 0.1, tP = wt(2, "Pennsylvania"), tU = wt(2, "underwear");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.0, 0], [6, 540, 1450, 1.06, 0]]);
      layer(g, cam, 0.7, dcB);
      layer(g, cam, 1, (g) => { guy(g, YEL, { x: 600, y: 1820, h: 620, ...yelS(t), armR: [2.6, 0] }); for (let i = 0; i < 2; i++) guy(g, AGENT, { x: lerp(i ? 1300 : -200, i ? 960 : 180, clamp((t - t0) / 1.2)), y: 1820, h: 580, dir: i ? -1 : 1, expr: "shock", walk: t < t0 + 1.2 ? t * 2.6 : null, blink: 0, t }); });
      label(g, "PENNSYLVANIA AVENUE", 540, 330, 64, t, tP, tU - 0.05, { font: "Cinzel", fill: "#cfe0ff" });
      stamp(g, "IN HIS UNDERWEAR", 540, 330, 96, t, tU, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 }, night(0.15));
    ev(t0 + 0.3, "scramble"); ev(tU, "boing");
  }
  // 3 — "taxi... pizza"
  { const t0 = S(3) - 0.1, tW = wt(3, "wanted"), tT = wt(3, "taxi"), tP = wt(3, "pizza");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.1, 0], [5, 560, 1330, 1.2, 0]]);
      layer(g, cam, 0.7, dcB);
      layer(g, cam, 1, (g) => {
        guy(g, YEL, { x: 380, y: 1820, h: 640, ...yelS(t, { expr: "talk", mouthOpen: talk(t) }), armR: [2.2, -0.4] });
        guy(g, AGENT, { x: 860, y: 1820, h: 600, dir: -1, expr: "neutral", armR: [1.6, -1.4], blink: blinkAt(t, 4), t });
        if (t > tT - 0.1) { g.save(); g.globalAlpha = clamp((t - tT) / 0.2); bubble(g, 460, 960, 460, 220, 400, 1180, "#fff", 6); g.restore(); strokeText(g, "TAXI...", 400, 960, 56, { fill: "#e2b64b", lw: 0, shadow: false }); if (t > tP - 0.1) pizza(g, 600, 960, 60, t); }
      });
      label(g, "WHAT DID HE WANT?", 540, 330, 72, t, t0 + 0.2, tT - 0.1);
      stamp(g, "PIZZA.", 540, 330, 130, t, tP, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 }, night(0.15));
    ev(tT, "pop"); ev(tP, "ding");
  }
  // 4 — the next night: the basement stairs
  { const t0 = S(4) - 0.1, tN = wt(4, "next"), tB = wt(4, "basement");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [5, 540, 1350, 1.12, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#2a2434"], [1, "#4a3a3a"]]); g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 9; i++) rect(g, -200 + i * 140, 1000 + i * 100, 200, 100, "#6b4a3a", 5); line(g, [[-200, 900], [1100, 1800]], 10, "#8a5a32"); });
      layer(g, cam, 1, (g) => { const k = clamp((t - t0) / 3); guy(g, YELSUIT, { x: lerp(100, 800, k), y: lerp(1000, 1700, k), h: 480, ...yelS(t, { expr: "sly" }), walk: (t * 0.8) % 1, lean: 10 }); if (t > tB) { guy(g, AGENT, { x: 160, y: 1000, h: 420, expr: "shock", blink: 0, t }); g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 300, 1100, 0, 500, [[0, "rgba(255,240,180,0.35)"], [1, "rgba(255,240,180,0)"]]); g.fillRect(-200, 600, 1000, 1000); g.restore(); } });
      label(g, "THE NEXT NIGHT...", 540, 330, 80, t, tN, tB - 0.05);
      stamp(g, "THE BASEMENT STAIRS", 540, 330, 84, t, tB, 999);
    }, { type: "black", d: 0.4 }, night(0.2));
    ev(tN, "whoosh", 0.5); ev(tB, "creak"); ev(tB + 0.3, "boing");
  }
}
