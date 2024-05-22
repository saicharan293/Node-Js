const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatchProject")
.then(function(){
    console.log("connected on mongoose connection");
})
.catch(function(err){
    console.log("error is ",err)
})

module.exports=mongoose.connection;