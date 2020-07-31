const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //this is a class 


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }
});


//Mongo Schema
const Customer = mongoose.model('Customer', customerSchema); 
    

function validateCustomer (customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer); 
}

exports.Customer = Customer; 
exports.validate = validateCustomer; 
exports.customerSchema = customerSchema; 