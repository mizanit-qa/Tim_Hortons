import { expect } from '@playwright/test';

export class MenuItems {
  constructor(page) {
    this.page = page;
    this.hotDrinksTile = page.getByRole('link', { name: /Hot Drinks/i });
    this.coldDrinksTile = page.getByRole('link', { name: /Cold Drinks/i });
    this.newandSeasonalTile = page.getByRole('link', { name: /New & Seasonal/i });
    this.bakedGoodsTile = page.getByRole('link', { name: /Baked Goods/i });
    this.breakfastTile = page.getByRole('link', { name: /Breakfast/i });
  }

  async openMenu() {
    await expect(this.page).toHaveURL(/\/menu/i);
    await expect(this.hotDrinksTile).toBeVisible();
  }

  async clickHotDrinks() {
    await expect(this.hotDrinksTile).toBeVisible({ timeout: 30000 });
    await this.hotDrinksTile.click();
  }

  async clickColdDrinks() {
    await this.coldDrinksTile.click();
  }

  async clickNewAndSeasonal() {
    await this.newandSeasonalTile.click();
  }

  async clickBakedGoods() {
    await this.bakedGoodsTile.click();
  }

  async clickBreakfast() {
    await this.breakfastTile.click();
  }
}
