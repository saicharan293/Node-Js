var express = require('express');
var router = express.Router();
const userModel=require('./users');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  const user= new userModel({
    username:req.body.username,
    email:req.body.email,
    contact:req.body.contact
  })
  userModel.register(user,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
});

router.post('/profile',passport.authenticate('local',{
  failureRedirect:'/',
  successRedirect:'/profile'
}), function(req, res, next) {
});

router.get('/logout',function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})


module.exports = router;
