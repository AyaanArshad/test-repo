const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const port = 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")

})

app.post("/", function(req,res){
    

const query = req.body.cityName;
const apiKey = "11acb79c978adb6106e02de8fe7b977b";
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const description = weatherData.weather[0].description
        const temp = weatherData.main.temp
        const icon = weatherData.weather[0].icon
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>Description:</h1>"+description+"<p>")
        res.write("<img src="+imageUrl+">")
        res.write("<h2>The Temperature in "+query+" is " + temp + " degree Celcius</h2>" )
        res.send()
        res.json(weatherData);
    })
})

})

app.listen(process.env.PORT || port, function(){
    console.log("Server is running on port " + port);
})