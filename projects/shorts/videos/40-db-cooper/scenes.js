// 40 — The 1971 D.B. Cooper Hijacking (original cartoon depiction)
"use strict";
window.MOOD = "eerie";
HATS.coopShades = (g, rx, ry, lw) => { rect(g, -rx * 0.8, -ry * 0.24, rx * 0.64, ry * 0.32, "#1c1422", lw * 0.4, 8); rect(g, rx * 0.16, -ry * 0.24, rx * 0.64, ry * 0.32, "#1c1422", lw * 0.4, 8); line(g, [[-rx * 0.16, -ry * 0.1], [rx * 0.16, -ry * 0.1]], 3); };
const COOP = { tunic: "#2a2a34", trim: "#f2efe6", helmet: "coopShades", hair: "#2a1a14", hairUnder: true, trousers: "#2a2a34", sash: "#1c1422" };
const FA = { tunic: "#2f5f9f", trim: "#f2efe6", helmet: "cap", hatCol: "#2f5f9f", hair: "#c58a3d", robe: true, lady: true };
const cabin = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#d9d2c2"], [1, "#b9b2a2"]]); g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 4; i++) ell(g, -100 + i * 380, 700, 70, 90, "#2a3060", 7); g.fillStyle = "#6a6a7a"; g.fillRect(-500, 1550, 2100, 900); line(g, [[-500, 1550], [1600, 1550]], 6); };
const nightSky = (g) => { sky3(g, -900, -1200, 2900, 3600, "#06081e", "#1f2650", "#3a4070"); for (let i = 0; i < 70; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.3 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 2900 - 900, rnd(i * 7) * 3000 - 1200, 3, 3); } g.globalAlpha = 1; for (let r = 0; r < 3; r++) for (let i = 0; i < 18; i++) { const x = -880 + i * 170 + (r % 2) * 80, y = 1900 + r * 120; poly(g, [[x - 40, y], [x, y - 160], [x + 40, y]], "#0f1a14", 3); } };
function buildShots() {
  const cb = cached("cabin", -500, -500, 2100, 3000, cabin, 1.0);
  const ns = cached("nsky", -900, -1200, 2900, 3600, nightSky, 0.8);
  // 0 — hook
  { const tY = wt(0, "1971"), tTw = wt(0, "two"), tV = wt(0, "vanished");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.9, 0], [7, 540, 1100, 0.96, 0]]);
      layer(g, cam, 1, (g) => {
        ns(g); jet(g, { x: 540, y: 700, h: 300, stairs: 1, col: "#d9dfe6" });
        if (t > tTw - 0.2) { const k = clamp((t - tTw + 0.2) / 2.5); const x = 60 - k * 100, y = 760 + k * 900; if (k > 0.25) { g.beginPath(); g.arc(x, y - 200, 160, Math.PI, 0); fillInk(g, "#e9e2cc", 6); for (let i = -2; i <= 2; i++) line(g, [[x + i * 60, y - 200], [x, y - 20]], 3); } g.save(); g.globalAlpha = t > tV ? 1 - clamp((t - tV) / 0.6) : 1; guy(g, COOP, { x, y: y + 60, h: 200, expr: "neutral", hold: { r: "bag" }, armR: [1.2, 0], t, shadow: false }); g.restore(); }
      });
      rain(g, t, 0.35);
      stamp(g, "1971", 540, 330, 150, t, tY - 0.05, tTw - 0.05);
      stamp(g, "$200,000", 540, 330, 120, t, tTw, tV - 0.05);
      label(g, "...AND VANISHED", 540, 330, 86, t, tV, E(0) + 0.3, { fill: "#cfe0ff" });
    }, { type: "cut", d: 0 });
    ev(0.2, "plane"); ev(tTw, "cash"); ev(tV, "whoosh"); ev(tV, "drone", 0.5);
  }
  // 1 — the note
  { const t0 = S(1) - 0.1, tD = wt(1, "Dan"), tF = wt(1, "flight"), tN = wt(1, "note"), tB = wt(1, "bomb");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [tB - t0, 600, 1250, 1.2, 0], [8, 600, 1250, 1.22, 0]]);
      layer(g, cam, 0.7, cb);
      layer(g, cam, 1, (g) => {
        rect(g, 60, 1400, 380, 300, "#3f5f8f", 7, 20); rect(g, 60, 1150, 120, 400, "#3f5f8f", 7, 20);
        guy(g, COOP, { x: 250, y: 1640, h: 520, sit: true, expr: "neutral", armR: t > tN - 0.2 ? [1.6, -0.3] : [0.6, 0.6], blink: 0, t, shadow: false });
        guy(g, FA, { x: 760, y: 1820, h: 580, dir: -1, expr: t > tB ? "shock" : "happy", armR: t > tN ? [1.6, -0.3] : [0.3, 0.2], blink: blinkAt(t, 3), t });
        if (t > tN - 0.2) { const k = clamp((t - tN + 0.2) / 0.4); g.save(); g.translate(lerp(420, 600, k), 1300); g.rotate(-0.06); rect(g, -110, -70, 220, 140, "#f6f3ea", 5, 4); if (t > tB - 0.1) { strokeText(g, "I HAVE", 0, -20, 34, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "A BOMB", 0, 30, 34, { fill: "#c0262e", lw: 0, shadow: false }); } g.restore(); }
      });
      label(g, "“DAN COOPER”", 540, 330, 86, t, tD, tN - 0.05, { font: "Cinzel" });
      stamp(g, "A NOTE", 540, 330, 120, t, tN, tB - 0.05);
      label(g, "DARK SUIT · SUNGLASSES", 540, 470, 52, t, t0 + 0.2, tD);
    }, { type: "flash", d: 0.2 });
    ev(tN, "pop"); ev(tB, "sting", 0.6); ev(tB + 0.1, "gasp");
  }
  // 2 — ransom, parachutes, the airstair jump
  { const t0 = S(2) - 0.1, tR = wt(2, "ransom"), tPa = wt(2, "parachutes"), tSe = wt(2, "Seattle"), tM = wt(2, "Mexico"), tL = wt(2, "lowered"), tJ = wt(2, "jumped");
    shot(t0, (g, t, lt) => {
      const ground = t < tM - 0.2;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [14, 540, 1250, 1.06, 0]]);
      if (ground) {
        layer(g, cam, 1, (g) => { sky3(g, -500, -500, 2100, 2000, "#3a4060", "#6a7090", "#9aa0b0"); g.fillStyle = "#5a5f66"; g.fillRect(-500, 1500, 2100, 1000); jet(g, { x: 600, y: 1300, h: 340, col: "#d9dfe6" }); if (t > tR - 0.1) { guy(g, { tunic: "#3a3a44", trim: "#f2efe6", helmet: "cap", hatCol: "#3a3a44", trousers: "#3a3a44" }, { x: 200, y: 1820, h: 500, expr: "neutral", armR: [1.6, -0.3], hold: { r: "bag" }, blink: blinkAt(t, 4), t }); strokeText(g, "$200,000", 200, 1180, 46, { fill: "#d9f2a0" }); } if (t > tPa - 0.1) for (let i = 0; i < 4; i++) { rect(g, 360 + i * 110, 1700, 90, 110, "#e2b64b", 5, 14); line(g, [[380 + i * 110, 1720], [430 + i * 110, 1720]], 4); } });
        label(g, "RANSOM", 540, 330, 96, t, tR, tPa - 0.05, { fill: "#d9f2a0" });
        label(g, "4 PARACHUTES", 540, 330, 86, t, tPa, tSe - 0.05);
        label(g, "SEATTLE", 540, 330, 96, t, tSe, tM - 0.2, { font: "Cinzel", fill: "#cfe0ff" });
      } else {
        layer(g, cam, 1, (g) => { ns(g); const st = clamp((t - tL) / 0.6); jet(g, { x: 640, y: 800, h: 360, stairs: st, col: "#d9dfe6" }); if (t > tJ - 0.1) { const k = clamp((t - tJ + 0.1) / 1.4); guy(g, COOP, { x: 60 - k * 80, y: 920 + k * 700, h: 220, expr: "neutral", armL: [-2.6, 0], armR: [2.6, 0], t, shadow: false }); } });
        rain(g, t, 0.55);
        label(g, "→ MEXICO", 540, 330, 96, t, tM - 0.2, tL - 0.05, { font: "Cinzel" });
        label(g, "REAR STAIRS DOWN", 540, 330, 76, t, tL, tJ - 0.1);
        stamp(g, "HE JUMPED", 540, 330, 120, t, tJ, E(2) + 0.2);
      }
    }, { type: "xfade", d: 0.3 });
    ev(tR, "cash"); ev(tM, "plane"); ev(tL, "creak"); ev(tJ, "whoosh"); ev(tJ, "rain");
  }
  // 3 — never found
  { const t0 = S(3) - 0.1, tN = wt(3, "never");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1400, 1.0, 0], [3, 540, 1450, 1.06, 0]]);
      layer(g, cam, 1, (g) => { ns(g); shout(g, 540, 1300, "?", 90, clamp((t - tN) / 0.2), "#1c1422"); });
      rain(g, t, 0.4);
      stamp(g, "NEVER FOUND", 540, 330, 120, t, tN, 999, { fill: "#cfe0ff" });
    }, { type: "xfade", d: 0.3 });
    ev(tN, "sting", 0.5);
  }
}
