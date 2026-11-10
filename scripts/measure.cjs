// Измеряет переполнение и подбирает кегль hero-заголовка под ширину колонки.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const URL_TO_CHECK = process.argv[2] || 'http://127.0.0.1:8099/';
const WIDTH = Number(process.argv[3] || 390);
const HEIGHT = Number(process.argv[4] || 900);
const PORT = 9481;

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
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${os.tmpdir()}/cdp-measure-${PORT}`,
  `--window-size=${WIDTH},${HEIGHT}`, 'about:blank'], { stdio: 'ignore' });
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

  await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: WIDTH < 700 });
  await send('Page.enable');
  await send('Page.navigate', { url: URL_TO_CHECK });
  await sleep(4500);

  const expr = `(() => {
    const doc = document.documentElement;
    const vw = window.innerWidth;
    const wide = [...document.querySelectorAll('body *')]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; })
      .slice(0, 8)
      .map((el) => ({ tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 40), right: Math.round(el.getBoundingClientRect().right) }));
    const h1 = document.querySelector('.hero h1');
    const copy = document.querySelector('.hero-copy');
    let fit = null;
    if (h1 && copy) {
      const start = h1.style.fontSize;
      const out = [];
      for (let size = 96; size >= 40; size -= 2) {
        h1.style.fontSize = size + 'px';
        const lineOk = [...h1.childNodes].length > 0;
        out.push({ size, h1w: Math.round(h1.scrollWidth), copy: Math.round(copy.clientWidth), over: h1.scrollWidth > copy.clientWidth + 1 });
      }
      h1.style.fontSize = start;
      fit = out.filter((o) => !o.over).map((o) => o.size);
    }
    return JSON.stringify({ vw, scrollWidth: doc.scrollWidth, wide, fitMax: fit ? Math.max(...fit) : null }, null, 1);
  })()`;
  const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(res.result.value);
  ws.close(); chrome.kill();
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); chrome.kill(); process.exit(2); });
