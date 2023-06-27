const express =require("express");

const https = require("https");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
   

})

app.post("/",function(req,res){

    

    const query = req.body.cityname;
    const apikey = "671fb51f4449436e518b584003a2f055"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units="+unit;
    //671fb51f4449436e518b584003a2f055
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p> weather description is " + des)
            res.write("<h1>The temperature of " + query + " is " + temp + " C </h1>")
            res.write("<img src=" + imageurl + ">");
            res.send();

        })
    });
    

    
})




app.listen(process.env.PORT ||3000,function(){
    console.log("server is running on 3000");
})