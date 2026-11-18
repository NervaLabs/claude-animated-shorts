// 039 — The Pirate Queen Who Commanded 40,000 Sailors
"use strict";
function buildShots() {
  const ZYS = { tunic: "#c0392b", trim: "#e2b64b", hair: "#1a1012", lady: true, robe: true, cape: "#7a1a2a" };
  const ZYS0 = { tunic: "#6a8a9a", trim: "#3a4a5a", hair: "#1a1012", lady: true };
  const PIR = (i) => ({ ...C.soldierCN, tunic: ["#7a2a2a", "#3a3a4a", "#6a4a2a"][i % 3], helmet: "bandana", hatCol: "#c0392b" });
  const junk = (g, x, y, h, t, dir = 1, seed = 0) => sailShip(g, { x, y, h, t, dir, hull: "#6b4024", stripe: "#c0392b", sail: "#c0392b", flag: ["#c0392b"], seed });
  // 0 hook
  S2(0, { bg: "sea", blur: true, draw: (g, t) => { sea(g, 1300, t, -900, 2000, "#2f8aa8", "#1f5f7a"); guy(g, ZYS, { x: 540, y: 1840, h: 680, expr: "proud", blink: blinkAt(t, 1), t }); },
    titles: [["successful", "HISTORY'S MOST SUCCESSFUL PIRATE", "label", { size: 54 }], ["Blackbeard", "NOT BLACKBEARD", "stamp", { size: 100 }], ["tavern", "A FORMER TAVERN WORKER", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "Blackbeard"), "sting", 0.5);
  // 1 takes command of the Red Flag Fleet
  { const tZ = wt(1, "Zheng"), tR = wt(1, "Red");
    S2(1, { bg: "sea", draw: (g, t) => { sea(g, 1150, t, -900, 2000, "#2f8aa8", "#1f5f7a"); for (let i = 0; i < 3; i++) junk(g, 220 + i * 320, 1300 + (i % 2) * 70, 300, t, 1, i); if (t > tR - 0.2) { const k = clamp((t - tR + 0.2) / 0.4); g.save(); g.globalAlpha = k; rect(g, 380, 860, 320, 200, "#c0392b", 7, 8); strokeText(g, "紅旗", 540, 975, 90, { fill: "#fff6e6", lw: 0, shadow: false }); g.restore(); } },
      titles: [["1800s", "EARLY 1800s, CHINA", "label"], [tZ, "ZHENG YI SAO", "stamp", { size: 120 }], [tR, "COMMANDS THE RED FLAG FLEET", "label", { size: 58, fill: "#ffc0c0" }]] });
    ev(tZ, "boom", 0.5); ev(tR, "horns"); }
  // 2 strict code; 400 ships, 40,000 pirates; beat the navy
  { const tC = wt(2, "code"), tFh = wt(2, "400"), tFt = wt(2, "40,000"), tD = wt(2, "defeated");
    S2(2, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [16, 540, 1300, 0.9, 0]], draw: (g, t) => {
      if (t < tFh - 0.3) { sea(g, 1100, t, -900, 2000, "#2f8aa8", "#1f5f7a"); guy(g, ZYS, { x: 300, y: 1840, h: 640, expr: "angry", armR: [2.6, -0.2], blink: blinkAt(t, 1), t }); scroll(g, 760, 1300, 360, 520, "THE CODE", 6, 0.04); }
      else { sea(g, 1100, t, -900, 2000, "#2f8aa8", "#1f5f7a"); const n = Math.min(14, 3 + Math.floor((t - tFh) * 5)); for (let i = 0; i < n; i++) junk(g, -100 + (i % 5) * 280 + (Math.floor(i / 5) % 2) * 140, 1150 + Math.floor(i / 5) * 160, 180 + Math.floor(i / 5) * 40, t, 1, i); if (t > tD - 0.2) { { const k = clamp((t - tD) / 1.5); g.save(); g.translate(980, 1700 + k * 120); g.rotate(k * 0.5); sailShip(g, { x: 0, y: 0, h: 260, t, dir: -1, hull: "#d9c08a", sail: "#f2c443", seed: 9 }); g.restore(); } } }
    }, titles: [[tC, "A STRICT PIRATE CODE", "label"], ["villagers", "NO STEALING FROM VILLAGERS", "label", { size: 56, fill: "#ffd0c0" }], [tFh, "400+ SHIPS", "stamp", { size: 120 }], [tFt, "40,000 PIRATES", "stamp", { size: 110 }], [tD, "BEAT THE IMPERIAL NAVY", "label", { fill: "#ffe08a" }]] });
    ev(tC, "clank"); ev(tFh, "horns"); ev(tD, "cannon"); ev(tD + 0.4, "cannon", 0.6); }
  // 3 negotiated pardon, retired rich
  { const tP = wt(3, "pardon"), tW = wt(3, "wealthy");
    S2(3, { bg: "chinaPalace", draw: (g, t) => { guy(g, ZYS, { x: 300, y: 1840, h: 640, expr: t > tW ? "laugh" : "sly", armR: [2.0, -0.4], blink: blinkAt(t, 1), t }); guy(g, C.chinaEmp, { x: 780, y: 1840, h: 640, dir: -1, expr: "nervous", hold: { r: "scroll" }, armR: [1.6, -0.4], blink: blinkAt(t, 2), t }); if (t > tW - 0.2) for (let i = 0; i < 8; i++) { const q = (t * 0.8 + i / 8) % 1; ell(g, 200 + i * 90, 900 + q * 900, 18, 18, "#f2c443", 3); } },
      titles: [["dying", "SHE DIDN'T DIE IN BATTLE", "label"], [tP, "A FULL PARDON", "stamp", { size: 110 }], [tW, "...AND RETIRED RICH", "label", { fill: "#ffe08a" }]] });
    ev(tP, "ding"); ev(tW, "coins"); }
}
