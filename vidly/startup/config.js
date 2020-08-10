const config = require('config'); 

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined'); //current error will catch exception, log it, respond to client 
    }
}