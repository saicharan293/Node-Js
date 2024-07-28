const express=require('express');
const app=express();
const path=require('path');

//practice purpose, not yet used
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render("index")
})

//read 
app.get('/read',(req,res)=>{
    res.render("read")
})

app.listen(3000,()=>{
    console.log("server chalu kar")
})