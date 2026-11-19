const { open } = require('../tools/page.cjs'); const fs = require('fs');
(async () => {
  const [bundle, outp, f, setup] = process.argv.slice(2);
  const { b, p } = await open(bundle);
  if (setup) await p.evaluate(setup);
  await p.evaluate((f) => window.renderFrame(f), +f);
  const d = await p.evaluate(() => window.grab()); fs.writeFileSync(outp, Buffer.from(d.split(',')[1], 'base64'));
  await b.close();
})();
