// 20 — The Halifax Explosion (1917)
"use strict";
window.MOOD = "eerie";
const FR = { v: ["#2f4f9f", "#f6f3ea", "#c0262e"] };
const NO = (g, w, h) => { g.fillStyle = "#c0262e"; g.fillRect(-w, -h, w * 3, h * 3); g.fillStyle = "#f6f3ea"; g.fillRect(w * 0.28, -h, w * 0.18, h * 3); g.fillRect(-w, h * 0.4, w * 3, h * 0.2); g.fillStyle = "#1f3f8f"; g.fillRect(w * 0.31, -h, w * 0.12, h * 3); g.fillRect(-w, h * 0.44, w * 3, h * 0.12); };
const harbour = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#6a86b0", "#b8c8d8", "#e6e2d6");
  smoothHills(g, -900, 2000, 1080, 160, "#6a7a6a", 2, 5);
  for (let i = 0; i < 16; i++) house(g, -800 + i * 180, 1110 - Math.sin(i * 0.7) * 40, 120, 90 + (i % 3) * 30, ["#c9b49a", "#e9dcc0", "#9a6a5a"][i % 3], "#4a3a3a", 3, "#3a3a4a");
  g.fillStyle = vgrad(g, 1150, 2400, [[0, "#3f6f94"], [1, "#1f3f60"]]); g.fillRect(-900, 1150, 2900, 1400); line(g, [[-900, 1150], [2000, 1150]], 5);
  paintGrain(g, -900, -900, 2900, 3400, 0.06);
};
const cargo = (g, x, y, t, burning = 0, dir = 1, flag = FR, col = "#4a4a52") => {
  steamShip(g, { x, y, h: 300, t, col, super: "#d9d2bc", funnel: "#2a2a30", flag, dir, smoke: true });
  if (burning > 0) for (let i = 0; i < 4; i++) flame(g, x + (i - 1.5) * 60 * dir, y - 70, 26 + burning * 20, t + i);
};
function buildShots() {
  const hb = cached("hfx", -900, -900, 2900, 3400, harbour, 1.0);
  // 0 — hook
  { const tB = wt(0, "Before"), tC = wt(0, "collision"), tL = wt(0, "largest");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.9, 0], [6, 540, 1080, 0.98, 0]]);
      layer(g, cam, 1, (g) => {
        hb(g); waves(g, 1250, t, -900, 2000, "#2f5f84", 10);
        const k = (t - 1.6) / 2.4;
        if (k < 0) cargo(g, 540, 1300, t, 1);
        else { boomFx(g, 540, 1150, 700, k * 2); for (let i = 0; i < 9; i++) { const q = clamp(k * 1.5); ell(g, 540 + (i - 4) * 80 * q, 1150 - q * 800 - Math.abs(i - 4) * 40 * (1 - q), 120 + q * 120, 100 + q * 80, ["#6a6a72", "#8a8a92", "#5a5a62"][i % 3], 5); } }
      });
      label(g, "BEFORE NUCLEAR WEAPONS...", 540, 330, 58, t, tB, tC - 0.05);
      stamp(g, "THE LARGEST MAN-MADE BLAST", 540, 330, 62, t, tL, E(0) + 0.3);
    });
    ev(1.6, "boom"); ev(1.65, "crash"); KICKS.push({ t: 1.6, a: 28 });
  }
  // 1 — the collision in Halifax Harbor
  { const t0 = S(1) - 0.1, tD = wt(1, "December"), tFr = wt(1, "French"), tEx = wt(1, "explosives"), tCo = wt(1, "collided"), tH = wt(1, "Halifax");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 0.95, 0], [tCo - t0, 540, 1250, 1.1, 0], [tCo - t0 + 0.3, 540, 1250, 1.05, 3], [10, 540, 1250, 1.07, 3]]);
      layer(g, cam, 1, (g) => {
        hb(g);
        const k = clamp((t - t0) / (tCo - t0 + 0.05));
        cargo(g, lerp(-200, 380, k), 1350, t, t > tCo + 1 ? 0.5 : 0, 1, FR, "#4a4a52");
        cargo(g, lerp(1300, 760, k), 1330, t, 0, -1, NO, "#2a3a5a");
        if (t > tEx - 0.1 && t < tCo) for (let i = 0; i < 3; i++) { rect(g, lerp(-200, 380, k) - 120 + i * 80, 1200, 70, 60, "#c0392b", 4, 4); strokeText(g, "TNT", lerp(-200, 380, k) - 85 + i * 80, 1230, 22, { fill: "#fff", lw: 4, shadow: false }); }
        if (t > tCo) { shout(g, 580, 1000, "CRUNCH!", 60, clamp((t - tCo) / 0.12), "#4a4a52"); sparkle(g, 580, 1250, 60, (t - tCo) / 0.6); }
        waves(g, 1420, t, -900, 2000, "#2f5f84", 10);
      });
      label(g, "DECEMBER 1917", 540, 330, 86, t, tD, tFr - 0.05, { font: "Cinzel" });
      label(g, "FRENCH SHIP + EXPLOSIVES", 540, 330, 60, t, tFr, tCo - 0.05);
      label(g, "HALIFAX, CANADA", 540, 330, 80, t, tH, E(1) + 0.2, { font: "Cinzel", fill: "#cfe0ff" });
    }, { type: "flash", d: 0.2 });
    ev(tFr, "horns", 0.5); ev(tCo, "clank"); ev(tCo, "crash", 0.6); KICKS.push({ t: tCo, a: 14 });
  }
  // 2 — twenty minutes later
  { const t0 = S(2) - 0.1, tTw = wt(2, "Twenty"), tD = wt(2, "detonated"), tV = wt(2, "vaporizing"), tTs = wt(2, "tsunami");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 1.0, 0], [tD - t0, 540, 1200, 1.05, 0], [tD - t0 + 0.6, 540, 1050, 0.75, 0], [9, 540, 1050, 0.77, 0]]);
      layer(g, cam, 1, (g) => {
        hb(g);
        if (t < tD) { cargo(g, 480, 1330, t, 1); rect(g, 380, 700, 320, 180, "#fff6e6", 7, 14); strokeText(g, `${Math.min(20, Math.floor(clamp((t - tTw) / (tD - tTw)) * 20))} MIN`, 540, 790, 70, { fill: "#1c1422", lw: 0, shadow: false }); }
        else { boomFx(g, 480, 1200, 900, (t - tD) / 1.0); const r = (t - tD) * 1400; g.beginPath(); g.arc(480, 1200, r, 0, TAU); g.lineWidth = 20; g.strokeStyle = `rgba(255,255,240,${clamp(1 - (t - tD) / 1.4)})`; g.stroke(); for (let i = 0; i < 9; i++) { const q = clamp((t - tD) / 2); ell(g, 480 + (i - 4) * 90 * q, 1200 - q * 900 - Math.abs(i - 4) * 40 * (1 - q), 130 + q * 130, 110 + q * 80, ["#6a6a72", "#8a8a92", "#5a5a62"][i % 3], 5); } if (t - tD < 0.15) { g.fillStyle = "rgba(255,255,240,0.85)"; g.fillRect(-900, -900, 2900, 3400); } }
        if (t > tTs - 0.1) { const q = clamp((t - tTs + 0.1) / 1.4); waves(g, 1500 - q * 260, t * 2, -900, 2000, "#2f5f84", 60 * q); }
        else waves(g, 1450, t, -900, 2000, "#2f5f84", 10);
      });
      label(g, "20 MINUTES LATER", 540, 330, 80, t, tTw, tD - 0.05);
      label(g, "HALF A MILE: GONE", 540, 330, 72, t, tV, tTs - 0.05, { fill: "#ffd0c0" });
      stamp(g, "TSUNAMI", 540, 330, 120, t, tTs, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tTw, "heartbeat"); ev(tD, "boom"); ev(tD + 0.05, "crash"); KICKS.push({ t: tD, a: 32 }); ev(tTs, "splash"); ev(tTs, "rumble");
  }
  // 3 — the toll; windows 50 miles away
  { const t0 = S(3) - 0.1, tN = wt(3, "Nearly"), tW = wt(3, "windows"), tF = wt(3, "fifty");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.08, 0]]);
      layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#2a2a3a"], [1, "#141420"]]); g.fillRect(-500, -500, 2100, 3000); });
      layer(g, cam, 1, (g) => {
        if (t < tW - 0.1) { for (let i = 0; i < 5; i++) { const x = 220 + i * 160; rect(g, x - 16, 1300, 32, 120, "#f2efe6", 4, 4); flame(g, x, 1292, 16, t + i); } rect(g, 120, 1420, 840, 50, "#5a3b2a", 5, 6); }
        else { rect(g, 290, 900, 500, 600, "#7fb0d8", 10, 6); line(g, [[540, 900], [540, 1500]], 10); line(g, [[290, 1200], [790, 1200]], 10); if (t > tF - 0.1) for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; line(g, [[460, 1080], [460 + Math.cos(a) * 160, 1080 + Math.sin(a) * 160]], 4, "#f6f3ea"); } }
      });
      label(g, "~2,000 LIVES LOST", 540, 330, 80, t, tN, tW - 0.1, { font: "Cinzel", fill: "#e6e0f2" });
      stamp(g, "WINDOWS BROKE 50 MILES AWAY", 540, 330, 58, t, tF - 0.1, 999);
    }, { type: "black", d: 0.5 });
    ev(tN, "drone"); ev(tF, "crack");
  }
}
