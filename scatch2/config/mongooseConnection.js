const mongoose = require("mongoose");
const dbgr=require('debug')('development:mongoose')
const config=require('config')

mongoose
  .connect(`${config.get("MONGODB_URI")}/2scatch2`)
  .then(function () {
    dbgr("config mongoose Connection");
  })
  .catch(function (err) {
    dbgr("error", err);
  });

module.exports = mongoose.connection;
