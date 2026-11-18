// 053 — Why Ketchup Was Sold as Medicine in the 1830s
"use strict";
function buildShots() {
  const DOC = { ...C.gent(1), tunic: "#2a2a3a", trim: "#f6f3ea", helmet: "tophat", hatCol: "#1c1422", beard: "#5a3a24" };
  const bottle = (g, x, y, s, label = "TOMATO", col = "#c0392b") => { rect(g, x - 50 * s, y - 160 * s, 100 * s, 160 * s, col, 6, 14 * s); rect(g, x - 20 * s, y - 220 * s, 40 * s, 64 * s, col, 5, 6 * s); rect(g, x - 24 * s, y - 236 * s, 48 * s, 20 * s, "#6b4024", 4, 4); rect(g, x - 44 * s, y - 120 * s, 88 * s, 60 * s, "#fff6e6", 4, 4); strokeText(g, label, x, y - 88 * s, 16 * s, { fill: "#1c1422", lw: 0, shadow: false }); };
  const pill = (g, x, y, s, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); rect(g, -30 * s, -14 * s, 60 * s, 28 * s, "#c0392b", 4, 14 * s); rect(g, 0, -14 * s, 30 * s, 28 * s, "#f6f3ea", 4, 14 * s); g.restore(); };
  const tom = (g, x, y, r) => { ell(g, x, y, r, r * 0.85, "#d93a2a", 5); poly(g, [[x - r * 0.3, y - r * 0.8], [x, y - r * 1.1], [x + r * 0.3, y - r * 0.8], [x, y - r * 0.7]], "#3a8a3a", 3); };
  // 0 hook: ketchup in pharmacies
  S2(0, { bg: "victorianRoom", blur: true, draw: (g, t) => { for (let i = 0; i < 3; i++) rect(g, 100, 1100 + i * 240, 880, 30, "#6b4024", 5); for (let i = 0; i < 5; i++) bottle(g, 180 + i * 180, 1320, 0.9, "CURE", ["#2f4f9f", "#3a6a3a", "#c0392b", "#7a5a2a", "#5a3a5a"][i]); bottle(g, 540, 1800, 1.8, "KETCHUP"); },
    titles: [["ketchup", "KETCHUP", "stamp", { size: 140 }], ["pharmacies", "SOLD IN PHARMACIES", "label"], ["cure", "AS A CURE?!", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "ketchup"), "pop"); ev(wt(0, "cure"), "boing");
  // 1 1834: Dr. John Cook Bennett
  { const tY = wt(1, "1834"), tJ = wt(1, "John"), tE = wt(1, "everything");
    S2(1, { bg: "americanTown", draw: (g, t) => { guy(g, DOC, { x: 320, y: 1840, h: 640, expr: "talk", mouthOpen: talk(t), armR: [2.4, -0.4], blink: blinkAt(t, 1), t }); tom(g, 760, 1300, 160); if (t > tE - 0.2) for (let i = 0; i < 3; i++) { const k = clamp((t - tE - i * 0.25) / 0.2); g.save(); g.globalAlpha = k; rect(g, 640, 1540 + i * 90, 320, 70, "#fff6e6", 5, 10); strokeText(g, ["JAUNDICE ✓", "STOMACHACHE ✓", "INDIGESTION ✓"][i], 800, 1578 + i * 90, 30, { fill: "#2f8a3a", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tY, "1834, OHIO", "stamp", { size: 120 }], [tJ, "DR. JOHN COOK BENNETT", "label", { size: 60 }], [tE, "“TOMATOES CURE EVERYTHING!”", "label", { size: 56, fill: "#ffd0c0" }]] });
    ev(tY, "boom", 0.5); ev(tE, "ding"); }
  // 2 tomato pills sold nationwide
  { const tP = wt(2, "pills"), tA = wt(2, "America");
    S2(2, { bg: "americanTown", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1300, 1.1, 0]], draw: (g, t) => { tom(g, 300, 1400, 140); if (t > tP - 0.2) for (let i = 0; i < 9; i++) { const q = clamp((t - tP - i * 0.08) / 0.4); pill(g, lerp(300, 560 + (i % 3) * 150, q), lerp(1400, 1250 + Math.floor(i / 3) * 110, q), 1.6, i); } if (t > tA - 0.2) { rect(g, 520, 1580, 460, 200, "#fff6e6", 7, 14); strokeText(g, "SOLD COAST", 750, 1655, 46, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "TO COAST", 750, 1720, 46, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tP, "TOMATO PILLS", "stamp", { size: 120 }], [tA, "SOLD ACROSS AMERICA", "label"]] });
    ev(tP, "pop"); ev(tA, "cash"); }
  // 3 copycats → scam → Heinz condiment
  { const i3 = si("Copycat"), tCo = wt(i3, "Copycat"), i4 = si("craze", i3), tCr = wt(i4, "craze"), tSc = wt(i4, "scam"), tH = wt(i4, "Heinz");
    S2(i3, { bg: "americanTown", draw: (g, t) => { if (t < tSc - 0.2) { for (let i = 0; i < 4; i++) { guy(g, C.gent(i), { x: 160 + i * 250, y: 1840, h: 500, expr: "sly", armR: [2.4, -0.3], blink: blinkAt(t, i), t }); bottle(g, 230 + i * 250, 1420, 0.8, "EXTRACT", ["#c0392b", "#7a1a2a"][i % 2]); } } else if (t < tH - 0.2) { rect(g, 240, 1000, 600, 340, "#fff6e6", 8, 14); strokeText(g, "SCAM!", 540, 1200, 120, { fill: "#c0392b", lw: 0, shadow: false }); } else { bottle(g, 540, 1800, 2.6, "KETCHUP"); for (let i = 0; i < 5; i++) sparkle(g, 540 + Math.cos(i * 1.3) * 300, 1300 + Math.sin(i) * 200, 30, (t * 0.7 + i / 5) % 1); } },
      titles: [[tCo, "COPYCAT “TOMATO EXTRACTS”", "label", { size: 60 }], [tCr, "A PATENT-MEDICINE CRAZE", "label"], [tSc, "EXPOSED AS A SCAM", "stamp", { size: 100 }], [tH, "THEN HEINZ: A CONDIMENT", "label", { fill: "#ffe08a" }]] });
    ev(tCo, "cash"); ev(tSc, "sadtrombone", 0.6); ev(tH, "ding"); }
}
