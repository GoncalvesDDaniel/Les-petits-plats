//Import modules
import { recipes } from "../../data/recipes.js";

// JSDOC - define the format of the database
/**
 * @typedef Recipe
 * @type {object}
 * @property {number} id - Id of the recipe
 * @property {string} image - Name of the image file
 * @property {string} name - Name of the recipe
 * @property {ingredients[]} ingredients - List of the ingredients needed
 * @property {number} time - Estimate time of the recipe
 * @property {string} description - Description of the recipe
 * @property {string} appliance - Apppliance needed for the recipe
 * @property {string[]} ustensils - Ustensils needed for the recipe
 */
/**
 * @typedef ingredients
 * @type {object}
 * @property {string} ingredient - Name of the ingredient
 * @property {number=} quantity - Quantity needed for the recipe
 * @property {string=} unit - Unit of the quantity
 */

//Functions
/**
 *Extrate all ingredients of the data and return an array with duplicate ingredients
 * @param {Recipe[]} array - Recipe list from the data base
 * @returns {string[]}
 */
function getAllIngredients(array) {
    // double map because two array object : recipe.ingredients[{ingredient:...}]
    let allIngredients = [];
    array.map((recipe) =>
        recipe.ingredients.map((ingredients) =>
            allIngredients.push(ingredients.ingredient)
        )
    );
    return allIngredients.flat();
}

/**
 * Extrate all appliances of the data and return an array with duplicate appliances
 * @param {Recipe[]} array - Recipe list from data base
 * @returns {string[]}
 */
function getAllAppliance(array) {
    let allAppliance = [];
    array.map((recipe) => allAppliance.push(recipe.appliance));
    return allAppliance;
}

/**
 *
 * @param {Recipe[]} array
 */
function getAllUstensils(array) {
    let allUstensils = [];
    array.map((recipe) =>
        recipe.ustensils.map((ustensil) => allUstensils.push(ustensil))
    );
    return allUstensils;
}

/**
 * Take an array of string with duplicate and return with unique values
 * @param {string[]} array
 * @returns {string[]}6*/
function getUniqueValues(array) {
    let uniqueValues = [];
    array.forEach((element) => {
        if (!uniqueValues.includes(element.toLowerCase())) {
            uniqueValues.push(element.toLowerCase());
        }
    });
    return uniqueValues;
}
console.log(getAllUstensils(recipes));
console.log(getUniqueValues(getAllUstensils(recipes)));
