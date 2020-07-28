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