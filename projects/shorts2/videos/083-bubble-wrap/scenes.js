// 083 — How Bubble Wrap Was Accidentally Invented as Wallpaper
"use strict";
function buildShots() {
  const ENG = (i) => ({ ...C.suit(i), tunic: ["#3a4a6a", "#5a4a3a"][i % 2], hair: ["#3a2a1a", "#8a6a4a"][i % 2] });
  const bubbles = (g, x0, y0, w, h, r = 26, popped = 0) => { rect(g, x0, y0, w, h, "rgba(220,240,255,0.55)", 4, 8); for (let y = y0 + r; y < y0 + h - r / 2; y += r * 2.1) for (let x = x0 + r + ((y / (r * 2.1)) % 2) * r; x < x0 + w - r / 2; x += r * 2.1) { const p = rnd(x * 7 + y) < popped; g.save(); g.globalAlpha = p ? 0.25 : 0.9; ell(g, x, y, r, r, "#e9f6ff", 3); if (!p) ell(g, x - r * 0.35, y - r * 0.35, r * 0.25, r * 0.18, "#ffffff", 0); g.restore(); } };
  // 0 hook
  S2(0, { bg: "victorianRoom", draw: (g, t) => { bubbles(g, -100, 200, 1300, 1500, 34); guy(g, ENG(0), { x: 540, y: 1840, h: 600, expr: "proud", blink: blinkAt(t, 1), t }); },
    titles: [["bubble", "BUBBLE WRAP", "stamp", { size: 120 }], ["wallpaper", "WAS MEANT TO BE WALLPAPER", "label", { size: 60, fill: "#cfe9ff" }]] });
  ev(wt(0, "bubble"), "pop"); ev(wt(0, "wallpaper"), "boing");
  // 1 Fielding & Chavannes: two shower curtains sealed with air
  { const tE = wt(1, "Alfred"), tSh = wt(1, "shower"), tAi = wt(1, "air"), tD = wt(1, "designers");
    S2(1, { bg: "lab", draw: (g, t) => { for (let i = 0; i < 2; i++) guy(g, ENG(i), { x: 180 + i * 720, y: 1840, h: 600, dir: i ? -1 : 1, expr: "happy", armR: [1.6, -0.4], blink: blinkAt(t, i), t }); if (t > tSh - 0.2) { const k = clamp((t - tSh) / 1); rect(g, 300, 1000 + (1 - k) * -80, 480, 600, "rgba(220,240,255,0.5)", 4, 8); rect(g, 300, 1000 + (1 - k) * 80, 480, 600, "rgba(220,240,255,0.5)", 4, 8); } if (t > tAi - 0.1) bubbles(g, 300, 1000, 480, 600, 30); },
      titles: [[tE, "FIELDING & CHAVANNES", "label", { font: "Cinzel" }], [tSh, "TWO SHOWER CURTAINS", "label"], [tAi, "+ TRAPPED AIR", "stamp", { size: 110 }], [tD, "FOR INTERIOR DESIGNERS", "label", { fill: "#ffe08a" }]] });
    ev(tAi, "blowout", 0.5); }
  // 2 nobody wanted it → greenhouse insulation
  { const tN = wt(2, "nobody"), tG = wt(2, "greenhouse");
    S2(2, { bg: "farm", draw: (g, t) => { if (t < tG - 0.2) { bubbles(g, 140, 900, 800, 700, 30); for (let i = 0; i < 3; i++) guy(g, C.gent(i), { x: 220 + i * 320, y: 1840, h: 500, expr: "angry", armR: [0.6, 0.4], blink: blinkAt(t, i), t }); } else { poly(g, [[160, 1840], [160, 1200], [540, 900], [920, 1200], [920, 1840]], "rgba(220,240,255,0.35)", 7); bubbles(g, 180, 1220, 720, 600, 26); for (let i = 0; i < 4; i++) { line(g, [[260 + i * 180, 1840], [260 + i * 180, 1700]], 8, "#3a8a3a"); ell(g, 260 + i * 180, 1690, 30, 30, "#4aa040", 4); } } },
      titles: [[tN, "NOBODY WANTED IT", "stamp", { size: 110 }], [tG, "GREENHOUSE INSULATION?", "label", { fill: "#c8ffb0" }]] });
    ev(tN, "sadtrombone", 0.6); ev(tG, "boing"); }
  // 3 1960: shipping computers → icon
  { const tY = wt(3, "1960"), tC = wt(3, "computers"), tI = wt(3, "icon");
    S2(3, { bg: "control", draw: (g, t) => { rect(g, 260, 1100, 560, 700, "#c9a06a", 8, 8); line(g, [[260, 1100], [540, 1000], [820, 1100]], 7); bubbles(g, 290, 1130, 500, 640, 26); if (t > tC - 0.2) { rect(g, 360, 1260, 360, 360, "#d9dde6", 7, 10); for (let i = 0; i < 2; i++) ell(g, 460 + i * 160, 1340, 50, 50, "#3a3a44", 5); for (let i = 0; i < 6; i++) ell(g, 420 + i * 50, 1520, 10, 10, i % 2 ? "#c0392b" : "#2f8a3a", 0); } if (t > tI - 0.2) for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i) * 360, 1300 + Math.sin(i * 2) * 400, 34, (t * 0.7 + i / 6) % 1); },
      titles: [[tY, "1960", "stamp", { size: 160 }], [tC, "PROTECTING COMPUTERS IN TRANSIT", "label", { size: 56 }], [tI, "A PACKAGING ICON", "stamp", { size: 100 }]] });
    ev(tY, "boom", 0.4); ev(tI, "pop"); ev(tI + 0.2, "pop"); ev(tI + 0.35, "pop"); }
}
