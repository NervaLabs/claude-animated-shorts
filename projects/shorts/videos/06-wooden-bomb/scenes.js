// 06 — The Wooden Bomb Trick (WWII)
"use strict";
window.MOOD = "comic";
const dutchFields = (g) => {
  sky3(g, -900, -900, 2900, 2100, "#5a8ad0", "#b3d2ee", "#e9eedc");
  smoothHills(g, -900, 2000, 1150, 30, "#86a95a", 2, 5);
  for (let i = 0; i < 5; i++) { const x = -700 + i * 620; poly(g, [[x - 26, 1150], [x - 16, 1040], [x + 16, 1040], [x + 26, 1150]], "#c9895a", 4); for (let k = 0; k < 4; k++) { g.save(); g.translate(x, 1040); g.rotate(k * Math.PI / 2 + 0.3); rect(g, -5, -80, 18, 76, "#f3ecda", 3); g.restore(); } }
  ground(g, 1200, "#9cbb5c", -900, 2000);
  g.fillStyle = "#b8b4a4"; g.fillRect(-900, 1500, 2900, 160); line(g, [[-900, 1500], [2000, 1500]], 5); line(g, [[-900, 1660], [2000, 1660]], 5);
  for (let x = -880; x < 2000; x += 160) rect(g, x, 1574, 80, 12, "#f3f1ea", 0);
  paintGrain(g, -900, -900, 2900, 3200, 0.07);
};
const skyBg = (g) => { sky3(g, -900, -1200, 2900, 3600, "#3f78c8", "#8ec0ea", "#dfeef6"); paintGrain(g, -900, -1200, 2900, 3600, 0.05); };
function fakeBase(g, t, k) { // k: build progress 0..1 per item group
  if (k[2] > 0) { g.save(); g.translate(1100, 1500); g.scale(1, easeBack(k[2])); hangar(g, 0, 0, 520, 360, true); g.restore(); }
  if (k[0] > 0) { g.save(); g.translate(380, 1560); g.scale(easeBack(k[0]), easeBack(k[0])); plane(g, { x: 0, y: 0, h: 180, wood: true, t: 0 }); g.restore(); }
  if (k[1] > 0) { g.save(); g.translate(820, 1780); g.scale(easeBack(k[1]), easeBack(k[1])); truck(g, { x: 0, y: 0, h: 150, wood: true }); g.restore(); }
}
function buildShots() {
  const fields = cached("dutch", -900, -900, 2900, 3200, dutchFields, 1.1);
  const fieldsB = cached("dutchB", -900, -900, 2900, 3200, dutchFields, 0.8, 4);
  const skyC = cached("sky6", -900, -1200, 2900, 3600, skyBg, 0.6);
  // 0 — hook: an RAF pilot with a plan
  { const tW = wt(0, "World"), tPr = wt(0, "pranks");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 960, 1.1, 0], [6, 540, 960, 1.2, 0]]);
      layer(g, cam, 0.5, (g) => { skyC(g); clouds(g, t * 6, -200, 6, 3, "#fff", 1.2); });
      layer(g, cam, 1, (g) => {
        plane(g, { x: 540 + Math.sin(t * 1.3) * 30, y: 1050 + Math.sin(t * 2) * 20, h: 330, col: "#6f7a5a", roundel: true, t, pilot: true });
        const px = 540 + 66 * 3.3 + Math.sin(t * 1.3) * 30;
        if (t > tPr - 0.3) { shout(g, 640, 700, "heh heh", 54, clamp((t - tPr + 0.3) / 0.15), "#2f5fae", [px - 20, 900]); }
      });
      stamp(g, "WORLD WAR II", 540, 330, 100, t, tW, tPr - 0.1);
      stamp(g, "THE GREATEST PRANK?", 540, 330, 76, t, tPr, E(0) + 0.3);
    });
    ev(0, "plane"); ev(tW, "boom", 0.6); ev(tPr, "laugh");
  }
  // 1 — the decoy airfield
  { const t0 = S(1) - 0.1, tH = wt(1, "Holland"), tE = wt(1, "engineers"), tD = wt(1, "decoy"), tP = wt(1, "planes"), tT = wt(1, "trucks"), tHa = wt(1, "hangars");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 600, 1300, 0.85, 0], [tP - t0, 500, 1450, 1.05, 0], [tHa - t0, 800, 1400, 0.95, 0], [12, 760, 1400, 0.97, 0]]);
      layer(g, cam, 0.8, fields);
      layer(g, cam, 1, (g) => {
        fakeBase(g, t, [ss((t - tP + 0.2) / 0.4), ss((t - tT + 0.2) / 0.4), ss((t - tHa + 0.2) / 0.4)]);
        for (let i = 0; i < 4; i++) { const x = 120 + i * 260, y = 1820 + (i % 2) * 30; guy(g, WW.german, { x, y, h: 360, expr: "determined", armR: [1.6 + Math.abs(Math.sin(t * 8 + i)) * 0.9, -0.6], blink: blinkAt(t, i), t }); const hx = x + 70, hy = y - 270 - Math.abs(Math.sin(t * 8 + i)) * 40; line(g, [[hx, hy], [hx + 40, hy - 30]], 10, "#6b4024"); rect(g, hx + 30, hy - 48, 34, 20, "#4a4a52", 3); }
      });
      label(g, "OCCUPIED HOLLAND", 540, 330, 66, t, tH, tD - 0.05, { font: "Cinzel", fill: "#ffe0b0" });
      label(g, "A FAKE AIRFIELD", 540, 330, 76, t, tD, tP - 0.05);
      label(g, "100% WOOD", 540, 330, 86, t, tP, E(1) + 0.2, { fill: "#ffd08a" });
    }, { type: "flash", d: 0.2 });
    ev(tE, "build"); ev(tP, "pop"); ev(tT, "pop"); ev(tHa, "pop");
  }
  // 2 — the RAF was watching the whole time
  { const t0 = S(2) - 0.1, tB = wt(2, "British"), tW = wt(2, "watched"), tEn = wt(2, "entire");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 960, 1.0, 0], [6, 540, 960, 1.08, 0]]);
      layer(g, cam, 0.5, (g) => { skyC(g); clouds(g, t * 6, 1200, 5, 9, "#fff", 1.1); });
      layer(g, cam, 1, (g) => {
        plane(g, { x: 520, y: 760, h: 260, col: "#8aa0b8", roundel: true, t, pilot: true, dir: 1 });
        // the snapshot
        if (t > tW) { const k = clamp((t - tW) / 0.3); g.save(); g.translate(540, 1360); g.rotate(-0.05); g.scale(easeBack(k), easeBack(k)); rect(g, -330, -260, 660, 520, "#f6f3ea", 7, 6); g.save(); g.beginPath(); g.rect(-300, -230, 600, 410); g.clip(); g.translate(-540 * 0.42 - 0, -1450 * 0.42); g.scale(0.42, 0.42); g.translate(0, 0); fields(g); fakeBase(g, t, [1, 1, 1]); g.restore(); strokeText(g, "TOP SECRET: FAKE", 0, 225, 36, { fill: "#c0262e", lw: 0, shadow: false }); g.restore(); }
        if (t > tW && t < tW + 0.1) { g.fillStyle = "rgba(255,255,255,0.8)"; g.fillRect(-500, -500, 2100, 3000); }
      });
      label(g, "RAF RECONNAISSANCE", 540, 330, 64, t, tB, tEn);
      stamp(g, "*CLICK*", 540, 330, 110, t, tW, E(2) + 0.2);
    }, { type: "whip", d: 0.3 });
    ev(t0, "plane"); ev(tW, "ding");
  }
  // 3 — finished... and one wooden bomb
  { const t0 = S(3) - 0.1, tF = wt(3, "finished"), tL = wt(3, "lone"), tDr = wt(3, "dropped"), tWo = wt(3, "wood"), tP = wt(3, "proving");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 600, 1350, 0.9, 0], [tDr - t0, 600, 1300, 0.95, 0], [tWo - t0 - 0.2, 420, 1500, 1.25, 0], [9, 420, 1500, 1.28, 0]]);
      layer(g, cam, 0.8, fields);
      layer(g, cam, 1, (g) => {
        fakeBase(g, t, [1, 1, 1]);
        if (t > tF - 0.2 && t < tL + 1.5) { line(g, [[150, 1300], [150, 1100]], 8, "#6b4024"); line(g, [[700, 1300], [700, 1100]], 8, "#6b4024"); rect(g, 150, 1100, 550, 80, "#f6f3ea", 5); strokeText(g, "FINISHED!", 425, 1140, 54, { fill: "#2f5f2a", lw: 0, shadow: false }); }
        const hitT = tWo - 0.15, landed = t > hitT;
        for (let i = 0; i < 3; i++) guy(g, WW.german, { x: 80 + i * 180, y: 1840, h: 380, expr: landed ? "shock" : t > tF ? "proud" : "neutral", look: t > tDr && !landed ? -1 : 0, headTilt: t > tDr && !landed ? -8 : 0, armR: t > tF && !landed ? [2.8, 0] : [0.3, 0.2], blink: blinkAt(t, i), t });
        const px = lerp(-400, 1500, clamp((t - tL) / 3.2)); plane(g, { x: px, y: 500, h: 220, col: "#6f7a5a", roundel: true, t, pilot: true });
        if (t > tDr) { const k = clamp((t - tDr) / (hitT - tDr)), bx = lerp(lerp(-400, 1500, clamp((tDr - tL) / 3.2)), 420, k), by = lerp(540, 1480, k * k);
          g.save(); g.translate(bx, landed ? 1500 - Math.abs(Math.sin((t - hitT) * 8)) * 60 * Math.exp(-(t - hitT) * 3) : by); g.rotate(landed ? 1.2 : 1.57 * k);
          smoothPath(g, [[-70, -24], [40, -24], [70, 0], [40, 24], [-70, 24]]); fillInk(g, "#c9965a", 6); for (let i = 0; i < 4; i++) line(g, [[-60 + i * 28, -22], [-56 + i * 28, 22]], 2.5, "rgba(90,50,20,0.55)"); poly(g, [[-70, -24], [-100, -44], [-100, 44], [-70, 24]], "#b9864a", 5); g.restore();
          if (landed) shout(g, 560, 1140, "BONK.", 70, clamp((t - hitT) / 0.12), "#8a5a32");
        }
      });
      stamp(g, "A BOMB MADE OF WOOD", 540, 330, 78, t, tWo, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tF, "pop"); ev(tL, "plane"); ev(tDr, "whistlefall"); ev(tWo - 0.15, "boing"); ev(tWo - 0.15, "clank", 0.4); ev(tP, "laugh", 0.6);
  }
}
