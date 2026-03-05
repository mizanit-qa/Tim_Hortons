import { test } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

import { ProtectedPage } from '../pages/ProtectedPage.js';
import { SignInPage } from '../pages/SignInPage.js';
import { HomePage } from '../pages/HomePage.js';
import { LocationsPage } from '../pages/LocationsPage.js';
import { MenuPage } from '../pages/MenuPage.js';

import { sortNormalize, difference } from '../utils/compareLists.js';

test('Homepage - Menu', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const location = new LocationsPage(page);
  const menuPage = new MenuPage(page);

  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  await page.waitForTimeout(5000);
  await homepage.homepageMenu();
  await location.storeSelection();

  const actual = await menuPage.getMenuTileNames();

  const expectedPath = path.join(__dirname, 'data', 'menu_expected.json');
  const expected = JSON.parse(await fs.readFile(expectedPath, 'utf8'));

  const actualSorted = sortNormalize(actual);
  const expectedSorted = sortNormalize(expected);

  const added = difference(actualSorted, expectedSorted);
  const removed = difference(expectedSorted, actualSorted);

  console.log('--- Menu diff ---');
  if (added.length) console.log('New items:', added);
  if (removed.length) console.log('Missing items:', removed);
  if (!added.length && !removed.length) console.log('Menu matches expected list ✅');

  const shouldUpdate = String(process.env.UPDATE_EXPECTED || '').toLowerCase() === 'true';
  if (shouldUpdate) {
    console.log('UPDATE_EXPECTED=true — updating expected list:', expectedPath);
    await fs.writeFile(expectedPath, JSON.stringify(actual, null, 2), 'utf8');
    return;
  }

  if (added.length || removed.length) {
    throw new Error(
      `Menu mismatch.\nNew: ${JSON.stringify(added, null, 2)}\nMissing: ${JSON.stringify(removed, null, 2)}`
    );
  }
});
