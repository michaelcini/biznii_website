/* Browser regression checks. All submissions are intercepted; no applicant data leaves. */
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))); }
const base = process.argv[2] || 'http://127.0.0.1:8089';
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'biznii-early-access-'));
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    let calls = 0, payload, mode = 'success', release;
    await page.route('https://submit-form.com/**', async route => {
      calls++;
      payload = route.request().postDataJSON();
      if (mode === 'network') return route.abort('failed');
      if (mode === 'slow') await new Promise(resolve => { release = resolve; });
      if (mode === 'invalid-json') return route.fulfill({status: 200, contentType: 'text/html', body: '<html>Challenge</html>'});
      if (mode === 'error') return route.fulfill({status: 422, contentType: 'application/json', body: '{"error":"invalid"}'});
      if (mode === 'spam') return route.fulfill({status: 403, contentType: 'application/json', body: '{"error":"Rejected by spam protection"}'});
      if (mode === 'limit') return route.fulfill({status: 429, contentType: 'application/json', body: '{}'});
      return route.fulfill({status: 200, contentType: 'application/json', body: '{}'});
    });
    await page.goto(`${base}/odoo/early-access/`);
    assert(await page.locator('#email').isEnabled(), 'shipped configuration enables registration');
    assert.equal(await page.locator('#registration-consent').isChecked(), false);
    await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
    // Force the closed configuration to verify the emergency disable gate.
    await page.route('**/odoo/early-access/config.js*', route => route.fulfill({
      contentType: 'application/javascript',
      body: 'window.BIZNII_EARLY_ACCESS={enabled:false,privacyApproved:true,formId:"test1234",privacyVersion:"2026-10-15-4"};'
    }));
    await page.reload();
    assert(await page.locator('#email').isDisabled());
    await page.locator('form').evaluate(form => form.requestSubmit());
    assert.equal(calls, 0, 'disabled configuration must not submit');
    assert(await page.locator('#registration-success').isHidden());
    // Local-only ready config, without editing the public config file.
    await page.route('**/odoo/early-access/config.js*', route => route.fulfill({
      contentType: 'application/javascript',
      body: 'window.BIZNII_EARLY_ACCESS={enabled:true,privacyApproved:true,formId:"test1234",privacyVersion:"2026-10-15"};'
    }));
    const open = async () => { await page.goto(`${base}/odoo/early-access/`); assert(await page.locator('#email').isEnabled()); };
    const fill = async (email = 'tester@example.invalid') => {
      await page.locator('#email').fill(email);
      await page.locator('#registration-consent').check();
    };
    const submit = () => page.locator('#register-button').click();
    await open();
    assert.equal(await page.locator('#registration-consent').isChecked(), false);
    for (const select of await page.locator('select').all()) assert.equal(await select.inputValue(), '');
    await fill('invalid-email'); await submit(); assert.equal(calls, 0);
    await fill(); await page.locator('#registration-consent').uncheck(); await submit(); assert.equal(calls, 0);
    await fill('  tester@example.invalid  ');
    mode = 'slow';
    await submit();
    await page.waitForFunction(() => document.querySelector('form').getAttribute('aria-busy') === 'true');
    assert(await page.locator('#register-button').isDisabled());
    await page.locator('form').evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
    await page.waitForFunction(() => document.querySelector('#register-button').textContent === 'Registering…');
    while (!release) await new Promise(resolve => setTimeout(resolve, 10));
    assert.equal(calls, 1, 'only one in-flight request');
    assert.equal(payload.email, 'tester@example.invalid');
    for (const field of ['odoo_edition','odoo_version','android_version','interest','comments']) assert.equal(payload[field], '');
    assert.equal(payload.registration_consent, 'agreed');
    assert.equal(payload.privacy_version, '2026-10-15');
    release();
    await page.locator('#registration-success').waitFor({state:'visible'});
    assert(await page.locator('form').isHidden());
    assert.equal(await page.evaluate(() => document.activeElement.id), 'registration-success');
    // Duplicate email on a new page still receives neutral success; no enumeration query.
    mode = 'success'; await open(); await fill(); await submit();
    await page.locator('#registration-success').waitFor({state:'visible'});
    // Every optional option survives JSON serialization, including blank choices.
    mode = 'error'; await open(); await fill();
    for (const select of await page.locator('select').all()) {
      const name = await select.getAttribute('name');
      const options = await select.locator('option').evaluateAll(nodes => nodes.map(n => n.value));
      for (const value of options) {
        await select.selectOption(value);
        const before = calls;
        await submit();
        await page.waitForFunction(() => document.querySelector('form').getAttribute('aria-busy') === 'false');
        assert.equal(calls, before + 1);
        assert.equal(payload[name], value);
        assert(await page.locator('#registration-success').isHidden());
      }
      await select.selectOption('');
    }
    await page.locator('#comments').evaluate(input => { input.value = 'x'.repeat(2001); });
    const before = calls; await submit(); assert.equal(calls, before, 'overlong comments rejected');
    await page.locator('#comments').fill('');
    for (const failure of ['network','invalid-json','spam','limit']) {
      mode = failure; await submit();
      await page.waitForFunction(() => document.querySelector('#registration-error').textContent.length > 0);
      assert(await page.locator('#registration-success').isHidden());
      assert(await page.locator('#register-button').isEnabled());
      assert.equal(await page.locator('#email').inputValue(), 'tester@example.invalid');
    }
    // Timeout follows the same uncertain-receipt path and re-enables retry.
    await page.clock.install(); mode = 'slow'; release = undefined; await submit();
    while (!release) await new Promise(resolve => setTimeout(resolve, 10));
    await page.clock.runFor(20001);
    await page.waitForFunction(() => document.querySelector('#registration-error').textContent.includes('could not confirm'));
    assert(await page.locator('#register-button').isEnabled());
    release(); await page.clock.resume();
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    // Keyboard and responsive checks on the shipped enabled configuration.
    await page.unroute('**/odoo/early-access/config.js*');
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${base}/odoo/early-access/`);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
    await page.locator('#menu-toggle').click();
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('#navigation a').first().click();
    assert(page.url().includes('odoo-mobile.html#workspaces'));
    await page.goto(`${base}/odoo/early-access/`);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({path:path.join(output,'mobile.png'),fullPage:true});
    for (const route of ['/','/odoo-mobile.html','/odoo-mobile-support.html','/odoo-mobile-privacy.html','/privacy.html','/odoo/terms/','/odoo/early-access/privacy/']) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route);
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(`${base}/odoo-mobile.html`);
    await page.locator('#workspace-sales').click();
    assert.equal(await page.locator('#workspace-sales').getAttribute('aria-selected'), 'true');
    await page.locator('#workspace-more').click();
    assert.equal(await page.locator('#workspace-more').getAttribute('aria-selected'), 'true');
    await page.locator('#feature-search').fill('invoice');
    assert((await page.locator('#feature-count').textContent()).length > 0);
    await page.locator('#navigation a[href="#workspaces"]').click();
    assert(page.url().endsWith('#workspaces'));
    assert.deepEqual(errors, [], 'no browser script errors');
    console.log(`PASS: disabled gate, validation, all options, consent, payload, double submission, neutral duplicates, success, HTTP/spam/quota/network/timeout errors, keyboard, responsive routes, phone tabs, search and navigation. ${calls} mocked POSTs; zero real submissions. Screenshots: ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
