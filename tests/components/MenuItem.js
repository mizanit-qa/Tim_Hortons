exports.MenuItems = class MenuItems {

    constructor(page) {
        this.page = page;
        this.menuGrid = page.getByTestId('menu-tile-grid');
        this.menuTiles = this.menuGrid.locator('a'); // each tile is a link
    }


}
