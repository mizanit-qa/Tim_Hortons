import type { Page } from '@playwright/test';
import { ProtectedPage } from './ProtectedPage';
import { SignInPage } from './SignInPage';
import { MenuItems } from './components/MenuItem';
import { LocationsPage } from './LocationsPage';
import { HomePage } from './HomePage';
import { Submenu } from './components/SubMenu';
import { NestedSubMenu } from './components/NestedSubMenu';
import { BrewedCoffee } from './components/BrewedCoffee';

export class POManager {
  readonly page: Page;
  readonly protectedPage: ProtectedPage;
  readonly signInPage: SignInPage;
  readonly menuItems: MenuItems;
  readonly locationsPage: LocationsPage;
  readonly homepage: HomePage;
  readonly submenu: Submenu;
  readonly nestedsubmenu: NestedSubMenu;
  readonly brewedCoffee: BrewedCoffee;

  constructor(page: Page) {
    this.page = page;
    this.protectedPage = new ProtectedPage(page);
    this.signInPage = new SignInPage(page);
    this.menuItems = new MenuItems(page);
    this.locationsPage = new LocationsPage(page);
    this.homepage = new HomePage(page);
    this.submenu = new Submenu(page);
    this.nestedsubmenu = new NestedSubMenu(page);
    this.brewedCoffee = new BrewedCoffee(page);
  }

  async passwordProtection(): Promise<void> {
    await this.protectedPage.passwordProtection();
  }

  async signIn(email: string, code = '123456'): Promise<void> {
    await this.signInPage.userSignIn(email, code);
  }

  async homepageMenu(): Promise<void> {
    await this.homepage.homepageMenu();
  }

  async storeSelection(): Promise<void> {
    await this.locationsPage.storeSelection();
  }

  async clickHotDrinks(): Promise<void> {
    await this.menuItems.clickHotDrinks();
  }

  async clickBrewedCoffee(): Promise<void> {
    await this.submenu.clickBrewedCoffee();
  }

  async sizeSelection(): Promise<void> {
    await this.brewedCoffee.sizeSelection();
  }

  async blendSelection(): Promise<void> {
    await this.brewedCoffee.blendSelection();
  }

  async reusableCupSelection(): Promise<void> {
    await this.brewedCoffee.reusableCupSelection();
  }

  async blackSelection(): Promise<void> {
    await this.brewedCoffee.blackSelection();
  }

  async regularSelection(): Promise<void> {
    await this.brewedCoffee.regularSelection();
  }

  async doubleDoubleSelection(): Promise<void> {
    await this.brewedCoffee.doubleDoubleSelection();
  }

  async tripleTripleSelection(): Promise<void> {
    await this.brewedCoffee.tripleTripleSelection();
  }

  async addCream(): Promise<void> {
    await this.brewedCoffee.addCream();
  }

  async addSugar(): Promise<void> {
    await this.brewedCoffee.addSugar();
  }

  async addChocolateSyrup(): Promise<void> {
    await this.brewedCoffee.addChocolateSyrup();
  }

  async addWhippedTopping(): Promise<void> {
    await this.brewedCoffee.addWhippedTopping();
  }

  async setQuantityTo(count: number): Promise<void> {
    await this.brewedCoffee.setQuantityTo(count);
  }

  async addToOrder(): Promise<void> {
    await this.brewedCoffee.addToOrder();
  }

  /** Opens menu / delegates to menu items flow. Named to avoid conflict with this.menuItems property. */
  async openMenuItems(): Promise<void> {
    await this.menuItems.clickHotDrinks();
  }
}
