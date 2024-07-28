const express=require('express');
const app=express();
const path=require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send("CRUD with ejs chalu kar")
})

app.listen(3000,()=>{
    console.log("server chalu kar")
})