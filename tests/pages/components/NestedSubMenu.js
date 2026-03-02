exports.nestedSubMenu = class nestedSubMenu {

    constructor(page) {
        this.page = page;
        //this.brewedCoffee = page.getByRole('link', { name: /Brewed Coffee/i });
        this.brewedCoffee = page.locator("//span[normalize-space()='Brewed Coffee']");

    }

    async clickBrewedCoffee() {
        await this.brewedCoffee.click();
    }


}