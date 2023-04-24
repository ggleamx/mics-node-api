const Response = require("../models/response-model");

exports.deleteCode = (req,res,next) => {
 
    const delcode = req.header('x-delete');

    console.log(delcode);


    if(delcode === process.env.DELETECODE)
        next();

else
    return res.status(401).json(new Response(true,'Delete token missing.'))

}
