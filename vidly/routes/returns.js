const {Genre, validate} = require('../models/genre'); //object returns has two properties (Customer, validate)
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 



router.post('/', async (req, res) => {
    if(!req.body.customerId) return res.status(400).send('customerId not provided'); //add joi later (refactor code)
    if(!req.body.movieId) return res.status(400).send('movieId not present'); 
    res.status(401).send('Unauthorized'); //simplest code to make it work (can modify later)
});


module.exports = router; 



