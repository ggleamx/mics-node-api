const { Router } = require('express');
const  AuthController  = require('../controllers/auth-controller.js')
const  AuthRepository  = require('../repositories/auth-repository.js')
const router = Router();
const controller = new AuthController(new AuthRepository()) 


router.get('/',controller.authUser);
router.get('/redirect',controller.redirectURI);

module.exports = router;

