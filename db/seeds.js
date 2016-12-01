var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/recipefinder')
var RecipeModel = require("../models/recipe")
var IngredientModel = require("../models/ingredient")

RecipeModel.remove({}, function(err){
})
IngredientModel.remove({}, function(err){
})

var birthdaycake = new RecipeModel({name: "Birthday Cake"})
var applepie = new RecipeModel({name: "Apple Pie"})
var beefstew = new RecipeModel({name: "Beef Stew"})

var milk = new IngredientModel({name: "Milk"})
var apple = new IngredientModel({name: "Apple"})
var beef = new IngredientModel({name: "Raw Beef"})
var egg = new IngredientModel({name: "Egg"})
var sugar = new IngredientModel({name: "Sugar"})
var potato = new IngredientModel({name: "Potato"})

var recipes = [birthdaycake,applepie, beefstew]
var ingredients = [milk, apple, beef, egg, sugar, potato]

for(var i = 0; i < recipes.length; i++){
  recipes[i].ingredients.push(ingredients[i], ingredients[i+3])
  recipes[i].save(function(err){
    if (err){
      console.log(err)
    }else {
      console.log("recipe was saved")
    }
  })
}
