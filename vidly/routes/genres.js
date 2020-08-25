//const asyncMiddleware = require('../middleware/async'); replace implementation with npm express-errors
const validateObjectId = require('../middleware/validateObjectId'); 
const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin'); 
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 
const {Genre, validate} = require('../models/genre'); //object returns has two properties (Customer, validate)

//GET
router.get('/', async (req, res) => {
    //throw new Error('cannot find genres'); 
    const genres = await Genre.find().sort('name'); //mongoose async 
    res.send(genres); 
});

router.get('/:id', validateObjectId, async (req, res) => {
    let genre = await Genre.findOne({ 'genreId': req.params.id}); //first exec path 

    if(!genre) return res.status(404).send("genre not found"); //second exec path

    res.send(genre); 
}); 

//POST 
router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); //first path (ensure 400 response if x < 5 or x > 50)

    let genre = new Genre({ name: req.body.name }); 
    genre = await genre.save(); //second path (ensure genre in db)

    res.send(genre); //third path (ensure genre is in response to client)
});


//PUT
router.put('/:id', [auth, validateObjectId], async (req, res) => {
    //validate 
    const { error } = validate(req.body); //validate method, access error field in returned obj
    if(error) return res.status(400).send(error.details[0].message); //error mssage

    //udpate in DB
    const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name}, {new: true}); 
    if(!genre) return res.status(404).send("genre not found"); // if not exist, return message to client

    res.send(genre); //send updated record to client
});

//DELETE
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id); //mongoose abstracted function that uses promise to query MongoDB
    if(!genre) return res.status(404).send("genre not found"); //if not exist, return message to client

    res.send(genre); 
});

module.exports = router; 