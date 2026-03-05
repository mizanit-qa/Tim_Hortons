import { test } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage.js';
import { ProtectedPage } from '../pages/ProtectedPage.js';
import { makeEmail } from '../utils/data.js';

test('New User Signup - short', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signup = new SignUpPage(page);

  await sitepass.passwordProtectionSignup();
  await page.waitForTimeout(2000);

  const email = makeEmail();
  await signup.signupShort('Tim', email);
});
