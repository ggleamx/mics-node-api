const { Router } = require('express');
const  AuthController  = require('../controllers/auth-controller.js')
const  AuthRepository  = require('../repositories/auth-repository.js')
const router = Router();
const controller = new AuthController(new AuthRepository()) 
const validateRegularJWT = require('../middlewares/validate-regular-jwt');


router.post('/sign-up',controller.createUser)
router.post('/sign-in',controller.logIn)


router.get('/instagram',validateRegularJWT, controller.instagramAuth);
router.get('/redirect',controller.redirectURI);
router.post('/instagram/token',validateRegularJWT,controller.setToken);


// router.get('/webhooks', controller.manageWebHooks);

// router.get('/webhooks', controller.getWebHooks)
module.exports = router;

