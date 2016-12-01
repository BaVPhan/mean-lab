angular
  .module("recipeFinder", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Recipe", [
    "$resource",
    Recipe
  ])
  .controller("indexCtrl", [
    "$state",
    "Recipe",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Recipe",
    showController
  ])

  function Router ($stateProvider) {
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/recipes",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "indexCtrl",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/recipes/:name",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "showCtrl",
      controllerAs: "vm"
    })
  }

function Recipe($resource) {
  return $resource("/api/recipes/:name", {}, {
    update: { method: "PUT" }
  })
}

function indexController ($state, Recipe) {
  this.recipes = Recipe.query()
  this.newRecipe = new Recipe()
  this.create = function () {
    this.newRecipe.$save().then(function(recipe){
      $state.go("show", { name: recipe.name })
    })
  }
}

function showController ($state, $stateParams, Recipe) {
  this.recipe = Recipe.get({name: $stateParams.name})
  this.update = function () {
    this.recipe.$update({name: $stateParams.name})
  }
  this.destroy = function () {
    this.recipe.$delete({name: $stateParams.name}).then(function(){
      $state.go("index")
    })
  }
}
