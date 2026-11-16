// 16 — The Erfurt Latrine Disaster (1184)
"use strict";
window.MOOD = "eerie";
const NOBLE = (i) => ({ tunic: ["#7a2a4a", "#2f4f8f", "#5a7a2a", "#8a5a2a", "#4a2a6a"][i % 5], trim: "#e7c15f", hair: ["#5a3b2a", "#c58a3d", "#2a1a14", "#9a9a9a"][i % 4], beard: i % 2 ? ["#5a3b2a", "#9a9a9a"][i % 2] : null, cape: ["#c0392b", "#3a5a9a", "#d4a632"][i % 3], trousers: "#3a3a4a" });
const KNIGHT = (i) => ({ tunic: ["#f2efe6", "#c0392b", "#2f4f8f"][i % 3], trim: "#e7c15f", armor: "#b9bec8", helmet: "kettlehat", trousers: "#7a7f86" });
const KING = { tunic: "#6b2a7a", trim: "#e7c15f", hair: "#c58a3d", beard: "#c58a3d", helmet: "crown", cape: "#c0392b", trousers: "#3a3a4a" };
/** cutaway of the hall: floor 2 (y=1300), floor 1 (y=1750), cesspool below */
const cutaway = (crack) => (g) => {
  g.fillStyle = "#2a2430"; g.fillRect(-900, -900, 2900, 3800);
  rect(g, -40, 380, 1160, 2100, "#c9b49a", 8);
  poly(g, [[-120, 400], [540, -60], [1200, 400]], "#7a3a2a", 8);
  g.fillStyle = "#e9dcc0"; g.fillRect(0, 440, 1080, 860); g.fillStyle = "#d9c8a8"; g.fillRect(0, 1340, 1080, 410);
  for (let i = 0; i < 3; i++) { rect(g, 120 + i * 330, 560, 160, 260, "#7fb0d8", 5, 80); }
  g.fillStyle = "#6a4a2a"; g.fillRect(0, 1820, 1080, 680); g.fillStyle = "#7a5a2a"; g.fillRect(0, 1880, 1080, 620);
  for (let i = 0; i < 5; i++) { const x = 120 + i * 210; line(g, [[x, 2000], [x + 20, 1950], [x, 1900], [x + 20, 1850]], 5, "#9fbf5a"); }
  paintGrain(g, -900, -900, 2900, 3800, 0.08);
};
const floorBoards = (g, y, crack, t) => {
  for (let i = 0; i < 9; i++) { const x = i * 120; if (crack > 0 && i > 1 && i < 7) { const k = crack, a = (i < 4.5 ? 1 : -1) * k * 1.2; g.save(); g.translate(i < 4.5 ? x : x + 120, y); g.rotate(a); rect(g, i < 4.5 ? 0 : -120, 0, 120, 40, "#8a5a32", 5); g.restore(); } else rect(g, x, y, 120, 40, "#8a5a32", 5); }
  if (crack > 0 && crack < 0.3) for (let i = 0; i < 4; i++) sparkle(g, 300 + i * 160, y, 30, crack * 3);
};
function buildShots() {
  // 0 — hook
  { const tY = wt(0, "1184"), tD = wt(0, "dozens"), tE = wt(0, "embarrassing");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.15, 0], [6, 540, 1150, 1.25, 0]]);
      layer(g, cam, 1, (g) => {
        cutaway(0)(g); floorBoards(g, 1300, 0, t);
        for (let i = 0; i < 6; i++) guy(g, NOBLE(i), { x: 100 + i * 180, y: 1300, h: 360, dir: i < 3 ? 1 : -1, expr: t > tE ? "shock" : "talk", mouthOpen: talk(t + i), look: t > tE ? 1 : 0, headTilt: t > tE ? 10 : 0, blink: blinkAt(t, i), t });
        if (t > tE) for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, "CREAK", 300 + i * 240, 1380 + q * 30, 40, { fill: "#ffe08a" }); g.restore(); }
      });
      stamp(g, "1184", 540, 330, 150, t, tY - 0.05, tD);
      label(g, "THE MOST EMBARRASSING ACCIDENT?", 540, 330, 48, t, tE, E(0) + 0.3);
    });
    ev(tY, "boom", 0.6); ev(tE, "creak");
  }
  // 1 — King Henry VI's assembly in Erfurt
  { const t0 = S(1) - 0.1, tK = wt(1, "King"), tH = wt(1, "Holy"), tSe = wt(1, "second-floor"), tEr = wt(1, "Erfurt");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 1.3, 0], [tSe - t0, 540, 1150, 1.0, 0], [tSe - t0 + 1, 540, 1250, 0.72, 0], [10, 540, 1250, 0.74, 0]]);
      layer(g, cam, 1, (g) => {
        cutaway(0)(g); floorBoards(g, 1300, 0, t);
        rect(g, 470, 1100, 140, 200, "#6b2a3a", 6, 8);
        guy(g, KING, { x: 540, y: 1300, h: 380, expr: "stern", armR: [2.2, -0.2], blink: blinkAt(t, 1), t });
        for (let i = 0; i < 6; i++) guy(g, NOBLE(i), { x: i < 3 ? 80 + i * 120 : 760 + (i - 3) * 120, y: 1300, h: 320, dir: i < 3 ? 1 : -1, expr: "angry", blink: blinkAt(t, i), t });
        if (t > tSe) { strokeText(g, "FLOOR 2", 980, 1260, 34, { fill: "#fff" }); strokeText(g, "FLOOR 1", 980, 1720, 34, { fill: "#fff" }); strokeText(g, "CESSPOOL", 540, 2060, 54, { fill: "#d9f2a0" }); }
      });
      label(g, "KING HENRY VI", 540, 330, 80, t, tK, tH, { font: "Cinzel" });
      label(g, "NOBLES OF THE EMPIRE", 540, 330, 66, t, tH, tEr - 0.05, { font: "Cinzel" });
      label(g, "ERFURT", 540, 330, 96, t, tEr, E(1) + 0.2, { font: "Cinzel", fill: "#ffe0b0" });
    }, { type: "flash", d: 0.2 });
    ev(tK, "horns"); ev(tSe, "whoosh", 0.5);
  }
  // 2 — too many armored knights
  { const t0 = S(2) - 0.1, tA = wt(2, "armored"), tR = wt(2, "rotten"), tC = wt(2, "collapse");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 0.95, 0], [tC - t0, 540, 1250, 1.1, 0], [tC - t0 + 0.3, 540, 1350, 1.0, 3], [7, 540, 1350, 1.02, 3]]);
      const crack = clamp((t - tC) / 0.6);
      layer(g, cam, 1, (g) => {
        cutaway(crack)(g);
        const sag = crack > 0 ? 0 : clamp((t - tA) / 2) * 30;
        g.save(); g.translate(0, sag * 0.5); floorBoards(g, 1300, crack, t); g.restore();
        if (crack <= 0) {
          for (let i = 0; i < 10; i++) { const x = 60 + i * 105; guy(g, i % 3 === 0 ? NOBLE(i) : KNIGHT(i), { x, y: 1300 + sag * Math.sin((i / 9) * Math.PI), h: 300, expr: t > tR ? "scared" : "neutral", look: t > tR ? 1 : 0, headTilt: t > tR ? 12 : 0, blink: blinkAt(t, i), t }); }
          if (t > tR) for (let i = 0; i < 3; i++) strokeText(g, "CREAK", 200 + i * 340, 1400, 40, { fill: "#ffe08a" });
        } else for (let i = 0; i < 10; i++) { const x = 60 + i * 105, k = crack; guy(g, i % 3 === 0 ? NOBLE(i) : KNIGHT(i), { x: x + (540 - x) * k * 0.2, y: 1300 + k * k * 500, h: 300, expr: "shock", armL: [-2.8, 0], armR: [2.8, 0], lean: (i - 5) * 4 * k, blink: 0, t }); }
      });
      label(g, "ARMORED KNIGHTS", 540, 330, 80, t, tA, tR - 0.05);
      label(g, "ROTTEN FLOORBOARDS", 540, 330, 70, t, tR, tC - 0.05, { fill: "#ffd0c0" });
      stamp(g, "COLLAPSE!", 540, 330, 120, t, tC, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tA, "march", 0.6); ev(tR, "creak"); ev(tC, "crack"); ev(tC + 0.05, "crash"); KICKS.push({ t: tC, a: 24 });
  }
  // 3 — through the first floor, into the cesspool
  { const t0 = S(3) - 0.1, tP = wt(3, "plunged"), tCe = wt(3, "cesspool"), tS = wt(3, "sixty");
    shot(t0, (g, t, lt) => {
      const sober = t > tS - 0.2;
      if (!sober) {
        const cam = camAt(lt, [[0, 540, 1500, 0.9, 0], [tCe - t0, 540, 1700, 0.95, 0], [9, 540, 1700, 0.97, 0]]);
        layer(g, cam, 1, (g) => {
          cutaway(1)(g); floorBoards(g, 1300, 1, t); floorBoards(g, 1750, clamp((t - tP) / 0.4), t);
          for (let i = 0; i < 8; i++) { const k = clamp((t - t0 - i * 0.08) / 1.6); const x = 140 + i * 110; guy(g, i % 3 === 0 ? NOBLE(i) : KNIGHT(i), { x, y: lerp(1600, 2050, k * k), h: 280, expr: "shock", armL: [-2.8, 0], armR: [2.8, 0], lean: (i - 4) * 8, blink: 0, t }); }
          if (t > tCe) for (let i = 0; i < 6; i++) { const q = (t * 1.3 + i / 6) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 140 + i * 160, 1880 - q * 120, 30, 30, "#7a5a2a", 4); g.restore(); }
        });
        label(g, "STRAIGHT DOWN", 540, 330, 86, t, tP, tCe - 0.05);
        label(g, "INTO THE CESSPOOL", 540, 330, 80, t, tCe, tS - 0.2, { fill: "#d9f2a0" });
      } else {
        const cam = camAt(t - tS, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.08, 0]]);
        layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#2a2a3a"], [1, "#141420"]]); g.fillRect(-500, -500, 2100, 3000); });
        layer(g, cam, 1, (g) => { for (let i = 0; i < 5; i++) { const x = 220 + i * 160; rect(g, x - 16, 1300, 32, 120, "#f2efe6", 4, 4); flame(g, x, 1292, 16, t + i); } rect(g, 120, 1420, 840, 50, "#5a3b2a", 5, 6); });
        label(g, "~60 NOBLES DIED", 540, 330, 82, t, tS, 999, { font: "Cinzel", fill: "#e6e0f2" });
      }
    }, { type: "cut", d: 0 });
    ev(tP, "crack"); ev(tCe, "splash"); ev(tS, "drone");
  }
}
