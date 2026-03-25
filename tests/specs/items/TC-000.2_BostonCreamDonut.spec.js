import { expect, test } from '../../fixtures/baseTest.js';

test('@stateful Boston Cream Donut Selection', async ({ page, app }) => {
  test.setTimeout(120000);
  const bostonExpectedTotal = process.env.TEST_EXPECTED_ITEM_TOTAL_BOSTON_CREAM_DONUT?.trim();
  test.skip(
    !bostonExpectedTotal,
    'Set TEST_EXPECTED_ITEM_TOTAL_BOSTON_CREAM_DONUT in .env (see .env.example).'
  );

  await app.signInExisting();

  await app.locationsPage.storeSelection();

  await app.menuItems.clickBakedGoods();

  await page.getByRole('link', { name: /Donuts/i }).first().waitFor({ state: 'attached' });

  await app.submenu.clickDonuts();
  await app.nestedSubMenu.clickBostonCreamDonut();

  await app.bostonCreamDonut.setQuantityTo(6);
  await app.bostonCreamDonut.addToOrder();

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
  await expect(cartItem).toContainText('Boston Cream Donut');

  await expect(cartItem.getByText('Item Total')).toBeVisible();
  await expect(cartItem).toContainText(`$${bostonExpectedTotal}`);

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
  //test comment
});
