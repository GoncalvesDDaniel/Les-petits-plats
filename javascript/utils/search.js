//Import modules
import "../../javascript/doc/jsdoc.js";
import { recipes } from "../../data/recipes.js";
// import { getAllUniqueValeusOfSearch } from "../pages/main.js";

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
    /**
     *
     * @param {string} id
     * @param {string} option
     */
    addOptions(id, option) {
        if (id === "search") {
            searchOptions[id] = option;
        } else {
            searchOptions[id].push(option);
        }
        // document
        //     .querySelectorAll(".btn[datset=tag]")
        //     .addEventListerner("click", (event) => console.log(event));
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
        globalSearch(searchOptions);
    },
    displayRecipe(arr) {
        // console.log(arr.length);
        if (!arr.length) {
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
 * @param {Recipe[]} recipeArray - All recipes
 * @returns {Recipe[]?}
 */
function filterByUserSearch(str, recipeArray) {
    // str.length>3 if input listener function set correctly
    let searchResult = [];
    searchResult = recipeArray.filter(
        (recipe) =>
            recipe.name.toLowerCase().includes(str.toLowerCase()) ||
            recipe.description.toLowerCase().includes(str.toLowerCase()) ||
            recipe.ingredients.some((ing) =>
                ing.ingredient.toLowerCase().includes(str.toLowerCase())
            )
    );
    return searchResult;
}

/**
 *
 * @param {string[]} options
 * @param {Recipe[]} array
 * @returns {Recipe[]}
 */
function filterIngredientsByTags(options, recipeArray) {
    let searchResult = [];
    searchResult = recipeArray.filter((recipe) => {
        return options.every((option) => {
            return recipe.ingredients.some((ingredientsArrayItem) => {
                return ingredientsArrayItem.ingredient
                    .toLowerCase()
                    .includes(option.toLowerCase());
            });
        });
    });

    return searchResult;
}

/**
 * Search the recipe on the database with all the user input
 * @param {searchOptions} objOptions
 * @return {Recipe[]}
 */
function globalSearch(objOptions) {
    let userRecipes = [];

    //Check if we have a user search option
    if (objOptions.search.length >= 3) {
        userRecipes = filterByUserSearch(objOptions.search, filteredRecipes);
    } else {
        userRecipes = filteredRecipes;
    }

    //Check if we have a ingredients tag
    if (searchOptions.ingredients.length > 0) {
        userRecipes = filterIngredientsByTags(
            searchOptions.ingredients,
            userRecipes
        );
    }

    //Check if we have a appliance tag
    // if (searchOptions.appliances.length > 0) {
    //     userRecipes = filterByTags(searchOptions.appliances, userRecipes);
    // }

    //Check if we have a ustensil tag
    // if (searchOptions.ustensils.length > 0) {
    //     userRecipes = filterByTags(searchOptions.ustensils, userRecipes);
    // }

    searchOptions.displayRecipe(userRecipes);

    // console.log(getAllUniqueValeusOfSearch(userRecipes).ingredients);
    // console.log(getAllUniqueValeusOfSearch(userRecipes).appliance);
    // console.log(getAllUniqueValeusOfSearch(userRecipes).ustensils);
}
// globalSearch(searchOptions);

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") // split the accent from the letter
        .replace(/[\u0300-\u036f]/g, ""); // delete all accent
}
