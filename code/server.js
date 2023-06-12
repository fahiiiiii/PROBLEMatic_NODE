const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 

require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('Connected!'));


app.use(bodyParser.json());

//? API  to check connection
app.get('/',(req,res)=>{
    res.json({message: 'Welcome to our app..!'});
})


let users = [];
let last_id = 0;

//? API to create user
app.post('/users',(req,res)=>{   
    const user = req.body;
    user.id = ++last_id;
    users.push(user);
    
    res.status(201).json(user);
})



app.get('/users/:id',(req,res)=>{ 
    const id =req.params.id;
    const user = users.find((u) => u.id==id);
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json({message:'User not found.!'});
    }
})

//? api for updating user as like name changing ,mail changing etc
app.put('/users/:id',(req,res)=>{
    const required_id = req.params.id;
    const body = req.body;
    const user = users.find((u)=>u.id ==required_id);
    if(user){
        user.fname = body.fname,
        user.lname = body.lname
        res.json(user);
    }
    else{
        res.status(404).json({message: "User not found..!"});
    }
})

//? api to delete operation
app.delete('/users/:id',(req,res)=>{
    const req_id = req.params.id;
    // const user = users.find((member)=> member.id == req_id);
    
    const userIndex = users.findIndex((member)=> member.id == req_id);
    // console.log("findIndex = ", userIndex)
    if(userIndex){
        users.splice(userIndex,1);
        res.json(users);
    }
    else{
        res.status(404).json({message: "User not found"});
    }
});


//? get all users
app.get('/users',(req,res)=>{
    res.json(users);
})


const port = process.env.PORT;
//localhost 3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
