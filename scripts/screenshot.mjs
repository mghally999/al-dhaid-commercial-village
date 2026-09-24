#!/usr/bin/env node
/**
 * Full-page screenshot at an exact CSS viewport width via the Chrome DevTools Protocol.
 * No dependencies (Node 22+ has fetch + WebSocket). Used to compare sections with the Figma renders.
 *
 *   node scripts/screenshot.mjs <url> <width> <out.png> [--mobile] [--port=9222]
 *
 * With --port it attaches to a Chrome you started yourself, e.g.
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --remote-debugging-port=9222 about:blank
 * (start it from the shell on Apple Silicon so it runs natively). Without --port it spawns Chrome.
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const [url, widthArg, out] = args.filter((a) => !a.startsWith('--'));
if (!url || !widthArg || !out) {
  console.error(
    'usage: node scripts/screenshot.mjs <url> <width> <out.png> [--mobile] [--port=9222]',
  );
  process.exit(1);
}
const width = Number(widthArg);
const mobile = flags.has('--mobile');
const portFlag = [...flags].find((f) => f.startsWith('--port='));
const attached = Boolean(portFlag);
const port = attached ? Number(portFlag.split('=')[1]) : 9222 + Math.floor(Math.random() * 500);
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const proc = attached
  ? null
  : spawn(
      chrome,
      [
        '--headless=new',
        `--remote-debugging-port=${port}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu',
        '--hide-scrollbars',
        `--user-data-dir=/tmp/chrome-shot-${port}`,
        'about:blank',
      ],
      { stdio: 'ignore' },
    );

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageTarget() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error(`Chrome did not expose a page target on port ${port}`);
}

const ws = new WebSocket(await pageTarget());
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const events = new Map();
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject, method } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
    else resolve(msg.result);
  } else if (msg.method && events.has(msg.method)) {
    events.get(msg.method)();
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject, method });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) => new Promise((r) => events.set(method, r));
const evaluate = async (expression, awaitPromise = false) =>
  (await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true })).result?.value;

try {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile,
  });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await evaluate('document.fonts.ready.then(() => true)', true);
  await sleep(800);
  // Show every scroll-revealed block and freeze transitions so the capture is the final state.
  await evaluate(
    `document.querySelectorAll('[data-reveal]').forEach((e) => (e.dataset.visible = ''));
     const s = document.createElement('style');
     s.textContent = '*{transition:none!important;animation:none!important}';
     document.head.appendChild(s); true`,
  );
  const height = Math.ceil(await evaluate('document.documentElement.scrollHeight'));
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  await sleep(600);
  // Lazy images below the fold are now "in view": wait for the rendered ones (display:none images never load).
  await evaluate(
    `Promise.race([
       Promise.all([...document.images]
         .filter((i) => !i.complete && i.getClientRects().length > 0)
         .map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
       new Promise((r) => setTimeout(r, 8000)),
     ]).then(() => true)`,
    true,
  );
  await sleep(400);
  // The viewport already equals the page height, so a plain capture is the full page. (captureBeyondViewport
  // shifts RTL documents horizontally in current Chrome, so it is deliberately not used.)
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log(`${out}: ${width}x${height}`);
} finally {
  ws.close();
  proc?.kill();
}
