import { test } from '../fixtures/baseTest.js';
import { makeEmail } from '../utils/data.js';

test('New User Signup - short', async ({ app }) => {
  await app.openSignupProtected();

  const email = makeEmail();
  await app.signUpPage.signupShort('Tim', email);
});
