const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ')
})

app.get('/idli', function (req, res) {
  res.send('I would serve Idli ')
})

app.get('/ravvaidli',(req,res)=>{
  var customised_Khana={
    name:'ravva idli',
    size:'10 cm diameter',
    sambar_chahiye:true,
    chutney_chahiye:true
  }
  res.send(customised_Khana)
})

app.post('/person',(req,res)=>{
  var person={
    name:"bot",
    age:25,
    salary:25000,
    role: 'kuch bhi',
    address:'destination'
  }
  res.send(person)
})

app.listen(3000,()=>{
  console.log('server shuru')
})

