const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render('show',{filename: req.params.filename,filedata})
  })
});

//title variable is converted with capitalized sentence
app.post("/create", (req, res) => {
  console.log(req.body);
  fs.writeFile(`./files/${req.body.title.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")}.txt`,req.body.details,function(err){
    res.redirect('/')
      }
  ); 
});

app.listen(3000, () => {
  console.log("server shuru karo");
});
