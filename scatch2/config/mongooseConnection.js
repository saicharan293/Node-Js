const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/2scatch2")
  .then(function () {
    console.log("config mongoose Connection");
  })
  .catch(function (err) {
    console.log("error", err);
  });

module.exports = mongoose.connection;
