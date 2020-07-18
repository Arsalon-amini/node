//path module
const path = require('path'); 
pathObj = path.parse(__filename); 

//os module
const os = require('os');
const totalMemory = os.totalmem(); 
const freeMemory = os.freemem(); 
console.log(`Total Memory: ${totalMemory}, Free Memory: ${freeMemory}`)

//file system module
const fs = require('fs'); 

//asynch method - second arg is a callback function node will run function after complete, check for error or the result (string array)
fs.readdir('./', function(err, files){
    if(err) console.log('Error', err); //not how handle errors in real world
    else console.log('Result', files); 

});

//Events module
const EventEmitter = require('events'); //this is a class (container for properties and functions)
const emitter = new EventEmitter(); //this is an obj

//register a listener
emitter.on('messageLogged', function(){
    console.log('listener called'); 
});

//event arg (listener handle event arg)
emitter.on('messageLogged', (arg) => {
    console.log('listener called', arg); 
});

//raise an event
emitter.emit('messageLogged'); //making a noise, produce - 'signalling an event happened' pass name of event

//pass event arg
emitter.emit('messageLogged', { id: 1, url: 'http://'});

//excercise - raise and handle events

//register a listener
emitter.on('logger', (arg) =>{
    console.log('logging', arg); 
})

//raise an event
emitter.emit('logger', { id: 1, message: 'log successful'}); //event name, event arg 