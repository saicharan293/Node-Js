const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniproject');

const user=mongoose.Schema({
    username:String,
    fullname:String,
    age:Number,
    email:String,
    password:String
})

module.exports=mongoose.model('user',user)