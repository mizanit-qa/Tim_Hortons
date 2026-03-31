export class NestedSubMenu {
  constructor(page) {
    this.page = page;
    const main = page.getByRole('main');
    this.brewedCoffee = main
      .getByRole('link', { name: /Brewed Coffee/i })
      .or(main.getByRole('button', { name: /Brewed Coffee/i }))
      .or(main.getByText('Brewed Coffee', { exact: true }))
      .first();
    this.bostonCreamDonut = main
      .getByRole('link', { name: /Boston Cream Donut/i })
      .or(main.getByRole('button', { name: /Boston Cream Donut/i }))
      .or(main.getByText('Boston Cream Donut', { exact: true }))
      .first();
    this.blackColdBrew = main
      .getByRole('link', { name: /Black Cold Brew/i })
      .or(main.getByRole('button', { name: /Black Cold Brew/i }))
      .or(main.getByText('Black Cold Brew', { exact: true }))
      .first();
    this.classicBreakfastWraps = main
      .getByRole('link', { name: /Classic Breakfast Wraps/i })
      .or(main.getByRole('button', { name: /Classic Breakfast Wraps/i }))
      .or(main.getByText('Classic Breakfast Wraps', { exact: true }))
      .first();
  }

  async clickBrewedCoffee() {
    await this.brewedCoffee.waitFor({ state: 'visible', timeout: 10000 });
    await this.brewedCoffee.click();
  }

  async clickBostonCreamDonut() {
    await this.bostonCreamDonut.waitFor({ state: 'visible', timeout: 10000 });
    await this.bostonCreamDonut.click();
  }

  async clickBlackColdBrew() {
    await this.blackColdBrew.waitFor({ state: 'visible', timeout: 10000 });
    await this.blackColdBrew.click();
  }

  async clickClassicBreakfastWraps() {
    await this.classicBreakfastWraps.waitFor({ state: 'visible', timeout: 10000 });
    await this.classicBreakfastWraps.click();
  }
}
