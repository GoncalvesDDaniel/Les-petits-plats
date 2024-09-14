//Import modules
import "../../data/recipes.js";
// import { generateDropdownHtml } from "../pages/main.js";

// penser a utiliser le destructuring function({origin , value})

function globalSearch(arrOptions) {
    let filteredRecipes = [];
    if (arrOptions.search.length >= 3) {
        filteredRecipes = recipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(arrOptions.search) ||
                recipe.description.toLowerCase().includes(arrOptions.search) ||
                recipe.ingredients.some((ing) =>
                    ing.ingredient.toLowerCase().includes(arrOptions.search)
                )
        );
        console.log(filteredRecipes);
        const newIng = getUniqueValues(getAllIngredients(filteredRecipes));
        generateDropdownHtml(newIng, "ingredients");
    }
}
// globalSearch(searchOptions);
