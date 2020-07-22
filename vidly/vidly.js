const Joi = require('@hapi/joi'); //this is a class 
const genres = require('./routes/genres'); //genres API encapsulated into a separate module 
const express = require('express'); 
const app = express(); 

app.use('/api/genres', genres); //give path and pass router object 
app.use(express.json()); //adding middleware for using in request processing pipeline

//Dynamic PORT 
const port = process.env.PORT || 3000 //port is dynamically assigned by hosting envir (use envir variable)
app.listen(port, () => console.log(`Listening on Port ${port}....`)); 

