exports.SignupPage = class SignupPage {

    constructor(page){
        this.FirstName = "//input[@data-testid='signup-name-input']";
        this.SignupEmail = "//input[@data-testid='signup-email-input']";
        this.SignupYear = "//input[@data-testid='signup-dob-year']";
        this.SignupMonth = "//input[@data-testid='signup-dob-month']";
        this.SignupDay = "//input[@data-testid='signup-dob-day']";
        this.CheckboxEmailReceive = "//div[@data-testid='check-component'and @xpath='1']";
        this.CneckboxAgreed = "//div[@data-testid='check-component'and @xpath='1']";
        this.CreateAccountBtn ="button[data-testid='signup-button']";
        this.HelpCentreLink = "//a[normalize-space()='Help Centre']";
    }

    

}