import { expect } from '@playwright/test';
exports.TimsforGoodPage = class TimsforGoodPage {
    constructor(page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: /Tims for Good/i });

    }

    async expectPageHeading(){
        await expect(this.pageHeading).toBeVisible();
    }

}