//*Import section
import "../../javascript/doc/jsdoc.js";
import { recipes } from "../../data/recipes.js";
import { searchOptions } from "../utils/search.js";
// import { fetchDataRecipes } from "../utils/fetchAPI.mjs";

//*Dom Element (El)
export const cardRecipesDisplayEl =
    document.querySelector(".card-recipes .row");
const mainTagUlEl = document.querySelector(".dropdown-tag");

//*Functions
//*Functions for dropdowns menu
/**
 * Go throw all ingredients,ustensils and appliances of the recipe list and create the dropdown corresponding
 * @param {Recipe[]} array
 */
export function generateDropdownHtml(recipeList) {
    // Tool to build the dropdown

    /**
     *Extrate all ingredients of the recipeList and return an array with duplicate ingredients
     * @param {Recipe[]} array - Recipe array from the database
     * @returns {string[]} Array with duplicates ingredients
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
     * Extrate all appliances of the recipeList and return an array with duplicate appliances
     * @param {Recipe[]} array - Recipe array from database
     * @returns {string[]} Array with duplicates appliance
     */
    function getAllAppliance(array) {
        let allAppliance = [];
        array.map((recipe) => allAppliance.push(recipe.appliance));
        return allAppliance;
    }

    /**
     * Extrate all ustensils of the recipeList and return an array with duplicate ustensils
     * @param {Recipe[]} array - Recipe array from the database
     * @returns {string[]} Array with duplicates ustensils
     */
    function getAllUstensils(array) {
        let allUstensils = [];
        array.map((recipe) =>
            recipe.ustensils.map((ustensil) => allUstensils.push(ustensil))
        );
        return allUstensils;
    }

    /**
     * Take an array of string with duplicate and return an array with unique values alphabeticly sorted
     * @param {string[]} array - Array with duplicate
     * @returns {string[]} Array with unique values
     * */
    function getUniqueValues(array) {
        let uniqueValues = [];
        array.forEach((element) => {
            if (!uniqueValues.includes(element.toLowerCase())) {
                uniqueValues.push(element.toLowerCase());
            }
        });
        uniqueValues.sort();
        return uniqueValues;
    }

    /**
     * Take the recipeList and return an object with an array with unique value corresponding to their key
     * @param {Recipe[]} array
     * @returns {{ingredients:string[],appliance:string[],ustensils:string[]}}
     */
    function getAllUniqueValeusOfSearch(array) {
        return {
            ingredients: getUniqueValues(getAllIngredients(array)),
            appliances: getUniqueValues(getAllAppliance(array)),
            ustensils: getUniqueValues(getAllUstensils(array)),
        };
    }

    // Building all dropdowns
    let allDropdownList = getAllUniqueValeusOfSearch(recipeList);
    for (const listId in allDropdownList) {
        const firstLetterRegex = /^[a-z]/;
        let dropdownListHtml = allDropdownList[listId]
            // map to capitalize the first letter of the string
            .map((uncapitalizeString) =>
                uncapitalizeString.replace(
                    firstLetterRegex,
                    uncapitalizeString[0].toUpperCase()
                )
            )
            // map to make each item an html li
            .map(
                (capitalizeString) =>
                    `<li data-id="${capitalizeString}">${capitalizeString}</li>`
            );

        // select dropdown list and put all li
        let dropdownEl = document.querySelector(`#${listId} .list_unselected`);
        dropdownEl.innerHTML = dropdownListHtml.join("");
    }
    dropdownsListener();
}

//*Functions for card recipe

/**
 * Generate all card of the given recipe array
 * @param {Recipe} individualRecipe
 */
