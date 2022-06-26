class Recipe {
    constructor(data) {
        this.idRecipe = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        this.img = `https://picsum.photos/400?random=${this.idRecipe}`;
        this.ingredientsNames = [];
    }

    getRecipe() {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add("recipe-card");

        const img = document.createElement('img');
        img.setAttribute("src", this.img);
        img.setAttribute("alt", this.name);

        const recipeContent = document.createElement('div');
        recipeContent.classList.add("recipe-content");

        const recipeTitleTime = document.createElement('div');
        recipeTitleTime.classList.add("recipe-title-time");

        const recipeTitle = document.createElement('h2');
        recipeTitle.classList.add("recipe-title");
        recipeTitle.textContent = this.name;

        const recipeTime = document.createElement('p');
        recipeTime.classList.add("recipe-time");
        recipeTime.innerHTML = `<i class="fa-regular fa-clock"></i> <span class="time">${this.time}</span> min`;

        recipeTitleTime.appendChild(recipeTitle);
        recipeTitleTime.appendChild(recipeTime);

        const recipeIngredientsDescription = document.createElement('div');
        recipeIngredientsDescription.classList.add("recipe-ingredients-description");

        const ingredients = document.createElement('ul');
        ingredients.classList.add("ingredients");

        this.ingredients.forEach(ingredient => {
            let ingredientLi = document.createElement('li');
            if (!ingredient.unit) {
                ingredientLi.innerHTML = `<span class="ingredient">${ingredient.ingredient}</span> : <span class="quantity">${ingredient.quantity}</span>`;
            }
            if (!ingredient.quantity) {
                ingredientLi.innerHTML = `<span class="ingredient">${ingredient.ingredient}</span>`;
            }
            if (ingredient.unit) {
                ingredientLi.innerHTML = `<span class="ingredient">${ingredient.ingredient}</span> : <span class="quantity">${ingredient.quantity}</span> <span class="unit">${ingredient.unit}</span>`;
            }
            ingredients.appendChild(ingredientLi);
            this.ingredientsNames.push(ingredient.ingredient);
        });

        const description = document.createElement('p');
        description.classList.add("description");
        description.textContent = this.description;

        recipeIngredientsDescription.appendChild(ingredients);
        recipeIngredientsDescription.appendChild(description);

        recipeContent.appendChild(recipeTitleTime);
        recipeContent.appendChild(recipeIngredientsDescription);

        recipeCard.appendChild(img);
        recipeCard.appendChild(recipeContent);

        return recipeCard;
    }
}