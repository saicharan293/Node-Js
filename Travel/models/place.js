const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: { 
    type: String,
    required:true
   },
  description: String,

  image: {
    type:String,
    default:"https://images.unsplash.com/photo-1568812315803-7f6419ff8d3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhY2VzfGVufDB8fDB8fHww",
    set:(v)=>v===""?"default":v,
  },
  price: Number,
  location: String,
  country: String,
});

const placeModel=mongoose.model('Place',placeSchema);
module.exports=placeModel;