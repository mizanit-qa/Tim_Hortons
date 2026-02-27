import { expect } from '@playwright/test';
exports.CateringPage = class CateringPage {
    constructor(page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: /Tims Catering/i });

    }

    async expectCateringPageHeading(){
        await expect(this.pageHeading).toBeVisible();
    }

}