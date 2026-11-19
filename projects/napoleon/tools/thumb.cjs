// node tools/thumb.cjs -> out/thumb_{0,1}.png (1920x1080) + out/thumbnail.jpg (variant 0, 1280x720)
const { open } = require('./page.cjs'); const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  const { b, p } = await open('dist/thumb.js');
  for (const v of [0, 1]) { const d = await p.evaluate((v) => window.renderThumb(v), v); fs.writeFileSync(`out/thumb_${v}.png`, Buffer.from(d.split(',')[1], 'base64')); }
  await b.close();
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', 'out/thumb_0.png', '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', 'out/thumbnail.jpg']);
  console.log('thumbs done');
})();
