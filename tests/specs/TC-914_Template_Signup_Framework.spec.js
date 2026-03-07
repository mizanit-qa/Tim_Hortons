import { test, expect } from '../fixtures/baseTest.js';
import { makeEmail } from '../utils/data.js';

test('Template - Signup Flow', async ({ page, app }) => {
  // 1) Shared protected entry for signup
  await app.openSignupProtected();

  // 2) Prepare test data
  const email = makeEmail();

  // 3) Execute signup action from page object
  await app.signUpPage.signupShort('Tim', email);

  // 4) Assert a stable post-submit signal
  // Adjust this assertion to your actual signup success state.
  await expect(page).toHaveURL(/signup|signin|verify|account/i);
});
