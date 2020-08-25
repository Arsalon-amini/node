const Joi = require('@hapi/joi'); 
const moment = require('moment'); //load moment (date/time library)
const validate = require('../middleware/validate'); 
const {Rental} = require('../models/rental'); //load rental class
const {Movie} = require('../models/movie');  
const auth = require('../middleware/auth');
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
   const rental = await Rental.lookup(req.body.customerId, req.body.movieId); //static method defined in Rental class (on rental rentalSchema.statics prototype)

    if(!rental) return res.status(404).send("Rental not found"); //should return 404 if no rental found for this movie/customer
   
    if(rental.dateReturned) return res.status(400).send("Return already processed");  //should return 400 if return is already processed

    rental.return();  ////should calculate rentalFee if input is valid, should set return date if input is valid | logic encapsulated in .return instance method (rental model)
    await rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1} //should increase numberInStock
    });

    res.send(rental); 
});

function validateReturn (req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
    return schema.validate(req); 
}

module.exports = router; 










