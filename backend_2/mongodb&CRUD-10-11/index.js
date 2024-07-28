const express=require('express');
const app=express();
const path=require('path');

const userModel=require('./userModel');

//just for practice, not required here yet
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send('crud using mongoose started')
})

app.listen(3000,()=>{
    console.log("Server shuru hui")
})