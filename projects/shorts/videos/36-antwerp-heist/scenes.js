// 36 — The Antwerp Diamond Heist (2003)
"use strict";
window.MOOD = "eerie";
const THIEF = (i) => ({ tunic: "#1f1a24", trim: "#3a3a44", helmet: "cap", hatCol: "#1f1a24", trousers: "#1f1a24", hair: "#2a1a14", moust: i === 0, beard: i === 0 ? "#3a2a22" : null });
const vaultRoom = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#2a3040"], [1, "#4a5060"]]); g.fillRect(-900, -900, 2900, 2600); for (let r = 0; r < 9; r++) for (let c = 0; c < 14; c++) rect(g, -600 + c * 160, 200 + r * 130, 150, 120, "#8a8f96", 4, 6); g.fillStyle = "#3a3f4a"; g.fillRect(-900, 1500, 2900, 1000); line(g, [[-900, 1500], [2000, 1500]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const vr = cached("vault", -900, -900, 2900, 3400, vaultRoom, 1.0);
  const vrB = cached("vaultB", -900, -900, 2900, 3400, vaultRoom, 0.7, 4);
  // 0 — hook: $100M from an "unbreakable" vault
  { const tH = wt(0, "hundred"), tU = wt(0, "unbreakable"), tA = wt(0, "alarm");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [7, 540, 1250, 1.08, 0]]);
      layer(g, cam, 0.7, vrB);
      layer(g, cam, 1, (g) => {
        vaultDoor(g, 540, 1050, 300, t > tU + 0.8 ? clamp((t - tU - 0.8) / 0.8) : 0, t);
        if (t > tH) for (let i = 0; i < 8; i++) diamond(g, 260 + i * 80, 1560 - (i % 2) * 40, 34, t + i);
        for (let i = 0; i < 2; i++) guy(g, THIEF(i), { x: i ? 900 : 160, y: 1840, h: 520, dir: i ? -1 : 1, expr: "sly", blink: blinkAt(t, i), t });
        if (t > tA) { ell(g, 920, 500, 60, 60, "#c0262e", 6); strokeText(g, "...", 920, 500, 50, { fill: "#fff", lw: 0, shadow: false }); }
      });
      stamp(g, "$100,000,000+", 540, 330, 110, t, tH, tU - 0.05);
      stamp(g, "“UNBREAKABLE”", 540, 330, 100, t, tU, tA - 0.05);
      label(g, "NO ALARM", 540, 330, 96, t, tA, E(0) + 0.3, { fill: "#ffd0c0" });
    });
    ev(tH, "cash"); ev(tU, "clank"); ev(tA, "drone", 0.5);
  }
  // 1 — years of renting an office; ten layers of security
  { const t0 = S(1) - 0.1, tY = wt(1, "2003"), tL = wt(1, "Leonardo"), tR = wt(1, "renting"), tT = wt(1, "ten"), tI = wt(1, "infrared"), tM = wt(1, "magnetic"), tS = wt(1, "seismic");
    shot(t0, (g, t, lt) => {
      const sec = t > tT - 0.2;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [16, 540, 1290, 1.08, 0]]);
      if (!sec) {
        layer(g, cam, 0.7, (g) => { sky3(g, -500, -500, 2100, 2000, "#6a86b0", "#b8c8d8", "#e6e2d6"); rect(g, 40, 300, 1000, 1300, "#c9c4b8", 8); for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) rect(g, 100 + c * 190, 360 + r * 190, 130, 130, "#5a7a9a", 5); g.fillStyle = "#8a8278"; g.fillRect(-500, 1600, 2100, 900); });
        layer(g, cam, 1, (g) => { guy(g, { ...THIEF(0), helmet: null, hair: "#5a3b2a", tunic: "#3a3a44" }, { x: 300, y: 1840, h: 560, expr: "sly", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 1), t }); if (t > tR - 0.1) { rect(g, 560, 1180, 380, 180, "#fff6e6", 7, 10); strokeText(g, "OFFICE", 750, 1240, 50, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "FOR RENT", 750, 1305, 44, { fill: "#2f6f4a", lw: 0, shadow: false }); } });
        stamp(g, "2003", 540, 330, 150, t, tY - 0.05, tL - 0.05);
        label(g, "LEONARDO NOTARBARTOLO", 540, 330, 56, t, tL, tR - 0.05, { font: "Cinzel" });
        label(g, "YEARS AS A “TENANT”", 540, 330, 72, t, tR, tT - 0.2);
      } else {
        layer(g, cam, 0.7, vrB);
        layer(g, cam, 1, (g) => {
          const icons = [[tI, 270, "INFRARED", (x, y) => { ell(g, x, y, 70, 46, "#3a3a44", 6); ell(g, x, y, 26, 26, "#c0262e", 0); for (let k = 0; k < 3; k++) line(g, [[x + 40, y], [x + 200, y - 60 + k * 60]], 4, "rgba(255,80,80,0.6)"); }], [tM, 810, "MAGNETIC", (x, y) => { g.beginPath(); g.arc(x, y, 60, Math.PI, 0); g.lineWidth = 36; g.strokeStyle = "#c0262e"; g.stroke(); rect(g, x - 78, y, 36, 50, "#d9d9d9", 4); rect(g, x + 42, y, 36, 50, "#d9d9d9", 4); }], [tS, 540, "SEISMIC", (x, y) => { rect(g, x - 120, y - 60, 240, 120, "#f6f3ea", 6, 8); g.beginPath(); for (let i = 0; i < 40; i++) g.lineTo(x - 100 + i * 5, y + Math.sin(i * 1.3 + t * 8) * 30 * Math.exp(-Math.abs(i - 20) / 8)); g.lineWidth = 4; g.strokeStyle = "#2f5f9f"; g.stroke(); }]];
          icons.forEach(([ti, x, lab, fn], i) => { if (t < ti - 0.1) return; const y = i === 2 ? 1300 : 880; g.save(); g.globalAlpha = clamp((t - ti + 0.1) / 0.2); fn(x, y); strokeText(g, lab, x, y + 130, 44, { fill: "#ffe08a" }); g.restore(); });
          for (let i = 0; i < 10; i++) { const on = t > tT + i * 0.15; ell(g, 140 + i * 90, 1640, 26, 26, on ? "#c0262e" : "#5a5f6a", 4); }
        });
        stamp(g, "10 LAYERS OF SECURITY", 540, 330, 80, t, tT, 999);
      }
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom", 0.5); ev(tR, "ding"); ev(tT, "boom", 0.5); ev(tI, "pop"); ev(tM, "pop"); ev(tS, "pop");
  }
  // 2 — hairspray, aluminum, 100+ boxes... and a sandwich
  { const t0 = S(2) - 0.1, tH = wt(2, "hairspray"), tA = wt(2, "aluminum"), tE = wt(2, "emptied"), tC = wt(2, "caught"), tSa = wt(2, "sandwich");
    shot(t0, (g, t, lt) => {
      const ph = t < tA - 0.1 ? 0 : t < tE - 0.1 ? 1 : t < tC - 0.2 ? 2 : 3;
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [14, 540, 1290, 1.12, 0]]);
      layer(g, cam, 0.7, ph === 3 ? (g) => { sky3(g, -500, -500, 2100, 1900, "#5a8a7a", "#9ac0a8", "#d9e6c8"); for (let i = 0; i < 7; i++) tree(g, -400 + i * 300, 1500, 600, "#3f7a3a", 6, i); g.fillStyle = "#5a7a3a"; g.fillRect(-500, 1500, 2100, 1000); } : vrB);
      layer(g, cam, 1, (g) => {
        if (ph === 0) { ell(g, 760, 900, 80, 50, "#3a3a44", 6); ell(g, 760, 900, 30, 30, "#c0262e", 0); guy(g, THIEF(0), { x: 340, y: 1840, h: 560, expr: "sly", armR: [2.3, -0.2], blink: blinkAt(t, 1), t }); rect(g, 470, 1080, 50, 110, "#e2b64b", 5, 10); for (let i = 0; i < 8; i++) { const q = (t * 2 + i / 8) % 1; g.save(); g.globalAlpha = (1 - q) * 0.7; ell(g, 530 + q * 230, 1100 - q * 200, 20 + q * 40, 16 + q * 30, "#f6f3ea", 0); g.restore(); } if (t > tH + 0.6) { g.save(); g.globalAlpha = 0.7; ell(g, 760, 900, 90, 60, "#f6f3ea", 0); g.restore(); } }
        if (ph === 1) { g.beginPath(); g.arc(760, 900, 70, Math.PI, 0); g.lineWidth = 40; g.strokeStyle = "#c0262e"; g.stroke(); rect(g, 640, 820, 240, 200, "#d9e2ec", 6, 6); line(g, [[660, 850], [720, 980]], 8, "rgba(255,255,255,0.8)"); guy(g, THIEF(1), { x: 360, y: 1840, h: 560, expr: "sly", armR: [2.0, -0.4], blink: blinkAt(t, 2), t }); }
        if (ph === 2) { for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const k = clamp((t - tE - (r * 6 + c) * 0.05) / 0.3); g.save(); g.translate(140 + c * 160, 760 + r * 150); rect(g, -70, -55, 140, 110, "#2a2a30", 4, 4); g.scale(1 - k * 0.8, 1); rect(g, -70, -55, 140, 110, "#8a8f96", 4, 4); g.restore(); if (k > 0.5) diamond(g, 140 + c * 160, 760 + r * 150, 22, t); } for (let i = 0; i < 2; i++) guy(g, THIEF(i), { x: i ? 900 : 180, y: 1840, h: 480, dir: i ? -1 : 1, expr: "laugh", armR: [2.6, 0], hold: { r: "bag" }, blink: 0, t }); }
        if (ph === 3) { g.save(); g.translate(560, 1680); smoothPath(g, [[-160, 0], [-150, -60], [150, -60], [160, 0], [100, 30], [-100, 30]]); fillInk(g, "#e2b06a", 6); rect(g, -150, -40, 300, 26, "#6f9a4a", 4, 6); rect(g, -150, -14, 300, 18, "#e98a96", 3, 4); g.fillStyle = "#5a7a3a"; g.beginPath(); g.arc(140, -20, 50, 0, TAU); g.fill(); g.restore(); for (let i = 0; i < 4; i++) sparkle(g, 560 + Math.cos(i * 1.6) * 220, 1600 + Math.sin(i) * 100, 30, (t * 0.8 + i / 4) % 1); guy(g, { tunic: "#1f2a44", trim: "#e7c15f", helmet: "peaked", hatCol: "#1f2a44", trousers: "#1f2a44" }, { x: 900, y: 1840, h: 540, dir: -1, expr: "sly", look: -0.8, blink: blinkAt(t, 5), t }); }
      });
      label(g, "HAIRSPRAY vs HEAT SENSORS", 540, 330, 56, t, tH, tA - 0.1);
      label(g, "ALUMINUM vs MAGNETS", 540, 330, 64, t, tA, tE - 0.1, { fill: "#cfe0ff" });
      stamp(g, "100+ BOXES EMPTIED", 540, 330, 86, t, tE, tC - 0.2);
      stamp(g, "CAUGHT BY A SANDWICH", 540, 330, 82, t, tSa - 0.1, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tH, "splash", 0.4); ev(tA, "clank", 0.6); ev(tE, "cash"); for (let k = 0; k < 6; k++) ev(tE + k * 0.2, "clank", 0.3); ev(tSa, "boing");
  }
}
