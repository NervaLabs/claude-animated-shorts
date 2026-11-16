// 13 — The Great London Beer Flood (1814)
"use strict";
window.MOOD = "comic";
const londonSt = (g) => {
  sky3(g, -900, -1200, 2900, 2500, "#7a8aa8", "#b8c0cc", "#e2dccb");
  for (let i = 0; i < 11; i++) { const x = -800 + i * 260, h = 380 + rnd(i) * 160; brickWall(g, x, 1300 - h, 240, h, ["#9a4a3a", "#8a5a4a", "#a86a4a"][i % 3], 4); for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) rect(g, x + 40 + c * 100, 1300 - h + 60 + r * 140, 60, 90, "#3a3a4a", 4); rect(g, x + 200, 1300 - h - 60, 30, 60, "#6a4a3a", 4); }
  g.fillStyle = vgrad(g, 1300, 2400, [[0, "#8a8278"], [1, "#5a564e"]]); g.fillRect(-900, 1300, 2900, 1400); line(g, [[-900, 1300], [2000, 1300]], 6);
  paintGrain(g, -900, -1200, 2900, 3900, 0.08);
};
const brewery = (g) => {
  g.fillStyle = vgrad(g, -400, 1700, [[0, "#3a2a22"], [1, "#6a4a32"]]); g.fillRect(-900, -900, 2900, 2600);
  for (let i = 0; i < 6; i++) { line(g, [[-800 + i * 500, -900], [-800 + i * 500, 1600]], 30, "#4a3424"); }
  g.fillStyle = "#4a3a2a"; g.fillRect(-900, 1600, 2900, 900); line(g, [[-900, 1600], [2000, 1600]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.1);
};
function buildShots() {
  const st = cached("lon", -900, -1200, 2900, 3900, londonSt, 1.0);
  const stB = cached("lonB", -900, -1200, 2900, 3900, londonSt, 0.7, 5);
  const br = cached("brew", -900, -900, 2900, 3400, brewery, 0.9);
  // 0 — hook: a tsunami of beer
  { const tY = wt(0, "1814"), tT = wt(0, "tsunami");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [4, 540, 1300, 1.02, -3]]);
      layer(g, cam, 0.7, stB);
      layer(g, cam, 1, (g) => {
        const wx = lerp(-200, 1400, clamp(t / 4.2));
        for (let i = 0; i < 3; i++) guy(g, i % 2 ? OUTF.townsman : OUTF.townswoman, { x: 700 + i * 160 + Math.min(0, wx - 600) * 0, y: 1760, h: 420, dir: -1, expr: "scared", look: -1, walk: t * 2.4, lean: 10, armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t });
        beerWave(g, -1000, wx, 1650, t, 520);
      });
      stamp(g, "1814", 540, 330, 150, t, tY - 0.05, tT - 0.05);
      stamp(g, "A BEER TSUNAMI", 540, 330, 100, t, tT, E(0) + 0.3);
    });
    ev(0.1, "rumble"); ev(tY, "boom", 0.6); ev(tT, "splash"); ev(tT, "gasp");
  }
  // 1 — the vat and the snapped hoop
  { const t0 = S(1) - 0.1, tM = wt(1, "Meux"), tSn = wt(1, "snapped"), tH = wt(1, "hundred");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.75, 0], [tSn - t0 - 0.1, 540, 1150, 1.0, 0], [tSn - t0 + 0.3, 600, 1100, 1.15, 3], [9, 600, 1100, 1.18, 3]]);
      layer(g, cam, 0.8, br);
      layer(g, cam, 1, (g) => {
        vat(g, 540, 1600, 900, 1250, t > tSn ? 1 : 0);
        for (let i = 0; i < 2; i++) guy(g, { tunic: "#7a5a3a", trim: "#d9c08a", helmet: "cap", hatCol: "#5a3a22", trousers: "#3a3a4a" }, { x: 120 + i * 840, y: 1780, h: 380, dir: i ? -1 : 1, expr: t > tSn ? "shock" : "neutral", look: -1, headTilt: -10, blink: blinkAt(t, i), t });
        if (t > tSn) shout(g, 800, 950, "PING!", 70, clamp((t - tSn) / 0.12), "#4a4a52");
      });
      label(g, "MEUX & CO. BREWERY", 540, 330, 66, t, tM, tSn - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "130,000+ GALLONS", 540, 330, 92, t, tH - 0.1, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tSn, "clank"); ev(tSn + 0.05, "crack"); KICKS.push({ t: tSn, a: 10 });
  }
  // 2 — chain reaction; through the brick walls
  { const t0 = S(2) - 0.1, tR = wt(2, "ruptured"), tU = wt(2, "unleashing"), tBr = wt(2, "brick"), tN = wt(2, "neighborhood");
    shot(t0, (g, t, lt) => {
      const out = t > tBr - 0.2;
      if (!out) {
        const cam = camAt(lt, [[0, 540, 1150, 0.8, 0], [5, 540, 1150, 0.85, -2]]);
        layer(g, cam, 0.8, br);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) { const bt = tR + i * 0.4; vat(g, 60 + i * 480, 1600, 420, 900, t > bt ? 1 : 0); if (t > bt) { boomFx(g, 60 + i * 480, 1100, 200, (t - bt) / 0.5); beerWave(g, -200 + i * 480, 300 + i * 480, 1600 - (t - bt) * 40, t, 120 + (t - bt) * 120); } } });
        label(g, "CHAIN REACTION", 540, 330, 86, t, tR, tU);
        stamp(g, "300,000+ GALLONS", 540, 330, 92, t, tU, tBr);
      } else {
        const cam = camAt(t - tBr, [[0, 540, 1250, 0.9, 0], [5, 540, 1250, 0.95, 0]]);
        layer(g, cam, 0.7, stB);
        layer(g, cam, 1, (g) => {
          const k = clamp((t - tBr) / 0.6);
          for (let i = 0; i < 9; i++) { g.save(); g.translate(-100 + Math.cos(i) * k * 400, 1100 - Math.sin(i * 2) * k * 300 + k * k * 400); g.rotate(k * (i - 4)); rect(g, -40, -22, 80, 44, "#9a4a3a", 4); g.restore(); }
          beerWave(g, -1000, lerp(-100, 1600, clamp((t - tBr) / 2.5)), 1700, t, 600);
        });
        label(g, "INTO THE STREETS", 540, 330, 80, t, tN - 0.2, 999);
      }
    }, { type: "xfade", d: 0.3 });
    for (let i = 0; i < 3; i++) ev(tR + i * 0.4, "crack"); ev(tU, "splash"); ev(tBr, "crash"); ev(tBr + 0.3, "rumble"); KICKS.push({ t: tBr, a: 20 });
  }
  // 3 — eight lives; "Act of God"
  { const t0 = S(3) - 0.1, tE = wt(3, "Eight"), tC = wt(3, "coroner's"), tA = wt(3, "Act");
    shot(t0, (g, t, lt) => {
      const court = t > tC - 0.2;
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [8, 540, 1150, 1.1, 0]]);
      layer(g, cam, 0.6, court ? (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#3a2a2a"], [1, "#6a4a3a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 140, 500, 800, 500, "#4a3424", 7, 6); g.fillStyle = "#3a2a1e"; g.fillRect(-500, 1550, 2100, 900); } : (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#2a2a3a"], [1, "#141420"]]); g.fillRect(-500, -500, 2100, 3000); });
      layer(g, cam, 1, (g) => {
        if (!court) { for (let i = 0; i < 8; i++) { const x = 190 + (i % 4) * 230, y = 1300 + Math.floor(i / 4) * 250; rect(g, x - 14, y, 28, 110, "#f2efe6", 4, 4); flame(g, x, y - 8, 14, t + i); } }
        else {
          rect(g, 240, 1250, 600, 300, "#6b4024", 7, 6);
          guy(g, { tunic: "#1f1a24", trim: "#f2efe6", helmet: "wig", hair: "#ece8e0", hairUnder: true, robe: true }, { x: 540, y: 1300, h: 480, expr: "stern", armR: [2.4, -1.6 + (t > tA - 0.1 ? 1.2 : 0)], blink: blinkAt(t, 1), t, shadow: false });
          line(g, [[650, 1100 + (t > tA - 0.1 ? 60 : 0)], [740, 1040 + (t > tA - 0.1 ? 60 : 0)]], 14, "#6b4024"); rect(g, 700, 1010 + (t > tA - 0.1 ? 60 : 0), 90, 50, "#6b4024", 4, 6);
        }
      });
      label(g, "8 LIVES LOST", 540, 330, 86, t, tE, tC - 0.2, { font: "Cinzel", fill: "#e6e0f2" });
      label(g, "THE VERDICT:", 540, 330, 70, t, tC, tA - 0.05);
      stamp(g, "“ACT OF GOD”", 540, 330, 110, t, tA, 999);
    }, { type: "black", d: 0.4 });
    ev(tE, "drone"); ev(tA, "clank", 0.7); ev(tA, "boom", 0.5);
  }
}
