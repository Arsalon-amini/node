//single responsibility, clean code 
const winston = require('winston'); 
const mongoose = require('mongoose'); 
const config = require('config'); 

module.exports = function(){
    const db = config.get('db'); 
    mongoose
        .connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
        .then(() => winston.info(`Connected to ${db}...`)) //global error handling will catch uncaughtException
}
