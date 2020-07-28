//Modules
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 
const {Genre, validate} = require('../models/genre'); //object returns has two properties (Customer, validate)


//GET
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name'); //mongoose async 
    res.send(genres); 
});

router.get('/:id', async (req, res) => {
    let genre = await Genre.findById(req.params.id); //mongoose async code (returns promise)
    if(!genre) return res.status(404).send("genre not found"); 
    res.send(genre); 
}); 

//POST 
router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); //if not valid, send error to client

    let genre = new Genre({ name: req.body.name }); 
    genre = await genre.save(); 

    res.send(genre); //send new record back to client
});


//PUT
router.put('/:id', async (req, res) => {
    //validate 
    const { error } = validate(req.body); //validate method, access error field in returned obj
    if(error) return res.status(400).send(error.details[0].message); //error mssage

    //udpate in DB
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true}); 
    if(!genre) return res.status(404).send("genre not found"); //if not exist, return message to client

    res.send(genre); //send updated record to client
});

//DELETE
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id); //mongoose abstracted function that uses promise to query MongoDB
    if(!genre) return res.status(404).send("genre not found"); //if not exist, return message to client

    res.send(genre); 
});



module.exports = router; 