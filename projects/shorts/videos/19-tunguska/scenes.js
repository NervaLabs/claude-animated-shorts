// 19 — The Tunguska Event (1908)
"use strict";
window.MOOD = "eerie";
const taiga = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#3a4a7a", "#d98a6a", "#f2c48a");
  smoothHills(g, -900, 2000, 1150, 160, "#4a5a5a", 3, 5);
  for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) { const x = -880 + i * 170 + (r % 2) * 80, y = 1220 + r * 120; poly(g, [[x - 40 - r * 8, y], [x, y - 160 - r * 30], [x + 40 + r * 8, y]], ["#2f4a3a", "#2a4234", "#35503e"][(i + r) % 3], 4); }
  ground(g, 1650, "#3a4a32", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function fireball(g, x, y, r, t, ang = 0.5) {
  for (let i = 0; i < 10; i++) { const k = i / 10; g.save(); g.globalAlpha = (1 - k) * 0.7; ell(g, x - Math.cos(ang) * k * r * 8, y - Math.sin(ang) * k * r * 8, r * (1 - k * 0.6), r * (1 - k * 0.6), i < 3 ? "#ffd24a" : "#ff8a1e", 0); g.restore(); }
  g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, x, y, 0, r * 4, [[0, "rgba(255,240,200,0.9)"], [1, "rgba(255,200,120,0)"]]); g.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); g.restore();
  ell(g, x, y, r, r, "#fff6c8", 4);
}
function buildShots() {
  const tg = cached("taiga", -900, -900, 2900, 3400, taiga, 1.0);
  // 0 — hook
  { const tY = wt(0, "1908"), tS = wt(0, "Siberia"), tT = wt(0, "thousand");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.9, 0], [6, 540, 1150, 0.98, 0]]);
      layer(g, cam, 1, (g) => { tg(g); const k = (t - 1.0) / 1.2; boomFx(g, 540, 700, 700, k); if (k > 0 && k < 0.15) { g.fillStyle = "rgba(255,255,240,0.7)"; g.fillRect(-900, -900, 2900, 3400); } });
      stamp(g, "1908", 540, 330, 150, t, tY - 0.05, tS - 0.05);
      label(g, "SIBERIA", 540, 330, 96, t, tS, tT - 0.05, { font: "Cinzel", fill: "#cfe0ff" });
      stamp(g, "× 1,000 HIROSHIMA", 540, 330, 90, t, tT, E(0) + 0.3);
    });
    ev(1.0, "boom"); ev(1.05, "crash"); KICKS.push({ t: 1.0, a: 26 }); ev(tT, "boom", 0.5);
  }
  // 1 — a fireball streaks in and detonates in mid-air
  { const t0 = S(1) - 0.1, tJ = wt(1, "June"), tF = wt(1, "fireball"), tD = wt(1, "detonated"), tTu = wt(1, "Tunguska");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.9, 0], [8, 540, 1100, 0.96, 0]]);
      layer(g, cam, 1, (g) => {
        tg(g);
        const k = clamp((t - tF + 0.4) / (tD - tF + 0.4));
        if (t < tD) fireball(g, lerp(-300, 560, k), lerp(-200, 700, k), 40 + k * 30, t);
        else { boomFx(g, 560, 700, 800, (t - tD) / 1.3); const r = (t - tD) * 1300; g.beginPath(); g.arc(560, 700, r, 0, TAU); g.lineWidth = 16; g.strokeStyle = `rgba(255,240,200,${clamp(1 - (t - tD) / 1.5)})`; g.stroke(); if (t - tD < 0.12) { g.fillStyle = "rgba(255,255,240,0.8)"; g.fillRect(-900, -900, 2900, 3400); } }
      });
      label(g, "JUNE 30, EARLY MORNING", 540, 330, 62, t, tJ, tF - 0.05);
      label(g, "A FIREBALL", 540, 330, 96, t, tF, tD - 0.05, { fill: "#ffd08a" });
      label(g, "MID-AIR DETONATION", 540, 330, 72, t, tD, tTu);
      label(g, "TUNGUSKA FOREST", 540, 330, 80, t, tTu, E(1) + 0.2, { font: "Cinzel", fill: "#cfe0ff" });
    }, { type: "xfade", d: 0.3 });
    ev(tF - 0.4, "whoosh"); ev(tD, "boom"); ev(tD + 0.05, "crash"); KICKS.push({ t: tD, a: 30 });
  }
  // 2 — 80 million trees flattened, no crater
  { const t0 = S(2) - 0.1, tE = wt(2, "eighty"), tR = wt(2, "radial"), tN = wt(2, "crater");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 1.4, 0], [tR - t0, 540, 1100, 0.8, 0], [9, 540, 1100, 0.78, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#4a5a3a"; g.fillRect(-900, -900, 2900, 3800); paintGrain(g, -900, -900, 2900, 3800, 0.12);
        const k = clamp((t - t0) / 1.2);
        for (let i = 0; i < 260; i++) { const a = rnd(i) * TAU, d = 150 + rnd(i * 3) * 1100; if (d > k * 1400) continue; const x = 540 + Math.cos(a) * d, y = 1100 + Math.sin(a) * d; line(g, [[x, y], [x + Math.cos(a) * 60, y + Math.sin(a) * 60]], 10, "#6b4a2a"); ell(g, x + Math.cos(a) * 66, y + Math.sin(a) * 66, 16, 10, "#2f4a3a", 3, a); }
        for (let i = 0; i < 20; i++) { const a = (i / 20) * TAU; line(g, [[540 + Math.cos(a) * 40, 1100 + Math.sin(a) * 40], [540 + Math.cos(a) * 150, 1100 + Math.sin(a) * 150]], 10, "#6b4a2a"); }
        if (t > tN - 0.1) { g.save(); g.setLineDash([24, 18]); g.beginPath(); g.arc(540, 1100, 120, 0, TAU); g.lineWidth = 10; g.strokeStyle = "#ffe08a"; g.stroke(); g.restore(); strokeText(g, "?", 540, 1100, 140, { fill: "#ffe08a" }); }
      });
      stamp(g, "80,000,000 TREES", 540, 330, 92, t, tE, tR - 0.05);
      label(g, "800 SQUARE MILES", 540, 460, 66, t, wt(2, "eight", 1), tN - 0.1);
      stamp(g, "NO CRATER", 540, 330, 120, t, tN - 0.05, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tE, "boom", 0.5); ev(tN, "sting", 0.6);
  }
  // 3 — the theory: it burst before landing
  { const t0 = S(3) - 0.1, tM = wt(3, "meteor"), tDi = wt(3, "disintegrated");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1000, 1.0, 0], [7, 540, 1000, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = vgrad(g, -500, 2400, [[0, "#06081e"], [0.6, "#1f2a5a"], [1, "#5a7ab0"]]); g.fillRect(-500, -500, 2100, 3000);
        for (let i = 0; i < 80; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.3 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 1600 - 300, rnd(i * 7) * 1600 - 300, 3, 3); } g.globalAlpha = 1;
        g.save(); g.beginPath(); g.arc(540, 2900, 1500, 0, TAU); g.fillStyle = "#3f86c8"; g.fill(); g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); g.globalAlpha = 0.35; g.beginPath(); g.arc(540, 2900, 1620, 0, TAU); g.lineWidth = 120; g.strokeStyle = "#9fd0f0"; g.stroke(); g.restore();
        const k = clamp((t - tM + 0.3) / (tDi - tM + 0.3));
        if (t < tDi) { const x = lerp(1100, 560, k), y = lerp(200, 1250, k); g.save(); g.translate(x, y); smoothPath(g, [[-60, -20], [-20, -60], [40, -40], [60, 20], [10, 60], [-50, 40]]); fillInk(g, "#7a6a5a", 6); g.restore(); fireball(g, x, y, 30 * k, t, -2.1); }
        else for (let i = 0; i < 12; i++) { const q = clamp((t - tDi) / 1.2), a = (i / 12) * TAU; smoothPath(g, [[560 + Math.cos(a) * q * 300 - 14, 1250 + Math.sin(a) * q * 200], [560 + Math.cos(a) * q * 300, 1250 + Math.sin(a) * q * 200 - 14], [560 + Math.cos(a) * q * 300 + 14, 1250 + Math.sin(a) * q * 200]]); fillInk(g, "#7a6a5a", 3); boomFx(g, 560, 1250, 260, (t - tDi) / 0.6); }
      });
      label(g, "A METEOR OR COMET FRAGMENT", 540, 330, 54, t, tM, tDi - 0.05);
      stamp(g, "IT BURST IN THE AIR", 540, 330, 84, t, tDi, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tM - 0.3, "whoosh"); ev(tDi, "boom", 0.8); ev(tDi, "crack");
  }
}
