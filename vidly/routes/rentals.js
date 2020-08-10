const auth = require('../middleware/auth'); 
const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); //object returns has two properties (Customer, validate)
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const Fawn = require('fawn'); 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 

Fawn.init(mongoose); 

//GET
router.get('/', async (req, res) =>{
    const rentals = await rentals.find().sort('-dateOut'); 
    res.send(rentals); 
}); 

//POST

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); 

    const customer = await Customer.findById(req.body.customerId); 
    if(!customer) return res.status(400).send('Invalid Customer ID'); 

    const movie = await Movie.findById(req.body.movieId); 
    if(!movie) return res.status(400).send('Invalid MovieID'); 

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock'); 

    let rental = new Rental({
        date: req.body.date,
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
            //mongoose will automatically set dateOut property
        }
    });

    //transactions
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
            .run(); 

        res.send(rental); 
    }
    catch(ex){
        res.status(500).send('Something failed'); //in real world, log errors (future section) 
    }
   
});



module.exports = router; 