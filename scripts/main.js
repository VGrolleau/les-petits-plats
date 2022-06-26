import { recipes } from "../data/recipes.js";
// console.log(recipes);
const recipesSection = document.querySelector(".recipes-section");
// let ingredientsNames = [];

function displayData(recipes) {
    recipes.forEach(recipe => {
        const recipeModel = new Recipe(recipe);
        const recipeCardDOM = recipeModel.getRecipe();
        recipesSection.appendChild(recipeCardDOM);
        // ingredientsNames.push(recipeModel.ingredientsNames);
    });
}

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", principalSearch);

function principalSearch(event) {
    recipesSection.innerHTML = "";
    const searchedString = event.target.value.toLowerCase();
    let ingredientsArray = [];
    // ingredientsNames.forEach(array => {
    //     array.forEach(element => {
    //         if(element.toLowerCase().includes(searchedString)) {
    //             ingredientSearch = element;
    //         }
    //         // console.log(ingredientSearch)
    //         return ingredientSearch;
    //     })
    // });
    // console.log(ingredientSearch);
    const searchedArray = recipes.filter(element => {
        // console.log(element.ingredients);
        let ingredientSearch;
        element.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(searchedString)) {
                console.log(ingredient.ingredient);
                ingredientSearch = ingredient.ingredient;
                console.log(ingredientSearch)
                ingredientsArray.push(ingredientSearch)
                console.log(ingredientsArray)
            }
        });
        // ingredientsArray.push(ingredientSearch)
        console.log(ingredientsArray);
        return element.name.toLowerCase().includes(searchedString) || element.description.toLowerCase().includes(searchedString);
    });

    displayData(searchedArray);
}

function init() {
    displayData(recipes);
}

init();