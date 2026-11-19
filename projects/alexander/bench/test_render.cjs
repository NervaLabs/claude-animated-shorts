const { open } = require('../tools/page.cjs'); const fs = require('fs');
(async () => {
  const { b, p } = await open('dist/test.js');
  for (const [f, light] of [[0, 'day'], [40, 'golden'], [41, 'night']]) {
    const ts = []; for (let k = 0; k < 3; k++) ts.push(await p.evaluate(([f, l]) => window.renderFrame(f, l), [f + k, light]));
    console.log(light, ts.map((t) => t.toFixed(0)).join(' '));
    const d = await p.evaluate(() => window.grab()); fs.writeFileSync(`out/test_${light}.jpg`, Buffer.from(d.split(',')[1], 'base64'));
  }
  await b.close();
})();
