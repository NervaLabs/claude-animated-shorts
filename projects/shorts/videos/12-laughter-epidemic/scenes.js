// 12 — The Tanganyika Laughter Epidemic (1962)
"use strict";
window.MOOD = "comic";
const SK = ["#7a4a2a", "#8a5a3a", "#6a3e24", "#9a6a42"];
const girl = (i) => ({ tunic: "#3e78c2", trim: "#f2efe6", hair: "#1a1012", bob: false, hairStyle: "short", skin: SK[i % 4], robe: true, lady: true });
const villager = (i) => ({ tunic: ["#d9a441", "#c0392b", "#2f6f4a", "#7b5ac9"][i % 4], trim: "#f2efe6", hair: "#1a1012", skin: SK[(i + 1) % 4], robe: i % 2 === 0, lady: i % 2 === 0, trousers: "#3a3a4a" });
const laughState = (t, i) => ({ expr: "laugh", headTilt: Math.sin(t * 9 + i) * 12, bob: -Math.abs(Math.sin(t * 9 + i)) * 4, armR: [0.9 + Math.sin(t * 9 + i) * 0.3, 1.4], armL: [-0.9, -1.4], lean: Math.sin(t * 4.5 + i) * 6 });
const haha = (g, x, y, t, i, size = 46) => { const q = (t * 0.9 + i * 0.37) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, i % 2 ? "HA HA" : "HAHA!", x + Math.sin(i * 5) * 40, y - q * 160, size, { fill: "#ffe08a" }); g.restore(); };
const savanna = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#a0d0f0", "#f4e6c0");
  smoothHills(g, -900, 2000, 1180, 120, "#b9a46a", 3, 5);
  for (let i = 0; i < 5; i++) acacia(g, -700 + i * 600, 1200, 260 + rnd(i) * 60);
  ground(g, 1250, "#c9a86a", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
const classroom = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#e9d9b0"], [1, "#d9c08a"]]); g.fillRect(-600, -400, 2300, 2100);
  rect(g, 140, 420, 800, 420, "#2f4a3a", 10, 6); strokeText(g, "2 + 2 = 4", 540, 600, 70, { fill: "#f6f3ea", lw: 0, shadow: false, font: "Cinzel" });
  for (const x of [-250, 1250]) { rect(g, x - 120, 450, 240, 300, "#8fd0f0", 8, 4); line(g, [[x, 450], [x, 750]], 6); }
  g.fillStyle = "#8a5a32"; g.fillRect(-600, 1500, 2300, 1000); line(g, [[-600, 1500], [1700, 1500]], 6);
  paintGrain(g, -600, -400, 2300, 2900, 0.08);
};
function buildShots() {
  const sav = cached("sav", -900, -900, 2900, 3400, savanna, 1.0);
  const savB = cached("savB", -900, -900, 2900, 3400, savanna, 0.7, 5);
  const cls = cached("cls", -600, -400, 2300, 2900, classroom, 1.0);
  const clsB = cached("clsB", -600, -400, 2300, 2900, classroom, 0.7, 4);
  // 0 — hook: a classroom that can't stop laughing
  { const tY = wt(0, "1962"), tF = wt(0, "fourteen");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [6, 540, 1280, 1.1, 0]]);
      layer(g, cam, 0.7, clsB);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 6; i++) { const x = 120 + (i % 3) * 420, y = 1560 + Math.floor(i / 3) * 220; guy(g, girl(i), { x, y, h: 380 + Math.floor(i / 3) * 40, ...laughState(t, i), blink: 0, t }); rect(g, x - 140, y - 140, 280, 40, "#a8743e", 5, 4); haha(g, x, y - 400, t, i); } });
      stamp(g, "1962", 540, 330, 150, t, tY - 0.05, tF - 0.1);
      stamp(g, "14 SCHOOLS SHUT", 540, 330, 96, t, tF, E(0) + 0.3);
    });
    ev(0.1, "laugh"); ev(tY, "boom", 0.6); ev(tF, "laugh");
  }
  // 1 — a boarding school in Tanganyika; three students
  { const t0 = S(1) - 0.1, tB = wt(1, "boarding"), tT = wt(1, "Tanzania"), tTh = wt(1, "three");
    shot(t0, (g, t, lt) => {
      const inside = t > tTh - 0.2;
      if (!inside) {
        const cam = camAt(lt, [[0, 540, 1250, 0.85, 0], [6, 540, 1250, 0.95, 0]]);
        layer(g, cam, 0.8, sav);
        layer(g, cam, 1, (g) => { rect(g, 160, 1100, 760, 300, "#e9dcc0", 7); poly(g, [[120, 1100], [540, 900], [960, 1100]], "#b9532f", 7); for (let i = 0; i < 4; i++) rect(g, 220 + i * 180, 1180, 90, 110, "#5a3b2a", 4); line(g, [[1000, 1400], [1000, 950]], 8, "#6b4024"); flagCloth(g, 1000, 950, 130, 80, ["#1eb53a", "#f6f3ea", "#1f1a24", "#f6f3ea", "#00a3dd"], t, 1, 4); });
        label(g, "A GIRLS' BOARDING SCHOOL", 540, 330, 58, t, tB, tT);
        label(g, "TANGANYIKA (NOW TANZANIA)", 540, 330, 56, t, tT, tTh, { font: "Cinzel", fill: "#ffe0b0" });
      } else {
        const cam = camAt(t - tTh, [[0, 540, 1350, 1.2, 0], [5, 540, 1350, 1.3, 0]]);
        layer(g, cam, 0.7, clsB);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) { guy(g, girl(i), { x: 220 + i * 320, y: 1760, h: 520, ...laughState(t, i), blink: 0, t }); haha(g, 220 + i * 320, 1180, t, i, 52); } });
        stamp(g, "3 STUDENTS", 540, 330, 110, t, tTh, wt(1, "couldn't") - 0.05);
        label(g, "...COULDN'T STOP", 540, 330, 86, t, wt(1, "couldn't"), E(1) + 0.2, { fill: "#ffe08a" });
      }
    }, { type: "flash", d: 0.2 });
    ev(tB, "pop"); ev(tTh, "laugh");
  }
  // 2 — 95 of 159
  { const t0 = S(2) - 0.1, t95 = wt(2, "ninety-five"), t159 = wt(2, "fifty-nine");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [5, 540, 1150, 1.05, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000);
        const fill = Math.floor(95 * clamp((t - t95 + 0.4) / 1.6));
        for (let i = 0; i < 159; i++) { const c = i % 12, r = Math.floor(i / 12), x = 150 + c * 71, y = 620 + r * 78; const on = i < fill; ell(g, x, y, 24, 24, on ? "#ffe08a" : "#7a86a8", 3); if (on) { g.beginPath(); g.arc(x, y + 2, 12, 0.1, Math.PI - 0.1); g.lineWidth = 3; g.strokeStyle = INK; g.stroke(); } }
      });
      stamp(g, `${Math.min(95, Math.floor(95 * clamp((t - t95 + 0.4) / 1.6)))} OF 159`, 540, 330, 120, t, t95 - 0.3, 999, { rot: 0 });
      void t159;
    }, { type: "whip", d: 0.3 });
    ev(t95, "pop"); for (let k = 0; k < 8; k++) ev(t95 - 0.3 + k * 0.2, "pop", 0.3);
  }
  // 3 — school closes; laughter spreads to villages
  { const t0 = S(3) - 0.1, tCl = wt(3, "closed"), tSp = wt(3, "spread"), tTh = wt(3, "thousand");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tSp - t0, 540, 1300, 1.0, 0], [tSp - t0 + 0.8, 540, 1250, 0.75, 0], [9, 540, 1250, 0.77, 0]]);
      layer(g, cam, 0.8, sav);
      layer(g, cam, 1, (g) => {
        const huts = [[-400, 1420], [-150, 1500], [1250, 1450], [1500, 1520], [100, 1380], [980, 1390]];
        huts.forEach(([x, y], i) => { hut(g, x, y, 220); if (t > tSp + i * 0.25) haha(g, x, y - 260, t, i, 50); });
        if (t > tSp) for (let i = 0; i < 6; i++) guy(g, villager(i), { x: huts[i][0] + 120, y: huts[i][1] + 120, h: 300, ...(t > tSp + i * 0.25 ? laughState(t, i) : { expr: "shock" }), blink: 0, t });
        if (t < tSp + 1) { rect(g, 320, 1060, 440, 160, "#f6f3ea", 7, 8); strokeText(g, "CLOSED", 540, 1140, 76, { fill: "#c0262e", lw: 0, shadow: false }); for (let i = 0; i < 3; i++) guy(g, girl(i), { x: lerp(440 + i * 100, 140 + i * 400, clamp((t - tCl) / 1.5)), y: 1700, h: 400, ...laughState(t, i), walk: t * 1.6, blink: 0, t }); }
      });
      label(g, "SCHOOL CLOSED", 540, 330, 86, t, tCl, tSp - 0.05);
      label(g, "IT SPREAD", 540, 330, 96, t, tSp, tTh - 0.1, { fill: "#ffe08a" });
      stamp(g, "~1,000 PEOPLE", 540, 330, 110, t, tTh, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tCl, "clank", 0.5); ev(tSp, "laugh"); ev(tSp + 0.8, "laugh"); ev(tTh, "boom", 0.5);
  }
  // 4 — nobody died, but...
  { const t0 = S(4) - 0.1, tN = wt(4, "Nobody"), tF = wt(4, "fainting");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [5, 540, 1300, 1.12, 0]]);
      layer(g, cam, 0.7, savB);
      layer(g, cam, 1, (g) => {
        guy(g, girl(1), { x: 360, y: 1780, h: 500, sit: t > tF, lean: t > tF ? -50 : 0, expr: t > tF ? "closed" : "laugh", headTilt: Math.sin(t * 9) * 10, blink: 0, t, hideArms: t > tF });
        if (t > tF) for (let i = 0; i < 4; i++) sparkle(g, 360 + Math.cos(t * 3 + i * 1.6) * 90, 1300 + Math.sin(t * 3 + i * 1.6) * 30, 24, (t * 0.7 + i / 4) % 1);
        guy(g, { tunic: "#f6f3ea", trim: "#c0262e", hair: "#1a1012", skin: SK[2], robe: true, lady: true, helmet: "chef" }, { x: 760, y: 1780, h: 540, dir: -1, expr: "shock", armR: [1.6, -0.3], blink: blinkAt(t, 4), t });
      });
      label(g, "NOBODY DIED", 540, 330, 96, t, tN, tF - 0.05);
      label(g, "BUT: FAINTING · BREATHING TROUBLE", 540, 330, 46, t, tF, 999, { fill: "#ffd0c0" });
    }, { type: "xfade", d: 0.3 });
    ev(tN, "ding"); ev(tF, "boing", 0.5);
  }
}
