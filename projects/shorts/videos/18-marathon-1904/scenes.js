// 18 — The 1904 St. Louis Olympic Marathon
"use strict";
window.MOOD = "comic";
const RUN = (i) => ({ tunic: ["#f6f3ea", "#c0392b", "#2f6f9a", "#e2b64b", "#5a7a2a"][i % 5], trim: "#1c1422", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], trousers: "#1c1422", skin: i === 2 ? "#7a4a2a" : undefined });
const runState = (t, i, sp = 2.6) => ({ walk: (t * sp + i * 0.3) % 1, lean: 10, armR: [1.0 + Math.sin(t * sp * TAU + i) * 0.6, -1.2], armL: [-1.0 - Math.sin(t * sp * TAU + i) * 0.6, 1.2] });
const road = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a9ad8", "#c0dcf0", "#f4ecd0");
  smoothHills(g, -900, 2000, 1150, 120, "#a8a46a", 3, 5);
  for (let i = 0; i < 5; i++) tree(g, -700 + i * 600, 1200, 300, "#7a9a4a", 5, i);
  ground(g, 1200, "#c9b07a", -900, 2000);
  g.fillStyle = "#d9c08a"; g.fillRect(-900, 1500, 2900, 300); line(g, [[-900, 1500], [2000, 1500]], 4, "rgba(28,20,34,0.4)"); line(g, [[-900, 1800], [2000, 1800]], 4, "rgba(28,20,34,0.4)");
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function car(g, x, y, s) {
  const u = s / 100; rect(g, x - 120 * u, y - 80 * u, 240 * u, 50 * u, "#1f1a24", 6, 8 * u); rect(g, x - 60 * u, y - 130 * u, 120 * u, 50 * u, "#1f1a24", 6, 6 * u);
  for (const wx of [-80, 80]) { ell(g, x + wx * u, y - 26 * u, 28 * u, 28 * u, "#2a2830", 6); for (let k = 0; k < 6; k++) line(g, [[x + wx * u, y - 26 * u], [x + wx * u + Math.cos(k) * 24 * u, y - 26 * u + Math.sin(k) * 24 * u]], 2); }
}
function buildShots() {
  const rd = cached("road", -900, -900, 2900, 3400, road, 1.0);
  const rdB = cached("roadB", -900, -900, 2900, 3400, road, 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1904"), tC = wt(0, "chaotic"), tCo = wt(0, "comedy");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.0, 0], [5, 540, 1450, 1.08, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 5; i++) { const x = ((t * 120 + i * 260) % 1500) - 200; guy(g, RUN(i), { x, y: 1620 + (i % 2) * 120, h: 380, expr: i % 2 ? "sick" : "shock", ...runState(t, i), blink: 0, t, sweat: (t + i * 0.3) % 1 }); dust(g, x - 60, 1640 + (i % 2) * 120, 60, (t * 2 + i * 0.3) % 1, i); }
        dog(g, { x: ((t * 200 + 300) % 1500) - 200, y: 1720, h: 140, phase: t * 3, t });
      });
      stamp(g, "1904 OLYMPICS", 540, 330, 104, t, tY - 0.05, tCo - 0.05);
      stamp(g, "A COMEDY MOVIE?", 540, 330, 96, t, tCo, E(0) + 0.3);
      void tC;
    });
    ev(tY, "boom", 0.6); ev(tCo, "boing");
  }
  // 1 — dust, heat, one water station
  { const t0 = S(1) - 0.1, tD = wt(1, "dusty"), tN = wt(1, "ninety-degree"), tO = wt(1, "one");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [6, 540, 1400, 1.06, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => {
        sunGlow(g, 900, 700, 100, "255,190,100");
        for (let i = 0; i < 3; i++) { const x = 160 + i * 300; guy(g, RUN(i), { x, y: 1700, h: 440, expr: "sick", ...runState(t, i, 1.6), blink: 0, t, sweat: (t + i * 0.3) % 1 }); dust(g, x - 60, 1700, 90, (t * 1.6 + i * 0.3) % 1, i); }
        if (t > tN) { rect(g, 860, 1050, 70, 380, "#f6f3ea", 6, 35); ell(g, 895, 1450, 60, 60, "#c0392b", 6); rect(g, 875, 1100, 40, 330, "#c0392b", 0, 20); strokeText(g, "90°F", 760, 1100, 50, { fill: "#ffd08a" }); }
        if (t > tO - 0.1) { rect(g, 640, 1480, 200, 140, "#5a8ad0", 6, 10); strokeText(g, "WATER: 1", 740, 1440, 40, { fill: "#cfe9ff" }); }
      });
      label(g, "DUSTY DIRT ROADS", 540, 330, 76, t, tD, tN - 0.05);
      stamp(g, "ONE WATER STATION", 540, 330, 80, t, tO, E(1) + 0.2);
    }, { type: "flash", d: 0.2 }, warm(0.25));
    ev(tN, "pop"); ev(tO, "ding");
  }
  // 2 — chased by dogs
  { const t0 = S(2) - 0.1, tD = wt(2, "dogs");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.1, 0], [3, 600, 1450, 1.15, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => { const x = 600 + (t - t0) * 140; guy(g, RUN(2), { x, y: 1720, h: 460, expr: "scared", ...runState(t, 2, 3.4), blink: 0, t }); for (let i = 0; i < 2; i++) dog(g, { x: x - 300 - i * 200, y: 1740 + i * 30, h: 150, phase: t * 3.6 + i * 0.3, t, tongue: true, col: i ? "#5a4a3a" : "#b98a5a" }); if (t > tD) shout(g, x - 300, 1350, "WOOF!", 54, clamp((t - tD) / 0.12), "#8a5a32"); });
      label(g, "CHASED BY WILD DOGS", 540, 330, 72, t, t0 + 0.2, E(2) + 0.1);
    }, { type: "whip", d: 0.3 });
    ev(tD, "boing"); ev(tD + 0.1, "scramble", 0.5);
  }
  // 3 — rotten apples
  { const t0 = S(3) - 0.1, tR = wt(3, "rotten"), tC = wt(3, "collapsed");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.1, 0], [3, 540, 1400, 1.16, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => {
        tree(g, 760, 1700, 700, "#5f8a3a", 6, 4); for (let i = 0; i < 4; i++) ell(g, 640 + i * 70, 1150 + (i % 2) * 50, 22, 22, "#8a9a3a", 4);
        const down = t > tC;
        guy(g, RUN(3), { x: 420, y: 1760, h: 480, sit: down, lean: down ? -60 : 0, expr: down ? "sick" : "happy", armR: down ? [0.3, 0.2] : [2.0, -1.6], hideArms: down, blink: down ? 1 : blinkAt(t, 1), t });
        if (!down) { ell(g, 500, 1370, 24, 22, "#8a9a3a", 4); ell(g, 490, 1365, 7, 7, "#5a4a2a", 0); }
        if (down) for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, "z", 480 + i * 30, 1400 - q * 100, 50, { fill: "#fff" }); g.restore(); }
      });
      label(g, "ROTTEN APPLES", 540, 330, 86, t, tR, tC - 0.05, { fill: "#d9f2a0" });
      stamp(g, "COLLAPSED", 540, 330, 110, t, tC, E(3) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(tR, "pop"); ev(tC, "boing"); ev(tC + 0.3, "snore");
  }
  // 4 — the "winner" rode in a car
  { const t0 = S(4) - 0.1, tF = wt(4, "first"), tC = wt(4, "car"), tE = wt(4, "eleven");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [5, 540, 1400, 1.06, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => {
        if (t < tC - 0.1) { line(g, [[880, 1800], [880, 1300]], 12, "#6b4024"); rect(g, 860, 1300, 300, 80, "#f6f3ea", 5); strokeText(g, "FINISH", 1000, 1340, 40, { fill: "#c0392b", lw: 0, shadow: false }); guy(g, RUN(0), { x: 700, y: 1720, h: 460, expr: "proud", armR: [2.8, 0], armL: [-2.8, 0], blink: blinkAt(t, 1), t }); for (let i = 0; i < 4; i++) sparkle(g, 700 + Math.cos(i * 1.6) * 200, 1300 + Math.sin(i) * 100, 26, (t * 0.8 + i / 4) % 1); }
        else { const x = lerp(-300, 900, clamp((t - tC + 0.1) / 2.6)); car(g, x, 1760, 230); guy(g, RUN(0), { x: x - 20, y: 1590, h: 300, sit: true, expr: "sly", armR: [2.6, 0], t, shadow: false }); guy(g, { ...OUTF.townsman, helmet: "cap" }, { x: x + 80, y: 1590, h: 300, sit: true, expr: "happy", t, shadow: false }); dust(g, x - 300, 1740, 90, (t * 2) % 1, 3); }
      });
      label(g, "THE FIRST ACROSS THE LINE...", 540, 330, 54, t, tF, tC - 0.1);
      stamp(g, "11 MILES BY CAR", 540, 330, 96, t, tE - 0.1, E(4) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "cheer", 0.6); ev(tC, "boing"); ev(tC, "rumble", 0.4);
  }
  // 5 — the real winner: rat poison and brandy
  { const t0 = S(5) - 0.1, tH = wt(5, "Thomas"), tR = wt(5, "rat"), tB = wt(5, "brandy");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.05, 0], [8, 540, 1400, 1.12, 0]]);
      layer(g, cam, 0.7, rdB);
      layer(g, cam, 1, (g) => {
        guy(g, { ...RUN(1), tunic: "#f6f3ea" }, { x: 540, y: 1760, h: 520, expr: "sick", walk: (t * 0.8) % 1, lean: Math.sin(t * 3) * 14, headTilt: Math.sin(t * 2.3) * 14, blink: 0, t, sweat: (t * 0.8) % 1 });
        for (const [i, lab, tt, col] of [[0, "RAT POISON", tR, "#6a9a4a"], [1, "BRANDY", tB, "#a8641e"]]) if (t > tt - 0.1) { const x = i ? 880 : 180; guy(g, { tunic: "#3a3a4a", trim: "#d9c08a", helmet: "bowler", trousers: "#3a3a4a", moust: true }, { x, y: 1780, h: 480, dir: i ? -1 : 1, expr: "sly", armR: [1.7, -0.3], blink: blinkAt(t, 3 + i), t }); rect(g, x + (i ? -150 : 100), 1380, 60, 110, col, 5, 10); rect(g, x + (i ? -140 : 110), 1350, 40, 34, "#6b4024", 4); strokeText(g, lab, x + (i ? -120 : 130), 1290, 32, { fill: "#fff" }); }
      });
      label(g, "THE WINNER: THOMAS HICKS", 540, 330, 58, t, tH, tR - 0.05);
      stamp(g, "...KEPT MOVING", 540, 330, 96, t, wt(5, "moving"), 999);
    }, { type: "xfade", d: 0.3 });
    ev(tH, "cheer", 0.5); ev(tR, "pop"); ev(tB, "pop");
  }
}
