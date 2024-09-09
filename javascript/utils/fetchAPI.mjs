/**
 * Fetch recipes from API
 * @param {string} url url patch
 * @returns {array}
 */
export async function fetchDataRecipes(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Fetch has fail");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
