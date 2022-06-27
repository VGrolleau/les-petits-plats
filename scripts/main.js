import { recipes } from "../data/recipes.js";

const recipesSection = document.querySelector(".recipes-section");
const ulSelectIngredients = document.getElementById("ul-select-ingredients");
const ulSelectAppliance = document.getElementById("ul-select-appliance");
const ulSelectUstensils = document.getElementById("ul-select-ustensils");

function displayData(recipes) {
    recipes.forEach(recipe => {
        const recipeModel = new Recipe(recipe);
        const recipeCardDOM = recipeModel.getRecipe();
        recipesSection.appendChild(recipeCardDOM);
    });
    recipes.filter(element => {
        getIngredientsSelect(element);
        getAppliancesSelect(element);
        getUstensilsSelect(element);
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
            ulSelectIngredients.innerHTML = "";
            ulSelectAppliance.innerHTML = "";
            ulSelectUstensils.innerHTML = "";
            searchedArray.filter(element => {
                getIngredientsSelect(element);
                getAppliancesSelect(element);
                getUstensilsSelect(element);
            })
            displayData(searchedArray);
        } else {
            ulSelectIngredients.innerHTML = "";
            ulSelectAppliance.innerHTML = "";
            ulSelectUstensils.innerHTML = "";
            recipesSection.classList.remove("grid-cols-3", "gap-x-44", "gap-y-20");
            recipesSection.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc...";
        }
    } else {
        ulSelectIngredients.innerHTML = "";
        ulSelectAppliance.innerHTML = "";
        ulSelectUstensils.innerHTML = "";
        recipes.filter(element => {
            getIngredientsSelect(element);
            getAppliancesSelect(element);
            getUstensilsSelect(element);
        });
        displayData(recipes);
    }
}

function getIngredientsSelect(ingredients) {
    for (let i = 0; i < ingredients.ingredients.length; i++) {
        const liIngredientSelect = document.createElement('li');
        liIngredientSelect.classList.add("li-ingredient-select");
        liIngredientSelect.textContent = ingredients.ingredients[i].ingredient;
        ulSelectIngredients.appendChild(liIngredientSelect);
    }
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