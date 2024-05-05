const express = require('express');
const app=express();
const cookieParser=require('cookie-parser')
// const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.use(cookieParser());

app.get('/',(req,res)=>{
    let token= jwt.sign('sai@gmail.com','highsecret')
    res.cookie('token',token);
    res.send('cookie generated through jwt')
    // console.log(token)
})

app.get('/read',(req,res)=>{
    let data=jwt.verify(req.cookies.token,'highsecret');
    console.log(data)
})

app.listen(3000,()=>{
    console.log("server started")
});