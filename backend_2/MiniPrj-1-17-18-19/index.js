const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");
const user = require("./models/user");
const multer=require('multer');
const crypto=require('crypto');

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,function(err,bytes){
      const fn=bytes.toString('hex')+path.extname(file.originalname)
      cb(null, fn)
    })
  }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

//get route for test
app.get("/test", (req, res) => {
  res.render("test");
});

//post route for test
app.post("/upload", upload.single('image') , (req, res) => {
  console.log(req.file);
  // res.render("test");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//profile route
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate('posts');
  res.render("profile", { user });
});

//like route
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate('user');
  if(post.likes.indexOf(req.user.userid)=== -1){
    post.likes.push(req.user.userid)
  }
  else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
  }
  await post.save();
  // console.log("change" ,post.likes.indexOf(req.user.userid))
  res.redirect("/profile");
});

//edit get route
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate('user');
  res.render('edit',{post})
});

//edit update route
app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content:req.body.content});
  res.redirect('/profile')
});

//post route
app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let post = await postModel.create({
    user: user._id,
    content:req.body.content,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile')
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

      let token = jwt.sign({ email: email, userid: user._id }, "mysecret");
      res.cookie("token", token);
      res.send("registration successful!!!");
    });
  });
});

//login post route
app.post("/login", async (req, res) => {
  let { password, email } = req.body;
  let existingUser = await userModel.findOne({ email });
  if (!existingUser) return res.status(500).redirect("/login");

  //decryption of password

  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "mysecret");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/");
  });
});

//logout route
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

//setting up middle ware (next())
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "mysecret");
    req.user = data;
  }
  next();
}

app.listen(3000, () => console.log("server shuru hui"));
