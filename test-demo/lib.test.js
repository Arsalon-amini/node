const lib = require('./lib'); 
const db = require('./db'); 
const mail = require('./mail'); 

describe('absolute', () =>{
    it('should return positive number if input is positive', () => { //test - jest function arg - 1. name of test, 2. jest calls this function to implement test
    const result = lib.absolute(1); //use a simply number for arg to absolute function testing  
    expect(result).toBe(1); //compare to another function "matcher function"
    });

    it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1); //make assurtion (verify result is correct)
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0); //make assurtion (verify result is correct)
    });
})

describe('greet', ()=>{
    it('should return the greeting message', ()=> {
        const result = lib.greet('Arsi'); //pass arg to greet function
        //expect(result).toBe('Welcome Arsi') //too specific 
        //expect(result).toMatch(/Arsi/); //reg expression (contains word 'name')
        expect(result).toContain('Arsi'); //alt version
    })
})

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD'])); //compare to array of values (irrespective of position)
    })
})

describe('getProduct', () => {
    it('should return pass if Object contains key-values', () => {
    const result = lib.getProduct(1); 
     expect(result).toMatchObject({id: 1, price: 10}); //check for only specific object members (ignores other object members)
    //expect(result).toHaveProperty('id', 1); //check for member (must be same type)
    //expect(result).toEqual({id: 1, price: 10}); //check exact match of members (must have only listed members)
    //expect(result).toBe({ id: 1, price: 10}); //checks reference equality NOT object (value) equality 
    })
})

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false]; //execution paths for all falsy values (exceptions)
        args.forEach(a => { 
            expect(() => {lib.registerUser(null)}).toThrow();
        })
    }); 

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Arsi'); 
        expect(result).toMatchObject({ username: 'Arsi' });
        expect(result.id).toBeGreaterThan(0); //asserts id is there (>0)
    })
}); 

describe('applyDiscount', ()=> {
    it('should apply 10% discount if customer has more than 10 points', ()=> {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading'); 
            return { id: customerId, points: 20 } //mock function (replace external)
        }


        const order = {customerId: 1, totalPrice: 10}; 
        lib.applyDiscount(order); 
    });
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'}); 
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 }); 

        expect(mail.send).toHaveBeenCalled(); //determines if method is called

        expect(mail.send).toHaveBeenCalled();
       // expect(mail.send.mock.calls[0][1].toBe('a')); //jest fn has method that tracks calls, returns array, can access element 1, assert 
        //expect(mail.send.mock.calls[0][1]).toMatch(/order/); //checks args passed to funct

        // db.getCustomerSync = function(customerId) {
        //     return { email: 'a' }; //mock function 
        // }

        // let mailSent = false; 
        // mail.send = function(email, message){
        //     mailSent = true;
        // }
    }); 
})


