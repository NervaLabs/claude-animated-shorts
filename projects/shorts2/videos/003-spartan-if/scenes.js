// 003 — The Spartan Comeback That Stopped an Invasion
"use strict";
function buildShots() {
  const SPARTAN = { ...C.hoplite, tunic: "#b8262f", crest: "#c21f2b", shieldCol: "#c0392b" };
  const MAC = { ...C.hoplite, tunic: "#3a4a8a", crest: "#e7c15f", shieldCol: "#d4a632", armor: "#b9bec8" };
  const PHIL = { ...C.king, tunic: "#6b2a7a", hair: "#3a2a22", beard: "#3a2a22", patch: true };
  // 0 hook
  S2(0, { bg: "greekCity", blur: true, draw: (g, t) => { guy(g, SPARTAN, { x: 540, y: 1840, h: 640, expr: "determined", armR: [1.2, -0.3], hold: { r: "spear", l: "shield" }, spearAng: -1.5, blink: blinkAt(t, 1), t }); },
    titles: [["one-word", "THE GREATEST ONE-WORD THREAT", "stamp", { size: 72 }]] });
  ev(wt(0, "one-word"), "boom", 0.6);
  // 1 Philip's threat
  { const tP = wt(1, "Philip"), tA = wt(1, "Alexander"), tS = wt(1, "sent"), tI = wt(1, "If");
    S2(1, { bg: "palace", blur: true, draw: (g, t) => {
      guy(g, PHIL, { x: 250, y: 1820, h: 600, expr: t > tS ? "sly" : "talk", mouthOpen: t < tS ? talk(t) : 0, armR: [2.0, -0.3], blink: blinkAt(t, 1), t });
      if (t > tS - 0.2) scrollUnrolled(g, 720, 1150, 560, 420, ["IF I INVADE LACONIA,", "I WILL TURN YOU OUT,", "NEVER TO RISE AGAIN."].slice(0, t > tI ? 3 : 1), -0.04, clamp((t - tS + 0.2) / 0.3)); },
      titles: [[tP, "KING PHILIP II OF MACEDON", "label", { font: "Cinzel", size: 58 }], [tA, "(ALEXANDER THE GREAT'S DAD)", "label", { size: 52, fill: "#ffe08a" }], [tS, "A WARNING TO SPARTA", "label"]] });
    ev(tS, "pop"); ev(tI, "drums"); }
  // 2 outnumbered and surrounded
  { const tO = wt(2, "outnumbered"), tSu = wt(2, "surrounded");
    S2(2, { bg: "greekCity", keys: [[0, 540, 1400, 1.0, 0], [3, 540, 1350, 0.8, 0]], draw: (g, t) => {
      for (let i = 0; i < 3; i++) guy(g, SPARTAN, { x: 440 + i * 100, y: 1640, h: 320, expr: "determined", hold: { l: "shield" }, blink: blinkAt(t, i), t });
      const n = t > tSu ? 18 : t > tO ? 10 : 4;
      for (let i = 0; i < n; i++) { const a = (i / 18) * TAU, x = 540 + Math.cos(a) * 520, y = 1640 + Math.sin(a) * 220; guy(g, MAC, { x, y, h: 280, dir: Math.cos(a) > 0 ? -1 : 1, expr: "angry", hold: { r: "spear" }, spearAng: -1.4, blink: 0, t }); } },
      titles: [[tO, "OUTNUMBERED", "label", { fill: "#ffd0c0" }], ["outgunned", "OUTGUNNED", "label", { fill: "#ffd0c0" }], [tSu, "SURROUNDED", "stamp", { size: 120 }]] });
    ev(tO, "drums"); ev(tSu, "sting", 0.5); }
  // 3 the reply: "If."
  { const tSi = wt(3, "single"), tIf = wt(3, "If");
    S2(3, { bg: "stone", blur: true, draw: (g, t) => {
      for (let i = 0; i < 2; i++) guy(g, SPARTAN, { x: 200 + i * 680, y: 1820, h: 560, dir: i ? -1 : 1, expr: "sly", blink: blinkAt(t, i), t });
      g.save(); g.translate(540, 1200); g.rotate(-0.04); rect(g, -200, -160, 400, 320, "#c98a5a", 8, 14); if (t > tIf - 0.1) strokeText(g, "“IF.”", 0, 0, 140, { font: "Cinzel", fill: "#3a1a14", lw: 0, shadow: false }); g.restore(); },
      titles: [["surrendering", "NO SURRENDER", "label"], [tSi, "A SINGLE WORD", "label", { fill: "#ffe08a" }], [tIf, "“IF.”", "stamp", { size: 160, rot: 0 }]] });
    ev(tIf, "boom"); KICKS.push({ t: tIf, a: 16 }); }
  // 4 Philip gets it
  { const tG = wt(4, "got");
    S2(4, { bg: "palace", blur: true, keys: [[0, 400, 1250, 1.2, 0], [3, 400, 1200, 1.4, 0]], draw: (g, t) => { guy(g, PHIL, { x: 360, y: 1820, h: 640, expr: "shock", sweat: (t * 0.8) % 1, armR: [1.7, -0.9], blink: 0, t }); g.save(); g.translate(640, 1300); rect(g, -110, -90, 220, 180, "#c98a5a", 6, 10); strokeText(g, "IF.", 0, 0, 70, { font: "Cinzel", fill: "#3a1a14", lw: 0, shadow: false }); g.restore(); },
      titles: [[tG, "MESSAGE RECEIVED", "stamp", { size: 96 }]] });
    ev(tG, "boing"); }
  // 5 never invaded
  { const tN = wt(5, "neither"), tI = wt(5, "invaded");
    S2(5, { bg: "greekCity", draw: (g, t) => { guy(g, SPARTAN, { x: 540, y: 1840, h: 640, expr: "proud", hold: { r: "spear", l: "shield" }, spearAng: -1.5, armR: [1.2, -0.3], blink: blinkAt(t, 1), t }); if (t > tN) { g.save(); g.globalAlpha = 0.85; guy(g, PHIL, { x: 140, y: 1500, h: 300, expr: "sad", t, shadow: false }); guy(g, { ...C.alexander ?? MAC, tunic: "#b8262f", helmet: "greek" }, { x: 940, y: 1500, h: 300, dir: -1, expr: "neutral", t, shadow: false }); g.restore(); } },
      titles: [["conquering", "ALL OF GREECE CONQUERED...", "label", { size: 58 }], [tI, "...EXCEPT SPARTA", "stamp", { size: 110 }]] });
    ev(tI, "choir", 0.5); }
}
