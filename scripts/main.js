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

    if (searchedString.length >= 3) {
        const searchedArray = recipes.filter(element => {
            for (const ingredient of element.ingredients) {
                if (ingredient.ingredient.toLowerCase().includes(searchedString)) {
                    return ingredient.ingredient;
                }
            }
            return element.name.toLowerCase().includes(searchedString) || element.description.toLowerCase().includes(searchedString);
        });
        if (searchedArray.length > 0) {
            recipesSection.classList.add("grid-cols-3", "gap-x-44", "gap-y-20");
            displayData(searchedArray);
        } else {
            recipesSection.classList.remove("grid-cols-3", "gap-x-44", "gap-y-20");
            recipesSection.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc...";
        }
    } else {
        displayData(recipes);
    }
}

function init() {
    displayData(recipes);
}

init();