exports.LocationsPage = class LocationsPage {

    constructor(page) {
        this.page = page;
        this.yourAddress = page.getByTestId("storelocator-autocomplete");
        this.storeAccordionBtn = page.getByRole('button', { name: /1500 woodbine ave\./i });
        this.yourAddress = page.getByTestId("storelocator-autocomplete");
        this.firstSuggestion = page.locator("#downshift-0-item-0");
        this.storeOrderBtn = page.getByRole('button', { name: /^Order$/i });
        



        
    }

    async storeSelection (){
        await this.yourAddress.click();
        await this.yourAddress.fill("1500 Woodbine Ave");

        // дождаться списка
        await this.page.locator("#downshift-0-menu").waitFor({ state: "visible", timeout: 15000 });

        // кликнуть первый вариант
        await this.firstSuggestion.click();  
        await this.storeAccordionBtn.click();
        await this.storeOrderBtn.click();
    }


}