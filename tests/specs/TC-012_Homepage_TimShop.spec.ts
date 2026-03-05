import { test, expect } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage';
import { SignInPage } from '../pages/SignInPage';
import { HomePage } from '../pages/HomePage';
import { TimShopPage } from '../pages/TimShopPage';

test('Homepage - Tim Shop', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const timShopPage = new TimShopPage(page);

  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  await page.waitForTimeout(5000);
  await homepage.timShop();

  await expect(page).toHaveURL(/timhortonsshop/i, { timeout: 15000 });

  const heading = page.getByRole('heading', { name: /Tim Shop/i });
  const anyText = page.getByText(/Tim Shop/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
});
