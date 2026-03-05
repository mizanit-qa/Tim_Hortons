import { expect } from '@playwright/test';

export class MenuItems {

    constructor(page) {
        this.page = page;
        this.hotDrinksTile = page.getByRole('link', { name: /Hot Drinks/i });
        this.coldDrinksTile = page.getByRole('link', { name: /Cold Drinks/i });
        this.newandSeasonalTile = page.getByRole('link', { name: /New & Seasonal/i });

    }

    async openMenu() {
        await this.menuLink.click();
        await expect(this.page).toHaveURL(/\/menu/i);
        await expect(this.hotDrinksTile).toBeVisible();
    }

    async clickHotDrinks() {
        await expect(this.hotDrinksTile).toBeVisible({ timeout: 15000 });
        await this.hotDrinksTile.click();
    }

    async clickColdDrinks() {
        await this.coldDrinksTile.click();
    }

    async clickNewAndSeasonal() {
        await this.newandSeasonalTile.click();
    }

}


