// 17 — The Great Stink of London (1858)
"use strict";
window.MOOD = "comic";
const MPx = (i) => ({ tunic: ["#1f1a24", "#3a2a4a", "#2a3a2a"][i % 3], trim: "#f2efe6", helmet: "tophat", hatCol: "#1f1a24", trousers: "#3a3a4a", beard: i % 2 ? "#9a9a9a" : null, moust: true });
const stinkLines = (g, x, y, t, n = 4, s = 1) => { for (let i = 0; i < n; i++) { const q = (t * 0.8 + i / n) % 1; g.save(); g.globalAlpha = (1 - q) * 0.9; line(g, [[x + i * 60 * s, y - q * 220 * s], [x + i * 60 * s + 20 * s, y - 40 * s - q * 220 * s], [x + i * 60 * s, y - 80 * s - q * 220 * s], [x + i * 60 * s + 20 * s, y - 120 * s - q * 220 * s]], 9 * s, "#8fbf3a"); g.restore(); } };
const westminster = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#8aa0a0", "#c9d0a8", "#e9e2b8");
  rect(g, -300, 700, 1500, 500, "#d9c08a", 7); for (let i = 0; i < 14; i++) { rect(g, -260 + i * 105, 760, 50, 160, "#6a7a8a", 4, 20); line(g, [[-280 + i * 105, 700], [-280 + i * 105, 1200]], 4, "#b99a5a"); }
  rect(g, 900, 200, 200, 1000, "#d9c08a", 7); poly(g, [[890, 200], [1000, -40], [1110, 200]], "#4a5a5a", 7); ell(g, 1000, 360, 70, 70, "#f6f3ea", 6); line(g, [[1000, 360], [1000, 310]], 6); line(g, [[1000, 360], [1036, 380]], 6);
  for (let i = 0; i < 12; i++) poly(g, [[-300 + i * 125, 700], [-238 + i * 125, 640], [-175 + i * 125, 700]], "#c9b07a", 5);
  g.fillStyle = vgrad(g, 1200, 2400, [[0, "#6a7a3a"], [1, "#4a5a2a"]]); g.fillRect(-900, 1200, 2900, 1400); line(g, [[-900, 1200], [2000, 1200]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function buildShots() {
  const wm = cached("wm", -900, -900, 2900, 3400, westminster, 1.0);
  const wmB = cached("wmB", -900, -900, 2900, 3400, westminster, 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1858"), tP = wt(0, "Parliament");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.85, 0], [5, 540, 1150, 0.92, 0]]);
      layer(g, cam, 1, (g) => {
        wm(g); waves(g, 1250, t, -900, 2000, "#6a7a3a", 14);
        for (let i = 0; i < 5; i++) stinkLines(g, -200 + i * 300, 1250, t + i * 0.3, 3, 1.4);
        for (let i = 0; i < 4; i++) guy(g, MPx(i), { x: lerp(300 + i * 130, -500, clamp((t - tP - i * 0.1) / 2)), y: 1150, h: 300, dir: -1, expr: "sick", walk: t > tP ? t * 2.6 : null, armR: [2.6, 1.4], lean: 8, blink: 0, t, shadow: false });
      });
      stamp(g, "1858", 540, 330, 150, t, tY - 0.05, tP - 0.1);
      label(g, "PARLIAMENT: ABANDON CITY?", 540, 330, 56, t, tP, E(0) + 0.3);
    });
    ev(tY, "boom", 0.6); ev(tP, "gasp");
  }
  // 1 — sewage into the Thames
  { const t0 = S(1) - 0.1, tD = wt(1, "decades"), tT = wt(1, "Thames");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [5, 540, 1250, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -500, -500, 2100, 1700, "#8aa0a0", "#c9d0a8", "#e9e2b8"); for (let i = 0; i < 6; i++) house(g, -300 + i * 300, 1150, 240, 260, ["#9a4a3a", "#8a5a4a", "#a86a4a"][i % 3], "#4a3a3a", 5, "#3a3a4a");
        brickWall(g, -500, 1150, 2100, 250, "#8a7a6a", 5);
        for (let i = 0; i < 4; i++) { const x = -100 + i * 340; ell(g, x, 1300, 50, 50, "#3a3a44", 6); ell(g, x, 1300, 34, 34, "#1a1a20", 0); g.save(); g.fillStyle = "#7a5a2a"; g.beginPath(); g.moveTo(x - 26, 1310); g.quadraticCurveTo(x + 40, 1420, x + 20 + Math.sin(t * 6 + i) * 6, 1520); g.lineTo(x - 20, 1520); g.quadraticCurveTo(x, 1420, x - 26, 1310); g.fill(); g.restore(); }
        g.fillStyle = "#5a5a2a"; g.fillRect(-500, 1500, 2100, 1400); waves(g, 1500, t, -500, 1600, "#6a6a3a", 16);
      });
      label(g, "FOR DECADES...", 540, 330, 86, t, tD, tT - 0.05);
      label(g, "RAW SEWAGE → THE THAMES", 540, 330, 58, t, tT, E(1) + 0.2, { fill: "#d9f2a0" });
    }, { type: "flash", d: 0.2 });
    ev(t0, "splash", 0.6); ev(tT, "bubble");
  }
  // 2 — heatwave; the stench
  { const t0 = S(2) - 0.1, tH = wt(2, "heatwave"), tF = wt(2, "fermented"), tSt = wt(2, "stench");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.9, 0], [7, 540, 1150, 0.98, 0]]);
      layer(g, cam, 1, (g) => {
        wm(g); waves(g, 1250, t, -900, 2000, "#5a7a2a", 18);
        sunGlow(g, 180, 250, 110, "255,180,90"); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU + t * 0.4; line(g, [[180 + Math.cos(a) * 140, 250 + Math.sin(a) * 140], [180 + Math.cos(a) * 200, 250 + Math.sin(a) * 200]], 10, "#ffb84a"); }
        if (t > tF) for (let i = 0; i < 12; i++) { const q = ((t - tF) * 0.9 + i / 12) % 1; ell(g, -100 + i * 110, 1300 - q * 30, 14 + q * 10, 12 + q * 8, "#8fbf3a", 3); }
        if (t > tSt - 0.2) { g.save(); g.globalAlpha = clamp((t - tSt + 0.2) / 0.5) * 0.35; g.fillStyle = "#8fbf3a"; g.fillRect(-900, -900, 2900, 3400); g.restore(); for (let i = 0; i < 6; i++) stinkLines(g, -300 + i * 300, 1250, t + i * 0.2, 3, 1.8); }
      });
      label(g, "SUMMER HEATWAVE", 540, 330, 80, t, tH, tF - 0.05, { fill: "#ffd08a" });
      stamp(g, "THE GREAT STINK", 540, 330, 104, t, tSt - 0.1, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tH, "drone", 0.5); ev(tF, "bubble"); ev(tSt, "boom", 0.6);
  }
  // 3 — chloride of lime curtains; they flee anyway
  { const t0 = S(3) - 0.1, tCu = wt(3, "curtains"), tCh = wt(3, "chloride"), tFl = wt(3, "fled");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [6, 540, 1290, 1.12, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#3a2a2a"], [1, "#6a4a3a"]]); g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 3; i++) { rect(g, -60 + i * 420, 300, 260, 800, "#7fb0d8", 8, 120); const wet = t > tCh ? 1 : 0; poly(g, [[-80 + i * 420, 280], [220 + i * 420, 280], [200 + i * 420, 1150], [-60 + i * 420, 1150]], wet ? "#e9f2d0" : "#c0392b", 6, true); if (wet) for (let k = 0; k < 4; k++) { const q = (t * 1.5 + k / 4 + i * 0.2) % 1; ell(g, -20 + i * 420 + k * 60, 1150 + q * 200, 8, 12, "#cfe9f6", 2); } } g.fillStyle = "#4a3424"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        if (t < tFl - 0.1) { for (let i = 0; i < 3; i++) guy(g, MPx(i), { x: 220 + i * 320, y: 1780, h: 520, expr: "sick", armR: [2.6, 1.4], blink: blinkAt(t, i), t }); rect(g, 860, 1700, 140, 120, "#d9d9d9", 5, 6); strokeText(g, "LIME", 930, 1760, 30, { fill: "#1c1422", lw: 0, shadow: false }); stinkLines(g, 200, 1500, t, 5, 1.2); }
        else for (let i = 0; i < 4; i++) guy(g, MPx(i), { x: lerp(200 + i * 200, -600, clamp((t - tFl - i * 0.1) / 1.8)), y: 1780, h: 500, dir: -1, expr: "sick", walk: t * 3, lean: 12, armR: [2.6, 1.4], blink: 0, t });
      });
      label(g, "SOAKED CURTAINS", 540, 330, 80, t, tCu, tFl - 0.05);
      stamp(g, "THEY FLED", 540, 330, 120, t, tFl, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tCh, "splash", 0.5); ev(tFl, "scramble");
  }
  // 4 — the modern sewer system
  { const t0 = S(4) - 0.1, tW = wt(4, "weeks"), tF = wt(4, "funding"), tSe = wt(4, "sewer");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 1.0, 0], [tSe - t0, 540, 1150, 0.95, 0], [8, 540, 1250, 0.9, 0]]);
      layer(g, cam, 1, (g) => {
        sky3(g, -600, -600, 2300, 1700, "#5a8ad0", "#b3d2ee", "#e9eedc"); for (let i = 0; i < 6; i++) house(g, -300 + i * 300, 1000, 240, 240, ["#9a4a3a", "#8a5a4a", "#a86a4a"][i % 3], "#4a3a3a", 5, "#3a3a4a");
        g.fillStyle = "#6a5a4a"; g.fillRect(-600, 1000, 2300, 1600); line(g, [[-600, 1000], [1700, 1000]], 6);
        const k = clamp((t - tSe + 0.4) / 1.6);
        for (let i = 0; i < 3; i++) { const y = 1350 + i * 280; g.save(); g.beginPath(); g.rect(-600, y - 150, 2300 * k, 300); g.clip(); ell(g, 540, y, 1400, 110, "#9a4a3a", 7); for (let a = 0; a < 40; a++) rect(g, -800 + a * 60, y - 110, 60, 30, null, 2); ell(g, 540, y + 20, 1360, 70, "#4a6a7a", 5); g.restore(); }
        guy(g, { tunic: "#2a2a3a", trim: "#d9c08a", helmet: "tophat", hatCol: "#1f1a24", beard: "#5a3b2a", moust: true, trousers: "#3a3a4a" }, { x: 160, y: 1000, h: 380, expr: "proud", armR: [1.6, -0.3], hold: { r: "scroll" }, blink: blinkAt(t, 1), t, shadow: false });
      });
      label(g, "EMERGENCY FUNDING", 540, 330, 72, t, tF, tSe - 0.05);
      stamp(g, "MODERN SEWERS", 540, 330, 104, t, tSe, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "cash"); ev(tSe, "build"); ev(tSe, "choir", 0.5);
  }
}
