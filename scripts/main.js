import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";

const recipesSection = document.querySelector(".recipes-section");
const customSelectGroup = document.querySelector(".custom-select-group");
const ulSelectIngredients = document.getElementById("ul-select-ingredients");
const ulSelectAppliances = document.getElementById("ul-select-appliance");
const ulSelectUstensils = document.getElementById("ul-select-ustensils");
const ingredientsInput = document.getElementById("ingredients-input");
const appliancesInput = document.getElementById("appliances-input");
const ustensilsInput = document.getElementById("ustensils-input");

let filteredIngredients = new Set();
let filteredAppliances = new Set();
let filteredUstensils = new Set();
let appliances = [];
document.getElementById("search-bar").value = "";

function displayData(recipes) {
    ingredientsInput.value = "";
    appliancesInput.value = "";
    ustensilsInput.value = "";
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
        ulSelectAppliances.appendChild(liSelectAppliance);
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
    ulSelectAppliances.innerHTML = "";
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

const customSelects = document.querySelectorAll(".custom-select");
const selectionSection = document.createElement('section');
selectionSection.classList.add("selection-section", "w-[80%]", "mx-[10%]", "mt-4", "flex");

customSelects.forEach(customSelect => {
    const orderByBtn = customSelect.children[0];
    const orderByInput = customSelect.children[1];
    const orderByUl = customSelect.children[2];
    const inputSelect = orderByInput.children[0];

    orderByBtn.addEventListener("click", () => {
        orderByBtn.style.display = "none";
        orderByInput.style.display = "flex";
        inputSelect.focus();
        orderByUl.style.visibility = "visible";
    });

    window.addEventListener('mouseup', function(event){
        if (event.target !== orderByBtn && event.target.parentNode !== orderByBtn){
            orderByBtn.style.display = "flex";
            orderByInput.style.display = "none";
            orderByUl.style.visibility = "hidden";
        }
    });

    inputSelect.addEventListener("input", (event) => {
        let searchedArray = [];

        const searchedString = event.target.value.toLowerCase();
        if (searchedString.length > 0) {
            switch (inputSelect.id) {
                case "ingredients-input":
                    filteredIngredients.forEach(ingredient => {
                        if (ingredient.toLowerCase().includes(searchedString)) {
                            searchedArray.push(ingredient);
                        }
                    });
                    break;
                case "appliances-input":
                    filteredAppliances.forEach(appliance => {
                        if (appliance.toLowerCase().includes(searchedString)) {
                            searchedArray.push(appliance);
                        }
                    });
                    break;
                case "ustensils-input":
                    filteredUstensils.forEach(ustensil => {
                        if (ustensil.toLowerCase().includes(searchedString)) {
                            searchedArray.push(ustensil);
                        }
                    });
                    break;
            }
        } else {
            switch (inputSelect.id) {
                case "ingredients-input":
                    filteredIngredients.forEach(ingredient => {
                        searchedArray.push(ingredient);
                    });
                    break;
                case "appliances-input":
                    filteredAppliances.forEach(appliance => {
                        searchedArray.push(appliance);
                    });
                    break;
                case "ustensils-input":
                    filteredUstensils.forEach(ustensil => {
                        searchedArray.push(ustensil);
                    });
                    break;
            }
        }

        orderByUl.innerHTML = "";
        searchedArray.forEach(element => {
            const liSelect = document.createElement('li');
            liSelect.classList.add("li-select");
            liSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            orderByUl.appendChild(liSelect);
        })
    });

    orderByUl.addEventListener("click", (event) => {
        let selectedElement = event.target.textContent;

        const selectedElementDiv = document.createElement('div');
        selectedElementDiv.classList.add("selected-ingredient-div");

        switch (inputSelect.id) {
            case "ingredients-input":
                selectedElementDiv.style.backgroundColor = "#3282F7";
                break;
            case "appliances-input":
                selectedElementDiv.style.backgroundColor = "#68D9A4";
                break;
            case "ustensils-input":
                selectedElementDiv.style.backgroundColor = "#ED6454";
                break;
        }

        selectedElementDiv.innerHTML = selectedElement + "<i class=\"fa-regular fa-circle-xmark close\"></i>";

        selectionSection.appendChild(selectedElementDiv);
        customSelectGroup.before(selectionSection);

        orderByBtn.style.display = "flex";
        orderByInput.style.display = "none";
        orderByUl.style.visibility = "hidden";
    })
})

selectionSection.addEventListener("click", (event) => {
    if (event.target.className === "fa-regular fa-circle-xmark close") {
        event.target.parentNode.style.display = "none";
    }
});

function init() {
    displayData(recipes);
}

init();