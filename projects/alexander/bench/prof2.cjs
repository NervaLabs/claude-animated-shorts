const { open } = require('../tools/page.cjs');
(async () => {
  const { b, p } = await open('dist/test.js');
  await p.evaluate(() => window.renderFrame(5));
  await p.evaluate(() => { globalThis.__prof = []; });
  let tot = 0; for (let k = 0; k < 4; k++) tot += await p.evaluate((f) => window.renderFrame(f), 10 + k);
  console.log('total/frame', (tot / 4).toFixed(0), 'passes', (await p.evaluate(() => globalThis.__prof)).map((x) => (x / 4).toFixed(0)).join(' '));
  await b.close();
})();
