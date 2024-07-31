const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//register route
app.post("/register", async (req, res) => {
  let { username, fullname, password, age, email } = req.body;
  let existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(500).send("user already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        fullname,
        age,
        email,
        password: hash,
      });

      let token = jwt.sign(
        {email: email, userid:user._id },
        "mysecret"
      );
      res.cookie("token name", token);
      res.send("registration successful!!!");
    });
  });
});

//login post route
app.post("/login", async (req, res) => {
  let { password, email } = req.body;
  let existingUser = await userModel.findOne({ email });
  if (!existingUser) return res.status(500).send("Something went wrong");

  //decryption of password
  
  bcrypt.compare(password,existingUser.password,(err,result)=>{
    if(result) res.status(200).send(" Login successfull")
    else res.redirect('/')
  })
  
});

app.listen(3000, () => console.log("server shuru hui"));
