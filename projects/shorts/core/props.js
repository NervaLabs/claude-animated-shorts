// Shared props for the history shorts: hats, outfits, ships, weapons, water, buildings, animals, effects.
"use strict";

// ---------- hats (hooked into head() by name) ----------
const HATS = {
  tricorn(g, rx, ry, lw, o) {
    poly(g, [[-rx * 1.35, -ry * 0.55], [-rx * 0.8, -ry * 1.35], [0, -ry * 1.05], [rx * 0.8, -ry * 1.35], [rx * 1.35, -ry * 0.55], [0, -ry * 0.75]], o.hatCol ?? "#1f1a24", lw, true);
    if (o.hatTrim) line(g, [[-rx * 1.3, -ry * 0.6], [0, -ry * 0.8], [rx * 1.3, -ry * 0.6]], 2.5 * rx / 15, o.hatTrim);
  },
  bicorne(g, rx, ry, lw, o) {
    poly(g, [[-rx * 1.7, -ry * 0.55], [-rx * 0.6, -ry * 1.45], [rx * 0.6, -ry * 1.45], [rx * 1.7, -ry * 0.55], [0, -ry * 0.7]], o.hatCol ?? "#1f1a24", lw, true);
    ell(g, rx * 0.15, -ry * 1.0, rx * 0.16, ry * 0.18, o.cockade ?? "#e2453c", lw * 0.5);
  },
  shako(g, rx, ry, lw, o) {
    poly(g, [[-rx * 0.85, -ry * 0.5], [-rx * 0.95, -ry * 1.6], [rx * 0.95, -ry * 1.6], [rx * 0.85, -ry * 0.5]], o.hatCol ?? "#1f1a24", lw);
    line(g, [[-rx * 0.95, -ry * 0.55], [rx * 1.25, -ry * 0.45]], 3 * rx / 15, "#1f1a24");
    ell(g, 0, -ry * 1.2, rx * 0.2, ry * 0.2, o.badge ?? "#e7c15f", lw * 0.5);
    if (o.plume) poly(g, [[-rx * 0.12, -ry * 1.6], [0, -ry * 2.4], [rx * 0.12, -ry * 1.6]], o.plume, lw * 0.6, true);
  },
  busby(g, rx, ry, lw, o) { // hussar fur cap
    smoothPath(g, [[-rx * 0.95, -ry * 0.45], [-rx * 1.05, -ry * 1.3], [0, -ry * 1.75], [rx * 1.05, -ry * 1.3], [rx * 0.95, -ry * 0.45]]); fillInk(g, "#2a1d18", lw);
    poly(g, [[rx * 0.2, -ry * 1.5], [rx * 1.3, -ry * 1.2], [rx * 1.0, -ry * 0.7]], o.bag ?? "#c0392b", lw * 0.6, true);
    poly(g, [[-rx * 0.1, -ry * 1.7], [rx * 0.05, -ry * 2.4], [rx * 0.2, -ry * 1.7]], "#f6f3ea", lw * 0.5, true);
  },
  tophat(g, rx, ry, lw, o) {
    rect(g, -rx * 0.7, -ry * 2.0, rx * 1.4, ry * 1.4, o.hatCol ?? "#1f1a24", lw);
    poly(g, [[-rx * 1.2, -ry * 0.55], [rx * 1.2, -ry * 0.55], [rx * 1.05, -ry * 0.75], [-rx * 1.05, -ry * 0.75]], o.hatCol ?? "#1f1a24", lw);
    line(g, [[-rx * 0.7, -ry * 0.95], [rx * 0.7, -ry * 0.95]], 3 * rx / 15, o.band ?? "#8a3a2a");
  },
  bowler(g, rx, ry, lw, o) {
    smoothPath(g, [[-rx * 0.85, -ry * 0.55], [-rx * 0.8, -ry * 1.15], [0, -ry * 1.45], [rx * 0.8, -ry * 1.15], [rx * 0.85, -ry * 0.55]]); fillInk(g, o.hatCol ?? "#2a2430", lw);
    poly(g, [[-rx * 1.2, -ry * 0.5], [rx * 1.2, -ry * 0.5], [rx * 1.1, -ry * 0.65], [-rx * 1.1, -ry * 0.65]], o.hatCol ?? "#2a2430", lw);
  },
  sailor(g, rx, ry, lw, o) {
    smoothPath(g, [[-rx * 0.95, -ry * 0.55], [-rx * 0.9, -ry * 1.0], [0, -ry * 1.15], [rx * 0.9, -ry * 1.0], [rx * 0.95, -ry * 0.55]]); fillInk(g, o.hatCol ?? "#f6f3ea", lw);
    line(g, [[-rx * 0.95, -ry * 0.6], [rx * 0.95, -ry * 0.6]], 3 * rx / 15, o.band ?? "#1f2a44");
  },
  peaked(g, rx, ry, lw, o) { // officer's peaked cap
    smoothPath(g, [[-rx * 1.05, -ry * 0.6], [-rx * 1.2, -ry * 1.15], [0, -ry * 1.35], [rx * 1.2, -ry * 1.15], [rx * 1.05, -ry * 0.6]]); fillInk(g, o.hatCol ?? "#5a5a3a", lw);
    poly(g, [[-rx * 0.2, -ry * 0.62], [rx * 1.25, -ry * 0.62], [rx * 1.0, -ry * 0.42], [-rx * 0.1, -ry * 0.48]], "#1f1a24", lw * 0.7);
    ell(g, 0, -ry * 0.95, rx * 0.15, ry * 0.12, o.badge ?? "#e7c15f", lw * 0.4);
  },
  steel(g, rx, ry, lw, o) { // WWII-style round helmet
    smoothPath(g, [[-rx * 1.25, -ry * 0.35], [-rx * 1.05, -ry * 1.05], [0, -ry * 1.3], [rx * 1.05, -ry * 1.05], [rx * 1.25, -ry * 0.35]]); fillInk(g, o.hatCol ?? "#5f6a45", lw);
  },
  cap(g, rx, ry, lw, o) { // flat cap / baseball-ish
    smoothPath(g, [[-rx * 1.0, -ry * 0.5], [-rx * 0.9, -ry * 1.05], [rx * 0.4, -ry * 1.15], [rx * 1.0, -ry * 0.7], [rx * 1.45, -ry * 0.55]]); fillInk(g, o.hatCol ?? "#8a5a32", lw);
  },
  turban(g, rx, ry, lw, o) {
    smoothPath(g, [[-rx * 1.1, -ry * 0.45], [-rx * 1.15, -ry * 1.15], [0, -ry * 1.55], [rx * 1.15, -ry * 1.15], [rx * 1.1, -ry * 0.45]]); fillInk(g, o.hatCol ?? "#f3ecda", lw);
    for (let i = 0; i < 3; i++) line(g, [[-rx * 1.0, -ry * (0.65 + i * 0.25)], [rx * 1.0, -ry * (0.85 + i * 0.25)]], 1.4 * rx / 15, "rgba(28,20,34,0.4)");
    ell(g, 0, -ry * 0.9, rx * 0.16, ry * 0.18, o.gem ?? "#c0392b", lw * 0.5);
  },
  mitre(g, rx, ry, lw, o) {
    poly(g, [[-rx * 0.85, -ry * 0.55], [-rx * 0.7, -ry * 1.7], [0, -ry * 2.3], [rx * 0.7, -ry * 1.7], [rx * 0.85, -ry * 0.55]], o.hatCol ?? "#f6f3ea", lw, false);
    line(g, [[0, -ry * 0.6], [0, -ry * 2.2]], 3 * rx / 15, "#d4a632"); line(g, [[-rx * 0.8, -ry * 0.75], [rx * 0.8, -ry * 0.75]], 3 * rx / 15, "#d4a632");
  },
  laurel(g, rx, ry, lw) {
    for (const sd of [-1, 1]) for (let i = 0; i < 5; i++) { const a = Math.PI * (sd < 0 ? 1.05 + i * 0.1 : -0.05 - i * 0.1); ell(g, Math.cos(a) * rx * 0.98, Math.sin(a) * ry * 0.98 - ry * 0.15, rx * 0.14, ry * 0.08, "#6a9a45", lw * 0.5, a + Math.PI / 2); }
  },
  bonnet(g, rx, ry, lw, o) {
    smoothPath(g, [[-rx * 1.2, ry * 0.1], [-rx * 1.15, -ry * 0.9], [0, -ry * 1.3], [rx * 1.15, -ry * 0.9], [rx * 1.2, ry * 0.1], [rx * 0.85, -ry * 0.45], [-rx * 0.85, -ry * 0.45]]); fillInk(g, o.hatCol ?? "#f3ecda", lw);
  },
  coif(g, rx, ry, lw, o) { // medieval headscarf
    smoothPath(g, [[-rx * 1.1, ry * 0.7], [-rx * 1.15, -ry * 0.9], [0, -ry * 1.2], [rx * 1.15, -ry * 0.9], [rx * 1.1, ry * 0.7], [rx * 0.8, -ry * 0.35], [-rx * 0.8, -ry * 0.35]]); fillInk(g, o.hatCol ?? "#f3ecda", lw);
  },
  kettlehat(g, rx, ry, lw) { // medieval kettle helmet
    smoothPath(g, [[-rx * 1.5, -ry * 0.45], [-rx * 0.95, -ry * 0.75], [-rx * 0.85, -ry * 1.2], [0, -ry * 1.4], [rx * 0.85, -ry * 1.2], [rx * 0.95, -ry * 0.75], [rx * 1.5, -ry * 0.45], [0, -ry * 0.62]]); fillInk(g, "#9aa0ab", lw);
  },
};

