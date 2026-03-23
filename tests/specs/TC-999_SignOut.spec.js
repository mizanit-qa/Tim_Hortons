import { expect, test } from '../fixtures/baseTest.js';

test('@signout Sign out via Account menu', async ({ page, app }) => {
  test.setTimeout(120000);
  await app.signInExisting();
  await app.signOutViaAccountMenu();
  await expect(page).toHaveURL(/signout/i, { timeout: 15000 });
});
