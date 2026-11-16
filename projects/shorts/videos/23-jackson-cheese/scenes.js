// 23 — Andrew Jackson's Giant Block of Cheese
"use strict";
window.MOOD = "comic";
const JACK = { tunic: "#1f1a24", trim: "#f2efe6", hair: "#ece8e0", hairStyle: "lion", trousers: "#1f1a24", sash: null };
const FOLK = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: i % 3 === 0 ? "tophat" : i % 3 === 1 ? "bonnet" : null, robe: i % 3 === 1, lady: i % 3 === 1, trousers: "#3a3a4a" });
function cheese(g, x, y, r, k = 1, t = 0) { // k = remaining fraction
  const h = r * 0.55;
  g.save(); g.translate(x, y);
  if (k > 0.02) { g.beginPath(); g.moveTo(-r, -h * k); g.lineTo(-r, 0); g.ellipse(0, 0, r, r * 0.22, 0, Math.PI, 0, true); g.lineTo(r, -h * k); g.closePath(); fillInk(g, "#e9a83a", 7); ell(g, 0, -h * k, r, r * 0.22, "#f6c95a", 7); for (let i = 0; i < 5; i++) ell(g, -r * 0.6 + i * r * 0.3, -h * k * 0.5 + (i % 2) * 14, 12, 9, "#d9902a", 0); }
  g.restore();
}
const lobby = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#e9e2cc"], [1, "#d9cfb0"]]); g.fillRect(-900, -900, 2900, 2600);
  for (let i = 0; i < 7; i++) column(g, -600 + i * 420, 1500, 110, 1300, "#f6f3ea", 6);
  rect(g, 380, 300, 320, 420, "#c9a35a", 7, 6); ell(g, 540, 510, 80, 100, "#f2efe6", 5);
  g.fillStyle = "#b8262f"; g.fillRect(-900, 1500, 2900, 1200); line(g, [[-900, 1500], [2000, 1500]], 6);
  paintGrain(g, -900, -900, 2900, 3600, 0.07);
};
const stinkLines = (g, x, y, t, n = 4, s = 1) => { for (let i = 0; i < n; i++) { const q = (t * 0.8 + i / n) % 1; g.save(); g.globalAlpha = (1 - q) * 0.9; line(g, [[x + i * 60 * s, y - q * 220 * s], [x + i * 60 * s + 20 * s, y - 40 * s - q * 220 * s], [x + i * 60 * s, y - 80 * s - q * 220 * s], [x + i * 60 * s + 20 * s, y - 120 * s - q * 220 * s]], 9 * s, "#8fbf3a"); g.restore(); } };
function buildShots() {
  const lb = cached("lobby", -900, -900, 2900, 3600, lobby, 1.0);
  const lbB = cached("lobbyB", -900, -900, 2900, 3600, lobby, 0.7, 5);
  // 0 — hook
  { const tJ = wt(0, "Andrew"), tF = wt(0, "fourteen-hundred-pound"), tL = wt(0, "lobby");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, lbB);
      layer(g, cam, 1, (g) => { cheese(g, 620, 1760, 340); guy(g, JACK, { x: 180, y: 1820, h: 600, expr: "proud", armR: [1.7, -0.3], blink: blinkAt(t, 1), t }); });
      label(g, "PRESIDENT ANDREW JACKSON", 540, 330, 56, t, tJ, tF - 0.05);
      stamp(g, "1,400 LB OF CHEESE", 540, 330, 92, t, tF, E(0) + 0.3);
      void tL;
    });
    ev(tF, "boom", 0.6); ev(tF, "ding");
  }
  // 1 — the gift; two years of aging
  { const t0 = S(1) - 0.1, tN = wt(1, "New"), tY = wt(1, "1835"), tA = wt(1, "aging"), tSt = wt(1, "stinking");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.95, 0], [9, 540, 1350, 1.05, 0]]);
      layer(g, cam, 0.7, lbB);
      layer(g, cam, 1, (g) => {
        const k = clamp((t - t0) / 1.6);
        const cx = lerp(-400, 600, k);
        rect(g, cx - 380, 1700, 760, 60, "#8a5a32", 5); for (const wx of [-280, 280]) ell(g, cx + wx, 1780, 60, 60, "#6b4024", 6);
        cheese(g, cx, 1700, 340);
        guy(g, { ...OUTF.farmer, tunic: "#3e78c2" }, { x: cx - 520, y: 1820, h: 520, expr: "proud", walk: k < 1 ? t * 2 : null, armR: [1.6, -0.2], blink: blinkAt(t, 3), t });
        if (t > tA) { const yr = 1835 + Math.min(2, Math.floor((t - tA) * 1.2)); rect(g, 380, 900, 320, 170, "#fff6e6", 7, 14); strokeText(g, String(yr), 540, 985, 84, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false }); }
        if (t > tSt - 0.2) stinkLines(g, cx - 200, 1500, t, 6, 1.4);
      });
      label(g, "A GIFT FROM NEW YORK", 540, 330, 62, t, tN, tY - 0.05);
      stamp(g, "1835", 540, 330, 150, t, tY - 0.05, tA - 0.05);
      label(g, "4 FEET WIDE", 540, 480, 70, t, wt(1, "four-foot-wide"), tA - 0.05, { fill: "#ffe08a" });
      label(g, "THE WHOLE BUILDING STANK", 540, 330, 58, t, tSt, E(1) + 0.2, { fill: "#d9f2a0" });
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom", 0.6); ev(tSt, "boing");
  }
  // 2 — free cheese for everyone
  { const t0 = S(2) - 0.1, tY = wt(2, "1837"), tI = wt(2, "invited");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [6, 540, 1330, 1.12, 0]]);
      layer(g, cam, 0.7, lbB);
      layer(g, cam, 1, (g) => {
        cheese(g, 700, 1760, 300); stinkLines(g, 520, 1560, t, 4, 1.1);
        guy(g, JACK, { x: 240, y: 1820, h: 600, expr: t > tI ? "happy" : "neutral", armR: t > tI ? [2.6, 0] : [0.3, 0.2], armL: t > tI ? [-2.6, 0] : [-0.3, 0.2], blink: blinkAt(t, 1), t });
        if (t > tI) { g.save(); g.translate(540, 980); g.scale(easeBack(clamp((t - tI) / 0.3)), easeBack(clamp((t - tI) / 0.3))); rect(g, -340, -100, 680, 200, "#fff6e6", 8, 16); strokeText(g, "FREE CHEESE!", 0, 0, 80, { fill: "#c0262e", lw: 0, shadow: false }); g.restore(); }
      });
      stamp(g, "1837", 540, 330, 150, t, tY - 0.05, tI - 0.05);
      label(g, "EVERYONE'S INVITED", 540, 330, 70, t, tI, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tY, "boom", 0.6); ev(tI, "ding"); ev(tI + 0.2, "cheer");
  }
  // 3 — 10,000 people, two hours
  { const t0 = S(3) - 0.1, tT = wt(3, "Ten"), tD = wt(3, "devoured"), tH = wt(3, "hours"), tC = wt(3, "carpets");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.85, 0], [tC - t0, 540, 1450, 1.0, 0], [10, 540, 1550, 1.1, 0]]);
      layer(g, cam, 0.7, lbB);
      layer(g, cam, 1, (g) => {
        const k = 1 - clamp((t - tD) / 2.4);
        cheese(g, 540, 1720, 340, k);
        for (let i = 0; i < 14; i++) { const x = -150 + (i % 7) * 230, y = 1680 + Math.floor(i / 7) * 180; guy(g, FOLK(i), { x, y, h: 380, dir: x < 540 ? 1 : -1, expr: i % 2 ? "laugh" : "happy", armR: [2.0 + Math.sin(t * 10 + i) * 0.4, -1.4], bob: -Math.abs(Math.sin(t * 8 + i)) * 4, blink: 0, t }); }
        if (t > tC - 0.2) for (let i = 0; i < 30; i++) ell(g, rnd(i) * 1300 - 100, 1880 + rnd(i * 2) * 200, 14, 8, "#e9a83a", 2);
      });
      stamp(g, "10,000 PEOPLE", 540, 330, 104, t, tT, tH - 0.1);
      stamp(g, "GONE IN 2 HOURS", 540, 330, 96, t, tH - 0.1, tC - 0.05);
      label(g, "CHEESY CARPETS FOR MONTHS", 540, 330, 56, t, tC, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tT, "cheer"); ev(tD, "laugh"); ev(tH, "boom", 0.5); ev(tC, "splat");
  }
}
