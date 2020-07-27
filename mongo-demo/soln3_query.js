//hard

const mongoose = require('mongoose');

//connect - 
mongoose
    .connect('mongodb://localhost:27017/mongo-exercises', {useNewUrlParser: true, useUnifiedTopology: true}) //in real app, filename stored in config
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));


//schema - 
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], //array of strings (key will be index, value string)
    date: { type: Date, default: Date.now}, //default value for property
    isPublished: Boolean, 
    price: Number 
});

//model -  
const Course = mongoose.model('Course', courseSchema); //returns a model (class)

//query - 
async function getCourses(){
    return await Course
        .find({isPublished: true}) //$gte=15 (greater or equal to $15)
        .or([{price: {$gte : 15}}, { name: /.*by.*/i}]) //if price >=$15 OR title has word 'by' inside 
        .sort('-price') //descending price 
        .select('name author price')
    };

async function run(){
    const courses = await getCourses(); 
    console.log(courses); 
}

run(); 