// ---------- outfits ----------
const OUTF = {
  redcoat: { tunic: "#c0262e", trim: "#f2efe6", helmet: "tricorn", hatTrim: "#f2efe6", trousers: "#f2efe6", boots: "#1f1a24" },
  bluecoat: { tunic: "#2f4f8f", trim: "#e7c15f", helmet: "peaked", hatCol: "#2f4f8f", trousers: "#5f7fae", boots: "#1f1a24" },
  dutchSailor: { tunic: "#2f4f8f", trim: "#f2efe6", helmet: "tricorn", hairUnder: false, trousers: "#e9e2cc" },
  dutchCaptain: { tunic: "#1f3a6e", trim: "#e7c15f", helmet: "bicorne", cockade: "#f07f1e", trousers: "#e9e2cc", sash: "#f07f1e" },
  impSailor: { tunic: "#e9e2cc", trim: "#c9a35a", helmet: "sailor", hatCol: "#3a3a3a", trousers: "#8a6a4a" },
  impCaptain: { tunic: "#f2efe6", trim: "#d4a632", helmet: "tricorn", hatCol: "#1f1a24", hatTrim: "#d4a632", trousers: "#e9e2cc" },
  cook: { tunic: "#f6f3ea", trim: "#c0392b", helmet: "chef", trousers: "#5a5a6a" },
  farmer: { tunic: "#7a5a3a", trim: "#d9c08a", helmet: "cap", hatCol: "#9a7a4a", trousers: "#4a5f8a", beard: "#5a3b2a" },
  hussar: { tunic: "#2f6f4a", trim: "#e7c15f", helmet: "busby", trousers: "#c0392b", boots: "#1f1a24", moust: true },
  austrian: { tunic: "#f2efe6", trim: "#c0392b", helmet: "shako", hatCol: "#1f1a24", trousers: "#e9e2cc", boots: "#1f1a24" },
  officer: { tunic: "#f2efe6", trim: "#e7c15f", helmet: "bicorne", trousers: "#e9e2cc", boots: "#1f1a24", sash: "#e7c15f", beard: null },
  medievalRed: { tunic: "#c0392b", trim: "#f2efe6", helmet: "kettlehat", trousers: "#5a3b2a", armor: "#9aa0ab" },
  medievalYellow: { tunic: "#e2b64b", trim: "#2f5fae", helmet: "kettlehat", trousers: "#2f5fae", armor: "#9aa0ab" },
  merchant: { tunic: "#8a3a2a", trim: "#d4a632", helmet: "tricorn", hatCol: "#3a2a22", trousers: "#e9e2cc", beard: null },
  spanish: { tunic: "#e2b64b", trim: "#c0392b", helmet: "morion", trousers: "#c0392b" },
  mp: { tunic: "#1f1a24", trim: "#f2efe6", hair: "#e9e9ef", wig: true, trousers: "#1f1a24" },
  townsman: { tunic: "#5a7a9a", trim: "#d9c08a", hair: "#5a3b2a", trousers: "#3a3a4a" },
  townswoman: { tunic: "#9a4a6a", trim: "#f2efe6", helmet: "bonnet", robe: true, lady: true },
};
HATS.chef = (g, rx, ry, lw) => { for (const [x, y, r] of [[-0.5, -1.4, 0.45], [0.1, -1.6, 0.5], [0.6, -1.35, 0.45]]) ell(g, x * rx, y * ry, r * rx, r * ry, "#fff", lw); rect(g, -rx * 0.85, -ry * 1.15, rx * 1.7, ry * 0.55, "#fff", lw); };
HATS.morion = (g, rx, ry, lw) => { poly(g, [[-rx * 1.6, -ry * 0.45], [-rx * 0.8, -ry * 0.75], [-rx * 0.6, -ry * 1.35], [0, -ry * 1.75], [rx * 0.6, -ry * 1.35], [rx * 0.8, -ry * 0.75], [rx * 1.6, -ry * 0.45], [0, -ry * 0.62]], "#b9bec8", lw, true); };
HATS.wig = (g, rx, ry, lw, o) => { for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) ell(g, sd * rx * 1.02, -ry * 0.2 + i * ry * 0.3, rx * 0.2, ry * 0.16, o.hair ?? "#e9e9ef", lw * 0.6); };

// ---------- water ----------
function sea(g, y, t, x0 = -1500, x1 = 2600, top = "#3f8fc4", bot = "#1f5f94", lw = 5) {
  g.fillStyle = vgrad(g, y, y + 1400, [[0, top], [1, bot]]); g.fillRect(x0, y, x1 - x0, 3000);
  line(g, [[x0, y], [x1, y]], lw * 0.7, "rgba(28,20,34,0.6)");
  g.save(); g.globalAlpha = 0.5; g.strokeStyle = "#cfe9f6"; g.lineWidth = 4; g.lineCap = "round";
  for (let r = 0; r < 14; r++) { const yy = y + 20 + r * r * 9, n = 9 + r; for (let i = 0; i < n; i++) { const x = x0 + ((i / n) * (x1 - x0) + t * 30 * (1 + r * 0.1) + r * 77) % (x1 - x0); const w = 30 + r * 6; g.beginPath(); g.moveTo(x, yy); g.quadraticCurveTo(x + w / 2, yy - 8 - r * 0.6, x + w, yy); g.stroke(); } }
  g.restore();
}
function waves(g, y, t, x0, x1, col = "#2f7fb4", amp = 18, lw = 5) {
  g.beginPath(); g.moveTo(x0, y + 600);
  for (let x = x0; x <= x1; x += 20) g.lineTo(x, y + Math.sin(x * 0.012 + t * 2.2) * amp + Math.sin(x * 0.031 - t * 1.3) * amp * 0.4);
  g.lineTo(x1, y + 600); g.closePath(); fillInk(g, col, lw);
}

