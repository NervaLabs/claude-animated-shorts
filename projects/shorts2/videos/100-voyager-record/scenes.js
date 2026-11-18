// 100 — The Voyager Golden Record Will Outlast Human Civilization
"use strict";
function buildShots() {
  const stars = (g, t, n = 120) => { g.fillStyle = "#05060f"; g.fillRect(-500, -500, 2200, 3000); for (let i = 0; i < n; i++) ell(g, rnd(i) * 1300 - 100, rnd(i * 3) * 2200 - 100, 2 + rnd(i * 5) * 3, 2 + rnd(i * 5) * 3, "#fff6d0", 0); };
  const record = (g, x, y, r, t, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot + t * 0.3); ell(g, 0, 0, r, r, "#e2b64b", 6); for (let i = 1; i < 6; i++) { g.beginPath(); g.arc(0, 0, r * i / 6, 0, TAU); g.strokeStyle = "rgba(120,80,20,0.4)"; g.lineWidth = 3; g.stroke(); } ell(g, 0, 0, r * 0.12, r * 0.12, "#a07a20", 3); g.restore(); };
  const probe = (g, x, y, s, t) => { g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-0.2); ell(g, 0, -40, 160, 60, "#e9e4dc", 6); line(g, [[0, 20], [0, 160]], 8); rect(g, -60, 20, 120, 80, "#9a9aa8", 5, 6); line(g, [[60, 60], [360, 120]], 5); line(g, [[-60, 60], [-260, 200]], 5); record(g, 0, 70, 30, 0); g.restore(); };
  // 0 hook: a billion years
  S2(0, { bg: "space", draw: (g, t) => { stars(g, t); record(g, 540, 1300, 300, t); },
    titles: [["gold-plated", "TWO GOLDEN RECORDS", "label", { fill: "#ffe08a" }], ["1977", "LAUNCHED IN 1977", "label"], ["billion", "1,000,000,000+ YEARS", "stamp", { size: 90 }]] });
  ev(wt(0, "billion"), "choir", 0.5);
  // 1 aboard Voyager 1 & 2: images, greetings, whales, thunder, music
  { const tV = wt(1, "Voyager"), tI = wt(1, "interstellar"), tIm = wt(1, "115"), tG = wt(1, "55"), tW = wt(1, "whales"), tM = wt(1, "Bach");
    S2(1, { bg: "space", keys: [[0, 540, 1300, 1.0, 0], [24, 540, 1300, 1.08, 0]], draw: (g, t) => { stars(g, t); if (t < tIm - 0.2) { probe(g, lerp(300, 760, clamp((t - tV) / 6)), 1300, 1.3, t); } else { record(g, 540, 1300, 260, t); const items = [[tIm, "115 IMAGES", 260, 900], [tG, "55 LANGUAGES", 820, 960], [tW, "WHALES & THUNDER", 260, 1720], [tM, "BACH → ROCK 'N' ROLL", 820, 1680]]; for (const [tt, s, x, y] of items) if (t > tt - 0.2) { const k = clamp((t - tt + 0.2) / 0.3); g.save(); g.translate(x, y); g.scale(k, k); rect(g, -190, -46, 380, 92, "#fff6e6", 6, 14); strokeText(g, s, 0, 2, 34, { fill: "#1c1422", lw: 0, shadow: false }); g.restore(); } } },
      titles: [[tV, "ABOARD VOYAGER 1 & 2", "label"], [tI, "NOW IN INTERSTELLAR SPACE", "stamp", { size: 80 }], [tIm, "A MESSAGE FROM EARTH", "label", { fill: "#ffe08a" }]] });
    ev(tV, "whoosh"); ev(tIm, "pop"); ev(tG, "pop"); ev(tW, "pop"); ev(tM, "pop"); }
  // 2 long after Earth's oceans are gone...
  { const tO = wt(2, "oceans"), tSt = wt(2, "stars");
    S2(2, { bg: "space", draw: (g, t) => { stars(g, t, 160); const k = clamp((t - tO) / 3); ell(g, 300, 1700, 140, 140, k > 0.5 ? "#c98a5a" : "#3f7fa4", 6); probe(g, lerp(560, 860, clamp((t - S(2)) / 8)), lerp(1100, 900, clamp((t - S(2)) / 8)), 0.8, t); },
      titles: [[tO, "AFTER EARTH'S OCEANS ARE GONE...", "label", { size: 56 }], [tSt, "STILL DRIFTING AMONG THE STARS", "stamp", { size: 76 }]] });
    ev(tSt, "choir", 0.5); }
}
