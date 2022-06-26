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
        console.log(searchedArray.length)
        if (searchedArray.length>0) {
            displayData(searchedArray);
        } else {
            const noRecipeDiv = document.createElement('div');
            noRecipeDiv.classList.add("no-recipe-div", "w-[80%]", "mx-[10%]", "mt-4");
            noRecipeDiv.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc...";
            recipesSection.before(noRecipeDiv);
        }
    } else {
        displayData(recipes);
    }
}

function init() {
    displayData(recipes);
}

init();