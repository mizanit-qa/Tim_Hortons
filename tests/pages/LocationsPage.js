export class LocationsPage {
  constructor(page) {
    this.page = page;
    const address = process.env.TEST_STORE_ADDRESS;
    const storeName = process.env.TEST_STORE_NAME;
    if (!address || !storeName) {
      throw new Error(
        'TEST_STORE_ADDRESS and TEST_STORE_NAME are required for store selection. Set them in .env (see .env.example).'
      );
    }
    this.storeAddress = address.trim();
    this.storeNamePattern = new RegExp(storeName.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    // May render as button or link; bottom bar often says "Choose a Location"
    this.pickUpButton = page
      .getByRole('button', { name: /Choose a Location|Pick Up|Location/i })
      .or(page.getByRole('link', { name: /Choose a Location|Pick Up|Location/i }));
    this.selectedStoreChip = page.getByRole('button', { name: /Pick Up\s+1500|Pick Up\s+\d+/i });
    this.yourAddress = page.getByTestId('storelocator-autocomplete');
    this.storeAccordionBtn = page.getByRole('button', { name: this.storeNamePattern });
    /** Any common autocomplete dropdown option (Downshift, Reach, native listbox) */
    this.autocompleteOptions = page.locator(
      [
        '[id^="downshift"][id$="-menu"] [role="option"]',
        '[role="listbox"] [role="option"]',
        '[role="menu"] [role="option"]',
        '[data-testid*="autocomplete"] [role="option"]',
        'ul[role="listbox"] > li[role="option"]',
      ].join(', ')
    );
    this.storeOrderBtn = page.getByRole('button', { name: /^Order$|Order Here|Start Order/i });
  }

  async storeSelection() {
    await this.page.waitForLoadState('domcontentloaded');
    const pickUp = this.pickUpButton.first();
    await pickUp.waitFor({ state: 'visible', timeout: 30000 });
    await pickUp.scrollIntoViewIfNeeded();
    await this.clickWithFallback(pickUp, 30000);
    await this.yourAddress.click();
    await this.yourAddress.fill(this.storeAddress);
    // Some comboboxes only open the list after keystrokes / debounce
    await this.yourAddress.press('ArrowDown').catch(() => {});
    const firstOpt = this.autocompleteOptions.first();
    await firstOpt.waitFor({ state: 'visible', timeout: 20000 });
    await firstOpt.click({ timeout: 20000 });
    await this.clickWithFallback(this.storeAccordionBtn);
    await this.clickWithFallback(this.storeOrderBtn.first());
  }

  async clickWithFallback(locator, timeout = 10000) {
    await locator.waitFor({ state: 'attached', timeout });
    try {
      await locator.click({ timeout });
    } catch {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      await locator.click({ force: true, timeout });
    }
  }
}
