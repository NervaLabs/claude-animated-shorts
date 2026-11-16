// 09 — Operation Cottage (1943)
"use strict";
window.MOOD = "eerie";
const CAN = (g, w, h) => { g.fillStyle = "#c0262e"; g.fillRect(-w, -h, w * 3, h * 3); g.save(); g.beginPath(); g.rect(0, 0, w * 0.5, h * 0.5); g.clip(); unionJack(g, w * 0.5, h * 0.5); g.restore(); };
const USF = FLAGS.usa1859;
const kiska = (g) => {
  sky3(g, -1000, -1000, 3100, 2200, "#6a7a8a", "#a8b4be", "#cfd6da");
  poly(g, [[-400, 1150], [-100, 820], [150, 700], [300, 760], [550, 600], [800, 780], [1200, 900], [1600, 1150]], "#7a8a7a", 6, true);
  poly(g, [[480, 660], [550, 600], [620, 650], [580, 690]], "#f6f6f6", 4, true);
  g.fillStyle = vgrad(g, 1150, 2600, [[0, "#5a6f7a"], [1, "#2f4250"]]); g.fillRect(-1000, 1150, 3100, 1600); line(g, [[-1000, 1150], [2100, 1150]], 5);
  paintGrain(g, -1000, -1000, 3100, 3600, 0.06);
};
const beach = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#7a8794", "#aab4bc", "#c9d0d4");
  smoothHills(g, -900, 2000, 1150, 260, "#7a8a72", 3, 5);
  g.fillStyle = "#5a6f7a"; g.fillRect(-900, 1150, 2900, 200); line(g, [[-900, 1150], [2000, 1150]], 5);
  g.fillStyle = vgrad(g, 1350, 2400, [[0, "#8a8574"], [1, "#6a6656"]]); g.fillRect(-900, 1350, 2900, 1400); line(g, [[-900, 1350], [2000, 1350]], 5);
  for (let i = 0; i < 6; i++) { smoothPath(g, [[-500 + i * 400, 1560], [-380 + i * 400, 1520], [-260 + i * 400, 1560], [-380 + i * 400, 1580]]); fillInk(g, "#5a5546", 4); }
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function buildShots() {
  const isl = cached("kiska", -1000, -1000, 3100, 3600, kiska, 0.9);
  const bch = cached("beach", -900, -900, 2900, 3400, beach, 1.0);
  const bchB = cached("beachB", -900, -900, 2900, 3400, beach, 0.7, 5);
  // 0 — hook: an invasion of nobody
  { const tY = wt(0, "1943"), tT = wt(0, "thirty-five"), tN = wt(0, "nobody");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.85, 0], [tN - 0.1, 540, 1400, 0.95, 0], [tN + 0.4, 820, 1550, 1.4, 0], [7, 830, 1550, 1.44, 0]]);
      layer(g, cam, 0.8, bch);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 14; i++) { const x = lerp(-300, 500, ((t * 0.25 + i * 0.13) % 1)) + (i % 4) * 60, y = 1500 + (i % 5) * 70; guy(g, WW.gi, { x, y, h: 260 + (i % 5) * 20, expr: "shout", walk: t * 2.4 + i * 0.3, lean: 10, armR: [1.3, -0.3], blink: 0, t }); }
        line(g, [[860, 1700], [860, 1500]], 10, "#6b4024"); rect(g, 740, 1440, 240, 110, "#f3ecda", 6, 4); strokeText(g, "NOBODY", 860, 1495, 44, { fill: "#1c1422", lw: 0, shadow: false });
      });
      fog(g, t, 0.35, 900);
      stamp(g, "1943", 540, 330, 150, t, tY - 0.05, tT - 0.1);
      label(g, "35,000 TROOPS", 540, 330, 86, t, tT, tN - 0.05);
      stamp(g, "ENEMIES: 0", 540, 330, 110, t, tN, E(0) + 0.3);
    }, { type: "cut", d: 0 });
    ev(0.2, "warcry", 0.6); ev(tY, "boom"); ev(tN, "boing");
  }
  // 1 — Kiska, Alaska; weeks of bombing
  { const t0 = S(1) - 0.1, tK = wt(1, "Kiska"), tUS = wt(1, "U.S."), tB = wt(1, "bombing");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1000, 0.75, 0], [10, 540, 1000, 0.82, 0]]);
      layer(g, cam, 1, (g) => {
        isl(g); sea(g, 1150, t, -1000, 2100, "#5a6f7a", "#2f4250");
        if (t > tUS - 0.3) { steamShip(g, { x: 0, y: 1500, h: 260, t, col: "#5a6470", super: "#9aa3ae", funnel: "#5a6470", guns: true, flag: USF, seed: 1 }); steamShip(g, { x: 1050, y: 1560, h: 240, t, dir: -1, col: "#5a6470", super: "#9aa3ae", funnel: "#5a6470", guns: true, flag: CAN, seed: 2 }); }
        if (t > tB - 0.8) for (let i = 0; i < 3; i++) plane(g, { x: lerp(-500, 1600, ((t - tB + 0.8) * 0.35 + i * 0.25) % 1.2), y: 300 + i * 90, h: 150, col: "#6a7a8a", t, bomber: true });
        if (t > tB) for (let k = 0; k < 6; k++) boomFx(g, 200 + k * 140, 850 + (k % 2) * 80, 90, ((t - tB) * 1.2 + k * 0.17) % 1.3);
      });
      label(g, "KISKA ISLAND, ALASKA", 540, 330, 64, t, tK, tUS, { font: "Cinzel", fill: "#e6eef2" });
      label(g, "USA + CANADA", 540, 330, 80, t, tUS, tB);
      label(g, "WEEKS OF BOMBING", 540, 330, 72, t, tB, E(1) + 0.2, { fill: "#ffd0b0" });
    }, { type: "flash", d: 0.2 });
    ev(tUS, "horns"); ev(tB - 0.8, "plane"); for (let k = 0; k < 5; k++) ev(tB + k * 0.4, "boom", 0.5);
  }
  // 2 — storming the beach in fog
  { const t0 = S(2) - 0.1, tF = wt(2, "fog"), tR = wt(2, "fierce");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [5, 600, 1450, 1.12, 2]]);
      layer(g, cam, 0.7, bchB);
      layer(g, cam, 1, (g) => {
        landingCraft(g, { x: 200, y: 1340, h: 200, t, ramp: true });
        for (let i = 0; i < 8; i++) { const x = lerp(300, 1100, ((t - t0) * 0.22 + i * 0.12) % 1), y = 1560 + (i % 3) * 90; guy(g, WW.gi, { x, y, h: 360, expr: t > tR ? "scared" : "determined", walk: t * 2.4 + i * 0.3, lean: 14, armR: [1.3, -0.3], blink: 0, t, sweat: (t + i * 0.3) % 1 }); musket(g, x + 60, y - 240, -0.3, 220); }
      });
      fog(g, t, 0.7, 700);
      label(g, "THICK FOG", 540, 330, 96, t, tF - 0.2, tR - 0.1, { fill: "#e6eef2" });
      label(g, "BRACING FOR BATTLE...", 540, 330, 64, t, tR, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(t0, "splash"); ev(t0 + 0.4, "warcry", 0.5); ev(tR, "heartbeat");
  }
  // 3 — empty trenches, stray dogs
  { const t0 = S(3) - 0.1, tA = wt(3, "abandoned"), tD = wt(3, "dogs");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.1, 0], [tD - t0, 540, 1450, 1.15, 0], [tD - t0 + 0.4, 700, 1600, 1.4, 0], [5, 700, 1600, 1.43, 0]]);
      layer(g, cam, 0.7, bchB);
      layer(g, cam, 1, (g) => {
        smoothPath(g, [[-200, 1700], [1300, 1680], [1300, 1760], [-200, 1780]]); fillInk(g, "#4a4536", 6);
        for (let i = 0; i < 3; i++) guy(g, WW.gi, { x: 120 + i * 200, y: 1660, h: 400, expr: "shock", look: 1, headTilt: (i - 1) * 8, blink: blinkAt(t, i), t });
        if (t > tD - 0.3) { dog(g, { x: 820, y: 1720, h: 160, dir: -1, t, tongue: true }); dog(g, { x: 1000, y: 1760, h: 130, dir: -1, t: t + 1, col: "#5a4a3a", tongue: true }); }
        shout(g, 300, 1060, "?", 80, clamp((t - tA) / 0.15), "#1c1422");
      });
      fog(g, t, 0.35, 800);
      label(g, "EMPTY TRENCHES", 540, 330, 86, t, tA, tD - 0.05);
      stamp(g, "...AND DOGS", 540, 330, 110, t, tD, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tA, "boing"); ev(tD, "pop"); ev(tD + 0.2, "laugh", 0.3);
  }
  // 4 — Japan had already left
  { const t0 = S(4) - 0.1, tSe = wt(4, "secretly"), tTw = wt(4, "two");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.8, 0], [5, 540, 1100, 0.86, 0]]);
      layer(g, cam, 1, (g) => {
        isl(g); sea(g, 1150, t, -1000, 2100, "#3a4f5a", "#1f3240");
        for (let i = 0; i < 2; i++) { const x = lerp(700 + i * 300, 1900, clamp((t - tSe) / 3)); steamShip(g, { x, y: 1380 + i * 100, h: 220, t, col: "#4a4f5a", super: "#8a8f96", funnel: "#3a3f4a", seed: i }); }
      });
      fog(g, t, 0.75, 800);
      label(g, "SECRETLY EVACUATED", 540, 330, 66, t, tSe, tTw);
      stamp(g, "2 WEEKS EARLIER", 540, 330, 96, t, tTw, E(4) + 0.2);
    }, { type: "black", d: 0.4 }, night(0.35));
    ev(tSe, "drone", 0.6); ev(tTw, "boom", 0.5);
  }
  // 5 — and still, 300+ casualties
  { const t0 = S(5) - 0.1, tTr = wt(5, "Tragically"), tF = wt(5, "friendly"), tB = wt(5, "booby");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [8, 540, 1380, 1.1, 0]]);
      layer(g, cam, 0.7, bchB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 4; i++) { const x = 160 + i * 260, d = i < 2 ? 1 : -1; tinted(g, (tt) => { tt.setTransform(g.getTransform()); guy(tt, WW.gi, { x, y: 1720, h: 420, dir: d, t, expr: "scared" }); }, "#2a2a34", 0.9); if (t > tF) boomFx(g, x + d * 120, 1440, 40, ((t - tF) * 2 + i * 0.3) % 1.5); }
        if (t > tB - 0.1) { line(g, [[880, 1900], [880, 1700]], 10, "#6b4024"); poly(g, [[780, 1700], [880, 1560], [980, 1700]], "#e2b64b", 6); strokeText(g, "!", 880, 1650, 60, { fill: "#1c1422", lw: 0, shadow: false }); }
      });
      fog(g, t, 0.6, 800);
      label(g, "300+ CASUALTIES", 540, 330, 80, t, tTr, tF, { font: "Cinzel", fill: "#e6e0f2" });
      label(g, "FRIENDLY FIRE", 540, 330, 86, t, tF, tB - 0.05, { fill: "#ffd0c0" });
      label(g, "BOOBY TRAPS", 540, 330, 86, t, tB, 999, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.3 });
    ev(tTr, "drone"); ev(tF, "gunshot", 0.5); ev(tF + 0.5, "gunshot", 0.4);
  }
}
