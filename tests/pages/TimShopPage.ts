import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class TimShopPage {
  readonly page: Page;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: /Tim Shop/i });
  }

  async expectTimShopPageHeading(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
