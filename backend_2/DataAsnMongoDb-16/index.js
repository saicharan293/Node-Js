const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("its working....");
});


//create
app.get("/create",async (req, res) => {
    
    let createdUser= await userModel.create({
        username:"a",
        age:23,
        email:"a@aa"
    })
    res.send(createdUser);
});

app.listen(3000, () => {
  console.log("server shuru hui");
});
