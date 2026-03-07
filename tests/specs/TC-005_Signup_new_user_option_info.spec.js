import { test } from '../fixtures/baseTest.js';
import { makeEmail } from '../utils/data.js';

test('New User Signup - with optional info', async ({ app }) => {
  await app.openSignupProtected();

  await app.signUpPage.helpCentre();

  const email = makeEmail();
  await app.signUpPage.signupOptionInfo('Tim', email);
});
