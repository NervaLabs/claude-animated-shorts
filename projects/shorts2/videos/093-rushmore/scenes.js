// 093 — Why Mount Rushmore Was Never Finished
"use strict";
function buildShots() {
  const BOR = { ...C.gent(2), tunic: "#5a4a3a", helmet: "cowboy", hatCol: "#6b4024", hair: "#9a9a9a", beard: "#9a9a9a" };
  const mount = (g) => { poly(g, [[-300, 1900], [-100, 900], [300, 700], [800, 760], [1200, 1000], [1400, 1900]], "#a8a49a", 8); for (let i = 0; i < 8; i++) line(g, [[rnd(i) * 1080, 900 + rnd(i * 3) * 900], [rnd(i) * 1080 + 80, 960 + rnd(i * 3) * 900]], 4, "rgba(70,70,70,0.3)"); };
  const heads = (g, k = 1, torso = 0) => { for (let i = 0; i < 4; i++) { const x = 220 + i * 210, y = 1080 + (i % 2) * 30; g.save(); g.globalAlpha = k; ell(g, x, y, 80, 100, "#c4c0b4", 5); ell(g, x - 26, y - 10, 10, 8, "#8a8a80", 0); ell(g, x + 26, y - 10, 10, 8, "#8a8a80", 0); line(g, [[x - 20, y + 50], [x + 20, y + 50]], 4, "#8a8a80"); if (torso) { g.globalAlpha = torso * 0.8; g.setLineDash([16, 12]); g.beginPath(); g.moveTo(x - 90, y + 110); g.lineTo(x - 110, y + 560); g.lineTo(x + 110, y + 560); g.lineTo(x + 90, y + 110); g.lineWidth = 6; g.strokeStyle = "#ffe08a"; g.stroke(); g.setLineDash([]); } g.restore(); } };
  // 0 hook: meant to go down to the waist
  S2(0, { bg: "farm", blur: true, draw: (g, t) => { mount(g); heads(g, 1, clamp((t - wt(0, "waists")) / 1)); },
    titles: [["Rushmore", "MOUNT RUSHMORE", "stamp", { size: 110 }], ["waists", "WAS MEANT TO REACH THE WAIST", "label", { size: 58, fill: "#ffe08a" }]] });
  ev(wt(0, "waists"), "boing");
  // 1 Borglum's torso designs
  { const tG = wt(1, "Gutzon"), tT = wt(1, "torso");
    S2(1, { bg: "farm", draw: (g, t) => { guy(g, BOR, { x: 260, y: 1840, h: 620, expr: "proud", armR: [2.2, -0.4], blink: blinkAt(t, 1), t }); rect(g, 480, 900, 520, 760, "#efe2c0", 7, 8); for (let i = 0; i < 4; i++) { const x = 560 + i * 120; ell(g, x, 1100, 44, 54, "#c4c0b4", 4); if (t > tT - 0.2) rect(g, x - 50, 1160, 100, 300, "#c4c0b4", 4, 10); } },
      titles: [[tG, "SCULPTOR GUTZON BORGLUM", "label"], [tT, "FULL TORSO PORTRAITS", "stamp", { size: 96 }], ["Lincoln", "4 PRESIDENTS", "label"]] });
    ev(tT, "build"); }
  // 2 14 years of dynamite; Borglum dies 1941; WWII funding cut → four heads
  { const tF = wt(2, "14"), tD = wt(2, "dynamite"), tM = wt(2, "March"), tC = wt(2, "Congress"), tH = wt(2, "heads");
    S2(2, { bg: "farm", keys: [[0, 540, 1300, 1.0, 0], [20, 540, 1300, 1.05, 0]], draw: (g, t) => { mount(g); heads(g, clamp((t - S(2)) / 4 + 0.3), 0); if (t > tD - 0.2 && t < tM) { const q = ((t - tD) * 0.8) % 1; g.save(); g.globalAlpha = 1 - q; boomFx(g, 300 + Math.floor((t - tD) * 0.8) * 200 % 700, 1500, 160 * q + 40, q); g.restore(); } if (t > tM - 0.2 && t < tH - 0.2) { rect(g, 300, 1450, 480, 240, "#fff6e6", 7, 14); strokeText(g, t > tC - 0.2 ? "FUNDS → WWII" : "MARCH 1941", 540, 1575, 54, { fill: "#1c1422", lw: 0, shadow: false }); } if (t > tH - 0.2) for (let i = 0; i < 4; i++) sparkle(g, 220 + i * 210, 920, 30, (t * 0.7 + i / 4) % 1); },
      titles: [[tF, "14 YEARS OF BLASTING", "label"], [tD, "DYNAMITE!", "stamp", { size: 110 }], [tM, "BORGLUM DIED · 1941", "label"], [tC, "FUNDING CUT FOR THE WAR", "label", { fill: "#ffd0c0" }], [tH, "JUST FOUR HEADS", "stamp", { size: 110 }]] });
    ev(tD, "boom"); ev(tD + 0.8, "boom", 0.6); ev(tM, "sad"); ev(tH, "choir", 0.5); }
}
