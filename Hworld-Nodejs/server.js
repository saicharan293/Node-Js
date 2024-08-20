const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Heyy, what do you like to eat? ')
})

app.get('/idli', function (req, res) {
  res.send('I would serve Idli ')
})

app.listen(3000)

