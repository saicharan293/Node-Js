const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const path=require('path');
const bcrypt=require('bcrypt');
const userModel=require('./models/user');
const jwt=require('jsonwebtoken');


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/create' ,(req,res)=>{
    let{name,age,email,password}=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            // console.log(hash)
            let createduser=await userModel.create({
                name,age,email,password:hash
            })

            let token=jwt.sign({email},'shhhhhh');
            res.cookie('token app',token)
            res.send(createduser)

        })
    })
})

//? log out
app.get('/logout',(req,res)=>{
    res.cookie('token app','')
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("server started in app Auth part 2")
})