// ---------- ships ----------
/** sailing ship facing +x; origin at waterline centre. s: {h, hull, sail, flag: fn|colours[], t, guns, smoke, dir, list} */
function sailShip(g, s) {
  const h = s.h ?? 500, u = h / 100, lw = clamp(u * 1.0, 1.5, 7), t = s.t ?? 0;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.rotate(Math.sin(t * 1.3 + (s.seed ?? 0)) * 0.02 + (s.list ?? 0));
  g.translate(0, Math.sin(t * 1.7 + (s.seed ?? 0)) * 1.5 * u);
  const hull = s.hull ?? "#7a4a2a";
  // masts + sails
  const masts = s.masts ?? [[-22, 0.85], [8, 1.0], [34, 0.7]];
  for (const [mx, mh] of masts) {
    line(g, [[mx * u, -8 * u], [mx * u, -88 * mh * u]], 2.4 * u, "#5a3b2a");
    for (let k = 0; k < 2; k++) {
      const y0 = -(28 + k * 30) * mh * u, sw = (22 - k * 5) * mh * u, sh = 24 * mh * u, bel = (s.wind ?? 1) * 5 * u * (1 + 0.1 * Math.sin(t * 2 + k));
      smoothPath(g, [[mx * u - sw, y0 - sh], [mx * u + sw, y0 - sh], [mx * u + sw + bel * 0.4, y0 - sh * 0.4], [mx * u + sw, y0], [mx * u - sw, y0], [mx * u - sw + bel * 0.4, y0 - sh * 0.4]]);
      fillInk(g, s.sail ?? "#f4ecd8", lw * 0.8);
    }
    line(g, [[mx * u, -88 * mh * u], [mx * u, -96 * mh * u]], 1.4 * u, "#5a3b2a");
  }
  // flag at the stern
  if (s.flag) { const fx = -48 * u, fy = -40 * u; line(g, [[fx, -8 * u], [fx, fy - 4 * u]], 1.6 * u, "#5a3b2a"); flagCloth(g, fx, fy - 4 * u, 20 * u, 13 * u, s.flag, t, -1, lw * 0.6); }
  // hull
  smoothPath(g, [[-56 * u, -16 * u], [52 * u, -12 * u], [62 * u, -18 * u], [54 * u, 2 * u], [40 * u, 10 * u], [-44 * u, 10 * u], [-56 * u, -2 * u]]);
  fillInk(g, hull, 0); shadeSide(g, 0, 0, 60 * u, Math.PI * 0.5, 0.35);
  smoothPath(g, [[-56 * u, -16 * u], [52 * u, -12 * u], [62 * u, -18 * u], [54 * u, 2 * u], [40 * u, 10 * u], [-44 * u, 10 * u], [-56 * u, -2 * u]]); fillInk(g, null, lw);
  line(g, [[-54 * u, -6 * u], [56 * u, -4 * u]], 2.4 * u, s.stripe ?? "#e7c15f");
  if (s.guns) for (let i = 0; i < s.guns; i++) rect(g, (-38 + i * 14) * u, -3 * u, 5 * u, 4 * u, "#1f1a24", lw * 0.4);
  poly(g, [[-62 * u, -16 * u], [-50 * u, -16 * u], [-50 * u, -26 * u], [-60 * u, -24 * u]], shade(hull, 0.85), lw * 0.8); // stern castle
  if (s.deck) s.deck(g, u);
  g.restore();
}
/** steamship / ironclad facing +x */
function steamShip(g, s) {
  const h = s.h ?? 400, u = h / 100, lw = clamp(u, 1.5, 7), t = s.t ?? 0;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.rotate(Math.sin(t * 1.1 + (s.seed ?? 0)) * 0.015); g.translate(0, Math.sin(t * 1.5 + (s.seed ?? 0)) * 1.2 * u);
  const col = s.col ?? "#4a4f5a";
  rect(g, -30 * u, -34 * u, 46 * u, 16 * u, s.super ?? "#e9e2cc", lw);
  for (const [fx, c] of [[-14, s.funnel ?? "#c9a35a"], [4, s.funnel ?? "#c9a35a"]]) { rect(g, fx * u, -58 * u, 8 * u, 26 * u, c, lw); rect(g, fx * u, -58 * u, 8 * u, 5 * u, "#1f1a24", lw * 0.6); }
  line(g, [[-40 * u, -34 * u], [-40 * u, -70 * u]], 1.6 * u, "#3a2a22"); line(g, [[30 * u, -18 * u], [30 * u, -64 * u]], 1.6 * u, "#3a2a22");
  smoothPath(g, [[-66 * u, -18 * u], [60 * u, -18 * u], [70 * u, -22 * u], [60 * u, 4 * u], [-58 * u, 6 * u], [-66 * u, -6 * u]]); fillInk(g, col, lw);
  line(g, [[-64 * u, -2 * u], [64 * u, -2 * u]], 3 * u, s.stripe ?? "#8a2a2a");
  if (s.guns) for (const gx of [-50, 44]) { rect(g, gx * u - 6 * u, -26 * u, 12 * u, 8 * u, col, lw * 0.7); line(g, [[gx * u, -23 * u], [gx * u + 18 * u * Math.sign(gx), -25 * u]], 2.4 * u, "#2a2a30"); }
  if (s.flag) { line(g, [[-40 * u, -70 * u], [-40 * u, -74 * u]], 1, INK); flagCloth(g, -40 * u, -70 * u, 16 * u, 10 * u, s.flag, t, -1, lw * 0.5); }
  if (s.smoke !== false) for (let i = 0; i < 5; i++) { const k = ((t * 0.4 + i / 5) % 1); g.save(); g.globalAlpha = (1 - k) * 0.55; ell(g, -10 * u - k * 60 * u, -62 * u - k * 40 * u, (6 + k * 12) * u, (5 + k * 9) * u, "#8a8a96", 0); g.restore(); }
  g.restore();
}
function trawler(g, s) {
  const h = s.h ?? 200, u = h / 100, lw = clamp(u, 1.2, 6), t = s.t ?? 0;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.rotate(Math.sin(t * 1.6 + (s.seed ?? 0)) * 0.04); g.translate(0, Math.sin(t * 2 + (s.seed ?? 0)) * 2 * u);
  line(g, [[-10 * u, -24 * u], [-10 * u, -90 * u]], 2 * u, "#5a3b2a"); line(g, [[20 * u, -24 * u], [20 * u, -70 * u]], 2 * u, "#5a3b2a");
  poly(g, [[-10 * u, -88 * u], [-36 * u, -40 * u], [-10 * u, -40 * u]], "#c9895a", lw * 0.7);
  rect(g, 6 * u, -46 * u, 22 * u, 22 * u, "#e9e2cc", lw); rect(g, 10 * u, -42 * u, 6 * u, 6 * u, "#ffe08a", lw * 0.4);
  smoothPath(g, [[-50 * u, -26 * u], [44 * u, -26 * u], [54 * u, -34 * u], [42 * u, 4 * u], [-44 * u, 4 * u]]); fillInk(g, s.col ?? "#2f6f4a", lw);
  line(g, [[-48 * u, -16 * u], [46 * u, -16 * u]], 2 * u, "#e9e2cc");
  g.restore();
}
function rowboat(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 1.5, 1, 6);
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1); g.rotate(Math.sin((s.t ?? 0) * 2) * 0.04);
  smoothPath(g, [[-60 * u, -20 * u], [60 * u, -20 * u], [70 * u, -28 * u], [50 * u, 6 * u], [-50 * u, 6 * u], [-66 * u, -26 * u]]); fillInk(g, s.col ?? "#8a5a32", lw);
  line(g, [[-58 * u, -12 * u], [60 * u, -12 * u]], 2 * u, "#5a3b2a");
  g.restore();
}
/** flag cloth: colours = array of horizontal stripes, or {v:[...]} vertical, or a function(g,w,h) */
function flagCloth(g, x, y, w, h, colours, t, dir = 1, lw = 3) {
  g.save(); g.translate(x, y); g.scale(dir, 1);
  const wv = (k) => Math.sin(t * 4 + k * 4) * h * 0.08;
  const shape = () => { g.beginPath(); g.moveTo(0, 0); for (let i = 0; i <= 8; i++) g.lineTo((w * i) / 8, wv(i / 8) * (i / 8)); for (let i = 8; i >= 0; i--) g.lineTo((w * i) / 8, h + wv(i / 8) * (i / 8)); g.closePath(); };
  g.save(); shape(); g.clip();
  if (typeof colours === "function") colours(g, w, h);
  else if (colours.v) colours.v.forEach((c, i) => { g.fillStyle = c; g.fillRect((w * i) / colours.v.length, -h, w / colours.v.length + 1, h * 3); });
  else colours.forEach((c, i) => { g.fillStyle = c; g.fillRect(-w, (h * i) / colours.length - (i ? 0 : h), w * 3, h / colours.length + (i ? 1 : h) + (i === colours.length - 1 ? h : 0)); });
  g.restore();
  shape(); fillInk(g, null, lw);
  g.restore();
}
function pole(g, x, y, h, flag, t, fw = 160, fh = 105, lw = 5) { line(g, [[x, y], [x, y - h]], lw * 1.4, "#6b4024"); ell(g, x, y - h, lw * 1.4, lw * 1.4, "#e7c15f", lw * 0.5); flagCloth(g, x, y - h + 6, fw, fh, flag, t, 1, lw); }
// period flags (simplified)
const FLAGS = {
  dutch: ["#d0442c", "#f6f3ea", "#2f4f9a"], // Prince's/state flag (orange-red, white, blue)
  imperial: (g, w, h) => { g.fillStyle = "#e7c15f"; g.fillRect(-w, -h, w * 3, h * 3); eagle(g, w / 2, h / 2, h * 0.38); },
  union1801: (g, w, h) => unionJack(g, w, h, true), union1707: (g, w, h) => unionJack(g, w, h, false),
  usa1859: (g, w, h) => { for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? "#f6f3ea" : "#c0262e"; g.fillRect(-w, (h * i) / 13, w * 3, h / 13 + 1); } g.fillStyle = "#2f3f7f"; g.fillRect(-w, -h, w * 1.42, h * (1 + 7 / 13)); for (let i = 0; i < 12; i++) { g.fillStyle = "#fff"; g.fillRect(w * 0.04 + (i % 4) * w * 0.09, h * 0.08 + Math.floor(i / 4) * h * 0.14, 3, 3); } },
  spain: (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); line(g, [[w * 0.2, h * 0.1], [w * 0.8, h * 0.9]], h * 0.12, "#b8262f"); line(g, [[w * 0.8, h * 0.1], [w * 0.2, h * 0.9]], h * 0.12, "#b8262f"); }, // Cross of Burgundy
  modena: { v: ["#2f5fae", "#e2b64b"] }, bologna: (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); g.fillStyle = "#c0262e"; g.fillRect(w * 0.42, -h, w * 0.16, h * 3); g.fillRect(-w, h * 0.42, w * 3, h * 0.16); },
  ottoman: (g, w, h) => { g.fillStyle = "#c0262e"; g.fillRect(-w, -h, w * 3, h * 3); g.fillStyle = "#f6f3ea"; g.beginPath(); g.arc(w * 0.45, h / 2, h * 0.28, 0, TAU); g.fill(); g.fillStyle = "#c0262e"; g.beginPath(); g.arc(w * 0.52, h / 2, h * 0.23, 0, TAU); g.fill(); },
  white: ["#f6f3ea"],
};
function unionJack(g, w, h, saltire = true) {
  g.fillStyle = "#1f3f8f"; g.fillRect(-w, -h, w * 3, h * 3);
  line(g, [[0, 0], [w, h]], h * 0.2, "#f6f3ea"); line(g, [[w, 0], [0, h]], h * 0.2, "#f6f3ea");
  if (saltire) { line(g, [[0, 0], [w, h]], h * 0.07, "#c0262e"); line(g, [[w, 0], [0, h]], h * 0.07, "#c0262e"); }
  g.fillStyle = "#f6f3ea"; g.fillRect(w * 0.42, -h, w * 0.16, h * 3); g.fillRect(-w, h * 0.36, w * 3, h * 0.28);
  g.fillStyle = "#c0262e"; g.fillRect(w * 0.45, -h, w * 0.1, h * 3); g.fillRect(-w, h * 0.42, w * 3, h * 0.16);
}
function eagle(g, x, y, r) { // simple two-headed eagle silhouette
  g.save(); g.translate(x, y); g.fillStyle = "#1f1a24";
  g.beginPath(); g.ellipse(0, r * 0.15, r * 0.3, r * 0.5, 0, 0, TAU); g.fill();
  for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(0, -r * 0.1); g.lineTo(sd * r * 1.1, -r * 0.6); g.lineTo(sd * r * 0.9, r * 0.1); g.lineTo(sd * r * 0.2, r * 0.3); g.fill(); g.beginPath(); g.arc(sd * r * 0.25, -r * 0.55, r * 0.16, 0, TAU); g.fill(); }
  g.restore();
}

