// 033 — Why Knights Rarely Died in Full Plate Armor
"use strict";
function buildShots() {
  const KN = { ...C.knight, tunic: "#b9bcc6", trim: "#7a7e8a", cape: null };
  const BAD = { ...C.peasant(2), tunic: "#6b4024" };
  // 0 hook: swords bounce off
  S2(0, { bg: "castleNight", blur: true, draw: (g, t) => { guy(g, KN, { x: 560, y: 1840, h: 700, expr: "sly", blink: blinkAt(t, 1), t }); const ph = (t * 1.2) % 1; g.save(); g.translate(300, 1300); g.rotate(-1.2 + (ph < 0.5 ? ph * 2 : 1) * 1.2 - (ph > 0.5 ? (ph - 0.5) * 1.4 : 0)); rect(g, 0, -10, 300, 20, "#d9dde6", 5, 6); g.restore(); if (ph > 0.45 && ph < 0.7) shout(g, 470, 1180, "TINK!", 50, 1, "#4a4a52"); },
    titles: [["invincible", "VIRTUALLY INVINCIBLE", "stamp", { size: 100 }], ["slashes", "TO SWORD SLASHES", "label"]] });
  ev(wt(0, "invincible"), "clank"); ev(wt(0, "slashes"), "clank", 0.6);
  // 1 movies vs reality; light enough for cartwheels
  { const tM = wt(1, "movies"), tT = wt(1, "tempered"), tD = wt(1, "deflected"), tW = wt(1, "45"), tS = wt(1, "sprint"), tCw = wt(1, "cartwheels");
    S2(1, { bg: "farm", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.06, 0]], draw: (g, t) => {
      if (t < tT - 0.2) { rect(g, 260, 900, 560, 340, "#1c1422", 8, 16); strokeText(g, "MOVIES", 540, 960, 46, { fill: "#ffe08a", lw: 0, shadow: false }); guy(g, KN, { x: 540, y: 1840, h: 640, expr: "shock", blink: 0, t }); line(g, [[300, 1300], [800, 1500]], 10, "#d9dde6"); strokeText(g, "✗", 540, 1140, 110, { fill: "#c0392b" }); }
      else if (t < tW - 0.2) { guy(g, KN, { x: 540, y: 1840, h: 660, expr: "proud", blink: blinkAt(t, 1), t }); if (t > tD - 0.1) for (let i = 0; i < 4; i++) { const q = ((t - tD) * 1.4 + i / 4) % 1; const a = -0.6 + i * 0.4; line(g, [[540 + Math.cos(a) * (520 - q * 220), 1350 + Math.sin(a) * 120], [540 + Math.cos(a) * (600 - q * 220), 1350 + Math.sin(a) * 120]], 6, "#6b4024"); } }
      else if (t < tCw - 0.2) { const x = 300 + ((t - tW) * 260) % 600; guy(g, KN, { x, y: 1840, h: 600, expr: "happy", walk: t * 2.4, blink: 0, t }); if (t > tW) { rect(g, 700, 1100, 300, 140, "#fff6e6", 6, 12); strokeText(g, "45–55 LB", 850, 1175, 54, { fill: "#1c1422", lw: 0, shadow: false }); } }
      else { const a = (t - tCw) * 5; g.save(); g.translate(540, 1500); g.rotate(a); guy(g, KN, { x: 0, y: 300, h: 600, expr: "laugh", armR: [2.8, 0], armL: [-2.8, 0], blink: 0, t, shadow: false }); g.restore(); }
    }, titles: [[tM, "NOT LIKE THE MOVIES", "label"], [tT, "TEMPERED STEEL", "stamp", { size: 110 }], [tD, "ARROWS & BLADES DEFLECTED", "label", { size: 56 }], [tW, "ONLY 45–55 POUNDS", "label", { fill: "#ffe08a" }], [tS, "THEY COULD SPRINT...", "label"], [tCw, "...EVEN DO CARTWHEELS", "stamp", { size: 92 }]] });
    ev(tD, "clank"); ev(tD + 0.4, "clank", 0.6); ev(tCw, "boing"); }
  // 2 wrestle him down; aim for the eye slit (non-graphic)
  { const tTa = wt(2, "tackle"), tE = wt(2, "eye");
    S2(2, { bg: "farm", draw: (g, t) => {
      if (t < tE - 0.2) { const k = clamp((t - tTa) / 0.5); g.save(); g.translate(560 + k * 220, 1800); g.rotate(-k * 1.3); guy(g, KN, { x: 0, y: 40, h: 600, expr: k > 0 ? "shock" : "proud", blink: 0, t, shadow: false }); g.restore(); for (let i = 0; i < 2; i++) guy(g, BAD, { x: 300 + i * 500, y: 1840, h: 540, dir: i ? -1 : 1, expr: "determined", armR: [1.6, -0.2], blink: 0, t }); if (k > 0.8) dust(g, 540, 1820, 140, t); }
      else { g.save(); g.translate(540, 1250); ell(g, 0, 0, 300, 340, "#b9bcc6", 10); rect(g, -240, -50, 480, 40, "#1c1422", 0, 12); rect(g, -240, 30, 480, 14, "#7a7e8a", 0, 6); g.restore(); const k = clamp((t - tE) / 0.6); g.save(); g.globalAlpha = k; ell(g, 540, 1220, 280, 60, "rgba(0,0,0,0)", 0); line(g, [[540, 1220], [540, 1000]], 0); strokeText(g, "↑ TINY GAP", 540, 1380, 56, { fill: "#ffe08a" }); g.restore(); }
    }, titles: [[tTa, "WRESTLE HIM TO THE GROUND", "label", { size: 60 }], [tE, "THE ONLY WEAK SPOT: THE EYE SLIT", "label", { size: 52 }]] });
    ev(tTa, "crash", 0.5); ev(tE, "sting", 0.5); }
}
