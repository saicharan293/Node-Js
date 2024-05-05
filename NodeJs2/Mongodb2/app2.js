const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//? home-page
//? All-users display
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/read", (req, res) => {
//   res.render("read");
// });

//? create user
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  console.log("req body", req.body);
  let createdUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });
  console.log("created user", createdUser);
  res.redirect("/read");
});

//? read users
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});
app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  console.log("edit selected")
  res.render("edit", { user });
});
app.post("/update/:id", async (req, res) => {
  console.log('update started',req.body);
  let { name, image, email } = req.body;
  let users = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: name,
      email: email,
      image: image, },
    { new: true }
  );
  console.log('update complete',users)
  res.redirect("/read");
});

//? delete user by id
app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("server started for app2");
});
