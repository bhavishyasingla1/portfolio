// Minimal headless-Chrome driver over the DevTools protocol (no dependencies).
// Usage: node shot.mjs spec.json   — spec: { out, steps: [...] }
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const spec = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const OUT = spec.out;
mkdirSync(OUT, { recursive: true });
const PORT = spec.port || 9333 + Math.floor(Math.random() * 500);
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'shot-'))}`,
    '--hide-scrollbars',
    '--no-first-run',
    '--autoplay-policy=no-user-gesture-required',
    '--window-size=1440,900',
    'about:blank'
  ],
  { stdio: 'ignore' }
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    target = list.find((t) => t.type === 'page');
    if (target) break;
  } catch {}
  await sleep(200);
}
if (!target) throw new Error('Chrome did not start');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const waiters = [];
const logs = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) {
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type))
      logs.push(`[console.${msg.params.type}] ${msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')}`.slice(0, 300));
    if (msg.method === 'Runtime.exceptionThrown') logs.push(`[exception] ${msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text}`.slice(0, 300));
    if (msg.method === 'Network.loadingFailed' && !msg.params.canceled) logs.push(`[net-fail] ${msg.params.errorText} ${msg.params.type}`);
    if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) logs.push(`[http ${msg.params.response.status}] ${msg.params.response.url}`.slice(0, 200));
    for (let i = waiters.length - 1; i >= 0; i--) if (waiters[i].method === msg.method) waiters.splice(i, 1)[0].resolve(msg.params);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method, timeout = 30000) =>
  Promise.race([new Promise((resolve) => waiters.push({ method, resolve })), sleep(timeout)]);
const evaluate = async (js) => {
  const r = await send('Runtime.evaluate', { expression: `(async()=>{${js}})()`, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval failed');
  return r.result.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Network.enable');

let vp = { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false };
const results = {};
try {
  for (const s of spec.steps) {
    if (s.do === 'viewport') {
      vp = { ...vp, ...s, do: undefined };
      delete vp.do;
      await send('Emulation.setDeviceMetricsOverride', vp);
      if (vp.mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    } else if (s.do === 'media') {
      await send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'prefers-color-scheme', value: s.scheme || 'light' },
          { name: 'prefers-reduced-motion', value: s.motion || 'no-preference' }
        ]
      });
    } else if (s.do === 'goto') {
      const loaded = once('Page.loadEventFired', s.timeout || 30000);
      await send('Page.navigate', { url: s.url });
      await loaded;
      await sleep(s.wait ?? 1500);
    } else if (s.do === 'wait') {
      await sleep(s.ms);
    } else if (s.do === 'eval') {
      const v = await evaluate(s.js);
      if (s.as) results[s.as] = v;
      if (s.log) console.log(s.as || 'eval', JSON.stringify(v, null, 1));
    } else if (s.do === 'scrollThrough') {
      // trigger lazy images and scroll reveals, then come back
      await evaluate(`const h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=Math.round(innerHeight*0.7)){scrollTo(0,y);await new Promise(r=>setTimeout(r,${s.step || 180}))}scrollTo(0,${s.end ?? 0});await new Promise(r=>setTimeout(r,400))`);
    } else if (s.do === 'key') {
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: s.key, code: s.code || s.key, windowsVirtualKeyCode: s.vk || 0 });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: s.key, code: s.code || s.key, windowsVirtualKeyCode: s.vk || 0 });
    } else if (s.do === 'shot') {
      const params = { format: s.format || 'png', captureBeyondViewport: true };
      if (s.selector) {
        const r = await evaluate(
          `const e=document.querySelector(${JSON.stringify(s.selector)});if(!e)return null;e.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,${s.settle ?? 500}));const b=e.getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,width:b.width,height:b.height}`
        );
        if (!r) {
          console.log(`! selector not found: ${s.selector}`);
          continue;
        }
        const pad = s.pad || 0;
        params.clip = { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: r.width + pad * 2, height: r.height + pad * 2, scale: 1 };
      } else if (s.full) {
        const m = await evaluate(`return {w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight}`);
        params.clip = { x: 0, y: 0, width: m.w, height: Math.min(m.h, s.maxHeight || 12000), scale: 1 };
      } else if (s.clip) {
        params.clip = { ...s.clip, scale: 1 };
      } else {
        params.captureBeyondViewport = false;
      }
      const { data } = await send('Page.captureScreenshot', params);
      writeFileSync(join(OUT, `${s.name}.png`), Buffer.from(data, 'base64'));
      console.log(`✓ ${s.name}.png`);
    }
  }
} finally {
  if (logs.length && spec.logs !== false) console.log([...new Set(logs)].slice(0, 25).join('\n'));
  if (Object.keys(results).length) writeFileSync(join(OUT, 'results.json'), JSON.stringify(results, null, 1));
  ws.close();
  chrome.kill();
}
