// Import section
import "../../data/recipes.js";
import { recipes } from "../../data/recipes.js";
// import { fetchDataRecipes } from "../utils/fetchAPI.mjs";

// Export section
const listOfUniqueIngredients = getUniqueValues(getAllIngredients(recipes));
const listOfUniqueAppliance = getUniqueValues(getAllAppliance(recipes));
const listOfUniqueUstensils = getUniqueValues(getAllUstensils(recipes));

// Dom Element (El)
const displayEl = document.querySelector(".card-recipes .row");
const ulHighlightTagEl = document.querySelector(".dropdown-tag");

//Functions
/**
 *Extrate all ingredients of the database and return an array with duplicate ingredients
 * @param {Recipe[]} array - Recipe array from the database
 * @returns {string[]}
 */
function getAllIngredients(array) {
    let allIngredients = [];
    array.map((recipe) =>
        recipe.ingredients.map((ingredients) =>
            allIngredients.push(ingredients.ingredient)
        )
    );
    return allIngredients.flat();
}

/**
 * Extrate all appliances of the database and return an array with duplicate appliances
 * @param {Recipe[]} array - Recipe array from database
 * @returns {string[]}
 */
function getAllAppliance(array) {
    let allAppliance = [];
    array.map((recipe) => allAppliance.push(recipe.appliance));
    return allAppliance;
}

/**
 * Extrate all ustensils of the database and return an array with duplicate ustensils
 * @param {recipes[]} array - Recipe array from the database
 */
function getAllUstensils(array) {
    let allUstensils = [];
    array.map((recipe) =>
        recipe.ustensils.map((ustensil) => allUstensils.push(ustensil))
    );
    return allUstensils;
}

/**
 * Take an array of string with duplicate and return an array with unique values
 * @param {string[]} array - Array with duplicate string
 * @returns {string[]}
 * */
function getUniqueValues(array) {
    let uniqueValues = [];
    array.forEach((element) => {
        if (!uniqueValues.includes(element.toLowerCase())) {
            uniqueValues.push(element.toLowerCase());
        }
    });
    return uniqueValues;
}

function liListener() {
    document.querySelectorAll(".list_unselected li").forEach((li) => {
        if (!li) return;
        else {
            li.addEventListener("click", (event) => tagOnDropdowns(event));
        }
    });
}

function btnClearTextListener() {
    document.querySelectorAll(".btn-close[data-btn=clear]").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (event.currentTarget !== btn) return;
            console.log(event.currentTarget);
        });
    });
}

/**
 *
 * @param {HTMLElement} liElement
 */
function tagOnDropdowns(liElement) {
    // Define the list clicked in lowerCase
    let currentListName = liElement.currentTarget.parentElement.dataset.list;
    let currentOptionName = liElement.currentTarget.innerText;

    let highlightUlEl = document.querySelector(
        `.list-${currentListName}_selected`
    );

    const highlightLiClass =
        "d-flex justify-content-between align-items-center";
    const hightlightBtnHtml =
        '<button class="btn  btn-close" data-btn="tag"></button>';

    //create new li and copy the text for the highlight ul
    const highlightLi = document.createElement("li");

    highlightLi.className = highlightLiClass;
    highlightLi.setAttribute("name", currentOptionName);
    // copy the HTML without display none on the close btn
    highlightLi.innerHTML = ` ${liElement.currentTarget.innerHTML} ${hightlightBtnHtml} `;
    highlightUlEl.appendChild(highlightLi);

    const highlightLiTag = document.createElement("li");
    highlightLiTag.className = highlightLiClass;
    highlightLiTag.setAttribute("name", `${liElement.currentTarget.innerText}`);
    highlightLiTag.innerHTML = ` ${liElement.currentTarget.innerHTML} ${hightlightBtnHtml} `;
    ulHighlightTagEl.appendChild(highlightLiTag);

    // li clicked no more avaliable
    liElement.currentTarget.classList.add("d-none");

    // add the tag to le search array

    closeTagListener();
}
function closeTagListener() {
    document.querySelectorAll(".btn-close[data-btn=tag]").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (event.currentTarget !== btn) return;
            else closeTag(event.currentTarget);
        });
    });
}

function closeTag(btnEl) {
    // console.log(btnEl.parentNode.parentNode);
    // console.log(btnEl.previousElementSibling.innerText);
    let elToClose = document.querySelectorAll(
        `li[name="${btnEl.previousElementSibling.innerText}"]`
    );
    console.log(elToClose);
    elToClose.forEach((highlightEl) => highlightEl.remove());
    // btnEl.parentNode.remove();
}

function closeHighlight() {
    console.log("yo");
}
// liListener();

/**
 */
const searchOptions = {
    search: "coc",
    ingredients: [],
    appliances: [],
    ustensils: [],
};
/**
 *
 * @param {Recipe[]} array - An array of unique values to display in the dropdown
 * @param {string} dropdownName - Name has to mach html class ('ingredients', 'appliance' or 'ustensils')
 */
function generateDropdownHtml(array, dropdownName) {
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
function generateIngredientsCardHtml(ingredients) {
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
