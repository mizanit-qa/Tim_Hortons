import { expect } from '@playwright/test';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.SignInBtnLanding = page.getByRole("button", { name: /^Sign In$/ });
    this.LanguageSelector = page.getByRole("button", { name: /Language and region selector/i });
    this.CALanguageRadioBtn = page.locator("span[data-testid='dialog-button-en-ca_label_wrapper']");
    this.ApplyBtn = page.locator('div[role="dialog"]').getByRole('button', { name: /^Apply$/i });
    this.UserEmail = page.getByRole("textbox", { name: /email/i });
    this.SignInBtn = page.locator('[data-testid="sign-in-button"]')
      .or(page.getByRole('button', { name: /^sign in$/i }))
      .or(page.getByRole('button', { name: /continue|next|submit/i }));
    this.ValidationCode = page.locator('input[data-testid="OTP-code-input"]');
    this.SendNewCode = page.getByRole('button', { name: /send new code/i });
    this.ResendOtpCode = page.getByRole('button', { name: 'Resend Code' });
  }

  async gotoHome() {
    await this.page.goto("https://staging-th-web.ca.rbi.tools/", { waitUntil: "domcontentloaded" });
  }

  async userSignIn(email, code = "123456") {
    await this.SignInBtnLanding.click();
    if (await this.LanguageSelector.isVisible().catch(() => false)) {
      await this.LanguageSelector.click();
      await this.CALanguageRadioBtn.click();
      await this.ApplyBtn.click();
    }
    await expect(this.UserEmail).toBeVisible({ timeout: 15000 });
    await this.UserEmail.fill(email);
    await expect(this.SignInBtn).toBeVisible({ timeout: 15000 });
    await expect(this.SignInBtn).toBeEnabled({ timeout: 15000 });
    await this.SignInBtn.click();
    await this.ValidationCode.fill(code);
  }

  async nonExistingUserSignIn(email) {
    await this.SignInBtnLanding.click();
    if (await this.LanguageSelector.isVisible().catch(() => false)) {
      await this.LanguageSelector.click();
      await this.CALanguageRadioBtn.click();
      await this.ApplyBtn.click();
    }
    await expect(this.UserEmail).toBeVisible({ timeout: 15000 });
    await this.UserEmail.fill(email);
    await expect(this.SignInBtn).toBeVisible({ timeout: 15000 });
    await expect(this.SignInBtn).toBeEnabled({ timeout: 15000 });
    await this.SignInBtn.click();
  }

  async userSignInBadCode(email, code = "000000") {
    await this.SignInBtnLanding.click();
    if (await this.LanguageSelector.isVisible().catch(() => false)) {
      await this.LanguageSelector.click();
      await this.CALanguageRadioBtn.click();
      await this.ApplyBtn.click();
    }
    await expect(this.UserEmail).toBeVisible({ timeout: 15000 });
    await this.UserEmail.fill(email);
    await expect(this.SignInBtn).toBeVisible({ timeout: 15000 });
    await expect(this.SignInBtn).toBeEnabled({ timeout: 15000 });
    await this.SignInBtn.click();
    await this.ValidationCode.fill(code);
  }

  async sendNewOtp() {
    await this.SendNewCode.click();
  }

  async resendCode() {
    await this.ResendOtpCode.click();
  }
}
