// 14 — The Year Without a Summer (1816)
"use strict";
window.MOOD = "eerie";
const snowFall = (g, t, a = 0.9) => { g.save(); g.globalAlpha = a; g.fillStyle = "#fff"; for (let i = 0; i < 120; i++) { const x = (rnd(i) * 1300 + Math.sin(t + i) * 30) % 1300 - 100, y = (rnd(i * 3) * 2100 + t * 160 * (0.6 + rnd(i * 7) * 0.6)) % 2100 - 100; g.beginPath(); g.arc(x, y, 4 + rnd(i * 5) * 5, 0, TAU); g.fill(); } g.restore(); };
const farmSnow = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#8a96a8", "#b9c2cc", "#dfe4ea");
  smoothHills(g, -900, 2000, 1150, 160, "#e9eef4", 3, 5);
  house(g, 300, 1300, 360, 240, "#c0392b", "#f4f6fa", 6); ground(g, 1300, "#eef2f6", -900, 2000);
  for (let i = 0; i < 6; i++) { line(g, [[-600 + i * 380, 1700], [-600 + i * 380, 1560]], 10, "#5f8a3a"); ell(g, -600 + i * 380, 1560, 40, 26, "#f4f6fa", 4); }
  paintGrain(g, -900, -900, 2900, 3400, 0.06);
};
function buildShots() {
  const farm = cached("snowfarm", -900, -900, 2900, 3400, farmSnow, 1.0);
  const farmB = cached("snowfarmB", -900, -900, 2900, 3400, farmSnow, 0.7, 5);
  // 0 — hook: snow in June
  { const tY = wt(0, "1816"), tS = wt(0, "snow"), tJ = wt(0, "June"), tE = wt(0, "Europe");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [5, 540, 1300, 1.08, 0]]);
      layer(g, cam, 0.7, farmB);
      layer(g, cam, 1, (g) => {
        guy(g, { ...OUTF.farmer, tunic: "#7a5a3a" }, { x: 330, y: 1780, h: 560, expr: "shock", look: -0.8, headTilt: -8, armR: [2.0, 1.4], armL: [-2.0, -1.4], bob: Math.sin(t * 40) * 1.2, blink: 0, t });
        rect(g, 640, 1000, 300, 300, "#fff6e6", 7, 14); rect(g, 640, 1000, 300, 80, "#c0392b", 7, 14); strokeText(g, "JUNE", 790, 1040, 46, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, "6", 790, 1190, 110, { fill: "#1c1422", lw: 0, shadow: false });
        if (t > tE) { rect(g, 640, 1400, 300, 160, "#b9864a", 6, 20); strokeText(g, "EMPTY", 790, 1480, 54, { fill: "#fff6dc" }); }
      });
      snowFall(g, t);
      stamp(g, "1816", 540, 330, 150, t, tY - 0.05, tS);
      label(g, "SNOW... IN JUNE", 540, 330, 86, t, tS, tE - 0.05, { fill: "#cfe9ff" });
      label(g, "EUROPE STARVES", 540, 330, 86, t, tE, E(0) + 0.3, { fill: "#ffd0c0" });
      void tJ;
    });
    ev(0.1, "drone", 0.6); ev(tY, "boom", 0.6);
  }
  // 1 — Tambora erupts
  { const t0 = S(1) - 0.1, tT = wt(1, "Tambora"), tEr = wt(1, "erupted"), tL = wt(1, "largest");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tEr - t0, 540, 1250, 1.0, 0], [tEr - t0 + 0.6, 540, 1000, 0.7, 0], [8, 540, 1000, 0.72, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -900, -1500, 2900, 2800, t > tEr ? "#3a2a2a" : "#3f86d6", t > tEr ? "#8a4a3a" : "#9fd0f0", t > tEr ? "#e98a5a" : "#f4e6c0");
        sea(g, 1300, t, -900, 2000, "#2fa0c8", "#1f6f9a");
        poly(g, [[-200, 1310], [380, 760], [700, 760], [1280, 1310]], "#7a5a4a", 7);
        poly(g, [[380, 760], [460, 820], [540, 780], [620, 830], [700, 760]], "#4a2a22", 5);
        palm(g, -50, 1300, 220, 5, t); palm(g, 1150, 1300, 200, 5, t);
        if (t > tEr) { const k = clamp((t - tEr) / 2.5); for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (rnd(i) - 0.5) * 1.4, d = k * (400 + rnd(i * 3) * 900); ell(g, 540 + Math.cos(a) * d * 0.6, 760 + Math.sin(a) * d, 90 + k * 160 * rnd(i * 5), 80 + k * 120 * rnd(i * 7), ["#5a4a4a", "#6a5a5a", "#4a3a3a"][i % 3], 5); } boomFx(g, 540, 740, 300, (t - tEr) / 0.7); for (let i = 0; i < 6; i++) { const q = (t * 1.5 + i / 6) % 1; ell(g, 540 + Math.cos(i * 1.1) * q * 500, 740 - Math.sin(i * 0.5 + 0.3) * q * 400 + q * q * 500, 20, 20, "#ff8a1e", 4); } }
      });
      label(g, "MOUNT TAMBORA, INDONESIA", 540, 330, 56, t, tT, tL - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "LARGEST ERUPTION IN RECORDED HISTORY", 540, 330, 42, t, tL, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tT, "rumble"); ev(tEr, "boom"); ev(tEr + 0.1, "crash"); KICKS.push({ t: tEr, a: 28 });
  }
  // 2 — the sky goes dark; temperatures drop
  { const t0 = S(2) - 0.1, tA = wt(2, "ash"), tN = wt(2, "Northern"), tD = wt(2, "dropping");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1000, 1.0, 0], [7, 540, 1000, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#0e1230"; g.fillRect(-500, -500, 2100, 3000);
        for (let i = 0; i < 80; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.3 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 1600 - 300, rnd(i * 7) * 2400 - 300, 3, 3); } g.globalAlpha = 1;
        const dim = clamp((t - tA) / 3);
        sunGlow(g, 950, 300, 70, `255,${Math.round(220 - dim * 80)},${Math.round(150 - dim * 60)}`);
        // the globe
        g.save(); g.beginPath(); g.arc(540, 1050, 380, 0, TAU); g.clip();
        g.fillStyle = "#3f86c8"; g.fillRect(100, 600, 900, 900);
        for (const [x, y, rx, ry] of [[400, 900, 160, 110], [700, 880, 200, 120], [600, 1180, 110, 160], [330, 1160, 80, 140]]) ell(g, x, y, rx, ry, "#6f9a4a", 5);
        g.fillStyle = `rgba(60,50,50,${0.75 * dim})`; g.fillRect(100, 600, 900, 450 * clamp(0.3 + dim));
        g.restore();
        g.beginPath(); g.arc(540, 1050, 380, 0, TAU); g.lineWidth = 8; g.strokeStyle = INK; g.stroke();
        // thermometer
        const k = clamp((t - tD + 0.4) / 1.4); rect(g, 960, 900, 60, 420, "#f6f3ea", 6, 30); ell(g, 990, 1340, 50, 50, "#3f86c8", 6); rect(g, 975, 1310 - 380 * (0.8 - 0.55 * k), 30, 380 * (0.8 - 0.55 * k), "#3f86c8", 0, 15);
      });
      label(g, "ASH + SULFUR", 540, 330, 86, t, tA, tN - 0.05);
      label(g, "NORTHERN HEMISPHERE: DIMMED", 540, 330, 50, t, tN, tD - 0.05);
      stamp(g, "TEMPERATURES DROP", 540, 330, 82, t, tD, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tA, "drone"); ev(tD, "whistlefall", 0.5);
  }
  // 3 — failed crops, frozen lakes, and Frankenstein
  { const t0 = S(3) - 0.1, tCr = wt(3, "Crops"), tL = wt(3, "lakes"), tM = wt(3, "Mary"), tFr = wt(3, "Frankenstein");
    shot(t0, (g, t, lt) => {
      const ph = t < tL - 0.15 ? 0 : t < tM - 0.15 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [10, 540, 1280, 1.1, 0]]);
      if (ph === 0) {
        layer(g, cam, 0.7, farmB);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 7; i++) { const x = 100 + i * 150; line(g, [[x, 1800], [x + 10, 1600], [x + 60, 1640]], 10, "#8a7a4a"); ell(g, x + 60, 1650, 26, 14, "#a89a5a", 4, 0.8); } });
        label(g, "CROPS FAILED", 540, 330, 96, t, tCr, tL);
      } else if (ph === 1) {
        layer(g, cam, 1, (g) => { sky3(g, -500, -500, 2100, 1700, "#8a96a8", "#b9c2cc", "#dfe4ea"); smoothHills(g, -500, 1600, 1150, 200, "#e9eef4", 4, 5); ell(g, 540, 1500, 700, 220, "#cfe9f6", 7); for (let i = 0; i < 6; i++) line(g, [[200 + i * 120, 1450], [260 + i * 120, 1560]], 4, "#ffffff"); guy(g, { ...OUTF.townsman, tunic: "#7a3a3a" }, { x: 540, y: 1520, h: 420, expr: "happy", walk: (t * 0.6) % 1, lean: 8, armR: [2.0, 0], armL: [-2.0, 0], blink: blinkAt(t, 1), t }); rect(g, 760, 900, 260, 260, "#fff6e6", 7, 14); rect(g, 760, 900, 260, 70, "#c0392b", 7, 14); strokeText(g, "JULY", 890, 936, 40, { fill: "#fff", lw: 0, shadow: false }); });
        label(g, "FROZEN LAKES IN JULY", 540, 330, 70, t, tL, tM - 0.15, { fill: "#cfe9ff" });
      } else {
        layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#3a2a3a"], [1, "#5a4a4a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 600, 500, 380, 520, "#4a5a7a", 8, 4); line(g, [[790, 500], [790, 1020]], 7); line(g, [[600, 760], [980, 760]], 7); rain(g, t); });
        layer(g, cam, 1, (g) => {
          rect(g, 140, 1450, 800, 60, "#6b4024", 6, 6);
          guy(g, { tunic: "#3a2a4a", trim: "#d9c08a", hair: "#7a4a2a", bob: true, robe: true, lady: true }, { x: 330, y: 1720, h: 560, expr: "determined", look: 0.6, armR: [1.7, -0.9], blink: blinkAt(t, 1), t });
          rect(g, 450, 1380, 220, 70, "#f6ead0", 5, 4); line(g, [[560, 1300], [600, 1400]], 6, "#f6f3ea"); rect(g, 820, 1350, 30, 100, "#f2efe6", 4, 4); flame(g, 835, 1345, 14, t);
          if (t > tFr - 0.2) { g.save(); g.translate(560, 1020); g.scale(easeBack(clamp((t - tFr + 0.2) / 0.3)), easeBack(clamp((t - tFr + 0.2) / 0.3))); rect(g, -150, -200, 300, 400, "#3a5a3a", 8, 10); strokeText(g, "FRANKEN-", 0, -40, 44, { font: "Cinzel", fill: "#e7c15f", lw: 0, shadow: false }); strokeText(g, "STEIN", 0, 20, 44, { font: "Cinzel", fill: "#e7c15f", lw: 0, shadow: false }); g.restore(); }
        });
        label(g, "MARY SHELLEY", 540, 330, 80, t, tM, tFr - 0.2, { font: "Cinzel" });
      }
    }, { type: "xfade", d: 0.3 });
    ev(tCr, "boing", 0.5); ev(tL, "crack"); ev(tFr, "choir", 0.6); ev(tFr, "boom", 0.5);
  }
}
