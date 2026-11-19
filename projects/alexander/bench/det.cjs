const { open } = require('../tools/page.cjs'); const fs = require('fs');
(async () => {
  const A = await open('dist/test.js');
  for (let f = 0; f <= 15; f++) await A.p.evaluate((f) => window.renderFrame(f), f);
  fs.writeFileSync('out/detA.png', Buffer.from((await A.p.evaluate(() => window.E.out.toDataURL('image/png'))).split(',')[1], 'base64'));
  await A.b.close();
  const B = await open('dist/test.js');
  await B.p.evaluate((f) => window.renderFrame(f), 15);
  fs.writeFileSync('out/detB.png', Buffer.from((await B.p.evaluate(() => window.E.out.toDataURL('image/png'))).split(',')[1], 'base64'));
  await B.b.close();
})();
