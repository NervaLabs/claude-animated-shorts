// 064 — The Pig That Started a Border Standoff Between the US and Britain
"use strict";
function buildShots() {
  const FARM = { ...C.cowboy, tunic: "#6b4024", trim: "#3a2a1a" };
  const REDC = (i) => ({ ...C.tommy, tunic: "#c0392b", trim: "#f6f3ea", helmet: "shako", hatCol: "#1c1422" });
  const BLUE = (i) => ({ ...C.gi, tunic: "#1f2f6f", trim: "#e2b64b", helmet: "cap", hatCol: "#1f2f6f" });
  const potatoes = (g, x, y) => { for (let i = 0; i < 6; i++) ell(g, x + (i % 3) * 60, y - Math.floor(i / 3) * 30, 30, 22, "#c9a06a", 4); };
  // 0 hook
  S2(0, { bg: "farm", blur: true, draw: (g, t) => { pig(g, { x: 540, y: 1800, h: 300 }); for (let i = 0; i < 2; i++) { const F = i ? REDC : BLUE; guy(g, F(i), { x: i ? 900 : 180, y: 1840, h: 560, dir: i ? -1 : 1, expr: "angry", hold: { r: "spear" }, blink: blinkAt(t, i), t }); } },
    titles: [["war", "US VS BRITAIN: NEAR WAR", "stamp", { size: 86 }], ["pig", "...OVER ONE PIG", "label", { fill: "#ffc0d0" }]] });
  ev(wt(0, "pig"), "oink");
  // 1 San Juan Island; the pig in the potatoes; the farmer (non-graphic)
  { const tS = wt(1, "San"), tP = wt(1, "potatoes"), tSh = wt(1, "shot");
    S2(1, { bg: "farm", draw: (g, t) => { potatoes(g, 600, 1820); if (t < tSh - 0.1) { pig(g, { x: 620, y: 1800, h: 260, phase: t }); guy(g, FARM, { x: 220, y: 1840, h: 620, expr: "angry", blink: blinkAt(t, 1), t }); } else { guy(g, FARM, { x: 220, y: 1840, h: 620, expr: "shock", blink: 0, t }); g.save(); g.globalAlpha = 0.85; strokeText(g, "OINK...", 700, 1500, 70, { fill: "#fff" }); g.restore(); } },
      titles: [[tS, "SAN JUAN ISLAND, 1859", "label"], [tSh, "A FARMER SHOT A STRAY PIG", "stamp", { size: 84 }], [tP, "IT WAS EATING HIS POTATOES", "label", { fill: "#ffd0c0" }]] });
    ev(tP, "oink"); ev(tSh, "gunshot", 0.5); }
  // 2 escalation: US troops vs 5 warships, 2,000 sailors
  { const tA = wt(2, "arrest"), tU = wt(2, "troops"), tF = wt(2, "five"), tT = wt(2, "2,000");
    S2(2, { bg: "sea", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 0.92, 0]], draw: (g, t) => { if (t < tU - 0.2) { guy(g, REDC(0), { x: 760, y: 1840, h: 620, dir: -1, expr: "angry", hold: { r: "scroll" }, armR: [2.2, -0.3], blink: blinkAt(t, 1), t }); guy(g, FARM, { x: 300, y: 1840, h: 600, expr: "scared", blink: 0, t }); } else { sea(g, 1150, t, -900, 2000, "#2fa0c8", "#1f6f9a"); rect(g, -400, 1700, 900, 600, "#d9c08a", 6); for (let i = 0; i < 4; i++) guy(g, BLUE(i), { x: 80 + i * 110, y: 1840, h: 440, expr: "determined", hold: { r: "spear" }, blink: 0, t, shadow: false }); const n = t > tF - 0.2 ? Math.min(5, 1 + Math.floor((t - tF + 0.2) * 6)) : 0; for (let i = 0; i < n; i++) sailShip(g, { x: 620 + (i % 3) * 170, y: 1260 + Math.floor(i / 3) * 110, h: 200, t, dir: -1, hull: "#3a2a1a", sail: "#f6f3ea", flag: ["#c0392b"], seed: i }); } },
      titles: [[tA, "BRITAIN: “ARREST HIM!”", "label"], [tU, "US TROOPS LANDED", "stamp", { size: 100 }], [tF, "5 BRITISH WARSHIPS", "label"], [tT, "2,000 SAILORS", "stamp", { size: 110 }]] });
    ev(tU, "march"); ev(tF, "horns"); }
  // 3 no first shot; only casualty: the pig
  { const tR = wt(3, "refused"), tP = wt(3, "Pig"), tPi = wt(3, "itself");
    S2(3, { bg: "farm", draw: (g, t) => { if (t < tP - 0.2) { guy(g, BLUE(0), { x: 280, y: 1840, h: 600, expr: "calm", armR: [2.4, -0.3], blink: blinkAt(t, 1), t }); guy(g, REDC(0), { x: 800, y: 1840, h: 600, dir: -1, expr: "calm", armR: [2.4, -0.3], blink: blinkAt(t, 2), t }); } else { rect(g, 440, 1500, 200, 300, "#9a9aa8", 6, 60); strokeText(g, "PIG", 540, 1620, 56, { fill: "#4a4a52", lw: 0, shadow: false }); strokeText(g, "1859", 540, 1700, 36, { fill: "#4a4a52", lw: 0, shadow: false }); for (let i = 0; i < 4; i++) ell(g, 380 + i * 110, 1820, 30, 14, "#e07aa8", 3); } },
      titles: [[tR, "NOBODY FIRED FIRST", "stamp", { size: 100 }], [tP, "THE “PIG WAR”", "stamp", { size: 120, fill: "#ffc0d0" }], [tPi, "ONLY CASUALTY: THE PIG", "label"]] });
    ev(tR, "ding"); ev(tPi, "sad", 0.6); }
}
