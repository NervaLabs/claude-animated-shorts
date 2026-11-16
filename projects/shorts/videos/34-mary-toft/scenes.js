// 34 — Mary Toft and the Rabbit Hoax (1726)
"use strict";
window.MOOD = "comic";
const MARY = { tunic: "#7a5a8a", trim: "#f2efe6", helmet: "bonnet", hatCol: "#f3ecda", robe: true, lady: true };
const DOC = (i) => ({ tunic: ["#1f1a24", "#3a2a4a", "#2a3a2a", "#4a2a2a"][i % 4], trim: "#f2efe6", helmet: "wig", hair: "#ece8e0", hairUnder: true, trousers: "#1f1a24", sash: i === 0 ? "#d4a632" : null });
const cottage = (g) => { g.fillStyle = vgrad(g, -300, 1700, [[0, "#c9a87a"], [1, "#a8865a"]]); g.fillRect(-900, -900, 2900, 2600); for (let i = 0; i < 3; i++) line(g, [[-900, 300 + i * 350], [2000, 300 + i * 350]], 22, "#6b4024"); rect(g, 680, 500, 280, 360, "#9fc8e6", 8, 6); line(g, [[820, 500], [820, 860]], 6); line(g, [[680, 680], [960, 680]], 6); g.fillStyle = "#7a5232"; g.fillRect(-900, 1550, 2900, 1000); line(g, [[-900, 1550], [2000, 1550]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
const market = (g) => { sky3(g, -900, -900, 2900, 2100, "#7a8aa8", "#b8c0cc", "#e2dccb"); for (let i = 0; i < 9; i++) house(g, -700 + i * 330, 1300, 280, 300, ["#e9dcc0", "#c9b49a", "#d9c4aa"][i % 3], "#6a4a4a", 5); g.fillStyle = "#9a948a"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
function buildShots() {
  const ct = cached("cott", -900, -900, 2900, 3400, cottage, 1.0);
  const ctB = cached("cottB", -900, -900, 2900, 3400, cottage, 0.7, 4);
  const mk = cached("mkt", -900, -900, 2900, 3400, market, 1.0);
  // 0 — hook
  { const tY = wt(0, "1726"), tD = wt(0, "doctors"), tR = wt(0, "rabbits");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.08, 0]]);
      layer(g, cam, 0.7, ctB);
      layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) guy(g, DOC(i), { x: 140 + i * 170, y: 1820, h: 520, expr: t > tR ? "shock" : "neutral", look: 1, blink: blinkAt(t, i), t }); smoothPath(g, [[620, 1640], [960, 1640], [940, 1800], [640, 1800]]); fillInk(g, "#c9965a", 6); if (t > tR - 0.2) for (let i = 0; i < 3; i++) bunny(g, 680 + i * 100, 1650, 90, t + i); });
      stamp(g, "1726", 540, 330, 150, t, tY - 0.05, tD - 0.05);
      label(g, "ENGLAND'S TOP DOCTORS", 540, 330, 62, t, tD, tR - 0.05);
      stamp(g, "...BELIEVED IN RABBIT BIRTHS", 540, 330, 64, t, tR, E(0) + 0.3);
    });
    ev(tY, "boom", 0.5); ev(tR, "boing"); ev(tR + 0.1, "gasp");
  }
  // 1 — her claim
  { const t0 = S(1) - 0.1, tM = wt(1, "Mary"), tCh = wt(1, "chasing"), tA = wt(1, "animal");
    shot(t0, (g, t, lt) => {
      const field = t < tA - 0.2;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [6, 540, 1350, 1.06, 0]]);
      layer(g, cam, 0.7, field ? (g) => { sky3(g, -500, -500, 2100, 1850, "#5a8ad0", "#b3d2ee", "#e9eedc"); ground(g, 1300, "#9cbb5c", -500, 1600); } : ctB);
      layer(g, cam, 1, (g) => {
        if (field) { const x = lerp(200, 700, clamp((t - tCh) / 1.4)); guy(g, MARY, { x, y: 1800, h: 580, expr: "determined", walk: t * 2.4, armR: [2.0, -0.3], blink: blinkAt(t, 1), t }); bunny(g, x + 380 + Math.sin(t * 8) * 20, 1800 - Math.abs(Math.sin(t * 8)) * 60, 110, t); }
        else { guy(g, MARY, { x: 360, y: 1820, h: 600, expr: "sly", armR: [1.8, -0.4], blink: blinkAt(t, 1), t }); g.save(); g.globalAlpha = clamp((t - tA + 0.2) / 0.3); bubble(g, 660, 1050, 420, 240, 480, 1250, "#fff", 6); bunny(g, 600, 1110, 90, t); strokeText(g, "?!", 740, 1040, 70, { fill: "#c0262e", lw: 0, shadow: false }); g.restore(); }
      });
      label(g, "MARY TOFT", 540, 330, 96, t, tM, tCh - 0.05, { font: "Cinzel" });
      label(g, "CHASED A RABBIT...", 540, 330, 76, t, tCh, tA - 0.2);
      label(g, "HER CLAIM: BUNNIES", 540, 330, 76, t, tA, E(1) + 0.2, { fill: "#ffe08a" });
    }, { type: "flash", d: 0.2 });
    ev(tCh, "scramble", 0.5); ev(tA, "pop");
  }
  // 2 — the surgeons, including the king's physician
  { const t0 = S(2) - 0.1, tP = wt(2, "Prominent"), tK = wt(2, "King"), tB = wt(2, "breathless"), tMi = wt(2, "miracle");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [9, 540, 1330, 1.08, 0]]);
      layer(g, cam, 0.7, ctB);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 4; i++) guy(g, DOC(i), { x: 120 + i * 200, y: 1820, h: 520, expr: t > tMi ? "laugh" : "shock", armR: t > tMi ? [2.7, 0] : [1.6, -0.6], blink: blinkAt(t, i), t });
        if (t > tB - 0.1) for (let i = 0; i < 3; i++) newspaper(g, 260 + i * 280, 1100 - (i % 2) * 60, 260, 340, ["MIRACLE!", "RABBITS!", "PROVEN!"][i], (i - 1) * 0.08);
      });
      label(g, "TOP SURGEONS", 540, 330, 86, t, tP, tK - 0.05);
      label(g, "EVEN THE KING'S PHYSICIAN", 540, 330, 60, t, tK, tB - 0.05, { fill: "#ffe08a" });
      stamp(g, "“A MIRACLE!”", 540, 330, 110, t, tMi, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 });
    ev(tK, "horns", 0.4); ev(tB, "pop"); ev(tMi, "choir", 0.5);
  }
  // 3 — rabbit sales crash; the porter; confession
  { const t0 = S(3) - 0.1, tSa = wt(3, "sales"), tPo = wt(3, "porter"), tC = wt(3, "confess");
    shot(t0, (g, t, lt) => {
      const ph = t < tPo - 0.1 ? 0 : t < tC - 0.2 ? 1 : 2;
      const cam = camAt(lt, [[0, 540, 1350, 1.0, 0], [9, 540, 1340, 1.06, 0]]);
      layer(g, cam, 0.7, ph === 0 ? mk : ctB);
      layer(g, cam, 1, (g) => {
        if (ph === 0) { rect(g, 240, 1400, 600, 200, "#8a5a32", 6, 6); rect(g, 260, 1200, 560, 80, "#f6f3ea", 5); strokeText(g, "RABBIT PIES", 540, 1240, 48, { fill: "#c0262e", lw: 0, shadow: false }); guy(g, OUTF.cook, { x: 540, y: 1420, h: 380, expr: "sad", blink: blinkAt(t, 1), t, shadow: false }); for (let i = 0; i < 4; i++) guy(g, SET2(i), { x: lerp(300 + i * 130, -500, clamp((t - tSa) / 2)), y: 1820, h: 420, dir: -1, expr: "sick", walk: t * 2, armR: [2.6, 1.4], blink: 0, t }); }
        if (ph === 1) { const x = lerp(-200, 560, clamp((t - tPo) / 1.2)); guy(g, { tunic: "#6a5a3a", trim: "#d9c08a", helmet: "cap", hatCol: "#5a3a22", trousers: "#3a3a4a" }, { x, y: 1820, h: 560, expr: "sly", walk: t < tPo + 1.2 ? t * 1.2 : null, lean: -6, armR: [1.0, 1.0], blink: blinkAt(t, 1), t }); bunny(g, x + 40, 1440, 70, t); if (t > tPo + 1.0) { guy(g, DOC(0), { x: 900, y: 1820, h: 560, dir: -1, expr: "angry", armR: [2.0, -0.2], blink: blinkAt(t, 2), t }); shout(g, 820, 1000, "CAUGHT!", 60, clamp((t - tPo - 1.0) / 0.12), "#c0262e"); } }
        if (ph === 2) { guy(g, MARY, { x: 540, y: 1820, h: 600, expr: "sad", armR: [0.6, 0.8], blink: blinkAt(t, 1), t }); }
      });
      label(g, "RABBIT SALES PLUMMET", 540, 330, 64, t, tSa - 0.2, tPo - 0.1);
      label(g, "A PORTER... WITH A BUNNY", 540, 330, 62, t, tPo, tC - 0.2);
      stamp(g, "SHE CONFESSED", 540, 330, 104, t, tC, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tSa, "sadtrombone", 0.6); ev(tPo, "pop"); ev(tC, "sting", 0.5);
  }
}
const SET2 = (i) => ({ tunic: ["#5a7a9a", "#9a4a6a", "#7a5a3a", "#4f7a4a"][i % 4], trim: "#f2efe6", hair: "#5a3b2a", helmet: ["tricorn", "bonnet", null, "tricorn"][i % 4], robe: i % 4 === 1, lady: i % 4 === 1, trousers: "#3a3a4a" });
