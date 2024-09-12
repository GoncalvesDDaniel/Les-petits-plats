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
 * @typedef {{
 * id:number,
 * image:string,
 * name:string,
 * ingredients:{ingredient:string,quantity:number|undefined,units:string|undefined}[],
 * time:string,
 * description:string,
 * appliance:string,
 * ustensils:string[]
 * }[]} recipes
 *
 */
//Dom Element (El)
const ulHighlightTagEl = document.querySelector(".dropdown-tag");

//Functions
/**
 *Extrate all ingredients of the data and return an array with duplicate ingredients
 * @param {recipes} array - Recipe list from the data base
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
 * @param {recipes} array - Recipe list from data base
 * @returns {string[]}
 */
function getAllAppliance(array) {
    let allAppliance = [];
    array.map((recipe) => allAppliance.push(recipe.appliance));
    return allAppliance;
}

/**
 *
 * @param {recipes} array
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
export function btnClearTextListener() {
    document.querySelectorAll(".btn-close[data-btn=clear]").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (event.currentTarget !== btn) return;
            console.log(event.currentTarget);
        });
    });
}
/**
 * @typedef {object[]} searchOptions
 * @property {string} searchOptions[].origin
 * @property {string} searchOptions[].value
 */

// penser a utiliser le destructuring function({origin , value})
const searchOptions = [];

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

    //Highlight inside dropdown menu

    //create new li and copy the text for the highlight ul
    const highlightLi = document.createElement("li");
    const highlightLiClass =
        "d-flex justify-content-between align-items-center";
    highlightLi.className = highlightLiClass;
    const hightlightBtnHtml =
        '<button class="btn  btn-close" data-btn="tag"></button>';

    highlightLi.setAttribute("name", `${liElement.currentTarget.innerText}`);
    // copy the HTML without display none on the close btn
    highlightLi.innerHTML = `
    ${liElement.currentTarget.innerHTML}
   ${hightlightBtnHtml} 
    `;
    highlightUlEl.appendChild(highlightLi);

    //Highlight as individual tag

    let highlightTag = document.createElement("li");
    highlightTag.className =
        "d-flex justify-content-between align-items-center col p-3 me-4 rounded rounded-3  w-100";
    highlightTag.setAttribute("name", `${liElement.currentTarget.innerText}`);
    // copy the HTML without display none on the close btn
    highlightTag.innerHTML = `
    ${liElement.currentTarget.innerHTML}
    <button class="btn  btn-close" data-btn="tag"></button>
    `;
    ulHighlightTagEl.appendChild(highlightTag);

    // li clicked no more avaliable
    liElement.currentTarget.classList.add("d-none");

    // add the tag to le search array

    closeTagListener();
}
export function closeTagListener() {
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
// liListener();
function closeHighlight() {
    console.log("yo");
}
