import { test, expect } from '../fixtures/baseTest.js';

test('Homepage - Tims for Good', async ({ page, app }) => {
  await app.signInExisting();
  await app.homePage.timsforGood();

  await expect(page).toHaveURL(/tims-for-good/i, { timeout: 15000 });

  const heading = page.getByRole('heading', { name: /Tims for Good/i });
  const anyText = page.getByText(/Tims for Good/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
});