export function generateRecipesCard(individualRecipe) {
    /**
     * Generate and format the list of ingredients for the html recipes cards
     * @param {Ingredients[]} ingredients
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
${ingredient.quantity || ""} ${ingredient.unit || ""}
                                            </p>
    `;
            ingredientDiv.innerHTML = ingredientDivHtml;
            ingredientsCardDiv.appendChild(ingredientDiv);
        });

        return ingredientsCardDiv.outerHTML;
    }
    // Building the HTML code
    const recipeIngredientsHtml = generateIngredientsCardHtml(
        individualRecipe.ingredients
    );
    const recipeCardHtml = `
                            <div
                                class="card rounded-4 overflow-hidden position-relative h-100"
                            >
                                <img
                                    src="./assets/photos/${individualRecipe.image}"
                                    class="card-img-top object-fit-cover w-100 mb-2"
                                    alt="${individualRecipe.name}"
                                />
                                <div
                                    class="card-time position-absolute rounded rounded-pill px-3 py-1"
                                >
                                    ${individualRecipe.time}min
                                </div>
                                <div class="card-body p-4 mb-3">
                                    <h2 class="card-title hero-font mb-4">
                                        ${individualRecipe.name}
                                    </h2>
                                    <h3
                                        class="card-subtitle text-uppercase py-2"
                                    >
                                        Recette
                                    </h3>
                                    <p class="card-text py-2 mb-4">
                                    ${individualRecipe.description}
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
    cardRecipesDisplayEl.appendChild(recipeCard);
}

//*Function for the algorithm
/**
 * Add a tag and launch a global search with all options and display it
 * @param {string} list
 * @param {HTMLElement} optionEl
 */
function addSearchOption(list, optionEl) {
    let option = optionEl.innerText;
    // Launch search algo
    searchOptions.addOptions(list.id, option);
    //
    // Add the tag on html page

    let dropdownUlEl = list.querySelector(`.list_selected`);
    const tagClassName =
        "w-100 d-flex justify-content-between align-items-center";
    const btnCloseTagHtml = `<button class="btn  btn-close" data-list=${list.id}></button>`;

    // li for ul dropdown
    let liForDropdown = document.createElement("li");
    liForDropdown.className = tagClassName;
    liForDropdown.dataset.id = `${option}`;
    liForDropdown.dataset.list = `${list.id}`;
    liForDropdown.innerHTML = `${option} ${btnCloseTagHtml}`;
    dropdownUlEl.appendChild(liForDropdown);

    // li for ul main page
    let liForMain = document.createElement("li");
    liForMain.className = tagClassName;
    liForMain.dataset.id = `${option}`;
    liForMain.dataset.list = `${list.id}`;
    liForMain.innerHTML = `${option} ${btnCloseTagHtml}`;
    mainTagUlEl.appendChild(liForMain);

    // New dropdown list has been generated so
    // Look inside all options selected (inside ul tag banner) and
    // make all selected no more availiable
    mainTagUlEl.querySelectorAll("li").forEach((li) => {
        document
            .querySelector(
                `#${li.dataset.list} .list_unselected li[data-id="${li.dataset.id}"]`
            )
            ?.classList?.add("d-none");
    });
}

/**
 * Deleted an option and launch a global search with the remaining options and display it
 * @param {string} list
 * @param {HTMLElement} optionEl
 */
function deleteSearchOption(list, optionEl) {
    let deleteOption = optionEl.parentNode.innerText;
    searchOptions.deleteOptions(list, deleteOption);

    if (list === "search") {
        // Search bar input reset with value not innerHTML
        optionEl.value = "";
    } else {
        // remove tag from ul main and ul dropdown
        document
            .querySelector(`.dropdown-tag li[data-id="${deleteOption}"]`)
            .remove();
        document
            .querySelector(`#${list} li[data-id="${deleteOption}"]`)
            .remove();
        // make the selection available
        document
            .querySelector(`.list_unselected li[data-id="${deleteOption}"]`)
            ?.classList?.remove("d-none");
    }
}

//*Functions Listener

function searchBarListener() {
    const form = document.querySelector("form");
    const userInput = document.querySelector("#search");
    const formResetBtn = document.querySelector(".search-button_reset");

    form.addEventListener("input", (event) => {
        event.preventDefault();
        if (userInput.value.length >= 3) {
            searchOptions.addOptions("search", userInput.value);
        } else {
            searchOptions.deleteOptions("search", "");
        }
    });
    formResetBtn.addEventListener("click", () => {
        searchOptions.deleteOptions("search", "");
        userInput.value = "";
    });
}
function dropdownsListener() {
    const dropdownsEl = document.querySelectorAll(".accordion");
    const dropdownIngredients = document.querySelector(
        "#ingredients .list_unselected"
    );
    const dropdownAppliances = document.querySelector(
        "#appliances .list_unselected"
    );
    const dropdownUstensils = document.querySelector(
        "#ustensils .list_unselected"
    );
    let initialHtml = {
        ingredients: dropdownIngredients.innerHTML,
        appliances: dropdownAppliances.innerHTML,
        ustensils: dropdownUstensils.innerHTML,
    };

    // Listening if a dropdown is open with Bootstrap Events
    // https://getbootstrap.com/docs/4.0/components/collapse/
    dropdownsEl.forEach((dropdown) => {
        dropdown.addEventListener("shown.bs.collapse", (event) => {
            //Listening if an option is selected
            dropdown.addEventListener("click", (event) => {
                //if an option is click
                if (event.target.parentNode?.matches(".list_unselected")) {
                    addSearchOption(dropdown, event.target);
                }
                //if the clear btn is click
                if (event.target.dataset.btn === "clear") {
                    dropdown.querySelector("input").value = "";
                    dropdown.querySelector(".list_unselected").innerHTML =
                        initialHtml[dropdown.id];
                }
                //? add spellchecker to the search input
                if (event.target.nodeName === "INPUT") {
                    dropdown
                        .querySelector("input")
                        .addEventListener("keyup", (event) =>
                            searchOnDropdowns(dropdown.id, event.target.value)
                        );
                }
            });
        });

        /**
         * Search in the dropdown what is written in the dropdown search bar
         * @param {string} id - name of the droppdown
         * @param {string} input - value of the input string
         */
        function searchOnDropdowns(id, input) {
            let dropdownLiEl = document.querySelectorAll(
                `#${id} .list_unselected li`
            );
            dropdownLiEl.forEach((li) => {
                if (li.innerText.toLowerCase().includes(input.toLowerCase())) {
                    li.classList.remove("d-none");
                } else {
                    li.classList.add("d-none");
                }
            });
        }
    });
}

function closeTagListener() {
    //select all ul with btn-close
    mainTagUlEl.addEventListener("click", (event) => {
        if (event.target.matches(".btn-close"))
            deleteSearchOption(event.target.dataset.list, event.target);
    });
    const allDropdownUlEl = document.querySelectorAll(".list_selected");
    allDropdownUlEl.forEach((ul) =>
        ul.addEventListener("click", (event) => {
            if (event.target.matches(".btn-close"))
                deleteSearchOption(event.target.dataset.list, event.target);
        })
    );
}

/**
 * Generate card and display it. Only the first 10 recipes
 * @param {Recipe[]} array
 */
function displayDefaultLayout(array) {
    generateDropdownHtml(array);
    for (let index = 0; index < 10; index++) {
        generateRecipesCard(array[index]);
    }
}

function init() {
    displayDefaultLayout(recipes);
    searchBarListener();
    closeTagListener();
}

init();
