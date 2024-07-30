const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

//create
app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  let createdUser = await userModel.create({
    username,
    email,
    password,
    age,
  });
  console.log("created user \n",createdUser)
  res.send(createdUser);
});

app.listen(3000, () => {
  console.log("server shuru hua");
});
