const express = require("express");
const https =require("https");//native_http
const bodyParser =require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get ("/",function(req,res){
  res.sendFile(__dirname +"/index.html");

});

app.post("/",function(req,res){


  //native_http
    const query =req.body.cityName;
    const apiKey ="d8ffe05a7b24888b557c03275f4c0546";
    const unit ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + apiKey +"&units=" + unit ;
    https.get(url,function(response){
      console.log(response.statusCode);

  //comes_data_from_api
      response.on("data", function(data){
        const weatherData =JSON.parse(data)//json_parsing
        const temp =weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon =weatherData.weather[0].icon
        const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + weatherDescription + "<p>")
        res.write("<h1> "+ query +" current temperature is " + temp + " degrees Celcius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
      })
    });
})
/*

  */






app.listen(3000,function(){
  console.log("server is running on port 3000");
  });
