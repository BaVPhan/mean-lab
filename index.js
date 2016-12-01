// angular
//   .module("recipeFinder", [
//     "ui.router",
//     "ngResource"
//   ])
//   .config([
//     "$stateProvider",
//     Router
//   ])
//
// function Router ($stateProvider) {
//
// }

var express = require("express");
var hbs     = require("express-handlebars");
var app = express();
var mongoose= require("./db/connection");
var Recipe = require("./models/recipe")


app.set("port", process.env.PORT || 4000);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
// app.use(parser.json({extended: true}));


app.listen(app.get("port"), function(){
  console.log("app listening on port 4000");
});

app.get("/", (req, res) => {
  // Recipe.find({}).then(function(recipes){
  //   res.json()
  // })
  res.send("SUPSUP")
});

app.get("/recipes", function (req, res){
  console.log("hello")
  Recipe.find({}).then(function(recipes){
    res.render("recipe-index", {
        recipes: recipes
    });
  });
});

// app.get("/recipes/name", (req, res) =>{
//   res.send
// })
