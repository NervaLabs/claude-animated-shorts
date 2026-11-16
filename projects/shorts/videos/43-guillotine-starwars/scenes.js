// 43 — France used the guillotine in 1977 (original imagery only; no film characters, logos or designs)
"use strict";
window.MOOD = "eerie";
const AUD = (i) => ({ tunic: ["#c0392b", "#2f6f9a", "#e2b64b", "#6a9a45", "#7b5ac9"][i % 5], trim: "#f2efe6", hair: ["#5a3b2a", "#2a1a14", "#c58a3d", "#1a1012"][i % 4], trousers: "#3a3a4a" });
/** an original cartoon rocket, generic 70s sci-fi */
function rocket(g, x, y, s, t, rot = 0) { const u = s / 100; g.save(); g.translate(x, y); g.rotate(rot); smoothPath(g, [[0, -80 * u], [24 * u, -30 * u], [24 * u, 40 * u], [-24 * u, 40 * u], [-24 * u, -30 * u]]); fillInk(g, "#e9eef2", 4); ell(g, 0, -20 * u, 10 * u, 10 * u, "#5ac8f0", 3); for (const sd of [-1, 1]) poly(g, [[sd * 24 * u, 10 * u], [sd * 46 * u, 50 * u], [sd * 24 * u, 40 * u]], "#c0392b", 4); flame(g, 0, 50 * u, 12 * u, t); g.restore(); }
function guillotineSil(g, x, y, s, col = "#141420") { const u = s / 100; g.fillStyle = col; g.fillRect(x - 60 * u, y - 260 * u, 18 * u, 260 * u); g.fillRect(x + 42 * u, y - 260 * u, 18 * u, 260 * u); g.fillRect(x - 70 * u, y - 270 * u, 140 * u, 18 * u); g.beginPath(); g.moveTo(x - 42 * u, y - 240 * u); g.lineTo(x + 42 * u, y - 210 * u); g.lineTo(x + 42 * u, y - 196 * u); g.lineTo(x - 42 * u, y - 196 * u); g.closePath(); g.fill(); g.fillRect(x - 90 * u, y - 20 * u, 180 * u, 20 * u); }
const cinema = (g) => { g.fillStyle = "#1a1424"; g.fillRect(-900, -900, 2900, 3400); rect(g, 40, 300, 1000, 640, "#0a0c1e", 8, 4); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) rect(g, -60 + i * 140 + (r % 2) * 70, 1300 + r * 140, 120, 90, "#7a1a2a", 4, 10); };
function buildShots() {
  const cn = cached("cinema", -900, -900, 2900, 3400, cinema, 1.0);
  // 0 — hook: split screen
  { const tF = wt(0, "France"), tG = wt(0, "guillotine"), tS = wt(0, "Star");
    shot(0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [6, 540, 1150, 1.05, 0]]);
      layer(g, cam, 1, (g) => {
        g.save(); g.beginPath(); g.rect(-500, -500, 1040, 3000); g.clip(); sky3(g, -500, -500, 1100, 2000, "#3a3a5a", "#6a6a8a", "#9a9aaa"); g.fillStyle = "#4a4a5a"; g.fillRect(-500, 1500, 1100, 1000); guillotineSil(g, 270, 1500, 380); flagCloth(g, 80, 700, 180, 120, { v: ["#2f4f9f", "#f6f3ea", "#c0262e"] }, t, 1, 4); g.restore();
        g.save(); g.beginPath(); g.rect(540, -500, 1100, 3000); g.clip(); g.fillStyle = "#1a1424"; g.fillRect(540, -500, 1100, 3000); rect(g, 610, 600, 400, 560, "#0a0c1e", 7, 6); for (let i = 0; i < 30; i++) { g.fillStyle = "#fff"; g.fillRect(620 + rnd(i) * 380, 610 + rnd(i * 3) * 540, 3, 3); } rocket(g, 810, 900 + Math.sin(t * 2) * 20, 160, t, 0.4); strokeText(g, "SPACE FILM", 810, 1100, 44, { fill: "#ffe08a", lw: 0, shadow: false }); for (let i = 0; i < 8; i++) ell(g, 600 + i * 60, 560, 12, 12, (Math.floor(t * 4) + i) % 2 ? "#ffe08a" : "#8a6a3a", 3); g.restore();
        line(g, [[540, -200], [540, 2400]], 10);
      });
      label(g, "FRANCE: GUILLOTINE", 270, 330, 50, t, tG - 0.2, E(0) + 0.3, { fill: "#cfe0ff" });
      label(g, "THEATERS: SCI-FI", 810, 330, 50, t, tS, E(0) + 0.3, { fill: "#ffe08a" });
      stamp(g, "SAME YEAR", 540, 520, 96, t, tS + 0.3, E(0) + 0.3, { rot: 0 });
      void tF;
    });
    ev(tG, "drone", 0.5); ev(tS, "whoosh"); ev(tS + 0.3, "boom", 0.6);
  }
  // 1 — May 1977: audiences at a space movie
  { const t0 = S(1) - 0.1, tM = wt(1, "May"), tB = wt(1, "battle"), tC = wt(1, "cinemas");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 0.9, 0], [8, 540, 1150, 1.0, 0]]);
      layer(g, cam, 1, (g) => {
        cn(g);
        g.save(); g.beginPath(); g.rect(46, 306, 988, 628); g.clip(); for (let i = 0; i < 60; i++) { g.fillStyle = "#fff"; g.fillRect(50 + ((rnd(i) * 1000 + t * 200 * (0.5 + rnd(i * 2))) % 1000), 310 + rnd(i * 3) * 620, 3, 3); } rocket(g, 300 + Math.sin(t * 1.5) * 120, 620, 220, t, 1.4); rocket(g, 800 - Math.sin(t * 1.3) * 100, 560, 160, t + 1, -1.4); if (t > tB) for (let k = 0; k < 3; k++) { const q = (t * 2 + k / 3) % 1; line(g, [[360 + q * 400, 600], [420 + q * 400, 590]], 8, "#6fe0ff"); } g.restore();
        for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) guy(g, AUD(i + r), { x: 100 + i * 180 + r * 90, y: 1500 + r * 180, h: 300, sit: true, expr: t > tB ? "shock" : "happy", look: 0, headTilt: -6, blink: blinkAt(t, i + r * 6), t, shadow: false });
      });
      stamp(g, "MAY 1977", 540, 330, 130, t, tM - 0.05, tC - 0.05);
      label(g, "SPACE BATTLES IN CINEMAS", 540, 330, 60, t, tC, E(1) + 0.2, { fill: "#ffe08a" });
    }, { type: "flash", d: 0.2 });
    ev(tM, "boom", 0.5); ev(tB, "whoosh", 0.6); ev(tC, "cheer", 0.5);
  }
  // 2 — September 1977, Marseille; abolished in 1981
  { const t0 = S(2) - 0.1, tF = wt(2, "four"), tS = wt(2, "September"), tL = wt(2, "final"), tMa = wt(2, "Marseille"), tA = wt(2, "abolished"), tY = wt(2, "1981");
    shot(t0, (g, t, lt) => {
      const ab = t > tA - 0.2;
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [14, 540, 1250, 1.08, 0]]);
      layer(g, cam, 0.7, (g) => { sky3(g, -500, -500, 2100, 2000, "#1a1a2a", "#2a2a3a", "#3a3a4a"); brickWall(g, -500, 600, 2100, 900, "#5a5a62", 4); g.fillStyle = "#3a3a44"; g.fillRect(-500, 1500, 2100, 1000); });
      layer(g, cam, 1, (g) => {
        if (!ab) { guillotineSil(g, 540, 1500, 420, "#0a0a12"); if (t > tF - 0.1) { rect(g, 760, 820, 260, 260, "#fff6e6", 7, 14); rect(g, 760, 820, 260, 70, "#c0392b", 7, 14); strokeText(g, "SEPT", 890, 856, 40, { fill: "#fff", lw: 0, shadow: false }); strokeText(g, "1977", 890, 990, 64, { font: "Cinzel", fill: "#1c1422", lw: 0, shadow: false }); } }
        else { rect(g, 240, 1200, 600, 300, "#6b4024", 7, 6); guy(g, { tunic: "#1f1a24", trim: "#c0262e", hair: "#5a3b2a", robe: true }, { x: 540, y: 1260, h: 420, expr: "stern", armR: [2.2, -1.2 + (t > tY ? 1.0 : 0)], blink: blinkAt(t, 1), t, shadow: false }); line(g, [[660, 980 + (t > tY ? 60 : 0)], [760, 920 + (t > tY ? 60 : 0)]], 14, "#6b4024"); }
      });
      label(g, "JUST 4 MONTHS LATER", 540, 330, 70, t, tF, tL - 0.05);
      label(g, "THE LAST GUILLOTINE", 540, 330, 70, t, tL, tMa - 0.05, { fill: "#cfe0ff" });
      label(g, "MARSEILLE", 540, 330, 96, t, tMa, tA - 0.2, { font: "Cinzel" });
      stamp(g, "ABOLISHED · 1981", 540, 330, 96, t, tY - 0.1, 999);
    }, { type: "black", d: 0.4 });
    ev(tF, "whoosh", 0.4); ev(tL, "drone"); ev(tY, "clank", 0.7);
  }
}
