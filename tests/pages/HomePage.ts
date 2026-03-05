import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly menuLink: Locator;
  readonly timsforGoodLink: Locator;
  readonly timsCateringLink: Locator;
  readonly timShopLink: Locator;
  readonly moreLink: Locator;
  readonly cateringLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuLink = page.locator("//a[normalize-space()='Menu']");
    this.timsforGoodLink = page.getByTestId('Tims for Good');
    this.timsCateringLink = page.getByTestId('Tims Catering');
    this.timShopLink = page.getByTestId('TimShop');
    this.moreLink = page.getByTestId('More');
    this.cateringLink = page.getByTestId('Tims Catering');
  }

  async homepageMenu(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/menu/i, { timeout: 15000 }),
      this.menuLink.click()
    ]);
  }

  async timsforGood(): Promise<void> {
    await this.timsforGoodLink.click();
  }

  async timsCatering(): Promise<void> {
    await this.cateringLink.click();
  }

  async timShop(): Promise<void> {
    await this.timShopLink.click();
  }
}
