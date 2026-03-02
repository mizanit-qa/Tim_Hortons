import { expect,test } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage';
import { SignInPage } from '../pages/SignInPage';
import { MenuItems } from '../components/MenuItem';
import { LocationsPage } from '../pages/LocationsPage';
import { HomePage } from '../pages/HomePage';
import { Submenu } from '../components/SubMenu';
import { nestedSubMenu } from '../components/NestedSubMenu';

test('Brewed Coffee Selection', async ({ page }) => {
    const sitepass = new ProtectedPage(page);
    const signin = new SignInPage(page);
    const menuItems = new MenuItems(page);
    const location = new LocationsPage(page);
    const homepage = new HomePage(page);
    const submenu = new Submenu(page);
    const nestedsubmenu = new nestedSubMenu(page);

    await sitepass.passwordProtection({ timeout: 5000 });
    await signin.userSignIn('timregression+95@gmail.com');
    await page.waitForTimeout(5000);

    await homepage.homepageMenu();
    await location.storeSelection();

    //await expect(page).toBeVisible({ timeout: 5000 });
    await menuItems.clickHotDrinks();
    
    //await expect(page).toBeVisible({ timeout: 5000 });
    await submenu.clickBrewedCoffee();
    await nestedsubmenu.clickBrewedCoffee();

    //await page.waitForTimeout(15000);





})