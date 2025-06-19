const {Router} = require('express');
const{ validateMiddleware }= require( '../Middlewares/validateMiddleware');
const {validateUser}= require ('../validators/userValidator.js');
const controller = require('../Controllers/AuthController');


const router = Router(); 


router.post('/signup',validateMiddleware(validateUser),controller.signUp);
router.post('/logIn',controller.LogIn);

module.exports = router;


