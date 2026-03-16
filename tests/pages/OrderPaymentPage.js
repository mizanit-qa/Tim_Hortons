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
    }

    async selectVisaCard() {
        await this.paymentDropdownToggle.click({ force: true });
        await this.visaOption.waitFor({ state: 'visible' });
        await this.visaOption.click({ force: true });
    }

    async selectMastercard() {
        await this.paymentDropdownToggle.click({ force: true });
        await this.mastercardOption.click();
    }

    async selectTimsGiftCard() {
        await this.paymentDropdownToggle.click({ force: true });
        await this.timGiftCardRow.click();
    }

    async continueToOrder() {
        await this.continueOrderButton.click();
    }



  }