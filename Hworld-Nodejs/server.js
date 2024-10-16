const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const db=require('./db');
const personModel=require('./models/Person');
const Menu = require('./models/Menu');
const passport=require('./auth');
// const passport=require('passport');
// const localStrategy=require('passport-local').Strategy;



const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`)
  next();
}

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.use(logRequest);
app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ');
})


//Import person routes
const personRoutes=require('./routes/personRouter');

//Import menu routes
const menuRoutes=require('./routes/menuRouter');

app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu', localAuthMiddleware,menuRoutes);

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log('server shuru')
})

