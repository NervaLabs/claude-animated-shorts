// 069 — Was the Trojan Horse Really a Siege Machine?
"use strict";
function buildShots() {
  const woodHorse = (g, x, y, s, t) => { g.save(); g.translate(x, y); g.scale(s, s); for (const lx of [-160, -90, 90, 160]) rect(g, lx - 20, -260, 40, 220, "#9a6a3a", 6, 8); rect(g, -220, -460, 440, 220, "#a07040", 7, 40); rect(g, 150, -720, 110, 300, "#a07040", 7, 30); rect(g, 140, -800, 220, 110, "#a07040", 7, 30); ell(g, 300, -770, 12, 12, INK, 0); poly(g, [[170, -810], [190, -870], [215, -810]], "#a07040", 5); for (let i = 0; i < 5; i++) line(g, [[-200 + i * 100, -460], [-200 + i * 100, -240]], 4, "rgba(60,30,10,0.4)"); rect(g, -260, -60, 520, 40, "#6b4024", 6, 8); for (const wx of [-200, 0, 200]) { ell(g, wx, -20, 36, 36, "#6b4024", 6); } g.restore(); };
  const ram = (g, x, y, s, t, hide = 1) => { g.save(); g.translate(x, y); g.scale(s, s); for (const wx of [-200, 0, 200]) ell(g, wx, -30, 50, 50, "#6b4024", 6); poly(g, [[-300, -80], [-240, -420], [240, -420], [300, -80]], hide ? "#8a6a4a" : "#a07040", 7); if (hide) for (let i = 0; i < 12; i++) ell(g, -200 + (i % 6) * 80, -340 + Math.floor(i / 6) * 140, 26, 16, "#6a4a2a", 0); const k = Math.sin(t * 4) * 30; rect(g, 260 + k, -240, 200, 50, "#6b4024", 6, 20); ell(g, 460 + k, -215, 40, 40, "#4a4a52", 6); g.restore(); };
  // 0 hook
  S2(0, { bg: "greekCity", blur: true, draw: (g, t) => { woodHorse(g, 540, 1840, 1.2, t); if (t > wt(0, "misunderstanding") - 0.2) strokeText(g, "?", 900, 1000, 220, { fill: "#ffe08a" }); },
    titles: [["Trojan", "THE TROJAN HORSE", "stamp", { size: 110 }], ["misunderstanding", "A MISUNDERSTANDING?", "label", { fill: "#ffe08a" }]] });
  ev(wt(0, "Trojan"), "horns");
  // 1 Homer's account; no proof
  { const tH = wt(1, "Homer's"), tW = wt(1, "warriors"), tN = wt(1, "proof");
    S2(1, { bg: "greekCity", draw: (g, t) => { woodHorse(g, 540, 1840, 1.2, t); if (t > tW - 0.2 && t < tN - 0.2) { g.save(); g.beginPath(); g.rect(540 - 264, 1840 - 552, 528, 264); g.clip(); rect(g, 0, 1200, 1080, 400, "#4a2a14", 0); for (let i = 0; i < 4; i++) guy(g, C.hoplite, { x: 340 + i * 130, y: 1580, h: 230, expr: "sly", blink: blinkAt(t, i), t, shadow: false }); g.restore(); } if (t > tN - 0.2) { rect(g, 300, 900, 480, 180, "#fff6e6", 7, 14); strokeText(g, "NO EVIDENCE", 540, 1000, 58, { fill: "#c0392b", lw: 0, shadow: false }); } },
      titles: [[tH, "HOMER'S ODYSSEY", "label", { font: "Cinzel" }], [tW, "WARRIORS HIDING INSIDE", "label"], [tN, "NO ARCHAEOLOGICAL PROOF", "stamp", { size: 86 }]] });
    ev(tW, "creak"); ev(tN, "sting", 0.5); }
  // 2 siege rams draped in wet horsehides
  { const tA = wt(2, "Assyrian"), tR = wt(2, "rams"), tHi = wt(2, "horsehides"), tF = wt(2, "flaming");
    S2(2, { bg: "greekCity", keys: [[0, 540, 1300, 1.0, 0], [14, 540, 1300, 1.06, 0]], draw: (g, t) => { ram(g, 480, 1840, 1.1, t, t > tHi - 0.2); if (t > tF - 0.2) for (let i = 0; i < 3; i++) { const q = ((t - tF) * 0.9 + i / 3) % 1; const x = lerp(1000, 520, q), y = lerp(900, 1420, q); line(g, [[x, y], [x + 60, y - 50]], 6, "#6b4024"); flame(g, x, y, 22, t + i); } },
      titles: [[tA, "ASSYRIAN & GREEK ARMIES", "label"], [tR, "COVERED BATTERING RAMS", "stamp", { size: 86 }], [tHi, "DRAPED IN WET HORSEHIDES", "label", { fill: "#ffe08a" }], [tF, "VS FLAMING ARROWS", "label", { fill: "#ffd0a0" }]] });
    ev(tR, "clank"); ev(tF, "whoosh"); }
  // 3 oral storytelling morphs it into a statue
  { const tO = wt(3, "oral"), tM = wt(3, "morphed"), tS = wt(3, "statue");
    S2(3, { bg: "greekCity", draw: (g, t) => { const k = clamp((t - tM) / 1.6); g.save(); g.globalAlpha = 1 - k; ram(g, 540, 1840, 1.1, t, 1); g.restore(); g.save(); g.globalAlpha = k; woodHorse(g, 540, 1840, 1.2, t); g.restore(); if (t < tM) for (let i = 0; i < 3; i++) guy(g, C.greek(i), { x: 160 + i * 380, y: 1960, h: 360, expr: "talk", mouthOpen: talk(t + i), blink: 0, t, shadow: false }); },
      titles: [[tO, "CENTURIES OF STORYTELLING", "label"], [tM, "A RAM BECAME...", "label"], [tS, "A WOODEN HORSE", "stamp", { size: 110 }]] });
    ev(tM, "whoosh"); ev(tS, "choir", 0.4); }
}
