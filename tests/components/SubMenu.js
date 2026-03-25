export class Submenu {
  constructor(page) {
    this.page = page;
    this.brewedCoffeeTile = page.getByRole('link', { name: /Brewed Coffee/i }).first();
    this.donutsTile = page.getByRole('link', { name: /Donuts/i }).first();
  }

  async clickBrewedCoffee() {
    await this.brewedCoffeeTile.waitFor({ state: 'attached' });
    await this.brewedCoffeeTile.click();
  }

  async clickDonuts() {
    await this.donutsTile.waitFor({ state: 'attached' });
    await this.donutsTile.click();
  }
}
