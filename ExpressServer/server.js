const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at ripalvnakiya5645@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("I'm a cheese burger");
});

app.get("/hobbies", function (req, res) {
  res.send("Code code code!!");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
