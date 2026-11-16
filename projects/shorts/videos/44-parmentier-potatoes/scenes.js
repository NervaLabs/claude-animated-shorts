// 44 — How Parmentier Tricked France Into Eating Potatoes
"use strict";
window.MOOD = "comic";
const PARM = { tunic: "#2f4f6f", trim: "#e7c15f", helmet: "wig", hair: "#ece8e0", hairUnder: true, trousers: "#e9e2cc", boots: "#1f1a24" };
const GUARD = { tunic: "#2f4f9f", trim: "#f2efe6", helmet: "bicorne", cockade: "#f6f3ea", trousers: "#f2efe6", boots: "#1f1a24" };
const PEAS = (i) => ({ tunic: ["#7a5a3a", "#9a4a3a", "#5a7a4a", "#8a6a4a"][i % 4], trim: "#d9c08a", helmet: i % 2 ? "coif" : "cap", hatCol: ["#f3ecda", "#8a6a3a"][i % 2], robe: i % 2 === 1, lady: i % 2 === 1, trousers: "#5a4a3a", beard: i % 4 === 0 ? "#5a3b2a" : null });
const field = (night) => (g) => { sky3(g, -900, -900, 2900, 2100, night ? "#0d1236" : "#5a8ad0", night ? "#232a5a" : "#b3d2ee", night ? "#343a6a" : "#efe6d0"); if (night) ell(g, 900, 300, 70, 70, "#f6f2d8", 0); smoothHills(g, -900, 2000, 1150, 120, night ? "#2a3a2a" : "#8aa05a", 3, 5); ground(g, 1250, night ? "#3a3a2a" : "#8a6a3a", -900, 2000); for (let r = 0; r < 5; r++) plantRow(g, -800, 1900, 1350 + r * 140, 14, 0, night ? "#2f4a2a" : "#5f9a48"); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const day = cached("pday", -900, -900, 2900, 3400, field(false), 1.0);
  const dayB = cached("pdayB", -900, -900, 2900, 3400, field(false), 0.7, 5);
  const nt = cached("pnight", -900, -900, 2900, 3400, field(true), 1.0);
  // 0 — hook
  { const tR = wt(0, "refused"), tA = wt(0, "armed");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, dayB);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) potato(g, 400 + i * 120, 1700, 46, i); for (let i = 0; i < 2; i++) { guy(g, GUARD, { x: i ? 900 : 180, y: 1820, h: 560, dir: i ? -1 : 1, expr: "stern", armR: [1.3, -0.3], blink: blinkAt(t, i), t }); musket(g, i ? 820 : 260, 1440, i ? -1.75 : -1.4, 380); } if (t > tR) for (let i = 0; i < 2; i++) { g.save(); g.globalAlpha = 0.9; guy(g, PEAS(i), { x: 480 + i * 160, y: 1350, h: 220, expr: "sly", look: 1, blink: 0, t, shadow: false }); g.restore(); } });
      label(g, "NOBODY WANTED POTATOES", 540, 330, 60, t, tR, tA - 0.05);
      stamp(g, "SO HE GUARDED THEM", 540, 330, 90, t, tA, E(0) + 0.3);
    });
    ev(tR, "pop"); ev(tA, "drums");
  }
  // 1 — leprosy fears; livestock food
  { const t0 = S(1) - 0.1, tY = wt(1, "1700s"), tL = wt(1, "leprosy"), tLi = wt(1, "livestock");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [7, 540, 1340, 1.12, 0]]);
      layer(g, cam, 0.7, dayB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 2; i++) guy(g, PEAS(i), { x: 200 + i * 220, y: 1820, h: 520, expr: "sick", lean: -12, armL: [-2.2, -0.4], armR: [2.2, 0.4], blink: blinkAt(t, i), t });
        potato(g, 700, 1640, 70, 4); if (t > tL - 0.1) shout(g, 340, 1060, "EW!", 70, clamp((t - tL) / 0.12), "#2f8a4a");
        if (t > tLi - 0.1) { pig(g, { x: 860, y: 1820, h: 180, dir: -1 }); potato(g, 760, 1780, 30, 6); }
      });
      stamp(g, "THE 1700s", 540, 330, 104, t, tY - 0.05, tL - 0.05);
      label(g, "“THEY CAUSE LEPROSY!”", 540, 330, 66, t, tL, tLi - 0.05, { fill: "#d9f2a0" });
      label(g, "PIG FOOD ONLY", 540, 330, 86, t, tLi, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tL, "boing"); ev(tLi, "oink");
  }
  // 2 — Parmentier's plan: guards by day, gone by night
  { const t0 = S(2) - 0.1, tAp = wt(2, "Antoine-Augustin"), tPl = wt(2, "planted"), tSu = wt(2, "surrounded"), tD = wt(2, "day"), tN = wt(2, "night");
    shot(t0, (g, t, lt) => {
      const isN = t > tN - 0.3;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [11, 540, 1350, 1.06, 0]]);
      layer(g, cam, 0.8, isN ? nt : day);
      layer(g, cam, 1, (g) => {
        if (t < tSu - 0.1) { guy(g, PARM, { x: 400, y: 1820, h: 600, expr: "sly", armR: [1.6, 0.6], blink: blinkAt(t, 1), t }); if (t > tPl - 0.1) for (let i = 0; i < 3; i++) potato(g, 640 + i * 100, 1780 - Math.max(0, 1 - (t - tPl) * 2) * 200, 30, i); }
        else if (!isN) { for (let i = 0; i < 4; i++) { guy(g, GUARD, { x: 80 + i * 300, y: 1800 + (i % 2) * 40, h: 500, expr: "stern", blink: blinkAt(t, i), t }); musket(g, 150 + i * 300, 1440 + (i % 2) * 40, -1.4, 340); } }
        else { for (let i = 0; i < 4; i++) guy(g, GUARD, { x: lerp(80 + i * 300, -600 - i * 100, clamp((t - tN + 0.3) / 1.6)), y: 1800 + (i % 2) * 40, h: 500, dir: -1, expr: "sly", walk: t * 2, blink: 0, t }); }
      });
      label(g, "ANTOINE-AUGUSTIN PARMENTIER", 540, 330, 52, t, tAp, tPl - 0.05, { font: "Cinzel" });
      label(g, "ARMED GUARDS BY DAY", 540, 330, 66, t, tD - 0.6, tN - 0.3);
      stamp(g, "...GONE AT NIGHT", 540, 330, 96, t, tN, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tPl, "pop"); ev(tSu, "drums"); ev(tN, "whoosh", 0.5);
  }
  // 3 — the potato heist, and potatoes everywhere
  { const t0 = S(3) - 0.1, tV = wt(3, "valuable"), tSn = wt(3, "snuck"), tSt = wt(3, "stole"), tE = wt(3, "everywhere");
    shot(t0, (g, t, lt) => {
      const fields = t > tE - 0.4;
      const cam = fields ? camAt(t - tE + 0.4, [[0, 540, 1300, 1.0, 0], [1.2, 540, 1200, 0.7, 0], [6, 540, 1200, 0.72, 0]]) : camAt(lt, [[0, 540, 1350, 1.05, 0], [8, 540, 1350, 1.1, 0]]);
      layer(g, cam, 0.8, fields ? day : nt);
      layer(g, cam, 1, (g) => {
        if (!fields) { if (t < tSn) { guy(g, PEAS(0), { x: 540, y: 1820, h: 560, expr: "sly", look: 1, blink: blinkAt(t, 1), t }); g.save(); g.globalAlpha = clamp((t - tV) / 0.2); bubble(g, 760, 1000, 300, 200, 620, 1200, "#fff", 6); potato(g, 720, 990, 40, 2); strokeText(g, "$$$", 820, 990, 50, { fill: "#2f8a4a", lw: 0, shadow: false }); g.restore(); } else for (let i = 0; i < 4; i++) { const x = lerp(-300 + i * 120, 1300 + i * 120, clamp((t - tSn - i * 0.1) / 3)); guy(g, PEAS(i), { x, y: 1820 - (i % 2) * 40, h: 460, expr: "sly", walk: t * 1.4, lean: -10, armR: t > tSt ? [1.2, 1.0] : [0.4, 0.2], blink: blinkAt(t, i), t }); if (t > tSt) potato(g, x + 50, 1500 - (i % 2) * 40, 34, i); } }
        else for (let r = 0; r < 6; r++) for (let i = 0; i < 9; i++) { const k = easeBack(clamp((t - tE + 0.4 - (r + i) * 0.05) / 0.4)); if (k <= 0) continue; g.save(); g.translate(-400 + i * 240, 1450 + r * 130); g.scale(k, k); plantRow(g, -40, 40, 0, 2, t, "#5f9a48"); g.restore(); }
      });
      label(g, "“IT MUST BE VALUABLE!”", 540, 330, 70, t, tV, tSn - 0.05);
      label(g, "THE GREAT POTATO HEIST", 540, 330, 64, t, tSn, tE - 0.4);
      stamp(g, "POTATOES EVERYWHERE", 540, 330, 86, t, tE, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tV, "ding"); ev(tSn, "pop", 0.5); ev(tSt, "laugh", 0.5); ev(tE, "build"); ev(tE, "choir", 0.5);
  }
}
