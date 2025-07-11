const {Router} = require('express');
const{ validateMiddleware }= require( '../middlewares/validate.middleware.js');
const {validateUser}= require ('../validators/user.validator.js');
const controller = require('../controllers/auth.controller');


const router = Router(); 


router.post('/signUp',validateMiddleware(validateUser),controller.signUp);
router.post('/logIn',controller.logIn);

module.exports = router;


