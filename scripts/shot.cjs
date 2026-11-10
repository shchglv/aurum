// Скриншот области: прокрутка к селектору и снимок вьюпорта.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const [url, selector, out, widthArg] = process.argv.slice(2);
const W = Number(widthArg || 1280);
const H = 900;
const PORT = 9503 + Math.floor(Math.random() * 20);

function findChrome() {
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const dir = fs.readdirSync(cache).find((d) => d.startsWith('chromium_headless_shell-'));
  const walk = (p) => {
    for (const e of fs.readdirSync(p)) {
      const full = path.join(p, e);
      if (fs.statSync(full).isDirectory()) { const r = walk(full); if (r) return r; }
      else if (e === 'chrome-headless-shell') return full;
    }
    return null;
  };
  return dir ? walk(path.join(cache, dir)) : null;
}

const chrome = spawn(findChrome(), ['--headless', '--no-sandbox', '--disable-gpu',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${os.tmpdir()}/shot-${PORT}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let tabs;
  for (let i = 0; i < 40; i++) {
    try { tabs = await (await fetch(`http://localhost:${PORT}/json`)).json(); if (tabs.length) break; } catch {}
    await sleep(250);
  }
  const page = tabs.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res) => (ws.onopen = res));
  let id = 0; const pending = new Map();
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });

  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
  await send('Page.enable');
  await send('Page.navigate', { url });
  await sleep(2500);
  const scrolled = await send('Runtime.evaluate', { expression: `(() => {
    const target = '${selector}' === 'bottom' ? null : document.querySelector('${selector}');
    const y = target ? target.getBoundingClientRect().top + window.scrollY - 10 : document.documentElement.scrollHeight;
    window.scrollTo({ top: y, behavior: 'instant' });
    return JSON.stringify({ y: Math.round(y), scrollY: Math.round(window.scrollY), docH: document.documentElement.scrollHeight });
  })()`, returnByValue: true });
  console.log('скролл:', scrolled.result.value);
  await sleep(900);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log('сохранено:', out, W + 'px');
  ws.close(); chrome.kill();
  process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(2); });
