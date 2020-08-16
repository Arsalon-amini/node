const db = require('./db');
const mail = require('./mail'); 
  

//test numbers 
module.exports.absolute = function(number){
    return (number>=0) ? number: -number; 
}

//test strings
module.exports.greet = function(name){
    return 'Welcome' + name; 
}

//test arrays
module.exports.getCurrencies = function(){
    return ['USD', 'AUD', 'EUR']; 
}

//test objects
module.exports.getProduct = function(productId){
    return { id: productId, price: 10, catagory: 'a'}; 
}

//test exceptions
module.exports.registerUser = function(username){
    if(!username) throw new Error('Username is required!'); //exception throw - NaN, null, undefined, '' , 0 (falsy)

    return {id: new Date().getTime(), username: username }; 
}

//mock function 
module.exports.applyDiscount = function(order){
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10)
        order.totalPrice *= 0.9; 
}

//testing interactions
module.exports.notifyCustomer = function(order){
    const customer = db.getCustomerSync(order.customerId); 

    mail.send(customer.email, 'Your order was placed successfully.')
}
