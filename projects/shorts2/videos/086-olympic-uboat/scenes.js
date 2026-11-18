// 086 — How the Titanic's Sister Ship Sank a U-Boat
"use strict";
function buildShots() {
  const liner = (g, x, y, s, t, dazzle = false, dir = 1) => { g.save(); g.translate(x, y); g.scale(dir * s, s); g.beginPath(); g.moveTo(-500, -60); g.lineTo(520, -60); g.lineTo(460, 60); g.lineTo(-460, 60); g.closePath(); g.fillStyle = dazzle ? "#5a6a7a" : "#1c1422"; g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke(); if (dazzle) for (let i = 0; i < 6; i++) poly(g, [[-460 + i * 160, -60], [-400 + i * 160, 60], [-340 + i * 160, -60]], i % 2 ? "#d9dde6" : "#2a3a5a", 0); rect(g, -420, -140, 840, 80, "#f6f3ea", 6, 4); for (let i = 0; i < 12; i++) ell(g, -380 + i * 68, -100, 9, 9, "#3a3a44", 0); for (let i = 0; i < 4; i++) { rect(g, -260 + i * 150, -280, 70, 150, "#e2a03a", 6, 4); rect(g, -260 + i * 150, -280, 70, 30, "#1c1422", 0, 4); } g.restore(); };
  const uboat = (g, x, y, s, k = 0) => { g.save(); g.translate(x, y); g.rotate(k * 0.5); ell(g, 0, 0, 260 * s, 46 * s, "#4a4a52", 6); rect(g, -40 * s, -90 * s, 90 * s, 60 * s, "#4a4a52", 6, 10); line(g, [[0, -90 * s], [0, -140 * s]], 6); g.restore(); };
  // 0 hook: sister ship rams a sub
  S2(0, { bg: "sea", blur: true, draw: (g, t) => { sea(g, 1350, t, -900, 2000, "#2f6f94", "#1f4f74"); liner(g, 540, 1340, 0.9, t, true); uboat(g, 860, 1470, 0.8); },
    titles: [["sister", "TITANIC'S SISTER SHIP", "label"], ["rammed", "RAMMED A U-BOAT", "stamp", { size: 110 }]] });
  ev(wt(0, "rammed"), "crash");
  // 1 RMS Olympic survived 1912 (elsewhere at sea)
  { const tO = wt(1, "Olympic"), tY = wt(1, "1912");
    S2(1, { bg: "sea", draw: (g, t) => { sea(g, 1350, t, -900, 2000, "#2f8aa8", "#1f5f7a"); liner(g, lerp(300, 700, clamp((t - S(1)) / 6)), 1330, 0.9, t); },
      titles: [["alongside", "BUILT ALONGSIDE TITANIC", "label"], [tO, "RMS OLYMPIC", "stamp", { size: 120 }], [tY, "ELSEWHERE AT SEA IN 1912", "label", { fill: "#cfe9ff" }]] });
    ev(tO, "horns"); }
  // 2 troopship spots a U-boat in 1918 → full speed over it
  { const tT = wt(2, "troopship"), tU = wt(2, "U-boat"), tY = wt(2, "1918"), tF = wt(2, "full"), tSl = wt(2, "slicing");
    S2(2, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.05, 0]], draw: (g, t) => { sea(g, 1350, t, -900, 2000, "#2f6f94", "#1f4f74"); const go = clamp((t - tF) / 2.2); if (t > tU - 0.2) uboat(g, 760, 1500 - Math.min(1, (t - tU) / 1) * 20 + go * 60, 0.9, clamp((t - tSl) / 1)); liner(g, lerp(160, 820, go), 1340, 0.85, t, true); if (t > tSl - 0.1 && t < tSl + 0.6) shout(g, 760, 1150, "CRUNCH!", 60, 1, "#c0392b"); },
      titles: [[tT, "CONVERTED TO A TROOPSHIP", "label"], [tU, "A U-BOAT SURFACED AHEAD", "label", { fill: "#ffd0c0" }], [tY, "1918", "stamp", { size: 140 }], [tF, "FULL SPEED AHEAD", "stamp", { size: 110 }], [tSl, "STRAIGHT OVER THE SUB", "label", { fill: "#ffe08a" }]] });
    ev(tU, "sting", 0.5); ev(tF, "horns"); ev(tSl, "crash"); }
}
