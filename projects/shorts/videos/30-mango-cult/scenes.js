// 30 — Mao's Mango Cult (1968)
"use strict";
window.MOOD = "comic";
const WORKER = (i) => ({ tunic: ["#2f4f8f", "#3a5a9a", "#2a4a7a"][i % 3], trim: "#f2efe6", helmet: i % 2 ? "cap" : null, hatCol: "#2f4f8f", hair: "#1a1012", skin: ["#f2d0a8", "#e9c49a", "#f6dab8"][i % 3], trousers: "#2a3a6a", robe: i % 4 === 3, lady: i % 4 === 3 });
const FM = { tunic: "#f2efe6", trim: "#2f6f4a", hair: "#2a1a14", trousers: "#f2efe6", skin: "#c99067", beard: null };
const CHAIR = { tunic: "#5a5f5a", trim: "#4a4f4a", hair: "#1a1012", trousers: "#5a5f5a", skin: "#f2d0a8" };
function mango(g, x, y, r, rot = 0, wax = false) { g.save(); g.translate(x, y); g.rotate(rot); smoothPath(g, [[0, -r], [r * 0.8, -r * 0.5], [r * 0.85, r * 0.4], [0, r], [-r * 0.7, r * 0.5], [-r * 0.75, -r * 0.4]]); fillInk(g, "#f2a13a", r * 0.1); smoothPath(g, [[0, -r], [r * 0.6, -r * 0.6], [r * 0.4, 0], [0, -r * 0.2]]); fillInk(g, "#f6c95a", 0); poly(g, [[0, -r], [r * 0.4, -r * 1.4], [r * 0.15, -r * 0.95]], "#4f8a3f", r * 0.06); if (wax) { g.save(); g.globalAlpha = 0.35; ell(g, 0, 0, r * 1.15, r * 1.2, "#fff6dc", r * 0.06); g.restore(); line(g, [[-r * 0.4, -r * 0.5], [-r * 0.5, 0]], r * 0.12, "rgba(255,255,255,0.8)"); } g.restore(); }
const factory = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#8a9ab0", "#c9d0d4", "#e9e6dc");
  for (let i = 0; i < 4; i++) { rect(g, -700 + i * 700, 700, 560, 600, "#a8a094", 7); for (let k = 0; k < 4; k++) poly(g, [[-700 + i * 700 + k * 140, 700], [-560 + i * 700 + k * 140, 600], [-560 + i * 700 + k * 140, 700]], "#8a8278", 5); rect(g, -500 + i * 700, 400, 70, 300, "#8a8278", 6); }
  g.fillStyle = "#9a948a"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function buildShots() {
  const fc = cached("fac", -900, -900, 2900, 3400, factory, 1.0);
  const fcB = cached("facB", -900, -900, 2900, 3400, factory, 0.7, 5);
  // 0 — hook: the sacred mango
  { const tY = wt(0, "1968"), tW = wt(0, "worshipped"), tR = wt(0, "relics");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1330, 1.1, 0]]);
      layer(g, cam, 0.7, fcB);
      layer(g, cam, 1, (g) => {
        rect(g, 420, 1300, 240, 400, "#9a2a33", 6, 8); museumCase(g, 540, 1300, 220, 260, (g) => mango(g, 540, 1170, 70, 0.2, true));
        g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 540, 1170, 0, 400, [[0, "rgba(255,230,150,0.45)"], [1, "rgba(255,230,150,0)"]]); g.fillRect(100, 700, 900, 1000); g.restore();
        for (let i = 0; i < 4; i++) guy(g, WORKER(i), { x: i < 2 ? 100 + i * 150 : 830 + (i - 2) * 150, y: 1820, h: 460, dir: i < 2 ? 1 : -1, expr: "happy", lean: t > tW ? 22 : 0, armR: [2.2, -0.6], blink: blinkAt(t, i), t });
      });
      stamp(g, "1968", 540, 330, 150, t, tY - 0.05, tW - 0.05);
      stamp(g, "SACRED... MANGOES", 540, 330, 92, t, tW, E(0) + 0.3);
      void tR;
    });
    ev(tY, "boom", 0.5); ev(tW, "choir", 0.6);
  }
  // 1 — the gift from Pakistan
  { const t0 = S(1) - 0.1, tPk = wt(1, "Pakistan's"), tCr = wt(1, "crate"), tU = wt(1, "unknown");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [9, 540, 1340, 1.12, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#c9b49a"], [1, "#9a8a72"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 140, 400, 800, 500, "#e9dcc0", 7, 6); g.fillStyle = "#8a2a33"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        guy(g, FM, { x: 220, y: 1820, h: 580, expr: "happy", armR: [1.6, -0.4], blink: blinkAt(t, 1), t });
        guy(g, CHAIR, { x: 860, y: 1820, h: 600, dir: -1, expr: "neutral", blink: blinkAt(t, 2), t });
        if (t > tCr - 0.2) { rect(g, 400, 1440, 280, 160, "#c9965a", 6, 6); for (let i = 0; i < 4; i++) line(g, [[400, 1470 + i * 36], [680, 1470 + i * 36]], 3, "rgba(80,40,10,0.5)"); for (let i = 0; i < 5; i++) mango(g, 430 + i * 55, 1420, 30, i * 0.4); }
        if (t > tU) shout(g, 860, 1000, "?", 80, clamp((t - tU) / 0.15), "#1c1422");
      });
      label(g, "A GIFT FROM PAKISTAN", 540, 330, 66, t, tPk, tU - 0.05);
      label(g, "MANGOES? NEVER SEEN ONE", 540, 330, 58, t, tU, E(1) + 0.2, { fill: "#ffe08a" });
    }, { type: "flash", d: 0.2 });
    ev(tCr, "pop"); ev(tU, "boing");
  }
  // 2 — sent to the factory workers
  { const t0 = S(2) - 0.1, tF = wt(2, "factory"), tP = wt(2, "priceless");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.95, 0], [6, 540, 1350, 1.02, 0]]);
      layer(g, cam, 0.7, fcB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 7; i++) guy(g, WORKER(i), { x: 80 + i * 150, y: 1760 + (i % 2) * 50, h: 400, expr: t > tP ? "laugh" : "shock", armR: [2.6, 0], armL: [-2.6, 0], bob: t > tP ? -Math.abs(Math.sin(t * 8 + i)) * 4 : 0, blink: 0, t });
        const k = clamp((t - tF + 0.3) / 0.8); mango(g, 540, lerp(400, 1150, easeOut(k)), 80, t * (1 - k) * 3);
        if (t > tP) for (let i = 0; i < 8; i++) sparkle(g, 540 + Math.cos(i * 0.8) * 240, 1150 + Math.sin(i * 1.3) * 160, 26, (t - tP - i * 0.06) / 0.8);
      });
      label(g, "BEIJING FACTORY WORKERS", 540, 330, 60, t, tF - 0.2, tP - 0.05);
      stamp(g, "PRICELESS", 540, 330, 120, t, tP, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "whoosh"); ev(tP, "cheer"); ev(tP, "sparkle");
  }
  // 3 — wax, parades, and mango water by the spoonful
  { const t0 = S(3) - 0.1, tW = wt(3, "wax"), tPa = wt(3, "paraded"), tB = wt(3, "boiled"), tSp = wt(3, "spoonful");
    shot(t0, (g, t, lt) => {
      const ph = t < tPa - 0.1 ? 0 : t < tB - 0.1 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [9, 540, 1340, 1.08, 0]]);
      layer(g, cam, 0.7, fcB);
      layer(g, cam, 1, (g) => {
        if (ph === 0) { guy(g, WORKER(0), { x: 300, y: 1820, h: 560, expr: "determined", armR: [1.6, -0.6], blink: blinkAt(t, 1), t }); rect(g, 560, 1500, 260, 300, "#c9b49a", 6, 10); mango(g, 690, 1380, 70, 0.2, t > tW + 0.3); for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; ell(g, 650 + i * 40, 1460 - q * 60, 10, 14, "#fff6dc", 3); } }
        if (ph === 1) { const x0 = ((t - tPa) * 150) % 1400 - 300; for (let i = 0; i < 6; i++) guy(g, WORKER(i), { x: x0 + i * 140 - 300, y: 1800 + (i % 2) * 30, h: 380, expr: "happy", walk: t * 2, blink: 0, t }); rect(g, x0 + 100, 1300, 300, 200, "#c0392b", 6, 10); mango(g, x0 + 250, 1220, 80, 0.2, true); line(g, [[x0 + 120, 1500], [x0 + 120, 1700]], 10, "#6b4024"); line(g, [[x0 + 380, 1500], [x0 + 380, 1700]], 10, "#6b4024"); }
        if (ph === 2) { campfire(g, 540, 1800, 80, t); ell(g, 540, 1660, 170, 50, "#3a3a44", 6); rect(g, 370, 1560, 340, 100, "#3a3a44", 6, 10); ell(g, 540, 1560, 170, 40, "#cfe6b0", 5); mango(g, 540, 1550, 40, t); for (let i = 0; i < 3; i++) { const q = (t * 0.7 + i / 3) % 1; g.save(); g.globalAlpha = (1 - q) * 0.6; ell(g, 500 + i * 40, 1480 - q * 160, 20, 16, "#fff", 3); g.restore(); } for (let i = 0; i < 5; i++) { const x = 900 + i * 140 - Math.min(400, Math.max(0, t - tSp) * 160); guy(g, WORKER(i), { x, y: 1820, h: 400, dir: -1, expr: "happy", armR: [1.6, -0.6], blink: blinkAt(t, i), t }); line(g, [[x - 80, 1500], [x - 130, 1460]], 6, "#d9d9d9"); } }
      });
      label(g, "SEALED IN WAX", 540, 330, 86, t, tW, tPa - 0.1);
      label(g, "PARADES", 540, 330, 96, t, tPa, tB - 0.1, { fill: "#ffd0c0" });
      label(g, "MANGO SOUP", 540, 330, 96, t, tB, tSp - 0.05, { fill: "#ffe08a" });
      stamp(g, "ONE SPOONFUL EACH", 540, 330, 86, t, tSp, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tW, "pop"); ev(tPa, "drums"); ev(tPa, "cheer", 0.5); ev(tB, "bubble"); ev(tSp, "ding");
  }
}
