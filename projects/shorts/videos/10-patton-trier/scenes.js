// 10 — General Patton's Reply at Trier (1945)
"use strict";
window.MOOD = "epic";
const PATTON = { tunic: "#6f6a45", trim: "#e7c15f", helmet: "steel", hatCol: "#5f5a3a", trousers: "#b9a87a", boots: "#5a3a22", sash: null };
HATS.steel3 = (g, rx, ry, lw, o, u) => { HATS.steel(g, rx, ry, lw, o); for (let i = -1; i <= 1; i++) { g.save(); g.translate(i * rx * 0.4, -ry * 0.95); g.beginPath(); for (let k = 0; k < 10; k++) { const a = (k / 10) * TAU - Math.PI / 2, r = k % 2 ? rx * 0.06 : rx * 0.15; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.fillStyle = "#f6f3ea"; g.fill(); g.restore(); } };
PATTON.helmet = "steel3";
const HQ = { tunic: "#6f6a45", trim: "#e7c15f", helmet: "peaked", hatCol: "#6f6a45", trousers: "#b9a87a" };
function tank(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7);
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  rect(g, -110 * u, -40 * u, 220 * u, 40 * u, "#3a3a34", lw, 20 * u);
  for (let i = 0; i < 6; i++) ell(g, (-90 + i * 36) * u, -20 * u, 14 * u, 14 * u, "#5a5a50", lw * 0.6);
  poly(g, [[-100 * u, -40 * u], [100 * u, -40 * u], [80 * u, -76 * u], [-90 * u, -76 * u]], "#5f6a45", lw);
  smoothPath(g, [[-50 * u, -76 * u], [-40 * u, -110 * u], [30 * u, -112 * u], [50 * u, -76 * u]]); fillInk(g, "#5f6a45", lw);
  line(g, [[40 * u, -96 * u], [150 * u, -100 * u]], 10 * u, INK); line(g, [[40 * u, -96 * u], [150 * u, -100 * u]], 6 * u, "#4f5a3a");
  ell(g, -10 * u, -60 * u, 12 * u, 12 * u, "#f6f3ea", lw * 0.4); // white star roundel
  g.restore();
}
const portaNigra = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a6f9a", "#a8b8cc", "#e2dccb");
  for (let i = 0; i < 10; i++) house(g, -800 + i * 300, 1250, 220, 260 + (i % 3) * 60, ["#c9b49a", "#b9a48a", "#d9c4aa"][i % 3], "#6a4a4a", 4, "#3a3a4a");
  // the Porta Nigra (Roman gate of Trier)
  rect(g, 180, 600, 720, 650, "#4a4542", 7, 4);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const x = 220 + c * 112, y = 650 + r * 170; smoothPath(g, [[x, y + 130], [x, y + 50], [x + 40, y + 10], [x + 80, y + 50], [x + 80, y + 130]]); fillInk(g, "#1f1c1a", 4); }
  rect(g, 380, 1050, 320, 200, "#1f1c1a", 6, 120);
  ground(g, 1250, "#9a9184", -900, 2000);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
