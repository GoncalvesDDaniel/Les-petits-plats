import { fetchDataRecipes } from "../utils/fetchAPI.mjs";
import { recipes } from "../../data/recipes.js";

// Dom Element (El)
const displayEl = document.querySelector(".card-recipes .row");

console.log(recipes);

/**
 *
 * @param {Array} recipeObj
 */
function createRecipeCard(recipeObj) {
    /**
     *
     * @param {Array} ingredients
     * @returns {string}
     */
    function generateIngredientsHtml(ingredients) {
        const ingredientsCardDiv = document.createElement("div");
        ingredientsCardDiv.className = "row row-cols-2";

        ingredients.forEach((ingredient) => {
            const ingredientDiv = document.createElement("div");
            ingredientDiv.className = "col card-text";

            const ingredientDivHtml = `
                                            <p class="d-block mb-0 fw-medium">
                                               ${ingredient.ingredient}
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

    // Building the card in a <article>
    const recipeCard = document.createElement("article");
    const recipeIngredientsHtml = generateIngredientsHtml(
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
    recipeCard.className = "col-4 p-4 mb-3";
    recipeCard.innerHTML = recipeCardHtml;

    displayEl.appendChild(recipeCard);
}

function displayDefaultLayout(array) {
    for (let index = 0; index < 10; index++) {
        const recipe = array[index];
        createRecipeCard(recipe);
    }
}
displayDefaultLayout(recipes);
