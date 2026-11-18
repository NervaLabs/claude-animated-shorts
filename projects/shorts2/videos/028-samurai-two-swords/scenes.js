// 028 — Why Samurai Carried Two Swords
"use strict";
function buildShots() {
  const SAM = C.samurai(0);
  const blade = (g, x, y, len, ang, col = "#d9dde6") => { g.save(); g.translate(x, y); g.rotate(ang); rect(g, -len * 0.18, -9, len * 0.18, 18, "#2a1a14", 4, 6); rect(g, -6, -16, 12, 32, "#c9a35a", 3, 4); g.beginPath(); g.moveTo(6, -8); g.quadraticCurveTo(len * 0.6, -14, len, -2); g.lineTo(len * 0.95, 8); g.quadraticCurveTo(len * 0.5, 8, 6, 8); g.closePath(); g.fillStyle = col; g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); g.restore(); };
  const room = (g) => { rect(g, -400, -200, 1900, 2400, "#e9dcc0", 0); rect(g, -300, 600, 1700, 120, "#5a3a24", 6); for (let i = 0; i < 7; i++) rect(g, -200 + i * 240, 720, 220, 900, "#f3ecda", 5); rect(g, -300, 1640, 1700, 400, "#c9b07a", 6); };
  // 0 hook
  S2(0, { bg: "japanVillage", blur: true, draw: (g, t) => { guy(g, SAM, { x: 540, y: 1840, h: 680, expr: "determined", blink: blinkAt(t, 1), t }); blade(g, 380, 1560, 300, 0.25); blade(g, 400, 1600, 170, 0.15); },
    titles: [["never", "NEVER JUST ONE SWORD", "stamp", { size: 100 }]] });
  ev(wt(0, "never"), "clank");
  // 1 daisho: katana outdoors, wakizashi indoors
  { const tD = wt(1, "daisho"), tK = wt(1, "katana"), tW = wt(1, "wakizashi"), tL = wt(1, "ceilings");
    S2(1, { bg: "japanVillage", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.05, 0]], draw: (g, t) => {
      if (t < tW - 0.3) { if (t < tK - 0.2) { blade(g, 200, 1200, 560, 0); blade(g, 320, 1400, 330, 0); } else { guy(g, SAM, { x: 540, y: 1840, h: 640, expr: "shout", armR: [2.4, -0.5], blink: 0, t }); blade(g, 680, 1180, 420, -0.9 + Math.sin(t * 5) * 0.4); } }
      else { room(g); const ok = t < tL - 0.1; guy(g, SAM, { x: 540, y: 1840, h: 640, expr: ok ? "calm" : "determined", armR: [1.4, -0.3], blink: blinkAt(t, 1), t }); if (t < tL - 0.1) blade(g, 640, 1450, 240, -0.3); else { blade(g, 640, 1200, 520, -1.2); shout(g, 700, 700, "BONK!", 54, clamp((t - tL) / 0.15)); blade(g, 560, 1500, 240, -0.2); } }
    }, titles: [[tD, "THE DAISHŌ: A PAIR", "stamp", { size: 96 }], [tK, "KATANA: BATTLEFIELD", "label"], [tW, "WAKIZASHI: INDOORS", "label", { fill: "#ffe08a" }], [tL, "LOW CEILINGS!", "stamp", { size: 110 }]] });
    ev(tD, "clank"); ev(tK, "whip"); ev(tW, "whoosh"); ev(tL, "crash", 0.5); }
  // 2 badge of rank
  { const tO = wt(2, "Only"), tB = wt(2, "badge");
    S2(2, { bg: "japanVillage", draw: (g, t) => { guy(g, SAM, { x: 300, y: 1840, h: 640, expr: "proud", blink: blinkAt(t, 1), t }); blade(g, 160, 1580, 300, 0.25); blade(g, 180, 1620, 170, 0.15); for (let i = 0; i < 2; i++) guy(g, C.japanese(i), { x: 700 + i * 220, y: 1840, h: 500, dir: -1, expr: "scared", armR: [0.4, 0.4], blink: blinkAt(t, i + 2), t }); if (t > tB - 0.2) { const k = clamp((t - tB + 0.2) / 0.3); g.save(); g.translate(300, 950); g.scale(k, k); ell(g, 0, 0, 110, 110, "#c0392b", 7); strokeText(g, "侍", 0, 10, 110, { fill: "#fff", lw: 0, shadow: false }); g.restore(); } },
      titles: [[tO, "SAMURAI CLASS ONLY", "label"], [tB, "A BADGE OF RANK", "stamp", { size: 110 }]] });
    ev(tB, "ding"); }
  // 3 katana left at door, short sword kept
  { const tL = wt(3, "leaving"), tK = wt(3, "kept");
    S2(3, { bg: "japanVillage", blur: true, draw: (g, t) => { room(g); rect(g, 60, 1440, 260, 30, "#5a3a24", 4); if (t > tL - 0.1) blade(g, 90, 1420, 260, 0); const x = lerp(260, 640, clamp((t - tL) / 1.5)); guy(g, SAM, { x, y: 1840, h: 620, expr: t > tK ? "sly" : "calm", walk: t < tL + 1.5 ? t * 1.5 : undefined, blink: blinkAt(t, 1), t }); blade(g, x + 100, 1560, 170, 0.15); if (t > tK - 0.1) { g.save(); g.globalAlpha = 0.5; ell(g, x + 160, 1570, 120, 50, "#ffe08a", 0); g.restore(); } },
      titles: [[tL, "KATANA LEFT AT THE DOOR", "label"], [tK, "...SHORT SWORD STAYS", "stamp", { size: 92 }]] });
    ev(tK, "sting", 0.6); }
}
