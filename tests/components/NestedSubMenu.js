export class NestedSubMenu {
  constructor(page) {
    this.page = page;
    this.brewedCoffee = page.locator("//span[normalize-space()='Brewed Coffee']");
    this.bostonCreamDonut = page.locator("//span[normalize-space()='Boston Cream Donut']");
  }

  async clickBrewedCoffee() {
    await this.brewedCoffee.click();
  }

  async clickBostonCreamDonut() {
      await this.bostonCreamDonut.click();
  }
}
