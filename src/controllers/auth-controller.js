const APIResponse = require("../models/response-api-model");
const Response = require('../models/response-model')
const bcryptjs = require('bcryptjs');
const uuidv4 = require('uuid').v4;
const { generateJWT } = require("../helpers/generateJWT");

const BaseController = require("./base-controller");
const axios = require('axios');
const url = require('url');

class AuthController extends BaseController {
  constructor(repository) {
    super(repository)
  }


  instagramAuth = async (req, res) => {

  // genera un identificador de estado único para esta solicitud de autorización
  const state = `${req.payload.uuid}`;

  // guarda el identificador de estado en la sesión de usuario
  req.session.state = state;
  // construye la URL de autorización de Instagram
  const instagramAuthURL = "https://api.instagram.com/oauth/authorize?" +
    `&client_id=${process.env.CLIENT_ID}`+
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


    await this.repository.patchDocument("users",{instagram_code:authorizationCode},req.payload.uuid);
      return res.json(new APIResponse().ok200("Código de autorización recibido correctamente"));
      // el identificador de estado es válido, utiliza el código de autorización y el identificador de estado para solicitar un token de acceso
      // ...
      // haz lo que necesites hacer con el código de autorización aquí
    } else {

      return res.json(new APIResponse().badRequest400("El identificador de estado no coincide"))
      // el identificador de estado no coincide, manejar el error
      // ...
    }
  } else {
    // no se recibió un código de autorización válido o un identificador de estado, manejar el error
    return res.json(new APIResponse().badRequest400("No se recibió un código de autorización válido o un identificador de estado"))

  }
};

logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await this.repository.getDocumentByKey(
      "users",
      "user",
      email
    );

    if (user === null)
      return res
        .status(401)
        .json(new Response(true, "Wrong username | password"));
    else if (!user["state"])
      return res
        .status(401)
        .json(
          new Response(
            true,
            "You’re account is blocked. Get it contact with the administrator."
          )
        );

    const userData = await this.repository.getDocumentByKey(
      "users_data",
      "userid",
      user.uuid
    );

    const strikes = +user["pwd_strikes"];

    if (strikes >= 5) {
      await this.repository.patchDocument(
        "users",
        { state: false },
        user.uuid
      );
      return res
        .status(401)
        .json(
          new Response(
            true,
            "You’ve reached the maximum logon attempts. Get it contact with the administrator."
          )
        );
    }

    const validPassword = bcryptjs.compareSync(password, userData.password);

    if (!validPassword) {
      await this.repository.patchDocument(
        "users",
        { pwd_strikes: strikes + 1 },
        user.uuid
      );

      return res
        .status(401)
        .json(new Response(true, "Wrong username or password"));
    }
    const token = await generateJWT(user.uuid, user.type, user.role,user.permissions);
    await this.repository.patchDocument(
      "users",
      { state: true, pwd_strikes: 0 },
      user.uuid
    );

    return res.json(
      new Response(false, "Login successful", {
        user,
        token,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new Response(true, "Fatal error while login user", null, error));
  }
};


createUser = async (req, res) => {
  const dateNow = new Date(Date.now())

  try {
    const user = req.body;
    const userAlreadyExits = await this.repository.getDocumentByKey('users', 'user', user.user);

    if (userAlreadyExits)
      return res.status(401).json(new Response(true, "User email already exists"));


    const salt = bcryptjs.genSaltSync()
    let naked = user.password

    user["createdAt"] = dateNow;
    user["updatedAt"] = dateNow;

    delete user.password;

    const userUuid = uuidv4();


    user["pwd_strikes"] = 0;
    
    const saveUser = await this.repository.postDocument('users', user, userUuid)

    if (saveUser) {

      const userData = {
        password: bcryptjs.hashSync(naked, salt),
        updatedAt: dateNow,
        userid: userUuid
      }

      const userDataUuid = uuidv4();

      const saveUserData = await this.repository.postDocument('users_data', userData, userDataUuid);

      if (saveUserData) {
        return res.status(201).json(new Response(false, 'User successfuly created', saveUser))
      } else {
        // Rollback ??? 
        return res.status(500).json(new Response(true, "User data could not be saved"))
      }

    }

    return res.status(500).json(new Response(true, 'User could not be saved', null, error))

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new Response(true, 'Fatal while creating a user', null, error))
  }
}
}

module.exports = AuthController;
