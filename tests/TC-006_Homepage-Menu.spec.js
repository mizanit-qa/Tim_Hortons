import { test, expect } from '@playwright/test';
import { ProtectedPage } from './pages/ProtectedPage';
import { SignInPage } from './pages/SignInPage';
import { HomePage } from './pages/HomePage';
import { LocationsPage } from './pages/LocationsPage';

test('Homepage - Menu', async ({ page }) => {
    const sitepass = new ProtectedPage(page);
    const signin = new SignInPage(page);
    const homepage = new HomePage(page);
    const location = new LocationsPage(page);

    await sitepass.passwordProtection({ timeout: 5000 });

    //await signin.gotoHome();

    await signin.userSignIn('timregression+95@gmail.com');

    await homepage.homepageMenu();

    await location.storeSelection();

})

