import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.menuGrid = page.getByTestId('menu-tile-grid');
    this.menuTiles = this.menuGrid.locator('a');
    this.cartButton = page.getByTestId('cart-button-desktop');
  }

  async waitForLoaded() {
    await expect(this.menuGrid).toBeVisible({ timeout: 15000 });
  }

  async getMenuTileNames() {
    await this.waitForLoaded();
    return await this.menuTiles.allTextContents();
  }

  async clickTile(name) {
    await this.waitForLoaded();
    await this.menuGrid.getByRole('link', { name }).click();
  }

  async clickCartAndCheckout() {
    await this.cartButton.click();
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
