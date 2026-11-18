// 046 — Why Samurai Shaved the Front of Their Heads
"use strict";
function buildShots() {
  const SAM = C.samurai(0);
  const SAMh = { ...C.samurai(0), helmet: null, hair: "#1a1012" };
  const kabuto = (g, x, y, s) => { g.save(); g.translate(x, y); g.beginPath(); g.ellipse(0, 0, 120 * s, 100 * s, 0, Math.PI, 0); g.closePath(); g.fillStyle = "#2a2a32"; g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke(); rect(g, -150 * s, -6 * s, 300 * s, 30 * s, "#3a3a44", 6, 10); poly(g, [[-20 * s, -90 * s], [-90 * s, -200 * s], [-50 * s, -100 * s]], "#e2b64b", 5); poly(g, [[20 * s, -90 * s], [90 * s, -200 * s], [50 * s, -100 * s]], "#e2b64b", 5); g.restore(); };
  const headCU = (g, t, shaved, knot, sweat = 0) => { g.save(); g.translate(540, 1250); ell(g, 0, 0, 230, 250, "#f2d3a8", 9); if (!shaved) { g.beginPath(); g.ellipse(0, -40, 240, 230, 0, Math.PI, 0); g.fillStyle = "#1a1012"; g.fill(); g.stroke(); } else { g.beginPath(); g.ellipse(0, -40, 240, 230, 0, Math.PI, Math.PI * 1.2); g.lineTo(-180, -40); g.fillStyle = "#1a1012"; g.fill(); g.beginPath(); g.ellipse(0, -40, 240, 230, 0, Math.PI * 1.8, 0); g.lineTo(180, -40); g.fill(); ell(g, 0, -160, 140, 80, "#e9c8a0", 0); } if (knot) { rect(g, -30, -330, 60, 90, "#1a1012", 6, 14); ell(g, 0, -340, 40, 26, "#1a1012", 6); } ell(g, -80, 30, 14, 20, INK, 0); ell(g, 80, 30, 14, 20, INK, 0); line(g, [[-40, 130], [40, 130]], 8); if (sweat) for (let i = 0; i < 3; i++) { const q = (t + i / 3) % 1; ell(g, -200 + i * 200, -60 + q * 200, 14, 22, "#9ad0f0", 4); } g.restore(); };
  // 0 hook
  S2(0, { bg: "japanVillage", blur: true, draw: (g, t) => { headCU(g, t, true, true); },
    titles: [["hairstyle", "THE SAMURAI HAIRSTYLE", "label"], ["fashion", "NOT FOR FASHION", "stamp", { size: 110 }], ["battle", "...FOR BATTLE COMFORT", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "fashion"), "sting", 0.5);
  // 1 shave front, topknot = chonmage
  { const tSh = wt(1, "shaved"), tT = wt(1, "topknot"), tC = wt(1, "chonmage");
    S2(1, { bg: "japanVillage", blur: true, draw: (g, t) => { headCU(g, t, t > tSh + 0.6, t > tT - 0.1); if (t > tSh - 0.1 && t < tSh + 0.8) { g.save(); g.translate(540 + Math.sin(t * 14) * 80, 1040); g.rotate(0.3); rect(g, 0, -10, 160, 20, "#d9dde6", 5, 4); rect(g, -80, -10, 80, 20, "#6b4024", 4, 6); g.restore(); } },
      titles: [[tSh, "SHAVE THE FRONT", "label"], [tT, "TIE A TOPKNOT", "label"], [tC, "THE CHONMAGE", "stamp", { size: 120 }]] });
    ev(tSh, "whip"); ev(tC, "ding"); }
  // 2 heavy helmet in humid summer = heat
  { const tH = wt(2, "helmet"), tHu = wt(2, "humid"), tHe = wt(2, "heat");
    S2(2, { bg: "japanVillage", draw: (g, t) => { guy(g, SAMh, { x: 540, y: 1840, h: 700, expr: t > tHe ? "sick" : "determined", blink: blinkAt(t, 1), t }); if (t > tH - 0.2) kabuto(g, 540, 1160, 1.25); if (t > tHu - 0.1) { sunStar(g, 880, 700, 120, "#ffcf4a"); } if (t > tHe - 0.1) for (let i = 0; i < 6; i++) { const q = (t * 0.8 + i / 6) % 1; g.save(); g.globalAlpha = 1 - q; line(g, [[420 + i * 50, 1050 - q * 200], [430 + i * 50, 1000 - q * 200]], 6, "#ff8a5a"); g.restore(); } },
      titles: [[tH, "A HEAVY IRON HELMET", "label"], [tHu, "HUMID SUMMERS", "label", { fill: "#ffe08a" }], [tHe, "TRAPPED HEAT", "stamp", { size: 120, fill: "#ffb08a" }]] }, warm(0.2));
    ev(tH, "clank"); ev(tHe, "drone"); }
  // 3 shaving = cooler + no hair in eyes
  { const tO = wt(3, "overheating"), tE = wt(3, "eyes");
    S2(3, { bg: "japanVillage", draw: (g, t) => { guy(g, SAM, { x: 380, y: 1840, h: 680, expr: "determined", hold: { r: "sword" }, swordAng: -1.8 + Math.sin(t * 5) * 0.6, armR: [2.2 + Math.sin(t * 5) * 0.4, -0.3], blink: blinkAt(t, 1), t }); guy(g, { ...SAM, tunic: "#5a2a2a" }, { x: 760, y: 1840, h: 660, dir: -1, expr: "angry", hold: { r: "sword" }, swordAng: -1.6 + Math.cos(t * 5) * 0.6, armR: [2.0 + Math.cos(t * 5) * 0.4, -0.3], blink: 0, t }); if (t > tO - 0.1) for (let i = 0; i < 3; i++) { const q = (t * 0.6 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, 380 + (i - 1) * 60, 1000 - q * 160, 16, 16, "#cfe9ff", 3); g.restore(); } },
      titles: [[tO, "NO OVERHEATING", "stamp", { size: 110, fill: "#cfe9ff" }], [tE, "NO HAIR IN THE EYES", "label", { fill: "#ffe08a" }]] });
    ev(tO, "whoosh"); ev(tE, "clank"); }
}
