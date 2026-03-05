import { test, expect } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage.js';
import { SignInPage } from '../pages/SignInPage.js';
import { HomePage } from '../pages/HomePage.js';
import { CateringPage } from '../pages/CateringPage.js';

test('Homepage - Catering', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const cateringPage = new CateringPage(page);

  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  await page.waitForTimeout(5000);
  await homepage.timsCatering();

  await expect(page).toHaveURL(/catering/i, { timeout: 15000 });

  const heading = page.getByRole('heading', { name: /Tims Catering/i });
  const anyText = page.getByText(/Tims Catering/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
});
