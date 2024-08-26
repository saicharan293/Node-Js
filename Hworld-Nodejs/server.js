const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const db=require('./db');
const personModel=require('./models/Person');
const Menu = require('./models/Menu');


app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ')
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




app.listen(3000,()=>{
  console.log('server shuru')
})

