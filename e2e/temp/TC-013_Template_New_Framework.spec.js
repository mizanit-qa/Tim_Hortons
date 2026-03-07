import { test, expect } from '../../tests/fixtures/baseTest.js';

test('Template - New Framework Flow', async ({ page, app }) => {
  // 1) Shared setup from fixture (recommended)
  await app.signInExisting();

  // 2) Optional: choose location when scenario depends on ordering flow
  await app.locationsPage.storeSelection();

  // 3) Navigate to target area
  await app.homePage.homepageMenu();

  // 4) State-based assertion (avoid waitForTimeout)
  await expect(page).toHaveURL(/menu/i);

  // 5) Perform business actions via page objects/components from app
  await app.menuItems.clickHotDrinks();

  // 6) Validate expected UI state
  await expect(page.getByRole('link', { name: /Brewed Coffee/i }).first()).toBeVisible();
});
