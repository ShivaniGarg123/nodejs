var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine","ejs");
let wtoday=[];
let prev=[];
app.get("/",(req,res)=>{
    res.render("index",{wtoday:wtoday,prev:prev});
    //res.redirect("/app");
});
app.post("/app",(req,res)=>{
    let request=require("request");
    const argv=require("yargs").argv;
    let apiKey='5dca1563cebdd1106b4481922c6eba2e';
    let city=argv.c||'portland';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    request(url,(err,res,body)=>{
        if(err){
            console.log(err);

        }
        else {
            let weather = JSON.parse(body);
                wtoday.push(weather.main.temp);

        }

    });

  res.redirect("/");

});

app.post("/prevsearch",(req,res)=>{
    var a=wtoday.splice(0,1);
    prev.push(a);
    res.redirect("/");

});

app.listen(5766,()=>{
    console.log("server running on a port....");
});