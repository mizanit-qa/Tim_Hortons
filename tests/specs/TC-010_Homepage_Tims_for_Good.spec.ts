import { test, expect } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage';
import { SignInPage } from '../pages/SignInPage';
import { HomePage } from '../pages/HomePage';
import { TimsforGoodPage } from '../pages/TimsforGoodPage';

test('Homepage - Tims for Good', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const timsforGoodPage = new TimsforGoodPage(page);

  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  await page.waitForTimeout(5000);
  await homepage.timsforGood();

  await expect(page).toHaveURL(/tims-for-good/i, { timeout: 15000 });

  const heading = page.getByRole('heading', { name: /Tims for Good/i });
  const anyText = page.getByText(/Tims for Good/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
});
