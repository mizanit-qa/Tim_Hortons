import { expect,test } from '@playwright/test';
import { POManager } from '../pages/POManager';


test('Brewed Coffee Selection', async ({ page }) => {
    test.setTimeout(60000);
    const poManager = new POManager(page);
//////////////////////////////////////////////////////////////////////

    await poManager.passwordProtection({ timeout: 5000 });
    await poManager.signIn('timregression+95@gmail.com');
    await page.waitForTimeout(5000);

    await poManager.storeSelection();
    await poManager.homepageMenu();

    await expect(page).toHaveURL(/\/menu/i);
    await poManager.clickHotDrinks();

    await page.getByRole('link', { name: /Brewed Coffee/i }).first().waitFor({ state: 'attached' });
    
    await poManager.clickBrewedCoffee();
    await poManager.clickBrewedCoffee();

    await page.getByRole('button', { name: 'Size Medium' }).waitFor({ state: 'visible', timeout: 15000 }); ///

    await poManager.sizeSelection();
    await poManager.blendSelection();
    await poManager.reusableCupSelection();
    await poManager.blackSelection();
    await poManager.regularSelection();
    await poManager.doubleDoubleSelection();
    await poManager.tripleTripleSelection();
    await poManager.tripleTripleSelection();
    await poManager.addCream();
    await poManager.addSugar();
    await poManager.addChocolateSyrup();
    await poManager.addWhippedTopping();
    await poManager.setQuantityTo(3);
    await poManager.addToOrder();
    await page.waitForTimeout(10000);


})