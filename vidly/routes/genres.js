const express = require('express'); 
const route = express.Router(); //returns a router object we can add routes to, then export 

const genres = [
    {id: 1, name: "action"},
    {id: 2, name: "horror"},
    {id: 3, name: "thriller"},
    {id: 4, name: "comedy"} 
];

//GET
route.get('/', (req, res) => {
    res.send(genres); 
});

//specific genre (id from client)
route.get('/:id', (req, res) => {
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("genre not found"); 
    res.send(genre); 
}); 


//POST 
route.post('/', (req, res) => {
    const { error } = validateGenre(req.body); //validate client data
    if(error) return res.status(400).send(error.details[0].message); //if not valid, send error to client

    //real world, access database to create a new record 
    const genre = {
        id: genres.length + 1, 
        name: req.body.name, 
    };
    genres.push(genre); 

    res.send(genre); //send new record back to client
});


//PUT
route.put('/:id', (req, res) => {
    let genre = genres.find(g => g.id === parseInt(req.params.id)); //get genre
    if(!genre) return res.status(404).send("genre not found"); //if not exist, return message to client

    const { error } = validateGenre(req.body); //validate method, access error field in returned obj
    if(error) return res.status(400).send(error.details[0].message); //error mssage

   genre.name = req.body.name; //update record 
   res.send(genre); //send updated record to client
});

//DELETE
route.delete('/:id', (req, res) => {
    let genre = genres.find(g => g.id === parseInt(req.params.id)); //get genre
    if(!genre) return res.status(404).send("genre not found"); //if not exist, return message to client


    const index = genres.indexOf(genre); 
    genres.splice(index, 1); 

    res.send(genre); 
});

function validateGenre (genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre); 
}

modules.export = route; 