const jwt = require('jsonwebtoken'); 
const config = require('config'); 


module.exports = function auth(req, res, next){
    
    const token = req.header('x-auth-token'); 
    if(!token) return res.status(401).send('Access Denied. No token provided.'); 

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //returns decoded payload if valid 
        req.user = decoded; //set user equals jwt payload (id, isAdmin) 
        next(); //pass control to next middleware function  
    }
    catch(ex){
        res.status(400).send('Invalid token.'); //bad request, client doesn't have right data
    }

 
   
}




