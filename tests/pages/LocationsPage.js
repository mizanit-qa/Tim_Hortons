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

    this.pickUpButton = page.getByRole('button', { name: /Choose a Location|Pick Up/i });
    this.selectedStoreChip = page.getByRole('button', { name: /Pick Up\s+1500|Pick Up\s+\d+/i });
    this.yourAddress = page.getByTestId('storelocator-autocomplete');
    this.storeAccordionBtn = page.getByRole('button', { name: this.storeNamePattern });
    this.firstSuggestion = page
      .locator('[id^="downshift-"][id$="-menu"] [role="option"], [role="listbox"] [role="option"]')
      .first();
    this.storeOrderBtn = page.getByRole('button', { name: /^Order$|Order Here|Start Order/i });
  }

  async storeSelection() {
    await this.pickUpButton.first().click();
    await this.yourAddress.fill(this.storeAddress);
    await this.firstSuggestion.click();
    await this.storeAccordionBtn.click();
    await this.storeOrderBtn.first().click();
  }
}
