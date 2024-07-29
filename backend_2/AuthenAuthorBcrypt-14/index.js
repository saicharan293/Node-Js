const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
const bcrypt=require('bcrypt');

//bcrypt => comparison of password with created hash
app.get('/',(req,res)=>{
    bcrypt.compare("mypassword", "$2b$10$vphZ7xKymTPCox2bWsiz6.KHAJqT2RYynr8CY0XjKHIWz9Yoi3RbO", function(err, result) {
        console.log(result);
    });
})
// $2b$10$vphZ7xKymTPCox2bWsiz6.KHAJqT2RYynr8CY0XjKHIWz9Yoi3RbO

app.listen(3000,()=>{
    console.log("server shuru")
})