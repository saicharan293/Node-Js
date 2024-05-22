const mongoose=require('mongoose')

// mongoose.connect('mongodb://127.0.0.1/scatch')

const ownerSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    isadmin:boolean,
    products:{
        type:Array,
        default:[]
    },
    gstn:String,
    picture: String
})

module.exports=mongoose.model('owner',ownerSchema)