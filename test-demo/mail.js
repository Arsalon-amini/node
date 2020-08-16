module.exports.send = function (email, message) {
    return new Promise((resolve, reject) => {
        resolve( message); 
    })
}