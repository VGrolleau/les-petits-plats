import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";
import Search from "./Search.js";
import {createTag} from "./utils/CreateTag.js";

document.getElementById("search-bar").value = "";
const readyRecipes = [];

recipes.forEach(recipe => {
    readyRecipes.push(new Recipe(recipe));
})
const search = new Search(readyRecipes);
search.principalSearch();

const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", (e) => {
    search.principalSearch(e.target.value.toLowerCase());
});

const customSelects = document.querySelectorAll(".custom-select");
customSelects.forEach(select => {
    const button = select.querySelector(".order-by-btn");
    const inputDiv = select.querySelector(".order-by-input");
    const inputArrow = select.querySelector(".order-by-input .select-arrow");
    const ul = select.querySelector("ul");
    const inputSearch = select.querySelector(".order-by-input input");
    inputSearch.value = "";

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        ul.style.display = "grid";
        button.style.display = "none";
        inputDiv.style.display = "flex";
    });

    inputArrow.addEventListener("click", (e) => {
        e.stopPropagation();
        ul.style.display = "none";
        button.style.display = "flex";
        inputDiv.style.display = "none";
    });

    inputSearch.addEventListener("input", () => {
        if (select.id === "custom-select-ingredients") {
        search.searchIngredient(inputSearch.value.toLowerCase());
        }
        if (select.id === "custom-select-appliances") {
            search.searchAppliance(inputSearch.value.toLowerCase());
        }
        if (select.id === "custom-select-ustensils") {
            search.searchUstensil(inputSearch.value.toLowerCase());
        }
    });
});

const selectionSection = document.querySelector(".selection-section");

const liIngredients = document.querySelectorAll(".li-ingredient-select");
liIngredients.forEach(li => {
    li.addEventListener("click", () => {
        search.tagIngredients.add(li.textContent);
        // search.createTagIngredient(li.textContent);
        createTag("ingredient", li.textContent);
        search.principalSearch();
    })
});

const liAppliances = document.querySelectorAll(".li-appliance-select");
liAppliances.forEach(li => {
    li.addEventListener("click", () => {
        search.tagAppliances.add(li.textContent);
        // search.createTagAppliance(li.textContent);
        createTag("appliance", li.textContent);
        search.principalSearch();
    })
});

const liUstensils = document.querySelectorAll(".li-ustensil-select");
liUstensils.forEach(li => {
    li.addEventListener("click", () => {
        search.tagUstensils.add(li.textContent);
        // search.createTagUstensil(li.textContent);
        createTag("ustensil", li.textContent);
        search.principalSearch();
    })
});

selectionSection.addEventListener("click", (event) => {
    if (event.target.className === "fa-regular fa-circle-xmark close") {
        event.target.parentNode.style.display = "none";
        if (search.tagIngredients.has(event.target.parentNode.textContent)) {
            search.tagIngredients.delete(event.target.parentNode.textContent);
        }
        if (search.tagAppliances.has(event.target.parentNode.textContent)) {
            search.tagAppliances.delete(event.target.parentNode.textContent);
        }
        if (search.tagUstensils.has(event.target.parentNode.textContent)) {
            search.tagUstensils.delete(event.target.parentNode.textContent);
        }
    }
});