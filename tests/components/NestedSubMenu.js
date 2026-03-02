export class nestedSubMenu {

    constructor(page) {
        this.page = page;
        this.brewedCoffee = page.getByRole('link', { name: /Brewed Coffee/i });

    }

    async clickBrewedCoffee() {
        await this.brewedCoffee.click();
    }


}