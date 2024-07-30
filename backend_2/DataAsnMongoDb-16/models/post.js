const mongoose=require('mongoose');

const post=mongoose.Schema({
    postdata:String,
    user:String,
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('post',post)