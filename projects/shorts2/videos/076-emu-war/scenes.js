// 076 — Australia Once Lost a War Against Flightless Birds (non-graphic: no birds are hit on screen)
"use strict";
function buildShots() {
  const SOL = (i) => ({ ...C.tommy, tunic: "#7a6a4a", trim: "#5a4a2a", helmet: "cowboy", hatCol: "#8a6a4a" });
  const emu = (g, x, y, s, t, dir = 1, run = 1) => { g.save(); g.translate(x, y); g.scale(dir * s, s); const p = t * 7 * run; for (const o of [0, Math.PI]) { const a = Math.sin(p + o) * 0.5 * run; limb(g, [[0, -170], [Math.sin(a) * 40, -90], [Math.sin(a) * 70, 0]], 10, "#8a7a5a", 4); } smoothPath(g, [[-90, -230], [-40, -300], [70, -290], [100, -220], [40, -160], [-70, -170]]); fillInk(g, "#5a4a3a", 6); for (let i = 0; i < 6; i++) line(g, [[-60 + i * 25, -250], [-70 + i * 25, -190]], 3, "rgba(30,20,10,0.4)"); limb(g, [[70, -270], [100 + Math.sin(p) * 6, -380], [110, -430]], 14, "#6a7a8a", 4); ell(g, 120, -440, 30, 24, "#6a7a8a", 5); poly(g, [[146, -446], [180, -436], [146, -428]], "#3a3a3a", 3); ell(g, 124, -448, 7, 8, "#f6f3ea", 0); ell(g, 126, -448, 3.5, 4, INK, 0); g.restore(); };
  // 0 hook
  S2(0, { bg: "farm", draw: (g, t) => { for (let i = 0; i < 2; i++) guy(g, SOL(i), { x: 160 + i * 160, y: 1840, h: 520, expr: "shock", blink: 0, t }); for (let i = 0; i < 4; i++) emu(g, 600 + ((t * 300 + i * 260) % 900), 1840 - (i % 2) * 40, 0.9, t + i, -1); },
    titles: [["military", "THE ARMY VS... EMUS", "stamp", { size: 100 }], ["lost", "...AND LOST", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "lost"), "sadtrombone", 0.6);
  // 1 1932: 20,000 emus invade wheat farms
  { const tY = wt(1, "1932"), tT = wt(1, "20,000"), tW = wt(1, "wheat");
    S2(1, { bg: "farm", keys: [[0, 540, 1300, 1.0, 0], [12, 540, 1320, 0.9, 0]], draw: (g, t) => { for (let i = 0; i < 18; i++) { const x = 60 + (i % 9) * 120, y = 1880 - Math.floor(i / 9) * 40; line(g, [[x, y], [x + 4, y - 120]], 6, "#d9b04a"); ell(g, x + 4, y - 130, 12, 30, "#f2c44a", 3); } const n = t > tT - 0.2 ? 8 : 2; for (let i = 0; i < n; i++) emu(g, ((t * 160 + i * 170) % 1400) - 200, 1800 - (i % 3) * 30, 0.7, t + i, 1, 0.8); },
      titles: [[tY, "1932, WESTERN AUSTRALIA", "label"], [tT, "20,000 EMUS", "stamp", { size: 130 }], [tW, "TRAMPLING THE WHEAT", "label", { fill: "#ffe08a" }]] });
    ev(tT, "stomp"); ev(tW, "scramble"); }
  // 2 artillery soldiers with two Lewis guns, 10,000 rounds
  { const tR = wt(2, "Royal"), tTw = wt(2, "two"), tTe = wt(2, "10,000");
    S2(2, { bg: "farm", draw: (g, t) => { for (let i = 0; i < 3; i++) guy(g, SOL(i), { x: 200 + i * 300, y: 1840, h: 600, expr: "determined", blink: blinkAt(t, i), t }); if (t > tTw - 0.2) for (let i = 0; i < 2; i++) { rect(g, 260 + i * 460, 1640, 200, 40, "#3a3a44", 5, 8); ell(g, 320 + i * 460, 1660, 46, 46, "#5a5a66", 5); line(g, [[300 + i * 460, 1680], [270 + i * 460, 1780]], 8); line(g, [[340 + i * 460, 1680], [370 + i * 460, 1780]], 8); } if (t > tTe - 0.2) { rect(g, 340, 900, 400, 180, "#fff6e6", 7, 14); strokeText(g, "10,000 ROUNDS", 540, 990, 50, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tR, "THE ARMY WAS SENT IN", "label"], [tTw, "TWO MACHINE GUNS", "stamp", { size: 100 }]] });
    ev(tR, "march"); ev(tTw, "clank"); }
  // 3 emus scatter into guerrilla groups
  { const tSp = wt(3, "split"), tG = wt(3, "guerrilla"), tO = wt(3, "outran");
    S2(3, { bg: "farm", draw: (g, t) => { guy(g, SOL(0), { x: 540, y: 1840, h: 600, expr: t > tO ? "shock" : "angry", blink: 0, t }); if (t > tSp - 0.2) { const k = clamp((t - tSp) / 1); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; emu(g, 540 + Math.cos(a) * (120 + k * 520), 1840 + Math.sin(a) * 40, 0.6, t + i, Math.cos(a) > 0 ? 1 : -1, 1.6); } } else for (let i = 0; i < 6; i++) emu(g, 300 + (i % 3) * 200, 1820 - Math.floor(i / 3) * 40, 0.6, t + i, -1, 0.5); },
      titles: [[tSp, "THEY SCATTERED", "stamp", { size: 110 }], [tG, "GUERRILLA TACTICS", "label", { fill: "#ffe08a" }], [tO, "TOO FAST, TOO TOUGH", "label"]] });
    ev(tSp, "scramble"); ev(tO, "boing"); }
  // 4 retreat after a month
  { const tW = wt(4, "withdrew"), tD = wt(4, "defeat");
    S2(4, { bg: "farm", draw: (g, t) => { const k = clamp((t - tW) / 2); for (let i = 0; i < 3; i++) guy(g, SOL(i), { x: lerp(300 + i * 200, -200 + i * 200, k), y: 1840, h: 520, dir: -1, expr: "sad", walk: k > 0 && k < 1 ? t * 1.6 : undefined, blink: 0, t }); for (let i = 0; i < 3; i++) emu(g, 820 + i * 100, 1840, 0.8, t + i, -1, 0); },
      titles: [["month", "AFTER A MONTH...", "label"], [tW, "THE ARMY WITHDREW", "stamp", { size: 100 }], [tD, "EMUS: 1 · ARMY: 0", "label", { fill: "#ffe08a" }]] });
    ev(tW, "sadtrombone"); ev(tD, "laugh", 0.5); }
}
