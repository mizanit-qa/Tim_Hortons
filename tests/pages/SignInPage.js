import { expect } from '@playwright/test';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.defaultOtpCode = process.env.TEST_OTP;
    this.defaultBadOtpCode = process.env.TEST_BAD_OTP;
    if (!this.baseUrl) {
      throw new Error('BASE_URL is required. Set it in .env (see .env.example).');
    }
    if (!this.defaultOtpCode) {
      throw new Error('TEST_OTP is required. Set it in .env (see .env.example).');
    }
    if (!this.defaultBadOtpCode) {
      throw new Error('TEST_BAD_OTP is required. Set it in .env (see .env.example).');
    }
    this.SignInBtnLanding = page
      .getByRole('button', { name: /^Sign In$/ })
      .or(page.getByRole('link', { name: /^Sign In$/ }))
      .or(page.getByText(/^Sign In$/));
    this.LanguageSelector = page.getByRole("button", { name: /Language and region selector/i });
    this.CALanguageRadioBtn = page.locator("span[data-testid='dialog-button-en-ca_label_wrapper']");
    this.ApplyBtn = page.locator('div[role="dialog"]').getByRole('button', { name: /^Apply$/i });
    this.UserEmail = page.getByRole("textbox", { name: /email/i });
    this.SignInBtn = page.getByTestId('signin-button');
    this.ValidationCode = page.locator('input[data-testid="OTP-code-input"]');
    this.SendNewCode = page.getByRole('button', { name: /send new code/i });
    this.ResendOtpCode = page.getByRole('button', { name: 'Resend Code' });
  }

  async gotoHome() {
    await this.page.goto(this.baseUrl, { waitUntil: "domcontentloaded" });
  }

  async enterEmailAndContinue(email) {
    await this.SignInBtnLanding.first().waitFor({ state: 'visible', timeout: 20000 });
    await this.SignInBtnLanding.first().click({ timeout: 10000 }).catch(async () => {
      // Overlay layers can block pointer events on first attempt.
      await this.SignInBtnLanding.first().click({ force: true, timeout: 10000 });
    });
    if (await this.LanguageSelector.isVisible().catch(() => false)) {
      await this.LanguageSelector.click();
      await this.CALanguageRadioBtn.click();
      await this.ApplyBtn.click();
    }
    await expect(this.UserEmail).toBeVisible({ timeout: 15000 });
    await this.UserEmail.fill(email);
    const submitBtn = this.SignInBtn.or(
      this.page.getByRole('tabpanel', { name: /sign in/i }).getByRole('button', { name: /^Sign In$/ })
    );
    await expect(submitBtn.first()).toBeVisible({ timeout: 15000 });
    await expect(submitBtn.first()).toBeEnabled({ timeout: 15000 });
    await submitBtn.first().click();
  }

  async userSignIn(email, code = this.defaultOtpCode) {
    await this.enterEmailAndContinue(email);
    await this.ValidationCode.waitFor({ state: 'visible', timeout: 30000 });
    await this.ValidationCode.fill(code);
  }

  async nonExistingUserSignIn(email) {
    await this.enterEmailAndContinue(email);
  }

  async userSignInBadCode(email, code = this.defaultBadOtpCode) {
    await this.enterEmailAndContinue(email);
    await this.ValidationCode.waitFor({ state: 'visible', timeout: 30000 });
    await this.ValidationCode.fill(code);
  }

  async sendNewOtp() {
    await this.SendNewCode.click();
  }

  async resendCode() {
    await this.ResendOtpCode.click();
  }
}
