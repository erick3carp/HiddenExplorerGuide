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

const accessibilityRoutes = [
  '/',
  '/explore',
  '/map',
];

/*
 * Confirm that every important route loads successfully.
 */
for (const route of coreRoutes) {
  test(`${route} loads successfully`, async ({ page }) => {
    const response = await page.goto(route, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);

    await expect(page.locator('h1')).toBeVisible({
      timeout: 30_000,
    });
  });
}

/*
 * Test each mobile route separately.
 * Waiting for the body margin confirms that the global CSS
 * has loaded before measuring the page width.
 */
for (const route of coreRoutes) {
  test(
    `${route} phone layout does not overflow the viewport`,
    async ({ page, isMobile }) => {
      test.skip(
        !isMobile,
        'This layout assertion runs only in the phone project.',
      );

      test.setTimeout(90_000);

      const response = await page.goto(route, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });

      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);

      await expect(page.locator('h1')).toBeVisible({
        timeout: 30_000,
      });

      /*
       * The global stylesheet sets the body margin to zero.
       * This prevents the test from measuring the page before
       * the stylesheet has finished applying.
       */
      await expect(page.locator('body')).toHaveCSS('margin', '0px', {
        timeout: 30_000,
      });

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(
        dimensions.scrollWidth,
        `${route} overflows: scrollWidth=${dimensions.scrollWidth}, clientWidth=${dimensions.clientWidth}`,
      ).toBeLessThanOrEqual(dimensions.clientWidth);
    },
  );
}

/*
 * Run each accessibility route as a separate test.
 * Every route receives a fresh browser page so the map does not
 * inherit state from an earlier Axe accessibility scan.
 */
for (const route of accessibilityRoutes) {
  test(
    `${route} has no automated WCAG A or AA violations`,
    async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name !== 'chromium',
        'One browser is sufficient for deterministic Axe checks.',
      );

      test.setTimeout(90_000);

      const response = await page.goto(route, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });

      expect(response).not.toBeNull();
      expect(response.status()).toBeLessThan(400);

      await expect(page.locator('h1')).toBeVisible({
        timeout: 30_000,
      });

      const results = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
        ])
        .analyze();

      expect(
        results.violations,
        `${route}: ${JSON.stringify(results.violations, null, 2)}`,
      ).toEqual([]);
    },
  );
}

/*
 * Validate the site's internal links.
 * Each starting route receives a fresh browser context to prevent
 * the map page from inheriting browser state from earlier pages.
 */
test(
  'internal links do not return errors',
  async ({ browser, request }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium',
      'One browser is sufficient for link validation.',
    );

    test.setTimeout(120_000);

    const baseURL =
      testInfo.project.use.baseURL || 'http://127.0.0.1:3100';

    const hrefs = new Set(coreRoutes);

    for (const route of ['/', '/destinations', '/map']) {
      const context = await browser.newContext({
        baseURL,
      });

      const page = await context.newPage();

      try {
        const response = await page.goto(route, {
          waitUntil: 'domcontentloaded',
          timeout: 60_000,
        });

        expect(response).not.toBeNull();
        expect(response.status()).toBeLessThan(400);

        await expect(page.locator('h1')).toBeVisible({
          timeout: 30_000,
        });

        const links = await page
          .locator('a[href]')
          .evaluateAll((anchors) =>
            anchors.map((anchor) => anchor.getAttribute('href')),
          );

        for (const href of links) {
          if (href && href.startsWith('/')) {
            hrefs.add(href);
          }
        }
      } finally {
        await context.close();
      }
    }

    for (const href of hrefs) {
      const url = new URL(href, baseURL).toString();
      const response = await request.get(url);

      expect(
        response.status(),
        `${href} returned ${response.status()}`,
      ).toBeLessThan(400);
    }
  },
);