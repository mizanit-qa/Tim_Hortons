import { expect, test } from '../fixtures/baseTest.js';

test('@stateful Brewed Coffee Selection', async ({ page, app }) => {
  test.setTimeout(180000);
  const brewedExpectedTotal = process.env.TEST_EXPECTED_ITEM_TOTAL_BREWED_COFFEE?.trim();
  test.skip(
    !brewedExpectedTotal,
    'Set TEST_EXPECTED_ITEM_TOTAL_BREWED_COFFEE in .env (see .env.example).'
  );

  await app.signInExisting();

  await app.locationsPage.storeSelection();

  await app.menuItems.clickHotDrinks();

  await page.getByRole('link', { name: /Brewed Coffee/i }).first().waitFor({ state: 'attached' });

  // Menu occasionally renders duplicate brewed-coffee entries; second click ensures details panel opens.
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

  const cartItem = page.getByTestId('cart-item').first();
  await expect(cartItem).toBeVisible({ timeout: 10000 });
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



/*

Findings

High: turnOffRedeemPoints() always clicks the toggle without checking its current state, so it can enable rewards instead of disabling them if the user/session already has redeeming turned off. See tests/pages/CheckoutPage.js:107-116. This is the kind of issue that makes stateful tests look random across accounts.

High: selectServiceModeWithFallback() is not really doing a fallback. If Drive Thru exists and any one of Curbside Pickup, Pick Up, or Dine In is missing, it forces Drive Thru immediately, even when a preferred non-drive-thru mode is available. See tests/pages/CheckoutPage.js:68-97. That means store-dependent availability can silently change the path under test.

Medium: the main fixture eagerly constructs every page/component object up front, and several constructors throw on missing env vars. That defeats the intent of the fixture-level skip logic and makes unrelated tests fail during setup. See tests/fixtures/baseTest.js:85-148, plus env-dependent constructors in tests/pages/SignInPage.js:6-17, tests/pages/HomePage.js:12-15, and tests/pages/LocationsPage.js:4-10. A test that never touches store selection should not die because TEST_STORE_ADDRESS is unset.

Medium: the order-flow specs are tightly coupled to mutable staging data and hard-coded expected totals. TC-000.3 skips unless TEST_EXPECTED_ITEM_TOTAL_BLACK_COLD_BREW is set, then asserts an exact item total after a real order path. See tests/specs/TC-000.3_Black_Cold_Brew.spec.js:5-8, :50-65, and .env.example:21-28. Price changes, tax changes, store changes, or promotions will create false failures even when the UI is correct.

Low: framework docs and repo surface area have drifted enough to slow onboarding. tests/README.md tells people to run npm run test:stateful, but package.json has no such script. It also points to template files that do not exist under tests/specs. See tests/README.md:84-88, :104-107, and package.json:6-12. There’s also dead/placeholder framework content like tests/specs/TC-007_Menu_and_submenu.spec.js:3-4 and tests/components/BrewedCoffee copy.js.

Recommendations

Your framework has a solid base: the fixture pattern is clear, page objects are readable, and you’ve already started separating stateful flows from general tests. The biggest improvement now is to tighten the framework contract so tests are deterministic: make fixtures lazy, centralize env validation, and move “toggle until desired state” or “pick best available service mode” logic into reusable, state-aware helpers.

After that, I’d focus on maintainability. Centralize repeated helpers like clickWithFallback, replace doc/script drift with one canonical “how to run” path, and trim dead files/placeholders so the framework feels smaller and more trustworthy. If you want, I can turn this into a concrete refactor plan or start implementing the highest-value fixes directly.

Review scope was static code review only; I didn’t run the suite.

Tested
*/
