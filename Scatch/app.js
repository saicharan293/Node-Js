const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    console.log("route made")
})
app.listen(3000,()=>{
    console.log("Scatch shuru")
})