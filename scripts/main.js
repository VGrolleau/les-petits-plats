import {recipes} from "../data/recipes.js";
import Recipe from "./models/Recipe.js";
import Search from "./Search.js";

// const customSelectGroup = document.querySelector(".custom-select-group");
// const customSelects = document.querySelectorAll(".custom-select");
// const ingredientsInput = document.getElementById("ingredients-input");
// const appliancesInput = document.getElementById("appliances-input");
// const ustensilsInput = document.getElementById("ustensils-input");
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

const buttons = document.querySelectorAll(".order-by-btn");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const ul = e.target.parentNode.querySelector("ul");
        const selectArrow = e.target.querySelector(".select-arrow");
        if (ul.classList.contains("hidden")) {
            ul.classList.remove("hidden", "-translate-y-[10px]");
            ul.classList.add("grid", "translate-y-0");
            selectArrow.classList.add("rotate-180", "transition-transform", "duration-500", "ease-in-out");
        } else {
            ul.classList.add("hidden", "-translate-y-[10px]");
            ul.classList.remove("grid", "translate-y-0");
            selectArrow.classList.remove("rotate-180");
        }
    })
});

const selectionSection = document.querySelector(".selection-section");
// selectionSection.classList.add("selection-section", "w-[80%]", "mx-[10%]", "mt-4", "flex");

const liIngredients = document.querySelectorAll(".li-ingredient-select");
liIngredients.forEach(li => {
    li.addEventListener("click", () => {
        search.tagIngredients.add(li.textContent)
        search.createTagIngredient(li.textContent);
    })
});

const liAppliances = document.querySelectorAll(".li-appliance-select");
liAppliances.forEach(li => {
    li.addEventListener("click", () => {
        search.tagAppliances.add(li.textContent)
        search.createTagAppliance(li.textContent);
    })
});

const liUstensils = document.querySelectorAll(".li-ustensil-select");
liUstensils.forEach(li => {
    li.addEventListener("click", () => {
        search.tagUstensils.add(li.textContent)
        search.createTagUstensil(li.textContent);
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


// function emptySelects() {
//     ulSelectIngredients.innerHTML = "";
//     ulSelectAppliances.innerHTML = "";
//     ulSelectUstensils.innerHTML = "";
// }

// const selectionSection = document.createElement('section');
// selectionSection.classList.add("selection-section", "w-[80%]", "mx-[10%]", "mt-4", "flex");

// const selectionSectionElements = [];
// const selectedIngredients = new Set();
// const selectedAppliances = new Set();
// const selectedUstensils = new Set();

// customSelects.forEach(customSelect => {
//     const orderByBtn = customSelect.children[0];
//     const orderByInput = customSelect.children[1];
//     const orderByUl = customSelect.children[2];
//     const inputSelect = orderByInput.children[0];
//
//     orderByBtn.addEventListener("click", () => {
//         orderByBtn.style.display = "none";
//         orderByInput.style.display = "flex";
//         inputSelect.focus();
//         orderByUl.style.visibility = "visible";
//     });
//
//     window.addEventListener('mouseup', function (event) {
//         if (event.target !== orderByBtn && event.target.parentNode !== orderByBtn) {
//             orderByBtn.style.display = "flex";
//             orderByInput.style.display = "none";
//             orderByUl.style.visibility = "hidden";
//         }
//     });
//
//     inputSelect.addEventListener("input", (event) => {
//         let searchedArray = [];
//
//         const searchedString = event.target.value.toLowerCase();
//         if (searchedString.length > 0) {
//             switch (inputSelect.id) {
//                 case "ingredients-input":
//                     filteredIngredients.forEach(ingredient => {
//                         if (ingredient.toLowerCase().includes(searchedString)) {
//                             searchedArray.push(ingredient);
//                         }
//                     });
//                     break;
//                 case "appliances-input":
//                     filteredAppliances.forEach(appliance => {
//                         if (appliance.toLowerCase().includes(searchedString)) {
//                             searchedArray.push(appliance);
//                         }
//                     });
//                     break;
//                 case "ustensils-input":
//                     filteredUstensils.forEach(ustensil => {
//                         if (ustensil.toLowerCase().includes(searchedString)) {
//                             searchedArray.push(ustensil);
//                         }
//                     });
//                     break;
//             }
//         } else {
//             switch (inputSelect.id) {
//                 case "ingredients-input":
//                     filteredIngredients.forEach(ingredient => {
//                         searchedArray.push(ingredient);
//                     });
//                     break;
//                 case "appliances-input":
//                     filteredAppliances.forEach(appliance => {
//                         searchedArray.push(appliance);
//                     });
//                     break;
//                 case "ustensils-input":
//                     filteredUstensils.forEach(ustensil => {
//                         searchedArray.push(ustensil);
//                     });
//                     break;
//             }
//         }
//
//         orderByUl.innerHTML = "";
//         searchedArray.forEach(element => {
//             const liSelect = document.createElement('li');
//             liSelect.classList.add("li-select");
//             liSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
//             orderByUl.appendChild(liSelect);
//         })
//     });
//
//     orderByUl.addEventListener("click", (event) => {
//         let selectedElement = event.target.textContent;
//
//         const selectedElementDiv = document.createElement('div');
//         selectedElementDiv.classList.add("selected-div");
//
//         switch (inputSelect.id) {
//             case "ingredients-input":
//                 selectedElementDiv.style.backgroundColor = "#3282F7";
//                 selectedIngredients.add(selectedElement)
//                 break;
//             case "appliances-input":
//                 selectedElementDiv.style.backgroundColor = "#68D9A4";
//                 selectedAppliances.add(selectedElement)
//                 break;
//             case "ustensils-input":
//                 selectedElementDiv.style.backgroundColor = "#ED6454";
//                 selectedUstensils.add(selectedElement)
//                 break;
//         }
//
//         selectedElementDiv.innerHTML = selectedElement + "<i class=\"fa-regular fa-circle-xmark close\"></i>";
//
//         selectionSection.appendChild(selectedElementDiv);
//         customSelectGroup.before(selectionSection);
//
//         orderByBtn.style.display = "flex";
//         orderByInput.style.display = "none";
//         orderByUl.style.visibility = "hidden";
//
//         principalSearch();
//     })
// })