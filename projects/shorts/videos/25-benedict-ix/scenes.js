// 25 — Pope Benedict IX: The Three-Time Pope
"use strict";
window.MOOD = "comic";
const POPE = { tunic: "#f6f3ea", trim: "#d4a632", helmet: "mitre", hatCol: "#f6f3ea", hair: "#5a3b2a", hairUnder: true, robe: true, cape: "#c0262e" };
const GODF = { tunic: "#6b2a3a", trim: "#d4a632", bald: true, hair: "#9a9a9a", beard: "#9a9a9a", robe: true };
const ROMAN = (i) => ({ tunic: ["#a85a3a", "#5a7a2a", "#3e78c2", "#c98b4b"][i % 4], trim: "#f2efe6", hair: ["#2a1a14", "#5a3b2a"][i % 2], helmet: i % 3 === 0 ? "coif" : null, robe: i % 3 === 0, lady: i % 3 === 0, trousers: "#5a4a3a" });
const rome = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a8ad0", "#b3d2ee", "#f0e6c8");
  ell(g, 540, 820, 260, 200, "#d9c8a8", 7); rect(g, 280, 820, 520, 420, "#e9dcc0", 7); ell(g, 540, 640, 60, 40, "#d9c8a8", 5); line(g, [[540, 600], [540, 520]], 8, "#d4a632"); line(g, [[510, 550], [570, 550]], 8, "#d4a632");
  for (let i = 0; i < 6; i++) column(g, 330 + i * 84, 1240, 46, 300, "#f6f3ea", 4);
  for (let i = 0; i < 8; i++) house(g, -700 + i * 400 + (i > 3 ? 300 : 0), 1300, 220, 200, ["#e6cfa6", "#d9b48a", "#efe2c4"][i % 3], "#b9532f", 5);
  g.fillStyle = vgrad(g, 1300, 2400, [[0, "#c9b49a"], [1, "#9a8a72"]]); g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
