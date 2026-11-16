// 21 — Emperor Caligula's War on the Sea
"use strict";
window.MOOD = "epic";
const LEG = { tunic: "#b8262f", trim: "#d4a632", armor: "#a8aeb8", helmet: "greek", crest: "#c21f2b", trousers: null, shieldCol: "#b8262f" };
const CALI = { tunic: "#6b2a7a", trim: "#e7c15f", hair: "#5a3b2a", helmet: "laurel", hairUnder: true, cape: "#6b2a7a", robe: true };
const beach = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a8ad0", "#b3d2ee", "#f0ead8");
  g.fillStyle = "#4f94c8"; g.fillRect(-900, 1100, 2900, 300); line(g, [[-900, 1100], [2000, 1100]], 5);
  poly(g, [[700, 1100], [760, 1040], [1500, 1030], [2000, 1060], [2000, 1100]], "#f4f6fa", 5); // white cliffs of Britain
  ground(g, 1450, "#e9d6a0", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
function lighthouse(g, x, y, s, t, k = 1) {
  g.save(); g.translate(x, y); g.scale(1, k);
  for (let i = 0; i < 4; i++) { const w = (180 - i * 30) * s, h = 160 * s; rect(g, -w / 2, -(i + 1) * h, w, h, i % 2 ? "#e9dcc0" : "#d9c8a8", 5); rect(g, -16 * s, -(i + 1) * h + 50 * s, 32 * s, 60 * s, "#3a2a2a", 4, 16 * s); }
  g.restore();
  if (k > 0.95) flame(g, x, y - 640 * s, 40 * s, t);
}
function buildShots() {
  const bc = cached("cali", -900, -900, 2900, 3400, beach, 1.0);
  const bcB = cached("caliB", -900, -900, 2900, 3400, beach, 0.7, 5);
  // 0 — hook
  { const tW = wt(0, "war"), tV = wt(0, "victory");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [5, 540, 1400, 1.08, 0]]);
      layer(g, cam, 0.7, bcB);
      layer(g, cam, 1, (g) => {
        waves(g, 1450 + Math.sin(t * 2) * 20, t, -900, 2000, "#4f94c8", 24);
        guy(g, CALI, { x: 300, y: 1800, h: 600, expr: t > tV ? "proud" : "shout", armR: [2.4, -0.3], hold: { r: "sword" }, swordAng: -0.4, blink: blinkAt(t, 1), t, mouthOpen: 1 });
        for (let i = 0; i < 3; i++) guy(g, LEG, { x: 650 + i * 160, y: 1760 + (i % 2) * 30, h: 400, expr: "shout", armR: [2.0 + Math.sin(t * 8 + i) * 0.5, -0.4], hold: { r: "sword" }, swordAng: -0.6 + Math.sin(t * 8 + i) * 0.6, blink: 0, t });
      });
      stamp(g, "WAR ON THE OCEAN", 540, 330, 96, t, tW, tV - 0.05);
      stamp(g, "...AND HE WON?", 540, 330, 104, t, tV, E(0) + 0.3);
    });
    ev(tW, "warcry"); ev(tV, "boing"); ev(0.2, "splash", 0.5);
  }
  // 1 — the march to the Channel; a change of mind
  { const t0 = S(1) - 0.1, tE = wt(1, "English"), tB = wt(1, "Britain"), tCh = wt(1, "changed");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 300, 1350, 0.85, 0], [tCh - t0, 600, 1350, 0.95, 0], [tCh - t0 + 0.4, 400, 1300, 1.25, 0], [9, 400, 1300, 1.27, 0]]);
      layer(g, cam, 0.8, bc);
      layer(g, cam, 1, (g) => {
        sea(g, 1100, t, -900, 2000, "#4f94c8", "#2f6f9a"); ground(g, 1450, "#e9d6a0", -900, 2000);
        for (let i = 0; i < 10; i++) guy(g, LEG, { x: lerp(-700, 100, clamp((t - t0) / 3)) - (i % 5) * 140 + 700, y: 1700 + Math.floor(i / 5) * 90, h: 320, expr: "determined", walk: t < t0 + 3 ? t * 2 : null, hold: { r: "spear", l: "shield" }, spearAng: -1.4, armR: [1.3, -0.3], blink: blinkAt(t, i), t });
        guy(g, CALI, { x: 360, y: 1820, h: 560, expr: t > tCh ? "sly" : "determined", look: t > tCh ? -0.5 : 0.8, armR: t > tCh ? [2.4, 1.6] : [1.6, -0.2], blink: blinkAt(t, 1), t });
        if (t > tCh) { g.save(); g.globalAlpha = clamp((t - tCh) / 0.2); bubble(g, 560, 1020, 280, 140, 420, 1210, "#fff", 6); strokeText(g, "...nah.", 560, 1010, 54, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); }
      });
      label(g, "THE ENGLISH CHANNEL", 540, 330, 66, t, tE, tB, { font: "Cinzel", fill: "#cfe9ff" });
      label(g, "INVADE BRITAIN?", 540, 330, 80, t, tB, tCh - 0.05);
    }, { type: "flash", d: 0.2 });
    for (let k = 0; k < 6; k++) ev(t0 + k * 0.5, "march", 0.4); ev(tCh, "boing");
  }
  // 2 — attack the waves; collect seashells
  { const t0 = S(2) - 0.1, tL = wt(2, "lined"), tA = wt(2, "attack"), tSh = wt(2, "seashells"), tSp = wt(2, "spoils");
    shot(t0, (g, t, lt) => {
      const shells = t > tSh - 0.3;
      const cam = camAt(lt, [[0, 540, 1450, 1.0, 0], [tSh - t0 - 0.3, 540, 1500, 1.05, 0], [tSh - t0 + 0.2, 540, 1600, 1.3, 0], [12, 540, 1600, 1.33, 0]]);
      layer(g, cam, 0.8, bcB);
      layer(g, cam, 1, (g) => {
        waves(g, 1480 + Math.sin(t * 2) * 25, t, -900, 2000, "#4f94c8", 26);
        for (let i = 0; i < 6; i++) { const x = 60 + i * 190, atk = t > tA && !shells; guy(g, LEG, { x, y: 1800 + (i % 2) * 40, h: 400, expr: shells ? "happy" : atk ? "shout" : "determined", armR: atk ? [2.0 + Math.sin(t * 9 + i) * 0.6, -0.4] : shells ? [1.2, 0.8] : [0.6, 0.2], hold: shells ? null : { r: i % 2 ? "spear" : "sword" }, spearAng: -0.4 + Math.sin(t * 9 + i) * 0.4, swordAng: -0.6 + Math.sin(t * 9 + i) * 0.7, blink: blinkAt(t, i), t, helmet: null });
          if (shells) { g.save(); g.translate(x + 50, 1640 + (i % 2) * 40); smoothPath(g, [[-40, 0], [-30, -30], [30, -30], [40, 0], [0, 10]]); fillInk(g, "#a8aeb8", 4); for (let k = 0; k < 4; k++) { g.save(); g.translate(-20 + k * 13, -36 - (k % 2) * 8); g.beginPath(); for (let a = 0; a < 7; a++) g.lineTo(Math.cos(Math.PI + a * Math.PI / 6) * 12, Math.sin(Math.PI + a * Math.PI / 6) * 12); g.closePath(); fillInk(g, ["#f2c4b0", "#f6e6d0", "#e9a0a8"][k % 3], 2); g.restore(); } g.restore(); } }
      });
      label(g, "LINE UP...", 540, 330, 86, t, tL, tA - 0.05);
      stamp(g, "ATTACK THE WAVES!", 540, 330, 92, t, tA, tSh - 0.3);
      stamp(g, "“SPOILS OF WAR”", 540, 330, 100, t, tSp - 0.1, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tA, "warcry"); for (let k = 0; k < 5; k++) ev(tA + 0.2 + k * 0.5, "splash", 0.4); ev(tSh, "sparkle");
  }
  // 3 — a lighthouse for the triumph
  { const t0 = S(3) - 0.1, tB = wt(3, "lighthouse"), tTr = wt(3, "triumph");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [5, 540, 1200, 0.85, 0]]);
      layer(g, cam, 0.8, bc);
      layer(g, cam, 1, (g) => {
        lighthouse(g, 760, 1500, 1.0, t, easeBack(clamp((t - tB + 0.3) / 0.6)));
        guy(g, CALI, { x: 280, y: 1800, h: 600, expr: "proud", armR: [2.7, 0], blink: blinkAt(t, 1), t });
        if (t > tTr) for (let i = 0; i < 6; i++) sparkle(g, 280 + Math.cos(i * 1.1) * 200, 1200 + Math.sin(i * 1.7) * 150, 26, (t - tTr - i * 0.06) / 0.8);
      });
      stamp(g, "A VICTORY LIGHTHOUSE", 540, 330, 80, t, tB, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tB, "build"); ev(tTr, "choir", 0.6); ev(tTr, "cheer", 0.5);
  }
}
