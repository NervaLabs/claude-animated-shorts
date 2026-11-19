// Shared Playwright page launcher: one browser per worker (each gets its own GPU process / SwiftShader threads).
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
exports.open = async (bundle, W = 1920, H = 1080) => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--js-flags=--max-old-space-size=6000'] });
  const p = await b.newPage({ viewport: { width: W, height: H } });
  p.on('pageerror', (e) => console.error('pageerror', e.message));
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('page:', m.text().slice(0, 300)); });
  await p.setContent('<html><body style="margin:0;background:#000"></body></html>');
  await p.addScriptTag({ path: path.resolve(bundle), type: 'module' });
  await p.waitForFunction(() => window.ready === true, null, { timeout: 600000 });
  return { b, p };
};
