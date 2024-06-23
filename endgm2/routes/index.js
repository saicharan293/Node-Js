var express = require("express");
var router = express.Router();
const userModel = require("./users");
const localStrategy=require('passport-local');
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

//register=> sign up
router.post('/register',(req,res)=>{
  var userdata=new userModel({
    username:req.body.username,
    secret:req.body.secret
  });
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})

//login route
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})

//profile route
router.get('/profile',isLoggedIn,(req,res)=>{
  res.send('welcome to profile')
})

//logout
router.get('/logout',function(req,res){
  req.logout(function(err){
    if (err) return next(err);
    res.redirect('/')
  })
})

//middle ware
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) return next();
  res.redirect('/')
}

//create -> Mongodb
router.get("/create", async function (req, res, next) {
  let user = await userModel.create({
    username: "sai",
    nickname: "sai",
    description: "shuru game 2",
    categories: ["yoga", "peace", "Angular js", "Html", "css"],
  });
  res.send(user);
});

//case-insensitive conversion (also called partial search)
router.get('/find',async(req,res,next)=>{
  //partial search includes
  // let regex=new RegExp('sai','i')
  // let user= await userModel.find({username:regex})
  //only search
  let regex=new RegExp('^sai$','i')
  let user=await userModel.find({username:regex})
  res.send(user);
})

//search for users containing particular category
router.get('/findcategory',async(req,res,next)=>{
  let cat=await userModel.find({categories:{ $all:['Html']}});
  res.send(cat);
})

//search for data in between dates
router.get('/finddate',async (req,res,next)=>{
  var date1=new Date('2024-06-23');
  var date2=new Date('2024-06-24');
  let userdate=await userModel.find({dateCreated:{$gte: date1,$lte:date2}});
  res.send(userdate)
})

//search for users containing category field
router.get('/category',async(req,res,next)=>{
  let cat=await userModel.find({categories:{ $exists:true}});
  res.send(cat);
})


//search for users with specific field length
router.get('/len',async(req,res,next)=>{
  let cat=await userModel.find({
    $expr:{
      $and: [
        {$gte: [{$strLenCP: '$username'},0]},
        {$lte: [{$strLenCP:'$username'},3]}
      ]
    }
  });
  res.send(cat);
})

//findall
router.get('/all',async (req,res,next)=>{
  let allusers=await userModel.find();
  res.send(allusers);
})

//flash creation
router.get("/failed", function (req, res, next) {
  req.flash("age", 12);
  req.flash("name", "sai");
  res.send("bangaya");
});

//check flash message and data transfer
router.get("/checkfailed", function (req, res, next) {
  console.log(req.flash("age"), req.flash("name"));
  res.send("check backend ke terminal par");
});

module.exports = router;
