export class ProtectedPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL ?? 'https://staging-th-web.ca.rbi.tools/';
    this.sitePasswordValue = process.env.SITE_PASSWORD ?? 'rbi-tech';
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
    return new URL(path, this.baseUrl).toString();
  }

  async openProtected(path = '/') {
    await this.page.goto(this.makeUrl(path), { waitUntil: 'domcontentloaded' });
    await this.page.locator(this.SitePassword).fill(this.sitePasswordValue);
    await this.page.locator(this.SubmitBtn).click();
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
}
