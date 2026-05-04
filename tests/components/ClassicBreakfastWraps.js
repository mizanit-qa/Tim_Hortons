export class ClassicBreakfastWraps {
  constructor(page) {
    this.page = page;
    const main = page.getByRole('main');
    this.selectQuantity = main.getByRole('button', { name: 'Select Quantity' });
  }


  async setQuantityTo(count) {
    await this.selectQuantity.click();
    const incrementBtn = this.page
      .getByRole('main')
      .getByRole('button', { name: /Increment.*Classic Breakfast Wrap/i });
    for (let i = 1; i < count; i++) {
      await incrementBtn.click();
    }
  }

  async selectNoHashbrown() {
    const main = this.page.getByRole('main');
    const hashbrownButton = main.getByRole('button', { name: /Hashbrown/i }).first();
    await hashbrownButton.click();
    const noHashbrownOption = main
      .getByRole('radio', { name: /No Hashbrown/i })
      .or(main.getByText(/No Hashbrown/i).first());
    await noHashbrownOption.first().click({ timeout: 10000 }).catch(async () => {
      await noHashbrownOption.first().click({ force: true, timeout: 10000 });
    });
  }

  async addToOrder() {
    await this.selectNoHashbrown();
    await this.page
      .getByRole('main')
      .getByRole('button', { name: /Add.*Classic Breakfast Wrap.*to order/i })
      .click();
  }
}
