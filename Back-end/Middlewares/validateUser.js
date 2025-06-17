exports.validateUser=(req,res,next)=>{
    const{username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).send("ERROR: username, email and password are required!");
    }
    next();
}