const EventEmitter = require('events'); 

const Logger = require('./logger'); //get a class (Import a class)
const logger = new Logger(); //create an object

//register a listener
logger.on('messageLogged', (arg) => {
    console.log('logging', arg); 
});

logger.log('message'); 