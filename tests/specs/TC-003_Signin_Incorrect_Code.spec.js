import { test, expect } from '../fixtures/baseTest.js';

test('Sign In Incorrect Code', async ({ page, app }) => {
  await app.protectedPage.passwordProtection();
  await app.signInPage.userSignInBadCode(
    app.credentials.existingUserEmail,
    app.credentials.badOtpCode
  );
  await expect(
    page.locator("//div[@data-testid='OTP-code-input-message']")
  ).toContainText(
    "The code you entered doesn't match the code we sent. Check your messages and try typing it in again."
  );

  await app.signInPage.sendNewOtp();
  await expect(page.locator('text=New code has been sent to your email!')).toBeVisible();

  await app.signInPage.resendCode();
  await expect(page.locator('text=New code has been sent to your email!')).toBeVisible();
});
