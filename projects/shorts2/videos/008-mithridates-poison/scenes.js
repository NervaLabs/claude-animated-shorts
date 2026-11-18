// 008 — The King Who Could Not Be Poisoned (sensitive ending kept non-graphic)
"use strict";
function buildShots() {
  const MITH = { tunic: "#4b2a7a", trim: "#e8c14d", helmet: "crown", hair: "#5a3b2a", beard: "#5a3b2a", cape: "#c0392b" };
  const vial = (g, x, y, s, col, lab, t) => { const u = s / 100; rect(g, x - 20 * u, y - 70 * u, 40 * u, 70 * u, "rgba(220,240,250,0.5)", 4, 8 * u); rect(g, x - 18 * u, y - 40 * u, 36 * u, 38 * u, col, 0, 6 * u); rect(g, x - 12 * u, y - 86 * u, 24 * u, 18 * u, "#6b4024", 3); if (lab) strokeText(g, lab, x, y + 30 * u, 26 * u, { fill: "#fff" }); for (let i = 0; i < 2; i++) { const q = (t * 0.7 + i / 2 + x * 0.001) % 1; g.save(); g.globalAlpha = 1 - q; ell(g, x, y - 90 * u - q * 40 * u, 6 * u, 6 * u, col, 2); g.restore(); } };
  const cup = (g, x, y, s) => { const u = s / 100; poly(g, [[x - 40 * u, y - 80 * u], [x + 40 * u, y - 80 * u], [x + 16 * u, y - 20 * u], [x - 16 * u, y - 20 * u]], "#e7c15f", 4); rect(g, x - 6 * u, y - 20 * u, 12 * u, 20 * u, "#e7c15f", 3); ell(g, x, y, 30 * u, 8 * u, "#e7c15f", 3); ell(g, x, y - 80 * u, 40 * u, 8 * u, "#6fbf5a", 3); };
  // 0 hook
  S2(0, { bg: "palace", blur: true, draw: (g, t) => { guy(g, MITH, { x: 380, y: 1820, h: 620, expr: "sly", armR: [2.2, -1.0], hold: { r: "cup" }, blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) vial(g, 760 + i * 90, 1720, 120, ["#6fbf5a", "#7b5ac9", "#c0392b"][i], null, t); },
    titles: [["poison", "POISON. EVERY DAY.", "stamp", { size: 100 }], ["assassinated", "...TO AVOID ASSASSINS", "label"]] });
  ev(wt(0, "poison"), "bubble");
  // 1 father poisoned → Mithridates VI obsessed
  { const tF = wt(1, "father"), tM = wt(1, "Mithridates"), tO = wt(1, "obsessed");
    S2(1, { bg: "palace", draw: (g, t) => { if (t < tM - 0.2) { for (let i = 0; i < 5; i++) { const x = 220 + i * 160; rect(g, x - 16, 1300, 32, 120, "#f2efe6", 4, 4); flame(g, x, 1292, 16, t + i); } } else { guy(g, MITH, { x: 420, y: 1820, h: 620, expr: t > tO ? "determined" : "sad", armR: [1.8, -0.5], blink: blinkAt(t, 1), t }); if (t > tO) shout(g, 760, 1080, "NEVER ME.", 60, clamp((t - tO) / 0.15), "#2f5fae", [520, 1240]); } },
      titles: [[tF, "HIS FATHER: POISONED", "label", { font: "Cinzel", fill: "#e6e0f2" }], [tM, "KING MITHRIDATES VI OF PONTUS", "label", { font: "Cinzel", size: 52 }], [tO, "OBSESSED WITH IMMUNITY", "stamp", { size: 82 }]] });
    ev(tF, "drone", 0.5); ev(tO, "boom", 0.5); }
  // 2 daily micro-doses
  { const tD = wt(2, "dozens"), tS = wt(2, "snake"), tA = wt(2, "arsenic"), tTo = wt(2, "tolerance");
    S2(2, { bg: "palace", blur: true, draw: (g, t) => { rect(g, 160, 1460, 760, 60, "#6b4024", 6, 6); const labs = [["VENOM", "#6fbf5a"], ["ARSENIC", "#d9d9d9"], ["HEMLOCK", "#7b5ac9"], ["?", "#c0392b"]]; labs.forEach(([l, c], i) => { if (t > tD - 0.2 + i * 0.4) vial(g, 260 + i * 180, 1460, 130, c, l, t); }); guy(g, MITH, { x: 900, y: 1820, h: 580, dir: -1, expr: "determined", armR: [2.2, -1.2], hold: { r: "cup" }, blink: blinkAt(t, 1), t }); if (t > tTo) { rect(g, 320, 960, 440, 70, "#3a3a44", 5, 30); rect(g, 330, 970, 420 * clamp((t - tTo) / 1.5), 50, "#6fbf5a", 0, 25); strokeText(g, "TOLERANCE", 540, 920, 44, { fill: "#d9f2a0" }); } },
      titles: [["Every", "EVERY. SINGLE. DAY.", "label"], [tD, "DOZENS OF TOXINS", "label", { fill: "#d9f2a0" }], [tS, "SNAKE VENOM", "label", { fill: "#d9f2a0" }], [tA, "ARSENIC", "label", { fill: "#e6e6e6" }]] });
    ev(tD, "bubble"); ev(tTo, "ding"); }
  // 3 it worked too well
  S2(3, { bg: "palace", blur: true, keys: [[0, 540, 1250, 1.2, 0], [2, 540, 1250, 1.3, 0]], draw: (g, t) => { guy(g, MITH, { x: 540, y: 1820, h: 640, expr: "proud", armR: [2.7, 0], armL: [-2.7, 0], blink: blinkAt(t, 1), t }); },
    titles: [["too", "IT WORKED... TOO WELL", "stamp", { size: 96 }]] });
  ev(wt(3, "too"), "boing", 0.5);
  // 4 cornered by Rome; the poison
  { const tR = wt(4, "Roman"), tP = wt(4, "poison");
    S2(4, { bg: "palace", draw: (g, t) => { for (let i = 0; i < 4; i++) guy(g, C.legion, { x: lerp(1400, 760 + i * 110, clamp((t - tR) / 1.5)), y: 1820, h: 440, dir: -1, expr: "angry", walk: t < tR + 1.5 ? t * 2 : null, hold: { r: "spear" }, spearAng: -1.4, blink: 0, t }); guy(g, MITH, { x: 300, y: 1820, h: 600, expr: "sad", blink: blinkAt(t, 1), t }); if (t > tP - 0.2) cup(g, 480, 1480, 110); },
      titles: [["Decades", "DECADES LATER", "label"], [tR, "CORNERED BY ROME", "stamp", { size: 96 }]] }, night(0.2));
    ev(tR, "march", 0.6); ev(tR + 0.6, "march", 0.5); }
  // 5 immunity: the poison failed (sober)
  { const tF = wt(5, "failed"), tG = wt(5, "guard");
    S2(5, { bg: "dark", draw: (g, t) => { cup(g, 540, 1400, 200); if (t > tF) { g.save(); g.globalAlpha = 0.85; strokeText(g, "✕", 540, 1150, 160, { fill: "#c0392b" }); g.restore(); } if (t > tG) { g.save(); g.globalAlpha = clamp((t - tG) / 0.6) * 0.9; tinted(g, (tt) => { tt.setTransform(g.getTransform()); guy(tt, C.legion, { x: 860, y: 1820, h: 560, dir: -1, t }); }, "#14161e", 0.9); g.restore(); } },
      titles: [["immunity", "HIS IMMUNITY...", "label", { font: "Cinzel", fill: "#e6e0f2" }], [tF, "THE POISON FAILED", "label", { font: "Cinzel", fill: "#e6e0f2", size: 76 }]] });
    ev(tF, "drone"); }
}
