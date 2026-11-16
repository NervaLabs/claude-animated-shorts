// 33 — Gregor MacGregor and the Fake Country of Poyais (1820s)
"use strict";
window.MOOD = "eerie";
const MAC = { tunic: "#c0262e", trim: "#e7c15f", helmet: "bicorne", cockade: "#2f6f4a", trousers: "#f2efe6", boots: "#1f1a24", sash: "#2f6f4a", moust: true, beard: "#7a4a2a" };
const SET = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: ["tophat", "bonnet", "cap", null][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
const POY = (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); g.fillStyle = "#2f6f4a"; g.fillRect(-w, h * 0.33, w * 3, h * 0.34); g.fillStyle = "#c0262e"; g.beginPath(); g.arc(w * 0.5, h * 0.5, h * 0.18, 0, TAU); g.fill(); };
function poyaisNote(g, x, y, s, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rect(g, -140, -70, 280, 140, "#e9d9a0", 5, 6); rect(g, -126, -56, 252, 112, null, 3, 4); strokeText(g, "BANK OF POYAIS", 0, -30, 22, { font: "Cinzel", fill: "#2f6f4a", lw: 0, shadow: false }); strokeText(g, "$5", 0, 20, 52, { font: "Cinzel", fill: "#2f6f4a", lw: 0, shadow: false }); g.restore(); }
const london = (g) => { sky3(g, -900, -900, 2900, 2100, "#7a8aa8", "#b8c0cc", "#e2dccb"); for (let i = 0; i < 11; i++) { const x = -800 + i * 260, h = 380 + rnd(i) * 160; brickWall(g, x, 1300 - h, 240, h, ["#9a4a3a", "#8a5a4a", "#a86a4a"][i % 3], 4); } g.fillStyle = "#8a8278"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
const jungle = (g) => { sky3(g, -900, -900, 2900, 2100, "#5a8a7a", "#9ac0a8", "#d9e6c8"); for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = -800 + i * 340 + r * 120, y = 1100 + r * 150; limb(g, [[x, y + 200], [x + 10, y - 100]], 30, "#5a3b2a", 4); for (let k = 0; k < 5; k++) ell(g, x + Math.cos(k * 1.3) * 120, y - 120 + Math.sin(k * 1.7) * 60, 110, 70, ["#2f6a3a", "#3f7a3a", "#2a5a32"][(k + r) % 3], 5); } g.fillStyle = "#3a5a2a"; g.fillRect(-900, 1500, 2900, 1200); line(g, [[-900, 1500], [2000, 1500]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const ld = cached("ldn33", -900, -900, 2900, 3400, london, 1.0);
  const ldB = cached("ldn33B", -900, -900, 2900, 3400, london, 0.7, 5);
  const jg = cached("jungle", -900, -900, 2900, 3400, jungle, 1.0);
  // 0 — hook
  { const tS = wt(0, "Scottish"), tF = wt(0, "fake"), tH = wt(0, "hundreds");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [5, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, ldB);
      layer(g, cam, 1, (g) => { guy(g, MAC, { x: 300, y: 1820, h: 620, expr: "sly", armR: [2.2, -0.2], blink: blinkAt(t, 1), t }); pole(g, 700, 1800, 650, POY, t, 230, 150); if (t > tH) for (let i = 0; i < 4; i++) guy(g, SET(i), { x: 600 + i * 120, y: 1840, h: 360, dir: -1, expr: "happy", look: -0.6, blink: blinkAt(t, 4 + i), t }); });
      label(g, "A SCOTTISH SOLDIER", 540, 330, 72, t, tS, tF - 0.05);
      stamp(g, "INVENTED A COUNTRY", 540, 330, 88, t, tF, E(0) + 0.3);
    });
    ev(tF, "boom", 0.5); ev(tH, "cheer", 0.4);
  }
  // 1 — "Poyais", a paradise
  { const t0 = S(1) - 0.1, tY = wt(1, "1820s"), tR = wt(1, "ruler"), tP = wt(1, "Poyais"), tPa = wt(1, "paradise");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [7, 540, 1250, 1.06, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000);
        rect(g, 140, 650, 800, 760, "#f3e3bb", 8, 10);
        g.save(); g.beginPath(); g.rect(150, 660, 780, 740); g.clip(); g.fillStyle = "#5ea4c8"; g.fillRect(150, 660, 780, 740);
        poly(g, [[150, 700], [700, 680], [760, 900], [640, 1100], [560, 1400], [150, 1400]], "#c9b07a", 6, true);
        if (t > tP - 0.2) { const k = ss((t - tP + 0.2) / 0.5); g.save(); g.globalAlpha = k; poly(g, [[460, 860], [700, 820], [740, 980], [600, 1120], [430, 1060]], "rgba(47,111,74,0.75)", 6, true); g.restore(); strokeText(g, "POYAIS", 580, 960, 54, { font: "Cinzel", fill: "#fff6dc", lw: 10 }); }
        g.restore();
        guy(g, MAC, { x: 900, y: 1800, h: 480, dir: -1, expr: "proud", armR: [2.0, -0.2], blink: blinkAt(t, 1), t });
      });
      label(g, "THE 1820s", 540, 330, 86, t, tY, tR - 0.05, { font: "Cinzel" });
      label(g, "“RULER OF POYAIS”", 540, 330, 76, t, tR, tPa - 0.05, { font: "Cinzel" });
      stamp(g, "A “PARADISE”", 540, 330, 104, t, tPa, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tP, "ding"); ev(tPa, "choir", 0.5);
  }
  // 2 — fake money, bonds, a guidebook
  { const t0 = S(2) - 0.1, tC = wt(2, "currency"), tB = wt(2, "bonds"), tG = wt(2, "guidebook");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [7, 540, 1300, 1.1, 0]]);
      layer(g, cam, 0.7, ldB);
      layer(g, cam, 1, (g) => {
        guy(g, MAC, { x: 260, y: 1820, h: 600, expr: "sly", armR: [1.8, -0.4], blink: blinkAt(t, 1), t });
        if (t > tC - 0.1) for (let i = 0; i < 4; i++) poyaisNote(g, 680 + (i % 2) * 120, 1000 + i * 70, 1.1, -0.1 + i * 0.07);
        if (t > tB - 0.1) for (let i = 0; i < 4; i++) guy(g, SET(i), { x: 600 + i * 130, y: 1840, h: 380, dir: -1, expr: "happy", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 3 + i), t });
        if (t > tG - 0.1) { g.save(); g.translate(560, 1340); g.rotate(-0.08); rect(g, -130, -170, 260, 340, "#2f6f4a", 7, 10); strokeText(g, "POYAIS", 0, -90, 40, { font: "Cinzel", fill: "#e7c15f", lw: 0, shadow: false }); strokeText(g, "GUIDE", 0, -40, 34, { font: "Cinzel", fill: "#e7c15f", lw: 0, shadow: false }); palm(g, 0, 130, 140, 3, t); g.restore(); }
      });
      label(g, "FAKE CURRENCY", 540, 330, 86, t, tC, tB - 0.05);
      label(g, "GOVERNMENT BONDS", 540, 330, 76, t, tB, tG - 0.05, { fill: "#ffe08a" });
      label(g, "A GUIDEBOOK", 540, 330, 86, t, tG, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tC, "cash"); ev(tB, "cash"); ev(tG, "pop");
  }
  // 3 — 200+ settlers sail, and find jungle
  { const t0 = S(3) - 0.1, tSa = wt(3, "sailed"), tJ = wt(3, "jungle");
    shot(t0, (g, t, lt) => {
      const land = t > tJ - 0.5;
      const cam = camAt(lt, [[0, 540, 1250, 0.95, 0], [5, 540, 1300, 1.02, 0]]);
      if (!land) { layer(g, cam, 1, (g) => { sky3(g, -900, -900, 2900, 2100, "#5a8ad0", "#b3d2ee", "#efe6d0"); sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94"); sailShip(g, { x: lerp(-200, 900, clamp((t - t0) / 3.5)), y: 1400, h: 420, t, flag: POY, hull: "#6b4024", seed: 2 }); }); label(g, "200+ SETTLERS", 540, 330, 86, t, t0 + 0.2, tSa); label(g, "ACROSS THE ATLANTIC", 540, 330, 70, t, tSa, tJ - 0.5, { fill: "#cfe9ff" }); }
      else { layer(g, cam, 0.8, jg); layer(g, cam, 1, (g) => { for (let i = 0; i < 5; i++) guy(g, SET(i), { x: 140 + i * 200, y: 1820 + (i % 2) * 30, h: 440, expr: "shock", look: (i % 2 ? 1 : -1) * 0.6, blink: blinkAt(t, i), t }); }); stamp(g, "...UNTOUCHED JUNGLE", 540, 330, 84, t, tJ, E(3) + 0.2); }
    }, { type: "xfade", d: 0.3 });
    ev(t0, "splash", 0.4); ev(tJ, "sting", 0.6);
  }
  // 4 — most died; MacGregor escapes to France
  { const t0 = S(4) - 0.1, tM = wt(4, "Most"), tF = wt(4, "France");
    shot(t0, (g, t, lt) => {
      const fr = t > tF - 0.4;
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.08, 0]]);
      if (!fr) { layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#1f2a2a"], [1, "#101818"]]); g.fillRect(-500, -500, 2100, 3000); }); layer(g, cam, 1, (g) => { for (let i = 0; i < 5; i++) { const x = 220 + i * 160; rect(g, x - 16, 1300, 32, 120, "#f2efe6", 4, 4); flame(g, x, 1292, 16, t + i); } rect(g, 120, 1420, 840, 50, "#5a3b2a", 5, 6); }); label(g, "MOST SETTLERS DIED", 540, 330, 70, t, tM, tF - 0.4, { font: "Cinzel", fill: "#e6e0f2" }); }
      else { layer(g, cam, 0.7, (g) => { parisSky(g, -500, 1600, 1350); g.fillStyle = "#b9ab94"; g.fillRect(-500, 1350, 2100, 1200); }); layer(g, cam, 1, (g) => { guy(g, MAC, { x: 540, y: 1820, h: 600, expr: "sly", armR: [1.8, -1.0], hold: { r: "cup" }, blink: blinkAt(t, 1), t }); }); stamp(g, "MACGREGOR: SAFE IN FRANCE", 540, 330, 70, t, tF - 0.1, 999); }
    }, { type: "black", d: 0.4 });
    ev(tM, "drone"); ev(tF, "boing", 0.5);
  }
}
