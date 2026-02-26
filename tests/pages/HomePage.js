exports.HomePage = class HomePage{

    constructor(page){
        this.page = page;
        //this.menuLink = page.getByTestId('Menu');
        this.menuLink = page.locator("//a[normalize-space()='Menu']");
        this.timsforGoodLink = page.getByTestId('Tims for Good');
        this.timsCateringLink = page.getByTestId('Tims Catering');
        this.timShopLink = page.getByTestId('TimShop');
        this.moreLink = page.getByTestId('');
    
        


    }

    async homepageMenu(){
        await this.menuLink.click();
}


}