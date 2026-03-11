export class ProtectedPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = this.readEnv('BASE_URL');
    this.sitePasswordValue = this.readEnv('SITE_PASSWORD');
    if (!this.baseUrl) {
      throw new Error('BASE_URL is required. Set it in .env (see .env.example).');
    }
    if (!this.sitePasswordValue) {
      throw new Error('SITE_PASSWORD is required. Set it in .env (see .env.example).');
    }
    this.Card = ".card";
    this.SitePassword = "input[placeholder='Password']";
    this.SubmitBtn = ".button";
    this.CookiesClose = "button[aria-label='Close']";
    this.LanguageApplyBtn = ".Button__BaseButton-sc-cbhjo9-0.bQGVPR";
  }

  readEnv(key, fallback) {
    const value = process.env[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
    return fallback;
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
    return new URL(path, this.baseUrl).toString();
  }

  async openProtected(path = '/') {
    await this.page.goto(this.makeUrl(path), { waitUntil: 'domcontentloaded' });
    const passwordInput = this.page.locator(this.SitePassword).first();
    const submitButton = this.page.locator(this.SubmitBtn).first();

    await passwordInput.waitFor({ state: 'visible', timeout: 20000 });
    await submitButton.waitFor({ state: 'visible', timeout: 20000 });

    await passwordInput.fill(this.sitePasswordValue);
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
