// 47 — The Demon Core Accidents (1945–1946). Sober, non-graphic.
"use strict";
window.MOOD = "eerie";
const SCI = (h) => ({ tunic: "#f2efe6", trim: "#c9c4b8", hair: h, trousers: "#3a3a4a" });
function core(g, x, y, r, t, glow = 0.3, open = 0) {
  g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, x, y, 0, r * 4, [[0, `rgba(120,180,255,${glow})`], [1, "rgba(120,180,255,0)"]]); g.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); g.restore();
  ell(g, x, y, r, r, "#8a8f96", 6); ell(g, x - r * 0.3, y - r * 0.3, r * 0.3, r * 0.22, "#c9ced6", 0);
  if (open >= 0) { g.save(); g.translate(x, y - r * 0.2 - open * r * 0.5); g.beginPath(); g.arc(0, 0, r * 1.25, Math.PI, 0); g.closePath(); fillInk(g, "#b9a880", 5); g.restore(); }
}
const lab = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#3a3f4a"], [1, "#5a5f6a"]]); g.fillRect(-900, -900, 2900, 2600); rect(g, 600, 400, 420, 380, "#e9b07a", 8, 4); poly(g, [[610, 700], [700, 560], [820, 600], [940, 520], [1010, 700]], "#c9733a", 4); g.fillStyle = "#4a4a52"; g.fillRect(-900, 1550, 2900, 1000); line(g, [[-900, 1550], [2000, 1550]], 6); rect(g, 120, 1360, 840, 50, "#6b4024", 6, 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const lb = cached("lab", -900, -900, 2900, 3400, lab, 1.0);
  const lbB = cached("labB", -900, -900, 2900, 3400, lab, 0.7, 4);
  // 0 — hook
  { const tS = wt(0, "single"), tT = wt(0, "two");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [6, 540, 1200, 1.15, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = "#14161e"; g.fillRect(-500, -500, 2100, 3000); });
      layer(g, cam, 1, (g) => { core(g, 540, 1200, 120, t, 0.25 + 0.08 * Math.sin(t * 2), -1); if (t > tT - 0.2) for (let i = 0; i < 2; i++) tinted(g, (tt) => { tt.setTransform(g.getTransform()); guy(tt, SCI("#5a3b2a"), { x: i ? 900 : 180, y: 1800, h: 560, t }); }, "#2a2e3a", 0.95); });
      stamp(g, "THE DEMON CORE", 540, 330, 104, t, tS, E(0) + 0.3, { fill: "#cfe0ff" });
    });
    ev(0.2, "drone"); ev(tS, "sting", 0.5);
  }
  // 1 — Los Alamos; 14 pounds of plutonium
  { const t0 = S(1) - 0.1, tN = wt(1, "Nicknamed"), tF = wt(1, "fourteen-pound"), tL = wt(1, "Los");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [8, 540, 1240, 1.08, 0]]);
      layer(g, cam, 0.8, lbB);
      layer(g, cam, 1, (g) => { core(g, 540, 1280, 80, t, 0.15, -1); rect(g, 440, 1340, 200, 30, "#5a5f6a", 4, 4); });
      label(g, "“THE DEMON CORE”", 540, 330, 80, t, tN, tF - 0.05, { font: "Cinzel", fill: "#cfe0ff" });
      label(g, "14 LB OF PLUTONIUM", 540, 330, 76, t, tF, tL - 0.05);
      label(g, "LOS ALAMOS, NEW MEXICO", 540, 330, 60, t, tL, E(1) + 0.2, { font: "Cinzel", fill: "#ffe0b0" });
    }, { type: "flash", d: 0.2, col: "#9fc8ff" });
    ev(tF, "pop"); ev(tL, "drone", 0.5);
  }
  // 2 — 1945: Harry Daghlian and the tungsten brick
  { const t0 = S(2) - 0.1, tY = wt(2, "1945"), tH = wt(2, "Harry"), tD = wt(2, "dropped"), tB = wt(2, "burst");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.05, 0], [tD - t0, 540, 1250, 1.15, 0], [tD - t0 + 0.4, 540, 1200, 1.3, 0], [10, 540, 1200, 1.32, 0]]);
      layer(g, cam, 0.8, lbB);
      layer(g, cam, 1, (g) => {
        guy(g, SCI("#2a1a14"), { x: 260, y: 1820, h: 580, expr: t > tD ? "shock" : "determined", armR: [1.6, -0.4], blink: blinkAt(t, 1), t });
        for (let i = 0; i < 3; i++) rect(g, 600 + (i % 2) * 40, 1240 - i * 50, 120, 50, "#4a4f5a", 4, 4);
        core(g, 680, 1320, 50, t, t > tD ? 0.6 * Math.exp(-(t - tD) * 0.6) + 0.2 : 0.12, -1);
        if (t < tD) rect(g, 520, 1180 + Math.max(0, t - tD + 0.4) * 300, 110, 46, "#3a3f4a", 4, 4);
        else rect(g, 620, 1250, 110, 46, "#3a3f4a", 4, 4);
      });
      if (t > tD && t < tD + 0.25) { g.save(); g.fillStyle = `rgba(150,200,255,${0.75 * (1 - (t - tD) / 0.25)})`; g.fillRect(0, 0, W, H); g.restore(); }
      stamp(g, "1945", 540, 330, 150, t, tY - 0.05, tH - 0.05);
      label(g, "HARRY DAGHLIAN", 540, 330, 80, t, tH, tD - 0.05, { font: "Cinzel" });
      label(g, "A DROPPED TUNGSTEN BRICK", 540, 330, 58, t, tD, tB - 0.05, { fill: "#cfe0ff" });
      label(g, "A FATAL BURST OF RADIATION", 540, 330, 54, t, tB, E(2) + 0.2, { fill: "#e6e0f2" });
    }, { type: "xfade", d: 0.3 });
    ev(tY, "boom", 0.5); ev(tD, "clank"); ev(tB, "drone");
  }
  // 3 — 1946: Louis Slotin and the screwdriver
  { const t0 = S(3) - 0.1, tN = wt(3, "Nine"), tL = wt(3, "Louis"), tSc = wt(3, "screwdriver"), tS = wt(3, "slipped"), tBl = wt(3, "blue");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.05, 0], [tS - t0, 600, 1250, 1.25, 0], [12, 600, 1250, 1.28, 0]]);
      const flash = t > tS ? Math.exp(-(t - tS) * 0.5) : 0;
      layer(g, cam, 0.8, lbB);
      layer(g, cam, 1, (g) => {
        guy(g, SCI("#5a3b2a"), { x: 300, y: 1820, h: 580, expr: t > tS ? "shock" : "determined", armR: [1.7, -0.6], blink: blinkAt(t, 1), t });
        const open = t < tS ? 0.25 : 0;
        core(g, 680, 1320, 50, t, 0.12 + flash * 0.8, open);
        if (t > tSc - 0.2 && t < tS + 0.3) line(g, [[540, 1280], [640, 1300 - open * 30]], 6, "#c9c4b8");
      });
      if (flash > 0) { g.save(); g.globalCompositeOperation = "screen"; g.fillStyle = `rgba(90,150,255,${0.6 * flash})`; g.fillRect(0, 0, W, H); g.restore(); }
      label(g, "9 MONTHS LATER · 1946", 540, 330, 62, t, tN, tL - 0.05);
      label(g, "LOUIS SLOTIN", 540, 330, 86, t, tL, tSc - 0.05, { font: "Cinzel" });
      label(g, "...A SCREWDRIVER", 540, 330, 80, t, tSc, tS - 0.05, { fill: "#ffe08a" });
      stamp(g, "A FLASH OF BLUE LIGHT", 540, 330, 80, t, tBl - 0.1, 999, { fill: "#cfe0ff" });
    }, { type: "black", d: 0.4 });
    ev(tN, "whoosh", 0.4); ev(tS, "sting", 0.6); ev(tBl, "drone");
  }
}
