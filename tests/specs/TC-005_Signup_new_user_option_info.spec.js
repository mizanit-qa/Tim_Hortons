import { test } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage.js';
import { ProtectedPage } from '../pages/ProtectedPage.js';
import { makeEmail } from '../utils/data.js';

test('New User Signup - with optional info', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signup = new SignUpPage(page);

  await sitepass.passwordProtectionSignup();
  await page.waitForTimeout(2000);

  await signup.helpCentre();

  const email = makeEmail();
  await signup.signupOptionInfo('Tim', email);
});
