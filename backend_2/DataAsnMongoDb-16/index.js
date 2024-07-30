const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("its working....");
});


//create user
app.get("/create",async (req, res) => {
    let createdUser= await userModel.create({
        username:"a",
        age:23,
        email:"a@aa"
    })
    res.send(createdUser);
});

//create post
app.get("/post/create",async (req, res) => {
    let createdPost=await postModel({
        postdata:"hello saare log kaise ho",
        user:"66a93522523acc6528b9b361"
    })

    let user=await userModel.findOne({_id:"66a93522523acc6528b9b361"})

    user.posts.push(createdPost._id);
    await user.save();
    res.send({createdPost,user})
});

app.listen(3000, () => {
  console.log("server shuru hui");
});
