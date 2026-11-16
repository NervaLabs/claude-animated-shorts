// 39 — Frank Abagnale's airline con (1960s). Original cartoon stand-ins; no airline logos.
"use strict";
window.MOOD = "comic";
HATS.pilot = (g, rx, ry, lw) => { HATS.peaked(g, rx, ry, lw, { hatCol: "#1f2a44", badge: "#e7c15f" }); };
const FRANK = { tunic: "#1f2a44", trim: "#e7c15f", helmet: "pilot", hair: "#5a3b2a", hairUnder: true, trousers: "#1f2a44", boots: "#1f1a24", sash: null };
const airport = (g) => { sky3(g, -900, -900, 2900, 2100, "#5a9ad8", "#c0dcf0", "#eef2f4"); rect(g, -800, 900, 2700, 400, "#d9dfe6", 7); for (let i = 0; i < 12; i++) rect(g, -760 + i * 220, 960, 180, 220, "#8fc0e0", 5, 4); g.fillStyle = "#9aa0a6"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); for (let x = -880; x < 2000; x += 200) rect(g, x, 1590, 100, 14, "#f2efe6", 0); paintGrain(g, -900, -900, 2900, 3400, 0.06); };
function buildShots() {
  const ap = cached("airport", -900, -900, 2900, 3400, airport, 1.0);
  const apB = cached("airportB", -900, -900, 2900, 3400, airport, 0.7, 5);
  const skyC = cached("sky39", -900, -1200, 2900, 3600, (g) => { sky3(g, -900, -1200, 2900, 3600, "#3f78c8", "#8ec0ea", "#dfeef6"); }, 0.6);
  // 0 — hook
  { const tT = wt(0, "teenager"), tM = wt(0, "million"), tP = wt(0, "pretending");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, apB);
      layer(g, cam, 1, (g) => { guy(g, FRANK, { x: lerp(200, 520, clamp(t / 4)), y: 1820, h: 600, expr: "sly", walk: t * 1.6, armR: [0.6, 0.3], hold: { r: "bag" }, blink: blinkAt(t, 1), t }); const n = Math.floor(clamp((t - tM + 0.3) / 1.4) * 1000000); if (t > tM - 0.3) { rect(g, 600, 1000, 420, 160, "#fff6e6", 7, 16); strokeText(g, n.toLocaleString("en-US"), 810, 1060, 54, { fill: "#2f5f9f", lw: 0, shadow: false }); strokeText(g, "FREE MILES", 810, 1120, 34, { fill: "#1c1422", lw: 0, shadow: false }); } });
      label(g, "A TEENAGER...", 540, 330, 86, t, tT, tM - 0.05);
      stamp(g, "...PLAYING PILOT", 540, 330, 104, t, tP, E(0) + 0.3);
    });
    ev(tM, "cash"); ev(tP, "boing");
  }
  // 1 — uniform + forged license
  { const t0 = S(1) - 0.1, tY = wt(1, "1960s"), tF = wt(1, "Frank"), tU = wt(1, "uniform"), tL = wt(1, "license");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [9, 540, 1290, 1.12, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#4a4a5a"], [1, "#7a7a8a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 640, 450, 340, 560, "#d9e2ec", 8, 10); g.fillStyle = "#4a3a3a"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        const suited = t > tU;
        guy(g, suited ? FRANK : { tunic: "#c0392b", trim: "#f2efe6", hair: "#5a3b2a", trousers: "#3a4a6a" }, { x: 330, y: 1820, h: 600, expr: suited ? "proud" : "sly", armR: [1.6, -0.4], blink: blinkAt(t, 1), t });
        if (suited && t < tU + 0.4) for (let i = 0; i < 6; i++) sparkle(g, 330 + Math.cos(i) * 180, 1400 + Math.sin(i * 2) * 200, 26, (t - tU) / 0.4);
        if (t > tL - 0.1) { g.save(); g.translate(740, 1250); g.rotate(-0.08); g.scale(easeBack(clamp((t - tL + 0.1) / 0.3)), easeBack(clamp((t - tL + 0.1) / 0.3))); rect(g, -200, -120, 400, 240, "#f6f3ea", 7, 12); rect(g, -170, -80, 110, 140, "#d9c8a8", 4, 6); ell(g, -115, -30, 30, 34, SKIN, 3); strokeText(g, "F.A.A.", 70, -60, 44, { font: "Cinzel", fill: "#2f5f9f", lw: 0, shadow: false }); strokeText(g, "PILOT", 70, -5, 40, { fill: "#1c1422", lw: 0, shadow: false }); g.save(); g.rotate(-0.3); rect(g, -60, 30, 220, 60, null, 5, 6); strokeText(g, "FORGED", 50, 60, 36, { fill: "#c0262e", lw: 0, shadow: false }); g.restore(); g.restore(); }
      });
      stamp(g, "THE 1960s", 540, 330, 104, t, tY - 0.05, tF - 0.05);
      label(g, "FRANK ABAGNALE JR.", 540, 330, 66, t, tF, tU - 0.05, { font: "Cinzel" });
      label(g, "A REAL UNIFORM", 540, 330, 80, t, tU, tL - 0.05);
      stamp(g, "A FAKE LICENSE", 540, 330, 100, t, tL, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tU, "sparkle"); ev(tL, "ding");
  }
  // 2 — deadheading around the world; hotels billed to the airline
  { const t0 = S(2) - 0.1, tD = wt(2, "deadheading"), tC = wt(2, "cockpit"), tW = wt(2, "world"), tH = wt(2, "hotels"), tB = wt(2, "billing");
    shot(t0, (g, t, lt) => {
      const ph = t < tC - 0.1 ? 0 : t < tW - 0.1 ? 1 : t < tH - 0.1 ? 2 : 3;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [13, 540, 1290, 1.06, 0]]);
      if (ph === 0) { layer(g, cam, 0.7, apB); layer(g, cam, 1, (g) => { guy(g, FRANK, { x: 300, y: 1820, h: 600, expr: "talk", mouthOpen: talk(t), armR: [1.8, -0.6], blink: blinkAt(t, 1), t }); rect(g, 560, 1080, 460, 200, "#fff6e6", 7, 14); strokeText(g, "“DEADHEADING”", 790, 1150, 46, { fill: "#2f5f9f", lw: 0, shadow: false }); strokeText(g, "= FREE RIDE", 790, 1220, 40, { fill: "#1c1422", lw: 0, shadow: false }); }); }
      if (ph === 1) { layer(g, cam, 1, (g) => { g.fillStyle = "#2a3040"; g.fillRect(-500, -500, 2100, 3000); poly(g, [[60, 300], [1020, 300], [1100, 900], [-20, 900]], "#8ec0ea", 8, true); clouds(g, t * 20, 500, 4, 3, "#fff", 0.8, 0, 1080); rect(g, -100, 900, 1280, 400, "#4a4f5a", 7); for (let i = 0; i < 10; i++) ell(g, 140 + i * 90, 1000 + (i % 2) * 60, 16, 16, ["#e2453c", "#f2c443", "#6fbf5a"][i % 3], 3); for (let i = 0; i < 2; i++) guy(g, { ...FRANK, trim: "#c9c4b8" }, { x: 260 + i * 560, y: 1700, h: 480, sit: true, expr: "neutral", look: 0, t, shadow: false }); guy(g, FRANK, { x: 540, y: 1900, h: 560, sit: true, expr: "proud", t, shadow: false }); }); }
      if (ph === 2) { layer(g, cam, 0.5, (g) => { skyC(g); clouds(g, t * 8, 0, 6, 9, "#fff", 1.1); }); layer(g, cam, 1, (g) => { g.save(); g.beginPath(); g.arc(540, 1200, 360, 0, TAU); g.clip(); g.fillStyle = "#3f86c8"; g.fillRect(100, 800, 900, 900); for (const [x, y, rx, ry] of [[380, 1100, 150, 110], [700, 1060, 180, 120], [600, 1360, 110, 150]]) ell(g, x + Math.sin(t) * 0, y, rx, ry, "#6f9a4a", 5); g.restore(); g.beginPath(); g.arc(540, 1200, 360, 0, TAU); g.lineWidth = 8; g.strokeStyle = INK; g.stroke(); const a = t * 1.6; jet(g, { x: 540 + Math.cos(a) * 470, y: 1200 + Math.sin(a) * 470, h: 110, rot: a + Math.PI / 2 }); }); }
      if (ph === 3) { layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#6a4a3a"], [1, "#9a7a5a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 200, 400, 680, 300, "#e7c15f", 7, 10); strokeText(g, "HOTEL", 540, 550, 90, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); g.fillStyle = "#8a2a33"; g.fillRect(-500, 1550, 2100, 900); }); layer(g, cam, 1, (g) => { guy(g, FRANK, { x: 300, y: 1820, h: 600, expr: "sly", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); if (t > tB - 0.1) { g.save(); g.translate(760, 1200); g.rotate(0.05); rect(g, -170, -220, 340, 440, "#f6f3ea", 6, 6); strokeText(g, "BILL", 0, -160, 48, { font: "Cinzel", fill: "#1c1422", lw: 0, shadow: false }); for (let i = 0; i < 4; i++) line(g, [[-120, -90 + i * 50], [120, -90 + i * 50]], 4, "rgba(40,30,40,0.4)"); strokeText(g, "PAID BY:", 0, 120, 36, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "THE AIRLINE", 0, 170, 40, { fill: "#c0262e", lw: 0, shadow: false }); g.restore(); } }); }
      label(g, "A LOOPHOLE", 540, 330, 96, t, tD - 0.3, tC - 0.1);
      label(g, "THE COCKPIT JUMP SEAT", 540, 330, 64, t, tC, tW - 0.1);
      label(g, "AROUND THE WORLD", 540, 330, 80, t, tW, tH - 0.1, { fill: "#cfe9ff" });
      stamp(g, "BILL THE AIRLINE", 540, 330, 96, t, tB, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tD, "ding"); ev(tC, "pop"); ev(tW, "plane"); ev(tB, "cash");
  }
}
