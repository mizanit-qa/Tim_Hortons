export class BlackColdBrew {
  constructor(page) {
    this.page = page;
    const main = page.getByRole('main');
    this.coffeeSize = main.getByRole('button', { name: 'Size Medium' });
    this.reusableCup = main.getByRole('button', { name: 'Bringing a Clean Reusable Cup? No' });
    this.selectQuantity = main.getByRole('button', { name: 'Select Quantity' });
  }

  async sizeSelection() {
    await this.coffeeSize.click();
    await this.clickWithFallback(this.page.getByRole('main').getByRole('radio', { name: /Large/ }));
  }

  async reusableCupSelection() {
    await this.reusableCup.click();
    await this.clickWithFallback(this.page.getByRole('main').getByRole('radio', { name: /Yes/ }));
  }

  async setQuantityTo(count) {
    await this.selectQuantity.click();
    const incrementBtn = this.page.getByRole('main').getByRole('button', { name: 'Increment Boston Cream Donut' });
    for (let i = 1; i < count; i++) {
      await incrementBtn.click();
      //await incrementBtn.click();
    }
  }

  async addToOrder() {
    await this.page.getByRole('main').getByRole('button', { name: /Add.*Boston Cream Donut to order/ }).click();
  }
}
