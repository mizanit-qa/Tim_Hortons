import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly menuGrid: Locator;
  readonly menuTiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuGrid = page.getByTestId('menu-tile-grid');
    this.menuTiles = this.menuGrid.locator('a');
  }

  async waitForLoaded(): Promise<void> {
    await expect(this.menuGrid).toBeVisible({ timeout: 15000 });
  }

  async getMenuTileNames(): Promise<string[]> {
    await this.waitForLoaded();
    return await this.menuTiles.allTextContents();
  }

  async clickTile(name: string | RegExp): Promise<void> {
    await this.waitForLoaded();
    await this.menuGrid.getByRole('link', { name }).click();
  }
}
