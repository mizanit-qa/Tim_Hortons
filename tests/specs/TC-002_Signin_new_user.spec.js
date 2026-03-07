import { test, expect } from '../fixtures/baseTest.js';

test('New User Sign In', async ({ page, app }) => {
  await app.protectedPage.passwordProtection();
  await app.signInPage.nonExistingUserSignIn(app.credentials.nonExistingUserEmail);

  const emailError = page
    .locator("[data-testid='signin-email-input-message']")
    .or(page.getByText(/does not exist|can't find|could not find|not found/i).first());
  await expect(emailError).toBeVisible({ timeout: 15000 });
});
