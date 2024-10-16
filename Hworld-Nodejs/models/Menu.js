const mongoose=require('mongoose');

const menuModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true,
    },
    is_drink:{
        type:Boolean,
        defalut:false
    },
    ingredients:{
        type:[String],
        defalut:[],
    },
    num_sales:{
        type:Number,
        defalut:0,
    }
})

module.exports=mongoose.model('menu',menuModel)

