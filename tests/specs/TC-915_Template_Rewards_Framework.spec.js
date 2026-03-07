import { test, expect } from '../fixtures/baseTest.js';

test('Template - Rewards Flow', async ({ page, app }) => {
  await app.signInExisting();
  await app.rewardsPage.open();

  await expect(page).toHaveURL(/rewards|history/i);
});
