export class CartPage {
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

    // Pickup time radios
    this.nowPickupTime = page.locator('#now');
    this.fiveMinPickupTime = page.locator('#5min');
    this.tenMinPickupTime = page.locator('#10min');
    this.fifteenMinPickupTime = page.locator('#15min');
    this.twentyMinPickupTime = page.locator('#20min');

    // Continue
    this.continueButton = page.getByRole('button', { name: /^continue$/i });

    // Close cart
    this.closeCartButton = page.getByTestId('close-button');
  }
}
