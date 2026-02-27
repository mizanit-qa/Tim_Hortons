import { test, expect } from '@playwright/test';
import { ProtectedPage } from './pages/ProtectedPage';
import { SignInPage } from './pages/SignInPage';
import { HomePage } from './pages/HomePage';
import { CateringPage } from './pages/CateringPage';



test('Homepage - Menu', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const cateringPage = new CateringPage(page);


  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  await page.waitForTimeout(5000);
  await homepage.timsforGood();

  // Wait for Tims for Good page to load (URL)
  await expect(page).toHaveURL(/tims-for-good/i, { timeout: 15000 });

  // Verify page content: heading or any visible "Tims Catering" text (longer timeout for slow load)
  const heading = page.getByRole('heading', { name: /Tims Catering/i });
  const anyText = page.getByText(/Tims Catering/i).first();
  await expect(heading.or(anyText)).toBeVisible({ timeout: 15000 });
})