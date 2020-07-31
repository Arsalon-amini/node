
const {Movie, validate} = require('../models/movie'); //object returns has two properties (Customer, validate)
const {Genre} = require('../models/genre');
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 


//GET
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name'); //mongoose async 
    res.send(movies); 
});

router.get('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id); //mongoose async code (returns promise)

    if(!movie) return res.status(404).send("The Movie with the given ID not found"); 

    res.send(movie); 
}); 

//POST 
router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); //if not valid, send error to client

    const genre = await Genre.findById(req.body.genreId); 
    if(!genre) return res.status(400).send('Invalid Genre');  //failing testing  

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id, //why not set to genre (above) returned from our promise? bcz only selecting desired properties 
            name: genre.name //name from genre object stored 
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save(); //save updated movie in database 

    res.send(movie); //send new record back to client
});


//PUT
router.put('/:id', async (req, res) => {
    //validate 
    const { error } = validate(req.body); //validate method, access error field in returned obj
    if(error) return res.status(400).send(error.details[0].message); //error mssage

    //udpate in DB
    const movie = await Movie.findByIdAndUpdate(req.params.id,
         {
             title: req.body.title,
             genre: {
                 _id: req.body.id,
                 name: genre.name
             },
             numberInStock: req.body.numberInStock,
             dailyRentalRate: req.body.dailyRentalRate
          }, {new: true}); 

    if(!movie) return res.status(404).send("Movie with that ID not found"); //if not exist, return message to client

    res.send(movie); //send updated record to client
});

//DELETE
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id); //mongoose abstracted function that uses promise to query MongoDB
    if(!movie) return res.status(404).send("genre not found"); //if not exist, return message to client

    res.send(movie); 
});



module.exports = router; 