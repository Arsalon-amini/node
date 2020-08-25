const {User} = require('../../models/user'); 
const {Genre} = require('../../models/genre'); 
const request = require ('supertest'); 

describe('auth middleware', () => {
    beforeEach(async () => { server = require('../../index'); }) //Jasmine method - do before test 
    afterEach(async() => { 
        await Genre.remove({}); 
        await server.close(); //returns a promise 
    }); 
    
    let token; 

    //happy path 
    const exec = () => {
        return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre 1'}) ; //return promise, await it later! 
    }

    beforeEach( () => {
        token = new User().generateAuthToken(); 
    });

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec(); 

        expect(res.status).toBe(401); //unauthorized request 
    }); 

    it('should return 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec(); 

        expect(res.status).toBe(400); //bad request request 

    }); 

    it('should return 200 if token is valid', async () => {
        const res = await exec(); 

        expect(res.status).toBe(200); //authorized request 
    }); 
}); 