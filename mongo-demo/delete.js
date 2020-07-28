const mongoose = require('mongoose'); //object has .connect method that returns a promise 

mongoose
    .connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));


//Creating Data 

//schema - defines shape of course documents in mongoDB database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], //key will be index, value string 
    date: { type: Date, default: Date.now}, //default value for property
    isPublished: Boolean
});

//class - compiles schema 
const Course = mongoose.model('Course', courseSchema); //first arg is name of collection, second arg is schema that defines shape, returns Class 


//query - 
async function removeCourse(id){
    //const result = await Course.deleteOne({ _id: id }) ; //returns a promise 
    const course = await Course.findByIdAndDelete(id); //get document deleted 
    console.log(course); 
}

removeCourse('5f1eb3ffdf27f1d487e06fec'); 

