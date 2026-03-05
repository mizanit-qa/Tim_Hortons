import { test } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { ProtectedPage } from '../pages/ProtectedPage';

test('Existing User Sign In', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);

  await sitepass.passwordProtection();
  await page.waitForTimeout(2000);

  await signin.gotoHome();
  await signin.userSignIn('timregression+95@gmail.com');
});
