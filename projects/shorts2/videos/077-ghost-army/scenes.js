// 077 — The WWII Ghost Army That Fooled Hitler With Inflatable Tanks
"use strict";
function buildShots() {
  const GI = (i) => ({ ...C.gi, tunic: "#5a6a3a" });
  const ART = (i) => ({ ...C.artist, tunic: ["#7a3a2a", "#2f4f9f", "#5a3a5a"][i % 3] });
  const tank = (g, x, y, s, t, inflate = 1, wob = 0) => { g.save(); g.translate(x, y); g.scale(s, s * inflate); const w = Math.sin(t * 3) * wob; g.rotate(w * 0.03); rect(g, -260, -90, 520, 90, "#5a6a3a", 7, 40); rect(g, -180, -170, 300, 90, "#6a7a4a", 7, 30); line(g, [[100, -130], [330, -140]], 22, "#5a6a3a"); for (let i = 0; i < 6; i++) ell(g, -220 + i * 88, -20, 30, 30, "#3a4a2a", 5); g.restore(); };
  const speaker = (g, x, y, t) => { rect(g, x - 70, y - 160, 140, 160, "#3a3a44", 6, 10); ell(g, x, y - 80, 50, 50, "#6a6a72", 5); for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; g.beginPath(); g.arc(x + 60, y - 80, 40 + q * 220, -0.7, 0.7); g.lineWidth = 8; g.strokeStyle = "#ffe08a"; g.stroke(); g.restore(); } };
  // 0 hook: artists, sound engineers, designers → fake army
  { const tA = wt(0, "artists"), tF = wt(0, "fake");
    S2(0, { bg: "camp", blur: true, draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, ART(i), { x: 220 + i * 320, y: 1840, h: 560, expr: "sly", hold: i === 0 ? { r: "scroll" } : undefined, blink: blinkAt(t, i), t }); if (t > tF - 0.2) tank(g, 540, 1300, 0.9, t, 1, 1); },
      titles: [[tA, "ARTISTS & SOUND ENGINEERS", "label", { size: 60 }], ["fashion", "+ FASHION DESIGNERS", "label"], [tF, "BUILT A FAKE ARMY", "stamp", { size: 100 }]] });
    ev(tF, "sting", 0.5); }
  // 1 Ghost Army: inflatable tanks, fake radio, speakers → saved lives
  { const tN = wt(1, "23rd"), tG = wt(1, "Ghost"), tM = wt(1, "1,100-man"), tI = wt(1, "inflatable"), tR = wt(1, "radio"), tSp = wt(1, "speakers"), tT = wt(1, "trick"), tSa = wt(1, "saving");
    S2(1, { bg: "camp", keys: [[0, 540, 1300, 1.0, 0], [26, 540, 1300, 1.06, 0]], draw: (g, t) => {
      if (t < tI - 0.2) { for (let i = 0; i < 6; i++) guy(g, GI(i), { x: 120 + (i % 3) * 400 + Math.floor(i / 3) * 200, y: 1840 - Math.floor(i / 3) * 140, h: 520 - Math.floor(i / 3) * 80, expr: "proud", blink: blinkAt(t, i), t }); }
      else if (t < tR - 0.2) { const k = clamp((t - tI) / 1.2); tank(g, 540, 1700, 1.3, t, 0.2 + k * 0.8, 1); guy(g, GI(0), { x: 140, y: 1840, h: 520, expr: "laugh", armR: [2.6, 0.2], blink: 0, t }); }
      else if (t < tT - 0.2) { rect(g, 240, 1300, 300, 240, "#5a6a3a", 7, 12); for (let k = 0; k < 3; k++) ell(g, 300 + k * 80, 1360, 22, 22, "#e2b64b", 4); line(g, [[500, 1300], [520, 1060]], 6); if (t > tSp - 0.2) speaker(g, 800, 1700, t); guy(g, GI(1), { x: 380, y: 1840, h: 460, expr: "sly", blink: 0, t }); }
      else { g.fillStyle = "#3a4a3a"; g.fillRect(-500, -500, 2200, 3000); for (let i = 0; i < 9; i++) tank(g, 160 + (i % 3) * 380, 1100 + Math.floor(i / 3) * 300, 0.5, t + i, 1, 0.5); if (t > tSa - 0.2) for (let i = 0; i < 5; i++) sparkle(g, 200 + i * 170, 900, 30, (t * 0.7 + i / 5) % 1); }
    }, titles: [[tN, "23RD HQ SPECIAL TROOPS", "label"], [tG, "THE “GHOST ARMY”", "stamp", { size: 110 }], [tM, "1,100 MEN", "label"], [tI, "INFLATABLE TANKS", "stamp", { size: 100 }], [tR, "FAKE RADIO CHATTER", "label"], [tSp, "RECORDED TANK NOISES", "label", { fill: "#ffe08a" }], [tT, "GERMAN INTEL: FOOLED", "stamp", { size: 92 }], [tSa, "THOUSANDS OF LIVES SAVED", "label", { fill: "#c8ffb0" }]] });
    ev(tI, "blowout"); ev(tR, "drone", 0.4); ev(tSp, "rumble"); ev(tT, "laugh", 0.5); ev(tSa, "choir", 0.4); }
}
