const {User, validate} = require('../models/user'); //object returns has two properties (Customer, validate)
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 
const _ = require('lodash'); 

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); 

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered'); 

    user = new User(_.pick(req.body), ['name', 'email', 'password']); //pick only desired properties from req.body 

    await user.save(); 
    res.send(_.pick(user, ['id','name', 'email'])); //give method object, array of properties to select, returns new obj with only those properties
});

module.exports = router; 