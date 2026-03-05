import { expect, test } from '@playwright/test';
import { POManager } from '../pages/POManager.js';

test('Brewed Coffee Selection', async ({ page }) => {
  test.setTimeout(120000);
  const poManager = new POManager(page);

  await poManager.passwordProtection({ timeout: 5000 });
  await poManager.signIn('timregression+95@gmail.com');
  await page.waitForTimeout(5000);

  await poManager.storeSelection();

  // Leave Locations full page: go back to previous page then open menu
  await page.goBack();
  await page.waitForLoadState('domcontentloaded');
  await poManager.homepageMenu();

  await page.getByRole('link', { name: /Hot Drinks/i }).waitFor({ state: 'visible', timeout: 30000 });
  await poManager.clickHotDrinks();

  await page.getByRole('link', { name: /Brewed Coffee/i }).first().waitFor({ state: 'attached' });

  await poManager.clickBrewedCoffee();
  await poManager.clickBrewedCoffee();

  await page.getByRole('main').getByRole('button', { name: 'Size Medium' }).waitFor({ state: 'visible', timeout: 20000 });

  await poManager.sizeSelection();
  await poManager.blendSelection();
  await poManager.reusableCupSelection();
  await poManager.blackSelection();
  await poManager.regularSelection();
  await poManager.doubleDoubleSelection();
  await poManager.tripleTripleSelection();
  await poManager.tripleTripleSelection();
  await poManager.addCream();
  await poManager.addSugar();
  await poManager.addChocolateSyrup();
  await poManager.addWhippedTopping();
  await poManager.setQuantityTo(3);
  await poManager.addToOrder();
  await page.waitForTimeout(10000);
});
