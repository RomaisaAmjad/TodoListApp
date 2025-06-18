const Joi = require("joi");

const userSchema = Joi.object({
    username : Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(4).max(20).required(),
});


module.exports=(req,res,next)=>{
    const{err,value}= userSchema.validate(req.body);

    if(err){
        res.status(400).send("Error in validate Task Function!");
    }
    
    req.body = value;
    next();
}