// ---------- weapons & smoke ----------
function cannon(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 2, 1.5, 6), a = s.ang ?? -0.12;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  const rec = (s.recoil ?? 0) * 18 * u;
  g.save(); g.translate(-rec, 0); g.rotate(a);
  poly(g, [[-40 * u, -16 * u], [60 * u, -10 * u], [60 * u, 10 * u], [-40 * u, 16 * u]], s.col ?? "#3a3a44", lw);
  ell(g, -42 * u, 0, 8 * u, 14 * u, s.col ?? "#3a3a44", lw); rect(g, 56 * u, -12 * u, 8 * u, 24 * u, s.col ?? "#3a3a44", lw);
  g.restore();
  poly(g, [[-40 * u - rec, 30 * u], [20 * u - rec, 30 * u], [10 * u - rec, 4 * u], [-30 * u - rec, 4 * u]], "#7a4a2a", lw);
  ell(g, -20 * u - rec, 32 * u, 14 * u, 14 * u, "#5a3b2a", lw); ell(g, 12 * u - rec, 32 * u, 14 * u, 14 * u, "#5a3b2a", lw);
  g.restore();
}
function musket(g, x, y, ang, L, lw = 4) {
  const d = [Math.cos(ang), Math.sin(ang)];
  limb(g, [[x - d[0] * L * 0.35, y - d[1] * L * 0.35], [x + d[0] * L * 0.65, y + d[1] * L * 0.65]], L * 0.05, "#6b4024", lw * 0.5);
  line(g, [[x + d[0] * L * 0.2, y + d[1] * L * 0.2], [x + d[0] * L * 0.7, y + d[1] * L * 0.7]], L * 0.025, "#3a3a44");
}
function smokePuff(g, x, y, r, k, seed = 1, col = "#ecebf2") {
  if (k <= 0 || k >= 1.4) return;
  for (let i = 0; i < 7; i++) {
    const a = rnd(seed + i) * TAU, d = r * (0.2 + rnd(seed * 2 + i) * 0.6) * (0.4 + k), rr = r * (0.3 + rnd(seed * 5 + i) * 0.3) * (0.6 + k * 0.7);
    g.save(); g.globalAlpha = clamp(1.3 - k, 0, 1) * 0.95; ell(g, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.6 - k * r * 0.3, rr, rr * 0.85, col, Math.max(1.5, r * 0.03)); g.restore();
  }
}
function boomFx(g, x, y, r, k) { // cartoon explosion
  if (k <= 0 || k >= 1) return;
  const e = easeOut(k);
  g.save(); g.globalAlpha = 1 - k * k;
  const star = (rr, col) => { g.beginPath(); for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU, q = i % 2 ? rr * 0.6 : rr; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); fillInk(g, col, Math.max(2, r * 0.03)); };
  star(r * e, "#ff8a1e"); star(r * e * 0.68, "#ffd24a"); star(r * e * 0.36, "#fff6c8");
  g.restore();
}
function cannonball(g, x, y, r) { ell(g, x, y, r, r, "#26222c", r * 0.2); ell(g, x - r * 0.3, y - r * 0.3, r * 0.25, r * 0.2, "#6a6a7a", 0); }
function motionTrail(g, pts, w, col = "rgba(255,255,255,0.7)") { for (let i = 1; i < pts.length; i++) line(g, [pts[i - 1], pts[i]], w * (i / pts.length), col); }

