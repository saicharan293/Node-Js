const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.cookie("name",'charan')
    res.send('cookie created')
})

app.listen(3000,()=>{
    console.log("server shuru")
})