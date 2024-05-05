const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//? home-page
app.get("/", (req, res) => {
  res.render("index");
});

//? All-users display
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
app.get('/read',async (req,res)=>{
  let users=await userModel.find();
  // res.render("read",{users})
})

//? delete user by id
app.get('/delete/:id',async(req,res)=>{
  let users=await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect('/read')
})

app.listen(3000, () => {
  console.log("server started for app2");
});
