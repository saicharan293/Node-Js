const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.send('Hello backend 2')
})
app.listen(3000,()=>{
    console.log('server chalu hui')
})