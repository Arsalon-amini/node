const moment = require('moment'); //used to calculate time out (rental)
const request = require('supertest'); //returns a function

const {Rental} = require('../../models/rental'); 
const {Movie} = require('../../models/movie'); 
const {User} = require('../../models/user'); //load Genre model and validate function 
const mongoose = require('mongoose'); 

//clean test approach - 
    // Define happy path 
    // in each test, change one parameter that would simulate an edge case

describe('/api/returns', () => {
    let server; 
    let customerId; 
    let movieId; 
    let rental; 
    let token; 
    let movie; 

    const exec = () => {
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send( { customerId, movieId })
    }

    beforeEach(async () => { 
        server = require('../../index'); 

        customerId = mongoose.Types.ObjectId(); //valid id
        movieId = mongoose.Types.ObjectId(); //valid id
        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345'},
            numberInStock: 10
        }); 
        await movie.save();
        
        rental = new Rental({
            customer: {
                _id: customerId,
                name: 'Arsalon A',
                phone: '0900-370-443'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();  
    }); 

    afterEach(async () => { 
        await server.close(); //close express 
        await Rental.remove({}); //remove movie using mongoose
        await Movie.remove({}); //clean up db 
    }); 

    it('should return 401 if client is not logged in', async () => {
        token = '' ; 

        const res = await exec(); 

        expect(res.status).toBe(401)
       
    }); 

    it('should return 400 if customerId is not provided', async () => {
        customerId = ''; 

        const res = await exec(); 

        expect(res.status).toBe(400); 
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = ''; 

        const res = await exec(); 

        expect(res.status).toBe(400); 
    });

    it('should return 404 if no rental found for this movie/customer', async () => {
        await Rental.remove({}); //delete rental added in beforeEach fn (isolate a variable)

        const res = await exec(); 

        expect(res.status).toBe(404); 
    });

    it('should return 400 if return is already processed ', async () => {
        rental.dateReturned = new Date(); //dateReturned variable tested (changed)
        await rental.save(); 

        const res = await exec(); //happy path w/ variable changed (sending payload to server with dateReturned already set in document)

        expect(res.status).toBe(400); 
    });

    it('should return 200 if a valid request ', async () => {
    
        const res = await exec(); //happy path w/ variable changed (sending payload to server with dateReturned already set in document)

        expect(res.status).toBe(200); 
    });

    it('should set returnDate if input is valid', async () => {
        const res = await exec(); //rental created by beforeEach() + saved in database

        const rentalInDb = await Rental.findById(rental._id); //get rental from database
        const diff = moment() - rentalInDb.dateReturned; //access dateReturned (subtract current time from time returned) 
        expect(diff).toBeLessThan(10 * 1000); //assert it's less than 10 seconds  
    });

    it('should calculate rentalFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate(); //set dateOut to 7 days before - moment returns current time object, .add (-7) gives us a moment object 7 days before
        await rental.save(); 

        const res = await exec(); //send POST request to server

        const rentalInDb = await Rental.findById(rental._id); //get document from db  

        expect(rentalInDb.rentalFee).toBe(14); //inspect -  $2 * 7days old = 14 
    });

    it('should increase the stock of the movie', async () => {
        const res = await exec(); 

        const movieInDb = await Movie.findById(movieId);   

        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1); 
    });

    it('should return rental if input valid', async () => {
        const res = await exec(); 

        const rentalInDb = await Rental.findById(movieId);   

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])); //Object.keys - returns array of all properties in res obj 
    });
}); 


