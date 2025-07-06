
const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateUser = (data) => {
    
    return userSchema.validate(data);
};

module.exports = { validateUser };