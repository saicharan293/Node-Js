const express=require('express');
const app= express();
const userModel=require('./models/user');
const cookieParser = require('cookie-parser');

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.render("index")
})
app.post('/register',async(req,res)=>{
    let{email,age,password,name,username}=req.body;
    let user=await userModel.findOne({email})
    if(user) return res.status(500).send('user already registered');
    else
})
app.get('/home',(req,res)=>{
    res.send("mini2 getting started")
})
app.listen(3000,()=>{
    console.log("mini2 server shuru hua")
})