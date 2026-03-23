import { test as base, expect } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage.js';
import { SignInPage } from '../pages/SignInPage.js';
import { HomePage } from '../pages/HomePage.js';
import { LocationsPage } from '../pages/LocationsPage.js';
import { MenuPage } from '../pages/MenuPage.js';
import { SignUpPage } from '../pages/SignUpPage.js';
import { RewardsPage } from '../pages/RewardsPage.js';
import { MenuItems } from '../components/MenuItem.js';
import { Submenu } from '../components/SubMenu.js';
import { BrewedCoffee } from '../components/BrewedCoffee.js';
import { loadEnvFile } from '../utils/loadEnv.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OrderPaymentPage } from '../pages/OrderPaymentPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { AccountInfoPage } from '../pages/AccountInfoPage.js';

loadEnvFile();

/**
 * @typedef {import('../pages/ProtectedPage.js').ProtectedPage} ProtectedPage
 * @typedef {import('../pages/SignInPage.js').SignInPage} SignInPage
 * @typedef {import('../pages/HomePage.js').HomePage} HomePage
 * @typedef {import('../pages/LocationsPage.js').LocationsPage} LocationsPage
 * @typedef {import('../pages/MenuPage.js').MenuPage} MenuPage
 * @typedef {import('../pages/SignUpPage.js').SignUpPage} SignUpPage
 * @typedef {import('../pages/RewardsPage.js').RewardsPage} RewardsPage
 * @typedef {import('../components/MenuItem.js').MenuItems} MenuItems
 * @typedef {import('../components/SubMenu.js').Submenu} Submenu
 * @typedef {import('../components/BrewedCoffee.js').BrewedCoffee} BrewedCoffee
 * @typedef {import('@playwright/test').Page} Page
 *
 * @typedef {{
 *   page: Page;
 *   protectedPage: ProtectedPage;
 *   signInPage: SignInPage;
 *   homePage: HomePage;
 *   locationsPage: LocationsPage;
 *   menuPage: MenuPage;
 *   signUpPage: SignUpPage;
 *   rewardsPage: RewardsPage;
 *   menuItems: MenuItems;
 *   submenu: Submenu;
 *   brewedCoffee: BrewedCoffee;
 *   credentials: { existingUserEmail: string; otpCode: string; badOtpCode: string; nonExistingUserEmail: string };
 *   checkoutPage: CheckoutPage;
 *   orderPaymentPage: OrderPaymentPage;
 *   accountPage: AccountPage;
 *   accountInfoPage: AccountInfoPage;
 *   signInExisting(email?: string, code?: string): Promise<void>;
 *   openSignupProtected(): Promise<void>;
 *   signOutViaAccountMenu(): Promise<void>;
 * }} AppFixture
 */

function parseCsv(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

const DEFAULT_TEST_USER = process.env.TEST_USER_EMAIL?.trim();
const DEFAULT_TEST_USERS = parseCsv(process.env.TEST_USER_EMAILS ?? '');
const DEFAULT_TEST_OTP = process.env.TEST_OTP?.trim();
const DEFAULT_BAD_OTP = process.env.TEST_BAD_OTP?.trim();
const DEFAULT_NON_EXISTING_USER = process.env.NON_EXISTING_USER_EMAIL?.trim();

/** Skip tests that need credentials instead of throwing at import (e.g. CI without secrets yet). */
function getMissingCredentialEnvVars() {
  const missing = [];
  if (!DEFAULT_TEST_USER) missing.push('TEST_USER_EMAIL');
  if (!DEFAULT_TEST_OTP) missing.push('TEST_OTP');
  if (!DEFAULT_BAD_OTP) missing.push('TEST_BAD_OTP');
  if (!DEFAULT_NON_EXISTING_USER) missing.push('NON_EXISTING_USER_EMAIL');
  return missing;
}

export const test = base.extend({
  app: async ({ page }, use, testInfo) => {
    const missing = getMissingCredentialEnvVars();
    if (missing.length > 0) {
      testInfo.skip(
        true,
        `Missing required env: ${missing.join(', ')}. Set in .env locally or add GitHub Actions secrets (see .env.example).`
      );
      return;
    }

    const workerIndex = testInfo.workerIndex ?? 0;
    const existingUserEmail =
      DEFAULT_TEST_USERS.length > 0
        ? DEFAULT_TEST_USERS[workerIndex % DEFAULT_TEST_USERS.length]
        : DEFAULT_TEST_USER;

    const app = {
      page,
      protectedPage: new ProtectedPage(page),
      signInPage: new SignInPage(page),
      homePage: new HomePage(page),
      locationsPage: new LocationsPage(page),
      menuPage: new MenuPage(page),
      signUpPage: new SignUpPage(page),
      rewardsPage: new RewardsPage(page),
      menuItems: new MenuItems(page),
      submenu: new Submenu(page),
      brewedCoffee: new BrewedCoffee(page),
      credentials: {
        existingUserEmail,
        otpCode: DEFAULT_TEST_OTP,
        badOtpCode: DEFAULT_BAD_OTP,
        nonExistingUserEmail: DEFAULT_NON_EXISTING_USER
      
      },
      checkoutPage: new CheckoutPage(page),
      orderPaymentPage: new OrderPaymentPage(page),
      accountPage: new AccountPage(page),
      accountInfoPage: new AccountInfoPage(page),

      async signInExisting(email = existingUserEmail, code = DEFAULT_TEST_OTP) {
        await app.protectedPage.passwordProtection();
        await app.signInPage.userSignIn(email, code);
        await app.homePage.waitForReady();
      },
      async openSignupProtected() {
        await app.protectedPage.passwordProtectionSignup();
      },

      /** Home → My Account → Account Info → Sign Out */
      async signOutViaAccountMenu() {
        await app.homePage.openMyAccount();
        await app.accountPage.openAccountInfo();
        await app.accountInfoPage.signOut();
      }
    };

    await use(app);
  }
});

export { expect };
