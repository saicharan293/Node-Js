const express = require('express')
const app = express()

const db=require('./db');

app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ')
})

app.listen(3000,()=>{
  console.log('server shuru')
})

