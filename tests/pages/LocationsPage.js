exports.LocationsPage = class LocationsPage {

    constructor(page) {
        this.page = page;
        this.yourAddress = page.getByTestId("storelocator-autocomplete");
        this.storeAccordionBtn = page.getByRole('button', { name: /1500 woodbine ave\./i });
        // In constructor, replace or add:
        this.firstSuggestion = page.locator('#downshift-0-menu [role="option"]').first();
        this.storeOrderBtn = page.getByRole('button', { name: /^Order$/i });
        this.chooseLocationBtn = page.getByRole('button', { name: /choose a location/i });
    }

    async storeSelection (){
        // Open store locator panel (autocomplete is not in DOM until this is opened)
        await this.chooseLocationBtn.click();

        // Wait for the autocomplete input to be visible before interacting
        await this.yourAddress.waitFor({ state: 'visible', timeout: 15000 });
        await this.yourAddress.fill("1500 Woodbine Ave");

        // дождаться списка
        await this.page.locator("#downshift-0-menu").waitFor({ state: "visible", timeout: 15000 });
        await this.firstSuggestion.click();
        //await this.page.waitForTimeout(5000);
        await this.storeAccordionBtn.click();
        //await this.page.waitForTimeout(5000);
        await this.storeOrderBtn.click();
    }


}