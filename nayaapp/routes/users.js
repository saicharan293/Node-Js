const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/nayaapp");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }],
    dp: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
