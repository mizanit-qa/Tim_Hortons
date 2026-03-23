/**
 * My Account hub (/account) — list of account sections (Tims Rewards, Account Info, etc.).
 */
export class AccountPage {
  constructor(page) {
    this.page = page;
    this.accountInfoLink = page.getByRole('link', { name: /^Account Info$/i });
  }

  async openAccountInfo() {
    await this.accountInfoLink.click();
    await this.page.waitForURL(/\/account\/info/i, { timeout: 20000 });
  }
}
