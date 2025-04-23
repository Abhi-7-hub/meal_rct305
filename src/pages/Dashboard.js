import { Typography, Button, TextField, Box, Grid, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/recipes/RecipeCard';
import { useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();

  // Step 1: Recipe state with more initial recipes
  const [recipes, setRecipes] = useState([
    { name: "Pasta", calories: 300 },
    { name: "Salad", calories: 150 },
    { name: "Pizza", calories: 400 },
    { name: "Burger", calories: 500 },
    { name: "Sushi", calories: 250 },
    { name: "Pancakes", calories: 350 },
    { name: "Steak", calories: 600 },
    { name: "Noodles", calories: 200 },
    { name: "Soup", calories: 100 },
    { name: "Cake", calories: 450 },
  ]);

  // Step 2: Add Recipe Form Inputs state
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    calories: '',
  });

  const [loading, setLoading] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState(6); // Number of recipes to show initially

  // Step 3: Handle Input Change
  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // Step 4: Add Recipe Function
  const addRecipe = () => {
    if (newRecipe.name && newRecipe.calories) {
      setLoading(true); // Start loading
      setTimeout(() => {
        setRecipes([...recipes, { name: newRecipe.name, calories: parseInt(newRecipe.calories) }]);
        setNewRecipe({ name: '', calories: '' }); // Clear inputs
        setLoading(false); // Stop loading
      }, 1000); // Simulate API delay
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Step 5: Show More Recipes
  const showMore = () => {
    setDisplayedRecipes(displayedRecipes + 6); // Add 6 more recipes
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Welcome, {user?.name || user?.displayName || user?.email}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px', color: '#34495e' }}>
        This is your dashboard. Start by planning your meals!
      </Typography>

      {/* Step 6: Recipe list */}
      <Grid container spacing={3}>
        {recipes.slice(0, displayedRecipes).map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      {displayedRecipes < recipes.length && (
        <Button
          variant="outlined"
          color="primary"
          onClick={showMore}
          style={{ marginTop: '20px' }}
        >
          Show More
        </Button>
      )}

      {/* Step 7: Add Recipe Form */}
      <Box component="form" noValidate autoComplete="off" style={{ marginTop: '30px' }}>
        <TextField
          label="Recipe Name"
          variant="outlined"
          name="name"
          value={newRecipe.name}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '15px' }}
          required
        />
        <TextField
          label="Calories"
          variant="outlined"
          name="calories"
          value={newRecipe.calories}
          onChange={handleChange}
          type="number"
          fullWidth
          style={{ marginBottom: '15px' }}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addRecipe}
          style={{ marginTop: '10px' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Add Recipe'}
        </Button>
      </Box>
    </div>
  );
}
