// 01 — The Kettle War (1784)
"use strict";
window.MOOD = "comic";
function windmill(g, x, y, s, t) {
  const u = s / 100;
  poly(g, [[x - 30 * u, y], [x - 18 * u, y - 120 * u], [x + 18 * u, y - 120 * u], [x + 30 * u, y]], "#c9895a", 4);
  poly(g, [[x - 22 * u, y - 120 * u], [x, y - 145 * u], [x + 22 * u, y - 120 * u]], "#7a4a2a", 4);
  for (let i = 0; i < 4; i++) { const a = t * 0.8 + (i * Math.PI) / 2; g.save(); g.translate(x, y - 120 * u); g.rotate(a); rect(g, -6 * u, -95 * u, 22 * u, 90 * u, "#f3ecda", 3); g.restore(); }
  ell(g, x, y - 120 * u, 6 * u, 6 * u, "#5a3b2a", 3);
}
function deck(g, y, x0 = -800, x1 = 1900) {
  g.fillStyle = vgrad(g, y, y + 700, [[0, "#b98a5a"], [1, "#7a5232"]]); g.fillRect(x0, y, x1 - x0, 1400);
  for (let i = 0; i < 18; i++) line(g, [[x0, y + i * i * 6], [x1, y + i * i * 6]], 3, "rgba(50,25,10,0.45)");
  line(g, [[x0, y], [x1, y]], 6);
}
function rail(g, y, x0 = -800, x1 = 1900) { line(g, [[x0, y - 110], [x1, y - 110]], 16, "#6b4024"); for (let x = x0; x < x1; x += 120) line(g, [[x, y - 110], [x, y]], 10, "#6b4024"); }
const soupSplat = (g, x, y, r, k, seed) => { if (k <= 0) return; for (let i = 0; i < 14; i++) { const a = rnd(seed + i) * TAU, d = r * easeOut(k) * (0.4 + rnd(seed * 3 + i)); const yy = y + Math.sin(a) * d + k * k * r * 0.8; ell(g, x + Math.cos(a) * d, yy, r * 0.09 * (1 - k * 0.4), r * 0.07, "#c9792a", 3); } boomFx(g, x, y, r * 0.8, k * 1.4); };

