const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const bcrypt=require('bcrypt');

//bcrypt => encryption of password
app.get('/',(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("mypassword", salt, function(err, hash) {
            console.log('hash',hash)
        });
    });
})

app.listen(3000,()=>{
    console.log("server shuru")
})