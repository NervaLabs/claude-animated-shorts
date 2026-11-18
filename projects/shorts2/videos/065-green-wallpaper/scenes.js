// 065 — Why Victorian Wallpaper Was Literally Deadly
"use strict";
function buildShots() {
  const wall = (g, col = "#2fa05a", mold = 0, t = 0) => { rect(g, -400, -300, 1900, 2000, col, 0); for (let r = 0; r < 12; r++) for (let c = 0; c < 9; c++) { const x = -260 + c * 200 + (r % 2) * 100, y = -100 + r * 170; ell(g, x, y, 34, 34, "#7ad08a", 0); ell(g, x, y, 14, 14, "#1f6f3a", 0); } if (mold) for (let i = 0; i < 14; i++) { g.save(); g.globalAlpha = mold * 0.75; ell(g, rnd(i) * 1080, 600 + rnd(i * 3) * 1000, 40 + rnd(i * 5) * 80, 30 + rnd(i * 7) * 60, "#4a4a2a", 0); g.restore(); } rect(g, -400, 1700, 1900, 600, "#5a3a24", 6); };
  const gas = (g, t, k) => { for (let i = 0; i < 8; i++) { const q = (t * 0.25 + i / 8) % 1; g.save(); g.globalAlpha = 0.35 * k * (1 - Math.abs(q - 0.5) * 2); ell(g, 100 + i * 130 + Math.sin(t + i) * 40, 1600 - q * 900, 120, 80, "#b0e070", 0); g.restore(); } };
  // 0 hook
  S2(0, { bg: "victorianRoom", draw: (g, t) => { wall(g); guy(g, C.lady(1), { x: 360, y: 1840, h: 600, expr: "happy", blink: blinkAt(t, 1), t }); guy(g, C.gent(1), { x: 720, y: 1840, h: 640, dir: -1, expr: "happy", blink: blinkAt(t, 2), t }); },
    titles: [["green", "GREEN WALLPAPER", "stamp", { size: 110, fill: "#c8ffb0" }], ["poisoning", "...WAS POISONING THEM", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "poisoning"), "sting", 0.6);
  // 1 1775 Scheele's Green = copper arsenite
  { const tY = wt(1, "1775"), tS = wt(1, "Scheele's"), tC = wt(1, "arsenite");
    S2(1, { bg: "lab", draw: (g, t) => { guy(g, C.scientist("#8a8a8a"), { x: 320, y: 1840, h: 620, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); rect(g, 640, 1440, 160, 240, "#cfe9ff", 6, 20); rect(g, 650, 1540, 140, 130, "#2fd06a", 0, 14); if (t > tC - 0.2) { rect(g, 620, 1100, 300, 160, "#fff6e6", 7, 14); strokeText(g, "Cu + As", 770, 1170, 50, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "ARSENIC!", 770, 1230, 34, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tY, "1775", "stamp", { size: 160 }], [tS, "“SCHEELE'S GREEN”", "label", { fill: "#c8ffb0" }], [tC, "MADE WITH ARSENIC", "stamp", { size: 100 }]] });
    ev(tY, "boom", 0.4); ev(tC, "drone"); }
  // 2 Victorians loved it
  { const tL = wt(2, "loved");
    S2(2, { bg: "victorianRoom", draw: (g, t) => { wall(g); rect(g, 300, 1500, 480, 60, "#8a3a2a", 6, 10); for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 220 + i * 320, y: 1840, h: 560, expr: "laugh", blink: blinkAt(t, i), t }); for (let i = 0; i < 4; i++) sparkle(g, 200 + i * 230, 900 + (i % 2) * 120, 30, (t * 0.7 + i / 4) % 1); },
      titles: [[tL, "VICTORIANS LOVED IT", "stamp", { size: 100 }], ["bedrooms", "BEDROOMS & PARLORS", "label"]] });
    ev(tL, "ding"); }
  // 3 damp + mold → arsine gas → illness
  { const tD = wt(3, "damp"), tM = wt(3, "mold"), tG = wt(3, "arsine"), tI = wt(3, "illnesses");
    S2(3, { bg: "victorianRoom", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.08, 0]], draw: (g, t) => { wall(g, "#2a8a4a", clamp((t - tM) / 2), t); if (t > tG - 0.2) gas(g, t, clamp((t - tG) / 1.2)); guy(g, C.lady(1), { x: 540, y: 1840, h: 620, expr: t > tI ? "sick" : "neutral", blink: blinkAt(t, 1), t }); if (t > tD - 0.1 && t < tM) for (let i = 0; i < 6; i++) { const q = (t + i / 6) % 1; ell(g, 160 + i * 160, 700 + q * 900, 8, 14, "#9ad0f0", 2); } },
      titles: [[tD, "DAMP WALLS", "label", { fill: "#cfe9ff" }], [tM, "+ MOLD", "label"], [tG, "TOXIC ARSINE GAS", "stamp", { size: 100, fill: "#c8ffb0" }], [tI, "MYSTERIOUS ILLNESSES", "label", { fill: "#ffd0c0" }]] }, night(0.15));
    ev(tM, "drone"); ev(tG, "blowout", 0.4); ev(tI, "heartbeat", 0.6); }
}
