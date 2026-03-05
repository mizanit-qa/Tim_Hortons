import { ProtectedPage } from './ProtectedPage';
import { SignInPage } from './SignInPage';
import { MenuItems } from './components/MenuItem';
import { LocationsPage } from './LocationsPage';
import { HomePage } from './HomePage';
import { Submenu } from './components/SubMenu';
import { nestedSubMenu } from './components/NestedSubMenu';
import { BrewedCoffee } from './components/BrewedCoffee';

exports.POManager = class POManager {

    constructor(page){
        this.page = page;
        this.protectedPage = new ProtectedPage(page);
        this.signInPage = new SignInPage(page);
        this.menuItems = new MenuItems(page);
        this.locationsPage = new LocationsPage(page);
        this.homepage = new HomePage(page);
        this.submenu = new Submenu(page);
        this.nestedsubmenu = new nestedSubMenu(page);
        this.brewedCoffee = new BrewedCoffee(page);
    }

    async passwordProtection(){
        await this.protectedPage.passwordProtection();
    }

    async signIn(email, code = '123456'){
        await this.signInPage.userSignIn(email, code);
    }

    async homepageMenu(){
        await this.homepage.homepageMenu();
    }

    async storeSelection(){
        await this.locationsPage.storeSelection();
    }

    async clickHotDrinks(){
        await this.menuItems.clickHotDrinks();
    }

    async clickBrewedCoffee(){
        await this.submenu.clickBrewedCoffee();
    }

    async sizeSelection(){
        await this.brewedCoffee.sizeSelection();
    }
    async blendSelection(){
        await this.brewedCoffee.blendSelection();
    }
    async reusableCupSelection(){
        await this.brewedCoffee.reusableCupSelection();
    }
    async blackSelection(){
        await this.brewedCoffee.blackSelection();
    }
    async regularSelection(){
        await this.brewedCoffee.regularSelection();
    }
    async doubleDoubleSelection(){
        await this.brewedCoffee.doubleDoubleSelection();
    }
    async tripleTripleSelection(){
        await this.brewedCoffee.tripleTripleSelection();
    }
    async addCream(){
        await this.brewedCoffee.addCream();
    }
    async addSugar(){
        await this.brewedCoffee.addSugar();
    }
    async addChocolateSyrup(){
        await this.brewedCoffee.addChocolateSyrup();
    }
    async addWhippedTopping(){
        await this.brewedCoffee.addWhippedTopping();
    }
    async setQuantityTo(count){
        await this.brewedCoffee.setQuantityTo(count);
    }
    async addToOrder(){
        await this.brewedCoffee.addToOrder();
    }

    async menuItems(){
        await this.menuItems.menuItems();
    }
}