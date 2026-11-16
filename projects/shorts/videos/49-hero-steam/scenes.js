// 49 — Hero of Alexandria's Aeolipile
"use strict";
window.MOOD = "epic";
const HERO = { tunic: "#f3ecda", trim: "#3f74b8", hair: "#7a7a7a", beard: "#9a9a9a", robe: true };
const GUEST = (i) => ({ tunic: ["#c0392b", "#2f6f9a", "#e2b64b", "#6a9a45"][i % 4], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14"][i % 2], helmet: "laurel", hairUnder: true, robe: true, beard: i % 2 ? "#5a3b2a" : null });
const WORK = (i) => ({ tunic: "#a8907a", trim: "#7a6a5a", hair: "#2a1a14", trousers: "#7a6a5a" });
function aeolipile(g, x, y, s, t, speed = 1, steam = 1) {
  const u = s / 100;
  campfire(g, x, y + 20 * u, 40 * u, t);
  smoothPath(g, [[x - 60 * u, y - 40 * u], [x + 60 * u, y - 40 * u], [x + 50 * u, y], [x - 50 * u, y]]); fillInk(g, "#9a6a3a", 5);
  line(g, [[x - 50 * u, y - 40 * u], [x - 50 * u, y - 150 * u]], 6 * u, "#8a6a3a"); line(g, [[x + 50 * u, y - 40 * u], [x + 50 * u, y - 150 * u]], 6 * u, "#8a6a3a");
  const a = t * 6 * speed, cy = y - 150 * u;
  ell(g, x, cy, 40 * u, 40 * u, "#c9973f", 5); ell(g, x - 12 * u, cy - 12 * u, 10 * u, 7 * u, "#f2d36b", 0);
  for (const sd of [-1, 1]) { const ex = x + Math.cos(a) * 40 * u * sd, ey = cy + Math.sin(a) * 6 * u * sd; line(g, [[x + Math.cos(a) * 30 * u * sd, cy], [ex, ey], [ex, ey + 20 * u * sd]], 6 * u, "#a87a2a"); if (steam) for (let k = 0; k < 4; k++) { const q = (t * 2 + k / 4) % 1; g.save(); g.globalAlpha = (1 - q) * 0.7 * steam; ell(g, ex - sd * q * 60 * u, ey + 20 * u * sd + q * 10 * u, (8 + q * 20) * u, (6 + q * 14) * u, "#fff", 2); g.restore(); } }
}
const workshop = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#c9a87a"], [1, "#a8865a"]]); g.fillRect(-900, -900, 2900, 2600); for (let i = 0; i < 5; i++) column(g, -600 + i * 500, 1500, 90, 1100, "#efe6d2", 6); for (let i = 0; i < 5; i++) { rect(g, -300 + i * 300, 500, 60, 100, "#c98a5a", 4, 20); } g.fillStyle = "#8a6a4a"; g.fillRect(-900, 1500, 2900, 1000); line(g, [[-900, 1500], [2000, 1500]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const ws = cached("ws", -900, -900, 2900, 3400, workshop, 1.0);
  const wsB = cached("wsB", -900, -900, 2900, 3400, workshop, 0.7, 4);
  // 0 — hook
  { const tW = wt(0, "working"), tS = wt(0, "seventeen"), tI = wt(0, "Industrial");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.1, 0], [6, 540, 1250, 1.2, 0]]);
      layer(g, cam, 0.7, wsB);
      layer(g, cam, 1, (g) => aeolipile(g, 540, 1750, 300, t, 1.4));
      label(g, "A GREEK STEAM ENGINE", 540, 330, 70, t, tW - 0.3, tS - 0.05);
      stamp(g, "1,700 YEARS EARLY", 540, 330, 96, t, tS, E(0) + 0.3);
      void tI;
    });
    ev(0.2, "bubble"); ev(tS, "boom", 0.6);
  }
  // 1 — Hero of Alexandria builds the aeolipile
  { const t0 = S(1) - 0.1, tC = wt(1, "century"), tH = wt(1, "Hero"), tAe = wt(1, "aeolipile"), tCa = wt(1, "cauldron");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [10, 540, 1290, 1.08, 0]]);
      layer(g, cam, 0.8, ws);
      layer(g, cam, 1, (g) => { guy(g, HERO, { x: 280, y: 1840, h: 600, expr: t > tAe ? "proud" : "determined", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); aeolipile(g, 700, 1800, 260, t, t > tCa ? 0.3 : 0, t > tCa ? 0.4 : 0); });
      label(g, "~1ST CENTURY AD", 540, 330, 80, t, tC - 0.2, tH - 0.05, { font: "Cinzel" });
      label(g, "HERO OF ALEXANDRIA", 540, 330, 70, t, tH, tAe - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      stamp(g, "THE AEOLIPILE", 540, 330, 110, t, tAe, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tH, "pop"); ev(tAe, "ding"); ev(tCa, "bubble");
  }
  // 2 — the steam spins it
  { const t0 = S(2) - 0.1, tSp = wt(2, "spun");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.2, 0], [4, 540, 1200, 1.35, 0]]);
      layer(g, cam, 0.7, wsB);
      layer(g, cam, 1, (g) => aeolipile(g, 540, 1700, 340, t, 1 + clamp((t - t0) / 2) * 3, 1.2));
      if (t > tSp) speedLines(g, t, 18, "rgba(255,255,255,0.4)");
      stamp(g, "SPIN!", 540, 330, 130, t, tSp, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(t0, "whoosh", 0.6); ev(tSp, "whoosh");
  }
  // 3 — a party trick, not an engine
  { const t0 = S(3) - 0.1, tSl = wt(3, "slave"), tN = wt(3, "novelty"), tI = wt(3, "industrial");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [9, 540, 1300, 1.06, 0]]);
      layer(g, cam, 0.7, wsB);
      layer(g, cam, 1, (g) => {
        if (t < tN - 0.2) { for (let i = 0; i < 4; i++) { const x = lerp(-200, 1300, ((t - t0) * 0.15 + i * 0.25) % 1); guy(g, WORK(i), { x, y: 1840, h: 460, expr: "sad", walk: t * 1.2 + i * 0.3, armR: [2.8, 0.2], blink: 0, t }); ell(g, x + 10, 1400, 40, 60, "#c98a5a", 4); } }
        else { aeolipile(g, 540, 1700, 260, t, 2); for (let i = 0; i < 4; i++) guy(g, GUEST(i), { x: i < 2 ? 100 + i * 170 : 810 + (i - 2) * 170, y: 1840, h: 460, dir: i < 2 ? 1 : -1, expr: "laugh", armR: [2.0 + Math.sin(t * 9 + i) * 0.3, -1.4], hold: { r: "cup" }, blink: 0, t }); for (let i = 0; i < 4; i++) sparkle(g, 540 + Math.cos(i * 1.6) * 260, 1300 + Math.sin(i) * 120, 26, (t * 0.8 + i / 4) % 1); }
      });
      label(g, "LABOR WAS CHEAP", 540, 330, 86, t, tSl - 0.3, tN - 0.2, { fill: "#e6e0f2" });
      stamp(g, "JUST A PARTY TRICK", 540, 330, 88, t, tN, tI);
      label(g, "NOT AN ENGINE", 540, 330, 86, t, tI, 999, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.3 });
    ev(tSl, "drone", 0.4); ev(tN, "cheer"); ev(tN, "laugh", 0.5);
  }
}
