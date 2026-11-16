// 03 — The Battle of Karánsebes (1788)
"use strict";
window.MOOD = "war";
const AUS = OUTF.austrian, HUS = OUTF.hussar;
function brawl(g, x, y, r, t) {
  for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + t * 3, rr = r * (0.55 + 0.15 * Math.sin(t * 9 + i)); ell(g, x + Math.cos(a) * rr * 0.6, y + Math.sin(a) * rr * 0.35, r * 0.42, r * 0.34, "#e9dcc0", 5); }
  for (let i = 0; i < 6; i++) { const a = rnd(i + Math.floor(t * 8)) * TAU; line(g, [[x + Math.cos(a) * r * 0.5, y + Math.sin(a) * r * 0.3], [x + Math.cos(a) * r * 1.05, y + Math.sin(a) * r * 0.6]], 9); ell(g, x + Math.cos(a) * r * 1.05, y + Math.sin(a) * r * 0.6, 10, 10, INK, 0); }
  for (let i = 0; i < 4; i++) sparkle(g, x + Math.cos(t * 5 + i * 1.6) * r * 0.9, y - r * 0.5 + Math.sin(t * 7 + i) * r * 0.3, 26, (t * 2 + i / 4) % 1);
  for (let i = 0; i < 3; i++) { const k = (t * 1.3 + i / 3) % 1; g.save(); g.translate(x + (i - 1) * r * 0.5, y - r * 0.4); g.rotate(k * 6); HATS.shako(g, 30, 30, 4, { hatCol: "#1f1a24" }); g.restore(); }
}
const campBg = (night) => (g) => {
  sky3(g, -800, -900, 2700, 2300, night ? "#0d1236" : "#3a3a7a", night ? "#1f2650" : "#d98a6a", night ? "#2a3060" : "#f2c48a");
  if (!night) sunGlow(g, 900, 1100, 60, "255,190,120");
  smoothHills(g, -800, 1900, 1150, 160, night ? "#1d2440" : "#6a5a7a", 3, 5);
  ground(g, 1250, night ? "#2f3f2a" : "#7a8a4a", -800, 1900);
  for (let i = 0; i < 8; i++) tent(g, -600 + i * 330, 1300 + (i % 2) * 40, 220, 200, night ? "#b9b4a4" : "#efe6d2", 5);
  paintGrain(g, -800, -900, 2700, 3200, 0.08);
};
function buildShots() {
  const day = cached("campD", -800, -900, 2700, 3200, campBg(false), 1.1);
  const nightBg = cached("campN", -800, -900, 2700, 3200, campBg(true), 1.1);
  const nightB = cached("campNB", -800, -900, 2700, 3200, campBg(true), 0.8, 5);
  // 0 — hook: fighting nobody
  { const tY = wt(0, "1788"), tT = wt(0, "thousands"), tE = wt(0, "enemy"), tN = wt(0, "wasn't");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tN - 0.1, 540, 1300, 1.05, -3], [tN + 0.4, 820, 1500, 1.4, 3], [8, 820, 1500, 1.44, 3]]);
      layer(g, cam, 0.7, nightB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 6; i++) { const x = 60 + (i % 3) * 170, y = 1640 + Math.floor(i / 3) * 120; guy(g, AUS, { x, y, h: 400, expr: "shout", walk: t * 2.2 + i * 0.2, lean: 8, armR: [2.0 + Math.sin(t * 9 + i) * 0.5, -0.4], hold: { r: "sword" }, swordAng: -0.8 + Math.sin(t * 9 + i) * 0.6, blink: 0, t }); }
        for (let i = 0; i < 5; i++) dust(g, 520 + i * 60, 1720, 70, ((t * 1.3 + i * 0.2) % 1), i + Math.floor(t * 1.3));
        // the enemy: nobody
        g.save(); g.globalAlpha = 0.25; ell(g, 860, 1700, 200, 30, "#ffe8a0", 0); g.restore();
        if (t > tE) { const k = clamp((t - tE) / 0.2); g.save(); g.globalAlpha = k; g.setLineDash([16, 12]); ell(g, 860, 1420, 80, 80, null, 6); line(g, [[860, 1500], [860, 1640]], 6); line(g, [[860, 1640], [820, 1700]], 6); line(g, [[860, 1640], [900, 1700]], 6); g.restore(); strokeText(g, "?", 860, 1420, 90, { fill: "#ffe08a" }); }
      });
      stamp(g, "1788", 540, 330, 150, t, tY - 0.05, tT - 0.1);
      label(g, "THOUSANDS OF CASUALTIES", 540, 330, 56, t, tT, tE - 0.05, { fill: "#ffd0c0" });
      stamp(g, "ENEMY: NOT THERE", 540, 330, 82, t, tN, 999);
    }, { type: "cut", d: 0 }, night(0.3));
    ev(tY, "boom"); ev(0.2, "warcry"); ev(tN, "boing");
  }
  // 1 — hussars find the schnapps
  { const t0 = S(1) - 0.1, tO = wt(1, "Ottoman"), tSt = wt(1, "stumbled"), tB = wt(1, "barrel"), tD = wt(1, "drinking");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 300, 1300, 0.95, 0], [tB - t0, 600, 1350, 1.15, 0], [tD - t0 + 0.3, 640, 1400, 1.3, 2], [8, 640, 1400, 1.33, 2]]);
      layer(g, cam, 0.7, day);
      layer(g, cam, 1, (g) => {
        const ride = clamp((t - t0) / (tSt - t0 + 0.4));
        if (t < tB) for (let i = 0; i < 3; i++) { const x = lerp(-400, 260, ride) - i * 260, y = 1720 + i * 30; const hs = horse(g, { x, y, h: 330, phase: ride < 1 ? t * 1.8 + i * 0.3 : null, t, col: ["#6a4a2a", "#2a2230", "#8a6a4a"][i] }); guy(g, HUS, { x: hs.saddle[0] + 6, y: hs.saddle[1] + 110, h: 250, sit: true, expr: t > tSt ? "shock" : "determined", look: 0.8, armR: [1.4, -0.4], t, shadow: false, beard: null }); }
        else for (let i = 0; i < 3; i++) { const x = 360 + i * 300 - (i === 1 ? 0 : 0), d = i === 2 ? -1 : 1; guy(g, { ...HUS, beard: "#3a2a22" }, { x: i === 1 ? 900 : x, y: 1780 - (i === 1 ? 30 : 0), h: 470, dir: i === 1 ? -1 : d, expr: t > tD ? "laugh" : "happy", armR: [2.0 + Math.sin(t * 5 + i) * 0.4, 0.4], hold: { r: "cup" }, headTilt: Math.sin(t * 3 + i) * 6, blink: blinkAt(t, i), t }); }
        barrel(g, 640, 1760, 300, "#9a6a3a", "SCHNAPPS");
        if (t > tD) for (let i = 0; i < 3; i++) { const k = ((t * 0.9 + i / 3) % 1); g.save(); g.globalAlpha = 1 - k; strokeText(g, "hic!", 420 + i * 220, 1150 - k * 120, 40, { fill: "#fff" }); g.restore(); }
      });
      label(g, "LOOKING FOR THE OTTOMANS", 540, 330, 54, t, tO, tB - 0.05);
      stamp(g, "FOUND: SCHNAPPS", 540, 330, 92, t, tB, E(1) + 0.2);
    }, { type: "flash", d: 0.2 }, warm(0.25));
    ev(t0, "gallop"); ev(tB, "ding"); ev(tD, "laugh");
  }
  // 2 — the infantry want a share → brawl
  { const t0 = S(2) - 0.1, tI = wt(2, "infantry"), tDe = wt(2, "demanded"), tBr = wt(2, "brawl");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 600, 1350, 1.1, 0], [tBr - t0, 600, 1380, 1.15, 0], [tBr - t0 + 0.3, 600, 1450, 1.35, -3], [6, 600, 1450, 1.4, -3]]);
      layer(g, cam, 0.7, day);
      layer(g, cam, 1, (g) => {
        barrel(g, 640, 1760, 300, "#9a6a3a", "SCHNAPPS");
        if (t < tBr) {
          guy(g, { ...HUS, beard: "#3a2a22" }, { x: 380, y: 1780, h: 470, expr: "angry", armR: [2.0, 0.4], hold: { r: "cup" }, blink: blinkAt(t, 1), t });
          for (let i = 0; i < 2; i++) guy(g, AUS, { x: lerp(1300, 900 + i * 140, ss((t - tI + 0.2) / 0.8)), y: 1780 + i * 30, h: 480, dir: -1, expr: t > tDe ? "angry" : "neutral", walk: t < tI + 0.6 ? t * 2 : null, armR: t > tDe ? [1.8, -0.2] : [0.3, 0.2], blink: blinkAt(t, 5 + i), t });
          if (t > tDe) shout(g, 860, 1060, "SHARE IT!", 54, clamp((t - tDe) / 0.15));
        } else brawl(g, 620, 1520, 320, t);
      });
      label(g, "INFANTRY ARRIVES", 540, 330, 68, t, tI, tBr - 0.05);
      stamp(g, "BRAWL!", 540, 330, 140, t, tBr, E(2) + 0.3);
    }, { type: "whip", d: 0.3 }, warm(0.25));
    ev(tI, "march", 0.6); ev(tBr, "impact"); ev(tBr + 0.2, "scramble"); ev(tBr + 0.6, "clank", 0.5); KICKS.push({ t: tBr, a: 18 });
  }
  // 3 — a shot in the dark: "Turks!"
  { const t0 = S(3) - 0.1, tF = wt(3, "fired"), tT = wt(3, "Turks"), tDk = wt(3, "dark");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [tF - t0 + 0.1, 540, 1300, 1.12, 0], [tT - t0 + 0.2, 540, 1260, 1.3, 4], [6, 540, 1260, 1.33, 4]]);
      layer(g, cam, 0.7, nightBg);
      layer(g, cam, 1, (g) => {
        campfire(g, 540, 1800, 70, t);
        for (let i = 0; i < 5; i++) { const x = 120 + i * 210, y = 1720 + (i % 2) * 40; guy(g, i % 2 ? HUS : AUS, { x, y, h: 420, dir: i < 2 ? 1 : -1, expr: t > tT ? "scared" : t > tF ? "shock" : "neutral", look: t > tF ? (i % 2 ? 1 : -1) : 0, armL: t > tT ? [-2.8, 0] : undefined, armR: t > tT ? [2.8, 0] : undefined, blink: blinkAt(t, i), t }); }
        if (t > tF) { const k = (t - tF) / 0.5; boomFx(g, 980, 1200, 90, k * 2); }
        ["TURKS!", "TURKS!!", "TURKS!"].forEach((w, i) => { if (t > tT + i * 0.18) shout(g, [260, 760, 520][i], [1000, 940, 760][i], w, 56, clamp((t - tT - i * 0.18) / 0.12)); });
      });
    }, { type: "xfade", d: 0.3 }, night(0.35));
    ev(tF, "gunshot"); ev(tT, "warcry"); ev(tT + 0.2, "gasp"); KICKS.push({ t: tF, a: 14 });
  }
  // 4 — "Halt!" heard as "Allah!"
  { const t0 = S(4) - 0.1, tH = wt(4, "Halt"), tM = wt(4, "misheard"), tA = wt(4, "Allah");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 380, 1250, 1.2, 0], [tM - t0 - 0.2, 400, 1250, 1.25, 0], [tM - t0 + 0.4, 760, 1250, 1.2, 0], [7, 770, 1250, 1.23, 0]]);
      layer(g, cam, 0.7, nightB);
      layer(g, cam, 1, (g) => {
        guy(g, OUTF.officer, { x: 300, y: 1760, h: 580, expr: "shout", armR: [2.5, 0], hold: { r: "sword" }, swordAng: -1.4, blink: 0, t, mouthOpen: 1 });
        if (t > tH) shout(g, 380, 980, "HALT!", 80, clamp((t - tH) / 0.12), "#b8262f", [380, 1180]);
        for (let i = 0; i < 3; i++) guy(g, AUS, { x: 760 + i * 150, y: 1720 + (i % 2) * 50, h: 440, dir: -1, expr: t > tA ? "scared" : "neutral", look: 1, blink: blinkAt(t, 7 + i), t, sweat: t > tA ? (t * 0.8 + i * 0.3) % 1 : 0 });
        if (t > tA) shout(g, 900, 1000, "ALLAH?!", 72, clamp((t - tA) / 0.12), "#2f5fae");
        if (t > tM - 0.1 && t < tA) { const k = (t - tM + 0.1) * 3; strokeText(g, "→ ?", 640, 1020, 70, { fill: "#ffe08a" }); void k; }
      });
      label(g, "IN GERMAN", 540, 330, 66, t, wt(4, "German"), tM - 0.05);
      label(g, "MISHEARD!", 540, 330, 86, t, tM, E(4) + 0.2, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.25 }, night(0.35));
    ev(tH, "pop"); ev(tA, "sting", 0.7);
  }
  // 5 — chaos: charging their own camp, firing on their own tents, retreat
  { const t0 = S(5) - 0.1, tCh = wt(5, "charged"), tAr = wt(5, "artillery"), tR = wt(5, "retreated"), tC = wt(5, "chaos");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1420, 1.1, 0], [tAr - t0, 640, 1400, 1.1, 2], [tR - t0, 540, 1450, 1.1, -2], [9, 540, 1450, 1.12, -2]]);
      layer(g, cam, 0.85, nightBg);
      layer(g, cam, 1, (g) => {
        // artillery firing at friendly tents
        if (t > tAr - 0.2) { cannon(g, { x: -150, y: 1700, h: 140, recoil: ((t - tAr) * 2) % 1 < 0.2 ? 1 : 0 }); for (let k = 0; k < 4; k++) { const tk = tAr + k * 0.55; boomFx(g, 500 + k * 220, 1300, 160, (t - tk) / 0.5); smokePuff(g, 500 + k * 220, 1300, 160, (t - tk) / 1.2, k); } }
        // cavalry through the camp
        for (let i = 0; i < 3; i++) { const x = lerp(-500, 1700, clamp((t - tCh - i * 0.25) / 2.6)), y = 1640 + i * 50; if (x < -400 || x > 1650) continue; const hs = horse(g, { x, y, h: 300, phase: t * 2.6 + i, t, col: ["#6a4a2a", "#2a2230", "#8a6a4a"][i] }); guy(g, HUS, { x: hs.saddle[0] + 6, y: hs.saddle[1] + 100, h: 230, sit: true, expr: "shout", armR: [2.3, 0], hold: { r: "sword" }, swordAng: -0.5, t, shadow: false }); }
        // retreat
        if (t > tR - 0.2) for (let i = 0; i < 8; i++) { const x = lerp(1300, -500, clamp((t - tR - i * 0.1) / 2.5)) + (i % 3) * 90, y = 1800 + (i % 2) * 40; guy(g, AUS, { x, y, h: 330, dir: -1, expr: "scared", walk: t * 3 + i * 0.3, lean: 10, armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t }); dust(g, x + 80, y, 50, ((t * 2 + i * 0.2) % 1), i); }
      });
      label(g, "CAVALRY vs OWN CAMP", 540, 330, 58, t, tCh, tAr - 0.05);
      label(g, "ARTILLERY vs OWN TENTS", 540, 330, 56, t, tAr, tR - 0.05);
      stamp(g, "RETREAT!", 540, 330, 120, t, tR, 999);
    }, { type: "whip", d: 0.3 }, night(0.3));
    ev(tCh, "gallop"); ev(tCh, "warcry"); for (let k = 0; k < 4; k++) { ev(tAr + k * 0.55, "cannon", 0.8); KICKS.push({ t: tAr + k * 0.55, a: 12 }); } ev(tR, "scramble"); ev(tC, "boing");
  }
}
