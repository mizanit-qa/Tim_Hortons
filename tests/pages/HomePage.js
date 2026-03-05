export class HomePage {
  constructor(page) {
    this.page = page;
    this.menuLink = page.locator("//a[normalize-space()='Menu']");
    this.timsforGoodLink = page.getByTestId('Tims for Good');
    this.timsCateringLink = page.getByTestId('Tims Catering');
    this.timShopLink = page.getByTestId('TimShop');
    this.moreLink = page.getByTestId('More');
    this.cateringLink = page.getByTestId('Tims Catering');
  }

  async homepageMenu() {
    await Promise.all([
      this.page.waitForURL(/\/menu/i, { timeout: 20000 }),
      this.menuLink.click()
    ]);
  }

  async timsforGood() {
    await this.timsforGoodLink.click();
  }

  async timsCatering() {
    await this.cateringLink.click();
  }

  async timShop() {
    await this.timShopLink.click();
  }
}
