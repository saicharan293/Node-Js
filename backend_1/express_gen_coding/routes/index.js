var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  // req.session.mysession=true;
  res.cookie('cookie ka age',123)
  res.render("index");
});

//check cookie
router.get('/readcookie',(req,res,next)=>{
  res.send(req.cookies['cookie ka age'])
})
//delete cookie
router.get('/deletecookie',(req,res,next)=>{
  res.clearCookie('cookie ka age')
  res.send('cookie is clear')
})

//check session
router.get('/checksession',(req,res,next)=>{
  if(req.session.mysession){
    res.send('you are banned')
  }
  else {
    res.send('not banned yet')
  }
})

//remove session
router.get('/removesession',(req,res,next)=>{
  req.session.destroy(function(err){
    if (err) throw err;
    // console.log(err);
    res.send('session removed')
  })
})

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
