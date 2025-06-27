const {Router} = require('express');
const{ validateMiddleware }= require( '../Middlewares/validateMiddleware');
const {validateUser}= require ('../validators/userValidator.js');
const controller = require('../Controllers/AuthController');


const router = Router(); 


router.post('/signUp',validateMiddleware(validateUser),controller.signUp);
router.post('/logIn',controller.logIn);

module.exports = router;


