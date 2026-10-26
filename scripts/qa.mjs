import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { randomUUID, randomInt } from 'node:crypto';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const qaIp = `198.51.100.${randomInt(1, 250)}`;
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, extraHTTPHeaders: { 'X-Forwarded-For': qaIp } });
const page = await context.newPage();
const browserErrors = [];
page.on('pageerror', error => browserErrors.push(error.message));
const results = [];
function pass(label) { results.push(label); console.log('PASS:', label); }
async function goto(path) {
  const response = await page.goto(base + path, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, path);
  await page.evaluate(async () => { const images = [...document.images]; images.forEach(image => { image.loading = 'eager'; }); await Promise.all(images.map(image => image.decode().catch(() => {}))); });
}
async function noOverflow(label) {
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
  assert.ok(dimensions.width <= dimensions.viewport + 50, `${label}: ${JSON.stringify(dimensions)}`);
  pass(`${label}: no horizontal overflow`);
}
function checkWhatsApp(href, expected) {
  const url = new URL(href);
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/919167300549');
  if (expected) assert.ok(url.searchParams.get('text').includes(expected), `Missing context: ${expected}`);
}
async function noAttachmentInterface(path) {
  assert.equal(await page.locator('input[type="file"], .file-notice').count(), 0, path);
  assert.doesNotMatch(await page.locator('body').innerText(), /\bupload(?:ing|s)?\b|رفع الملفات|رفع المستندات/i, path);
}

