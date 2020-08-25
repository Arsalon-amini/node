require('express-async-errors'); //npm module for async express routes error handling (loaded at startup)
const winston = require('winston'); //default logger (can create custom logger)
//require('winston-mongodb'); //don't need to call it, just require

module.exports = function(){
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})); //handling synchronous process exceptions

    process.on('unhandledRejection', (ex) => {
        throw ex; //throws an exception that winston will pickup, handle asynchronous promise exceptions
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' }); //log errors in file
    // winston.add(winston.transports.MongoDB, { 
    //     db: 'mongodb://localhost/vidly', //in real world, might have separate db for logging errors 
    //     level: 'info' 
    // });
}

    //testing     
    // const p = Promise.reject(new Error('Something failed miserably')); 
    //     p.then(() => console.log(done)); //unhandled promise rejection 

    //throw new Error('Something failed during startup'); //test error (outside express)

    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex); 
    //     process.exit(1); //best practice to terminate process, restart (npm middleware in future)
    // }); 

    // process.on('unhandledRejection', (ex) => {
    //     winston.error(ex.message, ex); 
    //     process.exit(1);
    // });

