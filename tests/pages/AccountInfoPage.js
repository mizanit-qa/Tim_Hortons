/**
 * Account Info (/account/info) — profile fields and Sign Out.
 */
export class AccountInfoPage {
  constructor(page) {
    this.page = page;
    this.signOutLink = page.getByRole('link', { name: /^Sign Out$/i });
  }

  async signOut() {
    await this.signOutLink.click();
    await this.page.waitForURL(/signout/i, { timeout: 20000 });
  }
}
