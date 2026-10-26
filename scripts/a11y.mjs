import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const reports = [];
try {
  for (const path of ['/', '/languages', '/languages/malayalam', '/request-a-quote', '/ar', '/ar/request-a-quote', '/web-design', '/social-media-management', '/digital-solutions', '/packages', '/packages?service=social', '/contact', '/privacy-policy']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    reports.push({ path, viewport: 'desktop', violations: result.violations });
    console.log(path, result.violations.map(v => `${v.id}: ${v.nodes.length}`).join(', ') || 'PASS — no automated WCAG A/AA violations');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/request-a-quote', '/packages', '/packages?service=social', '/ar']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    reports.push({ path, viewport: 'mobile', violations: result.violations });
    console.log('Mobile', path, result.violations.map(v => `${v.id}: ${v.nodes.length}`).join(', ') || 'PASS — no automated WCAG A/AA violations');
  }
  await writeFile('artifacts/accessibility.json', JSON.stringify(reports, null, 2));
  assert.equal(reports.reduce((n, r) => n + r.violations.length, 0), 0, 'See artifacts/accessibility.json for details.');
  console.log('All automated accessibility checks passed. Manual keyboard and native-reader review remain part of launch QA.');
} finally { await browser.close(); }
