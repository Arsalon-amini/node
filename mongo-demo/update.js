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


//Query First -  findById(), Modify properties, save()
async function updateCourse(id){
    const course = await Course.findById(id); 
    if(!course) return; 

    if(course.isPublished) return; //not allow user to update course if published 

    course.set({
        isPublished: true, //pass obj with key-value pairs to be updated
        author: 'Another Author'
    });

    const result = await course.save(); //returns a promise
    console.log(result); 
}

updateCourse('5a68fdd7bee8ea64649c2777'); 

//Update Directly - without retrieving it first 

async function updateCourse2(id){
    const result = await Course.updateOne({ _id: id}, { 
        $set: {
            author: 'Mosh', //$set - sets value of a field
            isPublished: false
        }
    }); 
    console.log(result); 
}

//update in DB and return original document OR pass {new: true} to get new document 
async function updateCourse3(id){
    const result = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: 'Jack', //$set - sets value of a field
            isPublished: false
        }
    }, {new: true }); //will return updated doc
    console.log(result); 
}

//updateCourse2('5f1e5522a3ae57c8fc8e9d5c'); 
updateCourse3('5f1e5522a3ae57c8fc8e9d5c');