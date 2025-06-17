exports.validateTask=(req,res,next)=>{
    const{title,description,isCompleted}=req.body;

    if(!title || !description || isCompleted===undefined){
        return res.status(400).send("ERROR: title, description and isCompleted are required!");
    }
    next();
}