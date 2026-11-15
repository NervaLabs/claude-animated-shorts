// The 23 shots of "Alexander the Great: The Boy Who Conquered an Empire". One block per narration sentence.
"use strict";
const GROUND = "#7aa04e";
let TMP = null;
/** draw fn into a temp screen-sized canvas, tint it flat, then composite (ghosts, shadows) */
function tinted(g, fn, col, alpha, xf) {
  if (!TMP) TMP = mkCanvas(W, H);
  const t = TMP.getContext("2d");
  t.setTransform(1, 0, 0, 1, 0, 0); t.clearRect(0, 0, W, H);
  t.save(); fn(t); t.restore();
  t.globalCompositeOperation = "source-in"; t.fillStyle = col; t.fillRect(0, 0, W, H); t.globalCompositeOperation = "source-over";
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = alpha; if (xf) xf(g); g.drawImage(TMP, 0, 0); g.restore();
}
/** current transform of g, to replay world drawing on the temp canvas */
const replay = (g) => { const m = g.getTransform(); return (t) => t.setTransform(m); };
const night = (k) => (g) => { g.globalCompositeOperation = "multiply"; g.fillStyle = `rgba(70,80,170,${k})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
const warm = (k) => (g) => { g.globalCompositeOperation = "soft-light"; g.fillStyle = `rgba(255,170,90,${k})`; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over"; };
const sky3 = (g, x, y, w, h, a, b, c) => { g.fillStyle = vgrad(g, y, y + h, [[0, a], [0.6, b], [1, c]]); g.fillRect(x, y, w, h); };
function sunGlow(g, x, y, r, col = "255,214,150") {
  g.fillStyle = rgrad(g, x, y, 0, r * 5, [[0, `rgba(${col},0.95)`], [0.2, `rgba(${col},0.45)`], [1, `rgba(${col},0)`]]);
  g.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);
  ell(g, x, y, r, r, "#fff2cf", 0);
}
function ground(g, y, col = GROUND, x0 = -1500, x1 = 2600, lw = 6) {
  g.fillStyle = vgrad(g, y, y + 900, [[0, col], [1, shade(col, 0.78)]]); g.fillRect(x0, y, x1 - x0, 2400);
  line(g, [[x0, y], [x1, y]], lw * 0.6, "rgba(28,20,34,0.55)");
  paintGrain(g, x0, y, x1 - x0, 1600, 0.1);
}
function grassTufts(g, x0, x1, y0, y1, n, seed, col = "#5f8a3a") {
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, rnd(seed + i)), y = lerp(y0, y1, rnd(seed * 2 + i)), s = 8 + (y - y0) * 0.02; line(g, [[x - s, y], [x - s * 0.3, y - s * 1.6], [x, y], [x + s * 0.4, y - s * 1.8], [x + s, y]], 3, col); }
}
function clouds(g, t, y, n, seed, col = "#fff7ec", sc = 1, x0 = -600, x1 = 1700) {
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, rnd(seed + i)) + t * 8 * (1 + rnd(i)), yy = y + rnd(seed * 4 + i) * 260, s = (90 + rnd(seed * 9 + i) * 90) * sc;
    g.save(); g.globalAlpha = 0.92;
    smoothPath(g, [[x - s * 1.6, yy], [x - s * 1.1, yy - s * 0.55], [x - s * 0.3, yy - s * 0.9], [x + s * 0.6, yy - s * 0.7], [x + s * 1.5, yy - s * 0.2], [x + s * 1.7, yy]]);
    fillInk(g, col, 4);
    g.restore();
  }
}
function crowdHeads(g, x0, x1, y, rows, seed, sc = 1) {
  const cols = ["#b8262f", "#3e78c2", "#d9a441", "#6a9a45", "#7b5ac9", "#efe6d2", "#c98b4b"];
  for (let r = 0; r < rows; r++) for (let x = x0 + (r % 2) * 22; x < x1; x += 44 * sc) {
    const yy = y + r * 46 * sc, k = rnd(seed + x * 0.1 + r);
    ell(g, x, yy + 18 * sc, 20 * sc, 22 * sc, cols[Math.floor(k * cols.length)], 3);
    ell(g, x, yy - 8 * sc, 15 * sc, 14 * sc, SKIN, 3);
  }
}
function rain(g, t, a = 0.5) {
  g.save(); g.globalAlpha = a; g.strokeStyle = "#d9e8ff"; g.lineWidth = 3;
  for (let i = 0; i < 140; i++) { const x = (rnd(i) * 1.2 * W + t * 300) % (W * 1.2) - 60, y = (rnd(i * 3) * H + t * 2400 * (0.8 + rnd(i * 7) * 0.4)) % (H + 200) - 100; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 18, y + 70); g.stroke(); }
  g.restore();
}

function buildShots() {
  // ======================= SCENE 1 — INTRODUCTION =======================
  { // 0: hook — the boy and the giant he will become
    const t0 = 0, tC = wt(0, "conquer"), tA = wt(0, "thirty");
    const bg = cached("hook", -500, -300, 2080, 2600, (g) => {
      sky3(g, -500, -300, 2080, 1800, "#283a86", "#d98a86", "#ffd49a");
      sunGlow(g, 540, 1230, 70);
      smoothHills(g, -500, 1580, 1300, 220, "#7f6aa6", 1, 0);
      smoothHills(g, -500, 1580, 1380, 170, "#9a6f95", 3, 0);
      for (let i = 0; i < 26; i++) { const x = 140 + i * 32, h = 30 + rnd(i) * 50; rect(g, x, 1390 - h, 26, h, i % 3 ? "#b7869a" : "#c89aa3", 0); }
      smoothHills(g, -500, 1580, 1560, 160, "#5f8a45", 7, 6);
      paintGrain(g, -500, -300, 2080, 2600, 0.08);
    }, 1.4);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1390, 1.7, 0], [tC - 0.15, 540, 1370, 1.75, 0], [tC + 0.9, 540, 1020, 1.0, -2], [tA, 540, 1000, 1.02, -2]]);
      layer(g, cam, 0.85, (g) => { bg(g); clouds(g, t, 150, 5, 2, "#ffe2cf"); });
      // the ghost of the conqueror rises in the sky
      const k = ss((t - tC + 0.1) / 0.9);
      if (k > 0) layer(g, cam, 0.9, (g) => {
        const set = replay(g);
        tinted(g, (tt) => { set(tt); guy(tt, OUT.alexHelm, { x: 540, y: 1520 + (1 - k) * 200, h: 1150, expr: "determined", armR: [2.6, 0.3], hold: { r: "spear" }, spearAng: -1.5, t, shadow: false }); }, "#ffd88a", 0.45 * k);
      });
      layer(g, cam, 1, (g) => {
        g.save(); g.globalAlpha = 0.3; ell(g, 540, 1525, 140, 18, "#1a1030", 0); g.restore();
        guy(g, OUT.boy, { x: 540, y: 1520, h: 330, expr: t > tC ? "determined" : "neutral", look: t > tC ? 0 : -0.4, headTilt: t > tC ? -6 : 0, blink: blinkAt(t, 3), t, armL: [-0.2, 0.1], armR: [0.25, 0.1] });
        burst(g, 540, 1220, 260, (t - tC) / 0.7, "#fff1b8", 14);
      });
      stamp(g, "BEFORE AGE 33", 540, 330, 104, t, tA - 0.05, E(0) + 0.3, { rot: -3 });
    });
    ev(tC, "whoosh"); ev(tC + 0.1, "choir"); ev(tA, "boom");
  }
  { // 1: Macedonia, 356 BC, a prince is born
    const t0 = S(1) - 0.12, t356 = wt(1, "356"), tMac = wt(1, "Macedonia"), tPr = wt(1, "prince"), tBorn = wt(1, "born");
    const bg = cached("pella", -1300, -1500, 3680, 4300, (g) => {
      sky3(g, -1300, -1500, 3680, 2900, "#3f78c8", "#9cc2ea", "#e9e2c8");
      // Mt Olympus with snow
      poly(g, [[-1300, 1180], [-700, 640], [-520, 720], [-300, 520], [-60, 760], [260, 1180]], "#8d8bbd", 6, false);
      poly(g, [[-760, 700], [-700, 640], [-520, 720], [-300, 520], [-180, 640], [-300, 610], [-420, 700], [-560, 760], [-700, 720]], "#f4f6ff", 4, false);
      smoothHills(g, -1300, 2400, 1200, 260, "#9aa6c8", 2, 0);
      smoothHills(g, -1300, 2400, 1290, 160, "#7fa36a", 5, 6);
      // river plain
      ground(g, 1330, "#86ad57");
      smoothPath(g, [[-1300, 1560], [-300, 1500], [400, 1620], [1200, 1540], [2400, 1640], [2400, 1700], [1200, 1600], [400, 1690], [-300, 1560], [-1300, 1620]]); fillInk(g, "#69aedb", 5);
      // city of Pella: houses on the hill
      smoothPath(g, [[-500, 1400], [0, 1260], [540, 1180], [1080, 1260], [1580, 1400], [1580, 1460], [-500, 1460]]); fillInk(g, "#9fbe6b", 6);
      for (let i = 0; i < 46; i++) {
        const x = -380 + rnd(i) * 1840, y = 1300 + rnd(i * 2) * 120 + Math.abs(x - 540) * 0.08, w = 50 + rnd(i * 3) * 40, h = 36 + rnd(i * 5) * 30;
        if (Math.abs(x - 540) < 330 && y < 1330) continue;
        rect(g, x, y - h, w, h, ["#efe2c4", "#e6cfa6", "#f3e9d6"][i % 3], 4);
        poly(g, [[x - 6, y - h], [x + w / 2, y - h - 20], [x + w + 6, y - h]], ["#c95b3c", "#b9532f", "#d06a45"][i % 3], 4);
        rect(g, x + w * 0.35, y - h * 0.55, w * 0.25, h * 0.55, "#5a3b2a", 2);
      }
      for (let i = 0; i < 14; i++) cypress(g, -300 + i * 140 + rnd(i) * 60, 1420 + rnd(i * 4) * 60, 120 + rnd(i) * 60, "#3b6a42", 4);
      // palace
      rect(g, 140, 1200, 800, 60, "#d9cbb0", 6);
      rect(g, 180, 1170, 720, 40, "#e8dcc4", 6);
      temple(g, 540, 1170, 600, 190, 8, "#f1e8d6", "#c95b3c", 6);
      paintGrain(g, -1300, -900, 3680, 3200, 0.07);
    }, 1.2);
    const near = cached("pellaNear", 260, 980, 560, 300, (g) => { temple(g, 540, 1170, 600, 190, 8, "#f1e8d6", "#c95b3c", 3); }, 4);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 400, 0.62, 0], [tMac - t0 + 0.3, 540, 1000, 0.62, 0], [tPr - t0 - 0.1, 540, 1060, 0.7, 0], [tPr - t0 + 0.8, 540, 1150, 2.6, 2], [9, 540, 1150, 2.75, 2]], 0.004);
      layer(g, cam, 1, (g) => {
        bg(g); if (cam.z > 1.6) near(g);
        clouds(g, t, -500, 7, 5, "#fffaf0", 1.2, -1200, 2300);
        for (const [x, c] of [[300, "#b8262f"], [780, "#b8262f"]]) banner(g, x, 1015, 50, 90, c, t, true, 3);
        // royal family on the temple porch
        const up = ss((t - tBorn + 0.4) / 0.5);
        guy(g, { ...OUT.philip, cape: "#3b1f52" }, { x: 505, y: 1172, h: 92, expr: up > 0.5 ? "laugh" : "happy", blink: blinkAt(t, 5), armR: [lerp(0.6, 2.9, up), 0.1], armL: [lerp(-0.6, -2.9, up), -0.1], t });
        guy(g, { tunic: "#2f6f9a", trim: "#d4a632", hair: "#5a2e1a", robe: true, lady: true, bob: true }, { x: 585, y: 1172, h: 86, expr: "happy", blink: blinkAt(t, 9), t });
        const by = 1172 - 92 * lerp(0.62, 1.08, up);
        ell(g, 512, by, 9, 6, "#f6f3ea", 1.6); ell(g, 518, by - 1, 4, 4, SKIN, 1.2);
        sparkle(g, 512 + 18, by - 14, 10, (t - tBorn) / 0.8); sparkle(g, 512 - 16, by - 4, 7, (t - tBorn - 0.2) / 0.8);
        burst(g, 512, by, 60, (t - tBorn) / 0.8, "#fff1b8", 12);
      });
      stamp(g, "356 BC", 540, 330, 150, t, t356 - 0.05, E(1) + 0.2);
      label(g, "MACEDONIA", 540, 470, 70, t, tMac, E(1) + 0.2, { font: "Cinzel", spacing: 10 });
    }, { type: "flash", d: 0.22 });
    ev(t0, "whoosh"); ev(t356, "boom"); ev(tBorn, "sparkle"); ev(tBorn, "cheer", 0.5);
  }
  // ======================= SCENE 2 — CHILDHOOD =======================
  { // 2: Philip II drills the phalanx
    const t0 = S(2) - 0.12, tK = wt(2, "King"), tM = wt(2, "military"), tP = wt(2, "powerhouse");
    const bg = cached("drill", -700, -200, 2500, 2400, (g) => {
      sky3(g, -700, -200, 2500, 1500, "#4a83d2", "#a9cbee", "#e7ecdc");
      smoothHills(g, -700, 1800, 1150, 240, "#93a2c9", 9, 0);
      smoothHills(g, -700, 1800, 1220, 150, "#8fae6c", 4, 6);
      ground(g, 1240, "#c7b07a");
      for (let i = 0; i < 9; i++) tree(g, -600 + i * 300 + rnd(i) * 80, 1230, 150 + rnd(i) * 40, "#5d8c45", 4, i);
      paintGrain(g, -700, -200, 2500, 2400, 0.07);
    }, 1.3);
    const BG_BLUR = cached("drillB", -700, -200, 2500, 2400, (g) => bg(g), 0.8, 6);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 420, 1200, 1.25, 0], [tM - t0 - 0.2, 470, 1180, 1.28, 0], [tM - t0 + 0.6, 760, 1180, 1.1, 0], [8, 780, 1180, 1.12, 0]]);
      layer(g, cam, 0.6, (g) => { BG_BLUR(g); clouds(g, t, 0, 5, 7); });
      layer(g, cam, 0.9, (g) => {
        // phalanx, marching in step, sarissas forward at the stomp
        const step = (t * 2) % 1, dn = t > tP - 0.1 ? 1 : 0;
        for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) {
          const x = 480 + c * 110 + r * 30 + ((t * 30) % 110) * 0, y = 1340 + r * 60, h = 190 + r * 18;
          guy(g, OUT.soldier, { x, y, h, expr: dn ? "shout" : "determined", walk: (t * 1.6 + r * 0) % 1, armR: [1.3, -0.3], armL: [0.6, 0.6], hold: { r: "sarissa", l: "shield" }, spearAng: lerp(-1.45, -0.45, ss((t - tP + 0.1) / 0.3)), blink: blinkAt(t, r * 9 + c), t });
          if (dn) dust(g, x, y, 40, (t - tP) * 1.4, r * 9 + c);
        }
        void step;
      });
      layer(g, cam, 1.15, (g) => {
        guy(g, OUT.philip, { x: 250, y: 1830, h: 640, expr: t > tP - 0.1 ? "shout" : "determined", armR: t > tM ? [1.9, -0.1] : [0.3, 0.3], blink: blinkAt(t, 2), t, mouthOpen: t > tP - 0.1 ? 1 : 0 });
      });
      label(g, "KING PHILIP II", 540, 340, 82, t, tK, E(2) + 0.2, { font: "Cinzel", spacing: 6 });
    }, { type: "whip", d: 0.3 });
    ev(t0, "whoosh"); ev(tK, "pop"); ev(tP, "stomp"); KICKS.push({ t: tP, a: 18 });
    for (let k = 0; k < 10; k++) ev(t0 + 0.25 + k * 0.62, "march", 0.4);
  }
  { // 3: Bucephalus, scared of its own shadow
    const t0 = S(3) - 0.12, tW = wt(3, "wild"), tN = wt(3, "nobody"), tT = wt(3, "turning"), tS = wt(3, "scared"), tSh = wt(3, "shadow");
    const bg = cached("meadow", -700, -200, 2500, 2400, (g) => {
      sky3(g, -700, -200, 2500, 1600, "#5a7fd0", "#f0b48a", "#ffe1a8");
      smoothHills(g, -700, 1800, 1250, 200, "#a487b0", 2, 0);
      smoothHills(g, -700, 1800, 1310, 120, "#8eaa62", 6, 6);
      ground(g, 1330, "#9cbb5c");
      grassTufts(g, -700, 1800, 1400, 2000, 160, 3);
      paintGrain(g, -700, -200, 2500, 2400, 0.07);
    }, 1.3);
    shot(t0, (g, t, lt) => {
      const turn = ss((t - tT - 0.25) / 0.35); // 0 = facing right (away from the sun), 1 = facing the sun
      const rid = ss((t - tS + 0.2) / 0.5);
      const cam = camAt(lt, [[0, 600, 1300, 1.0, 0], [tN - t0, 640, 1320, 1.05, 0], [tN - t0 + 0.6, 760, 1380, 1.25, 3], [tT - t0, 700, 1360, 1.15, 0], [tS - t0 + 0.4, 600, 1260, 1.2, -2], [9, 600, 1250, 1.24, -2]]);
      layer(g, cam, 0.7, (g) => { bg(g); sunGlow(g, -80, 1120, 90, "255,206,140"); });
      layer(g, cam, 1, (g) => {
        const hx = 640, hy = 1600, rear = (1 - turn) * (t > tW - 0.2 ? 0.3 + 0.18 * Math.sin(t * 7) : 0.12 + 0.06 * Math.sin(t * 5));
        const dir = turn < 0.5 ? 1 : -1, squash = Math.abs(Math.cos(turn * Math.PI));
        // long evening shadow, always pointing away from the sun (to the right)
        const set = replay(g);
        tinted(g, (tt) => { set(tt); tt.translate(hx, hy); tt.transform(1, 0, -1.6, 0.32, 0, 0); tt.translate(-hx, -hy); horse(tt, { x: hx, y: hy, h: 380, rear, dir, t, shadow: false }); }, "#2c2246", 0.42);
        // grooms giving up
        const run = clamp((t - tN) / 2.5);
        guy(g, OUT.builder, { x: 980 + run * 260, y: 1700, h: 300, expr: "scared", walk: t * 2.4, dir: 1, lean: 8, t, blink: 0 });
        guy(g, { ...OUT.builder, tunic: "#7d8f4a" }, { x: 210 - run * 40, y: 1720, h: 300, expr: t > tT ? "shock" : "scared", lean: -6, armL: [-2.4, 0], armR: [2.4, 0], t, blink: blinkAt(t, 4) });
        // the horse, turning toward the sun
        g.save(); g.translate(hx, 0); g.scale(Math.max(0.08, squash), 1); g.translate(-hx, 0);
        const hs = horse(g, { x: hx, y: hy, h: 380, rear, dir, t, eye: turn < 0.6 ? "shock" : null, calm: turn > 0.6, bridle: true });
        g.restore();
        if (rid > 0) guy(g, OUT.boy, { x: hs.saddle[0] + 6, y: hs.saddle[1] + 110 - (1 - rid) * 60, h: 300, sit: true, dir: -1, expr: "proud", armR: [1.6, -0.2], blink: blinkAt(t, 3), t, shadow: false });
        else {
          const bx = lerp(250, 430, ss((t - tT + 0.6) / 0.6));
          guy(g, OUT.boy, { x: bx, y: 1640, h: 320, expr: t > tT ? "determined" : "neutral", walk: t > tT - 0.6 && t < tT ? t * 2 : null, armR: t > tT - 0.1 ? [2.1, -0.4] : [0.2, 0.2], blink: blinkAt(t, 3), t });
        }
        if (t < tT + 0.3 && t > tW) { g.save(); g.globalAlpha = 0.9; strokeText(g, "!", 860 + 30 * dir, 1060, 120, { fill: "#ffe08a" }); g.restore(); }
      });
      label(g, "BUCEPHALUS", 540, 340, 82, t, tW, tT, { font: "Cinzel", spacing: 6 });
      if (t > tS - 0.1) { // tiny insert: the horse vs. its shadow
        const k = ss((t - tS + 0.1) / 0.25) * (1 - ss((t - E(3)) / 0.2));
        g.save(); g.globalAlpha = k; rect(g, 300, 220, 480, 300, "#fff6e0", 7, 30);
        g.save(); g.beginPath(); g.roundRect(306, 226, 468, 288, 26); g.clip();
        g.fillStyle = "#e9d7b0"; g.fillRect(300, 380, 480, 140);
        horse(g, { x: 420, y: 470, h: 160, rear: 0.3, eye: "shock", t, dir: 1 });
        g.save(); g.translate(560, 470); g.transform(1, 0, -1.2, 0.36, 0, 0); g.globalAlpha = 0.85; horse(g, { x: 60, y: 0, h: 260, t, col: "#1a1030", mane: "#1a1030", shadow: false }); g.restore();
        g.restore();
        g.restore();
      }
    });
    ev(tW, "neigh"); ev(tN, "scramble"); ev(tT, "whoosh", 0.5); ev(tS - 0.1, "pop"); ev(tSh, "boing", 0.6);
    KICKS.push({ t: tW, a: 10 });
  }
  { // 4: Philip hires Aristotle
    const t0 = S(4) - 0.12, tH = wt(4, "hires"), tA = wt(4, "Aristotle");
    const bg = cached("hall", -500, -200, 2080, 2400, (g) => {
      g.fillStyle = vgrad(g, -200, 1500, [[0, "#6d4a5e"], [1, "#c59a7a"]]); g.fillRect(-500, -200, 2080, 1700);
      for (let i = 0; i < 6; i++) column(g, -200 + i * 300, 1440, 90, 1100, "#efe0c4", 6);
      for (let i = 0; i < 5; i++) { poly(g, [[-150 + i * 300 + 40, 200], [-150 + i * 300 + 260, 200], [-150 + i * 300 + 230, 1300], [-150 + i * 300 + 70, 1300]], "#9a2a33", 5, true); sunStar(g, -150 + i * 300 + 150, 520, 60, "#f2c443"); }
      g.fillStyle = vgrad(g, 1440, 2200, [[0, "#b98a62"], [1, "#7a5238"]]); g.fillRect(-500, 1440, 2080, 800);
      for (let i = -10; i < 30; i++) line(g, [[i * 90, 1440], [540 + (i * 90 - 540) * 2.2, 2200]], 3, "rgba(40,20,20,0.35)");
      for (let j = 0; j < 8; j++) line(g, [[-500, 1440 + j * j * 14], [1580, 1440 + j * j * 14]], 3, "rgba(40,20,20,0.35)");
      line(g, [[-500, 1440], [1580, 1440]], 6);
      paintGrain(g, -500, -200, 2080, 2400, 0.08);
    }, 1.2, 5);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.05, 0], [tA - t0 - 0.15, 560, 1240, 1.12, 0], [tA - t0 + 0.4, 720, 1150, 1.45, 3], [6, 730, 1150, 1.5, 3]]);
      layer(g, cam, 0.7, bg);
      layer(g, cam, 1, (g) => {
        const ax = lerp(1250, 760, ss((t - t0 - 0.2) / 1.6));
        guy(g, OUT.philip, { x: 330, y: 1720, h: 560, expr: "happy", armR: [t > tH ? 1.5 : 0.4, -0.2], hold: { r: "bag" }, blink: blinkAt(t, 2), t });
        guy(g, OUT.aristotle, { x: ax, y: 1720, h: 560, dir: -1, expr: t > tA ? "proud" : "neutral", walk: ax > 770 ? t * 1.8 : null, hold: { r: "scroll" }, armR: [0.9, -0.6], blink: blinkAt(t, 7), t });
        for (let i = 0; i < 6; i++) sparkle(g, 760 + Math.cos(i * 1.1) * 220, 1200 + Math.sin(i * 1.7) * 200, 22, (t - tA - i * 0.08) / 0.7);
      });
      stamp(g, "ARISTOTLE", 540, 360, 120, t, tA - 0.05, E(4) + 0.25, { plate: "#2a1b3a" });
    }, { type: "xfade", d: 0.25 }, warm(0.25));
    ev(tH, "coins"); ev(tA, "choir"); ev(tA, "boom", 0.6);
  }
  { // 5: lessons at Mieza
    const t0 = S(5) - 0.12, ws = ["Philosophy", "mathematics", "medicine", "lead"].map((w) => wt(5, w));
    const bg = cached("mieza", -500, -200, 2080, 2400, (g) => {
      sky3(g, -500, -200, 2080, 1700, "#5a92da", "#b7d6f0", "#e9f0dc");
      smoothHills(g, -500, 1580, 1200, 200, "#9ab0d0", 1, 0);
      ground(g, 1300, "#8db45c");
      temple(g, 860, 1300, 420, 230, 4, "#efe6d2", "#c95b3c", 6);
      for (let i = 0; i < 5; i++) tree(g, -380 + i * 260, 1320, 380 + rnd(i) * 80, "#5f9a48", 6, i + 3);
      grassTufts(g, -500, 1580, 1360, 2100, 120, 11);
      paintGrain(g, -500, -200, 2080, 2400, 0.07);
    }, 1.2, 4);
    const card = (g, x, y, i, k, t) => {
      if (k <= 0) return;
      g.save(); g.translate(x, y); g.scale(easeBack(k), easeBack(k)); g.rotate((i % 2 ? 2 : -2) * Math.PI / 180);
      rect(g, -200, -150, 400, 300, "#fff4dc", 7, 26);
      if (i === 0) { bubble(g, 0, -20, 250, 150, -60, 80, "#ffffff", 6); strokeText(g, "WHY?", 0, -20, 70, { font: "Cinzel", fill: "#3e78c2" }); }
      if (i === 1) { poly(g, [[-120, 70], [120, 70], [-120, -90]], "#ffe08a", 7); g.beginPath(); g.arc(30, -10, 70, 0, TAU); g.lineWidth = 6; g.strokeStyle = "#b8262f"; g.stroke(); line(g, [[-120, 40], [-90, 40], [-90, 70]], 4); }
      if (i === 2) { poly(g, [[-110, 20], [110, 20], [70, 100], [-70, 100]], "#c98b4b", 6); line(g, [[40, 30], [100, -80]], 12, "#8a5a32"); for (let j = 0; j < 5; j++) ell(g, -60 + j * 26, -40 - (j % 2) * 30, 22, 12, "#6a9a45", 4, -0.6 + j * 0.3); }
      if (i === 3) { rect(g, -150, -100, 300, 200, "#e8d6a8", 5, 10); for (let j = 0; j < 4; j++) rect(g, 60, -80 + j * 42, 40, 26, "#5b3a8c", 3, 4); for (let j = 0; j < 3; j++) rect(g, -120, -60 + j * 42, 40, 26, "#b8262f", 3, 4); line(g, [[-70, 0], [30, -30]], 10, "#b8262f"); poly(g, [[30, -50], [62, -36], [34, -8]], "#b8262f", 3); }
      g.restore();
      strokeText(g, ["PHILOSOPHY", "MATHS", "MEDICINE", "LEADERSHIP"][i], x, y + 190 * easeBack(k), 46, { fill: "#ffe08a" });
      void t;
    };
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 1.0, 0], [5, 540, 1180, 1.08, 0]]);
      layer(g, cam, 0.7, bg);
      layer(g, cam, 1, (g) => {
        rect(g, 640, 1600, 360, 50, "#d9cbb0", 6, 8); rect(g, 670, 1650, 40, 80, "#c8b898", 5); rect(g, 930, 1650, 40, 80, "#c8b898", 5);
        guy(g, OUT.aristotle, { x: 300, y: 1760, h: 560, expr: "talk", mouthOpen: talk(t), armR: [1.7 + 0.3 * Math.sin(t * 3), -0.5], hold: { l: "scroll" }, blink: blinkAt(t, 7), t });
        guy(g, { ...OUT.boy, kid: false, tunic: "#3e78c2" }, { x: 820, y: 1650, h: 470, sit: true, dir: -1, expr: t > ws[3] ? "determined" : "neutral", look: 0.6, armR: [0.8, 0.9], blink: blinkAt(t, 3), t, shadow: false });
        const ld = (x) => [x - 28, 1740]; void ld;
        for (const s of [-1, 1]) line(g, [[820 + s * 18, 1652], [820 + s * 26 - 40, 1700], [820 + s * 26 - 46, 1748]], 12);
      });
      const pos = [[290, 470], [790, 470], [290, 900], [790, 900]];
      ws.forEach((tw, i) => card(g, pos[i][0], pos[i][1], i, ss((t - tw + 0.08) / 0.22), t));
    }, { type: "xfade", d: 0.25 });
    ws.forEach((tw) => ev(tw - 0.05, "pop"));
  }
  // ======================= SCENE 3 — BECOMING KING =======================
  { // 6: 336 BC — the wedding at Aegae
    const t0 = S(6) - 0.15, t336 = wt(6, "336"), tA = wt(6, "assassinated"), tB = wt(6, "bodyguards"), tWd = wt(6, "wedding");
    const bg = cached("theatre", -600, -200, 2280, 2400, (g) => {
      sky3(g, -600, -200, 2280, 1300, "#4d86d4", "#a9cbee", "#efe6d0");
      for (let r = 0; r < 9; r++) { const y = 700 + r * 75; smoothPath(g, [[-600, y + 80], [540, y - 40], [1680, y + 80], [1680, y + 150], [540, y + 30], [-600, y + 150]]); fillInk(g, r % 2 ? "#e2d4b8" : "#d6c6a6", 5); }
      crowdHeads(g, -560, 1640, 690, 8, 4, 0.9);
      ground(g, 1380, "#d8c49a");
      ell(g, 540, 1650, 900, 200, "#e6d6b4", 6);
      paintGrain(g, -600, -200, 2280, 2400, 0.08);
    }, 1.2, 3);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [tA - t0 - 0.12, 560, 1260, 1.12, 0], [tA - t0 + 0.2, 560, 1600, 1.45, 5], [tB - t0 - 0.1, 600, 1600, 1.5, 5], [tB - t0 + 0.35, 300, 1450, 1.2, -3], [9, 280, 1450, 1.22, -3]]);
      layer(g, cam, 0.7, (g) => {
        bg(g);
        // garlands, sagging after the attack
        for (let i = 0; i < 4; i++) { const x0 = -400 + i * 560, sag = t > tWd ? 160 : 90; g.beginPath(); g.moveTo(x0, 620); g.quadraticCurveTo(x0 + 280, 620 + sag * 2, x0 + 560, 620); g.lineWidth = 16; g.strokeStyle = "#4f8a3f"; g.stroke(); for (let k = 1; k < 8; k++) { const u = k / 8; ell(g, x0 + 560 * u, 620 + sag * 2 * 2 * u * (1 - u), 12, 12, ["#e2453c", "#f2c443", "#f6f3ea"][k % 3], 3); } }
      });
      layer(g, cam, 1, (g) => {
        if (t < tA - 0.03) guy(g, { ...OUT.philip, tunic: "#f3efe4", trim: "#d4a632", armor: null, cape: "#f3efe4" }, { x: 600, y: 1640, h: 540, expr: "happy", armR: [2.6 + 0.2 * Math.sin(t * 8), 0], walk: (t * 0.9) % 1, blink: blinkAt(t, 2), t });
        // the crown falls and rolls
        if (t >= tA - 0.03) {
          const u = t - tA, fy = Math.min(1700, 1180 + 0.5 * 5200 * u * u), b = u > 0.32 ? Math.abs(Math.sin((u - 0.32) * 9)) * 60 * Math.exp(-(u - 0.32) * 3) : 0;
          const x = 600 + Math.max(0, u - 0.3) * 140;
          g.save(); g.translate(x, fy - b - 30); g.rotate(Math.max(0, u - 0.3) * 2.2 + 0.3); crown(g, 0, 0, 62, 50, 6); g.restore();
          g.save(); g.globalAlpha = 0.3; ell(g, x, 1705, 60, 10, "#1a1030", 0); g.restore();
        }
        const run = clamp((t - tA) / 2.6);
        guy(g, OUT.guard, { x: lerp(250, -320, run), y: 1600, h: 470, dir: t > tA ? -1 : 1, expr: t > tA ? "scared" : "sly", walk: t > tA ? t * 2.6 : null, lean: t > tA ? 8 : 0, look: 0.8, blink: blinkAt(t, 13), t });
      });
      if (t > tA - 0.03) { const k = Math.exp(-(t - tA) * 2.2); g.save(); g.fillStyle = `rgba(190,20,30,${0.55 * k})`; g.fillRect(0, 0, W, H); g.restore(); }
      stamp(g, "336 BC", 540, 330, 150, t, t336 - 0.05, tA - 0.1);
    }, { type: "xfade", d: 0.3 });
    ev(t336, "boom"); ev(tA, "sting"); ev(tA + 0.33, "clank"); ev(tA + 0.6, "clank", 0.5); ev(tA, "gasp");
    KICKS.push({ t: tA, a: 22 });
  }
  { // 7: Alexander is king, at 20
    const t0 = S(7) - 0.12, tK = wt(7, "king"), tT = wt(7, "twenty");
    const bg = cached("throne", -500, -200, 2080, 2400, (g) => {
      g.fillStyle = vgrad(g, -200, 1500, [[0, "#3a2440"], [1, "#8a5a52"]]); g.fillRect(-500, -200, 2080, 1700);
      for (let i = 0; i < 6; i++) column(g, -250 + i * 330, 1460, 100, 1200, "#d9c7a8", 6);
      rect(g, 380, 700, 320, 760, "#9a2a33", 6, 10); sunStar(g, 540, 900, 110, "#f2c443");
      g.fillStyle = vgrad(g, 1460, 2200, [[0, "#6b4a3a"], [1, "#3a2420"]]); g.fillRect(-500, 1460, 2080, 800);
      rect(g, 200, 1460, 680, 600, "#9a2a33", 6); line(g, [[-500, 1460], [1580, 1460]], 6);
      paintGrain(g, -500, -200, 2080, 2400, 0.08);
    }, 1.2, 3);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.25, 0], [tK - t0, 540, 1150, 1.3, 0], [tK - t0 + 0.3, 540, 1100, 1.15, -3], [5, 540, 1100, 1.2, -3]]);
      layer(g, cam, 0.7, (g) => { bg(g); for (const x of [-60, 1140]) { line(g, [[x, 900], [x, 1000]], 16, "#6b4024"); flame(g, x, 890, 26, t); } });
      layer(g, cam, 1, (g) => {
        burst(g, 540, 1000, 520, (t - tK) / 1.1, "#ffe08a", 16);
        const cheer = t > tK ? 1 : 0;
        for (const [x, d, s] of [[110, 1, 0], [230, 1, 1], [850, -1, 2], [970, -1, 3]]) guy(g, OUT.soldier, { x, y: 1760 + (s % 2) * 30, h: 380, dir: d, expr: cheer ? "laugh" : "neutral", armR: cheer ? [2.8 + 0.2 * Math.sin(t * 9 + s), 0] : [0.9, -0.2], hold: { r: "spear", l: "shield" }, spearAng: cheer ? -1.6 : -1.3, bob: cheer ? -Math.abs(Math.sin(t * 9 + s)) * 4 : 0, blink: blinkAt(t, 20 + s), t });
        const fall = clamp((t - tK + 0.45) / 0.4);
        guy(g, OUT.alexander, { x: 540, y: 1700, h: 620, expr: t > tK ? "proud" : "neutral", look: t < tK ? -0.4 : 0, headTilt: t < tK ? -5 : 0, crownOn: fall > 0, crownDrop: (1 - easeOut(fall)) * 700, armR: [0.3, 0.3], blink: blinkAt(t, 1), t });
      });
      stamp(g, "KING AT 20", 540, 330, 130, t, tT - 0.05, E(7) + 0.3);
    }, { type: "whip", d: 0.3 }, warm(0.3));
    ev(tK - 0.1, "clank", 0.7); ev(tK, "cheer"); ev(tT, "boom");
  }
  // ======================= SCENE 4 — PERSIA =======================
  { // 8: the plan
    const t0 = S(8) - 0.15, tI = wt(8, "invade"), tB = wt(8, "biggest");
    const bg = cached("tent", -500, -200, 2080, 2400, (g) => {
      for (let i = -6; i < 20; i++) { g.fillStyle = i % 2 ? "#e9dcc0" : "#b8262f"; g.beginPath(); g.moveTo(540 + i * 140 - 70, -200); g.lineTo(540 + i * 160, 1500); g.lineTo(540 + (i + 1) * 160, 1500); g.lineTo(540 + i * 140 + 70, -200); g.fill(); }
      paintGrain(g, -500, -200, 2080, 1700, 0.12);
      g.fillStyle = "#7a5238"; g.fillRect(-500, 1500, 2080, 900); line(g, [[-500, 1500], [1580, 1500]], 6);
    }, 1.0, 4);
    const MAPX = 540, MAPY = 820, MS = 0.27; // board: lon 18..62 → map scale
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.0, 0], [tB - t0 - 0.2, 540, 1100, 1.05, 0], [tB - t0 + 0.5, 600, 860, 1.5, 2], [8, 600, 860, 1.55, 2]]);
      layer(g, cam, 0.7, (g) => { bg(g); g.save(); g.globalAlpha = 0.35; g.fillStyle = rgrad(g, 540, 820, 0, 700, [[0, "#ffd890"], [1, "rgba(255,216,144,0)"]]); g.fillRect(-200, 0, 1500, 1800); g.restore(); });
      layer(g, cam, 1, (g) => {
        // the map board on an easel
        line(g, [[300, 1500], [380, 820]], 16, "#6b4024"); line(g, [[780, 1500], [700, 820]], 16, "#6b4024");
        rect(g, 70, 520, 940, 620, "#f3e3bb", 8, 14);
        g.save(); g.beginPath(); g.roundRect(84, 534, 912, 592, 10); g.clip();
        g.translate(MAPX, MAPY); g.scale(MS, MS); const [cx, cy] = P(38, 35); g.translate(-cx, -cy);
        mapBase(g, { lw: 10, land: "#efdcb0", sea: "#79b2cf" });
        const pulse = t > tB ? 0.55 + 0.15 * Math.sin((t - tB) * 9) : 0.45;
        g.save(); smoothPath(g, PP(EMPIRE)); g.clip(); g.fillStyle = `rgba(110,60,170,${t > tI ? pulse : 0})`; g.fillRect(-500, -500, MAPW + 1000, MAPH + 1000); g.restore();
        poly(g, PP(MACEDON), "rgba(196,40,46,0.85)", 0, true);
        waterOver(g, { lw: 10, land: "#efdcb0", sea: "#79b2cf" });
        if (t > tI) { const [x, y] = P(44, 33); strokeText(g, "PERSIAN EMPIRE", x, y, 170, { font: "Cinzel", fill: "#fff6dc", lw: 30 }); }
        const [mx, my] = P(22.3, 41.4); strokeText(g, "MACEDONIA", mx, my - 130, 110, { font: "Cinzel", fill: "#ffd3d3", lw: 22 });
        g.restore();
        guy(g, OUT.alexander, { x: 220, y: 1820, h: 600, expr: t > tB ? "determined" : "talk", mouthOpen: t < tB ? talk(t) : 0, armR: [2.25, 0.25], blink: blinkAt(t, 1), t });
        guy(g, OUT.general, { x: 900, y: 1860, h: 560, dir: -1, expr: t > tB ? "shock" : "neutral", blink: blinkAt(t, 30), t });
      });
    }, { type: "xfade", d: 0.3 });
    ev(tI, "whoosh", 0.6); ev(tB, "boom", 0.8); ev(tB, "drums");
  }
  { // 9: Issus — the charge at Darius
    const t0 = S(9) - 0.12, tIs = wt(9, "Issus"), tC = wt(9, "charges"), tD = wt(9, "Darius"), tT = wt(9, "turns"), tR = wt(9, "runs");
    const bg = cached("issus", -900, -200, 3400, 2400, (g) => {
      sky3(g, -900, -200, 3400, 1500, "#5a8fd4", "#b9d3ec", "#efe6cf");
      smoothHills(g, -900, 2500, 1150, 220, "#9a9fc4", 3, 0);
      g.fillStyle = "#6aa9cf"; g.fillRect(-900, 1100, 900, 160); // the sea at the left
      smoothHills(g, -200, 2500, 1230, 120, "#a8a76c", 8, 6);
      ground(g, 1250, "#cdb98a", -900, 2500);
      smoothPath(g, [[-900, 1420], [400, 1380], [1300, 1440], [2500, 1400], [2500, 1440], [1300, 1480], [400, 1420], [-900, 1460]]); fillInk(g, "#78b2d6", 5); // the Pinarus river
      paintGrain(g, -900, -200, 3400, 2400, 0.07);
    }, 1.0, 3);
    shot(t0, (g, t, lt) => {
      const ax = lerp(-300, 880, ss((t - tC + 0.3) / 2.2));
      const flee = ss((t - tT) / 0.35), dx = 1240 + Math.max(0, t - tT - 0.3) * 900;
      const cam = camAt(lt, [[0, 900, 1200, 0.85, 0], [tC - t0 - 0.2, 900, 1250, 0.95, 0], [tC - t0 + 0.4, 400, 1300, 1.0, -3], [tD - t0 + 0.1, 900, 1320, 1.1, 2], [tR - t0, 1250, 1320, 1.0, 0], [9, 1350, 1320, 1.0, 0]], 0.003);
      layer(g, cam, 0.6, (g) => { bg(g); clouds(g, t, 0, 5, 4, "#fffaf0", 1, -900, 2500); });
      layer(g, cam, 0.85, (g) => {
        for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { const x = 1050 + c * 110 + r * 40, y = 1300 + r * 55; guy(g, OUT.persian, { x, y, h: 150 + r * 14, dir: -1, expr: t > tT ? "scared" : "angry", hold: { r: "spear" }, armR: [1.2, -0.4], spearAng: -1.9, blink: blinkAt(t, c + r * 10), t }); }
      });
      layer(g, cam, 1, (g) => {
        // Darius' chariot
        g.save();
        const cx = t < tT ? 1240 : dx;
        const dir = flee > 0.5 ? 1 : -1;
        horse(g, { x: cx + dir * 170, y: 1660, h: 230, phase: t > tT ? t * 2.4 : null, dir, col: "#e8e2d6", mane: "#a89a7a", t, blanket: "#5b3a8c" });
        chariot(g, { x: cx, y: 1680, h: 230, dir, t, speed: t > tT ? 3 : 0 });
        guy(g, OUT.darius, { x: cx - dir * 4, y: 1600, h: 300, sit: true, dir, expr: t > tT ? "scared" : t > tD ? "shock" : "angry", armR: [1.6, 0], blink: blinkAt(t, 41), t, shadow: false });
        g.restore();
        if (t > tT) dust(g, cx - 160, 1660, 120, ((t - tT) * 1.5) % 1, 9);
        // Alexander on Bucephalus + his companions
        for (let k = 2; k >= 0; k--) {
          const x = ax - k * 230, y = 1720 + k * 26, hh = 400 - k * 30;
          const hs = horse(g, { x, y, h: hh, phase: t * 2.4 + k * 0.3, t, dir: 1 });
          guy(g, k ? OUT.soldier : OUT.alexHelm, { x: hs.saddle[0] + 8, y: hs.saddle[1] + 130 * hh / 400, h: 300 * hh / 400, sit: true, expr: "shout", armR: [2.2, -0.2], hold: { r: k ? "spear" : "sword" }, swordAng: -0.6, spearAng: -0.35, t, shadow: false });
          if (t > tC) dust(g, x - 160, y, 90, ((t * 1.7 + k * 0.33) % 1), k * 5 + Math.floor(t * 1.7));
        }
      });
      if (t > tC && t < tT + 0.6) speedLines(g, t, 22, "rgba(255,255,255,0.55)");
      stamp(g, "ISSUS · 333 BC", 540, 330, 104, t, tIs - 0.05, tD);
      if (t > tR) { g.save(); g.globalAlpha = clamp((t - tR) / 0.15); strokeText(g, "!!", 840, 760, 140, { fill: "#ffe08a" }); g.restore(); }
    }, { type: "whip", d: 0.3 });
    ev(tIs, "boom"); ev(tC, "gallop"); ev(tC, "warcry"); ev(tT, "skid"); ev(tR, "boing");
    KICKS.push({ t: tC + 0.4, a: 14 }, { t: tT, a: 12 });
  }
  { // 10: Gaugamela — a much bigger army
    const t0 = S(10) - 0.12, tG = wt(10, "Gaugamela"), tB = wt(10, "bigger");
    const bg = cached("gaug", -1400, -400, 3880, 2900, (g) => {
      sky3(g, -1400, -400, 3880, 1250, "#6e8fcb", "#d8c7a5", "#f0dcb0");
      smoothHills(g, -1400, 2480, 820, 90, "#b9a2a6", 4, 0);
      g.fillStyle = vgrad(g, 820, 2500, [[0, "#e2c993"], [1, "#b99a62"]]); g.fillRect(-1400, 820, 3880, 1700);
      paintGrain(g, -1400, 820, 3880, 1700, 0.12);
    }, 0.9);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1050, 2.2, 0], [tB - t0 - 0.35, 540, 1040, 2.0, 0], [tB - t0 + 0.9, 540, 1050, 0.62, 0], [8, 540, 1040, 0.6, 0]], 0.003);
      layer(g, cam, 1, (g) => {
        bg(g);
        // the Persian host in perspective
        for (let r = 15; r >= 0; r--) {
          const y = 860 + r * 34, s = 0.35 + r * 0.04;
          for (let c = 0; c < 44; c++) { const x = -1200 + c * 82 + (r % 2) * 40 + rnd(r * 50 + c) * 20; if (Math.abs(x - 540) < 120 && r > 9 && r < 14) continue; guy(g, OUT.persian, { x, y, h: 90 * s * 1.4, dir: -1, expr: "angry", hold: { r: "spear" }, spearAng: -1.7, armR: [1.2, -0.4], t, blink: 0, shadow: false }); }
        }
        for (let i = 0; i < 5; i++) elephant(g, { x: -700 + i * 520, y: 1480, h: 130, dir: -1, phase: t * 0.6 + i });
        for (let i = 0; i < 7; i++) { const x = -900 + i * 380; chariot(g, { x, y: 1560, h: 110, dir: -1, t }); horse(g, { x: x - 80, y: 1555, h: 110, dir: -1, t, col: "#e8e2d6", mane: "#a89a7a" }); line(g, [[x - 40, 1545], [x + 50, 1545]], 4, "#d6d9df"); }
        chariot(g, { x: 540, y: 1300, h: 150, dir: -1, t }); horse(g, { x: 430, y: 1295, h: 150, dir: -1, t, col: "#e8e2d6", mane: "#a89a7a", blanket: "#5b3a8c" });
        guy(g, OUT.darius, { x: 545, y: 1250, h: 190, sit: true, dir: -1, expr: "sly", armR: [2.4, 0], blink: blinkAt(t, 41), t, shadow: false });
        // the small Macedonian block
        for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) guy(g, OUT.soldier, { x: 200 + c * 80 + r * 20, y: 1780 + r * 40, h: 150, expr: "scared", hold: { r: "sarissa" }, spearAng: -1.4, armR: [1.2, -0.3], t, blink: blinkAt(t, r * 9 + c) });
      });
      stamp(g, "GAUGAMELA · 331 BC", 540, 330, 88, t, tG - 0.05, E(10) + 0.3);
    }, { type: "xfade", d: 0.3 });
    ev(tG, "boom"); ev(tB, "horns"); ev(tB, "rumble");
  }
  { // 11a: the wedge through the middle (battle map)
    const t0 = S(11) - 0.12, tP = wt(11, "punches"), tM = wt(11, "middle"), tD = wt(11, "Darius");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1000, 1.0, 0], [3, 540, 940, 1.08, 0]]);
      layer(g, cam, 1, (g) => {
        g.fillStyle = "#e9d6a8"; g.fillRect(-200, -200, 1480, 2400); paintGrain(g, -200, -200, 1480, 2400, 0.15);
        for (let i = 0; i < 20; i++) line(g, [[-200, i * 110], [1300, i * 110]], 2, "rgba(120,80,40,0.18)");
        const push = ss((t - tP) / 1.0), gap = ss((t - tP - 0.25) / 0.6) * 170;
        for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) {
          let x = -80 + c * 56, y = 760 + r * 56;
          const d = x - 540; if (Math.abs(d) < 260) x += Math.sign(d || 1) * gap * (1 - Math.abs(d) / 260 * 0.5);
          ell(g, x, y, 22, 22, "#6b4aa0", 4); ell(g, x, y, 10, 10, "#e2b64b", 3);
        }
        // Darius token behind the line, then fleeing north
        const fl = Math.max(0, t - tD), dy = 560 - fl * fl * 900;
        ell(g, 540, dy, 34, 34, "#f2d36b", 5); crown(g, 540, dy - 6, 22, 18, 3);
        if (fl > 0) dust(g, 540, dy + 60, 50, (fl * 2) % 1, 3, "#c9b089");
        // the wedge
        const wy = lerp(1500, 860, push);
        for (let r = 0; r < 6; r++) for (let c = -r; c <= r; c++) { const x = 540 + c * 50, y = wy + r * 50; ell(g, x, y, 21, 21, "#c0392b", 4); ell(g, x, y, 9, 9, "#c9973f", 3); }
        if (t > tP) { const ay = lerp(1700, 650, ss((t - tP) / 0.9)); line(g, [[540, 1760], [540, ay]], 36, "rgba(192,57,43,0.75)"); poly(g, [[480, ay + 10], [540, ay - 80], [600, ay + 10]], "#c0392b", 5); }
      });
      strokeText(g, "DARIUS", 540 + 140, 470 - Math.max(0, t - tD) ** 2 * 900, 44, { fill: "#f2d36b" });
    }, { type: "flash", d: 0.2 });
    ev(tP, "impact"); ev(tP + 0.3, "rumble"); ev(tM, "clash");
    KICKS.push({ t: tP + 0.2, a: 14 });
    // 11b: Darius runs away, again
    shot(tD - 0.08, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.1, -4], [3, 540, 1290, 1.16, -4]]);
      layer(g, cam, 0.5, (g) => { sky3(g, -600, -400, 2300, 1800, "#6e8fcb", "#d8c7a5", "#f0dcb0"); g.fillStyle = "#d9bd85"; g.fillRect(-600, 1300, 2300, 1400); });
      speedLines(g, t * 1.5, 30, "rgba(255,250,235,0.8)");
      layer(g, cam, 1, (g) => {
        const x = 560 + Math.sin(t * 20) * 6;
        horse(g, { x: x + 190, y: 1580, h: 260, phase: t * 3.5, t, col: "#e8e2d6", mane: "#a89a7a", blanket: "#5b3a8c" });
        chariot(g, { x, y: 1600, h: 260, t, speed: 5 });
        guy(g, OUT.darius, { x: x - 4, y: 1510, h: 330, sit: true, expr: "scared", look: -1, headTilt: -8, armL: [-2.5, 0.2], armR: [2.6, -0.2], blink: 0, t, shadow: false });
        dust(g, x - 230, 1580, 150, (t * 2.2) % 1, Math.floor(t * 2.2));
        g.save(); g.translate(x - 30, 1080); strokeText(g, "AGAIN?!", 0, -40, 90, { fill: "#ffe08a" }); g.restore();
      });
    }, { type: "whip", d: 0.25 });
    ev(tD, "gallop", 0.8); ev(wt(11, "again"), "boing");
  }
  // ======================= SCENE 5 — THE EMPIRE =======================
  { // 12a: Egypt welcomes a pharaoh
    const t0 = S(12) - 0.15, tPh = wt(12, "pharaoh"), tPe = wt(12, "Persia");
    const bg = cached("egypt", -500, -200, 2080, 2400, (g) => {
      sky3(g, -500, -200, 2080, 1500, "#3f86d6", "#9fd0ee", "#fbe7b8");
      sunGlow(g, 900, 300, 80);
      for (const [x, s] of [[150, 1], [520, 1.4], [980, 0.8]]) { poly(g, [[x - 330 * s, 1260], [x, 1260 - 330 * s], [x + 330 * s, 1260]], "#e8c47a", 6); poly(g, [[x, 1260 - 330 * s], [x + 330 * s, 1260], [x + 60 * s, 1260]], "#c99a52", 0); poly(g, [[x - 330 * s, 1260], [x, 1260 - 330 * s], [x + 330 * s, 1260]], null, 6); }
      ground(g, 1260, "#ecd08e");
      smoothPath(g, [[-500, 1360], [540, 1330], [1580, 1370], [1580, 1420], [540, 1380], [-500, 1410]]); fillInk(g, "#4ea3c9", 5);
      for (let i = 0; i < 7; i++) palm(g, -420 + i * 300 + rnd(i) * 60, 1350 + rnd(i * 3) * 30, 260 + rnd(i) * 60, 5);
      paintGrain(g, -500, -200, 2080, 2400, 0.08);
    }, 1.2, 3);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [tPh - t0 - 0.1, 540, 1230, 1.08, 0], [tPh - t0 + 0.4, 540, 1180, 1.3, 0], [4, 540, 1180, 1.32, 0]]);
      layer(g, cam, 0.7, bg);
      layer(g, cam, 1, (g) => {
        const bow = ss((t - t0 - 0.3) / 0.6);
        for (const [x, d, s] of [[150, 1, 0], [300, 1, 1], [800, -1, 2], [950, -1, 3]]) guy(g, OUT.egyptian, { x, y: 1760 + (s % 2) * 20, h: 400, dir: d, expr: "happy", lean: 26 * bow, armR: [1.4, 0.3], armL: [1.2, 0.4], blink: blinkAt(t, 50 + s), t });
        guy(g, { ...OUT.alexander, helmet: "nemes", cape: "#2f5fae" }, { x: 545, y: 1720, h: 600, expr: "proud", armR: [0.4, 0.3], blink: blinkAt(t, 1), t });
        for (let i = 0; i < 6; i++) sparkle(g, 545 + Math.cos(i) * 200, 1170 + Math.sin(i * 2) * 120, 24, (t - tPh - i * 0.07) / 0.7);
      });
      stamp(g, "PHARAOH", 540, 330, 130, t, tPh - 0.05, tPe);
    }, { type: "black", d: 0.4 }, warm(0.15));
    ev(tPh, "choir"); ev(tPh, "boom", 0.6);
    // 12b: Persia falls
    shot(tPe - 0.06, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1000, 1.05, 3], [2, 540, 1000, 1.12, 3]]);
      layer(g, cam, 0.8, (g) => {
        sky3(g, -300, -300, 1700, 1800, "#6b3a4a", "#d9784a", "#f2b46a");
        for (let i = 0; i < 6; i++) { const x = -100 + i * 260; column(g, x, 1500, 80, 1000 - (i % 2) * 300, "#cdb48c", 6); if (i % 2 === 0) { ell(g, x - 50, 480, 60, 40, "#cdb48c", 5); ell(g, x + 50, 480, 60, 40, "#cdb48c", 5); } }
        g.fillStyle = "#8a6a4a"; g.fillRect(-300, 1500, 1700, 900); line(g, [[-300, 1500], [1400, 1500]], 6);
      });
      layer(g, cam, 1, (g) => {
        const u = t - tPe, a = Math.min(1.45, 0.2 + u * u * 4.5);
        g.save(); g.translate(560, 1500); g.rotate(a);
        line(g, [[0, 0], [0, -900]], 20, "#6b4024");
        poly(g, [[0, -900], [380, -880], [370, -560], [0, -580]], "#5b3a8c", 7);
        ell(g, 190, -730, 70, 40, "#f2c443", 5); poly(g, [[60, -740], [120, -770], [120, -700]], "#f2c443", 4); poly(g, [[320, -740], [260, -770], [260, -700]], "#f2c443", 4);
        g.restore();
        if (a >= 1.44) dust(g, 1100, 1500, 220, clamp((u - 0.55) * 1.6), 7, "#cdb48c");
      });
      label(g, "PERSIAN EMPIRE", 540, 340, 76, t, tPe, E(12) + 0.3, { font: "Cinzel", spacing: 4 });
    }, { type: "flash", d: 0.15 }, warm(0.2));
    ev(tPe, "creak"); ev(tPe + 0.55, "crash"); KICKS.push({ t: tPe + 0.55, a: 20 });
  }
  { // 13a: the animated map — the march to India
    const t0 = S(13) - 0.15, tC = wt(13, "Central"), tI = wt(13, "India"), tU = wt(13, "until");
    const prog = (t) => (t < tC ? lerp(0, 0.6, ss((t - t0) / (tC - t0))) : lerp(0.6, 1, ss((t - tC) / (tU - tC - 0.3))));
    shot(t0, (g, t, lt) => {
      const u = prog(t);
      const [lon, lat] = routeAt(u), [hx, hy] = P(lon, lat);
      const z = lerp(0.5, 0.56, ss((t - t0) / 3));
      const cam = { x: clamp(hx, W / 2 / z - 40, MAPW - W / 2 / z + 40), y: hy + 120, z, r: 0 };
      layer(g, cam, 1, (g) => mapFrame(g, (g) => {
        mapBase(g);
        territory(g, u);
        waterOver(g);
        empireOutline(g, 5, "rgba(122,18,26,0.35)", [20, 18]);
        routeLine(g, u, 14);
        for (const [n, ru] of [["Pella", 0], ["Issus", 0.12], ["Alexandria", 0.24], ["Gaugamela", 0.4], ["Babylon", 0.45], ["Persepolis", 0.53], ["Bactra", 0.75], ["Taxila", 0.9]]) if (u >= ru) cityDot(g, n, 60, "#fff", true, clamp((u - ru) * 30));
        // the army marker: Alexander on horseback
        const hs = horse(g, { x: hx, y: hy + 40, h: 210, phase: t * 2.2, t, dir: 1 });
        guy(g, OUT.alexHelm, { x: hs.saddle[0] + 6, y: hs.saddle[1] + 70, h: 160, sit: true, expr: "determined", armR: [2.4, 0], hold: { r: "spear" }, spearAng: -1.4, t, shadow: false });
      }));
      label(g, "CENTRAL ASIA", 540, 340, 76, t, tC, tI - 0.1, { font: "Cinzel", spacing: 4 });
      stamp(g, "INDIA · 326 BC", 540, 340, 96, t, tI - 0.05, tU + 0.2);
    }, { type: "iris", d: 0.5, x: 540, y: 900 });
    ev(t0, "whoosh"); ev(tC, "pop"); ev(tI, "boom");
    for (let k = 0; t0 + k * 0.5 < tU; k++) ev(t0 + k * 0.5, "march", 0.35);
    // 13b: the army refuses (monsoon on the Hyphasis)
    const tE = wt(13, "exhausted"), tR = wt(13, "refuses");
    const bg = cached("hyphasis", -500, -200, 2080, 2400, (g) => {
      sky3(g, -500, -200, 2080, 1500, "#4a5470", "#6f7a92", "#9aa3b2");
      smoothHills(g, -500, 1580, 1180, 160, "#5d6f7a", 2, 0);
      smoothPath(g, [[-500, 1240], [1580, 1220], [1580, 1330], [-500, 1350]]); fillInk(g, "#6d8fa8", 5);
      ground(g, 1330, "#5f7f48");
      for (let i = 0; i < 5; i++) palm(g, -400 + i * 420, 1330, 300, 5);
      paintGrain(g, -500, -200, 2080, 2400, 0.08);
    }, 1.2, 3);
    shot(tU - 0.1, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tR - tU, 540, 1290, 1.06, 0], [tR - tU + 0.4, 700, 1380, 1.3, 2], [4, 700, 1380, 1.32, 2]]);
      layer(g, cam, 0.7, bg);
      layer(g, cam, 1, (g) => {
        for (let i = 0; i < 6; i++) { const x = 380 + (i % 3) * 230 + (i > 2 ? 110 : 0), y = 1620 + (i > 2 ? 140 : 0); guy(g, { ...OUT.soldier, armor: "#9a8a6a" }, { x, y, h: 380, sit: true, expr: t > tR ? "angry" : "sick", sweat: (t * 0.6 + i * 0.3) % 1, armR: [2.0, 1.6], armL: [-1.8, -1.6], blink: blinkAt(t, i * 3), t, shadow: true }); for (const s of [-1, 1]) line(g, [[x + s * 14, y - 10], [x + s * 30 + 40, y + 20], [x + s * 30 + 50, y + 60]], 9); }
        guy(g, OUT.alexHelm, { x: 150, y: 1760, h: 580, expr: t > tR ? "shock" : "talk", mouthOpen: t < tR ? talk(t) : 0, armR: [1.9, -0.3], armL: [-1.4, 0.3], blink: blinkAt(t, 1), t });
        if (t > tR) { g.save(); g.globalAlpha = clamp((t - tR) / 0.15); bubble(g, 760, 1080, 300, 150, 700, 1300, "#fff", 6); strokeText(g, "NOPE.", 760, 1080, 70, { fill: "#b8262f", shadow: false, lw: 0 }); g.restore(); }
      });
      rain(g, t, 0.45);
    }, { type: "xfade", d: 0.3 }, night(0.25));
    ev(tU, "rain"); ev(tR, "grumble"); ev(tR + 0.1, "pop");
  }
  // ======================= SCENE 6 — ALEXANDRIA =======================
  const coast = cached("coast", -500, -200, 2080, 2400, (g) => {
    sky3(g, -500, -200, 2080, 1450, "#3f86d6", "#a8d6f2", "#f4ead0");
    g.fillStyle = vgrad(g, 1150, 1400, [[0, "#3a8fc0"], [1, "#6cc0dc"]]); g.fillRect(-500, 1150, 2080, 260);
    line(g, [[-500, 1150], [1580, 1150]], 5);
    smoothPath(g, [[1000, 1180], [1200, 1150], [1450, 1170], [1500, 1200], [1000, 1200]]); fillInk(g, "#e8d6a0", 4); // Pharos island
    ground(g, 1400, "#efd9a2");
    smoothPath(g, [[-500, 1400], [200, 1380], [800, 1410], [1580, 1390], [1580, 1440], [-500, 1440]]); fillInk(g, "#f6e6bb", 0);
    paintGrain(g, -500, -200, 2080, 2400, 0.08);
  }, 1.2);
  // the street plan, in perspective on the sand
  const plan = (g, k, eat = null) => {
    const lines = [];
    for (let i = 0; i < 7; i++) lines.push([[lerp(-150, 1230, i / 6), 1450], [lerp(-900, 1980, i / 6), 2150]]);
    for (let j = 0; j < 6; j++) { const y = 1450 + (j / 5) ** 1.6 * 700, s = (y - 1450) / 700; lines.push([[lerp(-150, -900, s), y], [lerp(1230, 1980, s), y]]); }
    lines.forEach((l, i) => {
      const u = clamp(k * lines.length - i); if (u <= 0) return;
      const e = eat ? clamp(eat * 1.6 - (i % 5) * 0.15) : 0; if (e >= 1) return;
      const b = [lerp(l[0][0], l[1][0], u), lerp(l[0][1], l[1][1], u)], a = [lerp(l[0][0], b[0], e), lerp(l[0][1], b[1], e)];
      line(g, [a, b], 14, "rgba(255,253,244,0.95)"); line(g, [a, b], 4, "rgba(214,196,150,0.8)");
    });
  };
  { // 14: barley flour instead of chalk
    const t0 = S(14) - 0.15, t331 = wt(14, "331"), tM = wt(14, "marked"), tB = wt(14, "builders"), tCh = wt(14, "chalk");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1300, 1.0, 0], [tB - t0 - 0.2, 560, 1320, 1.05, 0], [tB - t0 + 0.35, 820, 1420, 1.35, 3], [9, 830, 1420, 1.38, 3]]);
      layer(g, cam, 0.7, (g) => { coast(g); clouds(g, t, 200, 4, 21); });
      layer(g, cam, 1, (g) => {
        const k = clamp((t - tM + 0.2) / 3.4); plan(g, k);
        const ax = lerp(120, 560, k);
        guy(g, OUT.alexander, { x: ax, y: 1720, h: 560, expr: "happy", walk: k < 1 ? t * 1.4 : null, armR: [1.3, 0.2], hold: { r: "bag" }, blink: blinkAt(t, 1), t });
        if (k > 0 && k < 1) for (let i = 0; i < 6; i++) { const u = ((t * 3 + i / 6) % 1); g.beginPath(); g.arc(ax + 115 + rnd(i) * 10, 1500 + u * 220, 5, 0, TAU); g.fillStyle = "#fffdf4"; g.fill(); }
        const shake = t > tCh - 0.2 ? Math.sin(t * 30) * 0.3 : 0;
        guy(g, OUT.builder, { x: 880, y: 1780, h: 520, dir: -1, expr: t > tCh - 0.2 ? "sad" : "neutral", armR: [2.9 + shake, 0], hold: { r: "bag" }, blink: blinkAt(t, 33), t });
        if (t > tCh - 0.2) { dust(g, 830, 1240, 50, ((t - tCh) * 1.5) % 1, 2, "#f3f3f3"); g.save(); g.globalAlpha = clamp((t - tCh + 0.2) / 0.15); bubble(g, 760, 980, 210, 130, 820, 1150, "#fff", 6); strokeText(g, "...", 760, 965, 80, { fill: "#1c1422", shadow: false, lw: 0 }); g.restore(); }
      });
      stamp(g, "331 BC", 540, 330, 150, t, t331 - 0.05, tB);
      label(g, "NO CHALK", 540, 330, 86, t, tCh - 0.05, E(14) + 0.2, { fill: "#ffe08a" });
    }, { type: "xfade", d: 0.4 });
    ev(t331, "boom"); ev(tM, "pour"); ev(tCh, "sadtrombone");
  }
  { // 15: birds eat the plan → Alexandria grows
    const t0 = S(15) - 0.12, tBi = wt(15, "Birds"), tS = wt(15, "sign"), tAl = wt(15, "Alexandria"), tG = wt(15, "greatest");
    shot(t0, (g, t, lt) => {
      const grow = (d) => easeBack(clamp((t - tAl - d) / 0.45));
      const cam = camAt(lt, [[0, 540, 1350, 1.05, 0], [tAl - t0 - 0.2, 540, 1330, 1.1, 0], [tAl - t0 + 1.4, 600, 1050, 0.82, 0], [12, 600, 1040, 0.84, 0]], 0.003);
      layer(g, cam, 0.7, (g) => {
        coast(g);
        // Pharos lighthouse and city rise
        const ph = grow(0.5); if (ph > 0) {
          g.save(); g.translate(1250, 1170); g.scale(1, ph);
          rect(g, -70, -160, 140, 160, "#efe6d2", 5); rect(g, -50, -330, 100, 170, "#e6dcc4", 5); rect(g, -34, -440, 68, 110, "#efe6d2", 5); poly(g, [[-40, -440], [0, -500], [40, -440]], "#d4a632", 5);
          g.restore();
          if (ph > 0.9) { flame(g, 1250, 1170 - 480, 26, t); g.save(); g.globalAlpha = 0.25 + 0.1 * Math.sin(t * 3); g.fillStyle = rgrad(g, 1250, 690, 0, 380, [[0, "#ffe7a8"], [1, "rgba(255,231,168,0)"]]); g.fillRect(870, 310, 760, 760); g.restore(); }
        }
      });
      layer(g, cam, 1, (g) => {
        const eat = clamp((t - tBi - 0.3) / 2.0);
        if (t < tAl + 0.5) plan(g, 1, eat);
        // birds: swoop in, peck, then leave
        for (let i = 0; i < 9; i++) {
          const land = tBi - 0.1 + i * 0.08, lx = 120 + (i % 5) * 200 + rnd(i) * 60, ly = 1520 + Math.floor(i / 5) * 200 + rnd(i * 2) * 60;
          const fly = clamp((t - land) / 0.5), leave = clamp((t - tAl) / 0.6);
          if (fly <= 0) continue;
          if (leave > 0) flyBird(g, lx + leave * 500, ly - leave * 900, 34, t + i);
          else if (fly < 1) flyBird(g, lerp(lx - 600, lx, fly), lerp(ly - 900, ly, fly), 34, t + i);
          else bird(g, lx, ly, 46, t, Math.max(0, Math.sin(t * 14 + i * 2)), i % 3 ? "#f4f1ea" : "#b9b2a6");
        }
        // the city
        const B = [[-150, 1480, 300, 230, "#efe2c4"], [180, 1500, 220, 180, "#e6cfa6"], [740, 1500, 260, 200, "#f3e9d6"], [1040, 1480, 300, 240, "#e6cfa6"], [-300, 1640, 260, 200, "#e6cfa6"], [1200, 1660, 280, 210, "#efe2c4"]];
        B.forEach(([x, y, w, h, c], i) => { const k = grow(i * 0.08); if (k <= 0) return; g.save(); g.translate(x + w / 2, y); g.scale(1, k); rect(g, -w / 2, -h, w, h, c, 6); poly(g, [[-w / 2 - 10, -h], [0, -h - 50], [w / 2 + 10, -h]], "#c95b3c", 6); for (let j = 0; j < 3; j++) rect(g, -w / 2 + 30 + j * (w - 60) / 3, -h * 0.65, 30, 46, "#5a3b2a", 3); g.restore(); });
        const lk = grow(0.25); if (lk > 0) { g.save(); g.translate(540, 1560); g.scale(lk, lk); temple(g, 0, 0, 430, 210, 6, "#f4ecd8", "#3f74b8", 6); g.restore(); }
        // priests
        if (t < tAl + 0.4) for (const [x, d, s] of [[200, 1, 0], [880, -1, 1]]) guy(g, OUT.priest, { x, y: 1880, h: 520, dir: d, expr: t > tS - 0.1 ? "laugh" : "shock", armR: t > tS - 0.1 ? [2.9, 0] : [1.2, 0.3], armL: t > tS - 0.1 ? [-2.9, 0] : [-0.6, 0.3], blink: blinkAt(t, 60 + s), t });
        if (t > tS - 0.1 && t < tAl) for (let i = 0; i < 8; i++) sparkle(g, 540 + Math.cos(i * 0.8) * 380, 1300 + Math.sin(i * 1.3) * 200, 26, (t - tS - i * 0.06) / 0.8);
      });
      stamp(g, "ALEXANDRIA", 540, 330, 120, t, tAl - 0.05, E(15) + 0.4, { plate: "#2a1b3a" });
      if (t > tG) label(g, "LIBRARY · LIGHTHOUSE · HARBOUR", 540, 470, 40, t, tG, E(15) + 0.4);
    }, { type: "cut", d: 0 });
    ev(tBi, "birds"); ev(tS, "choir", 0.7); ev(tAl, "build"); ev(tAl, "boom", 0.7);
  }
  // ======================= SCENE 7 — DEATH =======================
  const room = cached("room", -500, -200, 2080, 2400, (g) => {
    g.fillStyle = vgrad(g, -200, 1500, [[0, "#3a3a6a"], [1, "#6a5a7a"]]); g.fillRect(-500, -200, 2080, 1700);
    for (let i = 0; i < 9; i++) for (let j = 0; j < 14; j++) rect(g, -480 + i * 240 + (j % 2) * 120, -180 + j * 110, 236, 106, "rgba(60,70,140,0.25)", 2);
    rect(g, 700, 300, 260, 420, "#1d2348", 7, 120); // window
    ell(g, 830, 430, 50, 50, "#f3f1dd", 0);
    g.fillStyle = vgrad(g, 1500, 2200, [[0, "#4a3a4a"], [1, "#2a2030"]]); g.fillRect(-500, 1500, 2080, 900); line(g, [[-500, 1500], [1580, 1500]], 6);
    paintGrain(g, -500, -200, 2080, 2400, 0.1);
  }, 1.2, 3);
  const bed = (g, t, expr, sweat = 0, hide = false) => {
    rect(g, 120, 1380, 840, 340, "#6b4024", 7, 14);
    rect(g, 130, 1300, 140, 380, "#6b4024", 7, 14);
    ell(g, 270, 1340, 110, 60, "#f2efe6", 6);
    if (!hide) guy(g, { ...OUT.alexander, cape: null, armor: null, tunic: "#f2efe6" }, { x: 380, y: 1520, h: 460, sit: true, expr, sweat, coldCloth: true, lean: -24, hideArms: true, blink: expr === "closed" ? 1 : blinkAt(t, 1), t, shadow: false });
    poly(g, [[250, 1420], [950, 1400], [960, 1600], [240, 1620]], "#8f1d2c", 7, true);
    line(g, [[260, 1460], [950, 1440]], 8, "#d4a632");
  };
  { // 16: Babylon, 323 BC — a fever
    const t0 = S(16) - 0.2, t323 = wt(16, "323"), tAl = wt(16, "Alexander"), tF = wt(16, "fever");
    shot(t0, (g, t, lt) => {
      const inside = t > tAl - 0.15;
      if (!inside) {
        const cam = camAt(lt, [[0, 540, 1000, 1.0, 0], [3, 540, 980, 1.1, 0]]);
        layer(g, cam, 0.7, (g) => {
          sky3(g, -300, -300, 1700, 1800, "#0e1238", "#27306a", "#4a4a80");
          for (let i = 0; i < 60; i++) { g.fillStyle = "#fff"; g.globalAlpha = 0.5 + 0.5 * rnd(i); g.fillRect(rnd(i * 3) * 1600 - 300, rnd(i * 7) * 900 - 300, 4, 4); } g.globalAlpha = 1;
          ell(g, 820, 300, 70, 70, "#f6f2d8", 0);
          poly(g, [[-200, 1300], [-100, 900], [100, 900], [200, 700], [400, 700], [500, 1300]], "#3c3a62", 6);
        });
        layer(g, cam, 1, (g) => {
          rect(g, 240, 760, 600, 760, "#2f5fae", 8, 8);
          g.save(); g.beginPath(); g.rect(240, 760, 600, 760); g.clip();
          for (let j = 0; j < 20; j++) for (let i = 0; i < 12; i++) rect(g, 230 + i * 60 + (j % 2) * 30, 760 + j * 40, 58, 38, "rgba(20,40,110,0.35)", 1.5);
          g.restore();
          for (let i = 0; i < 3; i++) { const y = 860 + i * 160; for (const x of [300, 700]) { ell(g, x + 40, y, 46, 24, "#e7c15f", 3); ell(g, x + 80, y - 18, 16, 16, "#e7c15f", 3); } }
          smoothPath(g, [[400, 1520], [400, 1080], [540, 960], [680, 1080], [680, 1520]]); fillInk(g, "#120e24", 7);
          for (const x of [-20, 1100]) rect(g, x - 160, 900, 320, 620, "#2f5fae", 8);
          g.fillStyle = "#2a2440"; g.fillRect(-400, 1520, 1900, 800); line(g, [[-400, 1520], [1500, 1520]], 6);
        });
      } else {
        const cam = camAt(t - tAl, [[0, 560, 1300, 1.05, 0], [tF - tAl, 520, 1300, 1.25, 0], [5, 470, 1280, 1.45, 0]], 0.002);
        layer(g, cam, 0.8, room);
        layer(g, cam, 1, (g) => {
          bed(g, t, "sick", (t * 0.5) % 1);
          // heat waves
          if (t > tF - 0.2) for (let i = 0; i < 3; i++) { const y = 1080 - ((t * 120 + i * 60) % 180); g.save(); g.globalAlpha = 0.6; line(g, [[330 + i * 40, y], [345 + i * 40, y - 20], [330 + i * 40, y - 40], [345 + i * 40, y - 60]], 5, "#ff7a5a"); g.restore(); }
          rect(g, 860, 1440, 140, 260, "#5a3b2a", 6, 6); line(g, [[930, 1440], [930, 1370]], 18, "#f2efe6"); flame(g, 930, 1365, 14, t);
        });
      }
      stamp(g, "BABYLON · 323 BC", 540, 330, 92, t, t323 - 0.05, tF + 0.3, { fill: "#cfe0ff" });
    }, { type: "black", d: 0.6 }, night(0.2));
    ev(t0 + 0.2, "night"); ev(t323, "boom", 0.6); ev(tF, "heartbeat");
  }
  { // 17: the candle goes out
    const t0 = S(17) - 0.15, tDe = wt(17, "dead"), t32 = wt(17, "thirty");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1150, 1.25, 0], [4, 540, 1150, 1.4, 0]]);
      const out = t > tDe;
      layer(g, cam, 0.7, (g) => { room(g); g.save(); g.globalAlpha = 0.3; bed(g, t, "closed", 0, true); g.restore(); });
      layer(g, cam, 1, (g) => {
        rect(g, 140, 1300, 800, 70, "#5a3b2a", 6, 6); rect(g, 200, 1370, 50, 500, "#4a3020", 5); rect(g, 830, 1370, 50, 500, "#4a3020", 5);
        // his helmet, set down
        g.save(); g.translate(330, 1300); g.rotate(-0.1);
        smoothPath(g, [[-90, 0], [-80, -90], [0, -130], [80, -90], [90, 0]]); fillInk(g, "#c9973f", 6);
        smoothPath(g, [[-80, -110], [-30, -210], [60, -200], [110, -130], [0, -150]]); fillInk(g, "#f3f0e6", 6);
        g.restore();
        line(g, [[700, 1300], [700, 1170]], 34, "#f2efe6"); ell(g, 700, 1300, 70, 14, "#d4a632", 5);
        if (!out) flame(g, 700, 1160, 26, t);
        else { const u = t - tDe; for (let i = 0; i < 5; i++) { g.save(); g.globalAlpha = clamp(1 - u / 2.2) * 0.6; g.beginPath(); g.arc(700 + Math.sin(u * 3 + i) * 30, 1150 - u * 160 - i * 40, 14 + i * 5, 0, TAU); g.fillStyle = "#c9c4d8"; g.fill(); g.restore(); } }
      });
      if (out) { g.save(); g.fillStyle = `rgba(6,6,24,${0.55 * ss((t - tDe) / 0.5)})`; g.fillRect(0, 0, W, H); g.restore(); }
      label(g, "356 – 323 BC", 540, 380, 84, t, t32, E(17) + 0.4, { font: "Cinzel", fill: "#e6e0f2", spacing: 6 });
    }, { type: "xfade", d: 0.5 }, night(0.3));
    ev(tDe - 0.05, "blowout"); ev(tDe + 0.1, "drone");
  }
  // ======================= SCENE 8 — LEGACY =======================
  { // 18: "to the strongest"
    const t0 = S(18) - 0.2, tSt = wt(18, "strongest"), tAs = wt(18, "Asked");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1250, 1.0, 0], [tSt - t0 - 0.1, 540, 1260, 1.12, 0], [tSt - t0 + 0.3, 540, 1180, 1.25, -3], [6, 540, 1180, 1.28, -3]]);
      layer(g, cam, 0.8, room);
      layer(g, cam, 1, (g) => {
        bed(g, t, t > tSt ? "closed" : "sick", 0);
        const C = ["#c21f2b", "#2f6f9a", "#d9a441", "#4f8a3f"];
        [[120, 1760, 1], [330, 1800, 1], [760, 1800, -1], [960, 1760, -1]].forEach(([x, y, d], i) => {
          guy(g, { ...OUT.general, crest: C[i], tunic: ["#7a1a22", "#2f5d8f", "#8a6a2a", "#3f6a3a"][i] }, { x, y, h: 480, dir: d, lean: 10, expr: t > tSt + 0.25 ? "sly" : "neutral", look: t > tSt + 0.25 ? (i % 2 ? 1 : -1) : 0.3 * d, blink: blinkAt(t, 70 + i), t });
        });
        void tAs;
      });
      stamp(g, "“TO THE STRONGEST.”", 540, 360, 74, t, tSt - 0.05, E(18) + 0.4, { fill: "#fff6dc", rot: 0 });
    }, { type: "xfade", d: 0.4 }, night(0.22));
    ev(tSt, "sting", 0.7);
  }
  // shared full-map camera (empire framed)
  const MAPCAM = (lt) => ({ x: P(46.2, 33)[0], y: P(46.2, 33)[1] + 60, z: 0.285 * (1 + 0.004 * lt), r: 0 });
  { // 19: the empire shatters into kingdoms
    const t0 = S(19) - 0.12, tF = wt(19, "fought"), tSh = wt(19, "shattered");
    shot(t0, (g, t, lt) => {
      const cam = MAPCAM(lt);
      const sep = ss((t - tSh) / 0.6), col = ss((t - tSh - 0.1) / 0.5);
      layer(g, cam, 1, (g) => mapFrame(g, (g) => {
        mapBase(g);
        KINGDOMS.forEach((k) => {
          g.save(); g.translate(k.off[0] * sep * 2, k.off[1] * sep * 2);
          pathPts(g, PP(k.poly)); g.clip();
          smoothPath(g, PP(EMPIRE)); g.save(); g.clip();
          g.fillStyle = col > 0 ? mix("#c42830", k.col, col) : "#c42830"; g.globalAlpha = 0.7; g.fillRect(-300, -300, MAPW + 600, MAPH + 600); g.restore();
          smoothPath(g, PP(EMPIRE)); g.lineWidth = 9; g.strokeStyle = "#5a0e14"; g.stroke();
          g.restore();
        });
        waterOver(g);
        // crack lines
        if (t > tF) { g.save(); g.globalAlpha = clamp((t - tF) / 0.3); for (const k of KINGDOMS.slice(1)) { pathPts(g, PP(k.poly)); g.lineWidth = 10 + 6 * sep; g.strokeStyle = "#1c1422"; g.setLineDash([40, 18]); g.stroke(); } g.restore(); }
        if (col > 0) KINGDOMS.forEach((k, i) => { const [x, y] = P(...k.lab); g.save(); g.globalAlpha = clamp(col * 3 - i * 0.4); strokeText(g, k.name, x + k.off[0] * 2, y + k.off[1] * 2, 76, { font: "Cinzel", fill: "#fff6dc", lw: 16 }); g.restore(); });
        // the generals tugging
        if (t > tF - 0.1 && t < tSh + 0.2) { const [x, y] = P(44, 33); for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU + 0.6, d = 1500 + Math.sin(t * 9 + i) * 30; guy(g, { ...OUT.general, crest: ["#c21f2b", "#2f6f9a", "#d9a441", "#4f8a3f"][i] }, { x: x + Math.cos(a) * d, y: y + Math.sin(a) * d * 0.75 + 420, h: 1000, dir: Math.cos(a) > 0 ? -1 : 1, expr: "angry", lean: -14 * Math.sign(Math.cos(a)), armR: [1.8, 0], armL: [1.6, 0.2], t, blink: 0 }); } }
      }));
      label(g, "THE SUCCESSOR KINGDOMS", 540, 340, 56, t, tSh + 0.3, E(19) + 0.3, { font: "Cinzel", spacing: 3 });
    }, { type: "xfade", d: 0.4 });
    ev(tF, "tug"); ev(tSh, "shatter"); KICKS.push({ t: tSh, a: 24 });
  }
  { // 20: Greek culture spreads Egypt → India
    const t0 = S(20) - 0.12, wl = ["language", "art", "ideas"].map((w) => wt(20, w)), tSt = wt(20, "stretched"), tEg = wt(20, "Egypt");
    shot(t0, (g, t, lt) => {
      const cam = MAPCAM(lt + 6);
      layer(g, cam, 1, (g) => mapFrame(g, (g) => {
        mapBase(g);
        KINGDOMS.forEach((k) => { g.save(); pathPts(g, PP(k.poly)); g.clip(); smoothPath(g, PP(EMPIRE)); g.clip(); g.fillStyle = k.col; g.globalAlpha = 0.45; g.fillRect(-300, -300, MAPW + 600, MAPH + 600); g.restore(); });
        waterOver(g);
        // a golden wave Egypt → India
        const u = ss((t - tEg + 0.3) / 2.2);
        if (u > 0) { g.save(); smoothPath(g, PP(EMPIRE)); g.clip(); const [x0] = P(28, 30), [x1] = P(76, 30); const xx = lerp(x0, x1, u); g.fillStyle = "rgba(255,214,110,0.38)"; g.fillRect(-300, -300, xx + 300, MAPH + 600); g.restore(); }
        // temples & theatres pop up across the map
        const sites = ["Alexandria", "Antioch", "Pergamon", "Seleucia", "Susa", "Bactra", "Ai-Khanoum", "Taxila", "Athens"];
        sites.forEach((n, i) => { const k = easeBack(clamp((t - wl[0] - i * 0.22) / 0.35)); if (k <= 0) return; const [x, y] = P(...CITIES[n]); g.save(); g.translate(x, y); g.scale(k, k); temple(g, 0, 0, 180, 110, 4, "#fff6e6", "#3f74b8", 6); g.restore(); strokeText(g, n.toUpperCase(), x, y + 70, 44, { font: "Cinzel", fill: "#fff6dc", lw: 10 }); });
        // drifting Greek letters
        "ΑΒΓΔΕΘΛΣΩ".split("").forEach((ch, i) => { const a = clamp((t - wl[0] - i * 0.15) / 0.4); if (a <= 0) return; const [x, y] = P(30 + i * 5.2, 40 - (i % 3) * 3); g.save(); g.globalAlpha = a * 0.9; strokeText(g, ch, x, y - ((t * 40 + i * 30) % 120), 120, { font: "Cinzel", fill: "#ffe08a", lw: 18 }); g.restore(); });
      }));
      ["LANGUAGE", "ART", "IDEAS"].forEach((w, i) => label(g, w, 540, 300 + i * 90, 66, t, wl[i], E(20) + 0.2, { font: "Cinzel", fill: ["#ffe08a", "#ffd0c0", "#c9e6ff"][i], spacing: 4 }));
      void tSt;
    }, { type: "xfade", d: 0.4 });
    wl.forEach((tw) => ev(tw, "pop")); ev(tEg, "choir", 0.6);
  }
  { // 21: Cleopatra still spoke Greek
    const t0 = S(21) - 0.12, tN = wt(21, "three"), tSp = wt(21, "spoke"), tC = wt(21, "Cleopatra");
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1200, 1.0, 0], [tC - t0 - 0.1, 540, 1180, 1.06, 0], [tC - t0 + 0.4, 560, 1100, 1.3, 2], [8, 560, 1100, 1.32, 2]]);
      layer(g, cam, 0.7, (g) => {
        sky3(g, -500, -300, 2080, 1800, "#4a3a7a", "#e8846a", "#ffd08a");
        sunGlow(g, 300, 1120, 80, "255,190,120");
        g.fillStyle = vgrad(g, 1150, 1450, [[0, "#d47a6a"], [1, "#6a5a8a"]]); g.fillRect(-500, 1150, 2080, 300); line(g, [[-500, 1150], [1580, 1150]], 5);
        rect(g, 1000, 680, 120, 470, "#f0d6b0", 6); rect(g, 1020, 560, 80, 120, "#f0d6b0", 6); flame(g, 1060, 550, 22, t);
        for (let i = 0; i < 4; i++) column(g, -120 + i * 380, 1460, 90, 900, "#f2e2c8", 6);
        g.fillStyle = "#e8d2a8"; g.fillRect(-500, 1460, 2080, 900); line(g, [[-500, 1460], [1580, 1460]], 6);
      });
      layer(g, cam, 1, (g) => {
        guy(g, OUT.cleo, { x: 560, y: 1760, h: 620, expr: t > tSp ? "talk" : "sly", mouthOpen: t > tSp && t < tSp + 0.9 ? talk(t) : 0, armR: [1.4, -0.3], blink: blinkAt(t, 80), t });
        if (t > tSp) { g.save(); g.globalAlpha = clamp((t - tSp) / 0.15) * (1 - ss((t - tC) / 0.3)); bubble(g, 820, 860, 380, 170, 680, 1060, "#fff", 6); strokeText(g, "Χαῖρε!", 820, 845, 76, { font: "serif", fill: "#2f5fae", shadow: false, lw: 0 }); g.restore(); }
      });
      stamp(g, "~300 YEARS LATER", 540, 330, 86, t, tN - 0.05, tC - 0.2);
      stamp(g, "CLEOPATRA", 540, 330, 130, t, tC - 0.05, E(21) + 0.3, { plate: "#2a1b3a" });
    }, { type: "xfade", d: 0.4 }, warm(0.25));
    ev(tN, "whoosh"); ev(tSp, "pop"); ev(tC, "boom");
  }
  { // 22: final — the boy who never lost a battle, before his empire
    const t0 = S(22) - 0.15, tN = wt(22, "never"), tEnd = E(22);
    shot(t0, (g, t, lt) => {
      const cam = camAt(lt, [[0, 540, 1100, 1.6, 0], [tN - t0, 540, 1150, 1.3, 0], [tEnd - t0 + 0.6, 540, 1080, 0.95, 0], [9, 540, 1060, 0.92, 0]], 0.0);
      layer(g, cam, 0.45, (g) => {
        sky3(g, -1500, -1500, 4000, 4000, "#3a2a6a", "#e8946a", "#ffd08a");
        // the giant map in the sky
        g.save(); g.translate(540, 900); g.scale(0.62, 0.62); const [cx, cy] = P(44, 34); g.translate(-cx, -cy);
        mapBase(g, { land: "#f0d39a", sea: "#4f8fbf", lw: 12 }); territory(g, 1, "rgba(200,40,46,0.6)", true); waterOver(g, { land: "#f0d39a", sea: "#4f8fbf", lw: 12 }); empireOutline(g, 14, "#7a121a");
        g.restore();
        g.save(); g.globalCompositeOperation = "soft-light"; g.fillStyle = vgrad(g, 0, 1900, [[0, "rgba(255,170,90,0.7)"], [1, "rgba(80,40,120,0.6)"]]); g.fillRect(-1000, -600, 3100, 3200); g.restore();
        g.fillStyle = vgrad(g, 1100, 1700, [[0, "rgba(40,20,50,0)"], [1, "rgba(40,20,50,0.75)"]]); g.fillRect(-1000, 1100, 3100, 1500);
      });
      layer(g, cam, 0.8, (g) => {
        g.save(); g.globalCompositeOperation = "lighter";
        for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (i - 6.5) * 0.2 + Math.sin(t * 0.5 + i) * 0.02; g.globalAlpha = 0.07 + 0.05 * Math.sin(t * 1.3 + i * 2);
          g.beginPath(); g.moveTo(540, 1250); g.lineTo(540 + Math.cos(a - 0.05) * 2200, 1250 + Math.sin(a - 0.05) * 2200); g.lineTo(540 + Math.cos(a + 0.05) * 2200, 1250 + Math.sin(a + 0.05) * 2200); g.closePath(); g.fillStyle = "#ffdca0"; g.fill(); }
        g.globalAlpha = 0.55; g.fillStyle = rgrad(g, 540, 1250, 0, 700, [[0, "rgba(255,220,150,0.8)"], [1, "rgba(255,220,150,0)"]]); g.fillRect(-300, 500, 1700, 1500);
        g.restore();
      });
      layer(g, cam, 1, (g) => {
        smoothPath(g, [[80, 2300], [140, 1790], [320, 1700], [600, 1690], [880, 1760], [1000, 2300]]); fillInk(g, "#5b4a5e", 7);
        g.save(); smoothPath(g, [[80, 2300], [140, 1790], [320, 1700], [600, 1690], [880, 1760], [1000, 2300]]); shadeSide(g, 540, 1900, 400, 0.2, 0.5); g.restore();
        guy(g, OUT.alexHelm, { x: 540, y: 1720, h: 640, expr: "determined", armR: [0.5, -0.1], armL: [-0.4, 0.2], hold: { r: "spear", l: "shield" }, spearAng: -1.48, blink: blinkAt(t, 1), t, wind: 6 + 4 * Math.sin(t * 2) });
      });
      if (t > tEnd + 0.15) {
        stamp(g, "ALEXANDER", 540, 300, 128, t, tEnd + 0.15, 999, { rot: 0, fill: "#ffe08a" });
        stamp(g, "THE GREAT", 540, 430, 96, t, tEnd + 0.45, 999, { rot: 0, fill: "#fff6dc" });
      }
    }, { type: "xfade", d: 0.5 }, warm(0.3));
    ev(tN, "choir"); ev(tEnd + 0.15, "boom"); ev(tEnd + 0.45, "boom", 0.6);
  }
}
