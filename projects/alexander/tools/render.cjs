// Parallel frame renderer: N browsers, each renders a contiguous frame range, streams JPEG frames into its own
// ffmpeg (H.264 segment). Segments are concatenated; audio is muxed if given.
// node tools/render.cjs --bundle dist/bundle.js --from 0 --to 7254 --workers 4 --out out/video.mp4 [--audio out/mix.wav] [--scale 1]
const { open } = require('./page.cjs');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const bundle = arg('bundle', 'dist/bundle.js'), out = arg('out', 'out/video.mp4'), audio = arg('audio', null);
const workers = +arg('workers', 4), md5 = arg('md5', null);
const crypto = require('crypto'); const sums = {};
(async () => {
  const total = await (async () => { const { b, p } = await open(bundle); const t = await p.evaluate(() => window.TOTAL ?? 0); await b.close(); return t; })();
  const from = +arg('from', 0), to = +arg('to', total || 60);
  const tmp = path.join(path.dirname(out), 'seg_' + path.basename(out, '.mp4')); fs.mkdirSync(tmp, { recursive: true });
  const n = to - from, chunk = Math.ceil(n / workers), t0 = Date.now();
  let done = 0;
  const job = async (w) => {
    const a = from + w * chunk, z = Math.min(to, a + chunk); if (a >= z) return null;
    const seg = path.join(tmp, `seg_${String(w).padStart(2, '0')}.mp4`);
    const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', '30', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', '30', seg], { stdio: ['pipe', 'inherit', 'inherit'] });
    const { b, p } = await open(bundle);
    for (let f = a; f < z; f++) {
      const d = await p.evaluate(async (f) => { await window.renderFrame(f); return window.grab(); }, f);
      const buf = Buffer.from(d.slice(d.indexOf(',') + 1), 'base64');
      if (md5) sums[f] = crypto.createHash('md5').update(buf).digest('hex');
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      done++;
      if (done % 100 === 0) { const s = (Date.now() - t0) / 1000; console.log(`${done}/${n} frames, ${(done / s).toFixed(2)} fps, eta ${((n - done) / (done / s) / 60).toFixed(1)} min`); }
    }
    await b.close();
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
    return seg;
  };
  const segs = (await Promise.all([...Array(workers).keys()].map(job))).filter(Boolean);
  if (md5) fs.writeFileSync(md5, Object.keys(sums).sort((a, b) => a - b).map((k) => `${k} ${sums[k]}`).join('\n'));
  const list = path.join(tmp, 'list.txt'); fs.writeFileSync(list, segs.map((s) => `file '${path.resolve(s)}'`).join('\n'));
  const vid = audio ? path.join(tmp, 'video_only.mp4') : out;
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', vid]);
  if (audio) execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', vid, '-i', audio, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', out]);
  console.log(`wrote ${out}: ${n} frames in ${((Date.now() - t0) / 60000).toFixed(1)} min`);
})();
