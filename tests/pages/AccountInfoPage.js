/**
 * Account Info (/account/info) — profile fields and Sign Out.
 */
export class AccountInfoPage {
  constructor(page) {
    this.page = page;
    this.signOutLink = page.getByRole('link', { name: /^Sign Out$/i });
    this.signOutYesBtn = page.getByRole('button', { name: /^Yes$/i });
  }

  async signOut() {
    await this.signOutLink.click();
    await this.signOutYesBtn.waitFor({ state: 'visible', timeout: 20000 });
  }

  async signOutYes() {
    await this.signOutYesBtn.click();
    await this.page.waitForURL(/signin|signout/i, { timeout: 20000 });
  }

}
