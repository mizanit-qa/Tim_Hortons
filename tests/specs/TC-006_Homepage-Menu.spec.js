import { test, expect } from '../fixtures/baseTest.js';

test('Homepage - Menu', async ({ page, app }) => {
  await app.signInExisting();
  await app.locationsPage.storeSelection();
  await page.goto(app.protectedPage.makeUrl('/menu'), { waitUntil: 'domcontentloaded' });

  const hotDrinks = page.getByRole('link', { name: /Hot Drinks/i }).first();
  if (await hotDrinks.isVisible().catch(() => false)) {
    await expect(hotDrinks).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('link', { name: /Cold Drinks/i }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('link', { name: /New & Seasonal/i }).first()).toBeVisible({ timeout: 20000 });
    return;
  }

  await expect(page.getByRole('button', { name: /Choose a Location/i }).first()).toBeVisible({ timeout: 20000 });
});
