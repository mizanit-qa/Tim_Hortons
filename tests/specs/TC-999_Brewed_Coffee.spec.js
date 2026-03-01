import { expect,test } from '@playwright/test';
import { ProtectedPage } from '../pages/ProtectedPage';
import { SignInPage } from '../pages/SignInPage';
import { MenuItems } from '../components/MenuItem';
import { LocationsPage } from '../pages/LocationsPage';
import { HomePage } from '../pages/HomePage';

test('Brewed Coffee Selection', async ({ page }) => {
    const sitepass = new ProtectedPage(page);
    const signin = new SignInPage(page);
    const menuItems = new MenuItems(page);
    const location = new LocationsPage(page);
    const homepage = new HomePage(page);

    await sitepass.passwordProtection({ timeout: 5000 });
    await signin.userSignIn('timregression+95@gmail.com');

    await homepage.homepageMenu();
    await location.storeSelection();

    await menuItems.clickHotDrinks();
    //await expect(page).toHaveTitle(/Hot Drinks/i);

    

})