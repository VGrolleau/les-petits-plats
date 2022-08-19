import {createTag} from "./utils/CreateTag.js";

export default class Search {
    constructor(data) {
        this.recipes = data;
        this.filteredIngredients = new Set();
        this.filteredAppliances = new Set();
        this.filteredUstensils = new Set();
        this.tagIngredients = new Set();
        this.tagAppliances = new Set();
        this.tagUstensils = new Set();
        this.searchedString = "";
        this.recipesSection = document.querySelector(".recipes-section");
        this.ulSelectIngredients = document.getElementById("ul-select-ingredients");
        this.ulSelectAppliances = document.getElementById("ul-select-appliance");
        this.ulSelectUstensils = document.getElementById("ul-select-ustensils");
    }

    principalSearch(searchedString = null) {
        let searchedArray;
        this.recipesSection.innerHTML = "";
        if (searchedString !== null) {
            this.searchedString = searchedString;
        }

        if (this.searchedString.length >= 3) {
            searchedArray = this.recipes.filter(element => {
                element.ingredients.forEach(ingredient => {
                    element.hasIngredient(ingredient.ingredient);
                });

                return element.name.toLowerCase().includes(this.searchedString) || element.description.toLowerCase().includes(this.searchedString);
            });
        } else {
            searchedArray = this.recipes;
        }

        searchedArray = searchedArray.filter(recipe => {
            return recipe.containsIngredients(this.tagIngredients) && recipe.containsAppliances(this.tagAppliances) && recipe.containsUstensils(this.tagUstensils);
        });

        if (searchedArray.length > 0) {
            this.recipesSection.classList.add("grid-cols-3", "gap-x-44", "gap-y-20");
            this.filteredIngredients = new Set();
            this.filteredAppliances = new Set();
            this.filteredUstensils = new Set();
            searchedArray.forEach(element => {
                this.getIngredientsSelect(element);
                this.getAppliancesSelect(element);
                this.getUstensilsSelect(element);
            })
            this.displayData(searchedArray);
        } else {
            this.recipesSection.classList.remove("grid-cols-3", "gap-x-44", "gap-y-20");
            this.recipesSection.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc...";
        }
    }

    getIngredientsSelect(recipe) {
        recipe.ingredients.forEach(element => {
            this.filteredIngredients.add(element.ingredient.toLowerCase());
        });
    }

    getAppliancesSelect(recipe) {
        this.filteredAppliances.add(recipe.appliance.toLowerCase());
    }

    getUstensilsSelect(recipe) {
        recipe.ustensils.forEach(element => {
            this.filteredUstensils.add(element.toLowerCase());
        });
    }

    displayData(recipes) {
        this.clearDOM();

        recipes.forEach(recipe => {
            this.recipesSection.appendChild(recipe.getRecipe());
        });

        const filteredIngredientsArray = [...this.filteredIngredients];
        filteredIngredientsArray.forEach(element => {
            this.filterElement("li-ingredient-select", element, this.ulSelectIngredients, this.tagIngredients, "#3282F7");
        });

        const filteredApplianceArray = [...this.filteredAppliances];
        filteredApplianceArray.forEach(element => {
            this.filterElement("li-appliance-select", element, this.ulSelectAppliances, this.tagAppliances, "#68D9A4");
        });

        const filteredUstensilsArray = [...this.filteredUstensils];
        filteredUstensilsArray.forEach(element => {
            this.filterElement("li-ustensil-select", element, this.ulSelectUstensils, this.tagUstensils, "#ED6454");
        });
    }

    filterElement(className, element, ul, tag, color) {
        const li = document.createElement('li');
        li.classList.add(className);
        li.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        ul.appendChild(li);

        li.addEventListener("click", () => {
            tag.add(li.textContent);
            createTag(color, li.textContent, () => {
                tag.delete(li.textContent);
                this.principalSearch();
            });
            this.principalSearch();
        });
    }

    clearDOM() {
        this.recipesSection.innerHTML = "";
        this.ulSelectIngredients.innerHTML = "";
        this.ulSelectAppliances.innerHTML = "";
        this.ulSelectUstensils.innerHTML = "";
    }

    searchIngredient(searchedString) {
        this.ulSelectIngredients.innerHTML = "";
        let newFilteredIngredients = new Set();

        if (searchedString.length > 0) {
            this.filteredIngredients.forEach(ingredient => {
                if (ingredient.toLowerCase().includes(searchedString)) {
                    newFilteredIngredients.add(ingredient);
                }
            });
        } else {
            newFilteredIngredients = this.filteredIngredients;
        }

        let arrayFilteredIngredients = [...newFilteredIngredients];
        arrayFilteredIngredients.forEach(element => {
            const liIngredientSelect = document.createElement('li');
            liIngredientSelect.classList.add("li-ingredient-select");
            liIngredientSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectIngredients.appendChild(liIngredientSelect);
        });
    }

    searchAppliance(searchedString) {
        this.ulSelectAppliances.innerHTML = "";
        let newFilteredAppliances = new Set();

        if (searchedString.length > 0) {
            this.filteredAppliances.forEach(appliance => {
                if (appliance.toLowerCase().includes(searchedString)) {
                    newFilteredAppliances.add(appliance);
                }
            });
        } else {
            newFilteredAppliances = this.filteredAppliances;
        }

        let arrayFilteredAppliances = [...newFilteredAppliances];
        arrayFilteredAppliances.forEach(element => {
            const liApplianceSelect = document.createElement('li');
            liApplianceSelect.classList.add("li-appliance-select");
            liApplianceSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectAppliances.appendChild(liApplianceSelect);
        });
    }

    searchUstensil(searchedString) {
        this.ulSelectUstensils.innerHTML = "";
        let newFilteredUstensils = new Set();

        if (searchedString.length > 0) {
            this.filteredUstensils.forEach(ustensil => {
                if (ustensil.toLowerCase().includes(searchedString)) {
                    newFilteredUstensils.add(ustensil);
                }
            });
        } else {
            newFilteredUstensils = this.filteredUstensils;
        }

        let arrayFilteredUstensils = [...newFilteredUstensils];
        arrayFilteredUstensils.forEach(element => {
            const liUstensilSelect = document.createElement('li');
            liUstensilSelect.classList.add("li-ustensil-select");
            liUstensilSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectUstensils.appendChild(liUstensilSelect);
        });
    }
}