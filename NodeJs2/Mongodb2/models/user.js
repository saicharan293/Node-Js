
const mongoose=require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice2`)
// mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`)
const userSchema2=mongoose.Schema({
    name:String,
    image:String,
    email:String
})

module.exports=mongoose.model('user2',userSchema2)