// Проверка, что счётчик Яндекс.Метрики реально грузится и отправляет хит.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const URL_TO_CHECK = process.argv[2] || 'http://88.218.60.165:8080/';
const PORT = 9477;

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
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${os.tmpdir()}/cdp-ym-${PORT}`, 'about:blank'], { stdio: 'ignore' });
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

  let id = 0; const pending = new Map(); const hits = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
    if (m.method === 'Network.requestWillBeSent') {
      const u = m.params.request.url;
      if (/yandex/.test(u)) hits.push(u);
    }
  };
  const send = (method, params = {}) => new Promise((res) => {
    const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params }));
  });

  await send('Network.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: URL_TO_CHECK });
  await sleep(12000);

  const state = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      ym: typeof window.ym,
      queue: window.ym && window.ym.a ? window.ym.a.length : null,
      counters: window.Ya && window.Ya._metrika ? Object.keys(window.Ya._metrika.counters || {}) : null
    })`,
    returnByValue: true,
  });

  console.log('страница:', URL_TO_CHECK);
  console.log('состояние ym:', state.result.value);
  console.log('запросы к mc.yandex.ru:', hits.length);
  for (const h of [...new Set(hits)]) console.log('  ', h.slice(0, 160));
  const tag = hits.some((h) => h.includes('/metrika/tag.js'));
  const ymHosts = [...new Set(hits.map((h) => new URL(h).host))];
  console.log('хосты:', ymHosts.join(', '));
  const watch = hits.some((h) => h.includes('/watch/114154654') || h.includes('watch/114154654'));
  console.log('tag.js загружен:', tag);
  console.log('хит отправлен:', watch);
  ws.close(); chrome.kill();
  process.exit(tag && watch ? 0 : 1);
})().catch((e) => { console.error('ERROR:', e.message); chrome.kill(); process.exit(2); });
