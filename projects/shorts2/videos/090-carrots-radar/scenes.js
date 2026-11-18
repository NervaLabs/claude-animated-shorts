// 090 — Why Carrots Were Rumored to Improve Night Vision
"use strict";
function buildShots() {
  const PIL = (i) => ({ ...C.gi, tunic: "#4a5a7a", helmet: "cap", hatCol: "#4a5a7a", hair: "#5a3a24" });
  const carrot = (g, x, y, s, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); poly(g, [[-26 * s, -90 * s], [26 * s, -90 * s], [0, 110 * s]], "#f28a2a", 5); for (let i = 0; i < 3; i++) line(g, [[-14 * s, -50 * s + i * 40 * s], [8 * s, -46 * s + i * 40 * s]], 3, "#c06a1a"); for (let k = -1; k <= 1; k++) poly(g, [[k * 10 * s, -90 * s], [k * 30 * s, -160 * s], [k * 10 * s + 10 * s, -90 * s]], "#3a8a3a", 3); g.restore(); };
  const radar = (g, x, y, r, t) => { ell(g, x, y, r, r, "#0a2a1a", 6); for (let i = 1; i <= 3; i++) { g.beginPath(); g.arc(x, y, r * i / 3.2, 0, TAU); g.strokeStyle = "rgba(80,220,140,0.4)"; g.lineWidth = 3; g.stroke(); } const a = t * 2; line(g, [[x, y], [x + Math.cos(a) * r, y + Math.sin(a) * r]], 5, "#5aff9a"); for (let i = 0; i < 3; i++) ell(g, x + Math.cos(i * 2) * r * 0.5, y + Math.sin(i * 2) * r * 0.4, 9, 9, "#5aff9a", 0); };
  // 0 hook
  S2(0, { bg: "farm", blur: true, draw: (g, t) => { carrot(g, 540, 1400, 3.0, 0.2); if (t > wt(0, "cover") - 0.2) { g.save(); g.translate(540, 1150); g.rotate(-0.15); rect(g, -280, -70, 560, 140, "rgba(255,246,230,0.95)", 8, 12); strokeText(g, "COVER STORY", 0, 10, 70, { fill: "#c0392b", lw: 0, shadow: false }); g.restore(); } },
    titles: [["carrots", "CARROTS = NIGHT VISION?", "stamp", { size: 92 }], ["cover", "A WWII COVER STORY", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "cover"), "sting", 0.5);
  // 1 the Blitz 1940: RAF hits bombers in pitch dark
  { const tB = wt(1, "Blitz"), tR = wt(1, "Royal"), tD = wt(1, "darkness");
    S2(1, { bg: "seaNight", draw: (g, t) => { g.fillStyle = "#0a0a1a"; g.fillRect(-500, -500, 2200, 3000); for (let i = 0; i < 40; i++) ell(g, rnd(i) * 1080, rnd(i * 3) * 1400, 3, 3, "#fff6d0", 0); for (let i = 0; i < 3; i++) plane(g, { x: 1200 - ((t * 120 + i * 300) % 1600), y: 700 + i * 160, h: 180, dir: -1, col: "#3a3a44", t }); if (t > tR - 0.2) plane(g, { x: lerp(-200, 700, clamp((t - tR) / 3)), y: 1200, h: 220, col: "#6a7a5a", t }); if (t > tD - 0.2) { smokePuff(g, 500, 860, 80, clamp((t - tD) / 1.5)); } },
      titles: [[tB, "THE BLITZ, 1940", "stamp", { size: 110 }], [tR, "RAF PILOTS", "label"], [tD, "HITTING BOMBERS IN PITCH DARK", "label", { size: 56, fill: "#ffe08a" }]] });
    ev(tB, "drone"); ev(tD, "boom", 0.5); }
  // 2 secret radar → carrot propaganda
  { const tH = wt(2, "hide"), tR = wt(2, "radar"), tM = wt(2, "Ministry"), tC = wt(2, "carrots");
    S2(2, { bg: "camp", keys: [[0, 540, 1300, 1.0, 0], [18, 540, 1300, 1.05, 0]], draw: (g, t) => { if (t < tM - 0.2) { radar(g, 540, 1300, 320, t); if (t > tH - 0.2) { g.save(); g.translate(540, 1750); g.rotate(-0.08); rect(g, -240, -60, 480, 120, "#c0392b", 6, 10); strokeText(g, "TOP SECRET", 0, 6, 60, { fill: "#fff", lw: 0, shadow: false }); g.restore(); } } else { rect(g, 200, 820, 680, 900, "#f6ead0", 8, 10); strokeText(g, "EAT CARROTS!", 540, 940, 70, { fill: "#c0392b", lw: 0, shadow: false, font: "Cinzel" }); carrot(g, 540, 1300, 2.2, 0.1); guy(g, PIL(0), { x: 540, y: 1700, h: 300, expr: "proud", t, shadow: false }); if (t > tC - 0.2) for (let i = 0; i < 4; i++) carrot(g, 120 + i * 280, 1900 - ((t * 0.6 + i / 4) % 1) * 1800, 0.6, t + i); } },
      titles: [[tH, "TO HIDE A SECRET...", "label"], [tR, "AIRBORNE RADAR", "stamp", { size: 110, fill: "#c8ffd0" }], [tM, "BRITISH PROPAGANDA", "label"], [tC, "“OUR ACES EAT CARROTS!”", "stamp", { size: 86 }]] });
    ev(tR, "ding"); ev(tC, "boing"); }
}
