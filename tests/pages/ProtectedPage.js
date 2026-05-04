import { getRequiredEnv } from '../utils/loadEnv.js';

export class ProtectedPage {
  constructor(page) {
    this.page = page;
    this.Card = ".card";
    this.SitePassword = "input[placeholder='Password']";
    this.SubmitBtn = ".button";
    this.CookiesClose = "button[aria-label='Close']";
    this.LanguageApplyBtn = ".Button__BaseButton-sc-cbhjo9-0.bQGVPR";
  }

  async clickIfVisible(locator, timeout = 5000) {
    try {
      await locator.first().waitFor({ state: 'visible', timeout });
      await locator.first().click({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  makeUrl(path = '/') {
    const baseUrl = getRequiredEnv('BASE_URL');
    return new URL(path, baseUrl).toString();
  }

  async openProtected(path = '/') {
    const sitePasswordValue = getRequiredEnv('SITE_PASSWORD');
    await this.page.goto(this.makeUrl(path), { waitUntil: 'domcontentloaded' });
    const passwordInput = this.page.locator(this.SitePassword).first();
    const submitButton = this.page.locator(this.SubmitBtn).first();

    await passwordInput.waitFor({ state: 'visible', timeout: 20000 });
    await submitButton.waitFor({ state: 'visible', timeout: 20000 });

    await passwordInput.fill(sitePasswordValue);
    await submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');

    if (await passwordInput.isVisible().catch(() => false)) {
      throw new Error(
        `Password protection step did not complete. Verify SITE_PASSWORD for ${this.makeUrl(path)}`
      );
    }

    await this.dismissLandingOverlays();
  }

  async passwordProtection() {
    await this.openProtected('/');
  }

  async passwordProtectionSignup() {
    await this.openProtected('/signup');
  }

  async dismissLandingOverlays() {
    await this.clickIfVisible(this.page.locator(this.CookiesClose), 10000);
    await this.clickIfVisible(
      this.page.getByRole('button', { name: /^Apply$/i }).or(this.page.locator(this.LanguageApplyBtn)),
      10000
    );
  }
};
