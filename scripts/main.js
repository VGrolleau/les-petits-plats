import { recipes } from "../data/recipes.js";

// console.log(recipes);
recipes.forEach(recipe => {
    // console.log(recipe);
    let recipeModel = new Recipe(recipe);
    recipeModel.getRecipe();
});