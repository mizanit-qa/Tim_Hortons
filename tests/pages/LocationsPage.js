import { getRequiredEnv } from '../utils/loadEnv.js';

export class LocationsPage {
  constructor(page) {
    this.page = page;

    // May render as button or link; bottom bar often says "Choose a Location"
    this.pickUpButton = page
      .getByRole('button', { name: /Choose a Location|Pick Up|Location/i })
      .or(page.getByRole('link', { name: /Choose a Location|Pick Up|Location/i }));
    this.selectedStoreChip = page.getByRole('button', { name: /Pick Up\s+1500|Pick Up\s+\d+/i });
    this.yourAddress = page
      .getByRole('textbox', { name: /your address/i })
      .or(page.getByTestId('storelocator-autocomplete'));
    /** Any common autocomplete dropdown option (Downshift, Reach, native listbox) */
    this.autocompleteOptions = page.locator(
      [
        '[id^="downshift"][id$="-menu"] [role="option"]',
        '[role="listbox"] [role="option"]',
        '[role="menu"] [role="option"]',
        '[data-testid*="autocomplete"] [role="option"]',
        'ul[role="listbox"] > li[role="option"]',
      ].join(', ')
    );
    this.storeOrderBtn = page.getByRole('button', { name: /^Order$|Order Here|Start Order/i });
  }

  getStoreConfig() {
    const address = getRequiredEnv(
      'TEST_STORE_ADDRESS',
      'TEST_STORE_ADDRESS is required for store selection. Set it in .env (see .env.example).'
    );
    const storeName = getRequiredEnv(
      'TEST_STORE_NAME',
      'TEST_STORE_NAME is required for store selection. Set it in .env (see .env.example).'
    );
    return {
      address,
      namePattern: new RegExp(storeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    };
  }

  async storeSelection() {
    const store = this.getStoreConfig();
    await this.page.waitForLoadState('domcontentloaded');
    const storeAlreadySelected = this.page.getByText(store.address, { exact: false }).first();
    const activeOrder = this.page
      .getByRole('button', { name: /Order Placed|Your order is being prepared/i })
      .or(this.page.getByText(/Order Placed|Your order is being prepared/i))
      .first();
    await activeOrder.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (
      await storeAlreadySelected.isVisible().catch(() => false) ||
      await activeOrder.isVisible().catch(() => false)
    ) {
      await this.page.goto(new URL('/menu', getRequiredEnv('BASE_URL')).toString(), { waitUntil: 'domcontentloaded' });
      return;
    }

    // Store row: accessible name often differs from TEST_STORE_NAME (extra words, formatting).
    const storeAccordionBtn = this.page
      .getByRole('button', { name: store.namePattern })
      .or(this.page.getByRole('link', { name: store.namePattern }))
      .or(this.page.locator('[role="button"]').filter({ hasText: store.namePattern }))
      .or(this.page.getByText(store.namePattern))
      .first();

    const pickUp = this.pickUpButton.first();
    await pickUp.waitFor({ state: 'visible', timeout: 30000 });
    await pickUp.scrollIntoViewIfNeeded();
    await this.clickWithFallback(pickUp, 30000);
    await this.yourAddress.first().waitFor({ state: 'visible', timeout: 30000 });
    await this.dismissCookieBanner();
    await this.yourAddress.click();
    await this.yourAddress.fill('');
    await this.yourAddress.fill(store.address);
    await this.yourAddress.first().waitFor({ state: 'visible', timeout: 5000 });
    // Some comboboxes only open the list after keystrokes / debounce
    await this.yourAddress.press('ArrowDown').catch(() => {});
    const firstOpt = this.autocompleteOptions.first();
    await firstOpt.waitFor({ state: 'visible', timeout: 20000 });
    await firstOpt.click({ timeout: 20000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await this.clickWithFallback(storeAccordionBtn, 30000);
    await this.clickWithFallback(this.storeOrderBtn.first(), 30000);
    await this.page.goto(new URL('/menu', getRequiredEnv('BASE_URL')).toString(), { waitUntil: 'domcontentloaded' });
  }

  async dismissCookieBanner() {
    const acceptAll = this.page.getByRole('button', { name: /Accept All/i }).first();
    const close = this.page
      .getByRole('button', { name: /^Close$/i })
      .or(this.page.locator('button[aria-label="Close"]'))
      .first();
    await acceptAll.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await acceptAll.isVisible().catch(() => false)) {
      await acceptAll.click({ timeout: 5000 }).catch(async () => {
        await acceptAll.click({ force: true, timeout: 5000 }).catch(() => {});
      });
      return;
    }
    await close.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    if (await close.isVisible().catch(() => false)) {
      await close.click({ timeout: 5000 }).catch(async () => {
        await close.click({ force: true, timeout: 5000 }).catch(() => {});
      });
    }
  }

  async clickWithFallback(locator, timeout = 10000) {
    await locator.waitFor({ state: 'attached', timeout });
    try {
      await locator.click({ timeout });
    } catch {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      await locator.click({ force: true, timeout });
    }
  }
}
