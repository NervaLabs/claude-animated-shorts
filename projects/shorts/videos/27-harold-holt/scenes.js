// 27 — Prime Minister Harold Holt's Disappearance (1967)
"use strict";
window.MOOD = "eerie";
const HOLT = { tunic: "#2f6f9a", trim: "#f2efe6", hair: "#8a8a8a", trousers: "#1f2a44", boots: SKIN };
const AUSFLAG = (g, w, h) => { g.fillStyle = "#1f2f7f"; g.fillRect(-w, -h, w * 3, h * 3); g.save(); g.beginPath(); g.rect(0, 0, w * 0.5, h * 0.5); g.clip(); unionJack(g, w * 0.5, h * 0.5); g.restore(); const star = (x, y, r) => { g.beginPath(); for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU - Math.PI / 2, q = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); g.fillStyle = "#fff"; g.fill(); }; star(w * 0.25, h * 0.75, h * 0.12); for (const [x, y] of [[0.75, 0.2], [0.62, 0.48], [0.88, 0.42], [0.75, 0.82]]) star(w * x, h * y, h * 0.06); };
const beach = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#6a8ab0", "#b8c8d8", "#e2e6e6");
  poly(g, [[-900, 1180], [-500, 1000], [-200, 1050], [100, 1180]], "#6a7a5a", 5, true);
  ground(g, 1600, "#e9d6a0", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
function buildShots() {
  const bc = cached("chev", -900, -900, 2900, 3400, beach, 1.0);
  const bcB = cached("chevB", -900, -900, 2900, 3400, beach, 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1967"), tP = wt(0, "Prime"), tV = wt(0, "vanished");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [5, 540, 1350, 1.06, 0]]);
      layer(g, cam, 0.7, bcB);
      layer(g, cam, 1, (g) => {
        sea(g, 1180, t, -900, 2000, "#3f7fb4", "#1f4f84"); for (let i = 0; i < 3; i++) waves(g, 1300 + i * 100 + Math.sin(t * 2 + i) * 20, t + i, -900, 2000, ["#4f8fc4", "#3f7fb4", "#2f6fa4"][i], 30);
        ground(g, 1650, "#e9d6a0", -900, 2000);
        const k = clamp((t - 0.3) / (tV - 0.3));
        if (t < tV + 0.4) { g.save(); g.globalAlpha = 1 - clamp((t - tV) / 0.4); guy(g, HOLT, { x: lerp(540, 620, k), y: lerp(1750, 1450, k), h: 460 - k * 160, dir: 1, expr: "happy", walk: (t * 1.2) % 1, blink: blinkAt(t, 1), t }); g.restore(); }
        line(g, [[180, 1820], [180, 1600]], 10, "#6b4024"); flagCloth(g, 180, 1600, 150, 90, AUSFLAG, t, 1, 4);
      });
      stamp(g, "1967", 540, 330, 150, t, tY - 0.05, tP - 0.05);
      label(g, "AUSTRALIA'S PRIME MINISTER", 540, 330, 54, t, tP, tV - 0.05);
      stamp(g, "VANISHED", 540, 330, 120, t, tV, E(0) + 0.3, { fill: "#cfe0ff" });
    });
    ev(0.2, "splash", 0.5); ev(tY, "boom", 0.5); ev(tV, "drone");
  }
  // 1 — the spearfisherman
  { const t0 = S(1) - 0.1, tH = wt(1, "Harold"), tSp = wt(1, "spearfisherman"), tR = wt(1, "rough");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.1, 0], [4, 540, 1350, 1.16, 0]]);
      layer(g, cam, 0.7, bcB);
      layer(g, cam, 1, (g) => {
        sea(g, 1180, t, -900, 2000, "#3f7fb4", "#1f4f84"); ground(g, 1600, "#e9d6a0", -900, 2000);
        guy(g, HOLT, { x: 420, y: 1820, h: 600, expr: "happy", armR: [2.3, -0.4], blink: blinkAt(t, 1), t });
        line(g, [[560, 1500], [720, 1050]], 8, "#4a4a52"); poly(g, [[712, 1040], [732, 1000], [740, 1056]], "#d6d9df", 4);
        rect(g, 360, 1190, 120, 40, "#2f6f9a", 4, 12);
      });
      label(g, "HAROLD HOLT", 540, 330, 86, t, tH, tSp - 0.05, { font: "Cinzel" });
      label(g, "SPEARFISHERMAN", 540, 330, 80, t, tSp, tR - 0.05);
      label(g, "LOVED ROUGH SURF", 540, 330, 76, t, tR, E(1) + 0.2, { fill: "#cfe9ff" });
    }, { type: "flash", d: 0.2 });
    ev(tSp, "pop"); ev(tR, "splash", 0.6);
  }
  // 2 — December 17, Cheviot Beach
  { const t0 = S(2) - 0.1, tD = wt(2, "December"), tH = wt(2, "heavy"), tC = wt(2, "Cheviot"), tDi = wt(2, "disappeared");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [8, 600, 1300, 1.02, 0]]);
      layer(g, cam, 0.7, bc);
      layer(g, cam, 1, (g) => {
        sea(g, 1180, t, -900, 2000, "#2f6f9a", "#1f4f74");
        const k = clamp((t - tH) / (tDi - tH)), gone = t > tDi + 0.2;
        if (!gone) guy(g, HOLT, { x: lerp(300, 720, k), y: lerp(1700, 1420, k), h: lerp(480, 300, k), expr: "happy", walk: (t * 1.2) % 1, blink: blinkAt(t, 1), t, shadow: false });
        for (let i = 0; i < 4; i++) waves(g, 1260 + i * 110 + Math.sin(t * 2.4 + i) * 30, t * 1.4 + i, -900, 2000, ["#4f8fc4", "#3f7fb4", "#2f6fa4", "#2a5f94"][i], 40);
        ground(g, 1760, "#e9d6a0", -900, 2000);
      });
      label(g, "DECEMBER 17", 540, 330, 86, t, tD, tC - 0.05, { font: "Cinzel" });
      label(g, "CHEVIOT BEACH, VICTORIA", 540, 330, 60, t, tC, tDi - 0.05, { font: "Cinzel", fill: "#cfe9ff" });
      stamp(g, "GONE", 540, 330, 130, t, tDi + 0.2, E(2) + 0.2, { fill: "#cfe0ff" });
    }, { type: "xfade", d: 0.3 });
    ev(tH, "splash"); ev(tDi, "drone");
  }
  // 3 — the search
  { const t0 = S(3) - 0.1, tL = wt(3, "largest"), tN = wt(3, "never");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.85, 0], [6, 540, 1150, 0.9, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -900, -900, 2900, 2100, "#6a8ab0", "#b8c8d8", "#e2e6e6"); sea(g, 1100, t, -900, 2000, "#2f6f9a", "#1f4f74");
        for (let i = 0; i < 3; i++) steamShip(g, { x: -300 + i * 500 + Math.sin(t * 0.4 + i) * 40, y: 1250 + i * 60, h: 160, t, col: "#4a5a6a", super: "#e9e2cc", funnel: "#c0392b", seed: i });
        for (let i = 0; i < 2; i++) { const x = 200 + i * 600 + Math.sin(t * 0.6 + i) * 120, y = 500 + i * 80; rect(g, x - 70, y - 30, 140, 60, "#e2b64b", 5, 30); line(g, [[x - 130 + Math.sin(t * 40) * 40, y - 46], [x + 130 - Math.sin(t * 40) * 40, y - 46]], 6); line(g, [[x, y - 30], [x, y - 46]], 5); line(g, [[x - 60, y], [x - 170, y - 10]], 8, "#e2b64b"); }
        for (let i = 0; i < 4; i++) { const x = 100 + i * 260, q = (t * 0.5 + i * 0.25) % 1; g.save(); g.globalAlpha = 0.8; ell(g, x, 1500 + q * 200, 18, 18, "#3a3a44", 3); for (let k = 0; k < 3; k++) { const qq = (t * 0.8 + k / 3 + i * 0.2) % 1; ell(g, x + 10, 1480 - qq * 150, 8, 8, null, 3); } g.restore(); }
      });
      label(g, "A HUGE SEARCH", 540, 330, 86, t, tL, tN - 0.05);
      stamp(g, "NEVER FOUND", 540, 330, 110, t, tN, E(3) + 0.2, { fill: "#cfe0ff" });
    }, { type: "xfade", d: 0.3 });
    ev(t0, "plane", 0.6); ev(tN, "sting", 0.5);
  }
  // 4 — the tribute: a swimming pool
  { const t0 = S(4) - 0.1, tU = wt(4, "uniquely"), tSw = wt(4, "swimming");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [7, 540, 1300, 1.08, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#9fd0f0", "#f4ead0");
        rect(g, -200, 650, 1480, 450, "#efe6d2", 7); rect(g, 100, 720, 880, 120, "#2f6f9a", 6, 10);
        strokeText(g, "HAROLD HOLT", 540, 755, 50, { font: "Cinzel", fill: "#fff6dc", lw: 0, shadow: false }); strokeText(g, "SWIMMING CENTRE", 540, 810, 40, { font: "Cinzel", fill: "#fff6dc", lw: 0, shadow: false });
        g.fillStyle = "#e9e2cc"; g.fillRect(-900, 1100, 2900, 1500);
        rect(g, -100, 1350, 1280, 460, "#3fb0d8", 8, 10); for (let i = 0; i < 6; i++) line(g, [[-100, 1420 + i * 70], [1180, 1420 + i * 70]], 3, "rgba(255,255,255,0.5)");
        for (let i = 0; i < 3; i++) { const x = 100 + i * 330 + Math.sin(t * 2 + i) * 40; ell(g, x, 1500 + i * 100, 60, 26, "rgba(255,255,255,0.4)", 0); ell(g, x, 1490 + i * 100, 26, 26, SKIN, 4); }
        line(g, [[1100, 1340], [1100, 1100]], 10, "#6b4024"); flagCloth(g, 1100, 1100, 140, 84, AUSFLAG, t, -1, 4);
      });
      label(g, "A UNIQUELY AUSTRALIAN TRIBUTE", 540, 330, 54, t, tU, tSw - 0.05);
      stamp(g, "...A SWIMMING POOL", 540, 330, 96, t, tSw, 999);
    }, { type: "xfade", d: 0.4 });
    ev(tSw, "boing"); ev(tSw, "splash", 0.5);
  }
}
