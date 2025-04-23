import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetails.css'; // optional CSS file

const RecipeDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const recipe = state?.recipe;

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  const calories = recipe?.nutrition?.nutrients?.find(
    (n) => n.name === 'Calories'
  )?.amount || '--';

  return (
    <div className="recipe-details">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>
      <h1>{recipe.title || 'Untitled Recipe'}</h1>
      <img
        src={recipe.image || '/placeholder-food.jpg'}
        alt={recipe.title}
        className="recipe-image"
      />
      <p><strong>Ready In:</strong> {recipe.readyInMinutes} minutes</p>
      <p><strong>Calories:</strong> {calories} kcal</p>
      <p><strong>Servings:</strong> {recipe.servings || 1}</p>

      <h2>Ingredients</h2>
      <ul>
        {(recipe.extendedIngredients || []).map((ing, index) => (
          <li key={index}>
            {ing.original || ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
