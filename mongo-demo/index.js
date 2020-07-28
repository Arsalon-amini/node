const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true, useUnifiedTopology: true}) //in real app, filename stored in config
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));


//schema - defines shape of course documents in mongoDB database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], //array of strings (key will be index, value string)
    date: { type: Date, default: Date.now}, //default value for property
    isPublished: Boolean, 
    price: Number 
});

//model - compiles schema into a model 
const Course = mongoose.model('Course', courseSchema); //returns a model (class)



