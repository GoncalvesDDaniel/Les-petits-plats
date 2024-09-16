//Import modules
import "../../javascript/doc/jsdoc.js";
import { recipes } from "../../data/recipes.js";

// Const
// make immutable copy of the database
let filteredRecipes = recipes;
/**
 * @typedef {object} searchOptions - Search params object
 * @property {string} search - Text user input
 * @property {string[]} ingredients - List of ingredients selected
 * @property {string[]} appliances - List of appliances selected
 * @property {string[]} ustensils - List of ustensils selected
 * }
 */
export let searchOptions = {
    search: "",
    ingredients: [],
    appliances: [],
    ustensils: [],
    addOptions(id, option) {
        if (id === "search") {
            searchOptions[id] = option;
        } else {
            searchOptions[id].push(option);
        }
    },
    deleteOptions(id, option) {
        let optionIndex = searchOptions[id].indexOf(option);
        searchOptions[id].splice(optionIndex, 1);
    },
    displayRecipe(arr) {
        if (arr.length === 0) {
            console.log("DisplayResult :", "Aucune recette trouvée");
        } else {
            console.log("DisplayResult :", arr);
        }
    },
};

// penser a utiliser le destructuring function({origin , value})

/**
 * Search the recipe on the database with all the user input
 * @param {searchOptions} objOptions
 * @return {Recipe[]}
 */
function globalSearch(objOptions) {
    // Using short-circut to gain time
    // Test first the user search
    let firstFiltering = [];
    // if(objOptions.search >= 3) { filteredRecipes = filterByUserSearch(objOptions.search)}
    if (firstFiltering.length === 0) {
        searchOptions.displayRecipe(firstFiltering);
    } else if (firstFiltering.length === undefined) {
    } else {
        // filteredRecipes = firstFiltering;
    }
    searchOptions.displayRecipe(filteredRecipes);
}
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") // split the accent from the letter
        .replace(/[\u0300-\u036f]/g, ""); // delete all accent
}

/**
 * Return all recipes that match user input ( search in the name or the ingredients or the description).
 * @param {string} str - the search bar input
 * @returns {Recipe[]?}
 */
function filterByUserSearch(str) {
    if (str.length < 3) return;
    let searchResult = [];
    searchResult = filteredRecipes.filter(
        (recipe) =>
            recipe.name.toLowerCase().includes(str) ||
            recipe.description.toLowerCase().includes(str) ||
            recipe.ingredients.some((ing) =>
                ing.ingredient.toLowerCase().includes(str)
            )
    );

    return searchResult;

    // const newIng = getUniqueValues(getAllIngredients(filteredRecipes));
    // generateDropdownHtml(newIng, "ingredients");
}
function filterByTags() {}

globalSearch(searchOptions);
