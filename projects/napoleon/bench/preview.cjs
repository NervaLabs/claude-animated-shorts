// node bench/preview.cjs <bundle> <out-prefix> '<json array of preview specs>'
const { open } = require('../tools/page.cjs'); const fs = require('fs');
(async () => {
  const [bundle, prefix, specs] = process.argv.slice(2);
  const { b, p } = await open(bundle);
  const list = JSON.parse(specs);
  for (let i = 0; i < list.length; i++) {
    const t0 = Date.now(); const d = await p.evaluate((o) => window.preview(o), list[i]);
    fs.writeFileSync(`${prefix}${i}.jpg`, Buffer.from(d.split(',')[1], 'base64')); console.log(`${prefix}${i}.jpg ${Date.now() - t0}ms`);
  }
  await b.close();
})();
