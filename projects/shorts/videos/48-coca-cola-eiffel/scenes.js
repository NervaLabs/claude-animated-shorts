// 48 — A soda older than the Eiffel Tower (generic glass and plain text only; no logos or trade dress)
"use strict";
window.MOOD = "comic";
const PEMB = { tunic: "#f2efe6", trim: "#c9c4b8", hair: "#5a3b2a", beard: "#5a3b2a", moust: true, trousers: "#3a3a4a" };
function soda(g, x, y, s, t, candles = 0) { const u = s / 100; poly(g, [[x - 40 * u, y - 140 * u], [x + 40 * u, y - 140 * u], [x + 30 * u, y], [x - 30 * u, y]], "rgba(220,240,250,0.55)", 5 * u); poly(g, [[x - 36 * u, y - 110 * u], [x + 36 * u, y - 110 * u], [x + 30 * u, y - 4 * u], [x - 30 * u, y - 4 * u]], "#5a2a1a", 0); ell(g, x, y - 112 * u, 36 * u, 6 * u, "#c98a5a", 0); for (let i = 0; i < 6; i++) { const q = (t * 0.8 + i / 6) % 1; ell(g, x - 20 * u + i * 8 * u, y - 10 * u - q * 100 * u, 2.5 * u, 2.5 * u, "#e9b48a", 0); } line(g, [[x - 26 * u, y - 130 * u], [x - 22 * u, y - 20 * u]], 3 * u, "rgba(255,255,255,0.6)"); for (let i = 0; i < candles; i++) { rect(g, x - 20 * u + i * 20 * u - 3 * u, y - 170 * u, 6 * u, 30 * u, "#cfe9ff", 2); flame(g, x - 20 * u + i * 20 * u, y - 172 * u, 5 * u, t + i); } }
const pharmacy = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#6a4a3a"], [1, "#9a7a5a"]]); g.fillRect(-900, -900, 2900, 2600); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) rect(g, -600 + i * 200, 300 + r * 160, 60, 110, ["#c0392b", "#2f6f9a", "#e2b64b", "#6a9a45"][(i + r) % 4], 4, 8); for (let r = 0; r < 4; r++) line(g, [[-700, 420 + r * 160], [1800, 420 + r * 160]], 10, "#4a3424"); rect(g, -200, 1350, 1500, 200, "#6b4024", 7, 6); g.fillStyle = "#c9b49a"; g.fillRect(-900, 1550, 2900, 1000); line(g, [[-900, 1550], [2000, 1550]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const ph = cached("pharm", -900, -900, 2900, 3400, pharmacy, 1.0);
  const phB = cached("pharmB", -900, -900, 2900, 3400, pharmacy, 0.7, 4);
  const pr = cached("paris48", -900, -900, 2900, 3400, (g) => { parisSky(g, -900, 2000, 1350); g.fillStyle = "#b9ab94"; g.fillRect(-900, 1350, 2900, 1300); line(g, [[-900, 1350], [2000, 1350]], 6); }, 1.0);
  // 0 — hook: split screen
  { const tC = wt(0, "Coca-Cola"), tE = wt(0, "Eiffel");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [5, 540, 1250, 1.05, 0]]);
      layer(g, cam, 1, (g) => {
        g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); g.translate(-270, 0); phB(g); soda(g, 540, 1500, 360, t); g.restore();
        g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); g.translate(270, 0); pr(g); if (t > tE) { g.save(); g.setLineDash([24, 18]); eiffel(g, 540, 1350, 900, "rgba(255,255,255,0.6)"); g.restore(); strokeText(g, "?", 540, 900, 120, { fill: "#fff" }); } g.restore();
        line(g, [[540, -200], [540, 2400]], 10);
      });
      label(g, "1886: THE DRINK", 270, 330, 52, t, tC, E(0) + 0.3, { fill: "#ffe08a" });
      label(g, "EIFFEL TOWER: NOT YET", 810, 330, 46, t, tE, E(0) + 0.3, { fill: "#cfe0ff" });
    });
    ev(tC, "bubble"); ev(tE, "boing");
  }
  // 1 — Jacobs' Pharmacy, Atlanta, May 1886, 5 cents
  { const t0 = S(1) - 0.1, tP = wt(1, "Pharmacist"), tJ = wt(1, "Jacobs'"), tA = wt(1, "Atlanta"), tM = wt(1, "May"), tF = wt(1, "five");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [11, 540, 1290, 1.08, 0]]);
      layer(g, cam, 0.8, ph);
      layer(g, cam, 1, (g) => {
        guy(g, PEMB, { x: 400, y: 1360, h: 520, expr: "proud", armR: [1.7, -0.6], blink: blinkAt(t, 1), t, shadow: false });
        soda(g, 680, 1350, 200, t);
        if (t > tF - 0.1) { rect(g, 800, 1100, 220, 140, "#fff6e6", 6, 10); strokeText(g, "5¢", 910, 1170, 80, { fill: "#c0262e", lw: 0, shadow: false }); }
        guy(g, { tunic: "#5a7a9a", trim: "#f2efe6", helmet: "bowler", trousers: "#3a3a4a" }, { x: 860, y: 1820, h: 520, dir: -1, expr: "happy", blink: blinkAt(t, 3), t });
      });
      label(g, "PHARMACIST JOHN PEMBERTON", 540, 330, 54, t, tP, tJ - 0.05, { font: "Cinzel" });
      label(g, "JACOBS' PHARMACY", 540, 330, 72, t, tJ, tA - 0.05, { font: "Cinzel" });
      label(g, "ATLANTA, GEORGIA", 540, 330, 72, t, tA, tM - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "MAY 1886", 540, 330, 130, t, tM - 0.05, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tP, "pop"); ev(tM, "boom", 0.5); ev(tF, "cash");
  }
  // 2 — the tower: begun Jan 1887, finished Mar 1889
  { const t0 = S(2) - 0.1, tJa = wt(2, "January"), tM = wt(2, "March"), tP = wt(2, "proving");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.85, 0], [10, 540, 1150, 0.9, 0]]);
      layer(g, cam, 0.8, pr);
      layer(g, cam, 1, (g) => {
        const k = clamp((t - tJa) / (tM - tJa + 0.3));
        g.save(); g.beginPath(); g.rect(-900, 1350 - 1150 * Math.max(0.03, k), 2900, 3000); g.clip(); eiffel(g, 540, 1350, 1100, "#8a6a4a"); g.restore();
        const lbl = t < tJa ? null : t < tM ? "JAN 1887" : "MAR 1889";
        if (lbl) { rect(g, 700, 1500, 330, 180, "#fff6e6", 7, 14); strokeText(g, lbl, 865, 1590, 54, { font: "Cinzel", fill: "#1c1422", lw: 0, shadow: false }); }
        soda(g, 220, 1900, 260, t, t > tM ? 3 : 0);
      });
      label(g, "CONSTRUCTION BEGINS", 540, 330, 70, t, tJa, tM - 0.05);
      stamp(g, "THE DRINK WAS ALREADY 3", 540, 330, 76, t, tM + 0.4, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tJa, "build"); ev(tM, "cheer", 0.5); ev(tP, "ding");
  }
}
