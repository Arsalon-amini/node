//single responsibility, clean code 
const winston = require('winston'); 
const mongoose = require('mongoose'); 

module.exports = function(){
    mongoose
        .connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
        .then(() => winston.info('Connected to MongoDB')) //global error handling will catch uncaughtException
}
