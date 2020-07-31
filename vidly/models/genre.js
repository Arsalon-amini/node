//Modules
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //this is a class 

//Schema 
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    }
});

//Model
const Genre = mongoose.model('Genre', genreSchema); 

function validateGenre (genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre); 
}

exports.Genre = Genre; 
exports.validate = validateGenre; 
exports.genreSchema = genreSchema; 