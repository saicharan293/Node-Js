const express = require("express");
const app = express();
const userModel = require("./usermodel");
// const usermodel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Heyyy ");
});

//create
app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "sai charan",
    email: "charan@gmail.com",
    username: "charan",
  });
  console.log("create route hey");
  res.send(createduser);
});

//update
app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "sai" },
    { name: "sai charan amudala" },
    { new: true }
  );
  console.log('update route hey')
  console.log('updated route', updatedUser)
  res.send(updatedUser);
});

//read-all
app.get("/read", async (req, res) => {
  let allusers = await userModel.find();
  res.send(allusers);
});

//read
app.get("/read/name", async (req, res) => {
  let allusers = await userModel.findOne({ username: "charan" });
  res.send(allusers);
});

//delete
app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ username: "charan" });
  res.send(deletedUser);
  console.log('delete route')
});

//server
app.listen(3000, () => {
  console.log("server started");
});
