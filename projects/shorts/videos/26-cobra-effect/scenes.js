// 26 — The Cobra Effect in British India
"use strict";
window.MOOD = "comic";
HATS.pith = (g, rx, ry, lw) => { smoothPath(g, [[-rx * 1.5, -ry * 0.5], [-rx * 1.0, -ry * 0.75], [-rx * 0.9, -ry * 1.35], [0, -ry * 1.65], [rx * 0.9, -ry * 1.35], [rx * 1.0, -ry * 0.75], [rx * 1.5, -ry * 0.5], [0, -ry * 0.6]]); fillInk(g, "#efe6c8", lw); line(g, [[-rx * 0.95, -ry * 0.85], [rx * 0.95, -ry * 0.85]], 2.4 * rx / 15, "#8a6a3a"); };
const BRIT = { tunic: "#e9dcb0", trim: "#c9a35a", helmet: "pith", trousers: "#e9dcb0", boots: "#5a3a22", moust: true, beard: null };
const LOC = (i) => ({ tunic: ["#f6f3ea", "#d9a441", "#c0392b", "#2f6f9a"][i % 4], trim: "#d4a632", helmet: i % 2 ? "turban" : null, hatCol: ["#e2453c", "#f2c443", "#f6f3ea"][i % 3], hair: "#1a1012", skin: ["#a86a42", "#8a5a3a", "#b97a4a"][i % 3], trousers: "#f6f3ea", beard: i % 3 === 0 ? "#1a1012" : null });
function cobra(g, x, y, s, t, dir = 1) {
  const u = s / 100; g.save(); g.translate(x, y); g.scale(dir, 1);
  const sw = Math.sin(t * 3) * 6 * u;
  g.beginPath(); g.moveTo(-60 * u, 0); g.quadraticCurveTo(-20 * u, 14 * u, 10 * u, 0); g.quadraticCurveTo(30 * u + sw, -40 * u, 10 * u, -90 * u); g.lineWidth = 22 * u; g.lineCap = "round"; g.strokeStyle = INK; g.stroke(); g.lineWidth = 15 * u; g.strokeStyle = "#7a8a3a"; g.stroke();
  g.save(); g.translate(10 * u, -110 * u); smoothPath(g, [[0, -34 * u], [24 * u, -10 * u], [20 * u, 30 * u], [0, 40 * u], [-20 * u, 30 * u], [-24 * u, -10 * u]]); fillInk(g, "#8a9a4a", 4 * u); smoothPath(g, [[0, -10 * u], [10 * u, 10 * u], [0, 30 * u], [-10 * u, 10 * u]]); fillInk(g, "#e9d6a0", 0);
  ell(g, 0, -34 * u, 12 * u, 10 * u, "#8a9a4a", 3 * u); g.beginPath(); g.arc(-5 * u, -36 * u, 2.4 * u, 0, TAU); g.arc(5 * u, -36 * u, 2.4 * u, 0, TAU); g.fillStyle = INK; g.fill();
  if (Math.sin(t * 5) > 0.3) line(g, [[0, -24 * u], [0, -14 * u], [-4 * u, -8 * u]], 1.6 * u, "#c0262e");
  g.restore(); g.restore();
}
function basket(g, x, y, s, t, n = 3) { const u = s / 100; for (let i = 0; i < n; i++) cobra(g, x + (i - (n - 1) / 2) * 34 * u, y - 30 * u, 70 * u, t + i, i % 2 ? -1 : 1); smoothPath(g, [[x - 70 * u, y - 70 * u], [x + 70 * u, y - 70 * u], [x + 60 * u, y], [x - 60 * u, y]]); fillInk(g, "#c9965a", 5); for (let k = 0; k < 4; k++) line(g, [[x - 64 * u, y - 60 * u + k * 16 * u], [x + 64 * u, y - 60 * u + k * 16 * u]], 2.5 * u, "#8a5a32"); }
const delhi = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a9ad8", "#c0dcf0", "#f4e6c0");
  ell(g, 540, 780, 200, 170, "#efe2c4", 7); rect(g, 340, 780, 400, 420, "#e9b48a", 7); line(g, [[540, 610], [540, 560]], 8, "#d4a632");
  for (const x of [180, 900]) { rect(g, x - 30, 560, 60, 640, "#e9b48a", 6); ell(g, x, 560, 46, 40, "#efe2c4", 5); }
  for (let i = 0; i < 4; i++) rect(g, 380 + i * 90, 940, 50, 120, "#7a4a3a", 4, 25);
  for (let i = 0; i < 8; i++) house(g, -700 + i * 380 + (i > 3 ? 330 : 0), 1300, 220, 200, ["#e6cfa6", "#d9b48a", "#f2c49a"][i % 3], "#b9532f", 5);
  g.fillStyle = vgrad(g, 1300, 2400, [[0, "#d9b98a"], [1, "#b9996a"]]); g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
