export class HomePage {
  constructor(page) {
    this.page = page;
    this.menuLink = page.getByRole('link', { name: /^Menu$/i });
    this.timsforGoodLink = page
      .getByTestId('Tims for Good')
      .or(page.getByRole('link', { name: /Tims for Good/i }));
    this.timsCateringLink = page
      .getByTestId('Tims Catering')
      .or(page.getByRole('link', { name: /Tims Catering/i }));
    this.timShopLink = page
      .getByTestId('TimShop')
      .or(page.getByRole('link', { name: /TimShop|Tim Shop/i }));
    this.moreLink = page.getByTestId('More');
    this.cateringLink = this.timsCateringLink;
    this.baseUrl = process.env.BASE_URL;
    if (!this.baseUrl) {
      throw new Error('BASE_URL is required. Set it in .env (see .env.example).');
    }
  }

  async homepageMenu() {
    await this.menuLink.click({ timeout: 15000 }).catch(() => { });
    try {
      await this.page.waitForURL(/\/menu/i, { timeout: 8000 });
    } catch {
      await this.page.goto(new URL('/menu', this.baseUrl).toString(), { waitUntil: 'domcontentloaded' });
      await this.page.waitForURL(/\/menu/i, { timeout: 20000 });
    }
  }

  async waitForReady() {
    await this.menuLink.waitFor({ state: 'visible', timeout: 20000 });
  }

  async timsforGood() {
    await this.timsforGoodLink.first().click();
  }

  async timsCatering() {
    await this.cateringLink.first().click();
  }

  async timShop() {
    await this.timShopLink.first().click();
  }
}