const hqRoom = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#3a3a2a"], [1, "#6a6a4a"]]); g.fillRect(-600, -400, 2300, 2100);
  rect(g, 120, 400, 840, 560, "#e9dcb4", 7, 6); for (let i = 0; i < 6; i++) line(g, [[160, 460 + i * 80], [920, 470 + i * 80 + (i % 2) * 20]], 4, "rgba(80,60,40,0.35)"); ell(g, 560, 680, 30, 30, "#c0262e", 5); strokeText(g, "TRIER", 560, 740, 40, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false });
  g.fillStyle = "#4a3a2a"; g.fillRect(-600, 1560, 2300, 900); line(g, [[-600, 1560], [1700, 1560]], 6);
  paintGrain(g, -600, -400, 2300, 2900, 0.08);
};
function buildShots() {
  const city = cached("trier", -900, -900, 2900, 3400, portaNigra, 1.0);
  const cityB = cached("trierB", -900, -900, 2900, 3400, portaNigra, 0.7, 5);
  const hq = cached("hq", -600, -400, 2300, 2900, hqRoom, 1.1);
  // 0 — hook: Patton, Trier, and his orders
  { const tY = wt(0, "1945"), tP = wt(0, "Patton"), tSp = wt(0, "spite");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.9, 0], [tP, 540, 1350, 1.0, 0], [tP + 0.6, 540, 1450, 1.3, 0], [8, 540, 1450, 1.33, 0]]);
      layer(g, cam, 0.7, cityB);
      layer(g, cam, 1, (g) => {
        tank(g, { x: 540, y: 1840, h: 320 });
        guy(g, PATTON, { x: 520, y: 1490, h: 420, expr: t > tSp ? "sly" : "determined", armR: [0.7, 1.1], armL: [-0.7, -1.1], blink: blinkAt(t, 1), t, shadow: false });
      });
      stamp(g, "1945", 540, 330, 150, t, tY - 0.05, tP - 0.05);
      label(g, "GEN. GEORGE PATTON", 540, 330, 64, t, tP, tSp - 0.05);
      stamp(g, "JUST TO SPITE ORDERS", 540, 330, 74, t, tSp, E(0) + 0.3);
    });
    ev(tY, "boom"); ev(tP, "drums"); ev(tSp, "pop");
  }
  // 1 — the order: bypass Trier, it needs 4 divisions
  { const t0 = S(1) - 0.1, tO = wt(1, "ordering"), tB = wt(1, "bypass"), tF = wt(1, "four");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [tF - t0, 540, 1200, 1.12, 0], [10, 540, 1200, 1.15, 0]]);
      layer(g, cam, 0.8, hq);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 3; i++) guy(g, HQ, { x: 180 + i * 360, y: 1820, h: 500, dir: i === 2 ? -1 : 1, expr: "stern", armR: i === 1 ? [2.2, 0] : [0.4, 0.3], blink: blinkAt(t, i), t });
        if (t > tB - 0.1) telegram(g, 540, 1060, 760, ["BYPASS TRIER.", "WILL NEED", "4 DIVISIONS."].slice(0, t > tF - 0.1 ? 3 : 1), clamp((t - tB + 0.1) / 0.3), -0.03, "HIGH COMMAND");
      });
      label(g, "ALLIED HIGH COMMAND", 540, 330, 64, t, t0 + 0.1, tF - 0.05);
      stamp(g, "4 DIVISIONS", 540, 330, 110, t, tF, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tO, "ding"); ev(tF, "boom", 0.6);
  }
  // 2 — already through the defenses
  { const t0 = S(2) - 0.1, tAl = wt(2, "already"), tBr = wt(2, "broken");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.95, 0], [5, 540, 1330, 1.05, 2]]);
      layer(g, cam, 0.7, cityB);
      layer(g, cam, 1, (g) => {
        const wallUp = t < tBr;
        if (wallUp) { rect(g, 200, 1350, 680, 300, "#8a8278", 6); for (let i = 0; i < 10; i++) poly(g, [[180 + i * 80, 1660], [220 + i * 80, 1560], [260 + i * 80, 1660]], "#c9c2b2", 4); }
        else for (let i = 0; i < 10; i++) { const k = clamp((t - tBr) / 1.0); g.save(); g.translate(540 + Math.cos(i) * k * 500, 1500 - Math.sin(i * 2) * k * 300 + k * k * 300); g.rotate(k * (i - 5)); rect(g, -40, -30, 80, 60, "#8a8278", 4); g.restore(); }
        for (let i = 0; i < 3; i++) tank(g, { x: lerp(-400, 300 + i * 260, clamp((t - t0 + i * 0.2) / (tBr - t0 + 0.3))), y: 1820 + (i % 2) * 40, h: 240 });
        if (!wallUp) { dust(g, 540, 1600, 260, clamp((t - tBr) / 1.2), 4); boomFx(g, 540, 1500, 300, (t - tBr) / 0.6); }
      });
      label(g, "ALREADY THROUGH", 540, 330, 80, t, tAl, 999);
    }, { type: "whip", d: 0.3 });
    ev(t0, "rumble"); ev(tBr, "crash"); KICKS.push({ t: tBr, a: 22 });
  }
  // 3+4 — the reply
  { const t0 = S(3) - 0.1, tT = wt(3, "taken"), tTw = wt(3, "two"), tW = wt(4, "What"), tG = wt(4, "give");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [tW - t0, 540, 1200, 1.08, 0], [tG - t0, 540, 1150, 1.2, -2], [8, 540, 1150, 1.22, -2]]);
      layer(g, cam, 0.7, cityB);
      layer(g, cam, 1, (g) => {
        guy(g, PATTON, { x: 220, y: 1840, h: 580, expr: t > tG - 0.2 ? "sly" : "talk", mouthOpen: talk(t), armR: [1.6, -0.6], blink: blinkAt(t, 1), t });
        const lines = ["HAVE TAKEN TRIER", "WITH TWO DIVISIONS."]; if (t > tW - 0.1) lines.push("WHAT DO YOU WANT ME", "TO DO, GIVE IT BACK?");
        telegram(g, 640, 1050, 760, lines, clamp((t - tT + 0.2) / 0.3), 0.03, "PATTON");
      });
      stamp(g, "2 DIVISIONS", 540, 330, 110, t, tTw, tW - 0.1);
    }, { type: "xfade", d: 0.3 });
    ev(tT, "ding"); ev(tTw, "boom", 0.6); ev(tG, "laugh", 0.6);
  }
  // 5 — high command lets him keep it
  { const t0 = S(5) - 0.1, tK = wt(5, "keep");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.05, 0], [4, 540, 1230, 1.12, 0]]);
      layer(g, cam, 0.8, hq);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) guy(g, HQ, { x: 180 + i * 360, y: 1820, h: 500, dir: i === 2 ? -1 : 1, expr: i === 1 ? "sad" : "shock", armR: [2.0, -1.2], armL: [-2.0, 1.2], blink: blinkAt(t, i), t }); });
      stamp(g, "...FINE. KEEP IT.", 540, 330, 92, t, tK - 0.1, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tK, "boing", 0.6);
  }
}
