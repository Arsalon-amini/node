const bcrypt = require('bcrypt');

//
async function run(){
    const salt = await bcrypt.genSalt(10); //overload returns a promise, await it 
    const hashed = await bcrypt.hash('1234', salt); //get promise 
    console.log('salt: ' + salt)
    console.log('salt + hash: ' + hashed)
}

run(); 