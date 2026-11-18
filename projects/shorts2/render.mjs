// node render.mjs <videoDir> stills t1,t2,...  |  node render.mjs <videoDir> video [workers]
import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "fs"; import path from "path"; import { spawn } from "child_process";
const here = path.dirname(new URL(import.meta.url).pathname);
const [vdir0, mode, arg] = process.argv.slice(2);
const vdir = path.resolve(vdir0), curName = "cur-" + path.basename(vdir) + "-" + (mode === "stills" ? "s" : "v"), cur = path.join(here, "out", curName);
fs.mkdirSync(cur, { recursive: true });
fs.writeFileSync(path.join(cur, "words.js"), "window.WORDS=" + fs.readFileSync(path.join(vdir, "words.json")) + ";");
fs.copyFileSync(path.join(vdir, "scenes.js"), path.join(cur, "scenes.js"));
const outd = path.join(vdir, "out"); fs.mkdirSync(outd, { recursive: true });
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
let errs = 0;
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on("pageerror", (e) => { errs++; console.error("PAGEERR", e.message); });
  page.on("console", (m) => { if (m.type() === "error") console.error("CONSOLE", m.text()); });
  await page.goto("file://" + path.join(here, "core/index.html") + "?cur=" + curName);
  await page.evaluate(() => window.READY);
  return page;
}
const p0 = await openPage();
const info = await p0.evaluate(() => ({ e: window.EVENTS_OUT, s: window.SHOTS_OUT, d: window.DUR, mood: window.MOOD_OUT }));
fs.writeFileSync(path.join(outd, "events.json"), JSON.stringify(info));
if (mode === "stills") {
  const sd = path.join(outd, "stills"); fs.rmSync(sd, { recursive: true, force: true }); fs.mkdirSync(sd);
  const ts = arg === "auto" ? info.s.map((s, i) => +((s + (info.s[i + 1] ?? info.d)) / 2).toFixed(2)) : arg.split(",").map(Number);
  for (const t of ts) {
    const d = await p0.evaluate((t) => window.frame(t, 0.85), t);
    fs.writeFileSync(path.join(sd, `t${t.toFixed(2).padStart(6, "0")}.jpg`), Buffer.from(d.split(",")[1], "base64"));
  }
} else {
  const workers = Number(arg ?? 4), fps = 30, N = Math.round(info.d * fps), per = Math.ceil(N / workers), t0 = Date.now();
  await Promise.all([...Array(workers).keys()].map(async (w) => {
    const page = w === 0 ? p0 : await openPage();
    const a = w * per, b = Math.min(N, a + per), seg = path.join(outd, `seg${w}.mp4`);
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", "30", "-c:v", "mjpeg", "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", seg]);
    for (let f = a; f < b; f++) {
      const d = await page.evaluate((t) => window.frame(t, 0.94), f / fps);
      if (!ff.stdin.write(Buffer.from(d.split(",")[1], "base64"))) await new Promise((r) => ff.stdin.once("drain", r));
    }
    ff.stdin.end(); await new Promise((r) => ff.on("close", r));
  }));
  fs.writeFileSync(path.join(outd, "segs.txt"), [...Array(workers).keys()].map((w) => `file 'seg${w}.mp4'`).join("\n"));
  await new Promise((r) => spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(outd, "segs.txt"), "-c", "copy", path.join(outd, "video.mp4")]).on("close", r));
  for (let w = 0; w < workers; w++) fs.rmSync(path.join(outd, `seg${w}.mp4`));
  console.log("video", N, "frames", ((Date.now() - t0) / 1000).toFixed(0) + "s");
}
console.log("errors", errs);
await browser.close();