// ---------- objects ----------
function kettle(g, x, y, s, t = 0, steam = true, dent = 0) {
  const u = s / 100, lw = clamp(u * 3, 1.5, 7);
  g.save(); g.translate(x, y);
  limb(g, [[-40 * u, -70 * u], [0, -110 * u], [40 * u, -70 * u]], 5 * u, "#2a2830", 0);
  smoothPath(g, [[-52 * u, -60 * u], [52 * u, -60 * u], [60 * u, -20 * u], [44 * u, 6 * u], [-44 * u, 6 * u], [-60 * u, -20 * u]]); fillInk(g, "#3a3844", lw);
  g.save(); smoothPath(g, [[-52 * u, -60 * u], [52 * u, -60 * u], [60 * u, -20 * u], [44 * u, 6 * u], [-44 * u, 6 * u], [-60 * u, -20 * u]]); shadeSide(g, 0, -30 * u, 60 * u, 0.2, 0.4, "#000"); g.restore();
  ell(g, 0, -60 * u, 52 * u, 12 * u, "#c98b4b", lw * 0.8);
  if (dent > 0) { ell(g, 20 * u, -30 * u, 16 * u * dent, 12 * u * dent, "#1a1820", lw * 0.6); }
  if (steam) for (let i = 0; i < 3; i++) { const k = ((t * 0.6 + i / 3) % 1); g.save(); g.globalAlpha = (1 - k) * 0.6; line(g, [[(-20 + i * 20) * u, -70 * u - k * 60 * u], [(-10 + i * 20) * u, -90 * u - k * 60 * u], [(-20 + i * 20) * u, -110 * u - k * 60 * u]], 5 * u, "#ffffff"); g.restore(); }
  g.restore();
}
function barrel(g, x, y, s, col = "#9a6a3a", label = null) {
  const u = s / 100, lw = clamp(u * 3, 1.5, 7);
  smoothPath(g, [[x - 40 * u, y - 100 * u], [x + 40 * u, y - 100 * u], [x + 48 * u, y - 50 * u], [x + 40 * u, y], [x - 40 * u, y], [x - 48 * u, y - 50 * u]]); fillInk(g, col, lw);
  for (const yy of [-85, -50, -15]) line(g, [[x - 46 * u, y + yy * u], [x + 46 * u, y + yy * u]], 4 * u, "#4a4a52");
  ell(g, x, y - 100 * u, 40 * u, 9 * u, shade(col, 1.1), lw * 0.7);
  if (label) strokeText(g, label, x, y - 50 * u, 26 * u, { fill: "#fff6dc", lw: 5 * u, shadow: false });
}
function bucketObj(g, x, y, s, swing = 0) {
  const u = s / 100, lw = clamp(u * 3, 1.5, 7);
  g.save(); g.translate(x, y); g.rotate(swing);
  g.beginPath(); g.arc(0, -70 * u, 44 * u, Math.PI, 0); g.lineWidth = 4 * u; g.strokeStyle = "#4a4a52"; g.stroke();
  poly(g, [[-46 * u, -70 * u], [46 * u, -70 * u], [36 * u, 0], [-36 * u, 0]], "#a8743e", lw);
  for (let i = -2; i <= 2; i++) line(g, [[i * 16 * u, -68 * u], [i * 13 * u, -2 * u]], 1.6 * u, "rgba(60,30,10,0.5)");
  for (const yy of [-58, -14]) line(g, [[-44 * u, yy * u], [44 * u, yy * u]], 4.5 * u, "#4a4a52");
  ell(g, 0, -70 * u, 46 * u, 9 * u, "#6b4024", lw * 0.7);
  g.restore();
}
function jar(g, x, y, s, inside) {
  const u = s / 100, lw = clamp(u * 3, 1.5, 7);
  rect(g, x - 38 * u, y - 110 * u, 76 * u, 110 * u, "rgba(200,230,170,0.55)", lw, 14 * u);
  g.save(); g.beginPath(); g.roundRect(x - 34 * u, y - 80 * u, 68 * u, 76 * u, 10 * u); g.clip(); g.fillStyle = "rgba(190,210,110,0.55)"; g.fillRect(x - 40 * u, y - 80 * u, 80 * u, 80 * u); if (inside) inside(g, x, y - 42 * u, u); g.restore();
  rect(g, x - 42 * u, y - 124 * u, 84 * u, 18 * u, "#8a5a32", lw, 4 * u);
  line(g, [[x - 22 * u, y - 96 * u], [x - 22 * u, y - 20 * u]], 5 * u, "rgba(255,255,255,0.6)");
}
function cartoonEar(g, x, y, r, col = "#f3c9a6") { // simple, non-graphic cartoon ear
  smoothPath(g, [[x, y - r], [x + r * 0.7, y - r * 0.6], [x + r * 0.6, y + r * 0.2], [x + r * 0.1, y + r], [x - r * 0.35, y + r * 0.6], [x - r * 0.2, y - r * 0.2]]); fillInk(g, col, r * 0.12);
  g.beginPath(); g.arc(x + r * 0.15, y - r * 0.1, r * 0.35, -1.4, 1.6); g.lineWidth = r * 0.1; g.strokeStyle = INK; g.stroke();
}
function scroll(g, x, y, w, h, title, lines = 4, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot);
  rect(g, -w / 2, -h / 2, w, h, "#f6ead0", 6, 8);
  ell(g, -w / 2, -h / 2, 20, h * 0.03 + 10, "#d9c08a", 5); ell(g, w / 2, -h / 2, 20, h * 0.03 + 10, "#d9c08a", 5);
  if (title) strokeText(g, title, 0, -h / 2 + 60, Math.min(64, w / title.length * 1.5), { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false });
  for (let i = 0; i < lines; i++) line(g, [[-w * 0.36, -h / 2 + 120 + i * 40], [w * (0.36 - (i % 3) * 0.08), -h / 2 + 120 + i * 40]], 6, "rgba(60,40,40,0.4)");
  g.restore();
}
function tent(g, x, y, w, h, col = "#efe6d2", lw = 5) {
  poly(g, [[x - w / 2, y], [x, y - h], [x + w / 2, y]], col, lw); poly(g, [[x - w * 0.12, y], [x, y - h * 0.55], [x + w * 0.12, y]], "#3a2a3a", lw * 0.8);
  line(g, [[x, y - h], [x, y - h - 30]], lw, "#6b4024");
}
function campfire(g, x, y, s, t) { line(g, [[x - s, y], [x + s, y - s * 0.3]], s * 0.25, "#6b4024"); line(g, [[x + s, y], [x - s, y - s * 0.3]], s * 0.25, "#6b4024"); flame(g, x, y - s * 0.3, s * 0.5, t); }
function well(g, x, y, s) {
  const u = s / 100, lw = clamp(u * 3, 2, 7);
  rect(g, x - 70 * u, y - 70 * u, 140 * u, 70 * u, "#b9ab94", lw, 6 * u);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) rect(g, x - 70 * u + i * 35 * u + (j % 2) * 17 * u, y - 70 * u + j * 35 * u, 35 * u, 35 * u, null, lw * 0.4);
  line(g, [[x - 60 * u, y - 70 * u], [x - 60 * u, y - 190 * u]], 6 * u, "#6b4024"); line(g, [[x + 60 * u, y - 70 * u], [x + 60 * u, y - 190 * u]], 6 * u, "#6b4024");
  poly(g, [[x - 90 * u, y - 180 * u], [x, y - 240 * u], [x + 90 * u, y - 180 * u]], "#c95b3c", lw);
  line(g, [[x - 60 * u, y - 160 * u], [x + 60 * u, y - 160 * u]], 4 * u, "#6b4024");
}
function cityWall(g, x0, x1, y, h, col = "#c9b08a", lw = 6, towers = true) {
  rect(g, x0, y - h, x1 - x0, h, col, lw);
  for (let x = x0; x < x1 - 20; x += 50) rect(g, x, y - h - 26, 30, 26, col, lw * 0.8);
  if (towers) for (const tx of [x0 + 40, (x0 + x1) / 2, x1 - 40]) { rect(g, tx - 50, y - h * 1.6, 100, h * 1.6, shade(col, 0.95), lw); poly(g, [[tx - 64, y - h * 1.6], [tx, y - h * 2.2], [tx + 64, y - h * 1.6]], "#c95b3c", lw); }
  g.save(); g.beginPath(); g.rect(x0, y - h, x1 - x0, h); g.clip(); for (let r = 0; r < 8; r++) for (let x = x0; x < x1; x += 60) rect(g, x + (r % 2) * 30, y - h + r * 30, 60, 30, null, 1.5); g.restore();
}
function house(g, x, y, w, h, col = "#efe2c4", roof = "#c95b3c", lw = 5, win = "#5a3b2a") {
  rect(g, x - w / 2, y - h, w, h, col, lw);
  poly(g, [[x - w / 2 - 12, y - h], [x, y - h - w * 0.4], [x + w / 2 + 12, y - h]], roof, lw);
  rect(g, x - w * 0.12, y - h * 0.45, w * 0.24, h * 0.45, "#6b4024", lw * 0.7);
  for (const sx of [-0.32, 0.32]) rect(g, x + sx * w - w * 0.09, y - h * 0.8, w * 0.18, h * 0.22, win, lw * 0.6);
}
function brickWall(g, x, y, w, h, col = "#9a4a3a", lw = 5) {
  rect(g, x, y, w, h, col, lw);
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
  for (let r = 0; r * 34 < h; r++) for (let i = -1; i * 70 < w; i++) rect(g, x + i * 70 + (r % 2) * 35, y + r * 34, 70, 34, null, 1.5);
  g.restore();
}
function pig(g, s) {
  const h = s.h ?? 120, u = h / 100, lw = clamp(u * 3, 1.5, 6), ph = s.phase ?? null;
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.save(); g.globalAlpha = 0.28; ell(g, 0, 0, 60 * u, 9 * u, "#1a1030", 0); g.restore();
  for (const [lx, o] of [[-36, 0], [-22, 0.5], [24, 0.25], [38, 0.75]]) { const a = ph != null ? Math.sin((ph + o) * TAU) * 0.4 : 0; limb(g, [[lx * u, -30 * u], [lx * u + Math.sin(a) * 26 * u, -2 * u]], 9 * u, "#e9a0a8", lw * 0.7); }
  ell(g, 0, -50 * u, 58 * u, 34 * u, "#f2b4bc", lw);
  ell(g, 50 * u, -60 * u, 26 * u, 24 * u, "#f2b4bc", lw);
  ell(g, 72 * u, -56 * u, 10 * u, 9 * u, "#e98a96", lw * 0.7); g.fillStyle = INK; g.fillRect(69 * u, -58 * u, 2 * u, 3 * u); g.fillRect(74 * u, -58 * u, 2 * u, 3 * u);
  poly(g, [[38 * u, -80 * u], [44 * u, -96 * u], [54 * u, -82 * u]], "#e98a96", lw * 0.7);
  if (s.eye === "shock") { ell(g, 54 * u, -68 * u, 5 * u, 5 * u, "#fff", lw * 0.5); g.beginPath(); g.arc(55 * u, -68 * u, 2 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  else if (s.eye === "x") { line(g, [[50 * u, -72 * u], [58 * u, -64 * u]], 2 * u); line(g, [[58 * u, -72 * u], [50 * u, -64 * u]], 2 * u); }
  else { g.beginPath(); g.arc(55 * u, -68 * u, 2.6 * u, 0, TAU); g.fillStyle = INK; g.fill(); }
  g.beginPath(); g.arc(-62 * u, -58 * u, 7 * u, 0.5, 5.5); g.lineWidth = 3 * u; g.strokeStyle = INK; g.stroke();
  g.restore();
}
function potato(g, x, y, r, seed = 1) { smoothPath(g, [[x - r, y], [x - r * 0.6, y - r * 0.7], [x + r * 0.4, y - r * 0.75], [x + r, y - r * 0.1], [x + r * 0.6, y + r * 0.6], [x - r * 0.5, y + r * 0.6]]); fillInk(g, "#c9a061", r * 0.12); for (let i = 0; i < 3; i++) ell(g, x + (rnd(seed + i) - 0.5) * r, y + (rnd(seed * 2 + i) - 0.5) * r * 0.6, r * 0.07, r * 0.05, "#8a6a3a", 0); }
function plantRow(g, x0, x1, y, n, t, col = "#5f9a48") { for (let i = 0; i < n; i++) { const x = lerp(x0, x1, i / (n - 1)); for (let k = -1; k <= 1; k++) ell(g, x + k * 12, y - 20 - Math.abs(k) * -6 + Math.sin(t * 2 + i) * 2, 14, 22, col, 3, k * 0.6); } }
function newspaper(g, x, y, w, h, head, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot);
  rect(g, -w / 2, -h / 2, w, h, "#f3efe2", 6, 4);
  g.save(); g.font = `900 ${h * 0.11}px Montserrat`; g.textAlign = "center"; g.fillStyle = "#1c1422"; g.fillText(head, 0, -h / 2 + h * 0.2, w * 0.9); g.restore();
  line(g, [[-w * 0.44, -h / 2 + h * 0.27], [w * 0.44, -h / 2 + h * 0.27]], 3);
  for (let c = 0; c < 3; c++) for (let i = 0; i < 9; i++) line(g, [[-w * 0.44 + c * w * 0.3, -h / 2 + h * 0.34 + i * h * 0.07], [-w * 0.44 + c * w * 0.3 + w * 0.26, -h / 2 + h * 0.34 + i * h * 0.07]], 3, "rgba(40,30,40,0.45)");
  g.restore();
}
/** comic shout bubble with text */
function shout(g, x, y, txt, size, k = 1, col = "#b8262f", tail = null) {
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(easeBack(k), easeBack(k));
  g.font = `900 ${size}px Montserrat`; const w = g.measureText(txt).width + size * 1.1, h = size * 1.7;
  if (tail) { g.beginPath(); g.moveTo(-w * 0.1, h * 0.3); g.lineTo(tail[0] - x, tail[1] - y); g.lineTo(w * 0.1, h * 0.3); fillInk(g, "#fff", 6); }
  g.beginPath(); for (let i = 0; i < 28; i++) { const a = (i / 28) * TAU, r = i % 2 ? 1 : 1.12; g.lineTo(Math.cos(a) * w * 0.55 * r, Math.sin(a) * h * 0.62 * r); } g.closePath(); fillInk(g, "#fff", 6);
  strokeText(g, txt, 0, 0, size, { fill: col, lw: 0, shadow: false });
  g.restore();
}
function museumCase(g, x, y, w, h, inner) {
  rect(g, x - w / 2 - 20, y, w + 40, 220, "#5a3b2a", 6, 6);
  g.save(); g.globalAlpha = 0.25; rect(g, x - w / 2, y - h, w, h, "#cfe9f6", 0); g.restore();
  if (inner) inner(g);
  rect(g, x - w / 2, y - h, w, h, null, 6, 4);
  line(g, [[x - w / 2 + 30, y - h + 40], [x - w / 2 + 90, y - h + 120]], 8, "rgba(255,255,255,0.7)");
}
function plaque(g, x, y, txt, size = 40) { g.save(); g.font = `900 ${size}px Cinzel`; const w = g.measureText(txt).width + size; rect(g, x - w / 2, y - size * 0.8, w, size * 1.6, "#d4a632", 5, 6); strokeText(g, txt, x, y, size, { font: "Cinzel", fill: "#3a2418", lw: 0, shadow: false }); g.restore(); }

// ---------- 20th-century props ----------
/** side-view propeller plane facing +x. s: {h, col, roundel, wood, t, bomber} */
function plane(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7), t = s.t ?? 0, col = s.col ?? "#6f7a5a";
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1); g.rotate(s.rot ?? 0);
  const wood = s.wood, fill = wood ? "#c9965a" : col;
  poly(g, [[-120 * u, -10 * u], [-150 * u, -46 * u], [-130 * u, -46 * u], [-100 * u, -14 * u]], fill, lw); // tail fin
  smoothPath(g, [[-140 * u, -8 * u], [-60 * u, -22 * u], [70 * u, -24 * u], [110 * u, -12 * u], [112 * u, 8 * u], [70 * u, 18 * u], [-60 * u, 12 * u], [-140 * u, 2 * u]]); fillInk(g, fill, lw);
  if (wood) for (let i = -4; i < 6; i++) line(g, [[i * 24 * u, -20 * u], [i * 24 * u + 4 * u, 14 * u]], 1.6 * u, "rgba(90,50,20,0.55)");
  smoothPath(g, [[40 * u, -22 * u], [60 * u, -38 * u], [86 * u, -36 * u], [96 * u, -18 * u]]); fillInk(g, wood ? "#b9864a" : "#bfe0f2", lw * 0.8);
  poly(g, [[-30 * u, 0], [40 * u, 0], [30 * u, 26 * u], [-40 * u, 22 * u]], shade(fill, 0.85), lw); // wing
  if (s.roundel) { ell(g, -60 * u, -4 * u, 12 * u, 12 * u, "#2f4f9a", lw * 0.5); ell(g, -60 * u, -4 * u, 8 * u, 8 * u, "#f6f3ea", 0); ell(g, -60 * u, -4 * u, 4.5 * u, 4.5 * u, "#c0262e", 0); }
  if (s.bomber) for (const ex of [-10, 20]) { ell(g, ex * u, 10 * u, 12 * u, 8 * u, shade(fill, 0.8), lw * 0.7); }
  rect(g, 110 * u, -6 * u, 8 * u, 12 * u, "#3a3a44", lw * 0.6);
  const pr = Math.sin(t * 60) * 34 * u; ell(g, 122 * u, 0, 4 * u, Math.abs(pr) + 2 * u, "rgba(60,60,70,0.6)", 0);
  if (s.pilot) { ell(g, 66 * u, -36 * u, 9 * u, 9 * u, SKIN, lw * 0.5); ell(g, 66 * u, -40 * u, 9 * u, 6 * u, "#6b4024", lw * 0.5); }
  g.restore();
}
function truck(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7), wood = s.wood, col = wood ? "#c9965a" : (s.col ?? "#5f6a45");
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  rect(g, -90 * u, -80 * u, 120 * u, 60 * u, col, lw, 6 * u);
  rect(g, 30 * u, -64 * u, 50 * u, 44 * u, shade(col, 1.08), lw, 6 * u); rect(g, 44 * u, -58 * u, 26 * u, 18 * u, wood ? "#b9864a" : "#bfe0f2", lw * 0.6);
  if (wood) for (let i = 0; i < 5; i++) line(g, [[-88 * u, (-74 + i * 12) * u], [28 * u, (-74 + i * 12) * u]], 1.5 * u, "rgba(90,50,20,0.5)");
  for (const wx of [-60, 50]) { ell(g, wx * u, -18 * u, 16 * u, 16 * u, "#26222c", lw); ell(g, wx * u, -18 * u, 6 * u, 6 * u, "#8a8a96", 0); }
  g.restore();
}
function hangar(g, x, y, w, h, wood = false) {
  smoothPath(g, [[x - w / 2, y], [x - w / 2, y - h * 0.5], [x, y - h], [x + w / 2, y - h * 0.5], [x + w / 2, y]]); fillInk(g, wood ? "#c9965a" : "#8a8f96", 6);
  for (let i = 1; i < 8; i++) line(g, [[x - w / 2 + (w * i) / 8, y], [x - w / 2 + (w * i) / 8, y - h * (0.55 + 0.4 * Math.sin((i / 8) * Math.PI))]], 2.5, "rgba(40,30,30,0.35)");
  rect(g, x - w * 0.3, y - h * 0.55, w * 0.6, h * 0.55, "#2a2430", 5);
}
function landingCraft(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7);
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); g.rotate(Math.sin((s.t ?? 0) * 2 + (s.seed ?? 0)) * 0.03);
  poly(g, [[-90 * u, -40 * u], [70 * u, -40 * u], [90 * u, -60 * u], [96 * u, 0], [-90 * u, 0]], "#6f7a6a", lw);
  if (s.ramp) poly(g, [[90 * u, -60 * u], [96 * u, 0], [160 * u, 10 * u], [150 * u, -10 * u]], "#5f6a5a", lw);
  g.restore();
}
function dog(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 6), ph = s.phase ?? null, col = s.col ?? "#b98a5a";
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  for (const [lx, o] of [[-30, 0], [-20, 0.5], [22, 0.25], [32, 0.75]]) { const a = ph != null ? Math.sin((ph + o) * TAU) * 0.5 : 0; limb(g, [[lx * u, -34 * u], [lx * u + Math.sin(a) * 30 * u, 0]], 7 * u, col, lw * 0.6); }
  ell(g, 0, -48 * u, 46 * u, 22 * u, col, lw);
  ell(g, 46 * u, -70 * u, 22 * u, 20 * u, col, lw); ell(g, 64 * u, -64 * u, 12 * u, 9 * u, col, lw * 0.7); ell(g, 74 * u, -66 * u, 4 * u, 4 * u, INK, 0);
  poly(g, [[30 * u, -84 * u], [34 * u, -104 * u], [46 * u, -86 * u]], shade(col, 0.8), lw * 0.7);
  g.beginPath(); g.arc(52 * u, -74 * u, 2.6 * u, 0, TAU); g.fillStyle = INK; g.fill();
  const wag = Math.sin((s.t ?? 0) * 14) * 0.5; line(g, [[-44 * u, -52 * u], [-44 * u - Math.cos(wag) * 26 * u, -52 * u - 20 * u - Math.sin(wag) * 10 * u]], 6 * u, INK); line(g, [[-44 * u, -52 * u], [-44 * u - Math.cos(wag) * 26 * u, -52 * u - 20 * u - Math.sin(wag) * 10 * u]], 3.5 * u, col);
  if (s.tongue) ell(g, 66 * u, -54 * u, 4 * u, 7 * u, "#e86e78", lw * 0.4);
  g.restore();
}
function telegram(g, x, y, w, lines, k = 1, rot = 0, title = "TELEGRAM") {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(easeBack(k), easeBack(k));
  const h = 120 + lines.length * 70;
  rect(g, -w / 2, -h / 2, w, h, "#f3e7c4", 7, 6);
  strokeText(g, title, 0, -h / 2 + 55, 46, { font: "Cinzel", fill: "#5a1e28", lw: 0, shadow: false });
  line(g, [[-w * 0.42, -h / 2 + 90], [w * 0.42, -h / 2 + 90]], 3);
  lines.forEach((l, i) => { g.save(); g.font = "800 40px Montserrat"; g.textAlign = "center"; g.fillStyle = "#1c1422"; g.fillText(l, 0, -h / 2 + 150 + i * 70, w * 0.9); g.restore(); });
  g.restore();
}
function football(g, x, y, r, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); ell(g, 0, 0, r, r, "#f6f3ea", r * 0.1);
  g.beginPath(); for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU - Math.PI / 2; g.lineTo(Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35); } g.closePath(); g.fillStyle = INK; g.fill();
  for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU - Math.PI / 2; line(g, [[Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35], [Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95]], r * 0.07); }
  g.restore();
}
function fog(g, t, a = 0.5, y0 = 900) {
  g.save();
  for (let i = 0; i < 9; i++) { const x = ((rnd(i) * 1600 + t * (30 + i * 6)) % 1900) - 400, y = y0 + rnd(i * 3) * 900; g.globalAlpha = a * (0.5 + 0.5 * rnd(i * 5)); g.fillStyle = rgrad(g, x, y, 0, 420, [[0, "rgba(225,230,238,0.9)"], [1, "rgba(225,230,238,0)"]]); g.fillRect(x - 420, y - 420, 840, 840); }
  g.restore();
}
const WW = {
  tommy: { tunic: "#8a7a4a", trim: "#6a5a3a", helmet: "steel", hatCol: "#6f6a45", trousers: "#7a6a40", boots: "#3a2a1a" },
  gi: { tunic: "#6f6a45", trim: "#5a5535", helmet: "steel", hatCol: "#5f5a3a", trousers: "#7a7350", boots: "#3a2a1a" },
  german: { tunic: "#6a6f6a", trim: "#4a4f4a", helmet: "peaked", hatCol: "#5a5f5a", badge: "#c9c9c9", trousers: "#5a5f5a", boots: "#1f1a24" },
  pilot: { tunic: "#6b4a2a", trim: "#d9c08a", helmet: "cap", hatCol: "#5a3a22", trousers: "#5a6a7a", boots: "#1f1a24" },
  rafPilot: { tunic: "#5a6f8f", trim: "#d9c08a", helmet: "peaked", hatCol: "#4a5f7f", trousers: "#4a5f7f", moust: true, beard: null },
  general: { tunic: "#6f6a45", trim: "#e7c15f", helmet: "steel", hatCol: "#5f5a3a", trousers: "#a89a6a", boots: "#5a3a22", sash: null },
  russianSailor: { tunic: "#f2efe6", trim: "#2f4f8f", helmet: "sailor", hatCol: "#1f1a24", band: "#c9a35a", trousers: "#1f2a44" },
  russianOfficer: { tunic: "#1f2a44", trim: "#e7c15f", helmet: "peaked", hatCol: "#f2efe6", trousers: "#1f2a44", beard: "#3a2a22" },
  fisher: { tunic: "#e2b64b", trim: "#c9a35a", helmet: "sailor", hatCol: "#e2b64b", band: "#c9a35a", trousers: "#3a4a5a", beard: "#7a5a3a" },
};

