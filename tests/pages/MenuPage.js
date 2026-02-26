import { expect } from '@playwright/test';

exports.MenuPage = class MenuPage {

    constructor(page) {
        this.page = page;
        this.menuGrid = page.getByTestId('menu-tile-grid');
        this.menuTiles = this.menuGrid.locator('a'); // each tile is a link
    }

    async waitForLoaded() {
        await expect(this.menuGrid).toBeVisible({ timeout: 15000 });
    }

    async getMenuTileNames() {
        await this.waitForLoaded();
        // returns array of strings
        return await this.menuTiles.allTextContents();
    }

    async clickTile(name) {
        await this.waitForLoaded();
        await this.menuGrid.getByRole('link', { name }).click();
    }


}