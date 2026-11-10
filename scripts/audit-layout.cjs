// Аудит вёрстки: горизонтальные переполнения, вылезание за экран, наложения на фиксированную шапку.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const BASE = process.argv[2] || 'http://127.0.0.1:8100';
const PAGES = (process.argv[3] || '/,/usdt,/p2p,/perevody,/kripto,/birzhi,/servisy,/virtual-card,/faq,/uz,/ky,/tg,/uz/crypto-wallet,/ky/buy-usdt').split(',');
const WIDTHS = (process.argv[4] || '390,768,1024,1440').split(',').map(Number);
const PORT = 9501;

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
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${os.tmpdir()}/audit-${PORT}`, 'about:blank'], { stdio: 'ignore' });
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

  const expr = `(() => {
    const vw = window.innerWidth;
    const skip = /ticker|marquee|orbit|glow|hero-shadow|hero-phone|cta-glow/;
    const issues = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
      if (skip.test(el.className || '') || skip.test(el.parentElement ? (el.parentElement.className || '') : '')) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 2 || r.left < -2) {
        issues.push({ kind: 'outside', tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
      }
      if (el.children.length === 0 && el.textContent.trim() && el.scrollWidth > el.clientWidth + 4 && cs.overflow !== 'visible') {
        issues.push({ kind: 'clipped-text', tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 40), scrollW: el.scrollWidth, clientW: el.clientWidth });
      }
    }
    // наложения: элементы, залезающие под фиксированную шапку
    const header = document.querySelector('.site-header');
    const hh = header ? header.getBoundingClientRect().height : 0;
    const main = document.querySelector('main');
    const mainTop = main ? main.getBoundingClientRect().top : 0;
    return JSON.stringify({ vw, scroll: document.documentElement.scrollWidth, headerH: Math.round(hh), mainTop: Math.round(mainTop), issues: issues.slice(0, 12) });
  })()`;

  const report = [];
  for (const w of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 700 });
    for (const p of PAGES) {
      await send('Page.navigate', { url: BASE + p });
      await sleep(1200);
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      const d = JSON.parse(r.result.value);
      const overflow = d.scroll > d.vw + 1;
      if (overflow || d.issues.length || d.mainTop < d.headerH - 2) {
        report.push({ width: w, page: p, overflow, scroll: d.scroll, vw: d.vw, headerH: d.headerH, mainTop: d.mainTop, issues: d.issues });
      }
    }
  }
  const lines = [];
  for (const r of report) {
    const head = `${r.width}px ${r.page} overflow=${r.overflow} ${r.scroll}/${r.vw}`;
    const problems = r.issues.filter((i, idx, arr) => arr.findIndex((x) => x.kind === i.kind && x.cls === i.cls) === idx)
      .map((i) => `${i.kind}:${i.tag}.${i.cls || '-'}@${i.left !== undefined ? i.left + '..' + i.right : i.scrollW + '/' + i.clientW}`);
    lines.push(head + (problems.length ? ' | ' + problems.join(' ; ') : ''));
  }
  console.log(lines.join('\n') || 'замечаний нет');
  ws.close(); chrome.kill();
  process.exit(0);
})().catch((e) => { console.error('ERR', e.message); chrome.kill(); process.exit(2); });
