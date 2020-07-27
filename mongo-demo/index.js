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

//object - instantiates new object maps to document in mongoDB 
async function createCourse(){
    const course = new Course({
        name: "Angular",
        author: "Mosh", 
        tags: ['angular', 'front end'], //in mongoDB can have complex objects (vs. SQL need three tables for this)
        isPublished: true
    });

    const result = await course.save(); //asynch operation, accessing filesystem, returns a promise 
    console.log(result); 
}

//Querying Data 

//Querying documents (simple query)
async function getCourses1(){
    const courses = await Course.find(
        { author: 'Mosh', isPublished: true }); //.find method takes one or more values for filtering in { }
        console.log(courses); 
};

//Querying documents (complex query)
async function getCourses2(){
    const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1}) //select properties to return, only name and tags, set to 1 
    .countDocuments() //returns number of documents 
    console.log(courses); 
};


//Comparision Query Operators (complex query)
async function getCourses3(){
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte(greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)
    const courses = await Course
    .find({ price: {$gt: 10, $lte: 20}}) // replace value with obj expresses concept greater than (only courses $gt10) {price: {$in: [10, 25, 20]}}
    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1}); //select properties to return, only name and tags, set to 1 
    console.log(courses); 
};

//logical query operators
async function getCourses4(){
    const courses = await Course
    .find()
    .or([{ author: 'Mosh'}, { isPublished: true }]) //pass an array of filter objects, returns objects that either have Mosh OR published
    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1}); //select properties to return, only name and tags, set to 1 
    console.log(courses); 
};

//regular expressions (Regex)
async function getCourses5(){
    const courses = await Course
    .find( { author: /^Mosh/}) //starts with 

    .find( { author: /Hamadeni$/i })//ends with 'Hamadeni' and isn't case sensitive

    .find({ author: /.*Mosh.*/i}) //zero or more chars before/after 'Mosh'

    .limit(10)
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1}); //select properties to return, only name and tags, set to 1 
    console.log(courses); 
};

//Pagination
async function pagination(){
    //real world, pass as query string params - /api/courses?pageNumber=2&pageSize=10
    const pageNumber = 2; 
    const pageSize = 10; 

    const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1}) //select properties to return, only name and tags, set to 1 
    .countDocuments() //returns number of documents 
    console.log(courses); 
};


//function calls
//getCourses2(); 
getCourses4(); 
//createCourse(); 


