import { test } from '../fixtures/baseTest.js';

test('Existing User Sign In', async ({ app }) => {
  await app.signInExisting();
});
