const express=require('express');
const app=express();
const path=require('path')

//these are called parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static files (css, js, images) access
//__dirname = the path upto root folder level(current folder)
app.use(express.static(path.join(__dirname,'public')))

//this is ejs set up
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render("index")
})

//dynamic routing starts with /: 
// dyn router 1
app.get('/profile/:username',function(req,res){
    res.send(`${req.params.username} aagaya, sher bolthe sher`)
})

// dyn router 2
app.get('/profile/:username/:age',function(req,res){
    res.send(`${req.params.username} aagaya, sher bolthe sher, aur uska umr ${req.params.age}`);
    //total data sending
    // res.send(req.params)
})

app.listen(3000,function(){
    console.log("server shuru")
})