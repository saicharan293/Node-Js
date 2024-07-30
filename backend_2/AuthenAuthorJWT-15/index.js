const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

//create
app.post("/create",  (req, res) => {
  let { username, email, password, age } = req.body;
  
  //encrypting the password using bcrypt
  //salt => some encryption string
  //hash => salt+password (encrypted password)

  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(password,salt,async (err,hash)=>{
        let createdUser =await  userModel.create({
                username,
                email,
                password:hash,
                age,
            });
        let token=jwt.sign({email},"mysecret");
        res.cookie("token name",token)
        res.send(createdUser);
    })
  })



});

//logout route
app.get('/logout',(req,res)=>{
    res.cookie("token name","")
    res.redirect('/')
})

app.listen(3000, () => {
  console.log("server shuru hua");
});