// ---------- more shared scenery ----------
function halfTimber(g, x, y, w, h, col = "#efe2c4", roof = "#8a3a2a", lw = 5) {
  rect(g, x - w / 2, y - h, w, h, col, lw);
  for (let i = 0; i <= 3; i++) line(g, [[x - w / 2 + (w * i) / 3, y - h], [x - w / 2 + (w * i) / 3, y]], lw * 1.3, "#5a3b2a");
  line(g, [[x - w / 2, y - h * 0.5], [x + w / 2, y - h * 0.5]], lw * 1.3, "#5a3b2a");
  line(g, [[x - w / 2, y - h * 0.5], [x - w / 6, y - h]], lw, "#5a3b2a"); line(g, [[x + w / 6, y - h], [x + w / 2, y - h * 0.5]], lw, "#5a3b2a");
  poly(g, [[x - w / 2 - 16, y - h], [x, y - h - w * 0.6], [x + w / 2 + 16, y - h]], roof, lw);
  rect(g, x - w * 0.1, y - h * 0.38, w * 0.2, h * 0.38, "#6b4024", lw * 0.7);
  for (const sx of [-0.3, 0.3]) rect(g, x + sx * w - w * 0.08, y - h * 0.8, w * 0.16, h * 0.18, "#ffe08a", lw * 0.6);
}
function medievalTown(g, x0, x1, y, seed = 1, spire = true) {
  sky3(g, x0, y - 2200, x1 - x0, 2300, "#4f86d0", "#a9cdee", "#efe6d0");
  if (spire) { rect(g, 700, y - 900, 140, 700, "#c98a7a", 6); poly(g, [[690, y - 900], [770, y - 1350], [850, y - 900]], "#b97a6a", 6); }
  for (let i = 0; x0 + i * 260 < x1; i++) halfTimber(g, x0 + 130 + i * 260, y, 220, 260 + rnd(seed + i) * 120, ["#efe2c4", "#e6cfa6", "#f3e9d6", "#d9c4a0"][i % 4], ["#8a3a2a", "#6a4a3a", "#9a4a2a"][i % 3]);
  g.fillStyle = vgrad(g, y, y + 1000, [[0, "#b9ab94"], [1, "#8a7f6c"]]); g.fillRect(x0, y, x1 - x0, 1600); line(g, [[x0, y], [x1, y]], 6);
  for (let r = 0; r < 10; r++) for (let x = x0; x < x1; x += 90) rect(g, x + (r % 2) * 45, y + r * r * 9, 90, 9 + r * 2, null, 1.5);
  paintGrain(g, x0, y - 2200, x1 - x0, 3800, 0.08);
}
/** dancing pose helper: returns guy state */
function danceState(t, i, extra = {}) {
  const p = t * 2.6 + i * 0.37;
  return { walk: p % 1, armR: [2.2 + Math.sin(p * 6.3) * 0.7, Math.sin(p * 3) * 0.6], armL: [-2.2 - Math.cos(p * 6.3) * 0.7, -Math.sin(p * 3) * 0.6], lean: Math.sin(p * 6.3) * 12, headTilt: Math.cos(p * 6.3) * 10, bob: -Math.abs(Math.sin(p * 6.3)) * 6, ...extra };
}
function acacia(g, x, y, h) { limb(g, [[x, y], [x + h * 0.05, y - h * 0.5], [x - h * 0.05, y - h * 0.75]], h * 0.05, "#6b4024", 4); smoothPath(g, [[x - h * 0.6, y - h * 0.75], [x - h * 0.3, y - h * 0.95], [x + h * 0.3, y - h * 0.97], [x + h * 0.6, y - h * 0.78], [x + h * 0.3, y - h * 0.68], [x - h * 0.3, y - h * 0.68]]); fillInk(g, "#5f8a3a", 5); }
function hut(g, x, y, s) { rect(g, x - s * 0.5, y - s * 0.5, s, s * 0.5, "#c98a5a", 5); poly(g, [[x - s * 0.65, y - s * 0.48], [x, y - s * 1.0], [x + s * 0.65, y - s * 0.48]], "#d9b06a", 5); rect(g, x - s * 0.1, y - s * 0.32, s * 0.2, s * 0.32, "#4a2a1a", 4); }
function meatChunk(g, x, y, r, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); smoothPath(g, [[-r, 0], [-r * 0.5, -r * 0.7], [r * 0.6, -r * 0.6], [r, 0], [r * 0.4, r * 0.6], [-r * 0.6, r * 0.5]]); fillInk(g, "#c9434a", r * 0.12); smoothPath(g, [[-r * 0.4, -r * 0.1], [0, -r * 0.35], [r * 0.4, -r * 0.05], [0, r * 0.2]]); fillInk(g, "#f2b4bc", 0); g.restore(); }
function vulture(g, x, y, s, t) { const fl = Math.sin(t * 8) * 0.5; g.save(); g.translate(x, y); for (const sd of [-1, 1]) poly(g, [[0, 0], [sd * s * 1.2, -s * fl * 0.6 - s * 0.2], [sd * s * 1.4, s * 0.1 - s * fl * 0.4], [sd * s * 0.3, s * 0.25]], "#3a2a2a", s * 0.06, true); ell(g, 0, s * 0.1, s * 0.35, s * 0.22, "#3a2a2a", s * 0.06); ell(g, s * 0.42, -s * 0.05, s * 0.14, s * 0.13, "#e98a7a", s * 0.05); g.restore(); }
function vat(g, x, y, w, h, crack = 0) {
  smoothPath(g, [[x - w / 2, y - h], [x + w / 2, y - h], [x + w * 0.55, y - h / 2], [x + w / 2, y], [x - w / 2, y], [x - w * 0.55, y - h / 2]]); fillInk(g, "#9a6a3a", 7);
  for (let i = 0; i < 6; i++) line(g, [[x - w / 2 + (w * i) / 5, y - h + 6], [x - w / 2 + (w * i) / 5, y - 6]], 3, "rgba(60,30,10,0.45)");
  for (let k = 0; k < 4; k++) { const yy = y - h * (0.12 + k * 0.25); if (crack > 0 && k === 2) { line(g, [[x - w * 0.54, yy], [x - w * 0.1, yy]], 12, "#4a4a52"); line(g, [[x + w * 0.1, yy - crack * 40], [x + w * 0.54, yy]], 12, "#4a4a52"); } else line(g, [[x - w * 0.54, yy], [x + w * 0.54, yy]], 12, "#4a4a52"); }
}
function beerWave(g, x0, x1, y, t, h) { smoothPath(g, [[x0, y + 1500], [x0, y], ...Array.from({ length: 12 }, (_, i) => [x0 + ((x1 - x0) * i) / 11, y - h * (0.6 + 0.4 * Math.sin(i * 1.3 + t * 4))]), [x1, y + 1500]]); fillInk(g, "#a8641e", 7); for (let i = 0; i < 14; i++) ell(g, x0 + ((x1 - x0) * i) / 13, y - h * (0.6 + 0.4 * Math.sin(i * 1.17 + t * 4)) + 10, 40 + 10 * Math.sin(i), 26, "#fff6dc", 5); }

