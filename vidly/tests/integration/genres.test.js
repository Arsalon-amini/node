//write all tests for genre API here
const request = require('supertest'); //api endpoint testing
const {Genre} = require('../../models/genre'); //load Genre model and validate function 
const {User} = require('../../models/user'); //load Genre model and validate function 
const mongoose = require('mongoose'); 

let server;  

describe('/api/genres', () => { 
    beforeEach(() => { server = require('../../index'); }) //Jasmine method - do before test 
    afterEach(async () => { 
        await server.close();
        await Genre.remove({}); //clean up database 
    }); 

    describe('GET /', () => {
        it('should return all genres', async () => {
            const genres = [
                { name: 'genre 1' }, 
                { name: 'genre 2' }
            ]; 
            await Genre.collection.insertMany(genres);  //insert multiple docs in mongoDB in one go!

            const res = await request(server).get('/api/genres'); //returns a promise, await for response obj

            expect(res.status).toBe(200); //200 response 
            expect(res.body.length).toBe(2); 
            expect(res.body.some(g => g.name === 'genre 1')).toBeTruthy();  //array has method (.some)
            expect(res.body.some(g => g.name === 'genre 2')).toBeTruthy();  //array has method (.some)
        }); 
    }); 

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'genre 1'}); //mongoose set's object ID 
            await genre.save(); 

            const res = await request(server).get('/api/genres/' + genre._id); 

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name); 
            //expect(res.body).toMatchObject(genre); // cannot use because returns id as a string
        }); 

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1'); 

            expect(res.status).toBe(404);
        }); 

        //added this test to get better coverage 
        it('should return 404 if no genre with given ID exists', async () => {
            const id = mongoose.Types.ObjectId(); 
            const res = await request(server).get('/api/genres/' + id); 

            expect(res.status).toBe(404);
        }); 
 
    }); 

    describe('POST /', () => { 
         // Define the happy path, and then in each test, we change 
         // one parameter that clearly aligns with the name of the 
         // test. 
        
        let token; //init undefined (test suite level)
        let name; 

        const exec = async () => {
            return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name }); //set name dynamically (key = value, only set key)
        }

        beforeEach(() => {
            token = new User().generateAuthToken(); //initializing to valid json web token 
            name = 'genre 1'; //set name to happy path 
        })

        it('Should return 401 if client is not logged in', async () => {
            token = '' ; //set token to empty string (unauth scenario)

            const res = await exec();

            expect(res.status).toBe(401); 
        }); 

        it('Should return 400 if genre is less than 5 characters', async () => {
            name = '1234'; 

            const res = await exec(); 

            expect(res.status).toBe(400); 
        }); 

        it('Should return 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a'); //delimter of a - gives us 51 a's in an array 

            const res = await exec(); 

            expect(res.status).toBe(400); 
        }); 

        it('Should save genre if it is valid', async () => {
            await exec(); //happy path (extracted)

            const genre = Genre.find({ name: 'genre 1'}); 

            expect(genre).not.toBeNull();  
        }); 

        it('Should return genre if it is valid', async () => {

            const res = await exec(); 

            expect(res.body).toHaveProperty('_id'); 
            expect(res.body).toHaveProperty('name', 'genre 1'); 

        }); 

    });

    describe('PUT /:id', () => {
        let token; 
        let newnName; 
        let genre;
        let id;

        //PUT - happy path 
        const exec = async () => {
            return await request(server)
            .put('/api/genres/' + id)
            .set('x-auth-token', token)
            .send({ name: newName }); 
        }

        beforeEach(async () => {
            // Before each test we need to create a genre and 
            // put it in the database. 
            genre = new Genre( { name: 'genre one'});
            await genre.save(); 

            token = new User().generateAuthToken(); 
            id = genre._id; 
            newName = 'updatedName';  
        })

        it('should return 401 if client is not logged in', async () => {
            token = ''; 
      
            const res = await exec();
      
            expect(res.status).toBe(401);
          });

        it('Should return 400 if genre is less than 5 characters', async () => {
            newName = '1234'; 

            const res = await exec(); 

            expect(res.status).toBe(400); 
        }); 

        it('Should return 400 if genre is more than 50 characters', async () => {
            newName = new Array(52).join('a'); //delimter of a - gives us 51 a's in an array 

            const res = await exec(); 

            expect(res.status).toBe(400); 
        }); 

        it('should return 404 if id is invalid', async () => {
            id = '';
            
            const res = await exec(); //happy path with invalid id

            expect(res.status).toBe(404); //resource not found
        }); 

        it('should return 404 if genre with given id was not found', async () => {
            id = mongoose.Types.ObjectId; 

            const res = await exec();

            expect(res.status).toBe(404); //not found 
        }); 

        it('should update genre if input is valid ', async () => {
            await exec(); 

            const updatedGenre = await Genre.findById(genre._id); 

            expect(updatedGenre.name).toBe(newName); 
        });

        it('should return the updated genre if it is valid', async () => {
            const res = await exec(); //happy path 

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newName); 

        });
    });

    describe('DELETE /:id', () => {
        let token;
        let genre;
        let id;

        const exec = async () => {
            return await request(server)
            .delete('/api/genres/' + id)
            .set('x-auth-token', token)
            .send();
        }

        beforeEach(async () => {
            genre = new Genre( { name: 'genre 1' });
            await genre.save(); 

            id = genre._id;
            token = new User({ isAdmin: true }).generateAuthToken(); 
        })

        it('should return 401 if client is not logged in', async () => {
            token = ''; 

            const res = await exec(); 

            expect(res.status).toBe(401); //unauthorized 

        }); 

        it('should return 403 if user is not admin', async () => {
            token = new User( { isAdmin: false }).generateAuthToken(); 

            const res = await exec(); 

            expect(res.status).toBe(403); //forbidden
        }); 

        it('should return 404 if id is invalid', async () => {
            id = 1; 
            
            const res = await exec();
      
            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
      
            const res = await exec();
      
            expect(res.status).toBe(404);
          });


        it('should delete the genre if input is valid', async () => {
            await exec(); 

            const genreInDb = await Genre.findById(id); 

            expect(genreInDb).toBeNull(); 
        });

        it('should return the removed genre', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id', genre._id.toHexString());
            expect(res.body).toHaveProperty('name', genre.name); 
        }); 
    });
}); 
