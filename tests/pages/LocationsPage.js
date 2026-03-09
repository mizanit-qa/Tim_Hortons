export class LocationsPage {
  constructor(page) {
    this.page = page;
    this.pickUpButton = page.getByRole('button', { name: /Choose a Location|Pick Up/i });
    this.selectedStoreChip = page.getByRole('button', { name: /Pick Up\s+1500|Pick Up\s+\d+/i });
    this.yourAddress = page.getByTestId("storelocator-autocomplete");
    this.storeAccordionBtn = page.getByRole('button', { name: /1500 woodbine ave/i });
    this.firstSuggestion = page
      .locator('[id^="downshift-"][id$="-menu"] [role="option"], [role="listbox"] [role="option"]')
      .first();
    this.storeOrderBtn = page.getByRole('button', { name: /^Order$|Order Here|Start Order/i });
  }

  async storeSelection() {
    await this.pickUpButton.first().click();
    await this.yourAddress.fill("1500 Woodbine Ave");
    await this.firstSuggestion.click();
    await this.storeAccordionBtn.click();
    await this.storeOrderBtn.first().click();
  }
}
