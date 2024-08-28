const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const db=require('./db');
const personModel=require('./models/Person');
const Menu = require('./models/Menu');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;



const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`)
  next();
}

app.use(logRequest);
passport.use(new localStrategy(async (username,password,done)=>{
  try {
    console.log('Received credentials:',username,password);
    const user=await personModel.findOne({username:username});
    if(!user) return done(null,false,{message:'Incorrect username.'})
    const isPassword=(user.password==password)?true:false;
    if(isPassword){
      return done(null,user);
    }else{
      return done(null, false,{message:'Incoorect password'})
    }
  } catch (error) {
    
  }
}))

app.use(passport.initialize());

app.get('/',passport.authenticate('local',{session:false}), function (req, res) {
  res.send('Heyy, what do you like to eat? ');

})


//Import person routes
const personRoutes=require('./routes/personRouter');

//Import menu routes
const menuRoutes=require('./routes/menuRouter');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

//trial post menu2
// app.post('/menu2',async function(req,res){
//   try{
//     const menudata2=req.body;
//     const menudb2=new Menu(menudata2);
//     const response=await menudb2.save();
//     res.status(200).json(response);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({err:'Internal server error'})
//   }
// })

//trial get menu 2
// app.get('/menu2',async function(req,res){
//   try{
//     const menudata2=await Menu.find()
//     res.status(200).json(menudata2)
//   }catch(err){
//     console.log(err);
//     res.status(500).json({err:'Internal server error'})
//   }
// })


const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log('server shuru')
})

