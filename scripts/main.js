import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";

const recipesSection = document.querySelector(".recipes-section");
const ulSelectIngredients = document.getElementById("ul-select-ingredients");
const ulSelectAppliances = document.getElementById("ul-select-appliance");
const ulSelectUstensils = document.getElementById("ul-select-ustensils");
const customSelectGroup = document.querySelector(".custom-select-group");
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

const orderByBtnIngredient = document.getElementById("btn-ingredients");
const orderInputIngredients = document.getElementById("order-input-ingredients");

orderByBtnIngredient.addEventListener("focusin", () => {
    orderByBtnIngredient.style.display = "none";
    orderInputIngredients.style.display = "flex";

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

const orderByBtnAppliance = document.getElementById("btn-appliances");
const orderInputAppliances = document.getElementById("order-input-appliances");

orderByBtnAppliance.addEventListener("focusin", () => {
    orderByBtnAppliance.style.display = "none";
    orderInputAppliances.style.display = "flex";

    appliancesInput.focus();

    ulSelectAppliances.style.visibility = "visible";
})

appliancesInput.addEventListener("input", (event) => {
    let searchedAppliancesArray = [];

    const searchedAppliancesString = event.target.value.toLowerCase();
    if (searchedAppliancesString.length > 0) {
        filteredAppliances.forEach(appliance => {
            if (appliance.toLowerCase().includes(searchedAppliancesString)) {
                searchedAppliancesArray.push(appliance);
            }
        })

        ulSelectAppliances.innerHTML = "";
        searchedAppliancesArray.forEach(appliance => {
            const liApplianceSelect = document.createElement('li');
            liApplianceSelect.classList.add("li-ingredient-select");
            liApplianceSelect.textContent = appliance.charAt(0).toUpperCase() + appliance.slice(1);
            ulSelectAppliances.appendChild(liApplianceSelect);
        })
    }
})

const orderByBtnUstensil = document.getElementById("btn-ustensils");
const orderInputUstensils = document.getElementById("order-input-ustensils");

orderByBtnUstensil.addEventListener("focusin", () => {
    orderByBtnUstensil.style.display = "none";
    orderInputUstensils.style.display = "flex";

    ustensilsInput.focus();

    ulSelectUstensils.style.visibility = "visible";
})

ustensilsInput.addEventListener("input", (event) => {
    let searchedUstensilsArray = [];

    const searchedUstensilsString = event.target.value.toLowerCase();
    if (searchedUstensilsString.length > 0) {
        filteredUstensils.forEach(appliance => {
            if (appliance.toLowerCase().includes(searchedUstensilsString)) {
                searchedUstensilsArray.push(appliance);
            }
        })

        ulSelectUstensils.innerHTML = "";
        searchedUstensilsArray.forEach(ustensil => {
            const liUstensilSelect = document.createElement('li');
            liUstensilSelect.classList.add("li-ingredient-select");
            liUstensilSelect.textContent = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
            ulSelectUstensils.appendChild(liUstensilSelect);
        })
    }
})

const selectionSection = document.createElement('section');
selectionSection.classList.add("selection-section", "w-[80%]", "mx-[10%]", "mt-4", "flex");

ulSelectIngredients.addEventListener("click", (event) => {
    let selectedIngredient = event.target.textContent;

    const selectedIngredientDiv = document.createElement('div');
    selectedIngredientDiv.classList.add("selected-ingredient-div");
    selectedIngredientDiv.style.backgroundColor = "#3282F7";
    selectedIngredientDiv.innerHTML = selectedIngredient + "<i class=\"fa-regular fa-circle-xmark close\"></i>";

    selectionSection.appendChild(selectedIngredientDiv);
    customSelectGroup.before(selectionSection);

    orderByBtnIngredient.style.display = "flex";
    orderInputIngredients.style.display = "none";
    ulSelectIngredients.style.visibility = "hidden";
})

ulSelectAppliances.addEventListener("click", (event) => {
    let selectedAppliance = event.target.textContent;

    const selectedApplianceDiv = document.createElement('div');
    selectedApplianceDiv.classList.add("selected-ingredient-div");
    selectedApplianceDiv.style.backgroundColor = "#68D9A4";
    selectedApplianceDiv.innerHTML = selectedAppliance + "<i class=\"fa-regular fa-circle-xmark close\"></i>";

    selectionSection.appendChild(selectedApplianceDiv);
    customSelectGroup.before(selectionSection);

    orderByBtnAppliance.style.display = "flex";
    orderInputAppliances.style.display = "none";
    ulSelectAppliances.style.visibility = "hidden";
})

ulSelectUstensils.addEventListener("click", (event) => {
    let selectedUstensil = event.target.textContent;

    const selectedUstensilDiv = document.createElement('div');
    selectedUstensilDiv.classList.add("selected-ingredient-div");
    selectedUstensilDiv.style.backgroundColor = "#ED6454";
    selectedUstensilDiv.innerHTML = selectedUstensil + "<i class=\"fa-regular fa-circle-xmark close\"></i>";

    selectionSection.appendChild(selectedUstensilDiv);
    customSelectGroup.before(selectionSection);

    orderByBtnUstensil.style.display = "flex";
    orderInputUstensils.style.display = "none";
    ulSelectUstensils.style.visibility = "hidden";
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