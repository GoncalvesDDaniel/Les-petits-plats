/**
 * @typedef {Object} Ingredients
 * @property {string} ingredient - Le nom de l'ingrédient.
 * @property {number} [quantity] - La quantité de l'ingrédient (facultatif si non applicable).
 * @property {string} [unit] - L'unité de mesure pour la quantité (facultatif).

/**
 * @typedef {Object} Recipe
 * @property {number} id - L'identifiant unique de la recette.
 * @property {string} image - Le nom du fichier image associé à la recette.
 * @property {string} name - Le nom de la recette.
 * @property {number} servings - Le nombre de portions que la recette produit.
 * @property {Ingredients[]} ingredients - La liste des ingrédients nécessaires à la recette.
 * @property {number} time - Le temps de préparation de la recette en minutes.
 * @property {string} description - La description détaillée des étapes pour préparer la recette.
 * @property {string} appliance - L'appareil nécessaire pour la préparation.
 * @property {string[]} ustensils - La liste des ustensiles nécessaires pour la préparation.

 */
