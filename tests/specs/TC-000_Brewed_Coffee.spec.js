import { expect, test } from '../fixtures/baseTest.js';

test('@stateful Brewed Coffee Selection', async ({ page, app }) => {
  test.setTimeout(120000);
  await app.signInExisting();

  await app.locationsPage.storeSelection();

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
  //Checkout Page
  await app.menuPage.clickCartAndCheckout();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/checkout|cart/i, { timeout: 20000 });
  await app.checkoutPage.selectDriveThru();
  await app.checkoutPage.selectCurbsidePickup();
  await app.checkoutPage.selectPickUp();
  await app.checkoutPage.selectDineIn();

  await expect(page.getByRole('heading', { name: 'Dine In Order' })).toBeVisible({ timeout: 20000 });

  await expect(page.getByTestId('rewards-management-toggle')).toBeVisible({ timeout: 20000 });
  await app.checkoutPage.turnOffRedeemPoints();

  await app.checkoutPage.incrementQuantity();
  await app.checkoutPage.addToOrder();
  await app.checkoutPage.startPrepTime5Minutes();
  await app.checkoutPage.startPrepTime15Minutes();
  await app.checkoutPage.startPrepTime20Minutes();
  await app.checkoutPage.startPrepTimeNow();

  await page.waitForTimeout(500);
  const cartItem = page.getByTestId('cart-item').first();
  await expect(cartItem).toContainText('Small Coffee Decaf - Reusable Cup');
  await expect(cartItem).toContainText('1 3.5 Cream');
  await expect(cartItem).toContainText('1 3.5 Sugar');
  await expect(cartItem).toContainText('1 1 Chocolate Syrup');
  await expect(cartItem).toContainText('1 1 Whipped Topping');

  await expect(cartItem.getByText('Item Total')).toBeVisible();
  const expectedItemTotal = `$${process.env.TEST_EXPECTED_ITEM_TOTAL ?? '11.16'}`;
  await expect(cartItem).toContainText(expectedItemTotal);

  await app.checkoutPage.continueToPayment();
  await page.waitForLoadState('domcontentloaded');

  //Order Payment Page
  await app.orderPaymentPage.selectVisaCard();
  await app.orderPaymentPage.continueToOrder();
  await app.orderPaymentPage.confirmYourStorePlaceOrder();
  await page.waitForTimeout(10000);
 
});
