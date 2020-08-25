
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Joi = require('@hapi/joi'); //client validation
const moment = require('moment'); //load moment (date/time library)

const rentalSchema = new mongoose.Schema({
        customer: {
            type: new mongoose.Schema({
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
                    minlength: 5,
                    maxlength: 50
                }
            }),
            required: true
        },
        movie: {
            type: new mongoose.Schema({
                title:{
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 5,
                    maxlength: 50
                },
                dailyRentalRate:{
                    type: Number,
                    required: true,
                    min: 0
                }
            }),
            required: true
        },
        dateOut: {
            type: Date,
            required: true,
            default: Date.now
        },
        dateReturned: {
            type: Date
        },
        rentalFee: {
            type: Number,
            min: 0
        },
    });

//static method - available on Class  (returns obj. can define static methods in rental class on statics prototype)
rentalSchema.statics.lookup = function (customerId, movieId){ 
    return this.findOne({ // .this reference Rental class - caller of promise (lookup) will await result 
        'customer._Id': customerId, 
        'movie._Id' : movieId
        }); 
}

//instance method (available on object) - set return date, calculate rental fee 
rentalSchema.methods.return = function(){
    this.dateReturned = new Date(); 

    const rentalDays = moment().diff(this.dateOut, 'days'); //moment(current time) - dateout (diff)
    this.rentalFee = rentalDays * this.movie.dailyRentalFee; 
}

const Rental = mongoose.model('Rental', rentalSchema); 


//client validation (Joi)
function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required() //dateout & rental rate set on server, not by client (omitted here)
    });

    return schema.validate(rental); 
}

exports.Rental = Rental; 
exports.validate = validateRental; 
