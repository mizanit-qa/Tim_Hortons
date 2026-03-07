import { test, expect } from '../fixtures/baseTest.js';

test('Homepage - Catering', async ({ page, app }) => {
  await app.signInExisting();
  await app.homePage.timsCatering();

  await expect(page).toHaveURL(/catering/i, { timeout: 15000 });

  const heading = page.getByRole('heading', { name: /Tims Catering/i });
  const anyText = page.getByText(/Tims Catering/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
});
