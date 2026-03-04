import { expect,test } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage';
import { SignInPage } from '../pages/SignInPage';
import { MenuItems } from '../pages/components/MenuItem';
import { LocationsPage } from '../pages/LocationsPage';
import { HomePage } from '../pages/HomePage';
import { Submenu } from '../pages/components/SubMenu';
import { nestedSubMenu } from '../pages/components/NestedSubMenu';
import { BrewedCoffee } from '../pages/components/BrewedCoffee';

test('Brewed Coffee Selection', async ({ page }) => {
    test.setTimeout(60000);
    const sitepass = new ProtectedPage(page);
    const signin = new SignInPage(page);
    const menuItems = new MenuItems(page);
    const location = new LocationsPage(page);
    const homepage = new HomePage(page);
    const submenu = new Submenu(page);
    const nestedsubmenu = new nestedSubMenu(page);
    const brewedCoffee = new BrewedCoffee(page);


    await sitepass.passwordProtection({ timeout: 5000 });
    await signin.userSignIn('timregression+95@gmail.com');
    await page.waitForTimeout(5000);

    await homepage.homepageMenu();
    await location.storeSelection();

    await menuItems.clickHotDrinks();

    await page.getByRole('link', { name: /Brewed Coffee/i }).waitFor({ state: 'attached' });  ///
    
    await submenu.clickBrewedCoffee();
    await nestedsubmenu.clickBrewedCoffee();

    // With (wait for the Brewed Coffee customization panel to be ready):
    await page.getByRole('button', { name: 'Size Medium' }).waitFor({ state: 'visible', timeout: 15000 }); ///

    await brewedCoffee.sizeSelection();
    await brewedCoffee.blendSelection();
    await brewedCoffee.reusableCupSelection();
    await brewedCoffee.blackSelection();
    await brewedCoffee.regularSelection();
    await brewedCoffee.doubleDoubleSelection();
    await brewedCoffee.tripleTripleSelection();

    await brewedCoffee.tripleTripleSelection();

    // Dairy & Alternatives (pick one or more)
    await brewedCoffee.addCream();

    // Sweeteners (optional)
    await brewedCoffee.addSugar();

    // Espresso Shots (optional)
   // await brewedCoffee.addDecafEspressoShot();

    // Flavour Shots (optional)
    await brewedCoffee.addChocolateSyrup();

    // Toppings (optional)
    await brewedCoffee.addWhippedTopping();

    await brewedCoffee.setQuantityTo(3);
    await brewedCoffee.addToOrder();

    await page.waitForTimeout(10000);


})