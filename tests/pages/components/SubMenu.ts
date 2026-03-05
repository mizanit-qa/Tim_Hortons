import type { Page, Locator } from '@playwright/test';

export class Submenu {
  readonly page: Page;
  readonly brewedCoffeeTile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brewedCoffeeTile = page.getByRole('link', { name: /Brewed Coffee/i }).first();
  }

  async clickBrewedCoffee(): Promise<void> {
    await this.brewedCoffeeTile.waitFor({ state: 'attached' });
    await this.brewedCoffeeTile.click();
  }
}
