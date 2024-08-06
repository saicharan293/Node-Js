const app=require('express')();

app.get('/',(req,res)=>{
    res.send('first route is here')
})

app.listen(3000,()=>{
    console.log("telugu SERVER shuru")
})