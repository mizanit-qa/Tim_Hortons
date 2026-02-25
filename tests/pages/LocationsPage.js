exports.LocationsPage = class LocationsPage {

    constructor(page) {
        this.page = page;
        this.yourAddress = page.getByTestId("storelocator-autocomplete");
        this.storeAccordionBtn = "//div[@id='tabpanel-0']//button[contains(@aria-label,'1500 woodbine ave. Open Accordion')]";
        this.storeOrderBtn = page.getByTestId("store-action-button-order");



        
    }

    async storeSelection (){
        await this.yourAddress.fill("1500 woodbine ave. Open Accordion");
        await this.storeAccordionBtn.click();
        await this.storeOrderBtn.click();
    }


}