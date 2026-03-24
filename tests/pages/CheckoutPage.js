export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Service mode radios
    this.driveThruRadio = page.getByRole('radio', { name: /drive thru/i });
    this.pickUpRadio = page.getByRole('radio', { name: /pick up/i });
    this.curbsidePickupRadio = page.getByRole('radio', { name: /curbside pickup/i });
    this.dineInRadio = page.getByRole('radio', { name: /dine in/i });

    // Rewards
    this.redeemPointsToggle = page.getByTestId('rewards-management-toggle');
    this.changeRewardLevelLink = page.getByTestId('reward-selection-link');

    // Cart item
    this.cartItems = page.getByTestId('cart-items');
    this.cartItem = page.getByTestId('cart-item');
    this.cartItemLabel = page.getByTestId('cart-item-label');

    this.editItemButton = page.getByTestId('edit-button');
    this.removeItemButton = page.getByTestId('remove-button');

    // Quantity
    this.incrementQty = page.getByTestId('increment');
    this.decrementQty = page.getByTestId('decrement');

    // Totals
    this.subtotal = page.getByTestId('subtotal');
    this.tax = page.getByTestId('totalTax');
    this.total = page.getByTestId('grand-total');

    // Add items button
    this.addItemsButton = page.getByRole('button', { name: /add items/i });

    // Add to Order buttons (upsell; use .first() or filter by name when multiple)
    this.addToOrderButton = page.getByTestId('upsell-add-to-order-btn').first();

    // Pickup time radios (ids starting with digits need attribute selector)
    this.nowPickupTime = page.locator('#now');
    this.fiveMinPickupTime = page.locator('[id="5min"]');
    this.tenMinPickupTime = page.locator('[id="10min"]');
    this.fifteenMinPickupTime = page.locator('[id="15min"]');
    this.twentyMinPickupTime = page.locator('[id="20min"]');

    // Continue
    this.continueButton = page.getByRole('button', { name: /^continue$/i });

    // Close cart
    this.closeCartButton = page.getByTestId('close-button');
  }

  async selectDriveThru() {
    await this.driveThruRadio.click({ force: true });
  }

  async selectPickUp() {
    await this.pickUpRadio.click({ force: true });
  }

  async selectCurbsidePickup() {
    await this.curbsidePickupRadio.click({ force: true });
  }

  async selectDineIn() {
    await this.dineInRadio.click({ force: true });
  }

  async selectServiceModeWithFallback() {
    const availability = await Promise.all([
      this.curbsidePickupRadio.isVisible().catch(() => false),
      this.pickUpRadio.isVisible().catch(() => false),
      this.dineInRadio.isVisible().catch(() => false),
    ]);
    const allPreferredModesAvailable = availability.every(Boolean);

    if (!allPreferredModesAvailable) {
      await this.driveThruRadio.click({ force: true });
      return 'Drive Thru';
    }

    await this.dineInRadio.click({ force: true });
    return 'Dine In';
  }

  async turnOffRedeemPoints() {
    // Click the wrapper that has the React handler; the hidden input's click doesn't update controlled state
    await this.redeemPointsToggle.evaluate((el) => {
      const wrapper = el.closest('button') || el.closest('[role="button"]') || el.parentElement;
      (wrapper || el).click();
    });
  }

  async incrementQuantity() {
    await this.incrementQty.click();
  }

  async decrementQuantity() {
    await this.decrementQty.click();
  }

  async checkCartItem(quantity) {
    await this.cartItems.waitFor({ state: 'visible' });
  }

  async addToOrder() {
    await this.addToOrderButton.click();
  }

  async startPrepTimeNow() {
    await this.nowPickupTime.evaluate((el) => el.click());
  }

  async startPrepTime5Minutes() {
    await this.fiveMinPickupTime.evaluate((el) => el.click());
  }

  async startPrepTime10Minutes() {
    await this.tenMinPickupTime.evaluate((el) => el.click());
  }

  async startPrepTime15Minutes() {
    await this.fifteenMinPickupTime.evaluate((el) => el.click());
  }

  async startPrepTime20Minutes() {
    await this.twentyMinPickupTime.evaluate((el) => el.click());
  }

  async continueToPayment() {
    await this.continueButton.click();
  }

}
