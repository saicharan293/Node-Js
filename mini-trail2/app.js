const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const multer=require('multer');
const userModel = require("./models/user");
const postModel = require("./models/post");
const path = require("path");
// const multerconfig = require("./config/multerconfig");
const upload = require("./config/multerconfig");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(12,(err,bytes)=>{
//             const fn=bytes.toString('hex') + path.extname(file.originalname)
//             cb(null, fn)
//         })
//     }
// })

// const upload = multer({ storage: storage })

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload",isLoggedIn,upload.single('image'), async(req, res) => {
//   console.log(req.file);
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic=req.file.filename;
    await user.save();
    res.redirect('/profile')

});


app.get("/profile/upload", (req, res) => {
  res.render("profileUpload");
});
// app.get('/test',(req,res)=>{
//     res.render("test")
// })
// app.post('/upload',upload.single('image'),(req,res)=>{
//     res.send('file uploaded')
//     console.log(req.file)
// })

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  // post.likes.push(req.user.userid)
  await post.save();
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content: content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { email, age, password, name, username } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("user already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "sai");
      res.cookie("token", token);
      res.redirect("/profile ");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "sai");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// middle ware building for protected routes
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "sai");
    req.user = data;
    next();
  }
}
app.get("/home", (req, res) => {
  res.send("mini2 getting started");
});
app.listen(3000, () => {
  console.log("mini2 server shuru hua");
});
