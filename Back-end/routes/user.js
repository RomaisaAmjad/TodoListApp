const {Router} = require('express');
const validateUser = require('../Middlewares/validateUser');

const router = Router(); 
const controller = require('../Controllers/AuthController');

router.post('/signup',validateUser,controller.signUp);
router.post('/logIn',controller.LogIn);

module.exports = router;