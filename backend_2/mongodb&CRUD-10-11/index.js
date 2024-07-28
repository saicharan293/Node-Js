const express=require('express');
const app=express();
const path=require('path');

const userModel=require('./userModel');

//just for practice, not required here yet
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send('crud using mongoose started')
})

//Create operation
app.get('/create',async (req,res)=>{
    let createdUser=await userModel.create({
        name:"charan",
        email:"charan@gmail.com",
        username:"charan"
    })
    res.send(createdUser)
})

//update operation
app.get('/update',async (req,res)=>{
    let updatedUser=await userModel.findOneAndUpdate({username:'sai'},{name:'sai charan amudala'},{new:true})
    res.send(updatedUser)
})

//Read operation

//read all the users
app.get('/readAll',async (req,res)=>{
    let users=await userModel.find();
    res.send(users)
})

//read all the users
app.get('/readOne',async (req,res)=>{
    // let users=await userModel.find({name:'charan'});
    let users=await userModel.findOne({name:'charan'});
    res.send(users)
})

app.listen(3000,()=>{
    console.log("Server shuru hui")
})