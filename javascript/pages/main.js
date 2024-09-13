import { recipes } from "../../data/recipes.js";
import { liListener, closeTagListener } from "../utils/search.js";
import {
    listOfUniqueIngredients,
    listOfUniqueAppliance,
    listOfUniqueUstensils,
} from "../utils/search.js";
// import { fetchDataRecipes } from "../utils/fetchAPI.mjs";

// Dom Element (El)
const displayEl = document.querySelector(".card-recipes .row");

// console.log(recipes);

// Function for the display of dropdown section
/**
 *
 * @param {string[]} array - An array of unique values to display in the dropdown
 * @param {string} dropdownName - Name has to mach html class ('ingredients', 'appliance' or 'ustensils')
 */
export function generateDropdownHtml(array, dropdownName) {
    let dropdownEl = document.querySelector(`.list-${dropdownName}`);
    const firstLetterRegex = /^[a-z]/;
    let dropdownListHtml = array
        .map((uncapitalizeString) =>
            uncapitalizeString.replace(
                firstLetterRegex,
                uncapitalizeString[0].toUpperCase()
            )
        )
        .map(
            (capitalizeElement) =>
                ` <li name="${capitalizeElement}" > 
                    <p class="mb-0" >${capitalizeElement}</p>
                </li>`
        );

    dropdownEl.innerHTML = dropdownListHtml.join("");
}

// Function for the display of card section
/**
 * Generate and format the list of ingredients for the html recipes cards
 * @param {Array<object>} ingredients
 * @returns {string}
 */
export function generateIngredientsCardHtml(ingredients) {
    const ingredientsCardDiv = document.createElement("div");
    ingredientsCardDiv.className = "row row-cols-2";

    ingredients.forEach((ingredient) => {
        const ingredientDiv = document.createElement("div");
        ingredientDiv.className = "col card-text";

        const ingredientDivHtml = `
                                            <p class="d-block mb-0 fw-medium">${
                                                ingredient.ingredient
                                            }
                                            </p>
                                            <p
                                                class="d-block text-body-secondary mb-4"
                                            >
${ingredient.quantity || ""}${ingredient.unit || ""}
                                            </p>
    `;
        ingredientDiv.innerHTML = ingredientDivHtml;
        ingredientsCardDiv.appendChild(ingredientDiv);
    });

    return ingredientsCardDiv.outerHTML;
}

/**
 * Generate all card of the given recipe array
 * @param {Array<object>} recipeObj
 * @returns {HTMLElemnt}
 */
function generateRecipesCard(recipeObj) {
    // Building the HTML code
    const recipeIngredientsHtml = generateIngredientsCardHtml(
        recipeObj.ingredients
    );
    const recipeCardHtml = `
                            <div
                                class="card rounded-4 overflow-hidden position-relative"
                            >
                                <img
                                    src="./assets/photos/${recipeObj.image}"
                                    class="card-img-top object-fit-cover w-100 mb-2"
                                    alt="${recipeObj.name}"
                                />
                                <div
                                    class="card-time position-absolute rounded rounded-pill px-3 py-1"
                                >
                                    ${recipeObj.time}min
                                </div>
                                <div class="card-body p-4 mb-3">
                                    <h2 class="card-title hero-font mb-4">
                                        ${recipeObj.name}
                                    </h2>
                                    <h3
                                        class="card-subtitle text-uppercase py-2"
                                    >
                                        Recette
                                    </h3>
                                    <p class="card-text py-2 mb-4">
                                    ${recipeObj.description}
                                    </p>
                                    <h3
                                        class="card-subtitle text-uppercase mb-2 py-2 fw-semibold"
                                    >
                                        Ingrédients
                                    </h3>
                                    ${recipeIngredientsHtml}
                                </div>
                            </div>
`;
    // Building and adding the card to the page
    const recipeCard = document.createElement("article");
    recipeCard.className = "col-4 p-4 mb-3";
    recipeCard.innerHTML = recipeCardHtml;
    displayEl.appendChild(recipeCard);
}

/**
 * Display the first 10 recipes of the json file
 * @param {Array} array
 */
function displayDefaultLayout(array) {
    for (let index = 0; index < 10; index++) {
        const recipe = array[index];
        generateRecipesCard(recipe);
    }
}

/**
 *
 */
function init() {
    displayDefaultLayout(recipes);
    generateDropdownHtml(listOfUniqueIngredients, "ingredients");
    generateDropdownHtml(listOfUniqueAppliance, "appliance");
    generateDropdownHtml(listOfUniqueUstensils, "ustensils");
    liListener();
    // btnCloseTagListener();
}

init();
