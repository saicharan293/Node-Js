require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const PORT= 5000 || process.env.PORT;

// connect to mongo
connectDB()

app.use(express.static('public'))

app.use(expressLayout);
app.set('layout', './layout/mainLayout');
app.set('view engine', 'ejs');

app.use('/',require('./server/routes/mainRoute'))
app.listen(PORT, ()=>{
    console.log('App listening on port ',PORT);
})