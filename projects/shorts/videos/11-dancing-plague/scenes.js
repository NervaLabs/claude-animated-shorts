// 11 — The Dancing Plague of 1518
"use strict";
window.MOOD = "eerie";
const PEOPLE = [
  { tunic: "#9a4a6a", trim: "#f2efe6", helmet: "coif", hatCol: "#f3ecda", robe: true, lady: true },
  { tunic: "#5a7a9a", trim: "#d9c08a", hair: "#5a3b2a", trousers: "#3a3a4a" },
  { tunic: "#7a5a3a", trim: "#d9c08a", helmet: "cap", hatCol: "#6a8a4a", trousers: "#5a4a3a" },
  { tunic: "#4f7a4a", trim: "#f2efe6", helmet: "coif", hatCol: "#e9d9b0", robe: true, lady: true },
  { tunic: "#a85a3a", trim: "#f2efe6", hair: "#c58a3d", trousers: "#3a3a4a" },
];
const TROFFEA = { tunic: "#3e78c2", trim: "#f2efe6", helmet: "coif", hatCol: "#f6f3ea", robe: true, lady: true };
function crowd(g, t, n, x0, x1, y0, h, seed = 0, collapsed = 0) {
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, rnd(seed + i * 1.3)), y = y0 + rnd(seed + i * 2.1) * 220, o = PEOPLE[i % 5];
    if (i < collapsed) guy(g, o, { x, y: y + 20, h: h * 0.9, sit: true, lean: -70, expr: "closed", hideArms: true, t, shadow: true });
    else guy(g, o, { x, y, h: h + (y - y0) * 0.3, expr: i % 3 ? "sick" : "scared", ...danceState(t, i), blink: 0, t, sweat: (t * 0.7 + i * 0.3) % 1 });
  }
}
function buildShots() {
  const town = cached("town11", -900, -1300, 2900, 3700, (g) => medievalTown(g, -900, 2000, 1350, 3), 1.0);
  const townB = cached("town11B", -900, -1300, 2900, 3700, (g) => medievalTown(g, -900, 2000, 1350, 3), 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1518"), tD = wt(0, "danced"), tC = wt(0, "collapsed");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.0, 0], [5, 540, 1450, 1.1, 0]]);
      layer(g, cam, 0.7, townB);
      layer(g, cam, 1, (g) => crowd(g, t, 12, -100, 1180, 1500, 330, 3, t > tC ? 3 : 0));
      stamp(g, "1518", 540, 330, 150, t, tY - 0.05, tD);
      label(g, "DANCED UNTIL THEY COLLAPSED", 540, 330, 52, t, tD, E(0) + 0.3);
    });
    ev(tY, "boom"); ev(tC, "boing", 0.5);
  }
  // 1 — Strasbourg; Frau Troffea dances in silence
  { const t0 = S(1) - 0.1, tSt = wt(1, "Strasbourg"), tF = wt(1, "Frau"), tDa = wt(1, "dancing"), tSi = wt(1, "silently");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 760, 1000, 0.75, 0], [tF - t0, 600, 1350, 1.0, 0], [tSi - t0, 560, 1300, 1.25, 0], [9, 560, 1300, 1.28, 0]]);
      layer(g, cam, 0.85, town);
      layer(g, cam, 1, (g) => {
        guy(g, TROFFEA, { x: 560, y: 1700, h: 560, expr: t > tDa ? "sick" : "neutral", ...(t > tDa - 0.2 ? danceState(t, 0) : {}), blink: blinkAt(t, 1), t });
        for (let i = 0; i < 2; i++) guy(g, PEOPLE[i + 1], { x: 140 + i * 800, y: 1660, h: 420, dir: i ? -1 : 1, expr: "shock", look: i ? -0.6 : 0.6, blink: blinkAt(t, 5 + i), t });
        if (t > tSi) { g.save(); g.globalAlpha = clamp((t - tSi) / 0.2); ell(g, 820, 980, 90, 90, "#fff", 7); strokeText(g, "♪", 820, 980, 100, { font: "serif", fill: "#1c1422", lw: 0, shadow: false }); line(g, [[756, 916], [884, 1044]], 12, "#c0262e"); g.restore(); }
      });
      label(g, "STRASBOURG", 540, 330, 86, t, tSt, tF - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      label(g, "FRAU TROFFEA", 540, 330, 80, t, tF, tSi - 0.05, { font: "Cinzel" });
      label(g, "NO MUSIC", 540, 330, 90, t, tSi, E(1) + 0.2, { fill: "#ffd0c0" });
    }, { type: "flash", d: 0.2 });
    ev(tSt, "pop"); ev(tF, "pop"); ev(tSi, "drone", 0.6);
  }
  // 2 — 34 ... 400
  { const t0 = S(2) - 0.1, t34 = wt(2, "thirty-four"), tM = wt(2, "month"), t4 = wt(2, "four");
    shot(t0, (g, t, lt) => {
      const big = t > t4 - 0.2;
      const cam = camAt(lt, [[0, 540, 1450, 1.0, 0], [t4 - t0 - 0.2, 540, 1450, 1.0, 0], [t4 - t0 + 0.6, 540, 1350, 0.7, 0], [9, 540, 1350, 0.72, 0]]);
      layer(g, cam, 0.8, townB);
      layer(g, cam, 1, (g) => crowd(g, t, big ? 40 : t > t34 - 0.2 ? 14 : 3, big ? -700 : -100, big ? 1800 : 1180, 1450, big ? 260 : 330, 7));
      stamp(g, "34 DANCERS", 540, 330, 110, t, t34, t4 - 0.2);
      stamp(g, "~400 DANCERS", 540, 330, 110, t, t4 - 0.05, E(2) + 0.2);
      label(g, "ONE WEEK", 540, 460, 60, t, t0 + 0.2, t34 - 0.05);
      void tM;
    }, { type: "xfade", d: 0.3 });
    ev(t34, "boom", 0.6); ev(t4, "boom", 0.8);
  }
  // 3 — the cure: more dancing
  { const t0 = S(3) - 0.1, tB = wt(3, "baffled"), tH = wt(3, "hired"), tS = wt(3, "stage"), tDa = wt(3, "dance");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [tH - t0, 540, 1350, 1.0, 0], [tS - t0 + 0.4, 540, 1300, 0.9, 0], [9, 540, 1300, 0.92, 0]]);
      layer(g, cam, 0.8, townB);
      layer(g, cam, 1, (g) => {
        const k = ss((t - tS + 0.2) / 0.5);
        if (k > 0) { g.save(); g.translate(540, 1660); g.scale(1, k); rect(g, -420, -160, 840, 160, "#b9864a", 6); for (let i = -4; i <= 4; i++) line(g, [[i * 90, -160], [i * 90, 0]], 3, "rgba(60,30,10,0.5)"); g.restore(); if (k > 0.9) for (let i = 0; i < 4; i++) guy(g, PEOPLE[i], { x: 260 + i * 190, y: 1500, h: 340, expr: "sick", ...danceState(t, i), blink: 0, t }); }
        if (t > tH - 0.1) for (let i = 0; i < 2; i++) { const x = i ? 1000 : 80; guy(g, { ...PEOPLE[1 + i], helmet: "tophat", hatCol: "#8a3a2a" }, { x, y: 1800, h: 440, dir: i ? -1 : 1, expr: "happy", armR: [1.4, -0.6 + Math.sin(t * 12 + i) * 0.3], blink: blinkAt(t, i), t }); if (!i) { ell(g, x + 110, 1530, 40, 52, "#c98b4b", 5); line(g, [[x + 110, 1480], [x + 170, 1350]], 9, "#6b4024"); } else { ell(g, x - 90, 1560, 50, 40, "#c0392b", 5); } for (let k2 = 0; k2 < 2; k2++) { const q = (t * 0.9 + k2 / 2 + i * 0.25) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, "♪", x + (i ? -120 : 140) + q * 40, 1300 - q * 200, 60, { font: "serif", fill: "#fff", lw: 8 }); g.restore(); } }
        if (t < tH) for (let i = 0; i < 2; i++) guy(g, { ...PEOPLE[1], helmet: "tophat", hatCol: "#1f1a24", sash: "#d4a632" }, { x: 360 + i * 360, y: 1800, h: 520, dir: i ? -1 : 1, expr: "shock", armR: [2.0, -1.2], armL: [-2.0, 1.2], blink: blinkAt(t, i), t });
      });
      label(g, "THE OFFICIAL CURE:", 540, 330, 66, t, tB, tDa - 0.05);
      stamp(g, "“DANCE IT OUT”", 540, 330, 100, t, tDa, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tH, "pop"); ev(tS, "build"); ev(tDa, "boing");
  }
  // 4 — mass hysteria
  { const t0 = S(4) - 0.1, tSt = wt(4, "stress-induced"), tH = wt(4, "hysteria");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [5, 540, 1300, 1.08, 0]]);
      layer(g, cam, 0.7, townB);
      layer(g, cam, 1, (g) => {
        crowd(g, t, 8, 500, 1300, 1450, 260, 11);
        guy(g, { tunic: "#2f3f5f", trim: "#d9c08a", hair: "#7a7a7a", bald: true, beard: "#9a9a9a", robe: true }, { x: 260, y: 1820, h: 600, expr: "talk", mouthOpen: talk(t), armR: [1.9, -0.4], hold: { l: "scroll" }, blink: blinkAt(t, 1), t });
        if (t > tSt) { g.save(); g.translate(560, 980); g.scale(easeBack(clamp((t - tSt) / 0.3)), easeBack(clamp((t - tSt) / 0.3))); bubble(g, 0, 0, 440, 220, -200, 160, "#fff", 6); smoothPath(g, [[-110, 20], [-100, -50], [-30, -70], [40, -60], [100, -30], [110, 30], [40, 50], [-60, 50]]); fillInk(g, "#f2b4bc", 5); for (let i = 0; i < 3; i++) line(g, [[-60 + i * 50, -40], [-40 + i * 50, 30]], 4, "#c9737e"); g.restore(); }
      });
      stamp(g, "MASS HYSTERIA", 540, 330, 100, t, tH, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tSt, "pop"); ev(tH, "boom", 0.6);
  }
}
