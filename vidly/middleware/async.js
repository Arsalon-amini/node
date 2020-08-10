
//factory function - call this function to get a new function 
//takes a route handler, returns a promise (resolve, reject)
//takes our route handler (arg) tries to resolve the promise asynchronously, if rejected, catches exception and passes it to next handler
//returns an async route handler function, body has try/catch  (acts as a function reference, express calls returned function when needed)

module.exports = function(handler){  
    return async (req, res, next) => {  
        try {
            await handler(req, res); //call async route handler 
        }
        catch(ex) {
            next(ex); //pass exception to next handler 
        }
    } 
 }

