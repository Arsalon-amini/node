
//Modules
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //this is a class 
const {genreSchema} = require('./genre'); //load genreSchema from genre model 


//Schema -> Models
const Genre = mongoose.model('Genre', genreSchema);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlenght: 50
    },
    genre: {
        type: genreSchema,
        required: true 
    }, 
    numberInStock: {
        type: Number,
        required: true,
        min: 0, 
        max: 255 
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 25
    } 
});


const Movie = mongoose.model('Movie', movieSchema); 


//functions
function validateMovie (movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(), //client sends only id of genre (Joi schema (client) grows independent of mongoose validation (model))
        numberInStock: Joi.number().min(0).required(), 
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie); 
}


exports.Movie = Movie; 
exports.validate = validateMovie; 
exports.moiveSchema = movieSchema; 
