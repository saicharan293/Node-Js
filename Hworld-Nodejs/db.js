const mongoose = require("mongoose");

// const mongoUrl='mongodb://127.0.0.1/hworld-hotels'
//web hosting for mongo
const mongoUrl =
  "mongodb+srv://saicharan:shivaay123@mymongo.uv55x.mongodb.net/";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//event listener
db.on("connected", () => {
  console.log("Mongo db server connected");
});

db.on("disconnected", () => {
  console.log("Mongo db server disconnected");
});

module.exports = db;