const counter = (g, n, t, t0) => { if (t < t0) return; const k = easeBack(clamp((t - t0) / 0.3)); g.save(); g.translate(900, 820); g.scale(k, k); ell(g, 0, 0, 90, 90, "#d4a632", 7); strokeText(g, `#${n}`, 0, 0, 80, { font: "Cinzel", fill: "#fff6dc", lw: 10 }); g.restore(); };
function buildShots() {
  const rm = cached("rome", -900, -900, 2900, 3400, rome, 1.0);
  const rmB = cached("romeB", -900, -900, 2900, 3400, rome, 0.7, 5);
  // 0 — hook
  { const tT = wt(0, "three"), tS = wt(0, "sold");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [5, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, rmB);
      layer(g, cam, 1, (g) => { guy(g, POPE, { x: 400, y: 1820, h: 620, expr: "sly", armR: t > tS ? [1.6, -0.3] : [2.6, 0], hold: t > tS ? { r: "bag" } : null, blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) if (t > tT - 0.3 + i * 0.2) { g.save(); g.translate(760 + i * 110, 1250 - i * 30); g.scale(easeBack(clamp((t - tT + 0.3 - i * 0.2) / 0.3)), easeBack(clamp((t - tT + 0.3 - i * 0.2) / 0.3))); HATS.mitre(g, 40, 40, 5, { hatCol: "#f6f3ea" }); g.restore(); } });
      stamp(g, "POPE × 3", 540, 330, 130, t, tT, tS - 0.05);
      stamp(g, "...AND SOLD IT", 540, 330, 104, t, tS, E(0) + 0.3);
    });
    ev(tT, "ding"); ev(tT + 0.2, "ding"); ev(tT + 0.4, "ding"); ev(tS, "cash");
  }
  // 1 — pope at ~20; scandal; driven out
  { const t0 = S(1) - 0.1, tTw = wt(1, "twenty"), tW = wt(1, "wealthy"), tSc = wt(1, "scandalous"), tDr = wt(1, "drove");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [tDr - t0, 540, 1350, 1.0, 0], [tDr - t0 + 0.5, 540, 1350, 0.85, 0], [12, 540, 1350, 0.87, 0]]);
      layer(g, cam, 0.7, rmB);
      layer(g, cam, 1, (g) => {
        if (t < tDr - 0.1) {
          guy(g, POPE, { x: 540, y: 1820, h: 600, expr: t > tSc ? "laugh" : "proud", ...(t > tSc ? danceState(t, 1) : {}), hold: t > tSc ? { r: "cup" } : null, blink: blinkAt(t, 1), t });
          if (t > tW && t < tSc) for (let i = 0; i < 2; i++) { guy(g, { ...GODF, tunic: "#2f4f8f", beard: null, hair: "#5a3b2a", bald: false }, { x: i ? 900 : 180, y: 1800, h: 520, dir: i ? -1 : 1, expr: "proud", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 3 + i), t }); }
          if (t > tSc) for (let i = 0; i < 4; i++) { const q = (t * 0.9 + i / 4) % 1; g.save(); g.globalAlpha = 1 - q; strokeText(g, "♪", 300 + i * 160, 1200 - q * 200, 60, { font: "serif", fill: "#fff", lw: 8 }); g.restore(); }
          counter(g, 1, t, tTw);
        } else {
          guy(g, POPE, { x: lerp(540, -500, clamp((t - tDr) / 1.6)), y: 1820, h: 560, dir: -1, expr: "scared", walk: t * 3, lean: 12, blink: 0, t });
          for (let i = 0; i < 6; i++) guy(g, ROMAN(i), { x: lerp(1000 + i * 120, -100 + i * 120, clamp((t - tDr - 0.2) / 2)), y: 1780 + (i % 2) * 40, h: 420, dir: -1, expr: "angry", walk: t * 2.6 + i * 0.2, armR: [2.6, 0], hold: { r: i % 2 ? "torch" : "spear" }, spearAng: -1.5, blink: 0, t });
        }
      });
      stamp(g, "1032", 540, 330, 150, t, wt(1, "1032") - 0.05, tW - 0.05);
      label(g, "AGE ~20, POPE", 540, 330, 80, t, tTw, wt(1, "1032") - 0.05);
      label(g, "RICH FAMILY", 540, 330, 86, t, tW, tSc - 0.05, { fill: "#ffe08a" });
      label(g, "SCANDALOUS", 540, 330, 96, t, tSc, tDr - 0.05, { fill: "#ffd0c0" });
      stamp(g, "KICKED OUT OF ROME", 540, 330, 80, t, tDr, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tTw, "ding"); ev(tSc, "laugh"); ev(tDr, "warcry"); ev(tDr + 0.2, "scramble");
  }
  // 2 — back by force; love; sells the papacy to his godfather
  { const t0 = S(2) - 0.1, tR = wt(2, "returned"), tM = wt(2, "marry"), tSo = wt(2, "sold"), tG = wt(2, "godfather");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [8, 540, 1330, 1.08, 0]]);
      layer(g, cam, 0.7, rmB);
      layer(g, cam, 1, (g) => {
        if (t < tM - 0.1) { guy(g, POPE, { x: 540, y: 1820, h: 600, expr: "determined", armR: [2.4, -0.3], hold: { r: "sword" }, swordAng: -1.2, blink: blinkAt(t, 1), t }); for (let i = 0; i < 4; i++) guy(g, LEGx(i), { x: i < 2 ? 120 + i * 140 : 820 + (i - 2) * 140, y: 1780, h: 420, dir: i < 2 ? 1 : -1, expr: "determined", hold: { r: "spear" }, spearAng: -1.5, armR: [1.3, -0.3], blink: blinkAt(t, i), t }); counter(g, 2, t, tR); }
        else {
          guy(g, POPE, { x: 340, y: 1820, h: 600, expr: t > tSo ? "happy" : "proud", armR: t > tSo ? [1.4, -0.3] : [0.6, 0.3], hold: t > tSo ? { r: "bag" } : null, blink: blinkAt(t, 1), t, crownOn: false });
          if (t < tSo) { for (let i = 0; i < 3; i++) { const q = (t * 0.7 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; g.translate(380 + i * 60, 1150 - q * 200); g.beginPath(); g.moveTo(0, 12); g.bezierCurveTo(-30, -14, -12, -30, 0, -14); g.bezierCurveTo(12, -30, 30, -14, 0, 12); fillInk(g, "#e2453c", 3); g.restore(); } }
          guy(g, GODF, { x: 780, y: 1820, h: 600, dir: -1, expr: t > tSo ? "proud" : "sly", armR: t > tSo ? [0.3, 0.2] : [1.6, -0.3], hold: t > tSo ? null : { r: "bag" }, blink: blinkAt(t, 2), t });
          if (t > tSo) { g.save(); g.translate(780, 1140); HATS.mitre(g, 56, 56, 6, { hatCol: "#f6f3ea" }); g.restore(); }
        }
      });
      label(g, "BACK BY FORCE", 540, 330, 86, t, tR, tM - 0.1);
      label(g, "WANTS TO MARRY", 540, 330, 80, t, tM, tSo - 0.05, { fill: "#ffd0d0" });
      stamp(g, "PAPACY: SOLD", 540, 330, 110, t, tSo, tG + 0.2);
      label(g, "TO HIS GODFATHER", 540, 470, 64, t, tG, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tR, "warcry", 0.6); ev(tM, "sparkle"); ev(tSo, "cash");
  }
  // 3 — the wedding falls through; Pope #3
  { const t0 = S(3) - 0.1, tF = wt(3, "fell"), tSe = wt(3, "seized"), tTh = wt(3, "third");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [7, 540, 1330, 1.12, 0]]);
      layer(g, cam, 0.7, rmB);
      layer(g, cam, 1, (g) => {
        if (t < tSe - 0.1) { guy(g, { ...POPE, helmet: null }, { x: 540, y: 1820, h: 600, expr: "sad", blink: blinkAt(t, 1), t }); if (t > tF) { g.save(); g.translate(540, 1050); for (const sd of [-1, 1]) { g.save(); g.translate(sd * (8 + (t - tF) * 20), 0); g.rotate(sd * 0.15); g.beginPath(); g.moveTo(0, 50); g.bezierCurveTo(sd * -120, -50, sd * -50, -110, 0, -50); g.lineTo(sd * 10, 0); g.closePath(); fillInk(g, "#e2453c", 6); g.restore(); } g.restore(); } }
        else { guy(g, POPE, { x: 540, y: 1820, h: 640, expr: "proud", armR: [2.7, 0], armL: [-2.7, 0], blink: blinkAt(t, 1), t }); counter(g, 3, t, tTh - 0.1); for (let i = 0; i < 6; i++) sparkle(g, 540 + Math.cos(i * 1.1) * 260, 1200 + Math.sin(i * 1.7) * 180, 26, (t - tSe - i * 0.06) / 0.8); }
      });
      label(g, "MARRIAGE: OFF", 540, 330, 86, t, tF, tSe - 0.1, { fill: "#ffd0d0" });
      stamp(g, "POPE, AGAIN", 540, 330, 110, t, tSe, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "sadtrombone"); ev(tSe, "warcry", 0.5); ev(tTh, "ding"); ev(tTh, "choir", 0.5);
  }
}
const LEGx = (i) => ({ tunic: ["#7a2a2a", "#5a5a6a"][i % 2], trim: "#d4a632", armor: "#a8aeb8", helmet: "kettlehat", trousers: "#5a4a3a" });
