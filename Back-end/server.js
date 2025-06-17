require('dotenv').config(); // saving khufiiya data
const cors = require('cors'); // this will allow FE to send requests to BE

const express = require('express');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
//Imports
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);

app.use(function(req,res){
    res.status(404).send("Invalid Route, Not Found!")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})