import { expect, test } from '../fixtures/baseTest.js';

test('@signout Sign out via Account menu', async ({ page, app }) => {
  test.setTimeout(120000);
  await app.signInExisting();
  await app.signOutViaAccountMenu();
  await expect(app.accountInfoPage.signOutYesBtn).toBeVisible({ timeout: 15000 });
  await app.accountInfoPage.signOutYes();
  await expect(page).toHaveURL(/signin|signout/i, { timeout: 15000 });
});
