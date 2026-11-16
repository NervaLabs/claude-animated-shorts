// 35 — The Great Moon Hoax of 1835
"use strict";
window.MOOD = "comic";
const READER = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: ["tophat", "bonnet", "bowler", null][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
const PROF = (i) => ({ tunic: "#1f1a24", trim: "#f2efe6", helmet: "tophat", hatCol: "#1f1a24", trousers: "#1f1a24", beard: ["#9a9a9a", "#5a3b2a"][i % 2], hair: "#9a9a9a" });
/** an original, cartoon "bat-winged lunar resident" */
function moonFolk(g, x, y, s, t, i = 0) {
  const u = s / 100, fl = Math.sin(t * 6 + i) * 0.4;
  g.save(); g.translate(x, y);
  for (const sd of [-1, 1]) poly(g, [[sd * 10 * u, -60 * u], [sd * 80 * u, -100 * u - fl * 30 * u], [sd * 70 * u, -70 * u], [sd * 90 * u, -50 * u - fl * 20 * u], [sd * 60 * u, -40 * u], [sd * 20 * u, -40 * u]], "#7a5a8a", 4 * u, true);
  ell(g, 0, -40 * u, 22 * u, 34 * u, "#b98a5a", 4 * u); ell(g, 0, -88 * u, 20 * u, 20 * u, "#c99a6a", 4 * u);
  for (const sd of [-1, 1]) poly(g, [[sd * 8 * u, -104 * u], [sd * 16 * u, -122 * u], [sd * 18 * u, -100 * u]], "#c99a6a", 3 * u);
  g.beginPath(); g.arc(-7 * u, -90 * u, 2.6 * u, 0, TAU); g.arc(7 * u, -90 * u, 2.6 * u, 0, TAU); g.fillStyle = INK; g.fill();
  line(g, [[-6 * u, 0], [-8 * u, -10 * u]], 4 * u); line(g, [[6 * u, 0], [8 * u, -10 * u]], 4 * u);
  g.restore();
}
const moonscape = (g) => {
  g.fillStyle = vgrad(g, -900, 1200, [[0, "#06081e"], [1, "#2a2050"]]); g.fillRect(-900, -900, 2900, 2200);
  for (let i = 0; i < 70; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.4 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 2900 - 900, rnd(i * 7) * 1600 - 900, 4, 4); } g.globalAlpha = 1;
  ell(g, 1300, 300, 180, 180, "#3f86c8", 6); ell(g, 1260, 280, 70, 50, "#6f9a4a", 0);
  smoothHills(g, -900, 2000, 1150, 160, "#b9b4c8", 3, 5);
  g.fillStyle = "#4f94c8"; g.fillRect(-900, 1180, 900, 160); line(g, [[-900, 1180], [0, 1180]], 5);
  for (let i = 0; i < 6; i++) tree(g, 100 + i * 220, 1240, 240, "#4f9a5a", 5, i);
  ground(g, 1300, "#d9d4e2", -900, 2000);
  for (let i = 0; i < 6; i++) ell(g, -600 + i * 500, 1500 + (i % 2) * 120, 90, 24, "#c4bed2", 4);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
function buildShots() {
  const mn = cached("moon", -900, -900, 2900, 3400, moonscape, 1.0);
  const mnB = cached("moonB", -900, -900, 2900, 3400, moonscape, 0.7, 4);
  // 0 — hook
  { const tY = wt(0, "1835"), tN = wt(0, "newspaper"), tB = wt(0, "bat-winged");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, mnB);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) moonFolk(g, 140 + i * 270, 1700 - Math.abs(Math.sin(t * 3 + i)) * 40, 260, t, i); });
      stamp(g, "1835", 540, 330, 150, t, tY - 0.05, tN - 0.05);
      label(g, "A NEW YORK NEWSPAPER SAID...", 540, 330, 56, t, tN, tB - 0.05);
      stamp(g, "BAT-PEOPLE ON THE MOON", 540, 330, 78, t, tB, E(0) + 0.3);
    });
    ev(tY, "boom", 0.5); ev(tB, "boing"); ev(tB + 0.2, "sparkle");
  }
  // 1 — the articles: Herschel's telescope reveals...
  { const t0 = S(1) - 0.1, tSu = wt(1, "Sun"), tSi = wt(1, "six"), tH = wt(1, "Herschel"), tT = wt(1, "telescope"), tF = wt(1, "forests"), tO = wt(1, "oceans"), tW = wt(1, "winged"), tTe = wt(1, "temples");
    shot(t0, (g, t, lt) => {
      const ph = t < tT - 0.1 ? 0 : t < tF - 0.15 ? 1 : 2;
      const cam = ph === 2 ? camAt(t - tF, [[0, 300, 1300, 1.0, 0], [tW - tF, 540, 1350, 1.0, 0], [tTe - tF, 760, 1450, 1.2, 0], [9, 760, 1450, 1.22, 0]]) : camAt(lt, [[0, 540, 1300, 1.0, 0], [6, 540, 1300, 1.06, 0]]);
      if (ph === 0) { layer(g, cam, 1, (g) => { g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 6; i++) if (t > tSi + i * 0.15) newspaper(g, 260 + (i % 2) * 560, 760 + Math.floor(i / 2) * 420, 420, 380, ["THE SUN", "MOON LIFE!", "PART III", "PART IV", "PART V", "PART VI"][i], (i % 2 ? 0.06 : -0.06)); }); label(g, "THE NEW YORK SUN", 540, 330, 70, t, tSu - 0.2, tH - 0.05, { font: "Cinzel" }); label(g, "SIR JOHN HERSCHEL", 540, 330, 70, t, tH, tT, { font: "Cinzel", fill: "#ffe08a" }); }
      else if (ph === 1) { layer(g, cam, 1, (g) => { sky3(g, -500, -500, 2100, 2050, "#0d1236", "#1f2650", "#3a4070"); ell(g, 900, 400, 140, 140, "#f6f2d8", 6); g.fillStyle = "#3a3a4a"; g.fillRect(-500, 1500, 2100, 1000); g.save(); g.translate(400, 1500); g.rotate(-0.6); rect(g, -60, -900, 120, 900, "#c9973f", 8, 20); rect(g, -80, -940, 160, 60, "#8a6a3a", 7, 10); g.restore(); guy(g, PROF(0), { x: 200, y: 1800, h: 460, expr: "shock", look: 1, headTilt: -10, blink: 0, t }); }); stamp(g, "A GIANT TELESCOPE", 540, 330, 86, t, tT, tF - 0.15); }
      else { layer(g, cam, 0.85, mn); layer(g, cam, 1, (g) => { if (t > tW - 0.2) for (let i = 0; i < 3; i++) moonFolk(g, 420 + i * 200, 1620, 230, t, i); if (t > tTe - 0.2) { const k = easeBack(clamp((t - tTe + 0.2) / 0.5)); g.save(); g.translate(900, 1600); g.scale(k, k); temple(g, 0, 0, 360, 220, 5, "#f2e8f6", "#7a5a8a", 6); g.restore(); } }); label(g, "FORESTS", 540, 330, 96, t, tF, tO - 0.05, { fill: "#d9f2a0" }); label(g, "OCEANS", 540, 330, 96, t, tO, tW - 0.05, { fill: "#cfe9ff" }); stamp(g, "...AND BAT-PEOPLE", 540, 330, 96, t, tW, E(1) + 0.2); }
    }, { type: "flash", d: 0.2 });
    for (let k = 0; k < 6; k++) ev(tSi + k * 0.15, "pop", 0.4); ev(tT, "ding"); ev(tW, "boing"); ev(tTe, "build");
  }
  // 2 — sales soar; Yale sends scientists; "satire"
  { const t0 = S(2) - 0.1, tC = wt(2, "Circulation"), tY = wt(2, "Yale"), tSa = wt(2, "satire");
    shot(t0, (g, t, lt) => {
      const ph = t < tY - 0.1 ? 0 : t < tSa - 0.3 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [10, 540, 1290, 1.08, 0]]);
      layer(g, cam, 0.7, (g) => { sky3(g, -500, -500, 2100, 1800, "#7a8aa8", "#b8c0cc", "#e2dccb"); for (let i = 0; i < 6; i++) brickWall(g, -400 + i * 320, 900, 300, 400, ["#9a4a3a", "#8a5a4a"][i % 2], 4); g.fillStyle = "#8a8278"; g.fillRect(-500, 1300, 2100, 1300); });
      layer(g, cam, 1, (g) => {
        if (ph === 0) { rect(g, 140, 760, 800, 560, "#fff6e6", 8, 12); line(g, [[200, 820], [200, 1260], [900, 1260]], 6); const k = clamp((t - tC) / 1.2); g.beginPath(); for (let i = 0; i <= 20; i++) { if (i / 20 > k) break; const x = 220 + i * 33, y = 1220 - 380 * Math.pow(i / 20, 2.2); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.lineWidth = 12; g.strokeStyle = "#c0262e"; g.stroke(); for (let i = 0; i < 6; i++) guy(g, READER(i), { x: 80 + i * 190, y: 1820, h: 380, expr: "shock", armR: [1.7, -1.0], armL: [-1.7, 1.0], blink: 0, t }); }
        if (ph === 1) { for (let i = 0; i < 3; i++) guy(g, PROF(i), { x: lerp(-300, 300 + i * 200, clamp((t - tY) / 1.2)), y: 1820, h: 520, expr: "determined", walk: t < tY + 1.2 ? t * 2 : null, hold: { r: "scroll" }, blink: blinkAt(t, i), t }); }
        if (ph === 2) { newspaper(g, 540, 1150, 620, 640, "IT WAS SATIRE.", -0.04); for (let i = 0; i < 3; i++) guy(g, PROF(i), { x: 160 + i * 380, y: 1840, h: 500, expr: "shock", blink: 0, t }); }
      });
      stamp(g, "SALES SKYROCKET", 540, 330, 92, t, tC, tY - 0.1);
      label(g, "YALE SCIENTISTS INVESTIGATE", 540, 330, 58, t, tY, tSa - 0.3);
      stamp(g, "“JUST KIDDING”", 540, 330, 104, t, tSa - 0.1, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tC, "cash"); ev(tY, "march", 0.5); ev(tSa, "boing"); ev(tSa + 0.1, "laugh", 0.5);
  }
}
