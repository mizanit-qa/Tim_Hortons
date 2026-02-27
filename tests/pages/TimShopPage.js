import { expect } from '@playwright/test';
exports.TimShopPage = class TimShopPage {
    
    constructor(page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: /Tim Shop/i });

    }

    async expectTimShopPageHeading(){
        await expect(this.pageHeading).toBeVisible();
    }

}