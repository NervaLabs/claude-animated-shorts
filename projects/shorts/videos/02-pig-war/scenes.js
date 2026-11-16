// 02 — The Pig War (1859)
"use strict";
window.MOOD = "comic";
HATS.kepi = (g, rx, ry, lw, o) => { poly(g, [[-rx * 0.9, -ry * 0.5], [-rx * 0.75, -ry * 1.35], [rx * 0.55, -ry * 1.15], [rx * 0.9, -ry * 0.5]], o.hatCol ?? "#2f3f6f", lw, true); poly(g, [[rx * 0.2, -ry * 0.55], [rx * 1.3, -ry * 0.48], [rx * 0.9, -ry * 0.35]], "#1f1a24", lw * 0.7); };
const US = { tunic: "#2f3f6f", trim: "#e7c15f", helmet: "kepi", trousers: "#6f8fbf", boots: "#1f1a24" };
const UK = { tunic: "#c0262e", trim: "#f2efe6", helmet: "shako", hatCol: "#1f1a24", trousers: "#2a2a3a", boots: "#1f1a24" };
const UKOFF = { ...UK, sash: "#d9c08a", beard: "#c9a35a", helmet: "bicorne" };
function pine(g, x, y, h, col = "#2f6a4a") { line(g, [[x, y], [x, y - h * 0.3]], h * 0.06, "#6b4024"); for (let i = 0; i < 3; i++) poly(g, [[x - h * (0.32 - i * 0.07), y - h * (0.2 + i * 0.25)], [x, y - h * (0.6 + i * 0.25)], [x + h * (0.32 - i * 0.07), y - h * (0.2 + i * 0.25)]], col, 4); }
const farmBg = (g) => {
  sky3(g, -700, -800, 2500, 2200, "#4f86d0", "#a9cdee", "#e6efd8");
  sea(g, 1080, 0, -700, 1800, "#5c9cc8", "#356f9c");
  smoothHills(g, -700, 1800, 1100, 120, "#4f7a4a", 4, 5);
  for (let i = 0; i < 14; i++) pine(g, -650 + i * 180 + rnd(i) * 60, 1120 + rnd(i * 2) * 30, 220 + rnd(i) * 80);
  ground(g, 1250, "#8db45c", -700, 1800);
  // farmhouse + fence
  house(g, 120, 1300, 260, 170, "#e9dcc0", "#7a4a2a", 5);
  for (let x = -600; x < 1800; x += 110) line(g, [[x, 1330], [x, 1250]], 8, "#8a5a32"); line(g, [[-600, 1270], [1800, 1270]], 7, "#8a5a32"); line(g, [[-600, 1305], [1800, 1305]], 7, "#8a5a32");
  // potato patch
  for (let r = 0; r < 4; r++) { g.fillStyle = "#7a5a3a"; g.fillRect(-600, 1420 + r * 120, 2400, 50); }
  paintGrain(g, -700, -800, 2500, 3200, 0.07);
};
function buildShots() {
  const bgF = cached("farm", -700, -800, 2500, 3200, farmBg, 1.2);
  const bgFB = cached("farmB", -700, -800, 2500, 3200, farmBg, 0.8, 5);
  // 0 — hook: two empires, one pig
  { const tY = wt(0, "1859"), tW = wt(0, "war"), tP = wt(0, "pig");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tP - 0.1, 540, 1350, 1.1, 0], [tP + 0.4, 540, 1500, 1.5, 0], [6, 540, 1500, 1.55, 0]]);
      layer(g, cam, 0.7, bgFB);
      layer(g, cam, 1, (g) => {
        pole(g, 90, 1700, 620, FLAGS.usa1859, t, 200, 130); pole(g, 990, 1700, 620, FLAGS.union1801, t, 200, 120);
        guy(g, US, { x: 210, y: 1760, h: 560, expr: t > tW ? "angry" : "determined", look: 0.6, armR: [1.3, -0.3], blink: blinkAt(t, 1), t });
        musket(g, 330, 1500, -1.4, 300);
        guy(g, UK, { x: 870, y: 1760, h: 560, dir: -1, expr: t > tW ? "angry" : "determined", look: 0.6, armR: [1.3, -0.3], blink: blinkAt(t, 2), t });
        musket(g, 750, 1500, -1.75, 300);
        pig(g, { x: 540, y: 1720, h: 150, dir: t > tP ? -1 : 1 });
        potato(g, 640, 1700, 22, 3);
        if (t > tP) shout(g, 540, 1460, "?", 40, clamp((t - tP) / 0.15), "#1c1422");
      });
      stamp(g, "1859", 540, 330, 150, t, tY - 0.05, tW);
      label(g, "USA  vs  BRITAIN", 540, 330, 76, t, tW, E(0) + 0.3);
    });
    ev(tY, "boom"); ev(tW, "drums"); ev(tP, "oink");
  }
  // 1 — San Juan Island; the farmer, the potatoes, the shot
  { const t0 = S(1) - 0.1, tSJ = wt(1, "San"), tA = wt(1, "American"), tSh = wt(1, "shot"), tR = wt(1, "rooting"), tPo = wt(1, "potato");
    shot(t0, (g, t, lt) => {
      const island = t < tA - 0.15;
      if (island) {
        const cam = camAt(lt, [[0, 540, 1000, 0.8, 0], [3, 540, 1050, 0.95, 0]]);
        layer(g, cam, 1, (g) => {
          sky3(g, -700, -800, 2500, 1900, "#4f86d0", "#a9cdee", "#e6efd8"); sea(g, 1000, t, -700, 1800, "#4f94c8", "#2a5f94");
          poly(g, [[-200, 1010], [100, 900], [500, 860], [900, 900], [1300, 1010]], "#5f8a4a", 6, true);
          for (let i = 0; i < 10; i++) pine(g, 0 + i * 110, 960 - Math.sin(i / 9 * Math.PI) * 60, 120);
          poly(g, [[-700, 980], [-300, 800], [0, 960]], "#8d9fc4", 5, true); strokeText(g, "VANCOUVER →", 820, 760, 40, { fill: "#fff", lw: 8 });
        });
        label(g, "SAN JUAN ISLAND", 540, 330, 76, t, tSJ, tA, { font: "Cinzel", fill: "#cfe9ff" });
      } else {
        const cam = camAt(t - tA, [[0, 540, 1350, 1.0, 0], [tSh - tA - 0.1, 600, 1380, 1.1, 0], [tSh - tA + 0.3, 600, 1450, 1.2, 3], [6, 600, 1450, 1.22, 3]]);
        layer(g, cam, 0.8, bgF);
        layer(g, cam, 1, (g) => {
          const dead = t > tSh + 0.05;
          plantRow(g, 500, 1300, 1560, 7, t);
          if (!dead) { for (let i = 0; i < 4; i++) { const k = ((t * 1.5 + i / 4) % 1); potato(g, 900 + k * 120, 1560 - Math.sin(k * Math.PI) * 160, 18, i); } }
          pig(g, { x: 880, y: 1640, h: 190, dir: -1, phase: dead ? null : null, eye: dead ? "x" : null });
          guy(g, { ...OUTF.farmer, beard: "#7a4a2a" }, { x: 260, y: 1760, h: 560, expr: t > tR ? "angry" : "neutral", armR: [1.6, -0.1], armL: [1.4, 0.5], blink: blinkAt(t, 3), t });
          musket(g, 330, 1470, -0.12, 320);
          if (t > tSh) { const k = (t - tSh) / 0.6; boomFx(g, 560, 1450, 80, k * 1.5); smokePuff(g, 590, 1440, 90, k, 5); shout(g, 640, 1180, "BANG!", 70, clamp((t - tSh) / 0.1)); }
        });
        label(g, "AMERICAN FARMER", 540, 330, 66, t, tA, tSh - 0.1);
        label(g, "BRITISH PIG", 540, 330, 66, t, wt(1, "British-owned"), E(1) + 0.2, { fill: "#ffd0d0" });
      }
    }, { type: "flash", d: 0.2 });
    ev(t0, "whoosh"); ev(tSJ, "pop"); ev(tR, "oink"); ev(tSh, "gunshot"); KICKS.push({ t: tSh, a: 20 });
  }
  // 2 — arrest threat; the US Army arrives
  { const t0 = S(2) - 0.1, tAr = wt(2, "arrest"), tUS = wt(2, "U.S."), tPr = wt(2, "protect");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 600, 1300, 1.05, 0], [tUS - t0 - 0.1, 620, 1300, 1.1, 0], [tUS - t0 + 0.5, 420, 1260, 0.9, 0], [8, 420, 1260, 0.92, 0]]);
      layer(g, cam, 0.8, bgF);
      layer(g, cam, 1, (g) => {
        guy(g, UKOFF, { x: 840, y: 1760, h: 580, dir: -1, expr: "angry", armR: [2.4 + 0.15 * Math.sin(t * 10), 0], hold: { l: "scroll" }, blink: blinkAt(t, 5), t });
        if (t > tAr - 0.1) { g.save(); g.globalAlpha = clamp((t - tAr) / 0.2); scroll(g, 760, 1000, 300, 340, "ARREST", 4, 0.06); g.restore(); }
        const n = Math.floor(clamp((t - tUS + 0.2) / 1.8) * 6);
        for (let i = 0; i < 6; i++) { const x = lerp(-700, -360 + i * 120, ss((t - tUS - i * 0.12) / 1.0)); guy(g, US, { x, y: 1700 + (i % 2) * 50, h: 420, expr: "determined", walk: t * 2, armR: [1.3, -0.3], blink: blinkAt(t, 10 + i), t }); musket(g, x + 80, 1700 + (i % 2) * 50 - 260, -1.4, 240); }
        void n;
        guy(g, { ...OUTF.farmer, beard: "#7a4a2a" }, { x: 360, y: 1780, h: 520, expr: t > tUS ? "happy" : "scared", blink: blinkAt(t, 3), t });
        if (t > tPr - 0.2) pole(g, -140, 1650, 560, FLAGS.usa1859, t, 200, 130);
      });
      label(g, "THE U.S. ARMY", 540, 330, 76, t, tUS, E(2) + 0.2, { fill: "#cfe0ff" });
    }, { type: "xfade", d: 0.3 });
    ev(tAr, "pop"); ev(tUS, "drums"); for (let k = 0; k < 6; k++) ev(tUS + k * 0.5, "march", 0.4);
  }
  // 3 — Britain answers: five warships, two thousand men
  { const t0 = S(3) - 0.1, tF = wt(3, "five"), tT = wt(3, "thousand");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.7, 0], [3, 540, 1150, 0.78, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -1000, -1200, 3100, 2300, "#5a7fb8", "#a9c3de", "#dfe6e6"); sea(g, 1100, t, -1000, 2100, "#4a86b8", "#25588a");
        for (let i = 0; i < 5; i++) { const k = ss((t - t0 - 0.1 - i * 0.25) / 0.7); if (k <= 0) continue; sailShip(g, { x: -600 + i * 420 + (1 - k) * 600, y: 1150 + (i % 2) * 140, h: 300 + (i % 2) * 60, t, flag: (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); g.save(); g.scale(0.5, 0.5); unionJack(g, w, h); g.restore(); }, guns: 6, hull: "#2a2a34", stripe: "#e7c15f", seed: i, masts: [[-22, 0.85], [8, 1.0], [34, 0.7]] }); }
        const m = clamp((t - tT) / 1.5);
        for (let i = 0; i < 26; i++) if (i / 26 < m) guy(g, UK, { x: -560 + i * 80, y: 1760 + (i % 2) * 40, h: 220, expr: "determined", blink: 0, t, shadow: true });
      });
      stamp(g, "5 WARSHIPS", 540, 330, 110, t, tF - 0.05, tT - 0.05);
      stamp(g, "2,000+ MEN", 540, 330, 110, t, tT - 0.05, E(3) + 0.3);
    }, { type: "whip", d: 0.3 });
    ev(tF, "horns"); ev(tF, "boom", 0.7); ev(tT, "boom", 0.7); ev(tT, "drums");
  }
  // 4 — months of staring
  { const t0 = S(4) - 0.1, tM = wt(4, "months"), tSt = wt(4, "stared"), tF = wt(4, "fire");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [tF - t0, 540, 1240, 1.35, 0], [8, 540, 1240, 1.4, 0]]);
      layer(g, cam, 0.7, bgFB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 3; i++) { guy(g, US, { x: 60 + i * 120, y: 1700 + i * 40, h: 460 + i * 30, expr: "angry", look: 1, sweat: (t * 0.7 + i * 0.3) % 1, blink: blinkAt(t, i), t }); guy(g, UK, { x: 1020 - i * 120, y: 1700 + i * 40, h: 460 + i * 30, dir: -1, expr: "angry", look: 1, sweat: (t * 0.7 + i * 0.5) % 1, blink: blinkAt(t, 9 + i), t }); }
        // months flipping
        if (t > tM - 0.1) { const mo = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][Math.min(5, Math.floor((t - tM) * 2.4))]; rect(g, 420, 860, 240, 240, "#fff6e6", 7, 14); rect(g, 420, 860, 240, 70, "#c0392b", 7, 14); strokeText(g, mo, 540, 1010, 74, { fill: "#1c1422", lw: 0, shadow: false }); }
        // tumbleweed... a pig-shaped one
        const tx = ((t - t0) * 260) % 1800 - 400; g.save(); g.translate(tx, 1740); g.rotate(t * 4); ell(g, 0, 0, 40, 40, null, 6); line(g, [[-30, -10], [30, 14]], 4); line(g, [[-20, 26], [24, -28]], 4); g.restore();
        if (t > tF) { shout(g, 540, 780, "...", 60, clamp((t - tF) / 0.15), "#1c1422"); }
      });
      label(g, "FOR MONTHS...", 540, 330, 76, t, tM, E(4) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tM, "pop"); ev(tSt, "drone", 0.6); ev(tF, "heartbeat", 0.6);
  }
  // 5 — peace (and one pig with a halo)
  { const t0 = S(5) - 0.1, tC = wt(5, "cooler"), tSe = wt(5, "settled"), tPe = wt(5, "peacefully");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [6, 540, 1270, 1.15, 0]]);
      layer(g, cam, 0.7, bgFB);
      layer(g, cam, 1, (g) => {
        const shake = t > tSe ? Math.sin(t * 14) * 0.25 : 0;
        guy(g, { ...US, sash: "#e7c15f" }, { x: 330, y: 1760, h: 560, expr: t > tC ? "happy" : "neutral", armR: [1.6 + shake, -0.2], blink: blinkAt(t, 1), t });
        guy(g, UKOFF, { x: 750, y: 1760, h: 560, dir: -1, expr: t > tC ? "happy" : "neutral", armR: [1.6 - shake, -0.2], blink: blinkAt(t, 2), t });
        ell(g, 540, 1500 + Math.sin(t * 14) * 6 * (t > tSe ? 1 : 0), 26, 20, INK, 0);
        // the pig, now an angel
        const k = ss((t - tPe) / 0.8), py = 1150 - k * 60 + Math.sin(t * 2) * 12;
        if (k > 0) { g.save(); g.globalAlpha = 0.85 * k; pig(g, { x: 540, y: py, h: 150 }); g.beginPath(); g.ellipse(590, py - 130, 60, 14, 0, 0, TAU); g.lineWidth = 9; g.strokeStyle = "#ffe08a"; g.stroke(); for (const sd of [-1, 1]) ell(g, 520 + sd * 30, py - 110, 40, 22, "#fff", 4, sd * 0.6); g.restore(); }
      });
      label(g, "NO SHOTS FIRED", 540, 330, 76, t, tC, tPe - 0.05);
      stamp(g, "CASUALTIES: 1 PIG", 540, 330, 84, t, tPe, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tC, "ding"); ev(tPe, "choir", 0.6);
  }
}
