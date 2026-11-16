// 50 — The 1966 Palomares Broken Arrow Incident
"use strict";
window.MOOD = "eerie";
function bomber(g, x, y, s, t, rot = 0) { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); smoothPath(g, [[-160 * u, -6 * u], [140 * u, -14 * u], [170 * u, 0], [140 * u, 12 * u], [-160 * u, 8 * u]]); fillInk(g, "#9aa0a8", 5); poly(g, [[-150 * u, -6 * u], [-180 * u, -60 * u], [-150 * u, -60 * u], [-120 * u, -8 * u]], "#9aa0a8", 5); poly(g, [[-40 * u, 0], [60 * u, 0], [-60 * u, 60 * u], [-110 * u, 60 * u]], "#8a9098", 5); for (const ex of [-30, 0]) ell(g, (ex - 40) * u, 40 * u, 18 * u, 7 * u, "#6a7078", 3); g.restore(); }
function tanker(g, x, y, s, t) { jet(g, { x, y, h: s, col: "#b9c0c8", stripe: "#3a5a8a" }); line(g, [[x - 120 * s / 100, y + 14 * s / 100], [x - 60 * s / 100, y + 90 * s / 100]], 6 * s / 100, "#5a5f66"); }
function hbomb(g, x, y, s, rot = 0, chute = 0) { const u = s / 100; g.save(); g.translate(x, y); if (chute > 0) { g.save(); g.globalAlpha = chute; g.beginPath(); g.arc(0, -120 * u, 70 * u, Math.PI, 0); fillInk(g, "#f6f3ea", 4); for (const dx of [-60, -20, 20, 60]) line(g, [[dx * u, -120 * u], [0, -30 * u]], 2); g.restore(); } g.rotate(rot); rect(g, -16 * u, -40 * u, 32 * u, 80 * u, "#8a8f96", 4, 14 * u); for (const sd of [-1, 1]) poly(g, [[sd * 16 * u, 30 * u], [sd * 30 * u, 50 * u], [sd * 16 * u, 40 * u]], "#6a7078", 3); g.restore(); }
const village = (g) => { sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#9fd0f0", "#f4ead0"); smoothHills(g, -900, 2000, 1150, 200, "#c9a86a", 3, 5); g.fillStyle = "#2fa0c8"; g.fillRect(1100, 1150, 900, 600); for (let i = 0; i < 9; i++) { const x = -600 + i * 180; rect(g, x, 1260, 140, 100, "#f6f3ea", 4); rect(g, x + 50, 1300, 30, 60, "#5a7a9a", 3); } ground(g, 1360, "#d9b88a", -900, 1100); for (let r = 0; r < 4; r++) plantRow(g, -800, 900, 1500 + r * 140, 10, 0, "#7a9a4a"); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const vl = cached("palo", -900, -900, 2900, 3400, village, 1.0);
  const skyC = cached("sky50", -900, -1200, 2900, 3600, (g) => sky3(g, -900, -1200, 2900, 3600, "#3f78c8", "#8ec0ea", "#dfeef6"), 0.6);
  // 0 — hook: four H-bombs over a fishing village
  { const tY = wt(0, "1966"), tF = wt(0, "four"), tV = wt(0, "village");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.9, 0], [8, 540, 1150, 0.96, 0]]);
      layer(g, cam, 0.8, vl);
      layer(g, cam, 1, (g) => { if (t > tF - 0.3) for (let i = 0; i < 4; i++) { const k = clamp((t - tF + 0.3 - i * 0.2) / 3); hbomb(g, 200 + i * 220, lerp(200, 900, k), 120, Math.sin(t * 2 + i) * 0.1, i < 2 ? 1 : 0.6); } });
      stamp(g, "1966", 540, 330, 150, t, tY - 0.05, tF - 0.05);
      stamp(g, "4 HYDROGEN BOMBS", 540, 330, 92, t, tF, tV - 0.05, { fill: "#cfe0ff" });
      label(g, "OVER A FISHING VILLAGE", 540, 330, 62, t, tV, E(0) + 0.3);
    });
    ev(tY, "boom", 0.5); ev(tF, "whistlefall"); ev(tV, "drone", 0.5);
  }
  // 1 — refueling goes wrong
  { const t0 = S(1) - 0.1, tR = wt(1, "refueling"), tP = wt(1, "Palomares"), tC = wt(1, "collided");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 960, 1.0, 0], [tC - t0, 540, 960, 1.1, 0], [tC - t0 + 0.3, 540, 960, 1.0, 4], [6, 540, 960, 1.02, 4]]);
      layer(g, cam, 0.5, (g) => { skyC(g); clouds(g, t * 10, 1300, 5, 7, "#fff", 1.2); });
      layer(g, cam, 1, (g) => {
        const k = clamp((t - t0) / (tC - t0));
        if (t < tC) { tanker(g, 540, 640, 260, t); bomber(g, 520 + (1 - k) * 60, lerp(1120, 860, k), 380, t); }
        else { boomFx(g, 540, 780, 420, (t - tC) / 0.8); bomber(g, 420 - (t - tC) * 80, 900 + (t - tC) * 300, 340, t, 0.3 + (t - tC) * 0.4); jet(g, { x: 700 + (t - tC) * 100, y: 620 + (t - tC) * 280, h: 220, col: "#b9c0c8", rot: -0.4 - (t - tC) * 0.5 }); smokePuff(g, 540, 780, 260, (t - tC) / 1.6, 3, "#5a5a62"); }
      });
      label(g, "MID-AIR REFUELING", 540, 330, 76, t, tR, tP - 0.05);
      label(g, "PALOMARES, SPAIN", 540, 330, 76, t, tP, tC - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "COLLISION", 540, 330, 120, t, tC, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(t0, "plane"); ev(tC, "boom"); ev(tC + 0.05, "crash"); KICKS.push({ t: tC, a: 24 });
  }
  // 2 — all four fall
  { const t0 = S(2) - 0.1, tF = wt(2, "fell");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 960, 1.0, 0], [3, 540, 1000, 1.05, 0]]);
      layer(g, cam, 0.5, (g) => { skyC(g); clouds(g, t * 10, 300, 5, 3, "#fff", 1.2); });
      layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) hbomb(g, 200 + i * 220, 600 + ((t - t0) * 300 + i * 80) % 900, 160, Math.sin(t * 3 + i) * 0.15, i % 2 ? 1 : 0); });
      speedLines(g, t, 14, "rgba(255,255,255,0.4)");
      stamp(g, "ALL 4 FELL", 540, 330, 120, t, tF - 0.2, E(2) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(t0, "whistlefall");
  }
  // 3 — two scatter plutonium; one into the sea
  { const t0 = S(3) - 0.1, tTw = wt(3, "Two"), tPl = wt(3, "plutonium"), tO = wt(3, "one"), tM = wt(3, "Mediterranean");
    shot(t0, (g, t, lt) => {
      const sea2 = t > tO - 0.2;
      const cam = sea2 ? camAt(t - tO + 0.2, [[0, 1300, 1300, 1.0, 0], [5, 1300, 1300, 1.06, 0]]) : camAt(lt, [[0, 300, 1350, 1.0, 0], [6, 300, 1350, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        vl(g);
        if (!sea2) { for (let i = 0; i < 2; i++) { const tk = tTw + i * 0.5; boomFx(g, 100 + i * 400, 1580, 160, (t - tk) / 0.6); if (t > tk + 0.3) { g.save(); g.globalAlpha = 0.5; g.fillStyle = rgrad(g, 100 + i * 400, 1600, 0, 300, [[0, "rgba(150,230,120,0.7)"], [1, "rgba(150,230,120,0)"]]); g.fillRect(-300 + i * 400, 1300, 800, 600); g.restore(); for (let k = 0; k < 8; k++) ell(g, 100 + i * 400 + Math.cos(k) * 160 * clamp((t - tk) / 1.5), 1600 + Math.sin(k * 2) * 60, 8, 8, "#9fe080", 2); } } }
        else { waves(g, 1400, t, 1000, 2000, "#2fa0c8", 10); const k = clamp((t - tO) / 1.2); hbomb(g, 1300, lerp(900, 1500, k), 140, 0.2, 1 - k); if (k >= 1) { g.save(); g.globalAlpha = clamp(1 - (t - tO - 1.2) / 0.8); ell(g, 1300, 1420, 80, 160, "#cfe9f6", 4); g.restore(); } }
      });
      label(g, "2 CONVENTIONAL BLASTS", 540, 330, 66, t, tTw, tPl - 0.05);
      stamp(g, "PLUTONIUM SCATTERED", 540, 330, 82, t, tPl, tO - 0.2, { fill: "#d9f2a0" });
      label(g, "1 INTO THE MEDITERRANEAN", 540, 330, 58, t, tM - 0.2, E(3) + 0.2, { fill: "#cfe9ff" });
    }, { type: "xfade", d: 0.3 });
    ev(tTw, "boom"); ev(tTw + 0.5, "boom"); ev(tO + 1.2, "splash");
  }
  // 4 — 80 days and a mini-sub
  { const t0 = S(4) - 0.1, tE = wt(4, "eighty"), tS = wt(4, "submarine"), tR = wt(4, "recover");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = vgrad(g, -500, 2400, [[0, "#2f7fb0"], [1, "#0f2a40"]]); g.fillRect(-500, -500, 2100, 3000);
        for (let i = 0; i < 12; i++) { const q = (t * 0.3 + i / 12) % 1; ell(g, rnd(i) * 1080, 1900 - q * 1600, 8, 8, "rgba(255,255,255,0.4)", 0); }
        smoothHills(g, -500, 1600, 1900, 200, "#3a4a4a", 4, 5);
        const sx = 300 + Math.sin(t * 0.6) * 120, sy = 1100 + Math.sin(t * 0.9) * 40;
        g.save(); g.translate(sx, sy); smoothPath(g, [[-110, 0], [-80, -60], [80, -60], [120, 0], [80, 50], [-80, 50]]); fillInk(g, "#f6f3ea", 6); ell(g, 60, -10, 26, 26, "#5ac8f0", 5); rect(g, -30, -100, 60, 44, "#f6f3ea", 5, 8); g.restore();
        g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, sx + 140, sy + 60, 0, 300, [[0, "rgba(255,240,180,0.35)"], [1, "rgba(255,240,180,0)"]]); g.fillRect(sx - 200, sy - 300, 800, 800); g.restore();
        hbomb(g, 760, 1640, 160, 1.2, 0);
        const d = Math.min(80, Math.floor(clamp((t - tE + 0.3) / 2.5) * 80)) || 1; rect(g, 620, 600, 380, 170, "#fff6e6", 7, 14); strokeText(g, `DAY ${d}`, 810, 685, 70, { font: "Cinzel", fill: "#1c1422", lw: 0, shadow: false });
      });
      label(g, "A MINI-SUBMARINE", 540, 330, 76, t, tS, tR - 0.05);
      stamp(g, "FOUND ON DAY 80", 540, 330, 96, t, tR, 999);
    }, { type: "xfade", d: 0.4 });
    ev(tE, "drone"); ev(tS, "bubble"); ev(tR, "ding");
  }
}
