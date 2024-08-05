const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniprj");

const user = mongoose.Schema({
  username: String,
  fullname: String,
  age: Number,
  email: String,
  password: String,
  profilepicture: {
    type: String,
    default: "default.jpeg",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", user);
