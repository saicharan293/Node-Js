const mongoose=require('mongoose');

const post=mongoose.Schema({
    postdata:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('post',post)