// 38 — The Cardiff Giant (1869)
"use strict";
window.MOOD = "comic";
const HULL = { tunic: "#4a3a2a", trim: "#d9c08a", helmet: "tophat", hatCol: "#2a2430", trousers: "#3a3a44", beard: "#5a3b2a", moust: true };
const BARNUM = { tunic: "#6b2a3a", trim: "#e7c15f", helmet: "tophat", hatCol: "#1f1a24", trousers: "#1f1a24", moust: true, sash: "#e7c15f" };
const VIS = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: ["tophat", "bonnet", "bowler", null][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
/** the stone giant lying on its back (original stylised figure) */
function giant(g, x, y, s, col = "#c9c2b2") {
  const u = s / 100; g.save(); g.translate(x, y);
  ell(g, -190 * u, -20 * u, 40 * u, 34 * u, col, 5 * u); // head
  smoothPath(g, [[-150 * u, -40 * u], [60 * u, -46 * u], [80 * u, -10 * u], [60 * u, 26 * u], [-150 * u, 20 * u]]); fillInk(g, col, 5 * u);
  for (const dy of [-16, 10]) { smoothPath(g, [[60 * u, (dy - 12) * u], [240 * u, (dy - 8) * u], [250 * u, (dy + 8) * u], [60 * u, (dy + 12) * u]]); fillInk(g, col, 5 * u); }
  smoothPath(g, [[-120 * u, 18 * u], [0, 30 * u], [20 * u, 40 * u], [-120 * u, 36 * u]]); fillInk(g, shade(col, 0.95), 4 * u);
  line(g, [[-200 * u, -26 * u], [-184 * u, -26 * u]], 2.5 * u); line(g, [[-198 * u, -8 * u], [-182 * u, -6 * u]], 2.5 * u);
  for (let i = 0; i < 6; i++) line(g, [[(-130 + i * 60) * u, -30 * u], [(-120 + i * 60) * u, 0]], 1.5 * u, "rgba(80,70,60,0.4)");
  g.restore();
}
const farm = (g) => { sky3(g, -900, -900, 2900, 2100, "#5a8ad0", "#b3d2ee", "#e9eedc"); smoothHills(g, -900, 2000, 1150, 150, "#7aa04e", 3, 5); house(g, 900, 1300, 300, 220, "#c0392b", "#5a3b2a", 6); ground(g, 1300, "#8a6a3a", -900, 2000); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const fm = cached("farm38", -900, -900, 2900, 3400, farm, 1.0);
  const fmB = cached("farm38B", -900, -900, 2900, 3400, farm, 0.7, 5);
  const tentBg = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#d9c8a8"], [1, "#a8906a"]]); g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? "rgba(192,57,43,0.25)" : "rgba(255,255,255,0.2)"; g.fillRect(-500 + i * 300, -500, 150, 2100); } g.fillStyle = "#7a5a3a"; g.fillRect(-500, 1500, 2100, 1000); };
  // 0 — hook
  { const tY = wt(0, "1869"), tT = wt(0, "ten-foot"), tF = wt(0, "fooled");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, tentBg);
      layer(g, cam, 1, (g) => { smoothPath(g, [[60, 1560], [1020, 1560], [980, 1700], [100, 1700]]); fillInk(g, "#6a4a2a", 6); giant(g, 560, 1560, 180); for (let i = 0; i < 5; i++) guy(g, VIS(i), { x: 100 + i * 220, y: 1880, h: 420, expr: "shock", look: -0.4, headTilt: -6, blink: blinkAt(t, i), t }); });
      stamp(g, "1869", 540, 330, 150, t, tY - 0.05, tT - 0.05);
      stamp(g, "A 10-FOOT “GIANT”", 540, 330, 92, t, tT, tF - 0.05);
      label(g, "FOOLED THOUSANDS", 540, 330, 76, t, tF, E(0) + 0.3, { fill: "#ffe08a" });
    });
    ev(tY, "boom", 0.5); ev(tT, "gasp"); ev(tF, "cash");
  }
  // 1 — carved, aged with acid, buried
  { const t0 = S(1) - 0.1, tG = wt(1, "George"), tC = wt(1, "carve"), tA = wt(1, "aged"), tB = wt(1, "buried");
    shot(t0, (g, t, lt) => {
      const ph = t < tA - 0.1 ? 0 : t < tB - 0.1 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [10, 540, 1340, 1.06, 0]]);
      layer(g, cam, 0.7, ph === 2 ? fmB : (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#6a5a4a"], [1, "#9a8a6a"]]); g.fillRect(-500, -500, 2100, 3000); g.fillStyle = "#5a4a3a"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        if (ph < 2) { giant(g, 560, 1500, 170); guy(g, HULL, { x: 160, y: 1820, h: 560, expr: "sly", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); }
        if (ph === 0) for (let i = 0; i < 2; i++) { const x = 600 + i * 260; guy(g, { tunic: "#7a6a5a", trim: "#d9c08a", helmet: "cap", hatCol: "#5a4a3a", trousers: "#4a4a52" }, { x, y: 1840, h: 440, dir: -1, expr: "determined", armR: [1.8 + Math.abs(Math.sin(t * 9 + i)) * 0.6, -0.6], blink: blinkAt(t, 3 + i), t }); if (Math.sin(t * 9 + i) > 0.8) sparkle(g, x - 120, 1500, 24, 0.5); }
        if (ph === 1) { rect(g, 820, 1480, 80, 140, "#d9e2a0", 6, 12); strokeText(g, "ACID", 860, 1440, 36, { fill: "#d9f2a0" }); for (let i = 0; i < 6; i++) { const q = (t * 1.2 + i / 6) % 1; g.save(); g.globalAlpha = (1 - q) * 0.7; ell(g, 400 + i * 60, 1480 - q * 100, 16, 12, "#d9f2a0", 3); g.restore(); } }
        if (ph === 2) { const k = clamp((t - tB) / 1.0); g.save(); g.beginPath(); g.rect(-500, 0, 2100, 1600 + 120 * (1 - k)); g.clip(); giant(g, 540, 1600, 150, "#b9b2a2"); g.restore(); smoothPath(g, [[200, 1600], [880, 1600], [860, 1680], [220, 1680]]); fillInk(g, "#6a4a2a", 5); guy(g, HULL, { x: 120, y: 1820, h: 540, expr: "sly", armR: [2.0, -0.6], blink: blinkAt(t, 1), t }); line(g, [[220, 1440], [300, 1620]], 10, "#6b4024"); }
      });
      label(g, "GEORGE HULL, TOBACCONIST", 540, 330, 58, t, tG, tC - 0.05, { font: "Cinzel" });
      label(g, "CARVED FROM GYPSUM", 540, 330, 70, t, tC, tA - 0.1);
      label(g, "AGED WITH ACID", 540, 330, 80, t, tA, tB - 0.1, { fill: "#d9f2a0" });
      label(g, "BURIED ON A FARM", 540, 330, 76, t, tB, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tC, "build"); ev(tA, "bubble"); ev(tB, "pop");
  }
  // 2 — "discovered"; 50 cents a head
  { const t0 = S(2) - 0.1, tD = wt(2, "discovered"), tF = wt(2, "fifty");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.06, 0]]);
      layer(g, cam, 0.7, fmB);
      layer(g, cam, 1, (g) => {
        smoothPath(g, [[200, 1600], [880, 1600], [860, 1680], [220, 1680]]); fillInk(g, "#5a3a1a", 5); giant(g, 540, 1610, 150);
        for (let i = 0; i < 2; i++) guy(g, { tunic: "#7a6a5a", trim: "#d9c08a", helmet: "cap", hatCol: "#5a4a3a", trousers: "#4a4a52" }, { x: 160 + i * 760, y: 1820, h: 460, dir: i ? -1 : 1, expr: "shock", blink: 0, t });
        if (t > tF - 0.2) { rect(g, 360, 1060, 360, 180, "#fff6e6", 7, 10); strokeText(g, "SEE THE GIANT", 540, 1120, 40, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "50¢", 540, 1190, 60, { fill: "#c0262e", lw: 0, shadow: false }); for (let i = 0; i < 6; i++) guy(g, VIS(i), { x: 1300 - ((t - tF) * 120 + i * 140) % 1600, y: 1900, h: 360, dir: -1, expr: "happy", walk: t * 1.6, blink: 0, t }); }
      });
      stamp(g, "“DISCOVERED”!", 540, 330, 100, t, tD - 0.1, tF - 0.2);
      label(g, "BIBLICAL GIANT, 50¢ A LOOK", 540, 330, 58, t, tF, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tD, "gasp"); ev(tF, "cash");
  }
  // 3 — Barnum's fake of the fake
  { const t0 = S(3) - 0.1, tCo = wt(3, "confessed"), tB = wt(3, "Barnum"), tFa = wt(3, "fake", 1);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [6, 540, 1300, 1.06, 0]]);
      layer(g, cam, 0.7, tentBg);
      layer(g, cam, 1, (g) => {
        if (t < tB - 0.1) { giant(g, 560, 1560, 170); guy(g, HULL, { x: 200, y: 1840, h: 560, expr: "sad", blink: blinkAt(t, 1), t }); if (t > tCo) shout(g, 300, 1060, "IT'S FAKE!", 56, clamp((t - tCo) / 0.12), "#c0262e", [240, 1260]); }
        else { giant(g, 300, 1400, 110); giant(g, 760, 1700, 110, "#d9d2c2"); strokeText(g, "FAKE", 300, 1270, 50, { fill: "#fff" }); if (t > tFa - 0.2) strokeText(g, "FAKE OF THE FAKE", 760, 1560, 46, { fill: "#ffe08a" }); guy(g, BARNUM, { x: 900, y: 1500, h: 440, dir: -1, expr: "sly", armR: [2.4, 0], blink: blinkAt(t, 3), t }); }
      });
      label(g, "HULL CONFESSED...", 540, 330, 80, t, tCo, tB - 0.1);
      stamp(g, "P.T. BARNUM: COPY IT!", 540, 330, 82, t, tB, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tCo, "sting", 0.5); ev(tB, "horns", 0.5); ev(tFa, "boing");
  }
}
