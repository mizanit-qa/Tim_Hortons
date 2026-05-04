export class OrderPaymentPage {
    constructor(page) {
      this.page = page;
  
      // Payment section
      this.paymentSection = page.getByTestId('cart-payment');
      this.paymentMethodsContainer = page.getByTestId('payment-methods');
  
      // Dropdown toggle
      this.paymentDropdownToggle = page.getByTestId('display-toggle-payment-method');
  
      // Currently selected method (Gift Card row)
      this.timGiftCardRow = page.getByText(/Tims Gift Card/i);
  
      // Dropdown options (payment-method row to avoid matching <title> / add-new-cc-link)
      this.mastercardOption = page.locator('[data-testid^="payment-method-"]').filter({ hasText: /MASTERCARD/i }).first();
      this.visaOption = page.locator('[data-testid^="payment-method-"]').filter({ hasText: /VISA/i }).first();
      // Fallback when payment methods use different markup (no data-testid pattern)
      this.visaOptionFallback = page.getByTestId('cart-payment').getByRole('button', { name: /Visa/i }).first();
      this.visaOptionFallbackAnywhere = page.getByRole('button', { name: /Visa/i }).first();
      this.addNewPaymentMethodOption = page.getByText(/Add New Payment Method/i);
  
      // Specific card endings (more stable)
      this.mastercard2236 = page.getByText(/2236/);
      this.visa4448 = page.getByText(/4448/);
  
      // Gift card details
      this.giftCardAlias = page.getByTestId('prepaid-card-alias');
  
      // Totals
      this.grandTotal = page.getByTestId('grand-total');
  
      // Continue button
      this.continueOrderButton = page.getByTestId('continue-order');

      this.confirmYourStorePlaceOrderButton = page
        .getByTestId('place-order')
        .or(page.getByRole('button', { name: /Place Order|Confirm|Submit Order/i }));
    }

    async waitForPaymentReady(timeout = 20000) {
        await this.paymentSection.first().waitFor({ state: 'visible', timeout });
        // On some builds methods render in either container or direct buttons.
        await Promise.race([
            this.paymentMethodsContainer.first().waitFor({ state: 'visible', timeout }),
            this.paymentDropdownToggle.waitFor({ state: 'visible', timeout }),
            this.visaOption.waitFor({ state: 'attached', timeout }),
            this.visaOptionFallback.waitFor({ state: 'attached', timeout }),
            this.visaOptionFallbackAnywhere.waitFor({ state: 'attached', timeout }),
        ]).catch(() => {});
    }

    async selectVisaCard() {
        await this.waitForPaymentReady(15000);
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.clickWithFallback(this.paymentDropdownToggle);
        }
        const primaryVisible = await this.visaOption.isVisible().catch(() => false);
        if (primaryVisible) {
            await this.clickWithFallback(this.visaOption);
            return;
        }
        const fallbackVisible = await this.visaOptionFallback.isVisible().catch(() => false);
        if (fallbackVisible) {
            await this.clickWithFallback(this.visaOptionFallback);
            return;
        }
        const anywhereVisible = await this.visaOptionFallbackAnywhere.isVisible().catch(() => false);
        if (anywhereVisible) {
            await this.clickWithFallback(this.visaOptionFallbackAnywhere);
            return;
        }
        // Prefer attached over visible — rows can be in DOM but obscured / not "visible" to Playwright
        await Promise.race([
            this.visaOption.waitFor({ state: 'attached', timeout: 6000 }),
            this.visaOptionFallback.waitFor({ state: 'attached', timeout: 6000 }),
            this.visaOptionFallbackAnywhere.waitFor({ state: 'attached', timeout: 6000 })
        ]).catch(() => {});
        const countPrimary = await this.visaOption.count();
        if (countPrimary > 0) {
            await this.clickWithFallback(this.visaOption);
        } else if ((await this.visaOptionFallback.count()) > 0) {
            await this.clickWithFallback(this.visaOptionFallback);
        } else if ((await this.visaOptionFallbackAnywhere.count()) > 0) {
            await this.clickWithFallback(this.visaOptionFallbackAnywhere);
        } else {
            throw new Error('Visa payment option not found. Tried payment-method row and button with name Visa.');
        }
    }

    async selectMastercard() {
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.clickWithFallback(this.paymentDropdownToggle);
        }
        await this.mastercardOption.waitFor({ state: 'visible', timeout: 15000 });
        await this.clickWithFallback(this.mastercardOption);
    }

    async selectTimsGiftCard() {
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.clickWithFallback(this.paymentDropdownToggle);
        }
        await this.timGiftCardRow.waitFor({ state: 'visible', timeout: 15000 });
        await this.clickWithFallback(this.timGiftCardRow);
    }

    async continueToOrder() {
        await this.dismissCookieBanner();
        await this.clickWithFallback(this.continueOrderButton);
    }

    async confirmYourStorePlaceOrder() {
        await this.dismissCookieBanner();
        await this.clickWithFallback(this.confirmYourStorePlaceOrderButton);
    }

    async dismissCookieBanner() {
        const acceptAll = this.page.getByRole('button', { name: /Accept All/i }).first();
        const close = this.page
            .getByRole('button', { name: /^Close$/i })
            .or(this.page.locator('button[aria-label="Close"]'))
            .first();
        await acceptAll.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        if (await acceptAll.isVisible().catch(() => false)) {
            await acceptAll.click({ timeout: 5000 }).catch(async () => {
                await acceptAll.click({ force: true, timeout: 5000 }).catch(() => {});
            });
            return;
        }
        if (await close.isVisible().catch(() => false)) {
            await close.click({ timeout: 5000 }).catch(async () => {
                await close.click({ force: true, timeout: 5000 }).catch(() => {});
            });
        }
    }

    async clickWithFallback(locator, timeout = 8000) {
        await locator.waitFor({ state: 'attached', timeout });
        try {
            await locator.click({ timeout });
        } catch {
            await locator.scrollIntoViewIfNeeded().catch(() => {});
            await locator.click({ force: true, timeout });
        }
    }

  }
