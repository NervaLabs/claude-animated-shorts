// Contact sheets: first / middle / last frame of every shot (or --shots id,id), 3 columns per row, 8 shots per sheet.
// node tools/stills.cjs [--shots a,b] [--out out/stills]
const { open } = require('./page.cjs'); const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
(async () => {
  const outDir = arg('out', 'out/stills'); fs.mkdirSync(outDir, { recursive: true });
  const { b, p } = await open('dist/bundle.js');
  const sheet = await p.evaluate(() => window.cueSheet());
  const want = arg('shots', null)?.split(',');
  const shots = sheet.shots.filter((s) => !want || want.includes(s.id));
  const files = [];
  for (const s of shots) {
    for (const [k, f] of [['a', s.a + 1], ['m', Math.floor((s.a + s.b) / 2)], ['z', s.b - 2]]) {
      await p.evaluate((f) => window.renderFrame(f), f);
      const d = await p.evaluate(() => window.E.out.toDataURL('image/jpeg', 0.85));
      const fn = path.join(outDir, `${String(s.a).padStart(5, '0')}_${s.id}_${k}.jpg`); fs.writeFileSync(fn, Buffer.from(d.split(',')[1], 'base64')); files.push(fn);
    }
  }
  await b.close();
  fs.writeFileSync(path.join(outDir, 'list.json'), JSON.stringify(files));
  execFileSync('python3', [path.join(__dirname, 'sheet.py'), path.join(outDir, 'list.json'), outDir]);
  console.log('stills', files.length);
})();
