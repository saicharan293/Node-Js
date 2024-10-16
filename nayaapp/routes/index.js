var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const upload = require("./multer");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//login route
router.get("/login", function (req, res, next) {
  // console.log();
  res.render("login", { error: req.flash("error") });
});

//feed page route
router.get("/feed", function (req, res, next) {
  res.render("feed");
});

//profile route
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  }).populate('posts');
  console.log(user);
  res.render("profile", { user });
});

//pinterest register
router.post("/register", (req, res) => {
  const { username, email, fullName } = req.body;
  let userData = new userModel({ username, email, fullName });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

//pinterest login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

//pinterest logout
router.get("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

//upload route
router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async function (req, res, next) {
    if (!req.file) {
      return res.status(404).send("No files were given");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const postData=await postModel.create({
      image:req.file.filename,
      imageText:req.body.filecaption,
      user:user._id
    })
    user.posts.push(postData._id);
    await user.save();
    res.redirect("/profile");
  }
);

//create user
router.get("/createuser", async function (req, res, next) {
  let user = await userModel.create({
    username: "sai",
    password: "sai",
    posts: [],
    email: "sai@email.com",
    fullName: "sai charan amudala",
  });
  res.send(user);
});

//create post
router.get("/createpost", async function (req, res, next) {
  let post = await postModel.create({
    postText: "second post",
    user: "6679c21bc1ba706482f2d12a",
  });
  let user = await userModel.findOne({ _id: "6679c21bc1ba706482f2d12a" });
  user.posts.push(post._id);
  await user.save();
  res.send("done");
});

//all posts
router.get("/allposts", async (req, res, next) => {
  let user = await userModel
    .findOne({ _id: "6679c21bc1ba706482f2d12a" })
    .populate("posts");

  res.send(user);
});

module.exports = router;
