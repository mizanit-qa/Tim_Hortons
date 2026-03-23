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

      this.confirmYourStorePlaceOrderButton = page.getByTestId('place-order');
    }

    async selectVisaCard() {
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.paymentDropdownToggle.click({ force: true });
        }
        const primaryVisible = await this.visaOption.isVisible().catch(() => false);
        if (primaryVisible) {
            await this.visaOption.click({ force: true });
            return;
        }
        const fallbackVisible = await this.visaOptionFallback.isVisible().catch(() => false);
        if (fallbackVisible) {
            await this.visaOptionFallback.click({ force: true });
            return;
        }
        const anywhereVisible = await this.visaOptionFallbackAnywhere.isVisible().catch(() => false);
        if (anywhereVisible) {
            await this.visaOptionFallbackAnywhere.click({ force: true });
            return;
        }
        // Prefer attached over visible — rows can be in DOM but obscured / not "visible" to Playwright
        await Promise.race([
            this.visaOption.waitFor({ state: 'attached', timeout: 15000 }),
            this.visaOptionFallback.waitFor({ state: 'attached', timeout: 15000 }),
            this.visaOptionFallbackAnywhere.waitFor({ state: 'attached', timeout: 15000 })
        ]).catch(() => {});
        const countPrimary = await this.visaOption.count();
        if (countPrimary > 0) {
            await this.visaOption.click({ force: true });
        } else if ((await this.visaOptionFallback.count()) > 0) {
            await this.visaOptionFallback.click({ force: true });
        } else if ((await this.visaOptionFallbackAnywhere.count()) > 0) {
            await this.visaOptionFallbackAnywhere.click({ force: true });
        } else {
            throw new Error('Visa payment option not found. Tried payment-method row and button with name Visa.');
        }
    }

    async selectMastercard() {
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.paymentDropdownToggle.click({ force: true });
        }
        await this.mastercardOption.waitFor({ state: 'visible', timeout: 15000 });
        await this.mastercardOption.click({ force: true });
    }

    async selectTimsGiftCard() {
        if (await this.paymentDropdownToggle.isVisible().catch(() => false)) {
            await this.paymentDropdownToggle.click({ force: true });
        }
        await this.timGiftCardRow.waitFor({ state: 'visible', timeout: 15000 });
        await this.timGiftCardRow.click();
    }

    async continueToOrder() {
        await this.continueOrderButton.click();
    }

    async confirmYourStorePlaceOrder() {
        await this.confirmYourStorePlaceOrderButton.click();
    }

  }