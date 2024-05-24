const mongoose=require('mongoose');
const deb=require("debug")("development:mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/scatchProject")
.then(function(){
    console.log("connected");
    debug("connected on mongoose connection");
})
.catch(function(err){
    deb("error is ",err);
})

module.exports=mongoose.connection;