#!/usr/bin/env node
/**
 * Lighthouse (mobile, simulated throttling) through the Node API, attached to a Chrome that you
 * start yourself. This sidesteps the CLI's launcher check that refuses to run under an x64 Node on
 * Apple Silicon.
 *
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --remote-debugging-port=9333 about:blank &
 *   node scripts/lighthouse.mjs http://localhost:3001/ review/lighthouse-mobile [9333] [simulate|devtools]
 */
import { writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';

const [
  url = 'http://localhost:3001/',
  outBase = 'review/lighthouse-mobile',
  portArg = '9333',
  throttlingMethod = 'simulate',
] = process.argv.slice(2);

const result = await lighthouse(url, {
  port: Number(portArg),
  output: ['json', 'html'],
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  logLevel: 'error',
  // 'simulate' (default, what PageSpeed Insights uses) or 'devtools' (real throttling during the trace).
  throttlingMethod,
});
if (!result) throw new Error('Lighthouse returned no result');

const [json, html] = result.report;
writeFileSync(`${outBase}.report.json`, json);
writeFileSync(`${outBase}.report.html`, html);

const { lhr } = result;
const scores = Object.fromEntries(
  Object.entries(lhr.categories).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]),
);
console.log('scores', scores);
for (const id of [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
]) {
  console.log(`  ${id.padEnd(30)} ${lhr.audits[id]?.displayValue ?? ''}`);
}
const failing = [];
for (const cat of Object.values(lhr.categories)) {
  for (const ref of cat.auditRefs) {
    const audit = lhr.audits[ref.id];
    if (
      audit?.score !== null &&
      audit?.score !== undefined &&
      audit.score < 1 &&
      ['numeric', 'binary', 'metricSavings'].includes(audit.scoreDisplayMode)
    ) {
      failing.push(
        `  [${cat.id}] ${ref.id} score=${audit.score} ${audit.displayValue ?? ''} :: ${audit.title}`,
      );
    }
  }
}
console.log(failing.length ? 'audits below 1:\n' + failing.join('\n') : 'no audits below 1');
