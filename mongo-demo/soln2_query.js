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
        .find({isPublished: true, tags: {$in: ['frontend', 'backend']}}) //using the $in operator supply multiple values (via array)
        .sort({price: -1}) //-1 signifies sort by descending value on key
        .select({name: 1, author: 1, price: 1}) //select properties to return, set to 1 for return (true)
};

async function run(){
    const courses = await getCourses(); 
    console.log(courses); 
}

run(); 