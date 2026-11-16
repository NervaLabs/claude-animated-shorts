// 22 — King Xerxes Whipping the Ocean (480 BC)
"use strict";
window.MOOD = "epic";
const XER = { tunic: "#4b2a7a", trim: "#e8c14d", helmet: "tiara", beard: "#1f1a24", cape: "#d9a441", robe: true };
const PSOL = { tunic: "#5b3a8c", trim: "#e2b64b", helmet: "persian", trousers: "#d9a441", beard: "#2a1a14" };
const strait = (storm) => (g) => {
  sky3(g, -900, -900, 2900, 2100, storm ? "#1f2440" : "#5a8ad0", storm ? "#3a3f5a" : "#b3d2ee", storm ? "#5a5f72" : "#efe6d0");
  smoothHills(g, -900, 500, 1100, 140, storm ? "#3a4a3a" : "#8aa05a", 2, 5);
  smoothHills(g, 600, 2000, 1100, 160, storm ? "#3a4a3a" : "#9aa86a", 5, 5);
  paintGrain(g, -900, -900, 2900, 3400, 0.06);
};
function bridge(g, t, broken = 0) {
  for (let i = 0; i < 9; i++) { const x = -200 + i * 170, k = broken, dx = k * Math.sin(i * 2.3) * 300, dy = k * Math.cos(i * 1.7) * 120, rot = k * Math.sin(i) * 0.8; g.save(); g.translate(x + dx, 1250 + dy + Math.sin(t * 2 + i) * 6); g.rotate(rot); rowboat(g, { h: 110, t: t + i }); g.restore(); }
  if (broken < 0.1) { line(g, [[-300, 1210], [1400, 1210]], 26, "#b9864a"); for (let i = 0; i < 40; i++) line(g, [[-300 + i * 44, 1198], [-300 + i * 44, 1222]], 3, "rgba(60,30,10,0.5)"); }
  else for (let i = 0; i < 8; i++) { g.save(); g.translate(-200 + i * 200 + broken * Math.cos(i) * 300, 1100 - broken * 300 * Math.sin(i * 1.3) + broken * broken * 200); g.rotate(broken * (i - 4)); rect(g, -80, -12, 160, 24, "#b9864a", 4); g.restore(); }
}
function buildShots() {
  const calm = cached("hel", -900, -900, 2900, 3400, strait(false), 1.0);
  const stormy = cached("helS", -900, -900, 2900, 3400, strait(true), 1.0);
  // 0 — hook: whip the sea
  { const tM = wt(0, "mad"), tW = wt(0, "whip");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [4, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, calm);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94"); ground(g, 1600, "#c9b07a", -900, 2000);
        guy(g, XER, { x: 260, y: 1850, h: 600, expr: "angry", armR: [2.0, -0.2], blink: blinkAt(t, 1), t });
        for (let i = 0; i < 3; i++) { const x = 600 + i * 170, ph = (t * 2.4 + i * 0.3) % 1; guy(g, PSOL, { x, y: 1760, h: 380, expr: "shout", armR: [lerp(2.8, 0.8, ph), -0.3], blink: 0, t }); line(g, [[x + 40, 1500], [x + 140 + ph * 80, 1500 - (1 - ph) * 160], [x + 180 + ph * 120, 1600 - (1 - ph) * 60]], 6, "#5a3b2a"); }
      });
      stamp(g, "HE WHIPPED THE SEA", 540, 330, 92, t, tW - 0.1, E(0) + 0.3);
      label(g, "XERXES WAS MAD", 540, 330, 80, t, tM - 0.3, tW - 0.1);
    });
    for (let k = 0; k < 6; k++) ev(0.3 + k * 0.42, "whip", 0.7);
  }
  // 1 — 480 BC: the pontoon bridge
  { const t0 = S(1) - 0.1, t48 = wt(1, "480"), tP = wt(1, "pontoon"), tH = wt(1, "Hellespont"), tG = wt(1, "Greece");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.8, 0], [8, 540, 1150, 0.86, 0]]);
      layer(g, cam, 1, (g) => {
        calm(g); sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94");
        if (t > tP - 0.2) { g.save(); g.beginPath(); g.rect(-900, 0, 900 + 2500 * clamp((t - tP + 0.2) / 1.5), 3000); g.clip(); bridge(g, t, 0); g.restore(); }
        if (t > tG - 0.2) for (let i = 0; i < 8; i++) guy(g, PSOL, { x: -400 + i * 90, y: 1150, h: 200, expr: "determined", walk: t * 2, hold: { r: "spear" }, spearAng: -1.4, t, shadow: false, blink: 0 });
      });
      stamp(g, "480 BC", 540, 330, 150, t, t48 - 0.05, tP - 0.1);
      label(g, "A BRIDGE OF BOATS", 540, 330, 80, t, tP, tH - 0.05);
      label(g, "THE HELLESPONT", 540, 330, 80, t, tH, tG - 0.05, { font: "Cinzel", fill: "#cfe9ff" });
      label(g, "→ GREECE", 540, 330, 96, t, tG, E(1) + 0.2, { font: "Cinzel" });
    }, { type: "flash", d: 0.2 });
    ev(t48, "boom", 0.6); ev(tP, "build");
  }
  // 2 — the storm smashes it
  { const t0 = S(2) - 0.1, tSt = wt(2, "storm"), tSm = wt(2, "smashed");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.85, 0], [tSm - t0, 540, 1150, 0.9, 3], [5, 540, 1150, 0.92, -3]]);
      layer(g, cam, 1, (g) => {
        stormy(g); waves(g, 1150, t * 2, -900, 2000, "#2a4a6a", 60);
        bridge(g, t, clamp((t - tSm) / 0.8));
        if (((t * 1.3) % 1) < 0.06 && t > tSt) { g.fillStyle = "rgba(255,255,255,0.6)"; g.fillRect(-900, -900, 2900, 3400); line(g, [[300, -200], [380, 300], [320, 340], [420, 800]], 14, "#fff6c8"); }
      });
      rain(g, t, 0.6);
      stamp(g, "SMASHED", 540, 330, 120, t, tSm, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tSt, "rumble"); ev(tSt, "rain"); ev(tSm, "crash"); KICKS.push({ t: tSm, a: 22 });
  }
  // 3 — the punishment
  { const t0 = S(3) - 0.1, tF = wt(3, "Furious"), tL = wt(3, "lashes"), tBr = wt(3, "brand"), tCh = wt(3, "chains"), tSu = wt(3, "submission");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 380, 1400, 1.2, 0], [tL - t0, 540, 1400, 1.0, 0], [12, 540, 1400, 1.05, 0]]);
      layer(g, cam, 0.7, calm);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -900, 2000, "#3f8fc4", "#1f5f94"); ground(g, 1600, "#c9b07a", -900, 2000);
        guy(g, XER, { x: 220, y: 1850, h: 600, expr: t < tL ? "shout" : "angry", mouthOpen: t < tL ? 1 : 0, armR: [2.2 + Math.sin(t * 6) * 0.2, -0.2], blink: blinkAt(t, 1), t });
        if (t < tF + 0.6) { g.save(); g.globalAlpha = 0.25; g.fillStyle = "#c0262e"; g.fillRect(-900, -900, 2900, 3400); g.restore(); }
        for (let i = 0; i < 3; i++) {
          const x = 560 + i * 180;
          if (t > tCh - 0.1 && i === 2) { guy(g, PSOL, { x, y: 1760, h: 380, expr: "determined", armR: [2.4, -0.3], blink: 0, t }); const q = clamp((t - tCh) / 0.8); for (let k = 0; k < 6; k++) ell(g, x + 60 + q * 160 + k * 18, 1400 + q * q * 260 - Math.sin(q * Math.PI) * 120 + k * 6, 12, 8, "#8a8f96", 3); continue; }
          if (t > tBr - 0.1 && i === 1) { guy(g, PSOL, { x, y: 1760, h: 380, expr: "determined", armR: [1.4, -0.4], blink: 0, t }); line(g, [[x + 60, 1480], [x + 200, 1580]], 10, "#3a3a44"); ell(g, x + 210, 1590, 22, 22, "#ff6a2a", 4); smokePuff(g, x + 220, 1600, 60, (t * 1.2) % 1, 3); continue; }
          const ph = (t * 2.4 + i * 0.3) % 1; guy(g, PSOL, { x, y: 1760, h: 380, expr: "shout", armR: [lerp(2.8, 0.8, ph), -0.3], blink: 0, t }); line(g, [[x + 40, 1500], [x + 140 + ph * 80, 1500 - (1 - ph) * 160], [x + 180 + ph * 120, 1600 - (1 - ph) * 60]], 6, "#5a3b2a");
        }
        if (t > tL) { const n = Math.min(300, Math.floor((t - tL) * 60)); rect(g, 640, 980, 360, 150, "#fff6e6", 7, 16); strokeText(g, `${n} / 300`, 820, 1055, 64, { fill: "#5a1e28", lw: 0, shadow: false }); }
      });
      label(g, "300 LASHES", 540, 330, 96, t, tL, tBr - 0.05);
      label(g, "HOT IRONS", 540, 330, 96, t, tBr, tCh - 0.05, { fill: "#ffb36b" });
      label(g, "CHAINS", 540, 330, 96, t, tCh, tSu - 0.05, { fill: "#cfd6e0" });
      stamp(g, "SUBMIT, SEA!", 540, 330, 110, t, tSu, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "sting", 0.6); for (let k = 0; k < 8; k++) ev(tL + k * 0.42, "whip", 0.5); ev(tBr, "bubble"); ev(tCh, "clank"); ev(tCh + 0.6, "splash");
  }
}
