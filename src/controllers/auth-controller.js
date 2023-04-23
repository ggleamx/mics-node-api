const APIResponse = require("../models/response-api-model");
const axios = require('axios');
const url = require('url');

class AuthController {
  constructor(repository) {
  }


  // https://api.instagram.com/oauth/authorize?client_id=147977888224192&redirect_uri=https://dev.micssocial.com/&scope=user_profile,user_media&response_type=code&=

  authUser = async (req, res) => {
  // construye la URL de autorización de Instagram
  const instagramAuthURL = "https://api.instagram.com/oauth/authorize?" +
    "client_id=147977888224192" +
    "&redirect_uri=https://localhost:8080/" +
    "&scope=user_profile,user_media" +
    "&response_type=code";

  // redirige al usuario a la página de autorización de Instagram
  res.redirect(instagramAuthURL);
}


redirectURI = async (req, res) => {
  // obtén la cadena de consulta de la URL de redirección
  const query = url.parse(req.url, true).query;

  // verifica si se recibió un código de autorización
  if (query && query.code) {
    const authorizationCode = query.code;

    return res.json(authorizationCode);
  } else {

    return res.json("error");
  }
};
}

module.exports = AuthController;