function buildShots() {
  const dl = cached("delhi", -900, -900, 2900, 3400, delhi, 1.0);
  const dlB = cached("delhiB", -900, -900, 2900, 3400, delhi, 0.7, 5);
  // 0 — hook
  { const tD = wt(0, "Delhi"), tF = wt(0, "farming");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [5, 540, 1400, 1.08, 0]]);
      layer(g, cam, 0.7, dlB);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) basket(g, 150 + i * 260, 1820 - (i % 2) * 60, 140, t + i, 3); guy(g, BRIT, { x: 540, y: 1600, h: 500, expr: "shock", armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t }); });
      label(g, "DELHI, BRITISH INDIA", 540, 330, 66, t, tD, tF - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "A COBRA FARMING BOOM", 540, 330, 82, t, tF, E(0) + 0.3);
    });
    ev(0.3, "drone", 0.4); ev(tF, "boing");
  }
  // 1 — the bounty
  { const t0 = S(1) - 0.1, tV = wt(1, "venomous"), tC = wt(1, "cash"), tD = wt(1, "dead");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [8, 540, 1340, 1.12, 0]]);
      layer(g, cam, 0.7, dlB);
      layer(g, cam, 1, (g) => {
        rect(g, 600, 1500, 420, 60, "#8a5a32", 5); line(g, [[640, 1560], [640, 1800]], 10, "#6b4024"); line(g, [[980, 1560], [980, 1800]], 10, "#6b4024");
        guy(g, BRIT, { x: 820, y: 1500, h: 420, dir: -1, expr: t > tC ? "proud" : "scared", armR: t > tC ? [1.6, -0.3] : [0.4, 0.2], hold: t > tC ? { r: "bag" } : null, blink: blinkAt(t, 1), t, shadow: false });
        if (t < tC) for (let i = 0; i < 3; i++) cobra(g, 120 + i * 200, 1800, 130, t + i, 1);
        else { rect(g, 240, 900, 600, 260, "#fff6e6", 8, 10); strokeText(g, "BOUNTY", 540, 980, 70, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); strokeText(g, "1 DEAD COBRA = ₹", 540, 1080, 50, { fill: "#1c1422", lw: 0, shadow: false }); }
        if (t > tD) guy(g, LOC(0), { x: 280, y: 1820, h: 520, expr: "happy", armR: [1.6, -0.2], blink: blinkAt(t, 3), t });
      });
      label(g, "VENOMOUS SNAKES", 540, 330, 76, t, tV, tC - 0.05, { fill: "#d9f2a0" });
      stamp(g, "CASH FOR COBRAS", 540, 330, 96, t, tC, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tV, "drone", 0.4); ev(tC, "cash");
  }
  // 2 — it works... at first
  { const t0 = S(2) - 0.1, tD = wt(2, "dropped");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 1.0, 0], [3, 540, 1100, 1.05, 0]]);
      layer(g, cam, 1, (g) => { g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000); rect(g, 140, 700, 800, 700, "#fff6e6", 8, 12); line(g, [[200, 760], [200, 1340], [900, 1340]], 6); const k = clamp((t - t0) / 1.6); g.beginPath(); for (let i = 0; i <= 20; i++) { const x = 220 + i * 33, y = 820 + 460 * Math.min(i / 20, k) ** 0.8; if (i / 20 > k) break; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.lineWidth = 12; g.strokeStyle = "#2f8a4a"; g.stroke(); cobra(g, 300, 900, 90, t); strokeText(g, "COBRAS", 540, 1430, 44, { fill: "#fff" }); });
      stamp(g, "IT WORKED!", 540, 330, 110, t, tD, E(2) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(tD, "ding");
  }
  // 3 — breed at home
  { const t0 = S(3) - 0.1, tE = wt(3, "enterprising"), tB = wt(3, "breeding"), tCh = wt(3, "cheaper");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [5, 540, 1350, 1.12, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#c98a5a"], [1, "#9a6a3a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 700, 500, 300, 360, "#7fb0d8", 8, 6); g.fillStyle = "#7a5232"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => { guy(g, LOC(1), { x: 220, y: 1820, h: 560, expr: t > tCh ? "sly" : "happy", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); const n = 1 + Math.floor(clamp((t - tB + 0.2) / 2) * 5); for (let i = 0; i < n; i++) basket(g, 520 + (i % 3) * 200, 1820 - Math.floor(i / 3) * 160, 130, t + i, 3); });
      label(g, "ENTERPRISING LOCALS", 540, 330, 66, t, tE, tB - 0.05);
      stamp(g, "COBRA FARMS", 540, 330, 110, t, tB, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tB, "pop"); ev(tB + 0.4, "pop"); ev(tB + 0.8, "pop"); ev(tCh, "cash");
  }
  // 4 — program canceled → snakes released
  { const t0 = S(4) - 0.1, tCa = wt(4, "canceled"), tR = wt(4, "released"), tW = wt(4, "worse");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [tR - t0, 540, 1350, 1.0, 0], [tR - t0 + 0.6, 540, 1450, 0.85, 0], [9, 540, 1450, 0.87, 0]]);
      layer(g, cam, 0.7, dlB);
      layer(g, cam, 1, (g) => {
        if (t < tR - 0.1) { guy(g, BRIT, { x: 540, y: 1800, h: 560, expr: "angry", armR: [2.2, -0.2], blink: blinkAt(t, 1), t }); if (t > tCa) { rect(g, 240, 920, 600, 220, "#fff6e6", 8, 10); strokeText(g, "BOUNTY", 540, 990, 60, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); strokeText(g, "CANCELED", 540, 1070, 70, { fill: "#c0262e", lw: 0, shadow: false }); } }
        else { for (let i = 0; i < 18; i++) { const x = lerp(-400 + rnd(i) * 300, -600 + rnd(i * 3) * 2100, clamp((t - tR) / 3)), y = 1450 + rnd(i * 5) * 500; cobra(g, x, y, 100 + rnd(i * 7) * 50, t + i, rnd(i * 9) > 0.5 ? 1 : -1); } guy(g, LOC(2), { x: 160, y: 1700, h: 440, expr: "shock", armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t }); guy(g, BRIT, { x: 920, y: 1700, h: 440, dir: -1, expr: "scared", armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t }); }
      });
      label(g, "PROGRAM CANCELED", 540, 330, 70, t, tCa, tR - 0.1);
      stamp(g, "WORSE THAN BEFORE", 540, 330, 86, t, tW - 0.1, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tCa, "clank"); ev(tR, "scramble"); ev(tW, "boing");
  }
}
