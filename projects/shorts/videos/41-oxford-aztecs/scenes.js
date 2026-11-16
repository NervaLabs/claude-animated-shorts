// 41 — Oxford University Is Older Than the Aztec Empire
"use strict";
window.MOOD = "epic";
const DON = (i) => ({ tunic: "#1f1a24", trim: "#f2efe6", helmet: i === 0 ? null : "cap", hatCol: "#1f1a24", hair: i === 0 ? "#9a9a9a" : "#5a3b2a", robe: true, beard: i === 0 ? "#9a9a9a" : null, bald: i === 0 });
const MEX = (i) => ({ tunic: "#f3ecda", trim: ["#c0392b", "#2f6fcf", "#e2b64b"][i % 3], hair: "#1a1012", skin: ["#a86a42", "#9a5a3a", "#b97a4a"][i % 3], robe: i % 2 === 0, trousers: "#f3ecda" });
const oxf = (g) => { sky3(g, -900, -900, 2900, 2100, "#7a9ac0", "#c0d0e0", "#e6e6e0"); gothicCollege(g, 540, 1300, 1100, 620); g.fillStyle = "#7aa04e"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
const lake = (g) => { sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#a0d0f0", "#f4e6c0"); smoothHills(g, -900, 2000, 1050, 260, "#8a9a6a", 3, 5); poly(g, [[-200, 1060], [200, 700], [600, 1060]], "#9aa0a8", 5); poly(g, [[140, 760], [200, 700], [260, 760]], "#f6f6f6", 4); g.fillStyle = "#4ea3c9"; g.fillRect(-900, 1150, 2900, 1500); line(g, [[-900, 1150], [2000, 1150]], 5); paintGrain(g, -900, -900, 2900, 3400, 0.06); };
function eagleCactus(g, x, y, s, t) { const u = s / 100; for (const [dx, dy, r] of [[0, -60, 50], [-50, -120, 36], [50, -130, 36]]) ell(g, x + dx * u, y + dy * u, r * u * 0.7, r * u, "#4f8a3f", 4); g.save(); g.translate(x, y - 190 * u); for (const sd of [-1, 1]) poly(g, [[0, 0], [sd * 70 * u, -30 * u + Math.sin(t * 3) * 6 * u], [sd * 50 * u, 10 * u]], "#6b4024", 4, true); ell(g, 0, 0, 22 * u, 30 * u, "#6b4024", 4); ell(g, 10 * u, -34 * u, 14 * u, 13 * u, "#6b4024", 3); poly(g, [[20 * u, -36 * u], [34 * u, -30 * u], [20 * u, -28 * u]], "#e2b64b", 2); g.restore(); }
function buildShots() {
  const ox = cached("oxf", -900, -900, 2900, 3400, oxf, 1.0);
  const oxB = cached("oxfB", -900, -900, 2900, 3400, oxf, 0.7, 5);
  const lk = cached("lake", -900, -900, 2900, 3400, lake, 1.0);
  // 0 — hook
  { const tO = wt(0, "Oxford"), tC = wt(0, "centuries"), tA = wt(0, "Aztec");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [6, 540, 1250, 1.05, 0]]);
      layer(g, cam, 1, (g) => {
        g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); g.translate(-270, 0); oxB(g); for (let i = 0; i < 3; i++) guy(g, DON(i + 1), { x: 640 + i * 120, y: 1700, h: 360, expr: "talk", mouthOpen: talk(t + i), blink: blinkAt(t, i), t }); g.restore();
        g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); g.translate(270, 0); lk(g); if (t > tA) strokeText(g, "NOT YET", 540, 1300, 80, { fill: "#fff6dc" }); g.restore();
        line(g, [[540, -200], [540, 2400]], 10);
      });
      label(g, "OXFORD", 270, 330, 80, t, tO, E(0) + 0.3, { font: "Cinzel" });
      label(g, "AZTEC EMPIRE", 810, 330, 64, t, tA, E(0) + 0.3, { font: "Cinzel", fill: "#ffe08a" });
      void tC;
    });
    ev(tO, "pop"); ev(tA, "boing");
  }
  // 1 — 1096: classes at Oxford
  { const t0 = S(1) - 0.1, tO = wt(1, "Oxford"), tY = wt(1, "1096");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.85, 0], [6, 540, 1250, 1.0, 0]]);
      layer(g, cam, 0.8, ox);
      layer(g, cam, 1, (g) => { guy(g, DON(0), { x: 300, y: 1800, h: 560, expr: "talk", mouthOpen: talk(t), armR: [1.9, -0.4], hold: { l: "scroll" }, blink: blinkAt(t, 1), t }); for (let i = 0; i < 4; i++) guy(g, DON(i + 1), { x: 600 + (i % 2) * 220, y: 1700 + Math.floor(i / 2) * 140, h: 380, dir: -1, sit: true, expr: "neutral", blink: blinkAt(t, 3 + i), t, shadow: false }); });
      label(g, "OXFORD, ENGLAND", 540, 330, 76, t, tO, tY - 0.05, { font: "Cinzel" });
      stamp(g, "1096", 540, 330, 150, t, tY - 0.05, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom", 0.6);
  }
  // 2 — Mexico: Tenochtitlan founded in 1325
  { const t0 = S(2) - 0.1, tM = wt(2, "Mexico"), tMx = wt(2, "Mexica"), tT = wt(2, "Tenochtitlan"), tY = wt(2, "1325");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 0.9, 0], [12, 540, 1150, 0.95, 0]]);
      layer(g, cam, 0.8, lk);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#4ea3c9"; g.fillRect(-900, 1150, 2900, 1500); waves(g, 1200, t, -900, 2000, "#4ea3c9", 8);
        const k = clamp((t - tT + 0.3) / 1.5);
        smoothPath(g, [[180, 1400], [900, 1400], [960, 1480], [120, 1480]]); fillInk(g, "#c9b07a", 6);
        if (k > 0) { g.save(); g.translate(540, 1400); g.scale(1, easeBack(k)); stepTemple(g, 0, 0, 220); g.restore(); for (let i = 0; i < 4; i++) { g.save(); g.translate(220 + i * 180 - (i > 1 ? -60 : 0), 1400); g.scale(1, easeBack(clamp((t - tT - i * 0.1) / 0.5))); rect(g, -50, -90, 100, 90, "#e9dcc0", 4); poly(g, [[-56, -90], [0, -130], [56, -90]], "#c9a06a", 4); g.restore(); } }
        else eagleCactus(g, 540, 1400, 200, t);
        for (let i = 0; i < 2; i++) { const x = 120 + i * 780 + Math.sin(t + i) * 20; rowboat(g, { x, y: 1650, h: 120, t, dir: i ? -1 : 1, col: "#8a5a32" }); guy(g, MEX(i), { x, y: 1610, h: 240, dir: i ? -1 : 1, expr: "happy", blink: blinkAt(t, i), t, shadow: false }); }
      });
      label(g, "MEANWHILE, IN MEXICO", 540, 330, 66, t, tM - 0.4, tMx - 0.05);
      label(g, "THE MEXICA", 540, 330, 86, t, tMx, tT - 0.05, { font: "Cinzel" });
      label(g, "TENOCHTITLAN", 540, 330, 86, t, tT, tY - 0.05, { font: "Cinzel", fill: "#ffe08a" });
      stamp(g, "1325", 540, 330, 150, t, tY - 0.05, E(2) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(tM, "whoosh"); ev(tT, "build"); ev(tY, "boom", 0.6);
  }
  // 3 — Oxford was already 200+ years old
  { const t0 = S(3) - 0.1, tT = wt(3, "two"), tF = wt(3, "first");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000);
        line(g, [[100, 1500], [980, 1500]], 12, "#f6f3ea");
        for (const [x, lab, col] of [[160, "1096", "#cfe0ff"], [920, "1325", "#ffe08a"]]) { ell(g, x, 1500, 24, 24, col, 5); strokeText(g, lab, x, 1580, 50, { font: "Cinzel", fill: col }); }
        const k = clamp((t - t0) / 1.4); line(g, [[160, 1500], [160 + 760 * k, 1500]], 18, "#c0392b");
        g.save(); g.translate(260, 1340); g.scale(0.32, 0.32); gothicCollege(g, 0, 0, 700, 420); g.restore();
        g.save(); g.translate(920, 1440); g.scale(0.5, 0.5); stepTemple(g, 0, 0, 200); g.restore();
        if (t > tT - 0.1) cake(g, 300, 1100, 140, "229", t);
      });
      stamp(g, "OXFORD: 200+ YEARS OLD", 540, 330, 82, t, tT, tF + 0.3);
      label(g, "WHEN THE FIRST AZTEC TEMPLE ROSE", 540, 330, 48, t, tF + 0.3, 999, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.3 });
    ev(tT, "ding"); ev(tF, "choir", 0.5);
  }
}
