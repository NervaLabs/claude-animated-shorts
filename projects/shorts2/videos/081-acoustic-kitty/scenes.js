// 081 — The Cold War Spy Cat That Cost $20 Million (non-graphic: a schematic, no surgery shown)
"use strict";
function buildShots() {
  const AG = (i) => ({ ...C.suit(i), tunic: "#2a2a32", helmet: "bowler", hatCol: "#1c1422" });
  const SOV = (i) => ({ ...C.soviet, tunic: "#5a6a4a", helmet: "cap", hatCol: "#5a6a4a" });
  const callout = (g, x, y, tx, ty, s, k) => { if (k <= 0) return; g.save(); g.globalAlpha = Math.min(1, k); line(g, [[x, y], [tx, ty]], 5, "#ffe08a"); ell(g, x, y, 12, 12, "#ffe08a", 3); rect(g, tx - 160, ty - 40, 320, 80, "#fff6e6", 6, 12); strokeText(g, s, tx, ty + 2, 34, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); };
  // 0 hook: $20M cat
  S2(0, { bg: "control", blur: true, draw: (g, t) => { cat(g, 540, 1700, 360, t, "#9a9a9a"); line(g, [[620, 1420], [700, 1100]], 4, "#5a5a66"); ell(g, 700, 1100, 10, 10, "#c0392b", 0); },
    titles: [["CIA", "THE CIA'S SPY CAT", "stamp", { size: 110 }], ["20", "$20 MILLION", "label", { fill: "#c8ffb0" }]] });
  ev(wt(0, "20"), "cash");
  // 1 Operation Acoustic Kitty: mic, transmitter, antenna (schematic)
  { const tO = wt(1, "Acoustic"), tM = wt(1, "microphone"), tR = wt(1, "transmitter"), tA = wt(1, "antenna");
    S2(1, { bg: "lab", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.08, 0]], draw: (g, t) => { rect(g, 100, 900, 880, 900, "#2f4f7a", 8, 10); for (let i = 0; i < 9; i++) { line(g, [[100 + i * 110, 900], [100 + i * 110, 1800]], 2, "rgba(255,255,255,0.15)"); line(g, [[100, 900 + i * 110], [980, 900 + i * 110]], 2, "rgba(255,255,255,0.15)"); } cat(g, 540, 1650, 380, t, "#cfe0f0"); callout(g, 640, 1310, 800, 1000, "MICROPHONE", (t - tM) / 0.3); callout(g, 560, 1380, 300, 1080, "TRANSMITTER", (t - tR) / 0.3); callout(g, 420, 1500, 300, 1700, "ANTENNA", (t - tA) / 0.3); },
      titles: [[tO, "OPERATION ACOUSTIC KITTY", "stamp", { size: 82 }], [tM, "A HIDDEN MICROPHONE", "label"], [tR, "A RADIO TRANSMITTER", "label"], [tA, "AN ANTENNA IN ITS FUR", "label", { fill: "#ffe08a" }]] });
    ev(tO, "sting", 0.5); ev(tM, "pop"); ev(tR, "pop"); ev(tA, "pop"); }
  // 2 the goal vs reality: cats wander off
  { const tG = wt(2, "goal"), tSo = wt(2, "Soviet"), tRe = wt(2, "refuse"), tH = wt(2, "hungry");
    S2(2, { bg: "farm", draw: (g, t) => { rect(g, 520, 1640, 360, 40, "#8a5a32", 5, 6); for (let i = 0; i < 2; i++) guy(g, SOV(i), { x: 600 + i * 200, y: 1840, h: 540, sit: false, expr: "talk", mouthOpen: talk(t + i), blink: blinkAt(t, i), t }); const away = clamp((t - tRe) / 2); cat(g, lerp(380, -200, away), 1840, 200, t, "#9a9a9a", away > 0 ? -1 : 1); guy(g, AG(0), { x: 140, y: 1840, h: 520, expr: away > 0 ? "angry" : "sly", blink: 0, t }); if (t > tH - 0.2) { rect(g, 60, 1000, 300, 160, "#fff6e6", 7, 14); { ell(g, 200, 1080, 70, 34, "#9ab0c8", 5); poly(g, [[260, 1080], [310, 1040], [310, 1120]], "#9ab0c8", 5); ell(g, 165, 1072, 7, 7, INK, 0); } } },
      titles: [[tG, "THE GOAL: SPY ON SOVIETS", "label"], [tSo, "IN WASHINGTON PARKS", "label"], [tRe, "CATS DON'T TAKE ORDERS", "stamp", { size: 92 }], [tH, "...ESPECIALLY WHEN HUNGRY", "label", { fill: "#ffe08a" }]] });
    ev(tRe, "boing"); ev(tH, "laugh", 0.6); }
}
