const { User } = require('../../../models/user'); //generateAuthToken 
const auth = require('../../../middleware/auth'); //call auth fn 
const mongoose = require('mongoose'); 

describe('auth middleware', () => {
    it('should populate req.user with a payload of a valid JWT', () => {
        const user = { 
            _id: mongoose.Types.ObjectId().toHexString(), //generate valid _id using mongoose 
            isAdmin: true 
        }; //create a decoded payload to compare req.user output from auth fn (control)

        const token = new User(user).generateAuthToken(); //create jwt payload (w/ id + admin status encoded) 

        const req = {
            header: jest.fn().mockReturnValue(token) //mock fn1  
        }; 
        const res = {}; //mock fn2 
        const next = jest.fn(); //mock fn3

        auth(req, res, next); //passes decoded jwt = req.user to next middleware 


        expect(req.user).toMatchObject(user); //test if auth fn returns req.user JWT that matches user

    }); 
}); 

