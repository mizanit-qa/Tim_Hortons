import { test, expect } from '@playwright/test';
import { SignInPage } from './pages/SignInPage';
import { ProtectedPage } from './pages/ProtectedPage';

test('Existing User Sign In', async ({ page }) => {
    const sitepass = new ProtectedPage(page);
    const signin = new SignInPage(page);

    await sitepass.passwordProtection();
    await page.waitForTimeout(2000);

    await signin.gotoHome();
    await signin.userSignInBadCode("timregression+95@gmail.com");
    await expect(await page.locator("//div[@data-testid='OTP-code-input-message']")).toContainText("The code you entered doesn't match the code we sent. Check your messages and try typing it in again.");

    await signin.sendNewOtp();
    await expect(page.locator('text=New code has been sent to your email!')).toBeVisible();

    await page.waitForTimeout(5000);

    await signin.resendCode();
    await expect(page.locator('text=New code has been sent to your email!')).toBeVisible();
})