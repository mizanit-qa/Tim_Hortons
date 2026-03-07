import { test, expect } from '../fixtures/baseTest.js';

test('Homepage - Tim Shop', async ({ page, app }) => {
  await app.signInExisting();
  await app.homePage.timShop();

  await expect(page).toHaveURL(/timhortonsshop|tim-shop|password/i, { timeout: 20000 });

  const heading = page.getByRole('heading', { name: /Tim Shop|TimShop - Sandbox|Come back soon/i });
  const anyText = page.getByText(/Tim Shop|TimShop - Sandbox|Come back soon/i).first();
  await expect(heading.or(anyText).first()).toBeVisible({ timeout: 20000 });
});
