import type { Page, Locator } from '@playwright/test';

export class BrewedCoffee {
  readonly page: Page;
  readonly coffeeSize: Locator;
  readonly coffeeBlend: Locator;
  readonly reusableCup: Locator;
  readonly black: Locator;
  readonly regular: Locator;
  readonly doubleDouble: Locator;
  readonly tripleTriple: Locator;
  readonly dairyAlternatives: Locator;
  readonly sweeteners: Locator;
  readonly espressoShots: Locator;
  readonly flavourShots: Locator;
  readonly toppings: Locator;
  readonly selectQuantity: Locator;

  constructor(page: Page) {
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

  async sizeSelection(): Promise<void> {
    await this.coffeeSize.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Small/ }).click({ force: true });
  }

  async blendSelection(): Promise<void> {
    await this.coffeeBlend.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Decaf/ }).click({ force: true });
  }

  async reusableCupSelection(): Promise<void> {
    await this.reusableCup.click();
    await this.page.getByRole('main').getByRole('radio', { name: /Yes/ }).click({ force: true });
  }

  async blackSelection(): Promise<void> {
    await this.page.getByRole('main').getByText('Black', { exact: true }).click();
  }

  async regularSelection(): Promise<void> {
    await this.page.getByRole('main').getByText('Regular', { exact: true }).click();
  }

  async doubleDoubleSelection(): Promise<void> {
    await this.page.getByRole('main').getByText('Double Double', { exact: true }).click();
  }

  async tripleTripleSelection(): Promise<void> {
    await this.page.getByRole('main').getByText('Triple Triple', { exact: true }).click();
  }

  async addCream(): Promise<void> {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Cream' }).click();
  }

  async addWholeMilk(): Promise<void> {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Whole Milk' }).click();
  }

  async addTwoPercentMilk(): Promise<void> {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment 2% Milk' }).click();
  }

  async addSkimMilk(): Promise<void> {
    await this.dairyAlternatives.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Skim Milk' }).click();
  }

  async addSugar(): Promise<void> {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Sugar' }).click();
  }

  async addSweetener(): Promise<void> {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Sweetener' }).click();
  }

  async addHoney(): Promise<void> {
    await this.sweeteners.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Honey' }).click();
  }

  async addEspressoShot(): Promise<void> {
    await this.espressoShots.click();
    await this.page.getByRole('main').getByRole('button', { name: /Increment.*Espresso/ }).first().click();
  }

  async addDecafEspressoShot(): Promise<void> {
    const expander = this.page.getByRole('main').getByRole('button', { name: /Espresso Shots/ });
    await expander.click({ timeout: 5000 }).catch(() => {});
    const btn = this.page.getByRole('main').getByRole('button', { name: 'Increment Decaf Espresso Shot' });
    await btn.click({ timeout: 5000 }).catch(() => {});
  }

  async addChocolateSyrup(): Promise<void> {
    await this.flavourShots.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Chocolate Syrup' }).click();
  }

  async addWhippedTopping(): Promise<void> {
    await this.toppings.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Whipped Topping' }).click();
  }

  async addOreoCrumble(): Promise<void> {
    await this.toppings.click();
    await this.page.getByRole('main').getByRole('button', { name: 'Increment Oreo Crumble' }).click();
  }

  async setQuantityTo(count: number): Promise<void> {
    await this.selectQuantity.click();
    const incrementBtn = this.page.getByRole('main').getByRole('button', { name: 'Increment Brewed Coffee' });
    for (let i = 1; i < count; i++) {
      await incrementBtn.click();
    }
  }

  async addToOrder(): Promise<void> {
    await this.page.getByRole('main').getByRole('button', { name: /Add.*Brewed Coffee to order/ }).click();
  }
}
