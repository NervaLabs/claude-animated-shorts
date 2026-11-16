// 28 — King Charles VI and the Glass Delusion
"use strict";
window.MOOD = "eerie";
const KINGC = { tunic: "#2f4f9f", trim: "#e7c15f", hair: "#5a3b2a", helmet: "crown", cape: "#2f4f9f", robe: true };
const COURT = (i) => ({ tunic: ["#7a2a4a", "#4f7a4a", "#8a5a2a"][i % 3], trim: "#e7c15f", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: i % 2 ? "coif" : null, robe: i % 2 === 1, lady: i % 2 === 1, trousers: "#3a3a4a" });
/** glassy overlay: draw the king, then a pale-blue sheen + highlights on top */
function glassKing(g, s, t, rods = false, blanket = false) {
  const set = replay(g);
  guy(g, KINGC, { ...s, t });
  tinted(g, (tt) => { set(tt); guy(tt, KINGC, { ...s, t, shadow: false }); }, "#bfe6ff", 0.42);
  const h = s.h, x = s.x, y = s.y;
  line(g, [[x - h * 0.08, y - h * 0.6], [x - h * 0.02, y - h * 0.45]], h * 0.02, "rgba(255,255,255,0.9)");
  line(g, [[x + h * 0.06, y - h * 0.95], [x + h * 0.1, y - h * 0.86]], h * 0.018, "rgba(255,255,255,0.9)");
  sparkle(g, x + h * 0.1, y - h * 0.7, h * 0.05, (t * 0.7) % 1);
  if (rods) for (const dx of [-0.07, 0.07]) line(g, [[x + dx * h, y - h * 0.68], [x + dx * h, y - h * 0.05]], h * 0.018, "#4a4a52");
  if (blanket) { smoothPath(g, [[x - h * 0.24, y - h * 0.66], [x + h * 0.24, y - h * 0.66], [x + h * 0.3, y - h * 0.2], [x + h * 0.22, y], [x - h * 0.22, y], [x - h * 0.3, y - h * 0.2]]); fillInk(g, "#9a2a33", h * 0.012); for (let i = 0; i < 4; i++) line(g, [[x - h * 0.24, y - h * (0.55 - i * 0.14)], [x + h * 0.24, y - h * (0.55 - i * 0.14)]], h * 0.008, "#d4a632"); }
}
const hall = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#3a2a4a"], [1, "#7a5a6a"]]); g.fillRect(-900, -900, 2900, 2600);
  for (let i = 0; i < 6; i++) { rect(g, -700 + i * 450, 300, 220, 700, "#9fb8d8", 8, 110); g.save(); g.globalAlpha = 0.4; for (let k = 0; k < 6; k++) line(g, [[-700 + i * 450, 400 + k * 110], [-480 + i * 450, 360 + k * 110]], 4, "#fff"); g.restore(); }
  for (let i = 0; i < 4; i++) { poly(g, [[-560 + i * 600, 200], [-380 + i * 600, 200], [-400 + i * 600, 1300], [-540 + i * 600, 1300]], "#2f4f9f", 5, true); for (let k = 0; k < 3; k++) { g.save(); g.translate(-470 + i * 600, 420 + k * 260); g.fillStyle = "#e7c15f"; g.beginPath(); g.arc(0, -10, 14, 0, TAU); g.arc(-14, 10, 12, 0, TAU); g.arc(14, 10, 12, 0, TAU); g.fill(); g.restore(); } }
  g.fillStyle = "#4a3a3a"; g.fillRect(-900, 1550, 2900, 1000); line(g, [[-900, 1550], [2000, 1550]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function buildShots() {
  const hl = cached("hallC", -900, -900, 2900, 3400, hall, 1.0);
  const hlB = cached("hallCB", -900, -900, 2900, 3400, hall, 0.7, 5);
  // 0 — hook
  { const tC = wt(0, "Charles"), tG = wt(0, "glass");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.1, 0], [5, 540, 1250, 1.2, 0]]);
      layer(g, cam, 0.7, hlB);
      layer(g, cam, 1, (g) => glassKing(g, { x: 540, y: 1800, h: 680, expr: t > tG ? "scared" : "neutral", blink: blinkAt(t, 1), sweat: t > tG ? (t * 0.7) % 1 : 0 }, t));
      label(g, "KING CHARLES VI OF FRANCE", 540, 330, 56, t, tC, tG - 0.05, { font: "Cinzel" });
      stamp(g, "“I AM MADE OF GLASS”", 540, 330, 86, t, tG, E(0) + 0.3, { fill: "#cfe9ff" });
    });
    ev(tG, "ding"); ev(tG + 0.1, "sparkle");
  }
  // 1 — don't touch me
  { const t0 = S(1) - 0.1, tM = wt(1, "mental"), tT = wt(1, "touch"), tSh = wt(1, "shatter");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [8, 540, 1340, 1.08, 0]]);
      layer(g, cam, 0.7, hlB);
      layer(g, cam, 1, (g) => {
        const reach = t > tT - 0.3;
        guy(g, COURT(0), { x: lerp(100, 260, clamp((t - tT + 0.3) / 0.5)), y: 1800, h: 520, expr: reach ? "shock" : "neutral", armR: reach ? [1.7, -0.2] : [0.3, 0.2], blink: blinkAt(t, 2), t });
        glassKing(g, { x: 640, y: 1800, h: 600, dir: -1, expr: reach ? "scared" : "sick", lean: reach ? -10 : 0, armL: reach ? [-2.4, 0] : undefined, armR: reach ? [2.4, 0] : undefined, blink: blinkAt(t, 1) }, t);
        if (t > tT) shout(g, 760, 1000, "DON'T TOUCH ME!", 48, clamp((t - tT) / 0.12), "#2f5fae", [700, 1200]);
        if (t > tSh) for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU, q = clamp((t - tSh) / 0.6); g.save(); g.globalAlpha = 1 - q; poly(g, [[640 + Math.cos(a) * q * 260, 1300 + Math.sin(a) * q * 260], [660 + Math.cos(a) * q * 260, 1280 + Math.sin(a) * q * 260], [650 + Math.cos(a) * q * 260, 1320 + Math.sin(a) * q * 260]], "#cfe9ff", 3); g.restore(); }
      });
      label(g, "SEVERE MENTAL ILLNESS", 540, 330, 64, t, tM, tT - 0.05, { fill: "#e6e0f2" });
      label(g, "FEAR OF SHATTERING", 540, 330, 72, t, tSh - 0.1, E(1) + 0.2, { fill: "#cfe9ff" });
    }, { type: "flash", d: 0.2 });
    ev(tT, "pop"); ev(tSh, "crack");
  }
  // 2 — iron rods and thick blankets
  { const t0 = S(2) - 0.1, tI = wt(2, "iron"), tBl = wt(2, "blankets"), tSi = wt(2, "sitting");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.1, 0], [8, 540, 1300, 1.18, 0]]);
      layer(g, cam, 0.7, hlB);
      layer(g, cam, 1, (g) => {
        if (t > tSi - 0.3) { rect(g, 400, 1400, 280, 400, "#6b2a3a", 7, 12); }
        glassKing(g, { x: 540, y: 1800, h: 640, expr: "nervous", blink: blinkAt(t, 1) }, t, t > tI - 0.1, t > tBl - 0.1);
      });
      label(g, "IRON RODS IN HIS CLOTHES", 540, 330, 60, t, tI, tBl - 0.05);
      label(g, "WRAPPED IN BLANKETS", 540, 330, 66, t, tBl, E(2) + 0.2, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.3 });
    ev(tI, "clank"); ev(tBl, "pop");
  }
  // 3 — France descends into civil war
  { const t0 = S(3) - 0.1, tC = wt(3, "civil");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.95, 0], [5, 540, 1350, 1.02, 3]]);
      layer(g, cam, 0.7, (g) => { sky3(g, -900, -900, 2900, 2100, "#3a3a5a", "#9a6a6a", "#e2b08a"); smoothHills(g, -900, 2000, 1200, 160, "#5a6a4a", 3, 5); ground(g, 1300, "#8a8a5a", -900, 2000); });
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 6; i++) { guy(g, { ...OUTF.medievalRed, tunic: "#2f4f9f" }, { x: 60 + (i % 3) * 120, y: 1720 + Math.floor(i / 3) * 90, h: 340, expr: "shout", hold: { r: "spear", l: "shield" }, shieldCol: "#2f4f9f", spearAng: -0.4, armR: [1.6, -0.3], blink: 0, t }); guy(g, { ...OUTF.medievalRed, tunic: "#c0392b" }, { x: 1020 - (i % 3) * 120, y: 1720 + Math.floor(i / 3) * 90, h: 340, dir: -1, expr: "shout", hold: { r: "spear", l: "shield" }, shieldCol: "#c0392b", spearAng: -0.4, armR: [1.6, -0.3], blink: 0, t }); }
        for (let i = 0; i < 4; i++) dust(g, 400 + i * 90, 1700, 100, (t * 1.3 + i * 0.25) % 1, i + Math.floor(t * 1.3));
        g.save(); g.globalAlpha = 0.85; glassKing(g, { x: 540, y: 1150, h: 300, expr: "sick", blink: blinkAt(t, 1), shadow: false }, t); g.restore();
      });
      stamp(g, "CIVIL WAR", 540, 330, 120, t, tC, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tC, "warcry"); ev(tC, "drums"); for (let k = 0; k < 4; k++) ev(tC + 0.3 + k * 0.5, "clash", 0.4);
  }
}
