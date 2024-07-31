const express=require('express');
const app=express();
const path=require('path');
const cookieParser = require('cookie-parser');
const userModel=require('./models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const postModel=require('./models/post')

app.use(cookieParser());

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render("index")
 });

 //register route
app.post('/register',async (req,res)=>{
    let {username,fullname,password,age,email}=req.body;
    let existingUser=await userModel.findOne({email});
    if(existingUser) return res.status(500).send("user already registered")
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser=await userModel.create({
                username,
                fullname,
                age,
                email,
                password:hash
            });

            let token=jwt.sign({email: email,userid:createdUser._id}, "mysecret");
            res.cookie('token name',token)
            res.send('registration successful!!!')
        })
    })
    
    res.render("index")
 });

app.listen(3000,()=>console.log("server shuru hui"));