function buildShots() {
  // 0 — hook: dinner is about to be ruined
  { const t0 = 0, tR = wt(0, "ruined"), tD = wt(0, "dinner");
    const bg = cached("deck0", -600, -300, 2300, 2600, (g) => {
      sky3(g, -600, -300, 2300, 1400, "#5d84d0", "#f1b48c", "#ffe0a8");
      sea(g, 1050, 0, -600, 1700, "#4a8fc0", "#2a5f8a");
      deck(g, 1350, -600, 1700); rail(g, 1350, -600, 1700);
      line(g, [[880, 1350], [880, -300]], 40, "#6b4024");
      paintGrain(g, -600, -300, 2300, 2600, 0.07);
    }, 1.2, 2);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 560, 1380, 1.25, 0], [tR - 0.2, 560, 1400, 1.4, 0], [tR + 0.15, 560, 1420, 1.5, -4], [6, 560, 1420, 1.52, -4]]);
      layer(g, cam, 0.7, bg);
      layer(g, cam, 1, (g) => {
        const hit = t > tR;
        guy(g, OUTF.impSailor, { x: 360, y: 1760, h: 560, expr: hit ? "shock" : "happy", armR: [hit ? 2.6 : 1.3, -0.3], armL: hit ? [-2.6, 0.2] : [-0.3, 0.2], blink: blinkAt(t, 3), t, sweat: hit ? 0.3 : 0 });
        line(g, [[560, 1620], [630, 1440]], 10, "#8a5a32"); // ladle
        kettle(g, 640, 1740, 380, t, !hit, hit ? 1 : 0);
        if (!hit) for (let i = 0; i < 3; i++) { g.save(); g.globalAlpha = 0.85; strokeText(g, "~", 420 + i * 30, 1180 - ((t * 60 + i * 30) % 90), 50, { fill: "#fff", lw: 6, shadow: false }); g.restore(); }
        if (hit) { soupSplat(g, 640, 1500, 520, (t - tR) / 0.6, 4); for (let i = 0; i < 8; i++) ell(g, 300 + rnd(i) * 160, 1240 + rnd(i * 2) * 300, 16, 10, "#c9792a", 3); }
        if (t > tR - 0.35 && t < tR) { const k = (t - tR + 0.35) / 0.35; cannonball(g, lerp(1300, 660, k), lerp(1100, 1560, k), 46); motionTrail(g, [[1700, 800], [lerp(1300, 660, k), lerp(1100, 1560, k)]], 30); }
      });
      if (t > tR && t < tR + 0.12) { g.fillStyle = "rgba(255,255,255,0.8)"; g.fillRect(0, 0, W, H); }
      stamp(g, "DINNER: RUINED", 540, 330, 92, t, tD, E(0) + 0.3);
    });
    ev(tR - 0.35, "whoosh"); ev(tR, "clank"); ev(tR, "boom"); ev(tR + 0.05, "splat"); KICKS.push({ t: tR, a: 26 });
  }
  // the river scene, shared by shots 1-3
  const river = cached("river", -1200, -1100, 4400, 3500, (g) => {
    sky3(g, -1200, -1100, 4400, 2200, "#4f86d0", "#a9cdee", "#e9eedc");
    smoothHills(g, -1200, 3200, 1080, 40, "#93b06a", 2, 5);
    for (let i = 0; i < 6; i++) windmill(g, -900 + i * 760 + rnd(i) * 200, 1070, 110 + rnd(i) * 40, 0.4 + i);
    for (let i = 0; i < 18; i++) house(g, -1000 + i * 240 + rnd(i) * 60, 1075, 70, 60, ["#c9895a", "#efe2c4", "#a85a3a"][i % 3], "#8a3a2a", 3);
    paintGrain(g, -1200, -1100, 4400, 3500, 0.07);
  }, 1.0, 2);
  const shipsAt = (g, t, dx, fire, hitK, flagUp) => {
    sailShip(g, { x: 230 + dx, y: 1420, h: 420, t, flag: FLAGS.dutch, guns: 5, hull: "#5a3b2a", stripe: "#e7c15f", seed: 1, deck: (g, u) => { guy(g, OUTF.dutchCaptain, { x: 20 * u, y: -14 * u, h: 36 * u, expr: fire ? "shout" : "determined", armR: [2.1, 0], t, shadow: false }); } });
    sailShip(g, { x: 1450, y: 1460, h: 380, t, dir: -1, flag: flagUp ? FLAGS.white : FLAGS.imperial, hull: "#8a6a3a", stripe: "#c0392b", seed: 3, sail: "#efe2c4", deck: (g, u) => {
      kettle(g, 10 * u, -14 * u, 12 * u, t, hitK <= 0, hitK > 0 ? 1 : 0);
      for (let i = 0; i < 3; i++) guy(g, OUTF.impSailor, { x: (-30 + i * 14) * u, y: -14 * u, h: 32 * u, dir: -1, expr: hitK > 0 ? "shock" : "neutral", armR: flagUp ? [3, 0] : [0.3, 0.2], armL: flagUp ? [-3, 0] : [-0.3, 0.2], t, shadow: false, blink: blinkAt(t, 9 + i) });
      if (hitK > 0) soupSplat(g, 10 * u, -18 * u, 60 * u, hitK, 7);
    } });
  };
  // 1 — October 1784, the Scheldt
  { const t0 = S(1) - 0.1, tO = wt(1, "October"), tD = wt(1, "Dutch"), tH = wt(1, "Holy"), tB = wt(1, "boiled"), tS = wt(1, "Scheldt");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 840, 1100, 0.55, 0], [tD - t0, 840, 1150, 0.6, 0], [tD - t0 + 0.5, 300, 1200, 0.95, 0], [tH - t0 - 0.1, 320, 1200, 0.95, 0], [tH - t0 + 0.6, 1420, 1220, 0.95, 0], [tS - t0, 1400, 1220, 0.95, 0], [tS - t0 + 0.8, 840, 1180, 0.6, 0], [9, 840, 1180, 0.62, 0]]);
      layer(g, cam, 0.85, river);
      layer(g, cam, 1, (g) => { sea(g, 1150, t, -1200, 3200, "#5c9cc8", "#356f9c"); shipsAt(g, t, 0, false, 0, false); if (t > tB) for (let i = 0; i < 6; i++) { const k = ((t - tB) * 0.8 + i / 6) % 1; g.save(); g.globalAlpha = (1 - k) * 0.7; ell(g, 840 + Math.sin(i * 2) * 120, 1300 - k * 260, 30 + k * 30, 22 + k * 20, "#fff", 4); g.restore(); } });
      stamp(g, "OCTOBER 1784", 540, 330, 104, t, tO - 0.05, tD - 0.05);
      label(g, "DUTCH REPUBLIC", 540, 330, 72, t, tD, tH - 0.1, { font: "Cinzel", fill: "#ffb36b" });
      label(g, "HOLY ROMAN EMPIRE", 540, 330, 64, t, tH, tS - 0.1, { font: "Cinzel", fill: "#ffe08a" });
      label(g, "THE SCHELDT RIVER", 540, 330, 64, t, tS, E(1) + 0.2, { font: "Cinzel", fill: "#cfe9ff" });
    }, { type: "flash", d: 0.2 });
    ev(t0, "whoosh"); ev(tO, "boom"); ev(tD, "pop"); ev(tH, "pop"); ev(tB, "bubble");
  }
  // 2 — the warning shot
  { const t0 = S(2) - 0.1, tA = wt(2, "approached"), tF = wt(2, "fired"), tSh = wt(2, "shot");
    shot(t0, (g, t, lt) => {
      const dx = lerp(-200, 220, ss((t - t0) / (tF - t0)));
      const cam = camAt(lt, [[0, 500, 1250, 0.95, 0], [tF - t0 - 0.2, 620, 1300, 1.25, 2], [tF - t0 + 0.3, 600, 1300, 1.15, -2], [9, 600, 1300, 1.17, -2]]);
      layer(g, cam, 0.85, river);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -1200, 3200, "#5c9cc8", "#356f9c"); shipsAt(g, t, dx, t > tF - 0.4, 0, false);
        const k = (t - tSh) / 0.9; cannon(g, { x: 560 + dx * 0.0 + dx, y: 1360, h: 60, recoil: k > 0 && k < 0.3 ? 1 - k / 0.3 : 0 });
        if (k > 0) { boomFx(g, 650 + dx, 1355, 120, k * 1.6); smokePuff(g, 680 + dx, 1340, 140, k, 3); }
      });
      label(g, "ONE WARNING SHOT", 540, 330, 68, t, tSh, E(2) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(t0, "whoosh"); ev(tA, "creak"); ev(tSh, "cannon"); KICKS.push({ t: tSh, a: 22 });
  }
  // 3 — the cannonball misses the hull... and finds the soup
  { const t0 = S(3) - 0.1, tM = wt(3, "missed"), tS = wt(3, "smashed"), tK = wt(3, "kettle"), tSo = wt(3, "soup");
    shot(t0, (g, t, lt) => {
      const u = clamp((t - t0) / (tS - t0)), bx = lerp(700, 1440, u), by = 1330 - Math.sin(u * Math.PI) * 120 + u * 20;
      const camx = t < tS ? bx : 1440;
      const cam = { x: camx, y: 1310, z: t < tS ? 1.6 : lerp(1.6, 2.4, ss((t - tS) / 0.5)) * (1 + 0.006 * (t - tS)), r: 0 };
      layer(g, cam, 0.85, river);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -1200, 3200, "#5c9cc8", "#356f9c"); shipsAt(g, t, 220, true, (t - tS) / 0.8, false);
        if (t < tS) { cannonball(g, bx, by, 16); motionTrail(g, [[bx - 220, by + 20], [bx - 10, by]], 12); }
        if (t > tM - 0.2 && t < tS) { g.save(); g.globalAlpha = 0.9; strokeText(g, "MISS!", 1400, 1180, 34, { fill: "#cfe9ff" }); g.restore(); }
      });
      if (t > tS && t < tS + 0.1) { g.fillStyle = "rgba(255,255,255,0.85)"; g.fillRect(0, 0, W, H); }
      stamp(g, "SOUP: HIT", 540, 330, 110, t, tSo, E(3) + 0.2);
    }, { type: "cut", d: 0 });
    ev(t0, "whoosh", 0.8); ev(tS, "clank"); ev(tS, "boom", 0.8); ev(tS + 0.05, "splat"); KICKS.push({ t: tS, a: 20 });
  }
  // 4 — instant surrender; one casualty
  { const t0 = S(4) - 0.1, tSu = wt(4, "surrendered"), tC = wt(4, "casualty"), tP = wt(4, "proves");
    shot(t0, (g, t, lt) => {
      const close = t > tC - 0.15;
      if (!close) {
        const cam = camAt(lt, [[0, 1300, 1250, 1.0, 0], [tSu - t0 + 0.3, 1350, 1200, 1.15, 0], [9, 1350, 1200, 1.18, 0]]);
        layer(g, cam, 0.85, river);
        layer(g, cam, 1, (g) => { sea(g, 1150, t, -1200, 3200, "#5c9cc8", "#356f9c"); shipsAt(g, t, 220, false, 1.2, t > tSu); });
        label(g, "SURRENDERED", 540, 330, 86, t, tSu, tC - 0.15, { fill: "#f6f3ea" });
      } else {
        const cam = camAt(t - tC, [[0, 540, 1250, 1.0, 0], [6, 540, 1230, 1.08, 0]]);
        layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, 0, 1920, [[0, "#3a2a4a"], [1, "#1a1424"]]); g.fillRect(-400, -400, 1900, 2800); });
        layer(g, cam, 1, (g) => {
          g.save(); g.globalAlpha = 0.5; ell(g, 540, 1500, 330, 40, "#000", 0); g.restore();
          g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 540, 1200, 0, 600, [[0, "rgba(255,230,170,0.35)"], [1, "rgba(255,230,170,0)"]]); g.fillRect(-100, 500, 1300, 1400); g.restore();
          kettle(g, 540, 1500, 520, t, false, 1);
          rect(g, 600, 1260, 120, 40, "#f6f3ea", 4, 6); line(g, [[620, 1270], [700, 1290]], 3, "#c9c4b8"); // bandage
          g.beginPath(); g.ellipse(540, 860, 140, 30, 0, 0, TAU); g.lineWidth = 14; g.strokeStyle = "#ffe08a"; g.stroke(); // halo
        });
        stamp(g, "CASUALTIES: 1 KETTLE", 540, 330, 76, t, tC, 999, { rot: -2 });
      }
    }, { type: "xfade", d: 0.3 });
    ev(tSu, "pop"); ev(tC - 0.1, "sadtrombone"); ev(tP, "whoosh", 0.5);
  }
}
