const express = require('express');
const app=express();
const userModel=require('./models/user')
const postModel=require('./models/post')

app.get('/',(req,res)=>{
    res.send('Hey this is data association')
})

app.get('/create',async (req,res)=>{
    let createduser= await userModel.create({
        username:'sai',
        age:23,email:'sai@gmail.com'
    })
    res.send(createduser)
})

app.get('/post/create',async(req,res)=>{
    // res.send("post is working")

    let post= await postModel.create({
        postdata:'Hello , kaise ho saare users',
        user:'6638bf2d106c4609cad76ebf'
    })
    let user=await userModel.findOne({
        _id:'6638bf2d106c4609cad76ebf'
    })
    user.posts.push(post._id);
    await user.save();

    res.send({post,user})
    
})

app.listen(3000,()=>{
    console.log("server started for data association")
})