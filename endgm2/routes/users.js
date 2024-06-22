const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/endgm2");

const userSchema=mongoose.Schema({
  username:String,
  nickname:String,
  description:String,
  categories:{
    type:Array,
    default:[]
  },
  dateCreated:{
    type: Date,
    default:Date.now()
  }
})
module.exports=mongoose.model('user',userSchema);