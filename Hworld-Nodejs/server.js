const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const db=require('./db');
const personModel=require('./models/Person')


app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ')
})

app.post('/person',async function(req,res){
  try{
    const data=req.body;
    const newPeron=new personModel(data);
    const response=await newPeron.save()
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log('some error',err);
    res.status(500).json({err:'Internal server error'})
  }
})

//get person detail

app.get('/person',async (req,res)=>{
  try{
    const data=await personModel.find();
    console.log('data fetched')
    res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server error'})
  }
})

app.listen(3000,()=>{
  console.log('server shuru')
})

