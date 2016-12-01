var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
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
app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));
app.use("/assets", express.static("public"));


app.listen(app.get("port"), function(){
  console.log("app listening on port 4000");
});

app.get("/", (req, res) => {
  res.render("recipe-index")
});

app.get("/api/recipes", function (req, res){
  console.log("hello")
  Recipe.find({}).then(function(recipes){
    res.json(recipes)
  });
});

app.get("/api/recipes/:name", function(req, res){
  Recipe.findOne({name: req.params.name}).then(function(recipe){
    res.json(recipe)
  });
});

app.post("/api/recipes", function(req, res){
  console.log(req.body)
  Recipe.create(req.body).then(function(recipe){
    res.json(recipe)
  });
});

app.delete("/api/recipes/:name", function(req, res){
  Recipe.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});


app.put("/api/recipes/:name", function(req, res){
  Recipe.findOneAndUpdate(req.body, {new: true}).then(function(recipe){
    res.json(recipe)
  });
});
