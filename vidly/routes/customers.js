//Modules
const {Customer, validate} = require('../models/customer'); //object returns has two properties (Customer, validate)
const mongoose = require('mongoose'); //object has .connect method that returns a promise 
const express = require('express'); 
const router = express.Router(); //returns a router object we can add routes to, then export 

//GET
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name'); //mongoose async 
    res.send(customers); 
});

router.get('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id); //mongoose async code (returns promise)
    if(!customer) return res.status(404).send("genre not found"); 
    res.send(customer); 
}); 

//POST 
router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); //if not valid, send error to client

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
     }); 

    customer = await customer.save(); 

    res.send(customer); //send new record back to client
});

//PUT
router.put('/:id', async (req, res) => {
    //validate 
    const { error } = validate(req.body); //validate method, access error field in returned obj
    if(error) return res.status(400).send(error.details[0].message); //error mssage

    //udpate in DB
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true}); 
    if(!customer) return res.status(404).send("genre not found"); //if not exist, return message to client

    res.send(customer); //send updated record to client
});

//DELETE
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id); //mongoose abstracted function that uses promise to query MongoDB
    if(!customer) return res.status(404).send("customer not found"); //if not exist, return message to client

    res.send(customer); 
});

module.exports = router; 