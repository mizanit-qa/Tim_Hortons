export class BrewedCoffee {
  constructor(page) {
    this.page = page;
    const main = page.getByRole('main');
    this.coffeeSize = main.getByRole('button', { name: 'Size Medium' });
    this.coffeeBlend = main.getByRole('button', { name: 'Coffee Blend Original Blend' });
    this.reusableCup = main.getByRole('button', { name: 'Bringing a Clean Reusable Cup? No' });
    this.black = main.getByRole('button', { name: 'Black' });
    this.regular = main.getByRole('button', { name: 'Regular' });
    this.doubleDouble = main.getByRole('button', { name: 'Double Double' });
    this.tripleTriple = main.getByRole('button', { name: 'Triple Triple' });
    this.dairyAlternatives = main.getByRole('button', { name: 'Dairy & Alternatives' });
    this.sweeteners = main.getByRole('button', { name: 'Sweeteners' });
    this.espressoShots = main.getByRole('button', { name: /Espresso Shots/ });
    this.flavourShots = main.getByRole('button', { name: 'Flavour Shots' });
    this.toppings = main.getByRole('button', { name: 'Toppings' });
    this.selectQuantity = main.getByRole('button', { name: 'Select Quantity' });
  }

  async sizeSelection() {
    await this.coffeeSize.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Small/ }).click({ force: true });
  }

  async blendSelection() {
    await this.coffeeBlend.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Decaf/ }).click({ force: true });
  }

  async reusableCupSelection() {
    await this.reusableCup.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Yes/ }).click({ force: true });
  }

  async blackSelection() {
    await this.page.getByRole('main').getByText('Black', { exact: true }).click();
  }

  async regularSelection() {
    await this.page.getByRole('main').getByText('Regular', { exact: true }).click();
  }

  async doubleDoubleSelection() {
    await this.page.getByRole('main').getByText('Double Double', { exact: true }).click();
  }

  async tripleTripleSelection() {
    await this.page.getByRole('main').getByText('Triple Triple', { exact: true }).click();
  }

  async addCream() {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Cream' }).click();
  }

  async addWholeMilk() {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Whole Milk' }).click();
  }

  async addTwoPercentMilk() {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment 2% Milk' }).click();
  }

  async addSkimMilk() {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Skim Milk' }).click();
  }

  async addSugar() {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Sugar' }).click();
  }

  async addSweetener() {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Sweetener' }).click();
  }

  async addHoney() {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Honey' }).click();
  }

  async addEspressoShot() {
    await this.espressoShots.click();
    await this.page.getByRole('main').getByRole('button', { name: /Increment.*Espresso/ }).first().click();
  }

  async addDecafEspressoShot() {
    const expander = this.page.getByRole('main').getByRole('button', { name: /Espresso Shots/ });
    await expander.click({ timeout: 5000 }).catch(() => {});
    const btn = this.page.getByRole('main').getByRole('button', { name: 'Increment Decaf Espresso Shot' });
    await btn.click({ timeout: 5000 }).catch(() => {});
  }

  async addChocolateSyrup() {
    await this.flavourShots.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Chocolate Syrup' }).click();
  }

  async addWhippedTopping() {
    await this.toppings.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Whipped Topping' }).click();
  }

  async addOreoCrumble() {
    await this.toppings.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Oreo Crumble' }).click();
  }

  async setQuantityTo(count) {
    await this.selectQuantity.click();
    const incrementBtn = this.page.getByRole('main').getByRole('button', { name: 'Increment Brewed Coffee' });
    for (let i = 1; i < count; i++) {
      await incrementBtn.click();
    }
  }

  async addToOrder() {
    await this.page.getByRole('main').getByRole('button', { name: /Add.*Brewed Coffee to order/ }).click();
  }
}
