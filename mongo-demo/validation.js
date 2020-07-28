const mongoose = require('mongoose'); //object has .connect method that returns a promise 

mongoose
    .connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, in real app, connection string comes from config file
    .then(() => console.log('Connected to MongoDb...')) //in real app, use Debug module 
    .catch(err => console.error('Could not connect go MongoDb', err));


//Creating Data 

//schema - defines shape of course documents in mongoDB database
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    }, 
    category: {
        type: String,
        required: true,
        enum:  ['web', 'mobile', 'network'], //when creating a course, catagory should be one of values or error 
        lowercase: true, //mongoose will automatically convert value of category to lowercase 
        trim: true //will trim any whitespace automatically 
    },
    author: {
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 55
    }, 
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        //do some async work
                        resolve(v && v.length > 0); //custom validation logic (in real world, db call, API call, etc.)
                        reject(new Error('at least tag requried'));
                    }, 4000);
                });

             },
    }
},
    date: { type: Date, default: Date.now}, //default value .now
    isPublished: Boolean,
    //conditionally require price (isPublished = true, require number )
    price: {
        type: Number,
        required: function(){ return this.isPublished;} , 
        min: 10, //validator for Number 
        max: 200,
        get: v => Math.round(v), //custom functions called when we get/set price value
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema); //first arg is name of collection, second arg is schema that defines shape, returns Class 

async function createCourse(){
    const course = new Course({
        name: "Angular",
        author: "Mosh", 
        category: 'web',
        tags: ['backend'], //in mongoDB can have complex objects (vs. SQL need three tables for this)
        isPublished: true,
        price: 15.8
    });

    try {
        const result = await course.save(); //asynch operation, returns a promise (pending, resolved, rejected) 
        console.log(result); 
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message); 
    }
}

//Querying documents (complex query)
async function getCourses(){
    const courses = await Course
    .find({ _id: '5f1fde0ff4d9fae81279f6fc' })
    .sort({ name: 1 }) //1 indicates ascending order, -1 descending by name 
    .select({name: 1, tags: 1, price: 1}) //select properties to return, only name and tags, set to 1  
    console.log(courses[0].price); 
};

    
//createCourse(); 
getCourses(); 