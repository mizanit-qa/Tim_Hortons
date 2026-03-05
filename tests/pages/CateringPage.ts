import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class CateringPage {
  readonly page: Page;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: /Tims Catering/i });
  }

  async expectCateringPageHeading(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
