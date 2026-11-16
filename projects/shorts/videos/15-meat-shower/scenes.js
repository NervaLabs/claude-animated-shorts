// 15 — The Kentucky Meat Shower (1876)
"use strict";
window.MOOD = "comic";
const kyFarm = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#2f78d8", "#86c0f0", "#e6f0f4");
  smoothHills(g, -900, 2000, 1150, 180, "#6f9a4a", 3, 5);
  house(g, 860, 1300, 380, 260, "#e9dcc0", "#5a3b2a", 6);
  for (let x = -800; x < 2000; x += 120) line(g, [[x, 1330], [x, 1260]], 8, "#8a5a32"); line(g, [[-800, 1280], [2000, 1280]], 7, "#8a5a32");
  ground(g, 1300, "#9cbb5c", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
const meatRain = (g, t, n = 40, from = 0) => { for (let i = 0; i < n; i++) { const x = rnd(i) * 1300 - 100 + Math.sin(t + i) * 20, y = ((rnd(i * 3) * 2400 + (t - from) * 700 * (0.7 + rnd(i * 7) * 0.5)) % 2400) - 300; meatChunk(g, x, y, 10 + rnd(i * 9) * 26, t * 3 + i); } };
const LOCAL = { tunic: "#6a5a3a", trim: "#d9c08a", helmet: "cap", hatCol: "#8a6a3a", trousers: "#3a4a6a", beard: "#5a3b2a" };
function buildShots() {
  const farm = cached("ky", -900, -900, 2900, 3400, kyFarm, 1.0);
  const farmB = cached("kyB", -900, -900, 2900, 3400, kyFarm, 0.7, 5);
  // 0 — hook: meat from a clear sky
  { const tY = wt(0, "1876"), tM = wt(0, "meat"), tC = wt(0, "clear"), tK = wt(0, "Kentucky");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [6, 540, 1250, 1.08, 0]]);
      layer(g, cam, 0.7, farmB);
      layer(g, cam, 1, (g) => { guy(g, { ...OUTF.townswoman, tunic: "#7a4a6a" }, { x: 380, y: 1780, h: 560, expr: t > tM ? "shock" : "neutral", look: t > tM ? -0.6 : 0, headTilt: t > tM ? -10 : 0, armR: t > tM ? [2.6, 0] : [0.3, 0.2], blink: blinkAt(t, 1), t }); });
      if (t > tM - 0.3) meatRain(g, t, 30, tM - 0.3);
      stamp(g, "1876", 540, 330, 150, t, tY - 0.05, tM);
      label(g, "IT RAINED MEAT", 540, 330, 96, t, tM, tK - 0.05, { fill: "#ffd0d0" });
      label(g, "KENTUCKY", 540, 330, 96, t, tK, E(0) + 0.3, { font: "Cinzel", fill: "#cfe9ff" });
      void tC;
    });
    ev(tY, "boom", 0.6); ev(tM, "splat"); for (let k = 0; k < 6; k++) ev(tM + 0.3 + k * 0.5, "splat", 0.4);
  }
  // 1 — flakes to strips, falling on a farmyard
  { const t0 = S(1) - 0.1, tB = wt(1, "Bath"), tSn = wt(1, "snowflake-sized"), tTh = wt(1, "three-inch");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [tSn - t0, 540, 1300, 1.0, 0], [tSn - t0 + 0.4, 540, 1100, 1.5, 0], [9, 540, 1100, 1.53, 0]]);
      layer(g, cam, 0.8, farm);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 12; i++) meatChunk(g, 80 + i * 90, 1760 + (i % 3) * 30, 14 + (i % 4) * 6, i);
        if (t > tSn) { g.save(); g.translate(540, 1060); g.scale(easeBack(clamp((t - tSn) / 0.3)), easeBack(clamp((t - tSn) / 0.3))); rect(g, -330, -150, 660, 300, "#fff6e6", 7, 18); meatChunk(g, -200, 0, 18, 0.3); strokeText(g, "→", -40, 0, 80, { fill: "#1c1422", lw: 0, shadow: false }); g.save(); g.translate(170, 0); g.rotate(-0.2); rect(g, -110, -26, 220, 52, "#c9434a", 6, 14); g.restore(); g.restore(); }
      });
      meatRain(g, t, 26, t0);
      label(g, "BATH COUNTY", 540, 330, 86, t, tB, tSn - 0.05, { font: "Cinzel", fill: "#cfe9ff" });
      label(g, "FLAKES TO 3-INCH STRIPS", 540, 330, 62, t, tSn, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    for (let k = 0; k < 8; k++) ev(t0 + k * 0.9, "splat", 0.35); ev(tSn, "pop");
  }
  // 2 — two locals cook it and taste it
  { const t0 = S(2) - 0.1, tBr = wt(2, "brave"), tC = wt(2, "cooked"), tT = wt(2, "tasted"), tMu = wt(2, "mutton"), tV = wt(2, "venison");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.1, 0], [8, 540, 1340, 1.18, 0]]);
      layer(g, cam, 0.7, farmB);
      layer(g, cam, 1, (g) => {
        campfire(g, 540, 1800, 80, t); line(g, [[450, 1700], [660, 1660]], 10, "#2a2830"); ell(g, 560, 1690, 90, 26, "#2a2830", 6); meatChunk(g, 540, 1675, 22, 0.3); meatChunk(g, 590, 1680, 18, 1.2);
        for (let i = 0; i < 3; i++) { const q = (t * 0.6 + i / 3) % 1; g.save(); g.globalAlpha = (1 - q) * 0.6; ell(g, 560 + Math.sin(i * 3) * 30, 1620 - q * 200, 20 + q * 20, 16 + q * 16, "#fff", 3); g.restore(); }
        guy(g, LOCAL, { x: 230, y: 1800, h: 540, expr: t > tT ? "happy" : t > tBr ? "nervous" : "neutral", armR: t > tT ? [1.8, -1.2] : [1.2, 0.2], blink: blinkAt(t, 1), t });
        guy(g, { ...LOCAL, tunic: "#3a5a7a", beard: null, hair: "#c58a3d" }, { x: 850, y: 1800, h: 540, dir: -1, expr: t > tT ? "happy" : "scared", armR: t > tT ? [1.8, -1.2] : [0.6, 0.3], blink: blinkAt(t, 2), t });
        if (t > tMu) shout(g, 260, 1030, "MUTTON?", 54, clamp((t - tMu) / 0.12), "#8a5a32", [240, 1240]);
        if (t > tV) shout(g, 830, 980, "VENISON!", 54, clamp((t - tV) / 0.12), "#8a5a32", [850, 1240]);
      });
      label(g, "BRAVE... OR RECKLESS", 540, 330, 66, t, tBr, tMu - 0.1);
      void tC;
    }, { type: "xfade", d: 0.3 });
    ev(tC, "bubble"); ev(tMu, "pop"); ev(tV, "pop");
  }
  // 3 — the science: vulture vomit
  { const t0 = S(3) - 0.1, tS = wt(3, "Scientists"), tL = wt(3, "lung"), tV = wt(3, "vultures");
    shot(t0, (g, t, lt) => {
      const birds = t > tV - 0.6;
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [9, 540, 1280, 1.12, 0]]);
      if (!birds) {
        layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#d9e2e6"], [1, "#a8b4ba"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, -300, 1500, 1700, 900, "#6b4024", 6); });
        layer(g, cam, 1, (g) => {
          guy(g, { tunic: "#f6f3ea", trim: "#9a9a9a", hair: "#7a7a7a", bald: true, beard: "#9a9a9a", robe: true }, { x: 300, y: 1780, h: 600, expr: t > tL ? "shock" : "neutral", look: 1, armR: [1.7, -0.6], blink: blinkAt(t, 1), t });
          rect(g, 660, 1300, 80, 200, "#3a3a44", 6, 6); rect(g, 620, 1480, 180, 40, "#3a3a44", 5, 6); line(g, [[700, 1300], [740, 1180]], 30, "#3a3a44");
          if (t > tL - 0.1) { g.save(); g.translate(560, 980); g.scale(easeBack(clamp((t - tL + 0.1) / 0.3)), easeBack(clamp((t - tL + 0.1) / 0.3))); ell(g, 0, 0, 200, 200, "#fff6e6", 8); g.save(); g.beginPath(); g.arc(0, 0, 192, 0, TAU); g.clip(); for (let i = 0; i < 18; i++) ell(g, Math.cos(i) * 120 * rnd(i), Math.sin(i * 2) * 120 * rnd(i * 3), 30, 24, "#e98a96", 3); g.restore(); g.restore(); }
        });
        label(g, "PRESERVED SAMPLES", 540, 330, 70, t, tS, tL - 0.05);
        stamp(g, "LUNG TISSUE", 540, 330, 110, t, tL, tV - 0.6);
      } else {
        layer(g, cam, 0.7, farmB);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) { const x = lerp(-200, 1400, ((t - tV) * 0.18 + i * 0.22) % 1.2), y = 650 + i * 110 + Math.sin(t * 2 + i) * 30; vulture(g, x, y, 90, t + i); if (i % 2 === 0) { const q = (t * 1.2 + i * 0.3) % 1; meatChunk(g, x + 30, y + 80 + q * 700, 18, t * 4); line(g, [[x + 40, y + 30], [x + 60, y + 70]], 5, "#8fbf5a"); } } });
        stamp(g, "VULTURE VOMIT", 540, 330, 104, t, tV, 999);
      }
    }, { type: "xfade", d: 0.3 });
    ev(tL, "ding"); ev(tV, "boing"); ev(tV + 0.2, "splat");
  }
}
