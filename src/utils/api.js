// src/utils/api.js
const API_KEY = '0b606f94188447cf91393c2cd5ae9012';

export const searchRecipes = async (query = '', options = {}) => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    query,
    number: 20,  // Max results
    addRecipeInformation: true,
    ...options
  });

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
    return await response.json();
  } catch (error) {
    console.error('Details error:', error);
    return null;
  }
};