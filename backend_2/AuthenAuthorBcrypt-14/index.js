const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cookieParser());

// encription of user details
app.get("/", (req, res) => {
  let token = jwt.sign({ email: "sai@example.com" }, "mysecret");
  res.cookie("token", token);
  console.log("token", token);
  res.send('done')
});

//decreption of user details
app.get('/read',function(req,res){
    let data=jwt.verify(req.cookies.token,"mysecret");
    console.log("data",data)
})

app.listen(3000, () => {
  console.log("server shuru");
});
