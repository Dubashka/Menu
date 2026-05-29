import { CreateRecipeDto, UpdateRecipeDto } from '../validation';
import { DatabaseShape, RecipeIngredient, RecipeWithIngredients } from '../types';

export const mapRecipeListItem = (recipe: RecipeWithIngredients) => ({
  id: recipe.id,
  title: recipe.title,
  description: recipe.description,
  imageUrl: recipe.imageUrl,
  category: recipe.category,
  cookingTime: recipe.cookingTime,
  baseWeight: recipe.baseWeight,
  caloriesPer100: recipe.caloriesPer100,
  proteinPer100: recipe.proteinPer100,
  fatPer100: recipe.fatPer100,
  carbsPer100: recipe.carbsPer100,
  steps: recipe.steps,
  createdAt: recipe.createdAt,
  updatedAt: recipe.updatedAt
});

export const createRecipeEntity = (
  db: DatabaseShape,
  payload: CreateRecipeDto
): RecipeWithIngredients => {
  const now = new Date().toISOString();
  const recipeId = db.meta.lastRecipeId + 1;
  let ingredientId = db.meta.lastIngredientId;

  const ingredients: RecipeIngredient[] = payload.ingredients.map((ingredient, index) => {
    ingredientId += 1;
    return {
      id: ingredientId,
      recipeId,
      name: ingredient.name,
      weight: ingredient.weight,
      calories: ingredient.calories,
      protein: ingredient.protein,
      fat: ingredient.fat,
      carbs: ingredient.carbs,
      sortOrder: index
    };
  });

  db.meta.lastRecipeId = recipeId;
  db.meta.lastIngredientId = ingredientId;

  return {
    id: recipeId,
    title: payload.title,
    description: payload.description,
    imageUrl: payload.image_url,
    category: payload.category,
    cookingTime: payload.cooking_time,
    baseWeight: payload.base_weight,
    caloriesPer100: payload.calories_per100,
    proteinPer100: payload.protein_per100,
    fatPer100: payload.fat_per100,
    carbsPer100: payload.carbs_per100,
    steps: payload.steps,
    ingredients,
    createdAt: now,
    updatedAt: now
  };
};

export const updateRecipeEntity = (
  db: DatabaseShape,
  existing: RecipeWithIngredients,
  payload: UpdateRecipeDto
): RecipeWithIngredients => {
  let ingredientId = db.meta.lastIngredientId;

  const nextIngredients = payload.ingredients
    ? payload.ingredients.map((ingredient, index) => {
        ingredientId += 1;
        return {
          id: ingredientId,
          recipeId: existing.id,
          name: ingredient.name,
          weight: ingredient.weight,
          calories: ingredient.calories,
          protein: ingredient.protein,
          fat: ingredient.fat,
          carbs: ingredient.carbs,
          sortOrder: index
        };
      })
    : existing.ingredients;

  db.meta.lastIngredientId = ingredientId;

  return {
    ...existing,
    title: payload.title ?? existing.title,
    description: payload.description ?? existing.description,
    imageUrl: payload.image_url ?? existing.imageUrl,
    category: payload.category ?? existing.category,
    cookingTime: payload.cooking_time ?? existing.cookingTime,
    baseWeight: payload.base_weight ?? existing.baseWeight,
    caloriesPer100: payload.calories_per100 ?? existing.caloriesPer100,
    proteinPer100: payload.protein_per100 ?? existing.proteinPer100,
    fatPer100: payload.fat_per100 ?? existing.fatPer100,
    carbsPer100: payload.carbs_per100 ?? existing.carbsPer100,
    steps: payload.steps ?? existing.steps,
    ingredients: nextIngredients,
    updatedAt: new Date().toISOString()
  };
};