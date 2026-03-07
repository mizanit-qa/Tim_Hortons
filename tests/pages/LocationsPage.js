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
    if (await this.selectedStoreChip.first().isVisible().catch(() => false)) {
      return;
    }
    await this.pickUpButton.first().click();
    if (!(await this.yourAddress.isVisible().catch(() => false))) {
      await this.yourAddress.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    }
    if (!(await this.yourAddress.isVisible().catch(() => false))) {
      return;
    }
    await this.yourAddress.fill("1500 Woodbine Ave");
    if (await this.firstSuggestion.isVisible().catch(() => false)) {
      await this.firstSuggestion.click();
    } else {
      await this.yourAddress.press('Enter');
    }
    if (await this.storeAccordionBtn.isVisible().catch(() => false)) {
      await this.storeAccordionBtn.click();
    }
    if (await this.storeOrderBtn.first().isVisible().catch(() => false)) {
      await this.storeOrderBtn.first().click();
    }
  }
}
