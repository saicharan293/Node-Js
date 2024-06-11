
const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path=require('path');

const db=require('./config/mongooseConnection');
const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const index=require('./routes/index');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/',index);

app.listen(3000,()=>{
    // console.log("scatch 2 shuru hua abhi")
})