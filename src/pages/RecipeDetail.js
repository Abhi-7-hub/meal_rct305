// src/pages/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getRecipeDetails } from '../utils/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [recipe, setRecipe] = useState(state?.recipe || null);
  const [loading, setLoading] = useState(!state?.recipe);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) throw new Error('No recipe ID');
        
        const data = await getRecipeDetails(id);
        if (!data) throw new Error('Recipe not found');
        
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!state?.recipe) fetchRecipe();
  }, [id, state]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img 
        src={recipe.image} 
        alt={recipe.title}
        onError={(e) => e.target.src = '/placeholder-food.jpg'}
      />
      <div className="meta">
        <span>⏱️ {recipe.readyInMinutes} mins</span>
        <span>🍽️ {recipe.servings} servings</span>
      </div>
      
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients?.map(ing => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
};

export default RecipeDetail;