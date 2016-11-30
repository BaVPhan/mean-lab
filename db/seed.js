var mongoose = require("./connection");
var seedData = require("./seeds");
var Recipe = mongoose.model("Recipe");
var Ingredient = mongoose.model("Ingredient");

Recipe.remove({}).then(function(){
  Recipe.collection.insert(seedData).then(function(){
    process.exit();
  })
})

Ingredient.remove({}).then(function(){
  Ingredient.collection.insert(seedData).then(function(){
    process.exit();
  })
})
