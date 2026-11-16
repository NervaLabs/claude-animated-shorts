// 08 — The Football War (1969)
"use strict";
window.MOOD = "war";
const SLV = { v: null }, FL_SLV = ["#1f4f9f", "#f6f3ea", "#1f4f9f"];
const FL_HON = (g, w, h) => { [0, 1, 2].forEach((i) => { g.fillStyle = i === 1 ? "#f6f3ea" : "#2f6fcf"; g.fillRect(-w, i === 0 ? -h : (h * i) / 3, w * 3, i === 0 ? h * 4 / 3 : i === 2 ? h * 2 : h / 3 + 1); }); [[0.5, 0.5], [0.35, 0.42], [0.65, 0.42], [0.35, 0.58], [0.65, 0.58]].forEach(([x, y]) => { g.fillStyle = "#2f6fcf"; g.beginPath(); g.arc(w * x, h * y, h * 0.04, 0, TAU); g.fill(); }); };
const PL_S = { tunic: "#1f4f9f", trim: "#f6f3ea", hair: "#2a1a14", trousers: "#f6f3ea", boots: "#1f1a24" };
const PL_H = { tunic: "#f6f3ea", trim: "#2f6fcf", hair: "#2a1a14", trousers: "#2f6fcf", boots: "#1f1a24" };
const stadium = (g) => {
  sky3(g, -900, -900, 2900, 2000, "#3f78c8", "#8ec0ea", "#e9eedc");
  for (let r = 0; r < 7; r++) { const y = 650 + r * 70; rect(g, -900, y, 2900, 70, r % 2 ? "#8a8f96" : "#7a7f86", 4); }
  crowdHeads(g, -880, 1980, 640, 7, 8, 0.9);
  g.fillStyle = vgrad(g, 1150, 2400, [[0, "#5f9a48"], [1, "#3f7a32"]]); g.fillRect(-900, 1150, 2900, 1400); line(g, [[-900, 1150], [2000, 1150]], 6);
  for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; g.fillRect(-900 + i * 500, 1150, 500, 1400); }
  line(g, [[540, 1150], [540, 2500]], 8, "#f6f3ea"); g.beginPath(); g.ellipse(540, 1600, 260, 120, 0, 0, TAU); g.lineWidth = 8; g.strokeStyle = "#f6f3ea"; g.stroke();
  paintGrain(g, -900, -900, 2900, 3400, 0.06);
};
function buildShots() {
  const st = cached("stad", -900, -900, 2900, 3400, stadium, 1.0);
  const stB = cached("stadB", -900, -900, 2900, 3400, stadium, 0.7, 5);
  // 0 — hook: one match → a war
  { const tY = wt(0, "1969"), tW = wt(0, "war"), tF = wt(0, "four-day");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1450, 1.2, 0], [tW - 0.1, 540, 1400, 1.3, 0], [tW + 0.3, 540, 1350, 1.15, -4], [7, 540, 1350, 1.18, -4]]);
      layer(g, cam, 0.7, stB);
      layer(g, cam, 1, (g) => {
        guy(g, PL_S, { x: 320, y: 1800, h: 540, expr: "determined", armR: [0.8, 0.3], lean: -6, blink: blinkAt(t, 1), t });
        guy(g, PL_H, { x: 780, y: 1800, h: 540, dir: -1, expr: "determined", lean: -6, blink: blinkAt(t, 2), t });
        const bt = t - tW;
        if (bt < 0) football(g, 540, 1760, 46, t * 2);
        else { football(g, 540, 1760 - bt * 900, 46 + bt * 40, t * 9); line(g, [[540, 1760 - bt * 900 + 50], [540 + Math.sin(t * 30) * 8, 1760 - bt * 900 + 90]], 6, "#c9a35a"); flame(g, 540, 1760 - bt * 900 - 50, 14, t); }
        if (bt > 0.6) boomFx(g, 540, 1760 - 0.6 * 900, 320, (bt - 0.6) / 0.6);
      });
      stamp(g, "1969", 540, 330, 150, t, tY - 0.05, tW - 0.05);
      stamp(g, "A 4-DAY WAR", 540, 330, 110, t, tF, E(0) + 0.3);
    });
    ev(tY, "boom"); ev(tW, "whoosh"); ev(tW + 0.6, "boom"); KICKS.push({ t: tW + 0.6, a: 22 });
  }
  // 1 — tensions, then the qualifiers
  { const t0 = S(1) - 0.1, tTe = wt(1, "Tensions"), tES = wt(1, "Salvador"), tHo = wt(1, "Honduras"), tN = wt(1, "national");
    shot(t0, (g, t, lt) => {
      const match = t > tN - 0.2;
      const cam = match ? camAt(t - tN, [[0, 540, 1350, 0.9, 0], [6, 540, 1350, 0.95, 0]]) : camAt(lt, [[0, 540, 1200, 1.0, 0], [6, 540, 1200, 1.05, 0]]);
      if (!match) {
        layer(g, cam, 1, (g) => {
          g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000);
          pole(g, 120, 1500, 700, FL_SLV, t, 280, 180); pole(g, 620, 1500, 700, FL_HON, t, 280, 180);
          const k = ss((t - tTe) / 2.4); rect(g, 470, 1050, 60, 420, "#f6f3ea", 6, 30); ell(g, 500, 1490, 50, 50, "#c0262e", 6); rect(g, 482, 1470 - 400 * (0.2 + 0.8 * k), 36, 400 * (0.2 + 0.8 * k), "#c0262e", 0, 18);
        });
        label(g, "IMMIGRATION · LAND REFORM", 540, 330, 56, t, tTe, tES);
        label(g, "EL SALVADOR", 300, 420, 60, t, tES, tN, { font: "Cinzel", fill: "#cfe0ff" });
        label(g, "HONDURAS", 800, 520, 60, t, tHo, tN, { font: "Cinzel", fill: "#cfe0ff" });
      } else {
        layer(g, cam, 0.8, st);
        layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) { const x = 200 + i * 230 + Math.sin(t * 2 + i) * 40; guy(g, i % 2 ? PL_H : PL_S, { x, y: 1700 + (i % 2) * 60, h: 380, dir: i % 2 ? -1 : 1, expr: "determined", walk: t * 2.4 + i * 0.25, blink: blinkAt(t, i), t }); } football(g, 540 + Math.sin(t * 2.5) * 260, 1740, 30, t * 6); });
        label(g, "WORLD CUP QUALIFIERS", 540, 330, 62, t, tN, E(1) + 0.2);
      }
    }, { type: "flash", d: 0.2 });
    ev(tTe, "drone", 0.5); ev(tN, "cheer");
  }
  // 2 — riots, the tiebreaker, relations cut
  { const t0 = S(2) - 0.1, tR = wt(2, "Riots"), tTh = wt(2, "third"), tD = wt(2, "diplomatic"), tC = wt(2, "collapsed");
    shot(t0, (g, t, lt) => {
      const phase = t < tTh - 0.15 ? 0 : t < tD - 0.1 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [9, 540, 1280, 1.08, 0]]);
      layer(g, cam, 0.8, phase === 2 ? (g) => { g.fillStyle = "#3a2a3a"; g.fillRect(-500, -500, 2100, 3000); } : stB);
      layer(g, cam, 1, (g) => {
        if (phase === 0) { for (let i = 0; i < 4; i++) dust(g, 200 + i * 220, 1650, 180, ((t * 1.3 + i * 0.25) % 1), i + Math.floor(t * 1.3), "#e9dcc0"); for (let i = 0; i < 6; i++) guy(g, i % 2 ? PL_H : PL_S, { x: 80 + i * 180, y: 1800 + (i % 2) * 40, h: 360, dir: i % 2 ? -1 : 1, expr: "shout", armR: [2.6 + Math.sin(t * 9 + i) * 0.3, 0], blink: 0, t }); }
        if (phase === 1) { rect(g, 140, 950, 800, 420, "#1f1a24", 8, 18); strokeText(g, "EL SALVADOR  3", 540, 1080, 66, { fill: "#ffe08a", lw: 0, shadow: false }); strokeText(g, "HONDURAS  2", 540, 1200, 66, { fill: "#cfe0ff", lw: 0, shadow: false }); strokeText(g, "TIEBREAKER", 540, 1320, 40, { fill: "#fff", lw: 0, shadow: false }); }
        if (phase === 2) { const k = clamp((t - tC) / 0.3); for (const sd of [-1, 1]) { g.save(); g.translate(540 + sd * k * 120, 1300); g.rotate(sd * k * 0.4); line(g, [[sd * 20, 0], [sd * 420, 0]], 26, "#d9a441"); g.restore(); } guy(g, PL_S, { x: 160, y: 1800, h: 520, expr: "angry", t }); guy(g, PL_H, { x: 920, y: 1800, h: 520, dir: -1, expr: "angry", t }); if (k > 0) sparkle(g, 540, 1300, 60, k); }
      });
      label(g, "RIOTS", 540, 330, 110, t, tR, tTh - 0.15, { fill: "#ffd0c0" });
      label(g, "RELATIONS: CUT", 540, 330, 86, t, tC, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tR, "warcry"); ev(tTh, "cheer"); ev(tC, "crack");
  }
  // 3 — airstrikes and invasion
  { const t0 = S(3) - 0.1, tA = wt(3, "airstrikes"), tG = wt(3, "ground");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 0.9, 0], [6, 540, 1250, 0.98, 2]]);
      layer(g, cam, 0.7, (g) => { sky3(g, -800, -800, 2700, 2000, "#6a8fc0", "#c9d8e6", "#efe6c8"); smoothHills(g, -800, 1900, 1200, 220, "#6f8a4a", 4, 5); ground(g, 1300, "#8aa05a", -800, 1900); line(g, [[540, 1300], [540, 2400]], 8, "rgba(255,255,255,0.6)"); });
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 3; i++) plane(g, { x: lerp(-400, 1500, clamp((t - tA + 0.6 - i * 0.3) / 2.6)), y: 700 + i * 120, h: 160, col: "#6a7a8a", t });
        if (t > tA) for (let k = 0; k < 4; k++) boomFx(g, 700 + k * 120, 1250, 110, (t - tA - 0.6 - k * 0.3) / 0.5);
        if (t > tG - 0.2) for (let i = 0; i < 7; i++) guy(g, { ...WW.gi, tunic: "#5a6a4a" }, { x: lerp(-200, 900, clamp((t - tG - i * 0.12) / 3)) - i * 60, y: 1780 + (i % 2) * 50, h: 330, expr: "determined", walk: t * 2.2 + i * 0.3, armR: [1.3, -0.3], t, blink: 0 });
      });
      label(g, "AIRSTRIKES", 540, 330, 96, t, tA, tG - 0.05);
      label(g, "INVASION", 540, 330, 96, t, tG, E(3) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(tA - 0.4, "plane"); for (let k = 0; k < 4; k++) ev(tA + 0.6 + k * 0.3, "boom", 0.6); KICKS.push({ t: tA + 0.6, a: 14 });
  }
  // 4 — the toll, and a ceasefire
  { const t0 = S(4) - 0.1, tT = wt(4, "three"), tC = wt(4, "ceasefire");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.1, 0]]);
      layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#2a2a3a"], [1, "#141420"]]); g.fillRect(-500, -500, 2100, 3000); });
      layer(g, cam, 1, (g) => {
        if (t < tC - 0.1) { for (let i = 0; i < 3; i++) { const x = 300 + i * 240; rect(g, x - 18, 1300, 36, 140, "#f2efe6", 5, 4); flame(g, x, 1290, 18, t + i); } }
        else { const k = clamp((t - tC) / 0.6); guy(g, { ...WW.general, tunic: "#1f4f9f", helmet: "peaked", hatCol: "#1f4f9f" }, { x: 330, y: 1760, h: 520, expr: "neutral", armR: [1.6, -0.2], t }); guy(g, { ...WW.general, tunic: "#5a6a4a", helmet: "peaked", hatCol: "#5a6a4a" }, { x: 750, y: 1760, h: 520, dir: -1, expr: "neutral", armR: [1.6, -0.2], t }); const dy = 900 - k * 120 + Math.sin(t * 4) * 10; ell(g, 540, dy, 60, 34, "#fff", 5); ell(g, 590, dy - 22, 22, 20, "#fff", 4); for (const sd of [-1, 1]) ell(g, 540 + sd * 34, dy - 20 - Math.abs(Math.sin(t * 9)) * 30, 50, 18, "#fff", 4, sd * 0.6); }
      });
      label(g, "~3,000 DEAD", 540, 330, 86, t, tT, tC - 0.1, { font: "Cinzel", fill: "#e6e0f2" });
      stamp(g, "CEASEFIRE", 540, 330, 120, t, tC, 999);
    }, { type: "xfade", d: 0.4 });
    ev(tT, "drone"); ev(tC, "choir", 0.6);
  }
}