// ---------- Paris / misc ----------
function eiffel(g, x, y, h, col = "#8a6a4a", k = 1) {
  const u = h / 100; g.save(); g.translate(x, y); g.scale(1, k);
  const L = (a, b, w = 1.4) => line(g, a.map(([px, py]) => [px * u, py * u]), w * u, col);
  poly(g, [[-30 * u, 0], [-14 * u, -36 * u], [14 * u, -36 * u], [30 * u, 0], [18 * u, 0], [0, -18 * u], [-18 * u, 0]], col, 0.8 * u);
  poly(g, [[-14 * u, -36 * u], [-6 * u, -70 * u], [6 * u, -70 * u], [14 * u, -36 * u]], col, 0.8 * u);
  poly(g, [[-6 * u, -70 * u], [0, -100 * u], [6 * u, -70 * u]], col, 0.8 * u);
  L([[-17, -36], [17, -36]], 2.4); L([[-8, -60], [8, -60]], 2); L([[-5, -76], [5, -76]], 1.6);
  for (let i = 0; i < 4; i++) { L([[-28 + i * 4, -i * 9], [-24 + i * 4, -(i + 1) * 9]], 0.6); L([[28 - i * 4, -i * 9], [24 - i * 4, -(i + 1) * 9]], 0.6); }
  for (let i = 0; i < 3; i++) { L([[-12 + i * 2, -36 - i * 11], [12 - i * 2, -36 - (i + 1) * 11]], 0.5); L([[12 - i * 2, -36 - i * 11], [-12 + i * 2, -36 - (i + 1) * 11]], 0.5); }
  g.beginPath(); g.arc(0, 0, 18 * u, Math.PI, 0); g.lineWidth = 2 * u; g.strokeStyle = col; g.stroke();
  g.restore();
}
function parisSky(g, x0, x1, y, night = false) {
  sky3(g, x0, y - 2200, x1 - x0, 2300, night ? "#0d1236" : "#5a8ad0", night ? "#2a3060" : "#b3d2ee", night ? "#4a4a7a" : "#f0e6d8");
  for (let i = 0; x0 + i * 200 < x1; i++) { const hx = x0 + i * 200, hh = 200 + rnd(i) * 140; rect(g, hx, y - hh, 190, hh, ["#e9dcc0", "#d9c8a8", "#efe2c4"][i % 3], 4); poly(g, [[hx - 6, y - hh], [hx + 95, y - hh - 70], [hx + 196, y - hh]], "#6a7a8a", 4); for (let c = 0; c < 3; c++) rect(g, hx + 20 + c * 56, y - hh + 40, 30, 50, night ? "#ffe08a" : "#3a3a5a", 3); }
}
function picFrame(g, x, y, w, h, inner) { rect(g, x - w / 2 - 26, y - h / 2 - 26, w + 52, h + 52, "#c9973f", 7, 6); rect(g, x - w / 2, y - h / 2, w, h, "#3a3a2a", 5); g.save(); g.beginPath(); g.rect(x - w / 2, y - h / 2, w, h); g.clip(); inner && inner(g); g.restore(); }
function bunny(g, x, y, s, t = 0, col = "#f2efe6") { const u = s / 100; g.save(); g.translate(x, y); ell(g, 0, -30 * u, 40 * u, 30 * u, col, 4 * u); ell(g, 34 * u, -54 * u, 22 * u, 20 * u, col, 4 * u); for (const dx of [26, 40]) ell(g, dx * u, -88 * u + Math.sin(t * 4 + dx) * 2 * u, 7 * u, 22 * u, col, 3 * u, 0.15); g.beginPath(); g.arc(42 * u, -58 * u, 3 * u, 0, TAU); g.fillStyle = INK; g.fill(); ell(g, 55 * u, -50 * u, 3.5 * u, 2.8 * u, "#e98a96", 0); ell(g, -38 * u, -36 * u, 10 * u, 10 * u, "#fff", 2.5 * u); g.restore(); }

