// src/components/RecipeCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function RecipeCard({ recipe }) {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Calories: {recipe.calories} kcal
        </Typography>
        <Button size="small">View Details</Button>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
