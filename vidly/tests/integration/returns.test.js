const {Rental} = require('../../models/rental'); 
const {User} = require('../../models/user'); //load Genre model and validate function 
const mongoose = require('mongoose'); 
const request = require('supertest'); //returns a function


describe('/api/returns', () => {
    let server; 
    let customerId; 
    let movieId; 
    let rental; 
    let token; 

    token = new User().generateAuthToken();

    const exec = async () => {
        return await request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send( { customerId, movieId })
    }

    beforeEach(async () => { 
        server = require('../../index'); 

        customerId = mongoose.Types.ObjectId(); //valid id
        movieId = mongoose.Types.ObjectId(); //valid id
        
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
    }) 
    afterEach(async () => { 
        await server.close();
        await Rental.remove({}); //clean up db
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
}); 