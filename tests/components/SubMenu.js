export class Submenu {
  constructor(page) {
    this.page = page;
    this.brewedCoffeeTile = page.getByRole('link', { name: /Brewed Coffee/i }).first();
    this.donutsTile = page.getByRole('link', { name: /Donuts/i }).first();
    this.coldBrewTile = page.getByRole('link', { name: /Cold Brew/i }).first();
    this.breakfastWrapsTile = page.getByRole('link', { name: /Breakfast Wraps/i }).first();
  }

  async clickBrewedCoffee() {
    await this.brewedCoffeeTile.waitFor({ state: 'attached' });
    await this.brewedCoffeeTile.click();
  }

  async clickDonuts() {
    await this.donutsTile.waitFor({ state: 'attached' });
    await this.donutsTile.click();
  }

  async clickColdBrew() {
    await this.coldBrewTile.waitFor({ state: 'attached' });
    await this.coldBrewTile.click();
  }

  async clickBreakfastWraps() {
    await this.breakfastWrapsTile.waitFor({ state: 'attached' });
    await this.breakfastWrapsTile.click();
  }
}
