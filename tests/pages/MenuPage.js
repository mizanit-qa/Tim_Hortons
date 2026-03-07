import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.menuGrid = page.getByTestId('menu-tile-grid');
    this.menuTiles = this.menuGrid.locator('a');
    this.cartButtonDesktop = page.getByTestId('cart-button-desktop');
    this.cartButtonPreview = page.getByRole('button', { name: /Shopping cart preview/i });
    this.cartButtonBottomBar = page.getByRole('button', { name: /Cart total/i });
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
    const candidates = [
      this.cartButtonDesktop,
      this.cartButtonPreview,
      this.cartButtonBottomBar
    ];
    for (const candidate of candidates) {
      if (await candidate.first().isVisible().catch(() => false)) {
        if (await candidate.first().isEnabled().catch(() => false)) {
          await candidate.first().click();
          break;
        }
      }
    }
    const checkoutBtn = this.page.getByRole('button', { name: /Checkout/i }).first();
    if (await checkoutBtn.isVisible().catch(() => false)) {
      await checkoutBtn.click();
    }
  }
}
