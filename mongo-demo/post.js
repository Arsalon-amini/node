
//object - instantiates new object maps to document in mongoDB 
async function createCourse(){
    const course = new Course({
        //name: "Angular",
        author: "Mosh", 
        tags: ['angular', 'front end'], //in mongoDB can have complex objects (vs. SQL need three tables for this)
        isPublished: true
    });

    try {
        const result = await course.save(); //asynch operation, returns a promise (pending, resolved, rejected) 
        console.log(result); 
    } catch (err) {
        console.log(err.message); 
    }
    
}