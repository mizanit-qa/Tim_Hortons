exports.Submenu = class Submenu {

    constructor(page) {
        this.page = page;
        this.brewedCoffeeTile = page.getByRole('link', { name: /Brewed Coffee/i });

    }

    async clickBrewedCoffee() {
        await this.brewedCoffeeTile.waitFor({ state: 'attached' });
        await this.brewedCoffeeTile.click();

}
}