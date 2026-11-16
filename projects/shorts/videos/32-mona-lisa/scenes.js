// 32 — The 1911 Theft of the Mona Lisa
"use strict";
window.MOOD = "comic";
const PER = { tunic: "#f2efe6", trim: "#c9c4b8", helmet: "cap", hatCol: "#5a5a6a", trousers: "#3a3a4a", moust: true, beard: null, hair: "#2a1a14" };
const VIS = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: ["bowler", "bonnet", "tophat", null][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
/** a simple portrait in the style of a Renaissance painting (public-domain subject) */
function portrait(g, x, y, s) {
  picFrame(g, x, y, 300 * s, 420 * s, (g) => {
    g.fillStyle = vgrad(g, y - 210 * s, y + 210 * s, [[0, "#6a7a5a"], [1, "#3a4a32"]]); g.fillRect(x - 160 * s, y - 220 * s, 320 * s, 440 * s);
    smoothHills(g, x - 160 * s, x + 160 * s, y - 20 * s, 60 * s, "#7a8a6a", 3, 0);
    smoothPath(g, [[x - 110 * s, y + 220 * s], [x - 90 * s, y + 20 * s], [x, y - 10 * s], [x + 90 * s, y + 20 * s], [x + 110 * s, y + 220 * s]]); fillInk(g, "#3a2a1e", 3 * s);
    smoothPath(g, [[x - 70 * s, y - 40 * s], [x - 60 * s, y - 150 * s], [x, y - 175 * s], [x + 60 * s, y - 150 * s], [x + 70 * s, y - 40 * s], [x + 40 * s, y + 10 * s], [x - 40 * s, y + 10 * s]]); fillInk(g, "#2a1a14", 3 * s);
    ell(g, x, y - 90 * s, 42 * s, 55 * s, "#e9c49a", 3 * s);
    g.beginPath(); g.arc(x - 14 * s, y - 98 * s, 3 * s, 0, TAU); g.arc(x + 14 * s, y - 98 * s, 3 * s, 0, TAU); g.fillStyle = INK; g.fill();
    g.beginPath(); g.arc(x, y - 72 * s, 12 * s, 0.25, Math.PI - 0.25); g.lineWidth = 2.4 * s; g.strokeStyle = INK; g.stroke();
    ell(g, x, y + 120 * s, 50 * s, 20 * s, "#e9c49a", 2 * s);
  });
}
const louvre = (g) => {
  g.fillStyle = vgrad(g, -300, 1700, [[0, "#7a4a3a"], [1, "#a8786a"]]); g.fillRect(-900, -900, 2900, 2600);
  for (let i = 0; i < 4; i++) rect(g, -800 + i * 800, 200, 180, 1100, "#e9dcc0", 6);
  g.fillStyle = "#6b4a3a"; g.fillRect(-900, 1550, 2900, 1000); line(g, [[-900, 1550], [2000, 1550]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.08);
};
function buildShots() {
  const lv = cached("louvre", -900, -900, 2900, 3400, louvre, 1.0);
  const lvB = cached("louvreB", -900, -900, 2900, 3400, louvre, 0.7, 4);
  // 0 — hook: famous because it was stolen
  { const tF = wt(0, "famous"), tS = wt(0, "stole");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.1, 0], [5, 540, 1150, 1.2, 0]]);
      layer(g, cam, 0.7, lvB);
      layer(g, cam, 1, (g) => { if (t < tS - 0.1) portrait(g, 540, 1050, 1.3); else { for (const [dx, dy] of [[-200, -280], [200, -280], [-200, 280], [200, 280]]) ell(g, 540 + dx, 1050 + dy, 10, 10, "#4a4a52", 3); rect(g, 340, 760, 400, 580, null, 4, 4); } for (let i = 0; i < 4; i++) guy(g, VIS(i), { x: 120 + i * 280, y: 1820, h: 420, expr: t > tS ? "shock" : "happy", look: -0.6, headTilt: -8, blink: blinkAt(t, i), t }); });
      label(g, "THE WORLD'S MOST FAMOUS PAINTING", 540, 330, 48, t, tF - 0.3, tS - 0.05);
      stamp(g, "...BECAUSE IT WAS STOLEN", 540, 330, 72, t, tS, E(0) + 0.3);
    });
    ev(tS, "sting", 0.6); ev(tS + 0.1, "gasp");
  }
  // 1 — August 1911: the closet, the smock, the walk-out
  { const t0 = S(1) - 0.1, tA = wt(1, "August"), tV = wt(1, "Vincenzo"), tC = wt(1, "closet"), tU = wt(1, "unhooked"), tSm = wt(1, "smock"), tW = wt(1, "walked");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tU - t0, 540, 1250, 1.1, 0], [16, 540, 1250, 1.12, 0]]);
      layer(g, cam, 0.7, lv);
      layer(g, cam, 1, (g) => {
        const off = t > tU;
        if (!off) portrait(g, 700, 1000, 0.9); else for (const [dx, dy] of [[-140, -190], [140, -190]]) ell(g, 700 + dx, 1000 + dy, 8, 8, "#4a4a52", 3);
        rect(g, -100, 900, 260, 650, "#5a3b2a", 6, 6); // closet door
        const night = t > tC && t < tU; if (night) { g.save(); g.globalAlpha = 0.45; g.fillStyle = "#0d1236"; g.fillRect(-900, -900, 2900, 3400); g.restore(); }
        const px = t < tC ? lerp(-300, 30, clamp((t - tV) / 1)) : t < tU ? 30 : t < tW ? lerp(30, 560, clamp((t - tU) / 0.6)) : lerp(560, 1500, clamp((t - tW) / 2));
        guy(g, PER, { x: px, y: 1820, h: 560, dir: 1, expr: t > tU ? "sly" : "neutral", walk: (t > tW || (t > tV && t < tC)) ? t * 2 : null, armR: t > tSm ? [0.8, 1.2] : [0.4, 0.2], blink: blinkAt(t, 1), t });
        if (t > tSm) { g.save(); g.globalAlpha = 0.85; rect(g, px - 30, 1340, 90, 120, "#3a4a32", 3, 4); g.restore(); }
      });
      label(g, "AUGUST 1911", 540, 330, 86, t, tA, tV - 0.05, { font: "Cinzel" });
      label(g, "VINCENZO PERUGGIA", 540, 330, 70, t, tV, tC - 0.05, { font: "Cinzel" });
      label(g, "HID IN A CLOSET", 540, 330, 80, t, tC, tU - 0.05);
      label(g, "UNDER HIS SMOCK", 540, 330, 76, t, tSm, tW - 0.05, { fill: "#ffe08a" });
      stamp(g, "...AND WALKED OUT", 540, 330, 86, t, tW, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tC, "creak"); ev(tU, "pop"); ev(tW, "whoosh", 0.5);
  }
  // 2 — headlines and crowds at an empty wall
  { const t0 = S(2) - 0.1, tN = wt(2, "Newspapers"), tE = wt(2, "empty");
    shot(t0, (g, t, lt) => {
      const wall = t > tE - 0.2;
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [7, 540, 1250, 1.08, 0]]);
      if (!wall) { layer(g, cam, 1, (g) => { g.fillStyle = "#26304a"; g.fillRect(-500, -500, 2100, 3000); const hs = ["MONA LISA STOLEN!", "LOUVRE ROBBED", "WHERE IS SHE?", "STILL MISSING"]; hs.forEach((h, i) => { if (t > tN + i * 0.35) newspaper(g, 300 + (i % 2) * 480, 800 + Math.floor(i / 2) * 650, 440, 560, h, (i % 2 ? 0.08 : -0.08)); }); }); label(g, "FRONT PAGES FOR 2 YEARS", 540, 330, 60, t, tN, tE - 0.2); }
      else { layer(g, cam, 0.7, lv); layer(g, cam, 1, (g) => { for (const [dx, dy] of [[-160, -220], [160, -220]]) ell(g, 540 + dx, 1000 + dy, 10, 10, "#4a4a52", 3); g.save(); g.globalAlpha = 0.25; rect(g, 380, 780, 320, 440, "#3a2a2a", 0); g.restore(); for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) guy(g, VIS(i + r), { x: 60 + i * 160 + r * 60, y: 1720 + r * 120, h: 380 + r * 40, expr: "shock", look: -0.4, headTilt: -8, blink: blinkAt(t, i + r * 7), t }); }); stamp(g, "CROWDS... FOR AN EMPTY WALL", 540, 330, 66, t, tE, E(2) + 0.2); }
    }, { type: "xfade", d: 0.3 });
    for (let k = 0; k < 4; k++) ev(tN + k * 0.35, "pop", 0.5); ev(tE, "cheer", 0.4);
  }
  // 3 — caught in Italy; a global icon
  { const t0 = S(3) - 0.1, tI = wt(3, "Italy"), tC = wt(3, "caught"), tG = wt(3, "global");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.05, 0], [tG - t0, 540, 1250, 1.05, 0], [tG - t0 + 0.5, 540, 1100, 1.2, 0], [7, 540, 1100, 1.22, 0]]);
      layer(g, cam, 0.7, lvB);
      layer(g, cam, 1, (g) => {
        if (t < tG - 0.1) { guy(g, PER, { x: 360, y: 1820, h: 580, expr: t > tC ? "scared" : "sly", armR: t > tC ? [2.8, 0] : [1.6, -0.3], armL: t > tC ? [-2.8, 0] : undefined, blink: blinkAt(t, 1), t }); portrait(g, 700, 1300, 0.55); if (t > tC) guy(g, { tunic: "#1f2a44", trim: "#e7c15f", helmet: "peaked", hatCol: "#1f2a44", trousers: "#1f2a44", moust: true }, { x: 900, y: 1820, h: 580, dir: -1, expr: "angry", armR: [1.8, -0.2], blink: blinkAt(t, 5), t }); }
        else { portrait(g, 540, 1100, 1.4); for (let i = 0; i < 10; i++) sparkle(g, 540 + Math.cos(i * 0.7) * 380, 1100 + Math.sin(i * 1.3) * 420, 30, (t - tG - i * 0.05) / 0.9); }
      });
      label(g, "SELLING IT IN ITALY", 540, 330, 70, t, tI - 0.2, tC - 0.05);
      stamp(g, "CAUGHT!", 540, 330, 120, t, tC, tG - 0.1);
      stamp(g, "A GLOBAL ICON", 540, 330, 104, t, tG, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tC, "sting", 0.5); ev(tG, "choir"); ev(tG, "cheer", 0.5);
  }
}
