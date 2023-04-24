const Response = require("../models/response-model");
const jwt = require('jsonwebtoken');

adminValidator = (req,res,next) => {

    try {

        if(req.payload.role === 'ADMIN' && req.payload.type === 'USERACCOUNT'){
            next();
        } else 
            return res.status(401).json(new Response(true,"The user does not have the necessary permissions"))

    } catch (error) {
        console.log(error)
        return res.status(401).json(new Response(true,"Token not valid"))
    }
    
}

module.exports = adminValidator;