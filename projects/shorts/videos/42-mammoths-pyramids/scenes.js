// 42 — Woolly Mammoths Were Alive When the Pyramids Were Built
"use strict";
window.MOOD = "epic";
const EGY = (i) => ({ tunic: "#f4f0e2", trim: "#3f74b8", hair: "#141018", skin: ["#c99067", "#b97a4a", "#d9a07a"][i % 3], trousers: "#f4f0e2", robe: i % 3 === 0 });
const desert = (g) => { sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#9fd0f0", "#fbe7b8"); sunGlow(g, 1100, 300, 80); ground(g, 1300, "#ecd08e", -900, 2000); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
const arctic = (g) => { sky3(g, -900, -900, 2900, 2100, "#8aa0c0", "#c0d0e0", "#eef2f6"); g.fillStyle = "#3f6f94"; g.fillRect(-900, 1150, 2900, 1500); line(g, [[-900, 1150], [2000, 1150]], 5); smoothPath(g, [[-200, 1250], [100, 1080], [700, 1060], [1200, 1180], [1300, 1300], [-300, 1300]]); fillInk(g, "#f4f6fa", 6); for (let i = 0; i < 6; i++) smoothPath(g, [[-800 + i * 500, 1500], [-700 + i * 500, 1470], [-560 + i * 500, 1480], [-520 + i * 500, 1520], [-780 + i * 500, 1530]]), fillInk(g, "#e9f2f8", 4); ground(g, 1300, "#e9eef4", -900, 2000); paintGrain(g, -900, -900, 2900, 3400, 0.05); };
function buildShots() {
  const ds = cached("desert", -900, -900, 2900, 3400, desert, 1.0);
  const ar = cached("arctic", -900, -900, 2900, 3400, arctic, 1.0);
  // 0 — hook: a mammoth at the pyramid building site
  { const tW = wt(0, "Woolly"), tP = wt(0, "Pyramids");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [5, 540, 1300, 1.02, 0]]);
      layer(g, cam, 0.8, ds);
      layer(g, cam, 1, (g) => {
        pyramid(g, 760, 1300, 420, clamp(0.55 + t * 0.05));
        for (let i = 0; i < 3; i++) { const x = 600 + i * 150 - ((t * 40) % 150); rect(g, x - 60, 1580, 120, 90, "#d9b06a", 5); guy(g, EGY(i), { x: x + 100, y: 1680, h: 300, expr: "determined", walk: t * 1.2 + i * 0.3, lean: 12, armR: [-1.4, 0.3], blink: blinkAt(t, i), t }); }
        mammoth(g, { x: lerp(-200, 260, clamp(t / 4)), y: 1820, h: 330, phase: t * 0.8, col: "#7a4a2a" });
      });
      stamp(g, "AT THE SAME TIME?!", 540, 330, 96, t, tP - 0.1, E(0) + 0.3);
      label(g, "WOOLLY MAMMOTHS", 540, 330, 80, t, tW, tP - 0.1, { fill: "#ffe08a" });
    });
    ev(tW, "horns", 0.5); ev(tP, "boom", 0.6);
  }
  // 1 — mainland extinction vs. the Wrangel Island survivors
  { const t0 = S(1) - 0.1, tT = wt(1, "ten"), tS = wt(1, "small"), tWr = wt(1, "Wrangel"), tY = wt(1, "1650");
    shot(t0, (g, t, lt) => {
      const isl = t > tS - 0.2;
      const cam = camAt(lt, [[0, 540, 1300, 0.9, 0], [11, 540, 1300, 1.0, 0]]);
      layer(g, cam, 0.8, ar);
      layer(g, cam, 1, (g) => {
        if (!isl) { for (let i = 0; i < 4; i++) { g.save(); g.globalAlpha = 1 - clamp((t - tT) / 1.5); mammoth(g, { x: 80 + i * 280, y: 1750 + (i % 2) * 40, h: 260, phase: t * 0.6 + i * 0.3 }); g.restore(); } }
        else { for (let i = 0; i < 3; i++) mammoth(g, { x: 300 + i * 220, y: 1250 + (i % 2) * 30, h: 150, phase: t * 0.6 + i * 0.3, col: "#8a5a3a" }); }
      });
      label(g, "MAINLAND: GONE ~10,000 YEARS AGO", 540, 330, 50, t, tT, tS - 0.2);
      label(g, "WRANGEL ISLAND, ARCTIC OCEAN", 540, 330, 54, t, tWr, tY - 0.05, { font: "Cinzel", fill: "#cfe9ff" });
      stamp(g, "UNTIL ~1650 BC", 540, 330, 110, t, tY - 0.05, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tT, "drone", 0.5); ev(tWr, "pop"); ev(tY, "boom", 0.6);
  }
  // 2 — by then the Great Pyramid was ~1,000 years old
  { const t0 = S(2) - 0.1, tG = wt(2, "Giza"), tTh = wt(2, "thousand"), tM = wt(2, "Mesopotamia");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tM - t0, 540, 1300, 1.0, 0], [tM - t0 + 0.6, 540, 1200, 0.8, 0], [11, 540, 1200, 0.82, 0]]);
      layer(g, cam, 0.8, ds);
      layer(g, cam, 1, (g) => {
        pyramid(g, 540, 1300, 460);
        if (t > tTh - 0.1) cake(g, 540, 1720, 170, "~900", t);
        if (t > tM - 0.1) { ziggurat(g, -350, 1300, 260); ziggurat(g, 1400, 1300, 220); }
        mammoth(g, { x: 1100, y: 1880, h: 230, phase: t * 0.6, dir: -1 });
      });
      label(g, "THE GREAT PYRAMID OF GIZA", 540, 330, 58, t, tG - 0.3, tTh - 0.05, { font: "Cinzel" });
      stamp(g, "ALREADY ~1,000 YEARS OLD", 540, 330, 76, t, tTh, tM - 0.05);
      label(g, "+ THRIVING MESOPOTAMIA", 540, 330, 64, t, tM, 999, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.3 });
    ev(tG, "pop"); ev(tTh, "ding"); ev(tM, "choir", 0.5);
  }
}
