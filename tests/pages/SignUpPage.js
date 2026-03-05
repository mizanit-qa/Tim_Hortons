export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.joinNowTab = page.getByTestId('join-now-tab');
    this.firstNameInput = page.getByTestId('signup-name-input');
    this.signupEmailInput = page.getByTestId('signup-email-input');
    this.signupOptionalInfoLink = page.getByTestId('accordion-item-title');
    this.signupYear = page.getByTestId('signup-dob-year');
    this.signupMonth = page.getByTestId('signup-dob-month');
    this.signupDay = page.getByTestId('signup-dob-day');
    this.checkboxEmailReceive = page.getByTestId('check-component').nth(0);
    this.checkboxAgreed = page.getByTestId('check-component').nth(1);
    this.createAccountBtn = page.getByTestId('signup-button');
    this.helpCentreLink = page.getByRole('link', { name: 'Help Centre' });
  }

  async helpCentre() {
    await this.helpCentreLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.goBack();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async signupShort(firstname, email) {
    await this.joinNowTab.click();
    await this.firstNameInput.fill(firstname);
    await this.signupEmailInput.fill(email);
    await this.checkboxAgreed.check();
    await this.createAccountBtn.click();
  }

  async signupOptionInfo(firstname, email) {
    await this.joinNowTab.click();
    await this.firstNameInput.fill(firstname);
    await this.signupEmailInput.fill(email);
    await this.checkboxAgreed.check();
    await this.signupOptionalInfoLink.click();
    await this.signupYear.fill('2000');
    await this.signupMonth.fill('10');
    await this.signupDay.fill('11');
    await this.checkboxEmailReceive.check();
    await this.checkboxAgreed.check();
    await this.createAccountBtn.click();
  }
}