// ---------- jet age ----------
/** side-view jetliner facing +x (tri-jet, rear airstair option) */
function jet(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7), col = s.col ?? "#e9eef2", stripe = s.stripe ?? "#2f5f9f";
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1); g.rotate(s.rot ?? 0);
  poly(g, [[-150 * u, -18 * u], [-180 * u, -80 * u], [-150 * u, -80 * u], [-110 * u, -22 * u]], col, lw);
  smoothPath(g, [[-170 * u, -10 * u], [-100 * u, -26 * u], [120 * u, -26 * u], [175 * u, -6 * u], [170 * u, 12 * u], [120 * u, 22 * u], [-110 * u, 20 * u], [-170 * u, 6 * u]]); fillInk(g, col, lw);
  line(g, [[-160 * u, 0], [165 * u, 0]], 6 * u, stripe);
  for (let i = 0; i < 12; i++) ell(g, (-90 + i * 17) * u, -10 * u, 3.5 * u, 4.5 * u, "#3a4a6a", 0);
  smoothPath(g, [[140 * u, -20 * u], [160 * u, -14 * u], [150 * u, -8 * u], [134 * u, -12 * u]]); fillInk(g, "#3a4a6a", lw * 0.5);
  poly(g, [[-20 * u, 6 * u], [60 * u, 6 * u], [-10 * u, 60 * u], [-50 * u, 60 * u]], shade(col, 0.9), lw);
  rect(g, -150 * u, -46 * u, 40 * u, 18 * u, shade(col, 0.85), lw * 0.8, 8 * u);
  if (s.stairs) { g.save(); g.translate(-160 * u, 10 * u); g.rotate(0.9 * s.stairs); rect(g, -6 * u, 0, 12 * u, 70 * u, "#8a8f96", lw * 0.6); for (let i = 1; i < 6; i++) line(g, [[-6 * u, i * 12 * u], [6 * u, i * 12 * u]], 1.5 * u); g.restore(); }
  if (s.label) strokeText(g, s.label, 20 * u, -40 * u, 16 * u, { fill: stripe, lw: 0, shadow: false });
  g.restore();
}
function vaultDoor(g, x, y, r, open = 0, t = 0) {
  g.save(); g.translate(x, y);
  rect(g, -r * 1.25, -r * 1.25, r * 2.5, r * 2.5, "#5a5f6a", 7, 12);
  g.scale(1 - open * 0.75, 1); ell(g, 0, 0, r, r, "#9aa0ab", 8); ell(g, 0, 0, r * 0.8, r * 0.8, "#b9bec8", 5);
  g.rotate(t * 0.5 * (1 - open)); for (let i = 0; i < 3; i++) { g.rotate(Math.PI / 3); line(g, [[-r * 0.55, 0], [r * 0.55, 0]], r * 0.07, "#4a4a52"); } ell(g, 0, 0, r * 0.18, r * 0.18, "#4a4a52", 4);
  g.restore();
}
function diamond(g, x, y, r, t = 0) { poly(g, [[x - r, y - r * 0.3], [x - r * 0.5, y - r * 0.8], [x + r * 0.5, y - r * 0.8], [x + r, y - r * 0.3], [x, y + r]], "#bfe9ff", r * 0.08); line(g, [[x - r, y - r * 0.3], [x + r, y - r * 0.3]], r * 0.05); line(g, [[x - r * 0.5, y - r * 0.8], [x, y + r], [x + r * 0.5, y - r * 0.8]], r * 0.05); sparkle(g, x + r * 0.4, y - r * 0.6, r * 0.5, (t * 0.8 + x * 0.001) % 1); }

// ---------- ancient & misc ----------
function mammoth(g, s) {
  const u = (s.h ?? 100) / 100, lw = clamp(u * 3, 1.5, 7), ph = s.phase ?? null, col = s.col ?? "#7a4a2a";
  g.save(); g.translate(s.x ?? 0, s.y ?? 0); if ((s.dir ?? 1) < 0) g.scale(-1, 1);
  g.save(); g.globalAlpha = 0.28; ell(g, 0, 0, 90 * u, 10 * u, "#1a1030", 0); g.restore();
  for (const [lx, o] of [[-50, 0], [-30, 0.5], [30, 0.25], [50, 0.75]]) { const a = ph != null ? Math.sin((ph + o) * TAU) * 0.3 : 0; limb(g, [[lx * u, -50 * u], [lx * u + Math.sin(a) * 30 * u, 0]], 22 * u, shade(col, o % 0.5 ? 0.85 : 1), lw); }
  smoothPath(g, [[-80 * u, -40 * u], [-70 * u, -110 * u], [0, -140 * u], [60 * u, -130 * u], [90 * u, -90 * u], [80 * u, -40 * u], [0, -30 * u]]); fillInk(g, col, lw);
  for (let i = 0; i < 8; i++) line(g, [[(-60 + i * 18) * u, -50 * u], [(-64 + i * 18) * u, -20 * u]], 3 * u, shade(col, 0.75));
  ell(g, 90 * u, -110 * u, 40 * u, 40 * u, col, lw);
  limb(g, [[118 * u, -100 * u], [130 * u, -60 * u], [120 * u, -20 * u], [132 * u, -10 * u]], 13 * u, col, lw * 0.8);
  g.beginPath(); g.moveTo(108 * u, -86 * u); g.quadraticCurveTo(170 * u, -70 * u, 150 * u, -130 * u); g.lineWidth = 11 * u; g.strokeStyle = INK; g.stroke(); g.lineWidth = 7 * u; g.strokeStyle = "#f6f0dc"; g.stroke();
  g.beginPath(); g.arc(100 * u, -120 * u, 3.5 * u, 0, TAU); g.fillStyle = INK; g.fill();
  g.restore();
}
function pyramid(g, x, y, s, k = 1) { poly(g, [[x - s, y], [x - s + s * k, y - s * k], [x - s + 2 * s * k, y]], "#e8c47a", 6); if (k >= 1) { poly(g, [[x, y - s], [x + s, y], [x + s * 0.18, y]], "#c99a52", 0); poly(g, [[x - s, y], [x, y - s], [x + s, y]], null, 6); } for (let i = 1; i < 6; i++) line(g, [[x - s + (s * i) / 6 * k, y - (s * i) / 6 * k], [x - s + 2 * s * k - (s * i) / 6 * k, y - (s * i) / 6 * k]], 2, "rgba(120,80,30,0.4)"); }
function ziggurat(g, x, y, s) { for (let i = 0; i < 4; i++) rect(g, x - s + i * s * 0.22, y - (i + 1) * s * 0.25, 2 * s - i * s * 0.44, s * 0.25, ["#c9a87a", "#b9986a", "#d9b88a", "#c9a87a"][i], 5); }
function cake(g, x, y, s, txt, t = 0) { rect(g, x - s, y - s * 0.6, s * 2, s * 0.6, "#f2b4bc", 6, 10); rect(g, x - s, y - s * 0.6, s * 2, s * 0.15, "#fff6f6", 4, 6); for (let i = -2; i <= 2; i++) { rect(g, x + i * s * 0.35 - 6, y - s * 0.95, 12, s * 0.35, "#cfe9ff", 3); flame(g, x + i * s * 0.35, y - s * 0.97, s * 0.07, t + i); } if (txt) strokeText(g, txt, x, y - s * 0.3, s * 0.32, { fill: "#c0262e", lw: 0, shadow: false }); }
function gothicCollege(g, x, y, w, h) { rect(g, x - w / 2, y - h, w, h, "#d9c8a0", 7); for (let i = 0; i < 5; i++) { const tx = x - w / 2 + (w * i) / 4; rect(g, tx - 24, y - h - 120, 48, 120, "#d9c8a0", 5); poly(g, [[tx - 30, y - h - 120], [tx, y - h - 220], [tx + 30, y - h - 120]], "#b9a880", 5); } for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) { const wx = x - w / 2 + 50 + c * (w - 100) / 4; smoothPath(g, [[wx - 26, y - h + 120 + r * 220 + 110], [wx - 26, y - h + 120 + r * 220 + 30], [wx, y - h + 120 + r * 220], [wx + 26, y - h + 120 + r * 220 + 30], [wx + 26, y - h + 120 + r * 220 + 110]]); fillInk(g, "#5a7a9a", 4); } smoothPath(g, [[x - 60, y], [x - 60, y - 140], [x, y - 200], [x + 60, y - 140], [x + 60, y]]); fillInk(g, "#5a3b2a", 6); }
function stepTemple(g, x, y, s) { for (let i = 0; i < 4; i++) rect(g, x - s + i * s * 0.2, y - (i + 1) * s * 0.28, 2 * s - i * s * 0.4, s * 0.28, ["#d9c8a0", "#c9b890", "#e2d4ae", "#d9c8a0"][i], 5); rect(g, x - s * 0.12, y - s * 1.12, s * 0.24, s * 1.12, "#b9a880", 4); for (const dx of [-0.3, 0.3]) { rect(g, x + dx * s - s * 0.14, y - s * 1.4, s * 0.28, s * 0.28, dx < 0 ? "#c0392b" : "#2f6fcf", 5); } }
