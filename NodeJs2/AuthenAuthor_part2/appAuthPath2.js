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


//? create
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
            console.log('created ',createduser)

        })
    })
})

app.post('/login',async (req,res)=>{
    let user=await userModel.findOne({email:req.body.email});
    if(!user){
        return res.send('something went wrong')
    }
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        console.log(result)
        if(result) {
            let token=jwt.sign({email:user.email},'shhhhhh');
            res.cookie('token app',token)
            res.send('You logged in succesfully');
        }
        else{
            
            res.send("No, you can't login");
        } 
    })
})

app.get('/login',(req,res)=>{
    res.render('login')
})



//? log out
app.get('/logout',(req,res)=>{
    res.cookie('token app','')
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("server started in app Auth part 2")
})