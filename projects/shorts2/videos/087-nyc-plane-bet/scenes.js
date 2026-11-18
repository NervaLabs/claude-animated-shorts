// 087 — The Pilot Who Landed a Plane in Front of a NYC Bar, Twice
"use strict";
function buildShots() {
  const TF = { ...C.gent(1), tunic: "#5a4a3a", helmet: "cap", hatCol: "#3a3a44", hair: "#3a2a1a" };
  const bar = (g) => { rect(g, -400, -300, 1900, 2600, "#3a2a24", 0); rect(g, -200, 1460, 1500, 80, "#8a5a32", 7, 8); rect(g, -200, 1540, 1500, 400, "#6b4024", 6); for (let i = 0; i < 6; i++) rect(g, 100 + i * 150, 1000, 50, 120, ["#3a6a3a", "#8a3a2a", "#c9a35a"][i % 3], 4, 10); rect(g, 60, 1120, 960, 20, "#5a3a24", 4); };
  const street = (g, t) => { g.fillStyle = "#1c1e3a"; g.fillRect(-500, -500, 2200, 3000); for (let i = 0; i < 2; i++) { rect(g, i ? 760 : -200, 500, 520, 1400, "#3a3a4a", 6); for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) rect(g, (i ? 800 : -160) + c * 150, 560 + r * 150, 90, 90, rnd(r * 3 + c + i * 40) > 0.6 ? "#f6e08a" : "#2a2a3a", 3, 4); } g.fillStyle = "#4a4a52"; g.fillRect(-500, 1800, 2200, 600); line(g, [[540, 1820], [540, 2200]], 8, "#f2c443"); };
  // 0 hook
  S2(0, { bg: "dark", draw: (g, t) => { street(g, t); plane(g, { x: 540, y: 1650, h: 300, rot: 0, col: "#c0392b", t }); },
    titles: [["stole", "HE BORROWED A PLANE...", "label"], ["Manhattan", "LANDED ON A MANHATTAN STREET", "stamp", { size: 76 }], ["bet", "TO WIN A BAR BET", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "bet"), "laugh", 0.5);
  // 1 1956: the bet
  { const tY = wt(1, "1956"), tT = wt(1, "Thomas"), tD = wt(1, "doubted"), tF = wt(1, "15");
    S2(1, { bg: "dark", draw: (g, t) => { bar(g); guy(g, TF, { x: 320, y: 1840, h: 620, expr: t > tD ? "sly" : "happy", blink: blinkAt(t, 1), t }); guy(g, C.gent(2), { x: 760, y: 1840, h: 600, dir: -1, expr: "laugh", armR: [2.4, -0.3], blink: blinkAt(t, 2), t }); if (t > tF - 0.2) { rect(g, 360, 760, 360, 180, "#fff6e6", 7, 14); strokeText(g, "NJ → NYC", 540, 830, 46, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "15 MIN?", 540, 900, 46, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tY, "1956", "stamp", { size: 160 }], [tT, "THOMAS FITZPATRICK", "label"], [tD, "“YOU CAN'T DO IT!”", "label", { fill: "#ffd0c0" }]] });
    ev(tY, "boom", 0.4); ev(tD, "laugh"); }
  // 2 3 a.m. landing outside the bar
  { const i2 = si("single-engine"), tSi = wt(i2, "single-engine"), i2b = si("Avenue", i2), tA = wt(i2b, "Avenue");
    S2(si("three"), { bg: "dark", keys: [[0, 540, 1300, 1.0, 0], [8, 540, 1350, 1.08, 0]], draw: (g, t) => { street(g, t); const k = clamp((t - tSi) / 2.5); plane(g, { x: lerp(-300, 540, k), y: lerp(900, 1650, k), h: 300, rot: lerp(0.25, 0, k), col: "#c0392b", t }); if (k >= 1) for (let i = 0; i < 3; i++) sparkle(g, 300 + i * 240, 1500, 30, (t + i / 3) % 1); },
      titles: [["three", "3:00 AM", "stamp", { size: 120 }], [tSi, "A SINGLE-ENGINE PLANE", "label"], [tA, "TOUCHED DOWN ON THE STREET", "label", { fill: "#ffe08a", size: 60 }]] });
    ev(tSi, "plane"); ev(tA, "skid"); }
  // 3 did it again two years later
  { const i3 = si("Two"), tT = wt(i3, "Two"), tS = wt(i3, "second");
    S2(i3, { bg: "dark", draw: (g, t) => { street(g, t); plane(g, { x: 540, y: 1650, h: 300, rot: 0, col: "#2f4f9f", t }); rect(g, 380, 860, 320, 200, "#fff6e6", 7, 14); strokeText(g, "x2", 540, 970, 110, { fill: "#c0392b", lw: 0, shadow: false }); },
      titles: [[tT, "TWO YEARS LATER...", "label"], [tS, "HE DID IT AGAIN", "stamp", { size: 110 }]] });
    ev(tS, "plane"); ev(tS + 0.6, "laugh", 0.6); }
}
