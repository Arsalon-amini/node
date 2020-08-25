// POST /api/returns {customerId, movieID}

//authentication check - 
    // Return 401 if user is not authenticated 

//Validate return document client (joi) / server (mongoose)
    // Return 400 if customerId is not provided 
    // Return 400 if movieId is not provided 
    // Return 404 if no rental found w/ customerId and movieId
    // Return 400 if rental already processed 

//Request processing 
    //Return 200 if valid request
    //Set return date
    //Calculate rental fee
    //Increase stock of movie
    //Return rental to client (properties set)