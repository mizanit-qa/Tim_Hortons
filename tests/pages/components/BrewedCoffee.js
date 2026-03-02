exports.BrewedCoffee =  class BrewedCoffee {

    // constructor(page){
    //     this.page = page;
    //     this.coffeeSize = page.getByTestId('selection-Size').getByRole('button');
    //     this.coffeeBlend = page.getByTestId('selection-Coffee Blend').getByRole('button');
    //     this.reusableCup = page.getByTestId('selection-Bringing a Clean Reusable Cup?').getByRole('button');
    //     this.black = page.getByRole('button', { name: 'Black' });
    //     this.regular = page.getByRole('button', { name: 'Regular' });
    //     this.doubleDouble = page.getByRole('button', { name: 'Double Double' });
    //     this.tripleTriple = page.getByRole('button', { name: 'Triple Triple' });

    // }

    constructor(page){
        this.page = page;
        const main = page.getByRole('main');
        this.coffeeSize = main.getByRole('button', { name: 'Size Medium' });
        this.coffeeBlend = main.getByRole('button', { name: 'Coffee Blend Original Blend' });
        this.reusableCup = main.getByRole('button', { name: 'Bringing a Clean Reusable Cup? No' });
        this.black = main.getByRole('button', { name: 'Black' });
        this.regular = main.getByRole('button', { name: 'Regular' });
        this.doubleDouble = main.getByRole('button', { name: 'Double Double' });
        this.tripleTriple = main.getByRole('button', { name: 'Triple Triple' });
    }

    // async sizeSelection(){
    //     await this.coffeeSize.selectOption({label:'Small'});
    // }

    // async blendSelection(){
    //     await this.coffeeBlend.selectOption({label:'Decaf'});
    // }

    // async reusableCupSelection(){
    //     await this.reusableCup.selectOption({label:'Yes'});
    // }

    async sizeSelection(){
        await this.coffeeSize.click();
        await this.page.getByRole('button', { name: 'Small' }).click();
    }
    
    async blendSelection(){
        await this.coffeeBlend.click();
        await this.page.getByRole('button', { name: 'Decaf' }).click();
    }
    
    async reusableCupSelection(){
        await this.reusableCup.click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
    }

    async blackSelection(){
        await this.black.click();
    }
    
    async regularSelection(){
        await this.regular.click();
    }
    
    async doubleDoubleSelection(){
        await this.doubleDouble.click();
    }
    
    async tripleTripleSelection(){
        await this.tripleTriple.click();
    }

    
}
