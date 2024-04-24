// First install express
// npm i express 

const express=require('express');

const app=express();

app.use(function(req,res,next){
    console.log("this is starting of middleware");
    next();
})

app.use(function(req,res,next){
    console.log(" second line in middle ware")
})

app.get('/',function(req,res){
    res.send('this is first route');
})

app.get('/profile',function(req,res){
    res.send(' changed to profile section   ')
})

app.listen(3000);