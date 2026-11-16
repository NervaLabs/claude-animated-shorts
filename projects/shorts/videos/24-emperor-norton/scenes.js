// 24 — Emperor Norton I of the United States (1859)
"use strict";
window.MOOD = "comic";
HATS.beaver = (g, rx, ry, lw, o) => { HATS.tophat(g, rx, ry, lw, { hatCol: "#2a2430", band: "#2a2430" }); poly(g, [[rx * 0.3, -ry * 2.0], [rx * 0.6, -ry * 2.7], [rx * 0.75, -ry * 1.9]], "#2f9a5a", lw * 0.6, true); ell(g, rx * 0.5, -ry * 1.3, rx * 0.18, ry * 0.18, "#e7c15f", lw * 0.4); };
const NORTON = { tunic: "#2f3f7f", trim: "#e7c15f", helmet: "beaver", hairUnder: true, hair: "#5a3b2a", beard: "#5a3b2a", trousers: "#2f3f7f", boots: "#1f1a24", sash: "#e7c15f" };
const SFP = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a", "#a85a3a"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d"][i % 3], helmet: ["bowler", "bonnet", "tophat", null][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
const sf = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#4f86d0", "#a9cdee", "#f0e6c8");
  smoothHills(g, -900, 2000, 1100, 260, "#9aa6c8", 2, 0);
  for (let i = 0; i < 12; i++) { const x = -800 + i * 240, h = 300 + rnd(i) * 160; rect(g, x, 1300 - h, 210, h, ["#e9dcc0", "#c9b49a", "#d9c4aa", "#b9a48a"][i % 4], 5); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) rect(g, x + 25 + c * 60, 1300 - h + 30 + r * 80, 34, 52, "#3a3a4a", 3); }
  g.fillStyle = vgrad(g, 1300, 2400, [[0, "#9a948a"], [1, "#6a645a"]]); g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6);
  paintGrain(g, -900, -900, 2900, 3400, 0.07);
};
function bill(g, x, y, s, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rect(g, -120, -60, 240, 120, "#cfe6b0", 5, 6); rect(g, -108, -48, 216, 96, null, 3, 4); ell(g, 0, 0, 30, 34, "#f6f3ea", 3); strokeText(g, "NORTON I", 0, -32, 18, { fill: "#2f5f2a", lw: 0, shadow: false }); strokeText(g, "50¢", 0, 36, 22, { fill: "#2f5f2a", lw: 0, shadow: false }); g.restore(); }
function buildShots() {
  const bg = cached("sf", -900, -900, 2900, 3400, sf, 1.0);
  const bgB = cached("sfB", -900, -900, 2900, 3400, sf, 0.7, 5);
  // 0 — hook
  { const tY = wt(0, "1859"), tE = wt(0, "Emperor"), tSF = wt(0, "San");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [7, 540, 1350, 1.1, 0]]);
      layer(g, cam, 0.7, bgB);
      layer(g, cam, 1, (g) => {
        guy(g, NORTON, { x: 540, y: 1820, h: 640, expr: "proud", armR: [2.6, 0], hold: { r: "sword" }, swordAng: -1.5, blink: blinkAt(t, 1), t });
        if (t > tSF) for (let i = 0; i < 2; i++) guy(g, SFP(i), { x: i ? 950 : 130, y: 1800, h: 460, dir: i ? -1 : 1, expr: "happy", lean: 20, armR: [1.4, 0.3], blink: blinkAt(t, 3 + i), t });
      });
      stamp(g, "1859", 540, 330, 150, t, tY - 0.05, tE - 0.05);
      stamp(g, "EMPEROR OF THE U.S.", 540, 330, 88, t, tE, tSF - 0.05);
      label(g, "SAN FRANCISCO PLAYED ALONG", 540, 330, 54, t, tSF, E(0) + 0.3);
    });
    ev(tY, "boom", 0.6); ev(tE, "horns"); ev(tSF, "cheer", 0.5);
  }
  // 1 — broke → proclamation in the paper
  { const t0 = S(1) - 0.1, tL = wt(1, "losing"), tP = wt(1, "proclamation"), tE = wt(1, "Emperor");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [8, 540, 1300, 1.12, 0]]);
      layer(g, cam, 0.7, bgB);
      layer(g, cam, 1, (g) => {
        guy(g, { ...NORTON, helmet: "bowler", hatCol: "#3a3a44", tunic: "#4a4a52", sash: null, trousers: "#3a3a44" }, { x: 260, y: 1820, h: 600, expr: t > tP ? "determined" : "sad", armR: t < tP ? [0.6, 0.6] : [1.6, -0.3], armL: t < tP ? [-0.6, -0.6] : undefined, blink: blinkAt(t, 1), t });
        if (t > tL && t < tP) for (let i = 0; i < 3; i++) { const q = (t * 0.8 + i / 3) % 1; g.save(); g.globalAlpha = 1 - q; g.translate(380 + i * 40, 1500 - q * 300); for (const sd of [-1, 1]) ell(g, sd * 14, 0, 16, 10, "#c9c4b8", 3, sd * 0.5); g.restore(); }
        if (t > tP - 0.1) newspaper(g, 720, 1140, 520, 640, "I, NORTON I, EMPEROR", 0.05 * Math.sin(t));
      });
      label(g, "FORTUNE: LOST", 540, 330, 86, t, tL, tP - 0.05, { fill: "#ffd0c0" });
      stamp(g, "HE NAMED HIMSELF EMPEROR", 540, 330, 66, t, tE - 0.1, E(1) + 0.2);
    }, { type: "flash", d: 0.2 });
    ev(tL, "sadtrombone", 0.6); ev(tP, "ding"); ev(tE, "boom", 0.5);
  }
  // 2 — San Francisco embraces him
  { const t0 = S(2) - 0.1, tEm = wt(2, "embraced");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.9, 0], [4, 540, 1350, 0.96, 0]]);
      layer(g, cam, 0.7, bgB);
      layer(g, cam, 1, (g) => { guy(g, NORTON, { x: 540, y: 1780, h: 560, expr: "happy", armR: [2.2, 0], blink: blinkAt(t, 1), t }); for (let i = 0; i < 8; i++) { const x = i < 4 ? 60 + i * 110 : 680 + (i - 4) * 110; guy(g, SFP(i), { x, y: 1760 + (i % 2) * 50, h: 400, dir: i < 4 ? 1 : -1, expr: "happy", lean: t > tEm ? 18 : 0, armR: [2.6 + Math.sin(t * 6 + i) * 0.2, 0], blink: blinkAt(t, i), t }); } });
      stamp(g, "EMBRACED", 540, 330, 120, t, tEm, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tEm, "cheer");
  }
  // 3 — free meals, front-row seats, his own money
  { const t0 = S(3) - 0.1, tR = wt(3, "Restaurants"), tT = wt(3, "theaters"), tC = wt(3, "currency");
    shot(t0, (g, t, lt) => {
      const ph = t < tT - 0.1 ? 0 : t < tC - 0.1 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [9, 540, 1330, 1.12, 0]]);
      layer(g, cam, 0.7, ph === 1 ? (g) => { g.fillStyle = "#4a1a2a"; g.fillRect(-500, -500, 2100, 3000); for (let i = 0; i < 2; i++) poly(g, [[i ? 760 : -200, 200], [i ? 1300 : 320, 200], [i ? 1300 : 320, 1500], [i ? 900 : 180, 1500]], "#9a2a33", 6, true); rect(g, -200, 1300, 1500, 200, "#6b4024", 6); } : bgB);
      layer(g, cam, 1, (g) => {
        if (ph === 0) { rect(g, 300, 1500, 480, 40, "#8a5a32", 5); line(g, [[340, 1540], [340, 1800]], 10, "#6b4024"); line(g, [[740, 1540], [740, 1800]], 10, "#6b4024"); ell(g, 540, 1490, 110, 26, "#f6f3ea", 5); for (let k = 0; k < 3; k++) ell(g, 500 + k * 40, 1470, 26, 16, ["#c9792a", "#5f9a48", "#e9a83a"][k], 3); guy(g, NORTON, { x: 200, y: 1820, h: 560, expr: "happy", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); guy(g, OUTF.cook, { x: 880, y: 1820, h: 540, dir: -1, expr: "happy", armR: [1.6, -0.3], blink: blinkAt(t, 2), t }); }
        if (ph === 1) { for (let i = 0; i < 6; i++) guy(g, SFP(i), { x: 60 + i * 190, y: 1900, h: 380, expr: "happy", look: -1, t, shadow: false }); guy(g, NORTON, { x: 540, y: 1840, h: 460, expr: "proud", t, blink: blinkAt(t, 1) }); strokeText(g, "ROW 1", 540, 1100, 60, { fill: "#ffe08a" }); }
        if (ph === 2) { guy(g, NORTON, { x: 260, y: 1820, h: 560, expr: "proud", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); bill(g, 540, 1300, 1.4 + Math.sin(t * 3) * 0.05, -0.08); guy(g, SFP(2), { x: 860, y: 1820, h: 540, dir: -1, expr: "happy", armR: [1.8, -0.4], blink: blinkAt(t, 5), t }); }
      });
      label(g, "FREE MEALS", 540, 330, 96, t, tR, tT - 0.1);
      label(g, "FRONT-ROW SEATS", 540, 330, 80, t, tT, tC - 0.1);
      stamp(g, "HIS OWN MONEY", 540, 330, 104, t, tC, E(3) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tR, "ding"); ev(tT, "cheer", 0.4); ev(tC, "cash");
  }
  // 4 — 10,000 at his funeral
  { const t0 = S(4) - 0.1, tY = wt(4, "1880"), tT = wt(4, "ten");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 0.75, 0], [6, 540, 1350, 0.8, 0]]);
      layer(g, cam, 0.8, bgB);
      layer(g, cam, 1, (g) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) guy(g, { ...SFP(i + r), tunic: "#2a2430", helmet: ["tophat", "bonnet", "bowler"][(i + r) % 3], hatCol: "#1f1a24" }, { x: -600 + i * 150 + (r % 2) * 70, y: 1500 + r * 110, h: 260 + r * 30, expr: "sad", blink: blinkAt(t, i + r * 16), t }); });
      stamp(g, "1880", 540, 330, 150, t, tY - 0.05, tT - 0.05);
      stamp(g, "10,000+ MOURNERS", 540, 330, 96, t, tT, 999, { fill: "#e6e0f2" });
    }, { type: "xfade", d: 0.4 }, night(0.15));
    ev(tY, "drone"); ev(tT, "choir", 0.6);
  }
}
