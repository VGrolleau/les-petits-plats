import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";
import Search from "./Search.js";

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