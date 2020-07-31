
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //client validation


const User = new mongoose.model('User', new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
})); 

//client validation (Joi)
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), //dateout & rental rate set on server, not by client (omitted here)
        password: Joi.string().min(5).max(255)
    });

    return schema.validate(user); 
}

exports.User = User 
exports.validate = validateUser; 


