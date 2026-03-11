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

loadEnvFile();

function parseCsv(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

const DEFAULT_TEST_USER = process.env.TEST_USER_EMAIL;
const DEFAULT_TEST_USERS = parseCsv(process.env.TEST_USER_EMAILS);
const DEFAULT_TEST_OTP = process.env.TEST_OTP;
const DEFAULT_BAD_OTP = process.env.TEST_BAD_OTP;
const DEFAULT_NON_EXISTING_USER = process.env.NON_EXISTING_USER_EMAIL;

if (!DEFAULT_TEST_USER) {
  throw new Error('TEST_USER_EMAIL is required. Set it in .env (see .env.example).');
}
if (!DEFAULT_TEST_OTP) {
  throw new Error('TEST_OTP is required. Set it in .env (see .env.example).');
}
if (!DEFAULT_BAD_OTP) {
  throw new Error('TEST_BAD_OTP is required. Set it in .env (see .env.example).');
}
if (!DEFAULT_NON_EXISTING_USER) {
  throw new Error('NON_EXISTING_USER_EMAIL is required. Set it in .env (see .env.example).');
}

export const test = base.extend({
  app: async ({ page }, use, testInfo) => {
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

      
      async signInExisting(email = existingUserEmail, code = DEFAULT_TEST_OTP) {
        await app.protectedPage.passwordProtection();
        await app.signInPage.userSignIn(email, code);
        await app.homePage.waitForReady();
      },
      async openSignupProtected() {
        await app.protectedPage.passwordProtectionSignup();
      }
    };

    await use(app);
  }
});

export { expect };
