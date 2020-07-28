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