require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const imgUrl =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";

      res.write("<p>The weather is currently is " + desc + "</p>");
      res.write(
        "<h1>The temperature in " +
          req.body.cityName +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<img src = " + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});
