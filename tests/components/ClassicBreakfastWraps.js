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

  async addToOrder() {
    await this.page
      .getByRole('main')
      .getByRole('button', { name: /Add.*Classic Breakfast Wrap.*to order/i })
      .click();
  }
}
