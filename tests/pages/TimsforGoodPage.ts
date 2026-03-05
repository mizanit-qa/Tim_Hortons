import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class TimsforGoodPage {
  readonly page: Page;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: /Tims for Good/i });
  }

  async expectPageHeading(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
