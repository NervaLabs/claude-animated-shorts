const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('console', m => console.log('page:', m.text())); p.on('pageerror', e => console.log('err', e));
  await p.setContent('<html><body style="margin:0"></body></html>');
  await p.addScriptTag({ path: __dirname + '/bench.js', type: 'module' });
  await p.waitForFunction(() => window.frame);
  console.log(await p.evaluate(() => { const g = document.createElement('canvas').getContext('webgl2'); const d = g.getExtension('WEBGL_debug_renderer_info'); return g.getParameter(d.UNMASKED_RENDERER_WEBGL); }));
  for (const post of [false, true]) { const ts = []; for (let f = 0; f < 6; f++) ts.push(await p.evaluate(([f, post]) => window.frame(f, post), [f, post])); console.log(post ? 'post' : 'plain', ts.map(t => t.toFixed(0)).join(' ')); }
  const t0 = Date.now(); const d = await p.evaluate(() => window.grab()); console.log('grab ms', Date.now() - t0, d.length);
  require('fs').writeFileSync(__dirname + '/bench.jpg', Buffer.from(d.split(',')[1], 'base64'));
  await b.close();
})();
