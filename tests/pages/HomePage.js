import { getRequiredEnv } from '../utils/loadEnv.js';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.menuLink = page.getByRole('link', { name: /^Menu$/i });
    this.timsforGoodLink = page.getByTestId('Tims for Good').or(page.getByRole('link', { name: /Tims for Good/i }));
    this.timsCateringLink = page.getByTestId('Tims Catering').or(page.getByRole('link', { name: /Tims Catering/i }));
    this.timShopLink = page.getByTestId('TimShop').or(page.getByRole('link', { name: /TimShop|Tim Shop/i }));
    this.moreLink = page.getByTestId('More');
    this.cateringLink = this.timsCateringLink;
    // Signed-in header: tooltip "My Account" or link href /account (profile)
    this.myAccountLink = page
      .getByRole('link', { name: /My Account/i })
      .or(page.locator('a[href$="/account"]').first());
  }

  get baseUrl() {
    return getRequiredEnv('BASE_URL');
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

  async waitForSignedIn() {
    await this.myAccountLink.first().waitFor({ state: 'visible', timeout: 30000 });
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

  /** Opens My Account from the header; lands on /account (not /account/info) */
  async openMyAccount() {
    await this.myAccountLink.first().click({ timeout: 15000 });
    await this.page.waitForURL(/\/account\/?$/i, { timeout: 20000 });
  }
}
