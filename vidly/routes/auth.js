const Joi = require('@hapi/joi'); //client validation
const _ = require('lodash'); //helps
const bcrypt = require('bcrypt'); 
const {User} = require('../models/user'); //object returns has two properties (Customer, validate)
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 
const passwordComplexity = require('joi-password-complexity'); 


//authentication - determining if a user is who they claim to be 
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); 

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password'); 

    const validPassword = await bcrypt.compare(req.body.password, user.password); //compares plain text password with hashed password, if equal, returns true 
    if(!validPassword) return res.status(400).send('Invalid email or password'); 

    const token = user.generateAuthToken(); 
    res.send(token); 
});

const complexityOptions = {
    min: 7,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1
}

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(), //dateout & rental rate set on server, not by client (omitted here)
        password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(req); 
}

module.exports = router; 