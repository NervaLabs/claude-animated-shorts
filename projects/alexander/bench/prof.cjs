const { open } = require('../tools/page.cjs');
(async () => {
  const { b, p } = await open('dist/test.js');
  const run = async (label, setup) => {
    await p.evaluate(setup);
    const ts = []; for (let k = 0; k < 4; k++) ts.push(await p.evaluate((f) => window.renderFrame(f), 10 + k));
    const g0 = Date.now(); await p.evaluate(() => window.grab()); const g = Date.now() - g0;
    console.log(label.padEnd(14), ts.slice(1).map((t) => t.toFixed(0)).join(' '), 'grab', g);
  };
  await run('full', () => {});
  await run('noshadow', () => { window.E.r.shadowMap.enabled = false; });
  await run('noglow', () => { window.E.post.glow.u.uPx.value.set(0, 0); const r = window.E.post; r._g = r.glow; });
  await b.close();
})();
