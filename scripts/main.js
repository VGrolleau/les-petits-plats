import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";

const recipesSection = document.querySelector(".recipes-section");
const ulSelectIngredients = document.getElementById("ul-select-ingredients");
const ulSelectAppliance = document.getElementById("ul-select-appliance");
const ulSelectUstensils = document.getElementById("ul-select-ustensils");
const customSelectGroup = document.querySelector(".custom-select-group");
const orderByBtn = document.querySelector(".order-by-btn");
const orderByInput = document.querySelector(".order-by-input");
const ingredientsInput = document.getElementById("ingredients-input");
// const closeTag = document.querySelector(".close");

let filteredIngredients = new Set();
let filteredAppliances = new Set();
let filteredUstensils = new Set();
let appliances = [];
document.getElementById("search-bar").value = "";
let isTag = false;

function displayData(recipes) {
    ingredientsInput.value = "";
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

    const filteredApplianceArray = [...filteredAppliances];
    filteredApplianceArray.forEach(element => {
        const liSelectAppliance = document.createElement('li');
        liSelectAppliance.classList.add("li-select-appliance");
        liSelectAppliance.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        ulSelectAppliance.appendChild(liSelectAppliance);
    });

    const filteredUstensilsArray = [...filteredUstensils];
    filteredUstensilsArray.forEach(element => {
        const liUstensilSelect = document.createElement('li');
        liUstensilSelect.classList.add("li-ustensil-select");
        liUstensilSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        ulSelectUstensils.appendChild(liUstensilSelect);
    })
}

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", principalSearch);

function principalSearch(event) {
    filteredIngredients = new Set();
    filteredAppliances = new Set();
    filteredUstensils = new Set();
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

function getAppliancesSelect(recipe) {
    appliances.length = 0;
    appliances.push(recipe.appliance);
    appliances.forEach(element => {
        filteredAppliances.add(element.toLowerCase());
    });
}

function getUstensilsSelect(recipe) {
    recipe.ustensils.forEach(element => {
        filteredUstensils.add(element.toLowerCase());
    });
}

orderByBtn.addEventListener("focusin", () => {
    orderByBtn.style.display = "none";
    orderByInput.style.display = "flex";

    ingredientsInput.focus();

    ulSelectIngredients.style.visibility = "visible";
})

ingredientsInput.addEventListener("input", (event) => {
    let searchedIngredientsArray = [];

    const searchedIngredientsString = event.target.value.toLowerCase();
    if (searchedIngredientsString.length > 0) {
        filteredIngredients.forEach(ingredient => {
            if (ingredient.toLowerCase().includes(searchedIngredientsString)) {
                searchedIngredientsArray.push(ingredient);
            }
        })

        ulSelectIngredients.innerHTML = "";
        searchedIngredientsArray.forEach(ingredient => {
            const liIngredientSelect = document.createElement('li');
            liIngredientSelect.classList.add("li-ingredient-select");
            liIngredientSelect.textContent = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            ulSelectIngredients.appendChild(liIngredientSelect);
        })
    }
})

const selectionSection = document.createElement('section');
selectionSection.classList.add("selection-section", "w-[80%]", "mx-[10%]", "mt-4", "flex");
ulSelectIngredients.addEventListener("click", (event) => {
    const selectedIngredient = event.target.textContent;

    const selectedIngredientDiv = document.createElement('div');
    selectedIngredientDiv.classList.add("selected-ingredient-div");
    selectedIngredientDiv.style.backgroundColor = "#3282F7";
    selectedIngredientDiv.innerHTML = selectedIngredient + "<i class=\"fa-regular fa-circle-xmark close\"></i>";

    selectionSection.appendChild(selectedIngredientDiv);
    customSelectGroup.before(selectionSection);

    orderByBtn.style.display = "flex";
    orderByInput.style.display = "none";
    ulSelectIngredients.style.visibility = "hidden";

    return isTag = true;
})
console.log(isTag)

// if (isTag) {
    // closeTag.addEventListener("click", (event) => {
    //     console.log(event.target)
    // });
// }

function init() {
    displayData(recipes);
}

init();