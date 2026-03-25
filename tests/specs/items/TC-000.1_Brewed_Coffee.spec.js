import { expect, test } from '../../fixtures/baseTest.js';

test('@stateful Brewed Coffee Selection', async ({ page, app }) => {
  test.setTimeout(120000);
  const brewedExpectedTotal = process.env.TEST_EXPECTED_ITEM_TOTAL_BREWED_COFFEE?.trim();
  test.skip(
    !brewedExpectedTotal,
    'Set TEST_EXPECTED_ITEM_TOTAL_BREWED_COFFEE in .env (see .env.example).'
  );

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
  const selectedServiceMode = await app.checkoutPage.selectServiceModeWithFallback();

  await expect(
    page.getByRole('heading', { name: new RegExp(`${selectedServiceMode}\\s+Order`, 'i') })
  ).toBeVisible({ timeout: 20000 });

  await expect(page.getByTestId('rewards-management-toggle')).toBeVisible({ timeout: 20000 });
  await app.checkoutPage.turnOffRedeemPoints();

  await app.checkoutPage.incrementQuantity();
  await app.checkoutPage.addToOrder();
  if (selectedServiceMode !== 'Drive Thru') {
    await app.checkoutPage.startPrepTime5Minutes();
    await app.checkoutPage.startPrepTime15Minutes();
    await app.checkoutPage.startPrepTime20Minutes();
    await app.checkoutPage.startPrepTimeNow();
  }

  await page.waitForTimeout(500);
  const cartItem = page.getByTestId('cart-item').first();
  await expect(cartItem).toContainText('Small Coffee Decaf - Reusable Cup');
  await expect(cartItem).toContainText('3.5 Cream');
  await expect(cartItem).toContainText('3.5 Sugar');
  await expect(cartItem).toContainText('Chocolate Syrup');
  await expect(cartItem).toContainText('Whipped Topping');

  await expect(cartItem.getByText('Item Total')).toBeVisible();
  await expect(cartItem).toContainText(`$${brewedExpectedTotal}`);

  await app.checkoutPage.continueToPayment();
  await page.waitForLoadState('domcontentloaded');

  //Order Payment Page
  await app.orderPaymentPage.selectVisaCard();
  //await app.orderPaymentPage.selectMastercard();
  await app.orderPaymentPage.continueToOrder();
  await app.orderPaymentPage.confirmYourStorePlaceOrder();
  await page.waitForTimeout(10000);

  // Sign out from home (header needs My Account after order flow may land on another route)
  await page.goto(app.homePage.baseUrl, { waitUntil: 'domcontentloaded' });
  await app.homePage.waitForReady();
  await app.signOutViaAccountMenu();
  await expect(app.accountInfoPage.signOutYesBtn).toBeVisible({ timeout: 15000 });
  await app.accountInfoPage.signOutYes();
  await expect(page).toHaveURL(/signin/i, { timeout: 15000 });
});
