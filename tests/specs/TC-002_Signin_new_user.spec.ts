import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { ProtectedPage } from '../pages/ProtectedPage';

test('New User Sign In', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);

  await sitepass.passwordProtection();
  await page.waitForTimeout(2000);

  await signin.gotoHome();
  await signin.nonExistingUserSignIn('timregression+9595@gmail.com');
  await page.waitForTimeout(5000);

  await expect(page.locator("//div[@data-testid='signin-email-input-message']")).toContainText(
    'This user does not exist'
  );
});
