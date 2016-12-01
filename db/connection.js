var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/recipefinder')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId


var IngredientSchema = new Schema({
  name: String
})


var RecipeSchema = new Schema({
  name: String,
  ingredients: [IngredientSchema]
})

// setting models in mongoose utilizing schemas defined above, we'll be using
// these frequently throughout our app
mongoose.model("Recipe", RecipeSchema)
mongoose.model("Ingredient", IngredientSchema)
