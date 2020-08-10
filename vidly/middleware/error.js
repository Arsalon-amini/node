//handles errors in request processing pipline (express route handlers) ignores node exceptions

const winston = require('winston'); //npm logging 

module.exports = function(err, req, res, next) { 
    winston.error(err.message, err); 
    res.status(500).send('something failed'); //internal status error (500) 
}

