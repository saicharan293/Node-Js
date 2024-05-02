const express = require("express");
const app = express();

//blob for backend
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//route
app.get("/", function (req, res) {
  res.send("Hello World");
});

//about route
app.get('/about',function(req,res,next){
    res.send('about page')
})



//server
app.listen(3000);
