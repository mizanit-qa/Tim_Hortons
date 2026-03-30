import { expect, test } from '../fixtures/baseTest.js';

test('@stateful Black Cold Brew Selection', async ({ page, app }) => {
  test.setTimeout(180000);
  const blackColdBrewExpectedTotal = process.env.TEST_EXPECTED_ITEM_TOTAL_BLACK_COLD_BREW?.trim();
  test.skip(
    !blackColdBrewExpectedTotal,
    'Set TEST_EXPECTED_ITEM_TOTAL_BLACK_COLD_BREW in .env (see .env.example).'
  );

  await app.signInExisting();

  await app.locationsPage.storeSelection();

  await app.menuItems.clickColdDrinks();

  await page.getByRole('link', { name: /Cold Brew/i }).first().waitFor({ state: 'attached' });

  await app.submenu.clickColdBrew();
  await app.nestedSubMenu.clickBlackColdBrew();

  await page.getByRole('main').getByRole('button', { name: 'Size Medium' }).waitFor({ state: 'visible', timeout: 20000 });

  await app.blackColdBrew.sizeSelection();
  await app.blackColdBrew.setQuantityTo(4);
  await app.blackColdBrew.reusableCupSelection();
  await app.blackColdBrew.addToOrder();
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

  const cartItem = page.getByTestId('cart-item').first();
  await expect(cartItem).toBeVisible({ timeout: 10000 });
  await expect(cartItem).toContainText('Large Original Cold Brew - Reusable Cup');

  await expect(cartItem.getByText('Item Total')).toBeVisible();
  await expect(cartItem).toContainText(`$${blackColdBrewExpectedTotal}`);

  await app.checkoutPage.continueToPayment();
  await page.waitForLoadState('domcontentloaded');

  //Order Payment Page
  await app.orderPaymentPage.waitForPaymentReady();
  await app.orderPaymentPage.selectVisaCard();
  //await app.orderPaymentPage.selectMastercard();
  await app.orderPaymentPage.continueToOrder();
  await app.orderPaymentPage.confirmYourStorePlaceOrder();
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

  // Sign out from home (header needs My Account after order flow may land on another route)
  await page.goto(app.homePage.baseUrl, { waitUntil: 'domcontentloaded' });
  await app.homePage.waitForReady();
  await app.signOutViaAccountMenu();
  await expect(app.accountInfoPage.signOutYesBtn).toBeVisible({ timeout: 15000 });
  await app.accountInfoPage.signOutYes();
  await expect(page).toHaveURL(/signin/i, { timeout: 15000 });
});
//
