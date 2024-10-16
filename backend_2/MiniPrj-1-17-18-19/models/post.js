const mongoose = require("mongoose");

const post = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  date:{
    type:Date,
    default: Date.now
  },
  content: String,
  likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
  ]
});

module.exports = mongoose.model("post", post);
