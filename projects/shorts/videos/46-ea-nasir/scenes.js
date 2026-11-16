// 46 — The Complaint Tablet to Ea-nasir (1750 BC)
"use strict";
window.MOOD = "comic";
const NANNI = { tunic: "#d9c08a", trim: "#8a3a2a", hair: "#1a1012", beard: "#1a1012", robe: true, skin: "#c99067" };
const EANASIR = { tunic: "#4a7a8a", trim: "#e2b64b", hair: "#1a1012", beard: "#1a1012", robe: true, skin: "#b97a4a", helmet: "turban", hatCol: "#e2b64b" };
const MESS = { tunic: "#f3ecda", trim: "#8a5a32", hair: "#1a1012", skin: "#c99067", trousers: "#f3ecda" };
const ARCH = { tunic: "#c9b07a", trim: "#8a6a3a", helmet: "pith", hatCol: "#efe6c8", trousers: "#8a7a5a", beard: "#7a5a3a" };
HATS.pith = HATS.pith || ((g, rx, ry, lw) => { smoothPath(g, [[-rx * 1.5, -ry * 0.5], [-rx * 1.0, -ry * 0.75], [-rx * 0.9, -ry * 1.35], [0, -ry * 1.65], [rx * 0.9, -ry * 1.35], [rx * 1.0, -ry * 0.75], [rx * 1.5, -ry * 0.5], [0, -ry * 0.6]]); fillInk(g, "#efe6c8", lw); });
function tablet(g, x, y, s, rot = 0, angry = false) { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); smoothPath(g, [[-60 * u, -80 * u], [60 * u, -84 * u], [66 * u, 70 * u], [-62 * u, 76 * u]]); fillInk(g, "#c98a5a", 5 * u); for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) { const px = -46 * u + c * 18 * u, py = -64 * u + r * 17 * u; poly(g, [[px, py], [px + 8 * u, py + 3 * u], [px, py + 6 * u]], "#8a5a3a", 0); line(g, [[px + 4 * u, py + 3 * u], [px + 12 * u, py + 3 * u]], 1.5 * u, "#8a5a3a"); } if (angry) { line(g, [[-50 * u, 60 * u], [50 * u, -60 * u]], 3 * u, "rgba(120,30,20,0.5)"); } g.restore(); }
function stars(g, x, y, s, n) { for (let i = 0; i < 5; i++) { g.save(); g.translate(x + (i - 2) * s * 1.1, y); g.beginPath(); for (let k = 0; k < 10; k++) { const a = (k / 10) * TAU - Math.PI / 2, r = k % 2 ? s * 0.22 : s * 0.5; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); fillInk(g, i < n ? "#f2c443" : "#6a6a7a", s * 0.06); g.restore(); } }
function ingot(g, x, y, s, bad = true) { const u = s / 100; poly(g, [[x - 60 * u, y], [x - 40 * u, y - 30 * u], [x + 40 * u, y - 30 * u], [x + 60 * u, y]], bad ? "#8a7a6a" : "#c9733a", 4); if (bad) { line(g, [[x - 20 * u, y - 26 * u], [x - 6 * u, y - 10 * u], [x - 14 * u, y - 2 * u]], 2.5 * u); line(g, [[x + 20 * u, y - 24 * u], [x + 30 * u, y - 8 * u]], 2.5 * u); } }
const meso = (g) => { sky3(g, -900, -900, 2900, 2100, "#3f86d6", "#9fd0f0", "#fbe7b8"); ziggurat(g, 1200, 1250, 300); for (let i = 0; i < 6; i++) { rect(g, -700 + i * 300, 1000, 240, 250, "#d9b88a", 5); rect(g, -630 + i * 300, 1130, 80, 120, "#5a3b2a", 4, 30); } palm(g, -200, 1260, 300, 5); ground(g, 1250, "#e2c48a", -900, 2000); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const ms = cached("meso", -900, -900, 2900, 3400, meso, 1.0);
  const msB = cached("mesoB", -900, -900, 2900, 3400, meso, 0.7, 5);
  // 0 — hook: a 1-star review in clay
  { const tO = wt(0, "oldest"), tY = wt(0, "Yelp"), tB = wt(0, "1750");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.08, 0]]);
      layer(g, cam, 1, (g) => { g.fillStyle = "#2a2430"; g.fillRect(-500, -500, 2100, 3000); g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 540, 1150, 0, 600, [[0, "rgba(255,220,160,0.35)"], [1, "rgba(255,220,160,0)"]]); g.fillRect(-100, 500, 1300, 1300); g.restore(); tablet(g, 540, 1180, 420, -0.05, true); if (t > tY - 0.1) { g.save(); g.translate(540, 1620); g.scale(easeBack(clamp((t - tY + 0.1) / 0.3)), easeBack(clamp((t - tY + 0.1) / 0.3))); rect(g, -330, -70, 660, 140, "#fff6e6", 6, 20); stars(g, 0, 0, 100, 1); g.restore(); } });
      label(g, "THE OLDEST COMPLAINT", 540, 330, 72, t, tO, tB - 0.05);
      stamp(g, "1750 BC", 540, 330, 140, t, tB - 0.05, E(0) + 0.3);
    });
    ev(tY, "pop"); ev(tB, "boom", 0.6);
  }
  // 1 — Nanni vs. Ea-nasir
  { const t0 = S(1) - 0.1, tEx = wt(1, "Excavated"), tN = wt(1, "Nanni"), tM = wt(1, "merchant"), tC = wt(1, "copper"), tR = wt(1, "rudely");
    shot(t0, (g, t, lt) => {
      const ph = t < tN - 0.2 ? 0 : t < tM - 0.1 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [15, 540, 1340, 1.08, 0]]);
      layer(g, cam, 0.7, msB);
      layer(g, cam, 1, (g) => {
        if (ph === 0) { guy(g, ARCH, { x: 360, y: 1820, h: 560, expr: "shock", armR: [1.4, 0.6], blink: blinkAt(t, 1), t }); smoothPath(g, [[500, 1820], [900, 1820], [860, 1900], [540, 1900]]); fillInk(g, "#a8865a", 5); tablet(g, 700, 1760, 160, 0.3); for (let i = 0; i < 4; i++) sparkle(g, 700 + Math.cos(i * 1.6) * 120, 1720 + Math.sin(i) * 60, 24, (t * 0.8 + i / 4) % 1); }
        if (ph === 1) { guy(g, NANNI, { x: 360, y: 1820, h: 600, expr: "angry", armR: [1.6, -0.6], blink: blinkAt(t, 1), t }); tablet(g, 640, 1380, 220, -0.1); line(g, [[560, 1300], [620, 1360]], 8, "#6b4024"); for (let i = 0; i < 3; i++) { const q = (t * 1.2 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, "!", 300 + i * 80, 1150 - q * 80, 60, { fill: "#c0262e" }); g.restore(); } }
        if (ph === 2) { guy(g, EANASIR, { x: 700, y: 1820, h: 600, dir: -1, expr: t > tR ? "angry" : "sly", armR: t > tR ? [2.0, -0.2] : [1.4, -0.4], blink: blinkAt(t, 2), t }); if (t > tC - 0.1) for (let i = 0; i < 3; i++) ingot(g, 260 + i * 90, 1800 - (i % 2) * 20, 120); if (t > tR - 0.1) { guy(g, MESS, { x: lerp(320, -200, clamp((t - tR) / 1.2)), y: 1820, h: 440, dir: -1, expr: "sad", walk: t * 2, blink: 0, t }); shout(g, 760, 1040, "GO AWAY!", 54, clamp((t - tR) / 0.12), "#c0262e", [720, 1250]); } }
      });
      label(g, "EXCAVATED IN MESOPOTAMIA", 540, 330, 58, t, tEx, tN - 0.2);
      label(g, "THE CUSTOMER: NANNI", 540, 330, 66, t, tN, tM - 0.1, { font: "Cinzel" });
      label(g, "THE MERCHANT: EA-NASIR", 540, 330, 62, t, tM, tC - 0.05, { font: "Cinzel", fill: "#ffe08a" });
      label(g, "SUBPAR COPPER", 540, 330, 86, t, tC, tR - 0.05);
      stamp(g, "RUDE SERVICE", 540, 330, 110, t, tR, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tEx, "ding"); ev(tN, "pop"); ev(tC, "clank"); ev(tR, "boing");
  }
  // 2 — more complaints in his house
  { const t0 = S(2) - 0.1, tO = wt(2, "other"), tH = wt(2, "house");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [7, 540, 1330, 1.08, 0]]);
      layer(g, cam, 0.7, (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#b9986a"], [1, "#8a6a42"]]); g.fillRect(-500, -500, 2100, 3000); g.fillStyle = "#7a5a3a"; g.fillRect(-500, 1550, 2100, 900); });
      layer(g, cam, 1, (g) => {
        const n = 1 + Math.floor(clamp((t - tO + 0.2) / 2) * 14);
        for (let i = 0; i < n; i++) tablet(g, 420 + (i % 5) * 110 - Math.floor(i / 5) * 20, 1700 - Math.floor(i / 5) * 140, 120, (rnd(i) - 0.5) * 0.4, true);
        guy(g, ARCH, { x: 200, y: 1840, h: 560, expr: "shock", armL: [-2.6, 0], armR: [2.6, 0], blink: 0, t });
      });
      label(g, "MORE ANGRY TABLETS...", 540, 330, 70, t, tO, tH - 0.05);
      stamp(g, "...IN HIS OWN HOUSE", 540, 330, 92, t, tH, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tO, "pop"); ev(tO + 0.5, "pop"); ev(tO + 1.0, "pop"); ev(tH, "laugh");
  }
}
