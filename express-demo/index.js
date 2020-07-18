const Joi = require('@hapi/joi'); //this is a class 
const express = require('express'); 
const app = express(); 

app.use(express.json()); //adding middleware for using in request processing pipeline

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course3'},
    {id: 3, name: 'course4'},
];




//Dynamic PORT 
const port = process.env.PORT || 3000 //port is dynamically assigned by hosting envir (use envir variable)
app.listen(port, () => console.log(`Listening on Port ${port}....`)); 



//GET - retrieve 
app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id)); //req.params returns a string - need to parse string into an int to compare with c.id
    if(!course) return res.status(404).send('Course not found'); //404 - object not found convention (client asks for resource not avail, respond with 404)
    res.send(course); //if present send course
});

app.get('/api/courses', (req, res) => {
    res.send(courses); //real world would request from database

});

//query param
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query); //query paramteres - whatever is passed after ? is stored in query obj (optional params) 
});

//POST - create
app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body); //obj destruction (ES6) replaces result.error

    if(error) return res.status(400).send(error.details[0].message); //send joi obj error message to client
        
    const course = {
        id: courses.length + 1, 
        name: req.body.name, //assuming we get an object that has a name property 
    };

    courses.push(course); 
    res.send(course); //return new obj in body of response (return to client) 
});

//PUT - update
app.put('/api/courses/:id', (req, res) => {

    //look up course
    //it not exit, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id)); //req.params returns a string - need to parse string into an int to compare with c.id
    if(!course) return res.status(404).send('Course not found'); //404 - object not found convention 

    //validate 
    //if invalid, return 400 - Bad request
    //result = validateCourse(req.body); 
    const { error } = validateCourse(req.body); //obj destruction (ES6) replaces result.error

    if(error) return res.status(400).send(error.details[0].message); //send joi obj error message to client
        

    //update course
    //return updated course to client 
    course.name = req.body.name;
    res.send(course); 
    
});


//DELETE
app.delete('/api/courses/:id', (req, res) => {
    //look up course
    //not exist, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id)); //req.params returns a string - need to parse string into an int to compare with c.id
    if(!course) return res.status(404).send('Course not found'); //404 - object not found convention 


    //Delete
    const index = courses.indexOf(course); //return index of course in courses array
    courses.splice(index, 1); //delete one obj at position (index)


    //return to client
    res.send(course); 

})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};






