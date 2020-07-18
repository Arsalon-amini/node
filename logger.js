const EventEmitter = require('events');

var url = 'http://myloger.io/log'; //send http request to endpoint

class Logger extends EventEmitter {
    log (message){ 
        console.log(message); 
    
        //raise an event
        this.emit('messageLogged', { id: 1, url: 'http://'}); //can directly access emitter object using (this) bcuz extends EventEmitter
    }

}


module.exports = Logger; //export logger class 

