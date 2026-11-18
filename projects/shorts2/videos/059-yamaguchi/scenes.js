// 059 — The Man Who Survived Both Atomic Bombs (sober treatment: no blast imagery, no injuries shown)
"use strict";
function buildShots() {
  const TY = { ...C.suit(1), tunic: "#3a3a44", trim: "#d9d9e6", hair: "#1a1012" };
  const skyline = (g, col = "#5a5a66") => { for (let i = 0; i < 9; i++) { const h = 160 + rnd(i * 5) * 200; rect(g, -100 + i * 150, 1500 - h, 130, h + 340, col, 5); } };
  const muted = (g) => { g.globalCompositeOperation = "saturation"; g.fillStyle = "rgba(128,128,128,0.6)"; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
  const light = (g, t, t0) => { const k = clamp(1 - Math.abs(t - t0 - 0.3) / 0.6); if (k > 0) { g.save(); g.globalAlpha = k * 0.9; g.fillStyle = "#fffbe8"; g.fillRect(-500, -500, 2200, 3000); g.restore(); } };
  const train = (g, x, y, t) => { for (let i = 0; i < 3; i++) { rect(g, x + i * 330, y - 200, 310, 180, ["#3a4a5a", "#4a5a6a", "#4a5a6a"][i], 6, 12); for (let w = 0; w < 4; w++) rect(g, x + i * 330 + 20 + w * 72, y - 170, 54, 60, "#f6f0d0", 4, 4); ell(g, x + i * 330 + 60, y - 10, 26, 26, "#2a2a32", 4); ell(g, x + i * 330 + 250, y - 10, 26, 26, "#2a2a32", 4); } };
  // 0 hook
  S2(0, { bg: "americanTown", blur: true, draw: (g, t) => { guy(g, TY, { x: 540, y: 1840, h: 680, expr: "calm", blink: blinkAt(t, 1), t }); },
    titles: [["engineer", "A JAPANESE ENGINEER", "label"], ["both", "SURVIVED BOTH ATOMIC BOMBINGS", "stamp", { size: 70 }]] }, muted);
  ev(wt(0, "both"), "drone");
  // 1 Aug 6 1945, Hiroshima, business trip, < 2 miles away
  { const tA = wt(1, "August"), tT = wt(1, "Tsutomu"), tH = wt(1, "Hiroshima"), tD = wt(1, "detonated"), tM = wt(1, "two");
    S2(1, { bg: "dark", draw: (g, t) => { g.fillStyle = "#9ab0c8"; g.fillRect(-500, -500, 2200, 2100); skyline(g); if (t < tD - 0.1) guy(g, TY, { x: 540, y: 1840, h: 560, expr: "neutral", hold: { r: "bag" }, blink: blinkAt(t, 1), t }); light(g, t, tD); if (t > tM - 0.2) { rect(g, 300, 900, 480, 160, "#fff6e6", 7, 14); strokeText(g, "< 2 MILES AWAY", 540, 985, 52, { fill: "#1c1422", lw: 0, shadow: false }); } },
      titles: [[tA, "AUGUST 6, 1945", "stamp", { size: 100 }], [tT, "TSUTOMU YAMAGUCHI", "label"], [tH, "HIROSHIMA · ON BUSINESS", "label"]] }, muted);
    ev(tD, "rumble", 0.5); }
  // 2 injured; shelter; train home to Nagasaki
  { const tB = wt(2, "Badly"), tS = wt(2, "shelter"), tTr = wt(2, "train"), tN = wt(2, "Nagasaki");
    S2(2, { bg: "dark", draw: (g, t) => { if (t < tTr - 0.2) { g.fillStyle = "#3a3a44"; g.fillRect(-500, -500, 2200, 3000); g.beginPath(); g.ellipse(540, 1840, 600, 700, 0, Math.PI, 0); g.fillStyle = "#4a4a54"; g.fill(); guy(g, { ...TY, tunic: "#5a5a64" }, { x: 540, y: 1840, h: 540, sit: true, lean: -20, expr: "tired", hideArms: true, t, shadow: false }); } else { g.fillStyle = "#8a9ab0"; g.fillRect(-500, -500, 2200, 2100); g.fillStyle = "#6a7a5a"; g.fillRect(-500, 1600, 2200, 700); line(g, [[-400, 1700], [1500, 1700]], 8, "#5a5a66"); train(g, lerp(-1100, 1100, clamp((t - tTr) / 4)), 1700, t); } },
      titles: [[tB, "BADLY INJURED", "label"], [tS, "A NIGHT IN A SHELTER", "label"], [tTr, "A TRAIN HOME TO...", "label"], [tN, "NAGASAKI", "stamp", { size: 130 }]] }, muted);
    ev(tTr, "rumble", 0.4); ev(tN, "drone"); }
  // 3 three days later, describing the blast — the second bomb
  { const tTh = wt(3, "Three"), tBo = wt(3, "boss"), tSe = wt(3, "second");
    S2(3, { bg: "victorianRoom", draw: (g, t) => { rect(g, 620, 820, 360, 440, "#cfe0f0", 8, 6); guy(g, TY, { x: 300, y: 1840, h: 600, expr: "talk", mouthOpen: t < tSe ? talk(t) : 0, armR: [2.4, -0.3], blink: blinkAt(t, 1), t }); guy(g, C.suit(2), { x: 700, y: 1840, h: 600, dir: -1, expr: "neutral", blink: blinkAt(t, 2), t }); light(g, t, tSe); },
      titles: [[tTh, "THREE DAYS LATER", "label"], [tBo, "DESCRIBING IT TO HIS BOSS", "label"], [tSe, "THE SECOND BOMB FELL", "stamp", { size: 92 }]] }, muted);
    ev(tSe, "rumble", 0.5); }
  // 4 survived; lived to 93
  { const tA = wt(4, "again"), tN = wt(4, "93");
    S2(4, { bg: "japanVillage", draw: (g, t) => { guy(g, { ...TY, hair: "#d9d9d9" }, { x: 540, y: 1840, h: 640, expr: "calm", blink: blinkAt(t, 1), t }); for (let i = 0; i < 6; i++) { const q = (t * 0.25 + i / 6) % 1; ell(g, 100 + i * 180 + Math.sin(t + i) * 30, 600 + q * 1300, 12, 9, "#f6c0d0", 2); } },
      titles: [[tA, "HE SURVIVED AGAIN", "stamp", { size: 100 }], [tN, "AND LIVED TO 93", "label", { fill: "#ffe0f0" }]] }, muted);
    ev(tN, "choir", 0.4); }
}
