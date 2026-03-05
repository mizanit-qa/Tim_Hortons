export class LocationsPage {
  constructor(page) {
    this.page = page;
    this.pickUpButton = page.getByRole('button', { name: /Choose a Location|Pick Up/i });
    this.yourAddress = page.getByTestId("storelocator-autocomplete");
    this.storeAccordionBtn = page.getByRole('button', { name: /1500 woodbine ave\./i });
    this.firstSuggestion = page.locator('#downshift-0-menu [role="option"]').first();
    this.storeOrderBtn = page.getByRole('button', { name: /^Order$/i });
  }

  async storeSelection() {
    await this.pickUpButton.click();
    await this.yourAddress.waitFor({ state: 'visible', timeout: 15000 });
    await this.yourAddress.fill("1500 Woodbine Ave");
    await this.page.locator("#downshift-0-menu").waitFor({ state: "visible", timeout: 15000 });
    await this.firstSuggestion.click();
    await this.storeAccordionBtn.click();
    await this.storeOrderBtn.click();
  }
}
