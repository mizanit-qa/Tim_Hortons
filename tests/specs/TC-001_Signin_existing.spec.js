import { test, expect } from '../fixtures/baseTest.js';

test('Existing User Sign In', async ({ app }) => {
  await app.signInExisting();
  await expect(app.homePage.menuLink).toBeVisible({ timeout: 20000 });
});
