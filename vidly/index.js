const winston = require('winston'); 
const express = require('express'); 
const app = express(); 

require('./startup/logging')(); //start with this to log any other errors
require('./startup/routes')(app); //returns a function, pass app object
require('./startup/db')(); 
require('./startup/config')(); //returns a function, call it 
require('./startup/validation')();

//Dynamic PORT 
const port = process.env.PORT || 3000; 
const server = app.listen(port, () => winston.info(`Listening on Port ${port}...`)); 

module.exports = server; 
