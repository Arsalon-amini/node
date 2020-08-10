const Joi = require('@hapi/joi'); //client validation

module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi); //returns a function, objectId becomes method on Joy object
}