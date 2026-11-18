// 089 — How One Soviet Officer Prevented Nuclear War in 1983 (no explosions depicted)
"use strict";
function buildShots() {
  const PET = { ...C.soviet, tunic: "#5a6a4a", helmet: "cap", hatCol: "#5a6a4a", hair: "#3a2a1a" };
  const screen = (g, x, y, w, h, t, n = 0, alarm = false) => { rect(g, x - w / 2, y - h / 2, w, h, "#0a1a12", 8, 12); g.save(); g.beginPath(); g.rect(x - w / 2, y - h / 2, w, h); g.clip(); for (let i = 0; i < 6; i++) line(g, [[x - w / 2, y - h / 2 + i * h / 5], [x + w / 2, y - h / 2 + i * h / 5]], 2, "rgba(80,220,140,0.2)"); g.beginPath(); g.ellipse(x, y + h * 0.1, w * 0.35, h * 0.25, 0, 0, TAU); g.strokeStyle = "rgba(80,220,140,0.6)"; g.lineWidth = 4; g.stroke(); for (let i = 0; i < n; i++) { const q = ((t * 0.3 + i * 0.13) % 1); ell(g, x - w * 0.3 + i * w * 0.12, y - h * 0.3 + q * h * 0.2, 10, 10, "#ff4a3a", 0); } if (alarm && Math.sin(t * 10) > 0) { g.fillStyle = "rgba(255,40,40,0.25)"; g.fillRect(x - w / 2, y - h / 2, w, h); } g.restore(); };
  // 0 hook
  S2(0, { bg: "control", blur: true, draw: (g, t) => { guy(g, PET, { x: 540, y: 1840, h: 680, expr: "determined", blink: blinkAt(t, 1), t }); },
    titles: [["one", "ONE MAN", "stamp", { size: 140 }], ["Three", "STOPPED WORLD WAR III", "label", { fill: "#ffd0c0" }]] });
  ev(wt(0, "Three"), "drone");
  // 1 Sept 26 1983: alarms, 5 missiles
  { const tS = wt(1, "September"), tA = wt(1, "alarms"), tF = wt(1, "five");
    S2(1, { bg: "control", keys: [[0, 540, 1300, 1.0, 0], [12, 540, 1250, 1.1, 0]], draw: (g, t) => { screen(g, 540, 1200, 820, 620, t, t > tF - 0.2 ? 5 : 0, t > tA - 0.2); if (t > tA - 0.2 && Math.sin(t * 10) > 0) { g.fillStyle = "rgba(255,40,40,0.15)"; g.fillRect(-500, -500, 2200, 3000); } },
      titles: [[tS, "SEPTEMBER 26, 1983", "stamp", { size: 92 }], [tA, "SATELLITE ALARMS", "label", { fill: "#ffd0c0" }], [tF, "“5 INCOMING MISSILES”", "stamp", { size: 96, fill: "#ffb0a0" }]] }, night(0.2));
    ev(tA, "heartbeat"); ev(tF, "sting", 0.6); }
  // 2 Petrov: protocol says report
  { const tP = wt(2, "Petrov"), tR = wt(2, "report"), tRet = wt(2, "retaliation");
    S2(2, { bg: "control", draw: (g, t) => { screen(g, 760, 1200, 460, 380, t, 5, true); guy(g, PET, { x: 320, y: 1840, h: 660, expr: "scared", blink: blinkAt(t, 1), t }); if (t > tR - 0.2) { rect(g, 560, 1500, 400, 180, "#fff6e6", 7, 14); strokeText(g, "PROTOCOL:", 760, 1560, 40, { fill: "#1c1422", lw: 0, shadow: false }); strokeText(g, "REPORT NOW", 760, 1630, 48, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tP, "STANISLAV PETROV", "label"], [tR, "ORDERS: REPORT IT", "stamp", { size: 100 }], [tRet, "= FULL RETALIATION", "label", { fill: "#ffd0c0" }]] }, night(0.2));
    ev(tR, "heartbeat"); }
  // 3 gut call: false alarm — sunlight on clouds
  { const tT = wt(3, "Trusting"), tFa = wt(3, "false"), tSu = wt(3, "sunlight");
    S2(3, { bg: "control", draw: (g, t) => { if (t < tSu - 0.2) { guy(g, PET, { x: 540, y: 1840, h: 680, expr: t > tFa ? "calm" : "determined", armR: t > tFa ? [2.4, -0.3] : undefined, blink: blinkAt(t, 1), t }); if (t > tT - 0.2 && t < tFa) { rect(g, 640, 980, 300, 160, "#fff6e6", 7, 14); strokeText(g, "ONLY 5?", 790, 1065, 54, { fill: "#1c1422", lw: 0, shadow: false }); } } else { g.fillStyle = "#3a5a8a"; g.fillRect(-500, -500, 2200, 3000); sunStar(g, 880, 700, 110, "#ffcf4a"); for (let i = 0; i < 4; i++) ell(g, 200 + i * 230, 1500 + (i % 2) * 60, 160, 70, "#f6f3ea", 5); line(g, [[880, 700], [480, 1480]], 6, "#ffe08a"); rect(g, 380, 520, 120, 60, "#9a9aa8", 5, 6); line(g, [[440, 580], [470, 1460]], 4, "rgba(255,224,138,0.6)"); } },
      titles: [[tT, "HE TRUSTED HIS GUT", "label"], [tFa, "“FALSE ALARM.”", "stamp", { size: 110 }], [tSu, "SUNLIGHT ON CLOUDS", "label", { fill: "#ffe08a" }]] });
    ev(tFa, "ding"); ev(tSu, "choir", 0.5); }
}
