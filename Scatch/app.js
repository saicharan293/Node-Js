const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path=require('path');
const db=require('./config/mongooseConnection')
const ownerRouter=require('./routes/ownerRouter')
const productsRouter=require('./routes/productsRouter')
const userRouter=require('./routes/userRouter')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine',"ejs");

app.use('/owners',ownerRouter)
app.use('/users',userRouter)
app.use('/products',productsRouter)
app.listen(3000)