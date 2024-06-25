var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStrategy=require('passport-local');
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//pinterest register
router.post("/register", (req, res) => {
  const { username, email, fullName } = req.body;
  let userData = new userModel({username,email,fullName,});
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    
    })
  })
});

//create user
router.get("/createuser", async function (req, res, next) {
  let user = await userModel.create({
    username: "sai",
    password: "sai",
    posts: [],
    email: "sai@email.com",
    fullName: "sai charan amudala",
  });
  res.send(user);
});

//create post
router.get("/createpost", async function (req, res, next) {
  let post = await postModel.create({
    postText: "second post",
    user: "6679c21bc1ba706482f2d12a",
  });
  let user = await userModel.findOne({ _id: "6679c21bc1ba706482f2d12a" });
  user.posts.push(post._id);
  await user.save();
  res.send("done");
});

//all posts
router.get("/allposts", async (req, res, next) => {
  let user = await userModel
    .findOne({ _id: "6679c21bc1ba706482f2d12a" })
    .populate("posts");

  res.send(user);
});

module.exports = router;
