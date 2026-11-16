// 07 — The Dogger Bank Incident (1904)
"use strict";
window.MOOD = "war";
const RUSFLAG = (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); line(g, [[0, 0], [w, h]], h * 0.2, "#2f5fae"); line(g, [[w, 0], [0, h]], h * 0.2, "#2f5fae"); }; // St Andrew's ensign
const REDENSIGN = (g, w, h) => { g.fillStyle = "#c0262e"; g.fillRect(-w, -h, w * 3, h * 3); g.save(); g.beginPath(); g.rect(0, 0, w * 0.5, h * 0.5); g.clip(); unionJack(g, w * 0.5, h * 0.5); g.restore(); };
const fleet = (g, t, n, x0, y0, sc, flash) => { for (let i = 0; i < n; i++) { const x = x0 + i * 330 * sc, y = y0 + (i % 2) * 30 * sc; steamShip(g, { x, y, h: 230 * sc, t, col: "#3a3f4a", super: "#d9d2bc", funnel: "#d4a632", guns: true, flag: RUSFLAG, seed: i }); if (flash) { const k = ((t * 1.7 + i * 0.37) % 1); boomFx(g, x + 120 * sc, y - 55 * sc, 60 * sc, k * 3); } } };
function buildShots() {
  const seaDay = cached("seaD", -1200, -1200, 3400, 3600, (g) => { sky3(g, -1200, -1200, 3400, 2300, "#4a7ac0", "#a3c3e2", "#dfe6ea"); paintGrain(g, -1200, -1200, 3400, 2300, 0.06); }, 0.6);
  const seaNight = cached("seaN", -1200, -1200, 3400, 3600, (g) => { sky3(g, -1200, -1200, 3400, 2300, "#0d1236", "#1f2650", "#3a4060"); for (let i = 0; i < 60; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.4 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 3400 - 1200, rnd(i * 7) * 1600 - 1200, 4, 4); } g.globalAlpha = 1; }, 0.6);
  // 0 — hook
  { const tY = wt(0, "1904"), tB = wt(0, "Britain"), tJ = wt(0, "Japan");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 0.95, 0], [6, 540, 1150, 1.05, 0]]);
      layer(g, cam, 0.6, seaNight);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -1200, 2300, "#2a4a70", "#142a48");
        steamShip(g, { x: 260, y: 1350, h: 380, t, col: "#3a3f4a", super: "#d9d2bc", funnel: "#d4a632", guns: true, flag: RUSFLAG });
        trawler(g, { x: 880, y: 1340, h: 200, t, dir: -1, col: "#2f6f4a" });
        for (let k = 0; k < 4; k++) { const tk = 0.6 + k * 1.2; boomFx(g, 470, 1290, 70, (t - tk) / 0.4); const q = clamp((t - tk) / 0.5); if (q > 0 && q < 1) { cannonball(g, lerp(480, 860, q), 1290 - Math.sin(q * Math.PI) * 120, 10); } if (t > tk + 0.5 && t < tk + 1.2) { g.save(); g.globalAlpha = 1 - (t - tk - 0.5) / 0.7; ell(g, 820 + k * 20, 1360, 40, 90, "#cfe9f6", 4); g.restore(); } }
        guy(g, WW.fisher, { x: 880, y: 1270, h: 140, dir: -1, expr: "shock", armL: [-2.8, 0], armR: [2.8, 0], t, shadow: false });
      });
      stamp(g, "1904", 540, 330, 150, t, tY - 0.05, tB - 0.1);
      label(g, "RUSSIA vs BRITAIN?!", 540, 330, 72, t, tB, tJ);
      label(g, "(THEY WERE AT WAR WITH JAPAN)", 540, 330, 44, t, tJ, E(0) + 0.3, { fill: "#ffe08a" });
    }, { type: "cut", d: 0 }, night(0.15));
    for (let k = 0; k < 4; k++) ev(0.6 + k * 1.2, "cannon", 0.6); ev(tY, "boom", 0.6);
  }
  // 1 — the paranoid Baltic Fleet
  { const t0 = S(1) - 0.1, tH = wt(1, "halfway"), tBF = wt(1, "Baltic"), tP = wt(1, "paranoid"), tT = wt(1, "torpedo");
    shot(t0, (g, t, lt) => {
      const deck = t > tP - 0.2;
      if (!deck) {
        const cam = camAt(lt, [[0, 200, 1250, 1.0, 0], [6, 900, 1250, 1.02, 0]]);
        layer(g, cam, 0.6, seaDay);
        layer(g, cam, 1, (g) => { sea(g, 1150, t, -1200, 2300, "#3f7fb4", "#1f4f84"); fleet(g, t, 6, -500, 1300, 0.9, false); });
        label(g, "HALFWAY AROUND THE WORLD", 540, 330, 56, t, tH, tBF);
        label(g, "RUSSIA'S BALTIC FLEET", 540, 330, 64, t, tBF, tP);
      } else {
        const cam = camAt(t - tP, [[0, 540, 1300, 1.1, 0], [6, 540, 1260, 1.2, -3]]);
        layer(g, cam, 0.6, seaDay);
        layer(g, cam, 1, (g) => {
          sea(g, 1150, t, -1200, 2300, "#3f7fb4", "#1f4f84");
          g.fillStyle = vgrad(g, 1500, 2200, [[0, "#8a8f96"], [1, "#5a5f66"]]); g.fillRect(-900, 1500, 2900, 1200); line(g, [[-900, 1500], [2000, 1500]], 6);
          guy(g, WW.russianOfficer, { x: 340, y: 1820, h: 600, expr: "scared", look: Math.sin(t * 3), sweat: (t * 0.8) % 1, armR: [2.2, 1.6], blink: 0, t });
          rect(g, 420, 1240, 120, 40, "#c9a35a", 5, 8); // spyglass
          for (let i = 0; i < 2; i++) guy(g, WW.russianSailor, { x: 720 + i * 200, y: 1820, h: 500, dir: -1, expr: "scared", look: -Math.sin(t * 4 + i), sweat: (t * 0.8 + i * 0.4) % 1, blink: 0, t });
          if (t > tT - 0.1) { g.save(); g.globalAlpha = clamp((t - tT) / 0.2); bubble(g, 600, 860, 640, 230, 420, 1100, "#fff", 6); strokeText(g, "JAPANESE TORPEDO", 600, 830, 44, { fill: "#b8262f", lw: 0, shadow: false }); strokeText(g, "BOATS?!", 600, 890, 44, { fill: "#b8262f", lw: 0, shadow: false }); g.restore(); }
        });
        stamp(g, "PARANOID", 540, 330, 120, t, tP, E(1) + 0.2);
      }
    }, { type: "flash", d: 0.2 });
    ev(t0, "horns", 0.6); ev(tP, "heartbeat", 0.7); ev(tT, "pop");
  }
  // 2 — fishing trawlers in the fog → open fire
  { const t0 = S(2) - 0.1, tN = wt(2, "North"), tSp = wt(2, "spotted"), tF = wt(2, "fog"), tO = wt(2, "opened");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 850, 1250, 1.25, 0], [tO - t0, 800, 1250, 1.3, 0], [tO - t0 + 0.3, 600, 1300, 1.05, 3], [7, 600, 1300, 1.07, 3]]);
      layer(g, cam, 0.6, seaNight);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -1200, 2300, "#2a4a70", "#142a48");
        for (let i = 0; i < 3; i++) { const x = 700 + i * 300, y = 1300 + (i % 2) * 60; trawler(g, { x, y, h: 190, t, col: ["#2f6f4a", "#8a3a2a", "#2f4f8f"][i], seed: i }); flame(g, x + 26, y - 120, 9, t + i); guy(g, WW.fisher, { x: x - 20, y: y - 30, h: 110, expr: t > tO ? "shock" : "happy", armR: [1.8, 0], t, shadow: false }); }
        steamShip(g, { x: -150, y: 1500, h: 420, t, col: "#3a3f4a", super: "#d9d2bc", funnel: "#d4a632", guns: true, flag: RUSFLAG });
        if (t > tO) for (let k = 0; k < 5; k++) { const tk = tO + k * 0.4; boomFx(g, 120, 1400, 80, (t - tk) / 0.4); if (t > tk + 0.4 && t < tk + 1.1) { g.save(); g.globalAlpha = 1 - (t - tk - 0.4) / 0.7; ell(g, 700 + k * 120, 1390, 34, 80, "#cfe9f6", 4); g.restore(); } }
      });
      fog(g, t, 0.55, 800);
      label(g, "THE NORTH SEA", 540, 330, 72, t, tN, tSp, { font: "Cinzel", fill: "#cfe0ff" });
      label(g, "...FISHING BOATS", 540, 330, 72, t, tSp, tO - 0.05);
      stamp(g, "OPEN FIRE!", 540, 330, 110, t, tO, E(2) + 0.2);
    }, { type: "xfade", d: 0.3 }, night(0.25));
    for (let k = 0; k < 5; k++) ev(tO + k * 0.4, "cannon", 0.6); KICKS.push({ t: tO, a: 16 });
  }
  // 3 — firing on each other; the toll
  { const t0 = S(3) - 0.1, tE = wt(3, "each"), tK = wt(3, "killing");
    shot(t0, (g, t, lt) => {
      const sober = t > tK - 0.15;
      if (!sober) {
        const cam = camAt(lt, [[0, 540, 1250, 0.85, 0], [3, 540, 1250, 0.9, 0]]);
        layer(g, cam, 0.6, seaNight);
        layer(g, cam, 1, (g) => { sea(g, 1150, t, -1200, 2300, "#2a4a70", "#142a48"); steamShip(g, { x: 150, y: 1350, h: 340, t, col: "#3a3f4a", super: "#d9d2bc", funnel: "#d4a632", guns: true, flag: RUSFLAG }); steamShip(g, { x: 930, y: 1380, h: 340, t, dir: -1, col: "#3a3f4a", super: "#d9d2bc", funnel: "#d4a632", guns: true, flag: RUSFLAG, seed: 3 }); for (let k = 0; k < 4; k++) { boomFx(g, 360, 1270, 60, ((t - t0) * 1.6 + k * 0.25) % 1.2); boomFx(g, 720, 1290, 60, ((t - t0) * 1.6 + k * 0.25 + 0.5) % 1.2); } });
        fog(g, t, 0.4, 900);
        label(g, "RUSSIA vs ... RUSSIA", 540, 330, 70, t, tE - 0.2, tK);
      } else {
        const cam = camAt(t - tK, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.1, 0]]);
        layer(g, cam, 0.6, (g) => { g.fillStyle = vgrad(g, -200, 2200, [[0, "#2a2a3a"], [1, "#141420"]]); g.fillRect(-500, -500, 2100, 3000); });
        layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) { const x = 300 + i * 240; rect(g, x - 18, 1300, 36, 140, "#f2efe6", 5, 4); flame(g, x, 1290, 18, t + i); } g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = rgrad(g, 540, 1250, 0, 500, [[0, "rgba(255,200,120,0.3)"], [1, "rgba(255,200,120,0)"]]); g.fillRect(0, 700, 1080, 1100); g.restore(); rect(g, 140, 1440, 800, 50, "#5a3b2a", 5, 6); });
        label(g, "2 FISHERMEN · 1 CHAPLAIN", 540, 700, 58, t, tK, 999, { font: "Cinzel", fill: "#e6e0f2" });
      }
    }, { type: "xfade", d: 0.3 }, night(0.2));
    ev(tE, "cannon", 0.6); ev(tK, "drone");
  }
  // 4 — Britain nearly declares war; Russia pays
  { const t0 = S(4) - 0.1, tN = wt(4, "nearly"), tA = wt(4, "apologized"), tP = wt(4, "compensation");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [6, 540, 1280, 1.08, 0]]);
      layer(g, cam, 0.6, seaDay);
      layer(g, cam, 1, (g) => {
        sea(g, 1150, t, -1200, 2300, "#3f7fb4", "#1f4f84");
        for (let i = 0; i < 3; i++) steamShip(g, { x: 200 + i * 340, y: 1230, h: 220, t, col: "#5a5f6a", super: "#e9e2cc", funnel: "#c9a35a", guns: true, flag: REDENSIGN.call ? (g, w, h) => { g.fillStyle = "#f6f3ea"; g.fillRect(-w, -h, w * 3, h * 3); g.fillStyle = "#c0262e"; g.fillRect(w * 0.42, -h, w * 0.16, h * 3); g.fillRect(-w, h * 0.42, w * 3, h * 0.16); g.save(); g.beginPath(); g.rect(0, 0, w * 0.5, h * 0.5); g.clip(); unionJack(g, w * 0.5, h * 0.5); g.restore(); } : null, seed: i });
        g.fillStyle = "#8a8f96"; g.fillRect(-900, 1560, 2900, 1200); line(g, [[-900, 1560], [2000, 1560]], 6);
        guy(g, { ...WW.rafPilot, tunic: "#1f2a44", helmet: "bicorne", beard: "#e9e9ef" }, { x: 300, y: 1840, h: 560, expr: t < tA ? "angry" : "sly", armR: t < tA ? [2.5, 0] : [1.4, -0.4], blink: blinkAt(t, 1), t });
        guy(g, WW.russianOfficer, { x: 800, y: 1840, h: 540, dir: -1, expr: "sad", lean: t > tA ? 25 : 0, armR: t > tP ? [1.6, -0.2] : [0.3, 0.2], hold: t > tP ? { r: "bag" } : null, blink: blinkAt(t, 2), t });
        if (t > tN && t < tA) shout(g, 320, 1000, "WAR?!", 80, clamp((t - tN) / 0.12), "#b8262f", [320, 1200]);
        if (t > tA) shout(g, 760, 1020, "SORRY!", 64, clamp((t - tA) / 0.12), "#2f5fae", [780, 1220]);
      });
      stamp(g, "COMPENSATION PAID", 540, 330, 80, t, tP, 999);
    }, { type: "xfade", d: 0.3 });
    ev(tN, "drums"); ev(tA, "pop"); ev(tP, "cash");
  }
}
