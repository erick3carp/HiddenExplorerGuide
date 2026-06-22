const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const coreRoutes = [
  '/',
  '/explore',
  '/destinations',
  '/map',
  '/about',
  '/destination/canal-street-historic-district',
];

for (const route of coreRoutes) {
  test(`${route} loads successfully`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('phone layouts do not overflow the viewport', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This layout assertion runs in the phone project.');

  for (const route of coreRoutes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test('representative pages have no automated WCAG A or AA violations', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'One browser is sufficient for deterministic axe checks.');

  for (const route of ['/', '/explore', '/map']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations, `${route}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
  }
});

test('internal links do not return errors', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'One browser is sufficient for link validation.');

  const hrefs = new Set(coreRoutes);
  for (const route of ['/', '/destinations', '/map']) {
    await page.goto(route);
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href')),
    );

    for (const href of links) {
      if (href && href.startsWith('/')) hrefs.add(href);
    }
  }

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), `${href} returned ${response.status()}`).toBeLessThan(400);
  }
});
