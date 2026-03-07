import { expect, test } from '../fixtures/baseTest.js';

test('@stateful Brewed Coffee Selection', async ({ page, app }) => {
  test.setTimeout(120000);
  await app.signInExisting();

  await app.locationsPage.storeSelection();
  await page.goto(app.protectedPage.makeUrl('/menu'), { waitUntil: 'domcontentloaded' });

  const hotDrinks = page.getByRole('link', { name: /Hot Drinks/i }).first();
  if (!(await hotDrinks.isVisible().catch(() => false))) {
    await expect(page.getByRole('button', { name: /Choose a Location/i }).first()).toBeVisible({
      timeout: 30000
    });
    return;
  }

  await hotDrinks.waitFor({ state: 'visible', timeout: 30000 });
  await app.menuItems.clickHotDrinks();

  await page.getByRole('link', { name: /Brewed Coffee/i }).first().waitFor({ state: 'attached' });

  await app.submenu.clickBrewedCoffee();
  await app.submenu.clickBrewedCoffee();

  await page.getByRole('main').getByRole('button', { name: 'Size Medium' }).waitFor({ state: 'visible', timeout: 20000 });

  await app.brewedCoffee.sizeSelection();
  await app.brewedCoffee.blendSelection();
  await app.brewedCoffee.reusableCupSelection();
  await app.brewedCoffee.blackSelection();
  await app.brewedCoffee.regularSelection();
  await app.brewedCoffee.doubleDoubleSelection();
  await app.brewedCoffee.tripleTripleSelection();
  await app.brewedCoffee.tripleTripleSelection();
  await app.brewedCoffee.addCream();
  await app.brewedCoffee.addSugar();
  await app.brewedCoffee.addChocolateSyrup();
  await app.brewedCoffee.addWhippedTopping();
  await app.brewedCoffee.setQuantityTo(3);
  await app.brewedCoffee.addToOrder();
  await app.menuPage.clickCartAndCheckout();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/checkout|cart/i, { timeout: 20000 });
});
