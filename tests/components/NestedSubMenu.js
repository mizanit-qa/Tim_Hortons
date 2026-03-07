export class NestedSubMenu {
  constructor(page) {
    this.page = page;
    this.brewedCoffee = page.locator("//span[normalize-space()='Brewed Coffee']");
  }

  async clickBrewedCoffee() {
    await this.brewedCoffee.click();
  }
}
