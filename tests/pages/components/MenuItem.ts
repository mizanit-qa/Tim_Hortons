import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class MenuItems {
  readonly page: Page;
  readonly hotDrinksTile: Locator;
  readonly coldDrinksTile: Locator;
  readonly newandSeasonalTile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hotDrinksTile = page.getByRole('link', { name: /Hot Drinks/i });
    this.coldDrinksTile = page.getByRole('link', { name: /Cold Drinks/i });
    this.newandSeasonalTile = page.getByRole('link', { name: /New & Seasonal/i });
  }

  async openMenu(): Promise<void> {
    await expect(this.page).toHaveURL(/\/menu/i);
    await expect(this.hotDrinksTile).toBeVisible();
  }

  async clickHotDrinks(): Promise<void> {
    await expect(this.hotDrinksTile).toBeVisible({ timeout: 15000 });
    await this.hotDrinksTile.click();
  }

  async clickColdDrinks(): Promise<void> {
    await this.coldDrinksTile.click();
  }

  async clickNewAndSeasonal(): Promise<void> {
    await this.newandSeasonalTile.click();
  }
}
