// 31 — The Man Who Sold the Eiffel Tower Twice (1925)
"use strict";
window.MOOD = "comic";
const LUST = { tunic: "#2a2a34", trim: "#f2efe6", helmet: "bowler", hatCol: "#1f1a24", trousers: "#2a2a34", moust: true, beard: null, hair: "#2a1a14" };
const DEAL = (i) => ({ tunic: ["#6a5a3a", "#3a4a5a", "#5a3a3a", "#4a5a3a", "#5a4a6a", "#7a6a4a"][i % 6], trim: "#d9c08a", helmet: ["bowler", "tophat", "cap"][i % 3], hatCol: "#3a3a44", trousers: "#3a3a44", beard: i % 2 ? "#5a3b2a" : null });
const paris = (g) => { parisSky(g, -900, 2000, 1350); eiffel(g, 540, 1350, 1100, "#8a6a4a"); g.fillStyle = vgrad(g, 1350, 2400, [[0, "#b9ab94"], [1, "#8a7f6c"]]); g.fillRect(-900, 1350, 2900, 1300); line(g, [[-900, 1350], [2000, 1350]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const pr = cached("paris", -900, -900, 2900, 3400, paris, 1.0);
  const prB = cached("parisB", -900, -900, 2900, 3400, paris, 0.7, 5);
  // 0 — hook
  { const tS = wt(0, "sold"), tT = wt(0, "twice");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.9, 0], [5, 540, 1350, 1.0, 0]]);
      layer(g, cam, 0.8, prB);
      layer(g, cam, 1, (g) => { guy(g, LUST, { x: 340, y: 1820, h: 600, expr: "sly", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); if (t > tS) { rect(g, 560, 1260, 360, 260, "#f6ead0", 6, 6); strokeText(g, "FOR SALE", 740, 1330, 54, { font: "Cinzel", fill: "#c0262e", lw: 0, shadow: false }); strokeText(g, "1 TOWER", 740, 1420, 46, { fill: "#1c1422", lw: 0, shadow: false }); } });
      stamp(g, "SOLD: EIFFEL TOWER", 540, 330, 88, t, tS, tT - 0.05);
      stamp(g, "...TWICE", 540, 330, 130, t, tT, E(0) + 0.3);
    });
    ev(tS, "cash"); ev(tT, "boing");
  }
  // 1 — 1925: the maintenance problem
  { const t0 = S(1) - 0.1, tY = wt(1, "1925"), tV = wt(1, "Victor"), tSt = wt(1, "struggling");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [7, 540, 1330, 1.12, 0]]);
      layer(g, cam, 0.7, prB);
      layer(g, cam, 1, (g) => { guy(g, LUST, { x: 300, y: 1820, h: 600, expr: t > tSt ? "sly" : "neutral", armR: [1.7, -1.0], armL: [-1.7, 1.0], blink: blinkAt(t, 1), t }); newspaper(g, 640, 1250, 460, 560, "TOWER REPAIRS TOO COSTLY", 0.06); });
      stamp(g, "1925", 540, 330, 150, t, tY - 0.05, tV - 0.05);
      label(g, "VICTOR LUSTIG", 540, 330, 86, t, tV, tSt - 0.05, { font: "Cinzel" });
      label(g, "PARIS CAN'T AFFORD IT", 540, 330, 70, t, tSt, E(1) + 0.2, { fill: "#ffe08a" });
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom", 0.5); ev(tSt, "ding");
  }
  // 2 — the secret meeting
  { const t0 = S(2) - 0.1, tP = wt(2, "Posing"), tSi = wt(2, "six"), tSe = wt(2, "secret"), tTo = wt(2, "torn");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [9, 540, 1290, 1.06, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1800, [[0, "#4a3a3a"], [1, "#7a5a4a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 240, 380, 600, 420, "#e9dcc0", 7, 6); eiffel(g, 540, 780, 360, "#8a6a4a"); if (t > tTo) { line(g, [[300, 420], [780, 760]], 16, "#c0262e"); line(g, [[780, 420], [300, 760]], 16, "#c0262e"); } g.fillStyle = "#4a3424"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        rect(g, 100, 1460, 880, 60, "#6b4024", 6, 6);
        for (let i = 0; i < 6; i++) guy(g, DEAL(i), { x: 80 + i * 185, y: 1820, h: 420, dir: i < 3 ? 1 : -1, expr: t > tTo ? "shock" : "neutral", look: 0.6, blink: blinkAt(t, i), t });
        guy(g, { ...LUST, sash: "#2f4f9f" }, { x: 540, y: 1460, h: 480, expr: "talk", mouthOpen: talk(t), armR: [2.4, -0.3], blink: blinkAt(t, 1), t, shadow: false });
      });
      label(g, "“GOVERNMENT OFFICIAL”", 540, 330, 70, t, tP, tSi - 0.05);
      label(g, "6 SCRAP DEALERS", 540, 330, 80, t, tSi, tSe - 0.05);
      label(g, "SECRET MEETING", 540, 330, 80, t, tSe, tTo - 0.05, { fill: "#ffe08a" });
      stamp(g, "“IT'S COMING DOWN”", 540, 330, 86, t, tTo - 0.1, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tSi, "pop"); ev(tSe, "drone", 0.4); ev(tTo, "crash", 0.5);
  }
  // 3 — the bribe; off to Austria
  { const t0 = S(3) - 0.1, tB = wt(3, "bribe"), tF = wt(3, "fled"), tA = wt(3, "Austria");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [5, 540, 1350, 1.1, 0]]);
      layer(g, cam, 0.7, prB);
      layer(g, cam, 1, (g) => {
        if (t < tF - 0.1) { guy(g, DEAL(1), { x: 760, y: 1820, h: 560, dir: -1, expr: "happy", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 2), t }); guy(g, LUST, { x: 320, y: 1820, h: 580, expr: "sly", armR: [1.6, -0.3], blink: blinkAt(t, 1), t }); }
        else { const k = clamp((t - tF) / 1.8); guy(g, LUST, { x: lerp(300, 1400, k), y: 1820, h: 560, expr: "laugh", walk: t * 3, lean: 10, hold: { r: "bag" }, armR: [1.3, -0.3], blink: 0, t }); dust(g, lerp(300, 1400, k) - 120, 1820, 60, (t * 2) % 1, 3); }
      });
      stamp(g, "HUGE BRIBE", 540, 330, 110, t, tB, tA - 0.05);
      label(g, "→ AUSTRIA", 540, 330, 96, t, tA, E(3) + 0.2, { font: "Cinzel" });
    }, { type: "xfade", d: 0.3 });
    ev(tB, "cash"); ev(tF, "whoosh");
  }
  // 4 — he came back and did it again
  { const t0 = S(4) - 0.1, tR = wt(4, "returned"), tA = wt(4, "again");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [5, 540, 1300, 1.02, 0]]);
      layer(g, cam, 0.8, prB);
      layer(g, cam, 1, (g) => { guy(g, LUST, { x: lerp(-300, 340, clamp((t - tR + 0.3) / 1.2)), y: 1820, h: 600, expr: "sly", walk: t < tR + 0.9 ? t * 2 : null, armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); if (t > tA - 0.3) { rect(g, 560, 1260, 360, 260, "#f6ead0", 6, 6); strokeText(g, "FOR SALE", 740, 1330, 54, { font: "Cinzel", fill: "#c0262e", lw: 0, shadow: false }); strokeText(g, "(AGAIN)", 740, 1420, 46, { fill: "#1c1422", lw: 0, shadow: false }); } });
      label(g, "MONTHS LATER...", 540, 330, 80, t, t0 + 0.2, tA - 0.1);
      stamp(g, "SAME SCAM. AGAIN.", 540, 330, 92, t, tA, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tR, "whoosh", 0.5); ev(tA, "boing"); ev(tA + 0.2, "cash");
  }
}
