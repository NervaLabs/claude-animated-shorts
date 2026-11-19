// Writes out/cues.json (the sound cue sheet: cues, ambience spans, shots) from the built bundle.
const { open } = require('./page.cjs'); const fs = require('fs');
(async () => {
  const { b, p } = await open('dist/bundle.js');
  const sheet = await p.evaluate(() => window.cueSheet());
  await b.close();
  fs.mkdirSync('out', { recursive: true }); fs.writeFileSync('out/cues.json', JSON.stringify(sheet));
  console.log('cues', sheet.cues.length, 'total', sheet.total);
})();
