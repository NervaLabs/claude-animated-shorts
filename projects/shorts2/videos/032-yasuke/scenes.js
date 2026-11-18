// 032 — The Samurai Who Was Born in Mozambique
"use strict";
function buildShots() {
  const YAS = { ...C.samurai(1), skin: "#5a3420", hair: "#1a1012" };
  const YAS0 = { tunic: "#6a4a2a", trim: "#c9a35a", skin: "#5a3420", hair: "#1a1012" };
  const JES = { tunic: "#1f1a24", trim: "#3a3040", robe: true, hair: "#c9b08a" };
  const NOBU = { ...C.samurai(2), tunic: "#3a1a4a", trim: "#e2b64b", cape: "#c0392b", beard: "#1a1012" };
  // 0 hook
  S2(0, { bg: "japanVillage", blur: true, draw: (g, t) => { guy(g, YAS, { x: 540, y: 1840, h: 720, expr: "proud", blink: blinkAt(t, 1), t }); },
    titles: [["African", "AN AFRICAN SAMURAI", "stamp", { size: 100 }], ["1500s", "IN 1500s JAPAN", "label"]] });
  ev(wt(0, "African"), "sting", 0.6);
  // 1 1579 arrives in Kyoto as bodyguard to a Jesuit
  { const tY = wt(1, "1579"), tM = wt(1, "Mozambique"), tK = wt(1, "Kyoto"), tJ = wt(1, "Jesuit");
    S2(1, { bg: "japanVillage", draw: (g, t) => { const x = lerp(60, 360, clamp((t - S(1)) / 2.5)); const w = t < S(1) + 2.5 ? t * 1.5 : undefined; guy(g, YAS0, { x, y: 1840, h: 700, expr: "calm", walk: w, blink: blinkAt(t, 1), t }); if (t > tJ - 0.2) guy(g, JES, { x: x + 330, y: 1840, h: 560, expr: "happy", walk: w, blink: blinkAt(t, 2), t }); },
      titles: [[tY, "1579", "stamp", { size: 160 }], [tM, "FROM MOZAMBIQUE", "label"], [tK, "ARRIVES IN KYOTO", "label", { fill: "#ffe08a" }], [tJ, "BODYGUARD TO A JESUIT", "label", { size: 56 }]] });
    ev(tY, "boom", 0.5); ev(tK, "whoosh"); }
  // 2 crowds crush to see him
  { const tC = wt(2, "trampled");
    S2(2, { bg: "japanVillage", keys: [[0, 540, 1300, 1.0, 0], [6, 540, 1300, 1.1, 0]], draw: (g, t) => { guy(g, YAS0, { x: 540, y: 1840, h: 700, expr: "shock", blink: blinkAt(t, 1), t }); for (let i = 0; i < 8; i++) { const sd = i % 2 ? 1 : -1, k = Math.floor(i / 2); const push = Math.sin(t * 6 + i) * 20; guy(g, C.japanese(i), { x: 540 + sd * (260 + k * 110) + push, y: 1880 + (k % 2) * 20, h: 460 - k * 20, dir: -sd, expr: t > tC ? "shock" : "happy", armR: [2.6, 0.2], blink: 0, t, shadow: false }); } },
      titles: [["curiosity", "HUGE CROWDS", "label"], [tC, "PEOPLE CRUSHED TO SEE HIM", "stamp", { size: 76 }]] });
    ev(tC, "crowd"); ev(tC + 0.3, "scramble"); }
  // 3 Nobunaga makes him samurai Yasuke
  { const tO = wt(3, "Oda"), tA = wt(3, "amazed"), tY = wt(3, "Yasuke"), tS = wt(3, "samurai"), tK = wt(3, "katana");
    S2(3, { bg: "japanVillage", draw: (g, t) => { const on = t > tS - 0.2; guy(g, NOBU, { x: 260, y: 1840, h: 640, expr: t > tA ? "happy" : "proud", armR: [2.0, -0.3], blink: blinkAt(t, 1), t }); guy(g, on ? YAS : YAS0, { x: 760, y: 1840, h: 700, dir: -1, expr: on ? "proud" : "calm", blink: blinkAt(t, 2), t }); if (on) { const k = clamp((t - tS + 0.2) / 0.4); for (let i = 0; i < 6; i++) sparkle(g, 760 + Math.cos(i) * 260, 1300 + Math.sin(i * 2) * 200, 30 * k, (t + i / 6) % 1); } },
      titles: [[tO, "ODA NOBUNAGA", "label", { font: "Cinzel" }], [tA, "WAS AMAZED", "label"], [tY, "NAMED HIM YASUKE", "stamp", { size: 100 }], [tS, "SAMURAI STATUS", "label", { fill: "#ffe08a" }], [tK, "+ HIS OWN KATANA", "label"]] });
    ev(tY, "ding"); ev(tS, "choir", 0.5); ev(tK, "clank"); }
}
