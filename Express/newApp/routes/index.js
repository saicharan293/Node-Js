var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts');
const passport = require('passport');
const localStrategy=require('passport-local');
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile',isLoggedIn, function(req, res, next) {
  res.send('profile');
});

router.post('/register' ,(req,res)=>{
  let{username,email,fullname}=req.body
  const userData=new userModel({
    username,email,fullname
  })
  userModel.register(userData,req.body.password)
  .then(()=>{
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    })
  })
})

router.post('/login' ,passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
  }),(req,res)=>{
})

router.get('/logout',function(req,res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  
  res.redirect('/')
}

module.exports = router;
