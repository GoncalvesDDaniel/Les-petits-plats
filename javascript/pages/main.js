// Import section
import "../../javascript/doc/jsdoc.js";
import { recipes } from "../../data/recipes.js";
// import { fetchDataRecipes } from "../utils/fetchAPI.mjs";

// Export section

// Dom Element (El)
const displayEl = document.querySelector(".card-recipes .row");
const ulHighlightTagEl = document.querySelector(".dropdown-tag");
const tagUlEl = document.querySelector(".dropdown-tag");

//Functions

/**
 *Extrate all ingredients of the database and return an array with duplicate ingredients
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
 * Extrate all appliances of the database and return an array with duplicate appliances
 * @param {Recipe[]} array - Recipe array from database
 * @returns {string[]} Array with duplicates appliance
 */
function getAllAppliance(array) {
    let allAppliance = [];
    array.map((recipe) => allAppliance.push(recipe.appliance));
    return allAppliance;
}

/**
 * Extrate all ustensils of the database and return an array with duplicate ustensils
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
 * Take an array of string with duplicate and return an array with unique values
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
    return uniqueValues;
}

function liListener() {
    document.querySelectorAll(".list_unselected li").forEach((li) => {
        li.addEventListener("click", (event) => {
            let testLi;
            // for (const keys in event.target.attributes) {
            //     testLi.setAttributeNode = event.target.attributes.keys;
            // }
            testLi = event.target.cloneNode(true);
            console.log(testLi);
            // console.log(event.target.attributes.getNamedItem("name"));
            tagOnDropdowns(event);
        });
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
                ` <li name="${capitalizeElement}" data-list=${dropdownName}> 
                    ${capitalizeElement}
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
 * @param {Recipe[]} array
 */
function displayDefaultLayout(array) {
    for (let index = 0; index < 10; index++) {
        generateRecipesCard(array[index]);
    }
}
function dropdownsListener() {
    const dropdownsEl = document.querySelectorAll(".accordion");

    // Listening if a dropdown is open with Bootstrap Events
    // https://getbootstrap.com/docs/4.0/components/collapse/
    dropdownsEl.forEach((dropdown) => {
        dropdown.addEventListener("shown.bs.collapse", (event) => {
            //Listening if an option is selected
            dropdown.addEventListener(
                "click",
                (event) => {
                    //if an option is click
                    if (
                        //     dropdown.contains(event.target) &&
                        event.target.nodeName === "LI"
                    ) {
                        addSearchOption(dropdown, event.target);
                    }
                    //if the clear btn is click
                    if (
                        // event.target.nodeName === "BUTTON" &&
                        event.target.dataset.btn === "clear"
                    ) {
                        dropdown.querySelector("input").value = "";
                        console.log(`resetSearch()`);
                    }
                    //? add spellchecker to the search input
                    if (event.target.nodeName === "INPUT") {
                        dropdown
                            .querySelector("input")
                            .addEventListener("keydown", (event) =>
                                console.log(
                                    `launchSeach(${dropdown.id}, ${event.target.value})`
                                )
                            );
                    }
                }
                // addSearchOption(event.target)
            );
            console.log("enter");
        });
        // Listening if a dropdown is close with Bootstrap Events
        dropdown.addEventListener("hidden.bs.collapse", () => {
            console.log("sortie");
            dropdown.removeEventListener("click", () =>
                deleteSearchOption("remove")
            );
        });
    });
}
// let testLi
// testLi = event.target.cloneNode(true);
function addSearchOption(list, optionEl) {
    let newOption = [optionEl.innerText];
    searchOptions[list.id].push(newOption);
    console.log(searchOptions);

    const highlightClassName =
        "w-100 d-flex justify-content-between align-items-center";
    const highlightBtn = `<button class="btn  btn-close" data-btn="tag"></button>`;
    let listUlEl = list.querySelector(`.list-${list.id}_selected`);
    let liClone = optionEl.cloneNode(true);

    let tagLi = optionEl.cloneNode(true);
    tagLi.className = highlightClassName;
    tagLi.innerHTML = `${tagLi.innerHTML} ${highlightBtn}`;
    tagUlEl.appendChild(tagLi);

    let listLi = optionEl.cloneNode(true);
    listLi.className = highlightClassName;
    listLi.innerHTML = `${listLi.innerHTML} ${highlightBtn}`;
    listUlEl.appendChild(listLi);

    optionEl.classList.add("d-none");
    // console.log(`launchSearch(${list} , ${optionEl.innerText})`);
    // console.log(optionEl);
}
function deleteSearchOption(optionEl) {
    console.log("delete");
}
/**
 *
 */
function init() {
    const listOfUniqueIngredients = getUniqueValues(getAllIngredients(recipes));
    generateDropdownHtml(listOfUniqueIngredients, "ingredients");

    const listOfUniqueAppliance = getUniqueValues(getAllAppliance(recipes));
    generateDropdownHtml(listOfUniqueAppliance, "appliance");

    const listOfUniqueUstensils = getUniqueValues(getAllUstensils(recipes));
    generateDropdownHtml(listOfUniqueUstensils, "ustensils");

    displayDefaultLayout(recipes);
    // liListener();
    dropdownsListener();
    // btnCloseTagListener();
}

init();
