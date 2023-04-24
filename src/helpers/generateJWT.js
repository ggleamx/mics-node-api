const jwt = require("jsonwebtoken");


const generateJWT = (uuid = '', type = '',role = '',permissions = '') => {
    return new Promise((resolve,reject) => {
        
        const payload = { uuid, type, role, permissions };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: type === 'USERACCOUNT' ? '1h' : '4380h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('Token could not be generated')
            } else {
                resolve(token);
            }

        })
    })
}


module.exports = {
    generateJWT
}