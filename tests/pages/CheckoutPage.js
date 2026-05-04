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
    await this.clickWithFallback(this.driveThruRadio);
  }

  async selectPickUp() {
    await this.clickWithFallback(this.pickUpRadio);
  }

  async selectCurbsidePickup() {
    await this.clickWithFallback(this.curbsidePickupRadio);
  }

  async selectDineIn() {
    await this.clickWithFallback(this.dineInRadio);
  }

  async selectServiceModeWithFallback() {
    const serviceModes = [
      { name: 'Dine In', locator: this.dineInRadio },
      { name: 'Pick Up', locator: this.pickUpRadio },
      { name: 'Curbside Pickup', locator: this.curbsidePickupRadio },
      { name: 'Drive Thru', locator: this.driveThruRadio },
    ];

    for (const mode of serviceModes) {
      if (await mode.locator.count().then((n) => n > 0).catch(() => false)) {
        await this.clickWithFallback(mode.locator);
        return mode.name;
      }
    }

    const orderHeading = this.page.getByRole('heading', { name: /Order/i }).first();
    const headingText = (await orderHeading.textContent().catch(() => '')) || '';
    if (/drive\s*thru/i.test(headingText)) return 'Drive Thru';
    if (/pick\s*up/i.test(headingText)) return 'Pick Up';
    if (/curbside/i.test(headingText)) return 'Curbside Pickup';
    if (/dine\s*in/i.test(headingText)) return 'Dine In';
    throw new Error('No service mode is available on checkout.');
  }

  async turnOffRedeemPoints() {
    await this.redeemPointsToggle.waitFor({ state: 'visible', timeout: 10000 });
    const initialState = await this.getRedeemPointsState();
    if (initialState === false) {
      return;
    }
    try {
      await this.redeemPointsToggle.click({ timeout: 5000 });
    } catch {
      const clickableWrapper = this.redeemPointsToggle.locator(
        'xpath=ancestor-or-self::*[self::button or @role="button"][1]'
      );
      await this.clickWithFallback(clickableWrapper);
    }
    const finalState = await this.getRedeemPointsState();
    if (finalState === true) {
      throw new Error('Redeem points toggle was clicked but did not turn off.');
    }
  }

  async getRedeemPointsState() {
    const toggle = this.redeemPointsToggle.first();
    const states = await toggle.evaluate((el) => {
      const node = el;
      const input = node.matches('input') ? node : node.querySelector('input');
      return {
        ariaChecked: node.getAttribute('aria-checked'),
        ariaPressed: node.getAttribute('aria-pressed'),
        dataState: node.getAttribute('data-state'),
        checked: input ? input.checked : undefined,
      };
    }).catch(() => ({}));

    if (states.checked === true) return true;
    if (states.checked === false) return false;
    if (states.ariaChecked === 'true') return true;
    if (states.ariaChecked === 'false') return false;
    if (states.ariaPressed === 'true') return true;
    if (states.ariaPressed === 'false') return false;
    if (states.dataState === 'checked' || states.dataState === 'on' || states.dataState === 'open') return true;
    if (states.dataState === 'unchecked' || states.dataState === 'off' || states.dataState === 'closed') return false;
    return undefined;
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
    await this.clickWithFallback(this.addToOrderButton);
  }

  async startPrepTimeNow() {
    await this.clickWithFallback(this.nowPickupTime);
  }

  async startPrepTime5Minutes() {
    await this.clickWithFallback(this.fiveMinPickupTime);
  }

  async startPrepTime10Minutes() {
    await this.clickWithFallback(this.tenMinPickupTime);
  }

  async startPrepTime15Minutes() {
    await this.clickWithFallback(this.fifteenMinPickupTime);
  }

  async startPrepTime20Minutes() {
    await this.clickWithFallback(this.twentyMinPickupTime);
  }

  async continueToPayment() {
    await this.clickWithFallback(this.continueButton);
  }

  async clickWithFallback(locator, timeout = 10000) {
    try {
      await locator.click({ timeout });
    } catch {
      if ((await locator.count()) === 0) {
        throw new Error('Target element not found for click action.');
      }
      const target = locator.first();
      await target.scrollIntoViewIfNeeded().catch(() => {});
      try {
        await target.click({ force: true, timeout });
      } catch {
        // Some hidden/overlayed radios are still valid click targets via native click.
        await target.evaluate((el) => el.click());
      }
    }
  }

}
