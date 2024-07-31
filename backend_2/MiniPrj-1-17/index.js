const express=require('express');
const app=express();
const path=require('path');
const cookieParser = require('cookie-parser');
const userModel=require('./models/user');

app.use(cookieParser());

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send("hello mini")
 });

app.listen(3000,()=>console.log("server shuru hui"));