const jwt = require('jsonwebtoken');
const config = require('config'); 
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //client validation
const passwordComplexity = require('joi-password-complexity'); 


const userSchema = new mongoose.Schema ({
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
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false 
    }
});

//single extension point (key-value pair) - don't store on server (store in client)
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey')); 
    return token; 
}

//client validation (Joi)
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), //dateout & rental rate set on server, not by client (omitted here)
        password: passwordComplexity(complexityOptions).required(),
    });

    return schema.validate(user); 
}

const complexityOptions = {
    min: 7,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1
}

const User = new mongoose.model('User', userSchema); 

exports.User = User 
exports.validate = validateUser; 


