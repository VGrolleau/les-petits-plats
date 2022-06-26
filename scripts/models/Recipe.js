class Recipe {
    constructor(data) {
        this.idRecipe = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

    getRecipe() {
        console.log('id :', this.idRecipe, '/', this.name, '/ portions :', this.servings, '/ ingrédients :', this.ingredients, '/', this.time, 'min / appareil :', this.appliance, '/ ustensiles :', this.ustensils);
        console.log(this);
    }
}