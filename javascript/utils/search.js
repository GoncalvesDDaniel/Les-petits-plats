//Import modules
import { recipes } from "../../data/recipes.js";

// Export const
export const listOfUniqueIngredients = getUniqueValues(
    getAllIngredients(recipes)
);
export const listOfUniqueAppliance = getUniqueValues(getAllAppliance(recipes));
export const listOfUniqueUstensils = getUniqueValues(getAllUstensils(recipes));

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

// function searchByIngredients(ingredient) {}
// function searchByDropdowns(ingredient) {}
export function liListener() {
    document.querySelectorAll(".list_unselected li").forEach((li) => {
        if (!li) return;
        else {
            li.addEventListener("click", (event) => tagOnDropdowns(event));
        }
    });
}
/**
 *
 * @param {HTMLElement} liElement
 */
function tagOnDropdowns(liElement) {
    // Define the list clicked in lowerCase
    let currentListName = liElement.currentTarget.parentElement.dataset.list;
    let highlightUlEl = document.querySelector(
        `.list-${currentListName}_selected`
    );

    //create new li and copy the li clicked to the highlight ul
    let highlightLi = document.createElement("li");
    highlightLi.className =
        "d-flex justify-content-between w-100 align-items-center";
    // copy the HTML without display none on the close btn
    highlightLi.innerHTML = liElement.currentTarget.innerHTML.replace(
        "d-none",
        ""
    );
    highlightUlEl.appendChild(highlightLi);

    // li clicked no more avaliable
    liElement.currentTarget.classList.add("d-none");

    // console.log(liElement.currentTarget.classList);
    // console.log(liElement.currentTarget.parentElement.dataset.list);
    // console.log(liElement.currentTarget.innerHTML.replace("d-none", ""));
    // if (divId.classList.contains("collapsed")) {
    //     console.log("fermee");
    // } else console.log("ouvert");
}
liListener();
