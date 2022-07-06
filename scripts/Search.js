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
        this.customSelectGroup = document.querySelector(".custom-select-group");
        this.selectionSection = document.querySelector(".selection-section");

        this.xMark = '<i class="fa-regular fa-circle-xmark close"></i>';
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
                    if (ingredient.ingredient.toLowerCase().includes(this.searchedString)) {
                        return true;
                    }
                });
                return element.name.toLowerCase().includes(this.searchedString) || element.description.toLowerCase().includes(this.searchedString);
            });
        } else {
            searchedArray = this.recipes;
        }

        if (searchedArray.length > 0) {
            this.recipesSection.classList.add("grid-cols-3", "gap-x-44", "gap-y-20");
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
        // ingredientsInput.value = "";
        // appliancesInput.value = "";
        // ustensilsInput.value = "";
        // emptySelects();
        this.clearDOM();

        recipes.forEach(recipe => {
            const recipeCardDOM = recipe.getRecipe();
            this.recipesSection.appendChild(recipeCardDOM);
        });

        const filteredIngredientsArray = [...this.filteredIngredients];
        filteredIngredientsArray.forEach(element => {
            const liIngredientSelect = document.createElement('li');
            liIngredientSelect.classList.add("li-ingredient-select");
            liIngredientSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectIngredients.appendChild(liIngredientSelect);
        });

        const filteredApplianceArray = [...this.filteredAppliances];
        filteredApplianceArray.forEach(element => {
            const liSelectAppliance = document.createElement('li');
            liSelectAppliance.classList.add("li-appliance-select");
            liSelectAppliance.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectAppliances.appendChild(liSelectAppliance);
        });

        const filteredUstensilsArray = [...this.filteredUstensils];
        filteredUstensilsArray.forEach(element => {
            const liUstensilSelect = document.createElement('li');
            liUstensilSelect.classList.add("li-ustensil-select");
            liUstensilSelect.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            this.ulSelectUstensils.appendChild(liUstensilSelect);
        });
    }

    clearDOM() {
        this.recipesSection.innerHTML = "";
        this.ulSelectIngredients.innerHTML = "";
        this.ulSelectAppliances.innerHTML = "";
        this.ulSelectUstensils.innerHTML = "";
    }

    createTagIngredient(ingredient) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add("tag-div");
        tagDiv.style.backgroundColor = "#3282F7";
        tagDiv.innerHTML = ingredient + this.xMark;
        this.selectionSection.appendChild(tagDiv);
    }

    createTagAppliance(appliance) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add("tag-div");
        tagDiv.style.backgroundColor = "#68D9A4";
        tagDiv.innerHTML = appliance + this.xMark;
        this.selectionSection.appendChild(tagDiv);
    }

    createTagUstensil(ustensil) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add("tag-div");
        tagDiv.style.backgroundColor = "#ED6454";
        tagDiv.innerHTML = ustensil + this.xMark;
        this.selectionSection.appendChild(tagDiv);
    }
}