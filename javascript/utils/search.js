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
        globalSearch(searchOptions);
    },
    /**
     *
     * @param {string} id
     * @param {string} option
     */
    deleteOptions(id, option) {
        if (id === "search") {
            searchOptions.search = "";
        } else {
            let optionIndex = searchOptions[id].indexOf(option);
            searchOptions[id].splice(optionIndex, 1);
        }
    },
    displayRecipe(arr) {
        console.log(arr.length);
        if (arr.length === 0) {
            console.log("DisplayResult :", "Aucune recette trouvée");
        } else {
            console.log("DisplayResult :", arr);
        }
    },
};

// penser a utiliser le destructuring function({origin , value})

/**
 * Return all recipes that match user input ( search in the name or the ingredients or the description).
 * @param {string} str - the search bar input
 * @returns {Recipe[]?}
 */
function filterByUserSearch(str) {
    // str.length>3 if input listener function set correctly
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
}

function filterByTags() {}

/**
 * Search the recipe on the database with all the user input
 * @param {searchOptions} objOptions
 * @return {Recipe[]}
 */
function globalSearch(objOptions) {
    let userRecipes = [];
    if (objOptions.search.length >= 3) {
        userRecipes = filterByUserSearch(objOptions.search);
    }
    //early check with the user input
    if (userRecipes.length === 0) {
        console.log("Aucune Recette");
    }

    console.log(userRecipes);
}
// globalSearch(searchOptions);

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") // split the accent from the letter
        .replace(/[\u0300-\u036f]/g, ""); // delete all accent
}
