export class CheckoutPage {
  
    constructor(page) {
    this.page = page;
    this.pickUpButton = page.getByRole('button', { name: /Choose a Location|Pick Up/i });


    
  }
}