const Response = require("../models/response-model");
const jwt = require("jsonwebtoken");
validateRegularJWT = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json(new Response(true, "Token not received"));
  }
  try {
    const payload = validateToken(token);
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(new Response(true, "Token not valid"));
  }
};

const validateToken = (token) => {
    return jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  };
  
module.exports = validateRegularJWT;
