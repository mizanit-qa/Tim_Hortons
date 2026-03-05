import type { Page, Locator } from '@playwright/test';

export class NestedSubMenu {
  readonly page: Page;
  readonly brewedCoffee: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brewedCoffee = page.locator("//span[normalize-space()='Brewed Coffee']");
  }

  async clickBrewedCoffee(): Promise<void> {
    await this.brewedCoffee.click();
  }
}
