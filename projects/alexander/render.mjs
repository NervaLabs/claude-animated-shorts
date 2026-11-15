// node render.mjs stills <out_dir> t1,t2,...   |   node render.mjs video <out.mp4> [workers] [fps]
import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "fs"; import path from "path"; import { spawn } from "child_process";
const here = path.dirname(new URL(import.meta.url).pathname);
const words = JSON.parse(fs.readFileSync(path.join(here, "voice/words.json")));
fs.writeFileSync(path.join(here, "src/words.js"), "window.WORDS=" + JSON.stringify(words) + ";");
const [mode, out, arg3, arg4] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--disable-web-security", "--allow-file-access-from-files"] });
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on("pageerror", (e) => console.error("PAGEERR", e.message));
  page.on("console", (m) => { if (m.type() === "error") console.error("CONSOLE", m.text()); });
  await page.goto("file://" + path.join(here, "src/index.html"));
  await page.evaluate(() => window.READY);
  return page;
}
if (mode === "stills") {
  fs.mkdirSync(out, { recursive: true });
  const page = await openPage();
  const ev = await page.evaluate(() => ({ e: window.EVENTS_OUT, s: window.SHOTS_OUT, d: window.DUR }));
  fs.writeFileSync(path.join(here, "out/events.json"), JSON.stringify(ev, null, 0));
  for (const t of arg3.split(",").map(Number)) {
    const d = await page.evaluate((t) => window.frame(t, 0.85), t);
    fs.writeFileSync(path.join(out, `t${t.toFixed(2).padStart(6, "0")}.jpg`), Buffer.from(d.split(",")[1], "base64"));
  }
} else if (mode === "video") {
  const workers = Number(arg3 ?? 4), fps = Number(arg4 ?? 30);
  const p0 = await openPage();
  const info = await p0.evaluate(() => ({ e: window.EVENTS_OUT, s: window.SHOTS_OUT, d: window.DUR }));
  fs.writeFileSync(path.join(here, "out/events.json"), JSON.stringify(info));
  const N = Math.round(info.d * fps), per = Math.ceil(N / workers);
  const t0 = Date.now();
  await Promise.all([...Array(workers).keys()].map(async (w) => {
    const page = w === 0 ? p0 : await openPage();
    const a = w * per, b = Math.min(N, a + per);
    const seg = path.join(here, `out/seg${w}.mp4`);
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", seg]);
    for (let f = a; f < b; f++) {
      const d = await page.evaluate((t) => window.frame(t, 0.94), f / fps);
      if (!ff.stdin.write(Buffer.from(d.split(",")[1], "base64"))) await new Promise((r) => ff.stdin.once("drain", r));
      if (w === 0 && f % 60 === 0) console.log(`w0 ${f - a}/${b - a}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise((r) => ff.on("close", r));
  }));
  fs.writeFileSync(path.join(here, "out/segs.txt"), [...Array(workers).keys()].map((w) => `file 'seg${w}.mp4'`).join("\n"));
  await new Promise((r) => spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(here, "out/segs.txt"), "-c", "copy", out]).on("close", r));
  console.log("done", N, "frames in", ((Date.now() - t0) / 1000).toFixed(0), "s");
}
await browser.close();
