import { test } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

import { ProtectedPage } from './pages/ProtectedPage';
import { SignInPage } from './pages/SignInPage';
import { HomePage } from './pages/HomePage';
import { LocationsPage } from './pages/LocationsPage';
import { MenuPage } from './pages/MenuPage';

import { sortNormalize, difference } from './utils/compareLists';

test('Homepage - Menu', async ({ page }) => {
  const sitepass = new ProtectedPage(page);
  const signin = new SignInPage(page);
  const homepage = new HomePage(page);
  const location = new LocationsPage(page);
  const menuPage = new MenuPage(page);

  await sitepass.passwordProtection({ timeout: 5000 });
  await signin.userSignIn('timregression+95@gmail.com');

  // ✅ remove fixed sleeps if possible; keeping yours for now
  // await page.waitForTimeout(5000);

  await page.waitForTimeout(5000);
  await homepage.homepageMenu();
  await location.storeSelection();

  // get actual list from UI
  const actual = await menuPage.getMenuTileNames();

  // read expected list from file
  const expectedPath = path.join(__dirname, 'data', 'menu_expected.json');
  const expected = JSON.parse(await fs.readFile(expectedPath, 'utf8'));

  // normalize & sort so the comparison ignores ordering/extra spaces
  const actualSorted = sortNormalize(actual);
  const expectedSorted = sortNormalize(expected);

  // compute diffs
  const added = difference(actualSorted, expectedSorted);   // present in actual, not in expected
  const removed = difference(expectedSorted, actualSorted); // present in expected, not in actual

  // log diff in terminal for quick debugging
  console.log('--- Menu diff ---');
  if (added.length) console.log('New items:', added);
  if (removed.length) console.log('Missing items:', removed);
  if (!added.length && !removed.length) console.log('Menu matches expected list ✅');

  // optional: update expected file when product changes are intentional
  const shouldUpdate = String(process.env.UPDATE_EXPECTED || '').toLowerCase() === 'true';
  if (shouldUpdate) {
    console.log('UPDATE_EXPECTED=true — updating expected list:', expectedPath);
    await fs.writeFile(expectedPath, JSON.stringify(actual, null, 2), 'utf8');
    return; // consider it success after updating
  }

  // fail test if mismatch exists
  if (added.length || removed.length) {
    throw new Error(
      `Menu mismatch.\nNew: ${JSON.stringify(added, null, 2)}\nMissing: ${JSON.stringify(removed, null, 2)}`
    );
  }
});

/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
How to update the expected list when the site intentionally changes

When the product intentionally changes the menu, run the test with the environment flag to automatically overwrite the expected file:

# Linux / macOS
UPDATE_EXPECTED=true npx playwright test tests/TC-006_Homepage-Menu.spec.js

# Windows (PowerShell)
$env:UPDATE_EXPECTED='true'; npx playwright test tests/TC-006_Homepage-Menu.spec.js

After the run, inspect tests/data/menu_expected.json, verify the new content, and commit the change.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

On CI and PR checks

Keep the test failing when there is a mismatch — that forces devs/product to approve menu changes.

If a change is approved, the committer should update the expected file (locally with UPDATE_EXPECTED=true), push the update, and then CI will pass.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

*/

