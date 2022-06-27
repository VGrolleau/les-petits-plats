import { recipes } from "../data/recipes.js";
import Recipe from "./models/Recipe.js";

const recipesSection = document.querySelector(".recipes-section");
const ulSelectIngredients = document.getElementById("ul-select-ingredients");
const ulSelectAppliance = document.getElementById("ul-select-appliance");
const ulSelectUstensils = document.getElementById("ul-select-ustensils");
let filteredIngredients = new Set();
document.getElementById("search-bar").value = "";

function displayData(recipes) {
    emptySelects();
    recipes.forEach(recipe => {
        const recipeModel = new Recipe(recipe);
        const recipeCardDOM = recipeModel.getRecipe();
        recipesSection.appendChild(recipeCardDOM);
        getIngredientsSelect(recipe);
        getAppliancesSelect(recipe);
        getUstensilsSelect(recipe);
    });

    const filteredIngredientsArray = [...filteredIngredients];
    filteredIngredientsArray.forEach(element => {
        const liIngredientSelect = document.createElement('li');
        liIngredientSelect.classList.add("li-ingredient-select");
        liIngredientSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        ulSelectIngredients.appendChild(liIngredientSelect);
    });
}

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", principalSearch);

function principalSearch(event) {
    filteredIngredients = new Set();
    let searchedArray;
    recipesSection.innerHTML = "";
    const searchedString = event.target.value.toLowerCase();
    emptySelects();

    if (searchedString.length >= 3) {
        searchedArray = recipes.filter(element => {
            element.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(searchedString)) {
                    return true;
                }
            });
            return element.name.toLowerCase().includes(searchedString) || element.description.toLowerCase().includes(searchedString);
        });
    } else {
        searchedArray = recipes;
    }

    if (searchedArray.length > 0) {
        recipesSection.classList.add("grid-cols-3", "gap-x-44", "gap-y-20");
        searchedArray.forEach(element => {
            getIngredientsSelect(element);
            getAppliancesSelect(element);
            getUstensilsSelect(element);
        })
        displayData(searchedArray);
    } else {
        recipesSection.classList.remove("grid-cols-3", "gap-x-44", "gap-y-20");
        recipesSection.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc...";
    }
}

function emptySelects() {
    ulSelectIngredients.innerHTML = "";
    ulSelectAppliance.innerHTML = "";
    ulSelectUstensils.innerHTML = "";
}

function getIngredientsSelect(recipe) {
    recipe.ingredients.forEach(element => {
        let liIngredientText = element.ingredient;
        filteredIngredients.add(liIngredientText.toLowerCase());
    });
}

function getAppliancesSelect(appliances) {
    const liSelectAppliance = document.createElement('li');
    liSelectAppliance.classList.add("li-select-appliance");
    liSelectAppliance.textContent = appliances.appliance;
    ulSelectAppliance.appendChild(liSelectAppliance);
}

function getUstensilsSelect(ustensils) {
    for (let i = 0; i < ustensils.ustensils.length; i++) {
        const liUstensilSelect = document.createElement('li');
        liUstensilSelect.classList.add("li-ustensil-select");
        liUstensilSelect.textContent = ustensils.ustensils[i];
        ulSelectUstensils.appendChild(liUstensilSelect);
    }
}

function init() {
    displayData(recipes);
}

init();