const mongoose = require('mongoose'); 
const genres = require('./routes/genres'); //genres API encapsulated into a separate module 
const customers = require('./routes/customers'); //customers API
const express = require('express'); 
const app = express(); 

//Mongoose - Connect to DB once in application (on startup)
mongoose
    .connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));

app.use(express.json()); 
app.use('/api/genres', genres); 
app.use('/api/customers', customers); 


//Dynamic PORT 
const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`Listening on Port ${port}....`)); 






