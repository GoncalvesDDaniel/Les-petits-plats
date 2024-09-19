//Import modules
import "../../javascript/doc/jsdoc.js";
import { recipes } from "../../data/recipes.js";
import { generateRecipesCard, generateDropdownHtml } from "../pages/main.js";
// import { getAllUniqueValeusOfSearch } from "../pages/main.js";

// Const
// make immutable copy of the database
let filteredRecipes = recipes;

//DOM El
const recipeTagEl = document.querySelector(".dropdown-tag");
const recipeCardEl = document.querySelector(".card-recipes .row");
const dropdownIngredients = document.querySelector(
    "#ingredients .list_selected"
);
const dropdownAppliances = document.querySelector("#appliances .list_selected");
const dropdownUstensils = document.querySelector("#ustensils .list_selected");

/**
 * @type {searchOptions} - Search params object
 */
export let searchOptions = {
    search: "",
    ingredients: [],
    appliances: "",
    ustensils: [],

    /**
     * @param {string} id
     * @param {string} option
     * @returns {void}
     */
    addOptions(id, option) {
        if (id === "search" || id === "appliances") {
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
        if (id === "search" || id === "appliances") {
            searchOptions[id] = "";
        } else {
            let optionIndex = searchOptions[id].indexOf(option);
            searchOptions[id].splice(optionIndex, 1);
        }
        globalSearch(searchOptions);
    },
    /**
     *
     * @param {Recipe[]} arr
     */
    // displayRecipe(arr) {
    //     // console.log(initialHtmlCardDisplay);
    //     if (!arr.length) {
    //         console.log("DisplayResult :", "Aucune recette trouvée");
    //     } else if (arr.length === recipes.length) {
    //         console.log("Displaydefaut");
    //     } else {
    //         console.log("DisplayResult :", arr);
    //     }
    // },
};

// penser a utiliser le destructuring function({origin , value})

/**
 * Search the recipe on the database with all the user's inputs
 * @param {searchOptions} objOptions
 * @return {Recipe[]}
 */
function globalSearch(objOptions) {
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
     * Return all recipes that have the ingredient choised in the dropdown menu
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
     * Return all recipes that have the ingredient choised in the dropdown menu
     * @param {string} options
     * @param {Recipe[]} recipeArray
     * @returns {Recipe[]}
     */
    function filterAppliancesByTags(options, recipeArray) {
        let searchResult = [];
        // debugger;
        searchResult = recipeArray.filter((recipe) => {
            return recipe.appliance
                .toLowerCase()
                .includes(options.toLowerCase());
        });
        return searchResult;
    }

    /**
     *
     * @param {string[]} options
     * @param {Recipe[]} recipeArray
     * @returns {Recipe[]}
     */
    function filterUstensilsByTags(options, recipeArray) {
        let searchResult = [];
        searchResult = recipeArray.filter((recipe) => {
            return options.every((option) => {
                return recipe.ustensils.some((ustensil) => {
                    return ustensil
                        .toLowerCase()
                        .includes(option.toLowerCase());
                });
            });
        });
        return searchResult;
    }
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
    if (searchOptions.appliances.length > 0) {
        userRecipes = filterAppliancesByTags(
            searchOptions.appliances,
            userRecipes
        );
    }

    //Check if we have a ustensil tag
    if (searchOptions.ustensils.length > 0) {
        userRecipes = filterUstensilsByTags(
            searchOptions.ustensils,
            userRecipes
        );
    }

    displaySearchResult(userRecipes);
    generateDropdownHtml(userRecipes);
}

const initialHtmlCardDisplay = recipeCardEl.innerHTML;
const initialHtmlIngredientsDropdown = dropdownIngredients.innerHTML;
const initialHtmlAppliancesDropdown = dropdownAppliances.innerHTML;
const initialHtmlUstensilsDropdown = dropdownUstensils.innerHTML;

/**
 *
 * @param {Recipe[]} arr
 * @returns {void}
 */
function displaySearchResult(arr) {
    if (!arr.length) {
        recipeCardEl.innerHTML = `<p class="col hero-font text-center align-self-center mt" > Aucune recette ne contient '${searchOptions.search}' vous pouvez chercher 'tarte aux pommes', 'poisson', etc </p>`;

        console.log("DisplayResult :", "Aucune recette trouvée");
    } else if (arr.length === recipes.length) {
        recipeCardEl.innerHTML = initialHtmlCardDisplay;
    } else {
        console.log("DisplayResult");
        recipeCardEl.innerHTML = "";
        // debugger;
        arr.map((recipe) => generateRecipesCard(recipe));
    }
}
// Function that can be used for futur update
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD") // split the accent from the letter
        .replace(/[\u0300-\u036f]/g, ""); // delete all accent
}
