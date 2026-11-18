// 060 — Why British Sailors Were Called "Limeys"
"use strict";
function buildShots() {
  const SAIL = (i) => ({ ...C.sailor, tunic: ["#f6f3ea", "#2f4f9f", "#f6f3ea"][i % 3], trim: "#2f4f9f" });
  const lime = (g, x, y, r) => { ell(g, x, y, r, r * 0.85, "#7ac03a", 5); ell(g, x - r * 0.3, y - r * 0.3, r * 0.2, r * 0.14, "#c8f08a", 0); };
  const lemon = (g, x, y, r) => { ell(g, x, y, r * 1.1, r * 0.8, "#f2d43a", 5); };
  // 0 hook
  S2(0, { bg: "deck", blur: true, draw: (g, t) => { lime(g, 540, 1300, 200); for (let i = 0; i < 5; i++) sparkle(g, 540 + Math.cos(i * 1.3) * 320, 1300 + Math.sin(i * 1.3) * 300, 30, (t * 0.7 + i / 5) % 1); },
    titles: [["citrus", "A CITRUS FRUIT...", "label"], ["secret", "THE NAVY'S SECRET WEAPON", "stamp", { size: 86 }]] });
  ev(wt(0, "secret"), "sting", 0.5);
  // 1 scurvy worse than cannonballs
  { const tS = wt(1, "scurvy"), tV = wt(1, "vitamin"), tK = wt(1, "killed");
    S2(1, { bg: "deck", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, SAIL(i), { x: 220 + i * 320, y: 1840, h: 540, expr: t > tS ? "sick" : "neutral", lean: t > tS ? -8 : 0, blink: blinkAt(t, i), t }); if (t > tV - 0.2) { rect(g, 360, 900, 360, 160, "#fff6e6", 7, 14); strokeText(g, "NO VITAMIN C", 540, 985, 44, { fill: "#c0392b", lw: 0, shadow: false }); } if (t > tK - 0.2) { cannonball(g, 860, 1140, 40); strokeText(g, "<", 760, 1160, 80, { fill: "#fff" }); } },
      titles: [[tS, "SCURVY", "stamp", { size: 140, fill: "#c8ffb0" }], [tK, "DEADLIER THAN CANNONBALLS", "label", { fill: "#ffd0c0" }]] }, night(0.15));
    ev(tS, "drone"); ev(tK, "cannon", 0.4); }
  // 2 1790s daily lemon/lime ration
  { const tY = wt(2, "1790s"), tL = wt(2, "lemon"), tLi = wt(2, "lime");
    S2(2, { bg: "deck", keys: [[0, 540, 1300, 1.0, 0], [10, 540, 1300, 1.08, 0]], draw: (g, t) => { guy(g, C.captain, { x: 260, y: 1840, h: 620, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); barrel(g, 560, 1840, 220, "#9a6a3a", "JUICE"); for (let i = 0; i < 3; i++) guy(g, SAIL(i), { x: 720 + i * 120, y: 1840, h: 460, dir: -1, expr: "happy", hold: { r: "cup" }, blink: blinkAt(t, i + 2), t }); if (t > tL - 0.1) lemon(g, 560, 1480, 60); if (t > tLi - 0.1) lime(g, 660, 1500, 50); },
      titles: [[tY, "THE 1790s", "stamp", { size: 120 }], ["mandatory", "MANDATORY DAILY RATIONS", "label"], [tL, "LEMON OR LIME JUICE", "label", { fill: "#e8ff9a" }]] });
    ev(tY, "boom", 0.4); ev(tL, "pour"); }
  // 3 scurvy vanishes → endurance → "Limeys"
  { const tV = wt(3, "vanished"), tE = wt(3, "endurance"), tL = wt(3, "Limeys");
    S2(3, { bg: "sea", draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2fa0c8", "#1f6f9a"); if (t < tL - 0.2) { sailShip(g, { x: 540, y: 1500, h: 480, t, hull: "#3a2a1a", sail: "#f6f3ea", flag: ["#c0392b"], seed: 1 }); } else { for (let i = 0; i < 3; i++) guy(g, SAIL(i), { x: 220 + i * 320, y: 1840, h: 560, expr: "laugh", armR: [2.8, 0], blink: blinkAt(t, i), t }); for (let i = 0; i < 4; i++) lime(g, 160 + i * 250, 1100 + Math.sin(t * 3 + i) * 30, 50); } },
      titles: [[tV, "SCURVY VANISHED", "stamp", { size: 110, fill: "#c8ffb0" }], [tE, "HUGE ENDURANCE AT SEA", "label"], [tL, "“LIMEYS”", "stamp", { size: 150, fill: "#c8ff8a" }]] });
    ev(tV, "ding"); ev(tL, "cheer", 0.6); }
}
