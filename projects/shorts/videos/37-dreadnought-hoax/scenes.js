// 37 — The Dreadnought Hoax (1910)
"use strict";
window.MOOD = "comic";
const PRANK = (i) => ({ tunic: ["#c0392b", "#2f6f4a", "#d4a632", "#3e78c2", "#7b5ac9"][i % 5], trim: "#f2efe6", helmet: "turban", hatCol: ["#f6f3ea", "#e2b64b", "#c0392b", "#f6f3ea", "#2f6f4a"][i % 5], beard: "#1f1a24", robe: true, skin: "#c99067" });
const NAVY = { tunic: "#1f2a44", trim: "#e7c15f", helmet: "peaked", hatCol: "#1f2a44", badge: "#e7c15f", trousers: "#1f2a44", beard: "#7a5a3a" };
const SAILOR = { tunic: "#1f2a44", trim: "#f2efe6", helmet: "sailor", hatCol: "#f6f3ea", band: "#1f2a44", trousers: "#1f2a44" };
const dock = (g) => { sky3(g, -900, -900, 2900, 2100, "#7a9ac0", "#c0d0e0", "#e6e6e0"); sea(g, 1150, 0, -900, 2000, "#4a7aa4", "#2a5a84"); steamShip(g, { x: 700, y: 1300, h: 700, t: 0, col: "#7a808a", super: "#9aa0aa", funnel: "#7a808a", guns: true, smoke: false }); g.fillStyle = "#8a8f96"; g.fillRect(-900, 1450, 2900, 1200); line(g, [[-900, 1450], [2000, 1450]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const dk = cached("dock", -900, -900, 2900, 3400, dock, 1.0);
  const dkB = cached("dockB", -900, -900, 2900, 3400, dock, 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1910"), tF = wt(0, "fooled"), tR = wt(0, "royal");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [6, 540, 1300, 1.02, 0]]);
      layer(g, cam, 0.8, dkB);
      layer(g, cam, 1, (g) => { rect(g, 200, 1640, 680, 90, "#b8262f", 0); for (let i = 0; i < 4; i++) guy(g, PRANK(i), { x: 260 + i * 150, y: 1700, h: 400, expr: "proud", walk: (t * 0.8 + i * 0.25) % 1, blink: blinkAt(t, i), t }); guy(g, NAVY, { x: 960, y: 1800, h: 520, dir: -1, expr: "happy", armR: [2.6, -1.8], blink: blinkAt(t, 9), t }); });
      stamp(g, "1910", 540, 330, 150, t, tY - 0.05, tF - 0.05);
      stamp(g, "THEY FOOLED THE ROYAL NAVY", 540, 330, 70, t, tF, E(0) + 0.3);
      void tR;
    });
    ev(tY, "boom", 0.5); ev(tF, "laugh");
  }
  // 1 — the disguises
  { const t0 = S(1) - 0.1, tB = wt(1, "beards"), tT = wt(1, "turbans"), tH = wt(1, "Horace"), tV = wt(1, "Virginia"), tE = wt(1, "Emperor");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.1, 0], [12, 540, 1290, 1.18, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#5a3a4a"], [1, "#8a6a6a"]]); g.fillRect(-500, -500, 2100, 3000); rect(g, 120, 400, 300, 500, "#d9e2ec", 8, 10); g.fillStyle = "#5a3424"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        const show = (i) => i < 1 + Math.floor(clamp((t - tB + 0.2) / 2) * 4);
        for (let i = 0; i < 4; i++) if (show(i)) { const isV = i === 2; guy(g, isV ? { ...PRANK(i), skin: "#c99067" } : PRANK(i), { x: 140 + i * 260, y: 1820, h: 520, expr: isV ? "sly" : "proud", blink: blinkAt(t, i), t }); }
        if (t > tB && t < tT) { line(g, [[320, 1230], [360, 1260]], 8, "#d9c08a"); strokeText(g, "GLUE", 340, 1150, 30, { fill: "#fff" }); }
      });
      label(g, "FAKE BEARDS · TURBANS · ROBES", 540, 330, 54, t, tB, tH - 0.05);
      label(g, "HORACE DE VERE COLE", 540, 330, 64, t, tH, tV - 0.05, { font: "Cinzel" });
      label(g, "+ VIRGINIA WOOLF", 540, 330, 72, t, tV, tE - 0.05, { font: "Cinzel", fill: "#ffd0d0" });
      stamp(g, "“THE EMPEROR OF ABYSSINIA”", 540, 330, 66, t, tE, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tB, "pop"); ev(tT, "pop"); ev(tV, "pop"); ev(tE, "horns");
  }
  // 2 — telegram, red carpet, wrong anthem, secret specs
  { const t0 = S(2) - 0.1, tTg = wt(2, "telegram"), tR = wt(2, "red"), tW = wt(2, "wrong"), tS = wt(2, "top-secret");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [11, 540, 1300, 1.02, 0]]);
      layer(g, cam, 0.8, dkB);
      layer(g, cam, 1, (g) => {
        if (t < tR - 0.1) telegram(g, 540, 1150, 720, ["EMPEROR OF ABYSSINIA", "ARRIVING TODAY.", "PREPARE A WELCOME."], clamp((t - tTg + 0.1) / 0.3), -0.03, "TELEGRAM");
        else {
          const k = clamp((t - tR) / 0.8); rect(g, 100, 1640, 880 * k, 90, "#b8262f", 0);
          for (let i = 0; i < 4; i++) guy(g, PRANK(i), { x: 220 + i * 150, y: 1700, h: 380, expr: "proud", blink: blinkAt(t, i), t });
          for (let i = 0; i < 3; i++) guy(g, SAILOR, { x: 160 + i * 300, y: 1880, h: 420, expr: "happy", armR: [1.4, -0.5], blink: blinkAt(t, 5 + i), t });
          if (t > tW) for (let i = 0; i < 4; i++) { const q = (t * 0.9 + i / 4) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, i % 2 ? "♫" : "♪", 200 + i * 220, 1300 - q * 200, 64, { font: "serif", fill: "#fff", lw: 8 }); g.restore(); }
          if (t > tS - 0.1) { guy(g, NAVY, { x: 940, y: 1800, h: 520, dir: -1, expr: "proud", armR: [1.6, -0.4], blink: blinkAt(t, 9), t }); g.save(); g.translate(760, 1150); g.rotate(0.05); rect(g, -150, -110, 300, 220, "#3f6fae", 6, 4); for (let i = 0; i < 5; i++) line(g, [[-120, -70 + i * 35], [120, -70 + i * 35]], 3, "rgba(255,255,255,0.6)"); strokeText(g, "TOP SECRET", 0, -130, 34, { fill: "#c0262e" }); g.restore(); }
        }
      });
      label(g, "RED CARPET", 540, 330, 96, t, tR, tW - 0.05, { fill: "#ffd0c0" });
      label(g, "THE WRONG ANTHEM", 540, 330, 76, t, tW, tS - 0.1, { fill: "#ffe08a" });
      stamp(g, "SECRET SHIP SPECS", 540, 330, 92, t, tS, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tTg, "ding"); ev(tR, "horns"); ev(tW, "sadtrombone", 0.5); ev(tS, "laugh");
  }
}
