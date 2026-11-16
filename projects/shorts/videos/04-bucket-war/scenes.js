// 04 — The War of the Bucket (1325)
"use strict";
window.MOOD = "war";
const MOD = { ...OUTF.medievalYellow }, BOL = { ...OUTF.medievalRed, tunic: "#f2efe6", trim: "#c0262e" };
const italyBg = (night) => (g) => {
  sky3(g, -900, -900, 2900, 2200, night ? "#0d1236" : "#4f86d0", night ? "#232a5a" : "#a9cdee", night ? "#343a6a" : "#f0e6c8");
  smoothHills(g, -900, 2000, 1150, 220, night ? "#2a3050" : "#9aa6c8", 2, 0);
  smoothHills(g, -900, 2000, 1250, 140, night ? "#2f3f2a" : "#9cb35f", 6, 5);
  for (let i = 0; i < 10; i++) cypress(g, -800 + i * 300 + rnd(i) * 80, 1280, 160 + rnd(i) * 60, night ? "#1f3a2a" : "#3b6a42", 4);
  ground(g, 1300, night ? "#3a4a2a" : "#c9b07a", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3200, 0.07);
};
function army(g, side, t, n, x0, run, flag) {
  for (let i = 0; i < n; i++) { const r = Math.floor(i / 6), c = i % 6, x = x0 + side * (c * 95 + r * 40) + run * side, y = 1640 + r * 70; guy(g, side > 0 ? MOD : BOL, { x, y, h: 300 + r * 20, dir: side, expr: "shout", walk: run ? t * 2.2 + i * 0.2 : null, hold: { r: "spear", l: "shield" }, shieldCol: side > 0 ? "#e2b64b" : "#c0262e", spearAng: side > 0 ? -0.5 : -0.5, armR: [1.6, -0.3], blink: 0, t }); }
  if (flag) pole(g, x0 + side * 80 + run * side, 1600, 520, flag, t, side > 0 ? 150 : 150, 100);
}
function buildShots() {
  const day = cached("italy", -900, -900, 2900, 3200, italyBg(false), 1.1);
  const dayB = cached("italyB", -900, -900, 2900, 3200, italyBg(false), 0.8, 5);
  const nightBg = cached("italyN", -900, -900, 2900, 3200, italyBg(true), 1.1);
  // 0 — hook: armies converge on a bucket
  { const tB = wt(0, "bloody"), tBu = wt(0, "bucket");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.9, 0], [tBu - 0.1, 540, 1350, 1.0, 0], [tBu + 0.4, 540, 1500, 1.6, 0], [6, 540, 1500, 1.65, 0]]);
      layer(g, cam, 0.7, dayB);
      layer(g, cam, 1, (g) => {
        const run = Math.min(300, t * 90);
        army(g, 1, t, 12, -500, run, FLAGS.modena); army(g, -1, t, 12, 1580, run, FLAGS.bologna);
        rect(g, 470, 1600, 140, 150, "#d9cbb0", 6, 6);
        bucketObj(g, 540, 1600, 180, Math.sin(t * 2) * 0.03);
        if (t > tBu) for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 130, 1480 + Math.sin(i * 2) * 80, 20, (t - tBu - i * 0.07) / 0.7);
      });
      stamp(g, "A WAR OVER... THIS", 540, 330, 84, t, tBu - 0.05, E(0) + 0.3);
    });
    ev(0.1, "warcry"); ev(tB, "drums"); ev(tBu, "ding");
  }
  // 1 — 1325: Modena vs Bologna
  { const t0 = S(1) - 0.1, tY = wt(1, "1325"), tM = wt(1, "Modena"), tBo = wt(1, "Bologna"), tP = wt(1, "boiling");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 0.8, 0], [7, 540, 1200, 0.85, 0]]);
      layer(g, cam, 0.8, day);
      layer(g, cam, 1, (g) => {
        cityWall(g, -480, 300, 1500, 220, "#d9c08a"); pole(g, -100, 1170, 260, FLAGS.modena, t, 140, 90);
        cityWall(g, 780, 1560, 1500, 220, "#d4a07a"); pole(g, 1170, 1170, 260, FLAGS.bologna, t, 140, 90);
        for (let i = 0; i < 3; i++) { guy(g, MOD, { x: -200 + i * 180, y: 1290, h: 200, expr: "angry", look: 1, blink: blinkAt(t, i), t, shadow: false }); guy(g, BOL, { x: 1000 + i * 180, y: 1290, h: 200, dir: -1, expr: "angry", look: 1, blink: blinkAt(t, 5 + i), t, shadow: false }); }
        // the thermometer of rivalry
        const k = ss((t - tP + 0.6) / 1.0);
        rect(g, 500, 900, 80, 600, "#f6f3ea", 6, 40); ell(g, 540, 1530, 70, 70, "#c0262e", 6);
        rect(g, 515, 1500 - 560 * (0.25 + 0.75 * k), 50, 560 * (0.25 + 0.75 * k), "#c0262e", 0, 25);
        if (k > 0.9) for (let i = 0; i < 4; i++) { const q = (t * 1.2 + i / 4) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 540 + Math.sin(i * 3) * 50, 880 - q * 200, 26, 20, "#fff", 4); g.restore(); }
      });
      stamp(g, "1325", 540, 330, 150, t, tY - 0.05, tM - 0.1);
      label(g, "MODENA", 300, 330, 72, t, tM, E(1) + 0.2, { font: "Cinzel", fill: "#ffe08a" });
      label(g, "BOLOGNA", 780, 440, 72, t, tBo, E(1) + 0.2, { font: "Cinzel", fill: "#ffd0d0" });
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom"); ev(tM, "pop"); ev(tBo, "pop"); ev(tP, "bubble");
  }
  // 2 — the night raid on the well
  { const t0 = S(2) - 0.1, tSn = wt(2, "sneaked"), tSt = wt(2, "stole"), tTr = wt(2, "trophy");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.1, 0], [tSt - t0, 600, 1380, 1.25, 0], [9, 640, 1380, 1.28, 0]]);
      layer(g, cam, 0.8, nightBg);
      layer(g, cam, 1, (g) => {
        house(g, 120, 1500, 300, 260, "#b9a48a", "#7a3a2a", 5, "#ffe08a"); house(g, 1000, 1500, 300, 280, "#c9b49a", "#7a3a2a", 5, "#ffe08a");
        well(g, 600, 1700, 260);
        const taken = t > tSt;
        if (!taken) bucketObj(g, 600, 1290, 110, Math.sin(t * 2) * 0.05);
        for (let i = 0; i < 2; i++) {
          const x = taken ? lerp(560 + i * 120, -500, clamp((t - tSt - 0.2) / 2.2)) : lerp(-400, 380 + i * 120, ss((t - tSn + 0.3) / 1.6));
          guy(g, MOD, { x, y: 1780 + i * 30, h: 470, dir: taken ? -1 : 1, expr: taken ? "laugh" : "sly", walk: t * (taken ? 2.6 : 1.2), lean: taken ? 8 : -4, armR: i === 0 && taken ? [2.6, 0] : [0.6, 0.9], blink: blinkAt(t, i), t });
          if (i === 0 && taken) bucketObj(g, x + 30, 1340, 110, -0.2);
        }
      });
      label(g, "BOLOGNA, AT NIGHT", 540, 330, 64, t, tSn, tSt - 0.05, { fill: "#cfe0ff" });
      stamp(g, "STOLEN: 1 BUCKET", 540, 330, 92, t, tSt + 0.2, E(2) + 0.2);
    }, { type: "black", d: 0.4 }, night(0.3));
    ev(tSn, "pop", 0.5); ev(tSt, "whoosh"); ev(tTr, "laugh");
  }
  // 3 — "give it back" / "no" / armies
  { const t0 = S(3) - 0.1, tD = wt(3, "demanded"), tR = wt(3, "refused"), tA = wt(3, "armies");
    shot(t0, (g, t, lt) => {
      const war = t > tA - 0.4;
      const cam = war ? camAt(t - tA + 0.4, [[0, 540, 1300, 1.2, 0], [0.6, 540, 1250, 0.8, 0], [5, 540, 1250, 0.82, 0]]) : camAt(lt, [[0, 540, 1300, 1.1, 0], [4, 540, 1300, 1.15, 0]]);
      layer(g, cam, 0.7, dayB);
      layer(g, cam, 1, (g) => {
        if (war) { army(g, 1, t, 18, -300, Math.min(200, (t - tA) * 120), FLAGS.modena); army(g, -1, t, 18, 1380, Math.min(200, (t - tA) * 120), FLAGS.bologna); }
        else {
          guy(g, { ...BOL, helmet: "crown", armor: null, cape: "#c0262e" }, { x: 800, y: 1760, h: 560, dir: -1, expr: "angry", armR: [2.4 + Math.sin(t * 10) * 0.2, 0], blink: blinkAt(t, 1), t });
          guy(g, { ...MOD, helmet: "crown", armor: null, cape: "#2f5fae" }, { x: 290, y: 1760, h: 560, expr: t > tR ? "sly" : "neutral", armR: [1.2, 1.2], armL: [-0.6, 1.4], blink: blinkAt(t, 2), t });
          bucketObj(g, 330, 1480, 120, 0.1);
          if (t > tD) shout(g, 780, 1000, "GIVE IT BACK!", 50, clamp((t - tD) / 0.12), "#b8262f", [780, 1180]);
          if (t > tR) shout(g, 280, 1040, "NO.", 70, clamp((t - tR) / 0.12), "#2f5fae", [290, 1200]);
        }
      });
      label(g, "MASSIVE ARMIES", 540, 330, 76, t, tA, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tD, "pop"); ev(tR, "boing"); ev(tA, "drums"); ev(tA, "horns");
  }
  // 4 — Zappolino
  { const t0 = S(4) - 0.1, tZ = wt(4, "Zappolino"), tT = wt(4, "thousand"), tI = wt(4, "insult");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [5, 540, 1320, 1.1, 2]]);
      layer(g, cam, 0.7, dayB);
      layer(g, cam, 1, (g) => {
        army(g, 1, t, 12, -200, 160, FLAGS.modena); army(g, -1, t, 12, 1280, 160, FLAGS.bologna);
        for (let i = 0; i < 7; i++) dust(g, 200 + i * 110, 1650, 150, ((t * 1.2 + i * 0.15) % 1), i * 7 + Math.floor(t * 1.2));
        for (let i = 0; i < 5; i++) sparkle(g, 300 + i * 120, 1500 + Math.sin(i * 3) * 60, 30, (t * 1.5 + i * 0.2) % 1);
      });
      stamp(g, "ZAPPOLINO", 540, 330, 120, t, tZ - 0.05, tT - 0.05);
      label(g, "~2,000 DEAD", 540, 330, 86, t, tT, tI);
      stamp(g, "...OVER A BUCKET", 540, 330, 86, t, tI, E(4) + 0.3);
    }, { type: "whip", d: 0.3 });
    ev(tZ, "boom"); ev(t0, "rumble"); for (let k = 0; k < 6; k++) ev(t0 + 0.4 + k * 0.6, "clash", 0.5); KICKS.push({ t: tZ, a: 14 });
  }
  // 5 — still in a museum today
  { const t0 = S(5) - 0.1, tW = wt(5, "won"), tM = wt(5, "museum");
    shot(t0, (g, t, lt) => {
      const museum = t > tM - 0.6;
      const cam = museum ? camAt(t - tM + 0.6, [[0, 540, 1250, 1.2, 0], [6, 540, 1230, 1.28, 0]]) : camAt(lt, [[0, 540, 1300, 1.0, 0], [5, 540, 1300, 1.08, 0]]);
      if (!museum) {
        layer(g, cam, 0.7, dayB);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 5; i++) guy(g, MOD, { x: 140 + i * 200, y: 1760 + (i % 2) * 30, h: 460, expr: "laugh", armR: [2.8, 0], bob: -Math.abs(Math.sin(t * 8 + i)) * 4, blink: blinkAt(t, i), t }); bucketObj(g, 540, 1150 - Math.abs(Math.sin(t * 4)) * 60, 160, Math.sin(t * 3) * 0.2); });
        stamp(g, "MODENA WINS", 540, 330, 110, t, tW, tM);
      } else {
        layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, 0, 1900, [[0, "#6a4a5a"], [1, "#3a2a34"]]); g.fillRect(-500, -300, 2100, 2600); for (let i = 0; i < 4; i++) rect(g, -300 + i * 500, 300, 280, 380, "#c9a35a", 8, 4); g.fillStyle = "#7a5a3a"; g.fillRect(-500, 1640, 2100, 900); line(g, [[-500, 1640], [1600, 1640]], 6); });
        layer(g, cam, 1, (g) => {
          museumCase(g, 540, 1480, 360, 460, (g) => { bucketObj(g, 540, 1460, 200); for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.7) * 140, 1250 + Math.sin(i) * 100, 18, (t * 0.8 + i / 4) % 1); });
          plaque(g, 540, 1560, "LA SECCHIA RAPITA", 34);
          guy(g, OUTF.townsman, { x: 140, y: 1840, h: 520, expr: "shock", look: 1, blink: blinkAt(t, 3), t }); guy(g, { ...OUTF.townswoman, helmet: null, hair: "#5a3b2a", bob: true }, { x: 940, y: 1840, h: 500, dir: -1, expr: "happy", look: 1, blink: blinkAt(t, 4), t });
        });
        stamp(g, "STILL ON DISPLAY", 540, 330, 96, t, tM, 999);
      }
    }, { type: "xfade", d: 0.3 });
    ev(tW, "cheer"); ev(tM, "choir", 0.6);
  }
}
