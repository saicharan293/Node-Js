var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

//create user
router.get("/create", async function (req, res, next) {
  let user = await userModel.create({
    username: "abc",
    name: "abc",
    age: 23,
  });
  res.send(user);
});


// all users
router.get("/all",async function (req, res, next) {
  let allusers=await userModel.find();
  res.send(allusers);
});

//search for specific user
router.get("/user",async function (req, res, next) {
  let allusers=await userModel.findOne({username:'abc'});
  res.send(allusers);
});

//delete specific user
router.get("/delete",async function (req, res, next) {
  let deleteduser=await userModel.findOneAndDelete({username:'abc'});
  res.send(deleteduser);
});


module.exports = router;
