import { recipes } from "../data/recipes.js";
// console.log(recipes);

function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    recipes.forEach(recipe => {
        // console.log(recipe);
        const recipeModel = new Recipe(recipe);
        const recipeCardDOM = recipeModel.getRecipe();
        recipesSection.appendChild(recipeCardDOM);
    });
}

function init() {
    displayData(recipes);
}

init();