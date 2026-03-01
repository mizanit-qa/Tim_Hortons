exports.MenuItems = class MenuItems {

    constructor(page) {
        this.page = page;
        this.hotDrinksTile = page.getByRole('link', { name: /Hot Drinks/i });
        this.coldDrinksTile = page.getByRole('link', { name: /Cold Drinks/i });
        this.newandSeasonalTile = page.getByRole('link', { name: /New & Seasonal/i });

    }


}