try {
  await goto('/');
  assert.match(await page.title(), /Indian Language Translation/);
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await noOverflow('Desktop home');
  const seo = await page.evaluate(() => ({ canonical: document.querySelector('link[rel="canonical"]')?.href, og: document.querySelector('meta[property="og:image"]')?.content, fonts: document.fonts.status, brokenImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src) }));
  assert.equal(new URL(seo.canonical).origin, 'https://translatewala.com');
  assert.equal(new URL(seo.canonical).pathname, '/');
  assert.equal(seo.fonts, 'loaded');
  assert.deepEqual(seo.brokenImages, []);
  pass('Homepage metadata, fonts and optimized images');
  checkWhatsApp(await page.locator('.cinema-hero .hero-buttons a[href*="wa.me"]').getAttribute('href'), 'Translation');
  assert.equal(await page.locator('.use-case-card').count(), 6);
  assert.equal(await page.locator('.digital-teaser-card').count(), 2);
  pass('Direct homepage WhatsApp CTA and expanded service content');
  await page.getByRole('button', { name: 'Languages', exact: true }).click();
  await page.locator('#language-menu').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.locator('#language-menu').waitFor({ state: 'hidden' });
  pass('Navigation dropdown and Escape dismissal');
  await page.getByRole('tab', { name: /Saudi Arabia/ }).click();
  assert.match(await page.getByRole('tabpanel').innerText(), /Shared understanding/);
  await page.getByRole('tab', { name: /Saudi Arabia/ }).press('ArrowRight');
  assert.match(await page.getByRole('tabpanel').innerText(), /Qatar/);
  checkWhatsApp(await page.getByRole('tabpanel').locator('a').getAttribute('href'), 'Qatar');
  pass('GCC tabs, keyboard navigation and market-specific WhatsApp enquiry');
  await page.locator('summary').first().click();
  assert.equal(await page.locator('details').first().getAttribute('open'), '');
  pass('FAQ disclosure');

  await goto('/packages');
  assert.equal(await page.locator('.package-card').count(), 4);
  assert.match(await page.locator('.package-grid').innerText(), /₹7,999/);
  const webLinks = await page.locator('.package-card').evaluateAll(cards => cards.map(card => ({ name: card.querySelector('h3').textContent, href: card.querySelector('a').href })));
  for (const link of webLinks) checkWhatsApp(link.href, link.name);
  pass('Four verified website packages with contextual WhatsApp enquiries');
  await page.screenshot({ path: 'artifacts/packages-desktop.png', fullPage: true });
  await page.locator('.package-comparison summary').click();
  assert.equal(await page.locator('.comparison-scroll tbody tr').count(), 8);
  await page.locator('.comparison-scroll').waitFor({ state: 'visible' });
  pass('Working package feature comparison');
  await page.getByRole('tab', { name: /Social Media Management/ }).click();
  assert.match(page.url(), /service=social/);
  assert.equal(await page.locator('.package-card').count(), 4);
  assert.match(await page.locator('.package-grid').innerText(), /₹1,999/);
  assert.match(await page.locator('.pricing-note').innerText(), /Advertising spend is not included/);
  const socialLinks = await page.locator('.package-card').evaluateAll(cards => cards.map(card => ({ name: card.querySelector('h3').textContent, href: card.querySelector('a').href })));
  for (const link of socialLinks) checkWhatsApp(link.href, link.name);
  pass('Four social packages with organic/paid distinction and accurate messages');
  await context.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<html lang="en"><title>WhatsApp destination test</title><body>QA destination only. No message was sent.</body></html>' }));
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Discuss Basic Presence on WhatsApp', exact: true }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  checkWhatsApp(popup.url(), 'Basic Presence');
  await popup.close();
  await context.unroute('https://wa.me/**');
  pass('Package button opens the correct WhatsApp destination in a new tab');
  await page.getByRole('tab', { name: /Social Media Management/ }).press('ArrowLeft');
  assert.equal(await page.getByRole('tab', { name: /Website Design/ }).getAttribute('aria-selected'), 'true');
  await goto('/packages?service=social');
  assert.equal(await page.getByRole('tab', { name: /Social Media Management/ }).getAttribute('aria-selected'), 'true');
  pass('Package category keyboard controls and direct social-package URL');

  await goto('/languages');
  await page.getByRole('searchbox').fill('Malayalam');
  assert.equal(await page.locator('.language-card').count(), 1);
  await page.getByRole('searchbox').fill('not-a-language');
  checkWhatsApp(await page.locator('.empty-state a').getAttribute('href'), 'not-a-language');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  assert.equal(await page.locator('.language-card').count(), 11);
  await page.getByRole('button', { name: 'Arabic & English', exact: true }).click();
  assert.equal(await page.locator('.language-card').count(), 2);
  pass('Language search, filters and direct WhatsApp empty-state enquiry');

  await goto('/request-a-quote?target=Malayalam&country=United%20Arab%20Emirates');
  checkWhatsApp(await page.locator('.quote-page-heading .hero-buttons a[href*="wa.me"]').getAttribute('href'));
  assert.equal(await page.locator('#targetLanguage').inputValue(), 'Malayalam');
  assert.equal(await page.locator('#country').inputValue(), 'United Arab Emirates');
  await noAttachmentInterface('English brief');
  await page.getByRole('button', { name: 'Prepare WhatsApp Brief', exact: true }).click();
  assert.ok(await page.locator('.field-error').count() >= 4);
  pass('Direct chat bypass, optional brief prefill and required-field validation');
  await page.locator('#name').fill('QA Test Customer');
  await page.locator('#email').fill(`qa-browser-${Date.now()}@example.com`);
  await page.locator('#sourceLanguage').selectOption('English');
  await page.locator('#description').fill('QA TEST ONLY. English to Malayalam customer information for the UAE. Delete this synthetic test record.');
  await page.locator('#consent').check();
  await page.getByRole('button', { name: 'Prepare WhatsApp Brief', exact: true }).click();
  await page.locator('.quote-success').waitFor({ state: 'visible', timeout: 20000 });
  const reference = await page.locator('.quote-reference').innerText();
  assert.match(reference, /^TW-\d{4}-[A-F0-9]{8}$/);
  assert.match(await page.locator('.quote-success').innerText(), /No message has been sent automatically/);
  checkWhatsApp(await page.getByRole('link', { name: 'Continue on WhatsApp', exact: true }).getAttribute('href'), reference);
  assert.ok((await page.getByRole('link', { name: 'Email instead' }).getAttribute('href')).startsWith('mailto:support@translatewala.in'));
  await page.screenshot({ path: 'artifacts/quote-success.png', fullPage: true });
  pass(`Real saved brief and explicit WhatsApp handoff: ${reference}`);
  await page.getByRole('button', { name: 'Prepare another brief' }).click();
  await page.getByRole('button', { name: 'Web Design', exact: true }).click();
  assert.equal(await page.locator('#sourceLanguage').count(), 0);
  assert.match(await page.locator('#description').getAttribute('placeholder'), /pages and features/);
  pass('Service switching updates relevant brief fields');

  const testBody = { name: 'QA API Customer', email: `qa-api-${Date.now()}@example.com`, company: '', service: 'Translation', sourceLanguage: 'English', targetLanguage: 'Hindi', country: 'Qatar', deadline: '', description: 'QA TEST ONLY. A sample business brief used for API validation. Delete this test record.', consent: true, website: '', requestKey: randomUUID(), locale: 'en' };
  const headers = { 'Content-Type': 'application/json', Origin: base, 'X-Forwarded-For': qaIp };
  let response = await fetch(base + '/api/inquiries', { method: 'POST', headers, body: JSON.stringify({ ...testBody, consent: false }) });
  assert.equal(response.status, 400); pass('Server enforces consent independently');
  response = await fetch(base + '/api/inquiries', { method: 'POST', headers, body: JSON.stringify(testBody) });
  assert.equal(response.status, 201); const first = await response.json();
  response = await fetch(base + '/api/inquiries', { method: 'POST', headers, body: JSON.stringify(testBody) });
  assert.equal(response.status, 200); const duplicate = await response.json(); assert.equal(first.reference, duplicate.reference);
  pass('Database write and idempotent API retry');
  response = await fetch(base + '/api/inquiries', { method: 'POST', headers: { ...headers, Origin: 'https://unrelated.example' }, body: JSON.stringify(testBody) });
  assert.equal(response.status, 403); pass('Cross-origin submission rejected');
  response = await fetch(base + '/api/inquiries', { method: 'POST', headers, body: JSON.stringify({ ...testBody, requestKey: randomUUID(), website: 'spam' }) });
  assert.equal(response.status, 400); pass('Honeypot submission rejected');
  response = await fetch(base + '/api/inquiries', { method: 'POST', headers, body: JSON.stringify({ ...testBody, requestKey: randomUUID(), description: 'a'.repeat(25000) }) });
  assert.equal(response.status, 400); pass('Oversized inquiry rejected');

  await goto('/ar');
  assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  assert.equal(await page.locator('html').getAttribute('lang'), 'ar');
  checkWhatsApp(await page.locator('.home-hero .hero-buttons a[href*="wa.me"]').getAttribute('href'), 'الترجمة');
  await noAttachmentInterface('Arabic home');
  await noOverflow('Arabic desktop');
  await page.screenshot({ path: 'artifacts/arabic-desktop.png', fullPage: true });
  await goto('/ar/request-a-quote?target=Tamil');
  assert.equal(await page.locator('#targetLanguage').inputValue(), 'Tamil');
  await page.getByRole('button', { name: 'تجهيز الطلب لواتساب', exact: true }).click();
  assert.ok(await page.locator('.field-error').count() >= 4);
  await noAttachmentInterface('Arabic brief');
  pass('Arabic RTL, direct WhatsApp and localized brief validation');

  const paths = ['/translation-services', '/indian-language-translation', '/arabic-translation', '/gcc-business-translation', '/industries', '/digital-solutions', '/packages', '/web-design', '/social-media-management', '/about', '/contact', '/privacy-policy', '/terms-and-conditions', ...['malayalam', 'tamil', 'hindi', 'telugu', 'kannada', 'bengali', 'urdu', 'punjabi', 'marathi'].map(language => `/languages/${language}`)];
  const titles = new Set();
  for (const path of paths) { await goto(path); assert.equal(await page.locator('h1').count(), 1, path); const title = await page.title(); assert.ok(!titles.has(title), `Duplicate title on ${path}`); titles.add(title); await noAttachmentInterface(path); }
  pass(`${paths.length} content routes: HTTP 200, unique titles, one H1 and no attachment interface`);
  response = await fetch(base + '/sitemap.xml'); assert.equal(response.status, 200); assert.equal(((await response.text()).match(/<loc>/g) || []).length, 36);
  response = await fetch(base + '/robots.txt'); assert.match(await response.text(), /https:\/\/translatewala.com\/sitemap.xml/);
  response = await fetch(base + '/opengraph-image'); assert.equal(response.status, 200); assert.match(response.headers.get('content-type'), /image\/png/);
  response = await fetch(base + '/this-page-does-not-exist'); assert.equal(response.status, 404);
  pass('27-page sitemap, robots, social image and custom 404');

  await page.setViewportSize({ width: 390, height: 844 });
  await goto('/'); await noOverflow('Mobile home');
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('button', { name: 'Digital', exact: true }).click();
  await page.locator('#digital-menu').getByRole('link', { name: /Website design/ }).click();
  await page.waitForURL('**/web-design');
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('.package-card').count(), 4);
  await noOverflow('Mobile website service');
  await page.screenshot({ path: 'artifacts/web-design-mobile.png', fullPage: true });
  pass('Mobile navigation and detailed service packages');
  await goto('/packages?service=social'); await noOverflow('Mobile packages');
  await page.locator('.package-comparison summary').click();
  await noOverflow('Mobile expanded comparison');
  await page.screenshot({ path: 'artifacts/packages-mobile.png', fullPage: true });
  await goto('/request-a-quote'); await noOverflow('Mobile brief');
  await page.screenshot({ path: 'artifacts/quote-mobile.png', fullPage: true });
  await goto('/ar'); await noOverflow('Arabic mobile');
  await page.screenshot({ path: 'artifacts/arabic-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 768, height: 1024 });
  await goto('/'); await noOverflow('Tablet home');
  await goto('/packages'); await noOverflow('Tablet packages');
  assert.deepEqual(browserErrors, []); pass('No browser JavaScript errors');
  console.log(`\n${results.length} checks passed. QA network identifier: ${qaIp}. Remove the synthetic qa-* @example.com records after verification.`);
} finally { await browser.close(); }
