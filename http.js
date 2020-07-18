//in real world, express is used to clean up conditional statements for handling url requests
const http = require('http'); 

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World'); 
        res.end(); 
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3])) //return list of courses from db (list of objs in JSON), write to response
        res.end(); 
    }
}

); //pass a callback function to handle a request 

server.listen(3000); 

console.log('listening on port 3000'); 

const http = require('http'); 

const server = http.createServer(); //returns obj that is an EventEmitter w/ capabilities (on, emit, etc.)

//not done in real world (too low level) 
server.on('connection', (socket) => {
    console.log('new connection'); 
})

server.listen(3000); 

console.log('listening on port 3000'); 

