// 45 — Same era: a Kyoto card shop and a foggy London (original imagery; no company logos or game characters)
"use strict";
window.MOOD = "eerie";
const YAMA = { tunic: "#3a3a4a", trim: "#c9c4b8", hair: "#1a1012", trousers: "#3a3a4a", robe: true, skin: "#f2d0a8", moust: true };
const BOBBY = { tunic: "#1f2a44", trim: "#c9c4b8", helmet: "bobby", trousers: "#1f2a44", moust: true };
HATS.bobby = (g, rx, ry, lw) => { smoothPath(g, [[-rx * 0.95, -ry * 0.5], [-rx * 0.85, -ry * 1.3], [0, -ry * 1.9], [rx * 0.85, -ry * 1.3], [rx * 0.95, -ry * 0.5]]); fillInk(g, "#1f2a44", lw); ell(g, 0, -ry * 1.15, rx * 0.18, ry * 0.2, "#c9c4b8", lw * 0.4); };
/** traditional flower-card designs (generic) */
function flowerCard(g, x, y, s, kind, rot = 0) { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); rect(g, -32 * u, -50 * u, 64 * u, 100 * u, "#1f1a24", 4, 4 * u); rect(g, -28 * u, -46 * u, 56 * u, 92 * u, ["#c0262e", "#f6f3ea", "#2f6f4a", "#e2b64b"][kind % 4], 2, 3 * u); for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU; ell(g, Math.cos(a) * 12 * u, -10 * u + Math.sin(a) * 12 * u, 8 * u, 8 * u, ["#f2b4bc", "#c0262e", "#f6f3ea", "#e2453c"][kind % 4], 2); } ell(g, 0, -10 * u, 5 * u, 5 * u, "#e2b64b", 2); line(g, [[0, 2 * u], [-6 * u, 36 * u]], 3 * u, "#4f8a3f"); g.restore(); }
const kyoto = (g) => { sky3(g, -900, -900, 2900, 2100, "#e9a07a", "#f2c49a", "#f6e6c8"); for (let i = 0; i < 5; i++) { const x = -700 + i * 600; rect(g, x - 220, 900, 440, 400, "#8a5a3a", 6); poly(g, [[x - 280, 900], [x, 760], [x + 280, 900]], "#3a3a44", 6); for (let k = 0; k < 4; k++) line(g, [[x - 200 + k * 130, 920], [x - 200 + k * 130, 1300]], 4, "#5a3a22"); } g.fillStyle = "#b9a48a"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.07); };
const londonFog = (g) => { sky3(g, -900, -900, 2900, 2100, "#1a1a2a", "#3a3a4a", "#5a5a62"); for (let i = 0; i < 11; i++) { const x = -800 + i * 260, h = 380 + rnd(i) * 160; brickWall(g, x, 1300 - h, 240, h, ["#4a3a3a", "#3a3a3a", "#5a4a4a"][i % 3], 4); } for (const x of [-500, 300, 1100]) { line(g, [[x, 1300], [x, 800]], 12, "#2a2a30"); ell(g, x, 790, 30, 20, "#ffe08a", 4); } g.fillStyle = "#3a3a40"; g.fillRect(-900, 1300, 2900, 1300); line(g, [[-900, 1300], [2000, 1300]], 6); paintGrain(g, -900, -900, 2900, 3400, 0.08); };
function buildShots() {
  const ky = cached("kyoto", -900, -900, 2900, 3400, kyoto, 1.0);
  const kyB = cached("kyotoB", -900, -900, 2900, 3400, kyoto, 0.7, 5);
  const ln = cached("lfog", -900, -900, 2900, 3400, londonFog, 1.0);
  // 0 — hook: split screen
  { const tN = wt(0, "Nintendo"), tJ = wt(0, "Jack");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [6, 540, 1250, 1.05, 0]]);
      layer(g, cam, 1, (g) => {
        g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); g.translate(-270, 0); kyB(g); guy(g, YAMA, { x: 540, y: 1780, h: 460, expr: "proud", armR: [1.6, -0.6], blink: blinkAt(t, 1), t }); for (let i = 0; i < 3; i++) flowerCard(g, 720 + i * 40, 1350, 120, i, -0.2 + i * 0.2); g.restore();
        g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); g.translate(270, 0); ln(g); tinted(g, (tt) => { tt.setTransform(g.getTransform()); guy(tt, { tunic: "#000", helmet: "tophat" }, { x: 540, y: 1700, h: 420, t }); }, "#0a0a12", 0.9); fog(g, t, 0.6, 900); g.restore();
        line(g, [[540, -200], [540, 2400]], 10);
      });
      label(g, "KYOTO CARD MAKER", 270, 330, 50, t, tN, E(0) + 0.3, { fill: "#ffe0b0" });
      label(g, "FOGGY LONDON", 810, 330, 56, t, tJ, E(0) + 0.3, { fill: "#cfe0ff" });
      stamp(g, "SAME ERA", 540, 520, 100, t, tJ + 0.3, E(0) + 0.3, { rot: 0 });
    });
    ev(tN, "ding"); ev(tJ, "drone", 0.6); ev(tJ + 0.3, "boom", 0.5);
  }
  // 1 — 1889: Fusajiro Yamauchi's hanafuda cards
  { const t0 = S(1) - 0.1, tY = wt(1, "1889"), tF = wt(1, "Fusajiro"), tK = wt(1, "Kyoto"), tH = wt(1, "hanafuda"), tM = wt(1, "mulberry");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 0.95, 0], [11, 540, 1300, 1.05, 0]]);
      layer(g, cam, 0.8, ky);
      layer(g, cam, 1, (g) => {
        rect(g, 380, 1500, 600, 60, "#6b4024", 6, 6);
        guy(g, YAMA, { x: 230, y: 1820, h: 580, expr: "determined", armR: [1.7 + Math.abs(Math.sin(t * 4)) * 0.3, -0.8], blink: blinkAt(t, 1), t });
        const n = 1 + Math.floor(clamp((t - tH + 0.2) / 2) * 8);
        for (let i = 0; i < n; i++) flowerCard(g, 440 + (i % 4) * 140, 1420 - Math.floor(i / 4) * 160, 130, i, (i % 2 ? 0.08 : -0.08));
        if (t > tM - 0.1) { line(g, [[880, 1500], [900, 1300], [960, 1200]], 14, "#6b4024"); for (let k = 0; k < 4; k++) ell(g, 920 + k * 20, 1200 + (k % 2) * 20, 30, 18, "#5f9a48", 4, k); }
      });
      stamp(g, "1889", 540, 330, 150, t, tY - 0.05, tF - 0.05);
      label(g, "FUSAJIRO YAMAUCHI", 540, 330, 66, t, tF, tK - 0.05, { font: "Cinzel" });
      label(g, "KYOTO, JAPAN", 540, 330, 86, t, tK, tH - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      label(g, "HANDMADE FLOWER CARDS", 540, 330, 62, t, tH, tM - 0.05);
      label(g, "FROM MULBERRY BARK", 540, 330, 68, t, tM, E(1) + 0.2, { fill: "#d9f2a0" });
    }, { type: "flash", d: 0.2 });
    ev(tY, "boom", 0.5); ev(tH, "pop"); ev(tH + 0.4, "pop"); ev(tM, "ding");
  }
  // 2 — meanwhile: a manhunt in London, and the Eiffel Tower opens
  { const t0 = S(2) - 0.1, tL = wt(2, "London"), tE = wt(2, "Eiffel");
    shot(t0, (g, t, lt) => {
      const paris = t > tE - 0.3;
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [9, 540, 1300, 1.06, 0]]);
      if (!paris) { layer(g, cam, 0.8, ln); layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) { const x = 160 + i * 340 + Math.sin(t * 0.8 + i) * 40; guy(g, BOBBY, { x, y: 1800, h: 500, expr: "scared", look: Math.sin(t * 2 + i), walk: (t * 0.8 + i * 0.3) % 1, armR: [1.6, -0.6], blink: blinkAt(t, i), t }); flame(g, x + 120, 1400, 14, t + i); rect(g, x + 100, 1400, 40, 50, "#3a3a44", 3, 4); } }); fog(g, t, 0.6, 800); label(g, "LONDON POLICE ON THE HUNT", 540, 330, 58, t, tL - 0.3, tE - 0.3, { fill: "#cfe0ff" }); }
      else { layer(g, cam, 0.8, (g) => { parisSky(g, -900, 2000, 1350, true); eiffel(g, 540, 1350, 1000, "#8a6a4a", easeBack(clamp((t - tE + 0.3) / 0.6))); g.fillStyle = "#4a4a5a"; g.fillRect(-900, 1350, 2900, 1300); }); layer(g, cam, 1, (g) => { for (let k = 0; k < 5; k++) { const q = ((t - tE) * 0.8 + k / 5) % 1; boomFx(g, 200 + k * 180, 500 + (k % 2) * 160, 90, q * 1.2); } }); stamp(g, "EIFFEL TOWER: OPEN!", 540, 330, 86, t, tE, 999); }
    }, { type: "whip", d: 0.3 }, night(0.15));
    ev(tL, "heartbeat", 0.6); ev(tE, "cheer"); ev(tE + 0.3, "boom", 0.5);
  }
}
