//routes and other middleware 
//takes a single instance of express (app)
const express = require('express'); 
const genres = require('../routes/genres'); //genres API encapsulated into a separate module 
const customers = require('../routes/customers'); //customers API
const movies = require('../routes/movies'); //movies API
const rentals = require('../routes/rentals'); //Rental API
const users = require('../routes/users'); //authentication API (user)
const auth = require('../routes/auth'); //authorization API (permissions)
const error = require('../middleware/error'); //error handling middleware (centralized)


module.exports = function(app){
    app.use(express.json()); 
    app.use('/api/genres', genres); 
    app.use('/api/customers', customers); 
    app.use('/api/movies', movies); 
    app.use('/api/rentals', rentals); 
    app.use('/api/users', users); 
    app.use('/api/auth', auth); 
    app.use(error);



}