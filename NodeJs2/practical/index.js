const express=require('express');
const app=express();
const path=require('path')

//for form-handling
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//for static files: css,js
app.use(express.static(path.join(__dirname,'public')));

//ejs setup
app.set('view engine','ejs')

//route
app.get('/',function(req,res){
    res.render('index')
})

app.get('/profile/:username',function(req,res){
    res.send(`welcome, ${req.params.username}`); 
})
app.get('/author/:username/:age',function(req,res){
    res.send(`welcome, ${req.params.username} of ${req.params.age} years old`); 
})

//server
app.listen(3000,function(){
    console.log("server running")
})