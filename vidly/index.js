const Joi = require('@hapi/joi'); //client validation
Joi.objectId = require('joi-objectid')(Joi); //returns a function, objectId becomes method on Joy object
const mongoose = require('mongoose'); 
const genres = require('./routes/genres'); //genres API encapsulated into a separate module 
const customers = require('./routes/customers'); //customers API
const movies = require('./routes/movies'); //movies API
const rentals = require('./routes/rentals'); //Rental API
const users = require('./routes/users'); //User API 
const express = require('express'); 
const app = express(); 

//Mongoose - Connect to DB once in application (on startup)
mongoose
    .connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));

app.use(express.json()); 
app.use('/api/genres', genres); 
app.use('/api/customers', customers); 
app.use('/api/movies', movies); 
app.use('/api/rentals', rentals); 
app.use('/api/users', users); 

//Dynamic PORT 
const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`Listening on Port ${port}....`)); 
