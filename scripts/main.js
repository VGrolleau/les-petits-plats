import { recipes } from "../data/recipes.js";

const recipesSection = document.querySelector(".recipes-section");

function displayData(recipes) {
    recipes.forEach(recipe => {
        const recipeModel = new Recipe(recipe);
        const recipeCardDOM = recipeModel.getRecipe();
        recipesSection.appendChild(recipeCardDOM);
    });
}

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", principalSearch);

function principalSearch(event) {
    recipesSection.innerHTML = "";
    const searchedString = event.target.value.toLowerCase();
    const searchedArray = recipes.filter(element => {
        for (const ingredient of element.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(searchedString)) {
                return ingredient.ingredient;
            }
        }
        return element.name.toLowerCase().includes(searchedString) || element.description.toLowerCase().includes(searchedString);
    });

    displayData(searchedArray);
}

function init() {
    displayData(recipes);
}

init();