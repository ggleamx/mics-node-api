const APIResponse = require("../models/response-api-model");
const BaseController = require("./base-controller");
const axios = require('axios');
const url = require('url');

class AuthController extends BaseController {
  constructor(repository) {
    super(repository)
  }


  authUser = async (req, res) => {

  // genera un identificador de estado único para esta solicitud de autorización
  const state = "yeyo";
  // guarda el identificador de estado en la sesión de usuario
  req.session.state = state;


  // construye la URL de autorización de Instagram
  const instagramAuthURL = "https://api.instagram.com/oauth/authorize?" +
    process.env.CLIENT_ID +
    `&redirect_uri=${process.env.REDIRECT_URI}` +
    "&scope=user_profile,user_media" +
    "&response_type=code"+
    "&state=" + state;


  // redirige al usuario a la página de autorización de Instagram
  res.redirect(instagramAuthURL);
}


redirectURI = async (req, res) => {
  // obtén la cadena de consulta de la URL de redirección
  const query = url.parse(req.url, true).query;

  // verifica si se recibió un código de autorización y un identificador de estado
  if (query && query.code && query.state) {
    const authorizationCode = query.code;
    const state = query.state;

    console.log(authorizationCode,state)

    // verifica que el identificador de estado recibido es el mismo que el utilizado en la solicitud de autorización original
    if (state === req.session.state) {

      return res.json([state,req.session.state])
      // el identificador de estado es válido, utiliza el código de autorización y el identificador de estado para solicitar un token de acceso
      // ...
      // haz lo que necesites hacer con el código de autorización aquí
    } else {

      return res.json("El identificador de estado no coincide")
      // el identificador de estado no coincide, manejar el error
      // ...
    }
  } else {
    // no se recibió un código de autorización válido o un identificador de estado, manejar el error
    return res.json("No se recibió un código de autorización válido o un identificador de estado")

    // ...
  }
};
}

module.exports = AuthController;
