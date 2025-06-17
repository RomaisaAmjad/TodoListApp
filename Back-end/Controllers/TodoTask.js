const {Task} = require('../models/index.js');
const{asyncWrapper} = require('../Middlewares/AsyncWrapper');


exports.getAllTasks = asyncWrapper(async function(req,res){
   console.log("DEBUG: Logged in userId = ", req.userId); 
         const tasks = await Task.findAll(
            {
               where:{
                  userId:req.userId
               }
            }
         ); 
         res.send(tasks);
}); 

exports.createTask= asyncWrapper(async function(req,res){
            const {title,description,isCompleted}=req.body;
            const userId = req.userId;
            const task= await Task.create({
               title:title,
               description:description,
               isCompleted:isCompleted,
               userId:userId
             })
            
             res.status(201).send(task);
});


exports.updateTask = asyncWrapper(async function(req,res){
      
      const {title,description,isCompleted} = req.body;
      const{id} = req.params;
      await Task.update({
         title,
         description,
         isCompleted
      },{
         where:{
            id:id
         }
      })
      res.status(200).send("Task updated successfully!");
});

exports.deleteTask = asyncWrapper(async function(req,res){
         const{id} = req.params;
         await Task.destroy({
            where:{
               id : id
            }
         })
         res.status(200).send("Task deleted successfully!");
   });
     
