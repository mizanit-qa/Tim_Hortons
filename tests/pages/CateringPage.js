import { expect } from '@playwright/test';

export class CateringPage {
  constructor(page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: /Tims Catering/i });
  }

  async expectCateringPageHeading() {
    await expect(this.pageHeading).toBeVisible();
  }
}
