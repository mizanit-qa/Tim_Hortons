exports.ProtectedPage = class ProtectedPage {

    constructor(page){
        this.page = page;
        this.Card = ".card";
        this.SitePasswor = "input[placeholder='Password']";
        this.SubmitBtn = ".button"
        this.CookiesClose = "button[aria-label='Close']"
        this.LanguageApplyBtn = ".Button__BaseButton-sc-cbhjo9-0.bQGVPR";
    }

    async passwordProtection(){
        await this.page.goto('https://staging-th-web.ca.rbi.tools/');
        await this.page.locator(this.SitePasswor).fill('rbi-tech');
        await this.page.locator(this.SubmitBtn).click();
        await this.page.locator(this.CookiesClose).click();
        await this.page.locator(this.LanguageApplyBtn).click();
       
    }

    async passwordProtectionSignup(){
        await this.page.goto('https://staging-th-web.ca.rbi.tools/signup');
        await this.page.locator(this.SitePasswor).fill('rbi-tech');
        await this.page.locator(this.SubmitBtn).click();
        await this.page.locator(this.CookiesClose).click();
        await this.page.locator(this.LanguageApplyBtn).click();
       
    }

}