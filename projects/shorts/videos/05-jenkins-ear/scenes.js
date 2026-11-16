// 05 — The War of Jenkins' Ear (1739)
"use strict";
window.MOOD = "war";
const JEN = { tunic: "#2f4f6f", trim: "#e7c15f", helmet: "tricorn", hatCol: "#1f1a24", trousers: "#e9e2cc", beard: null, boots: "#1f1a24" };
const MP = (c) => ({ tunic: c, trim: "#f2efe6", helmet: "wig", hair: "#ece8e0", hairUnder: true, trousers: "#1f1a24" });
const parliament = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#3a2a2a"], [1, "#7a5a42"]]); g.fillRect(-600, -400, 2300, 2100);
  for (let i = 0; i < 8; i++) { rect(g, -500 + i * 280, 200, 200, 900, "#4a3a2a", 6, 100); g.save(); g.globalAlpha = 0.35; rect(g, -480 + i * 280, 230, 160, 840, "#e9d9a0", 0, 80); g.restore(); }
  for (let r = 0; r < 4; r++) { rect(g, -600, 1180 + r * 90, 2300, 60, "#3f6a3a", 5, 6); }
  g.fillStyle = "#5a3a2a"; g.fillRect(-600, 1560, 2300, 900); line(g, [[-600, 1560], [1700, 1560]], 6);
  paintGrain(g, -600, -400, 2300, 2900, 0.08);
};
const earJar = (g, x, y, s, t) => jar(g, x, y, s, (g, cx, cy, u) => { g.save(); g.translate(cx, cy + Math.sin(t * 2) * 4 * u); g.rotate(Math.sin(t * 1.3) * 0.2); cartoonEar(g, 0, 0, 26 * u); g.restore(); });
function buildShots() {
  const hall = cached("parl", -600, -400, 2300, 2900, parliament, 1.1);
  const hallB = cached("parlB", -600, -400, 2300, 2900, parliament, 0.8, 5);
  const seaBg = cached("seaJ", -900, -900, 2900, 3200, (g) => { sky3(g, -900, -900, 2900, 2100, "#4f86d0", "#a9cdee", "#e6eedc"); paintGrain(g, -900, -900, 2900, 2100, 0.06); }, 0.8);
  // 0 — hook: a war... over an ear in a jar
  { const tN = wt(0, "nine-year"), tE = wt(0, "ear"), tJ = wt(0, "jar");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [tE - 0.1, 540, 1360, 1.1, 0], [tE + 0.4, 540, 1300, 1.6, 0], [6, 540, 1300, 1.65, 0]]);
      layer(g, cam, 0.7, hallB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 5; i++) guy(g, MP(["#1f1a24", "#3a2a4a", "#2a3a2a"][i % 3]), { x: 80 + i * 230, y: 1800 + (i % 2) * 30, h: 420, dir: i < 2 ? 1 : -1, expr: t > tE ? "shock" : "neutral", look: 0.5, blink: blinkAt(t, i), t });
        rect(g, 450, 1420, 180, 260, "#6b4024", 6, 6);
        g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 540, 1300, 0, 300, [[0, "rgba(255,240,180,0.45)"], [1, "rgba(255,240,180,0)"]]); g.fillRect(200, 950, 700, 700); g.restore();
        earJar(g, 540, 1420, 210, t);
      });
      label(g, "A 9-YEAR WAR", 540, 330, 86, t, tN, tE - 0.05);
      stamp(g, "...OVER AN EAR", 540, 330, 104, t, tE, E(0) + 0.3);
    });
    ev(tN, "drums"); ev(tE, "sting", 0.7); ev(tJ, "gasp");
  }
  // 1 — 1731: boarded, and the ear
  { const t0 = S(1) - 0.1, tY = wt(1, "1731"), tSp = wt(1, "Spanish"), tB = wt(1, "boarded"), tSm = wt(1, "smuggling"), tSl = wt(1, "sliced"), tJ = wt(1, "Jenkins'");
    shot(t0, (g, t, lt) => {
      const deck = t > tSm - 0.2;
      if (!deck) {
        const cam = camAt(lt, [[0, 540, 1200, 0.75, 0], [5, 540, 1220, 0.85, 0]]);
        layer(g, cam, 1, (g) => {
          seaBg(g); sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94");
          sailShip(g, { x: 280, y: 1250, h: 420, t, flag: FLAGS.union1707, hull: "#6b4024", stripe: "#e7c15f", seed: 1 });
          const x = lerp(1400, 780, ss((t - tSp) / 1.5)); sailShip(g, { x, y: 1280, h: 330, t, dir: -1, flag: FLAGS.spain, hull: "#8a5a32", stripe: "#c0262e", seed: 2 });
        });
        stamp(g, "1731", 540, 330, 150, t, tY - 0.05, tSp);
        label(g, "SPANISH COAST GUARD", 540, 330, 64, t, tSp, tB);
        label(g, "BOARDED!", 540, 330, 90, t, tB, E(1) + 0.1, { fill: "#ffe08a" });
      } else {
        const cam = camAt(t - tSm + 0.2, [[0, 540, 1350, 1.1, 0], [tSl - tSm + 0.2, 560, 1300, 1.25, 0], [tSl - tSm + 0.5, 560, 1250, 1.4, -4], [6, 560, 1250, 1.42, -4]]);
        layer(g, cam, 0.7, (g) => { seaBg(g); sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94"); g.fillStyle = vgrad(g, 1450, 2200, [[0, "#b98a5a"], [1, "#7a5232"]]); g.fillRect(-900, 1450, 2900, 1500); line(g, [[-900, 1450], [2000, 1450]], 6); });
        layer(g, cam, 1, (g) => {
          const cut = t > tSl;
          guy(g, { ...OUTF.spanish, beard: "#2a1a14", moust: true }, { x: 320, y: 1780, h: 560, expr: "angry", armR: cut ? [2.6, -0.4] : [1.2, -0.6], hold: { r: "sword" }, swordAng: cut ? -2.6 : -0.8, blink: blinkAt(t, 1), t });
          guy(g, JEN, { x: 780, y: 1780, h: 560, dir: -1, expr: cut ? "shock" : "scared", armR: cut ? [2.9, 1.2] : [0.3, 0.2], blink: 0, t });
          if (cut) { const k = clamp((t - tSl) / 1.2); g.save(); g.translate(lerp(700, 980, k), 1150 - Math.sin(k * Math.PI) * 300); g.rotate(k * 10); cartoonEar(g, 0, 0, 40); g.restore(); for (let i = 0; i < 5; i++) sparkle(g, 760 + Math.cos(t * 6 + i) * 120, 1180 + Math.sin(t * 6 + i) * 50, 22, (t * 1.5 + i / 5) % 1); }
        });
        label(g, "CAPT. ROBERT JENKINS", 540, 330, 62, t, tJ - 0.1, E(1) + 0.2);
      }
    }, { type: "flash", d: 0.2 });
    ev(t0, "whoosh"); ev(tY, "boom"); ev(tB, "clash"); ev(tSl, "whip"); ev(tSl + 0.05, "boing");
  }
  // 2 — seven years later, the ear goes to Parliament
  { const t0 = S(2) - 0.1, tS = wt(2, "Seven"), tD = wt(2, "dramatically"), tPi = wt(2, "pickled"), tP = wt(2, "Parliament");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tPi - t0, 560, 1250, 1.15, 0], [tPi - t0 + 0.5, 700, 1200, 1.5, 3], [6, 700, 1200, 1.52, 3]]);
      layer(g, cam, 0.7, hall);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 4; i++) guy(g, MP(["#1f1a24", "#3a2a4a"][i % 2]), { x: 60 + i * 140, y: 1780 + (i % 2) * 30, h: 420, expr: t > tPi ? "shock" : "neutral", look: 1, blink: blinkAt(t, i), t });
        guy(g, { ...JEN, helmet: null, hair: "#5a3b2a", hairStyle: "lion" }, { x: 820, y: 1800, h: 580, dir: -1, expr: "determined", armR: t > tD ? [2.6, -0.3] : [0.9, 0.5], blink: blinkAt(t, 9), t });
        if (t > tD - 0.3) { g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 700, 1000, 0, 260, [[0, "rgba(255,240,180,0.5)"], [1, "rgba(255,240,180,0)"]]); g.fillRect(400, 700, 600, 600); g.restore(); earJar(g, t > tD ? 700 : 760, t > tD ? 1080 : 1440, 150, t); }
      });
      label(g, "7 YEARS LATER", 540, 330, 80, t, tS, tPi - 0.05);
      stamp(g, "EXHIBIT A", 540, 330, 120, t, tPi, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tS, "whoosh", 0.6); ev(tD, "choir", 0.6); ev(tPi, "gasp");
  }
  // 3 — public fury → war
  { const t0 = S(3) - 0.1, tO = wt(3, "Outraged"), tF = wt(3, "fury"), tW = wt(3, "war"), tY = wt(3, "1739");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tW - t0, 540, 1300, 1.1, 0], [tW - t0 + 0.3, 540, 1250, 1.2, -3], [8, 540, 1250, 1.22, -3]]);
      layer(g, cam, 0.7, t < tF - 0.2 ? hallB : (g) => { sky3(g, -600, -400, 2300, 2100, "#3a2a5a", "#a85a5a", "#f2a86a"); for (let i = 0; i < 10; i++) house(g, -500 + i * 230, 1500, 200, 300, ["#9a6a4a", "#b98a6a", "#7a5a4a"][i % 3], "#4a3a3a", 5, "#ffe08a"); g.fillStyle = "#6a5a4a"; g.fillRect(-600, 1500, 2300, 900); });
      layer(g, cam, 1, (g) => {
        if (t < tF - 0.2) for (let i = 0; i < 5; i++) guy(g, MP(["#1f1a24", "#3a2a4a", "#2a3a2a"][i % 3]), { x: 100 + i * 220, y: 1780 + (i % 2) * 40, h: 460, expr: "shout", armR: [2.6 + Math.sin(t * 9 + i) * 0.2, 0], blink: 0, t, mouthOpen: 1 });
        else for (let i = 0; i < 9; i++) { const x = 40 + i * 125, y = 1780 + (i % 3) * 40; guy(g, i % 2 ? OUTF.townsman : { ...OUTF.townswoman }, { x, y, h: 380, expr: "shout", armR: [2.7, 0], hold: { r: i % 3 === 0 ? "torch" : "spear" }, spearAng: -1.5, bob: -Math.abs(Math.sin(t * 7 + i)) * 4, blink: 0, t }); }
        if (t > tW - 0.1) { g.save(); g.globalAlpha = clamp((t - tW) / 0.2); scroll(g, 540, 960, 420, 460, "WAR!", 4, -0.04); g.restore(); }
      });
      label(g, "OUTRAGE!", 540, 330, 96, t, tO, tF - 0.2);
      label(g, "PUBLIC FURY", 540, 330, 86, t, tF, tY - 0.1, { fill: "#ffd0c0" });
      stamp(g, "WAR ON SPAIN · 1739", 540, 330, 76, t, tY - 0.05, E(3) + 0.3);
    }, { type: "xfade", d: 0.3 });
    ev(tO, "gasp"); ev(tF, "cheer"); ev(tW, "boom"); ev(tY, "drums");
  }
  // 4 — nearly a decade across the Caribbean
  { const t0 = S(4) - 0.1, tD = wt(4, "decade"), tC = wt(4, "Caribbean");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 0.85, 0], [6, 540, 1200, 0.92, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#9fd6f0", "#f4ead0"); sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a");
        smoothPath(g, [[-300, 1160], [-100, 1060], [150, 1070], [300, 1160]]); fillInk(g, "#e9d6a0", 5); for (let i = 0; i < 3; i++) palm(g, -150 + i * 120, 1120, 180, 4, t);
        sailShip(g, { x: 200, y: 1400, h: 380, t, flag: FLAGS.union1707, guns: 5, hull: "#5a3b2a", seed: 1 });
        sailShip(g, { x: 950, y: 1430, h: 360, t, dir: -1, flag: FLAGS.spain, guns: 5, hull: "#8a5a32", stripe: "#c0262e", seed: 2 });
        for (let k = 0; k < 6; k++) { const tk = t0 + 0.4 + k * 0.8; boomFx(g, k % 2 ? 760 : 380, 1380, 80, (t - tk) / 0.4); smokePuff(g, k % 2 ? 760 : 380, 1370, 110, (t - tk) / 1.1, k); }
        // year counter
        const y = Math.min(1748, 1739 + Math.floor(clamp((t - tD + 0.3) / 2.2) * 9));
        rect(g, 330, 700, 420, 160, "#fff6e6", 7, 18); strokeText(g, String(y), 540, 785, 110, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false });
      });
      label(g, "THE CARIBBEAN & AMERICAS", 540, 330, 56, t, tC, 999, { font: "Cinzel", fill: "#cfe9ff" });
    }, { type: "whip", d: 0.3 });
    for (let k = 0; k < 6; k++) ev(t0 + 0.4 + k * 0.8, "cannon", 0.6); ev(tD, "pop");
  }
}
