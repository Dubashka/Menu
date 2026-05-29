import { Ingredient, RecipeDetails } from '../types/recipe';

export const getCoefficient = (targetWeight: number | null, baseWeight: number) => {
  if (!targetWeight || targetWeight <= 0) {
    return 1;
  }
  return targetWeight / baseWeight;
};

export const scaleIngredient = (ingredient: Ingredient, coefficient: number): Ingredient => ({
  ...ingredient,
  weight: ingredient.weight * coefficient,
  calories: ingredient.calories * coefficient,
  protein: ingredient.protein * coefficient,
  fat: ingredient.fat * coefficient,
  carbs: ingredient.carbs * coefficient
});

export const sumNutrition = (ingredients: Ingredient[]) =>
  ingredients.reduce(
    (acc, item) => {
      acc.weight += item.weight;
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.fat += item.fat;
      acc.carbs += item.carbs;
      return acc;
    },
    { weight: 0, calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

export const buildNutritionForPortion = (recipe: RecipeDetails, targetWeight: number | null) => {
  const coefficient = getCoefficient(targetWeight, recipe.baseWeight);
  const scaledIngredients = recipe.ingredients.map((ingredient) => scaleIngredient(ingredient, coefficient));
  const totals = sumNutrition(scaledIngredients);

  return {
    coefficient,
    scaledIngredients,
    totals,
    selectedWeight: targetWeight && targetWeight > 0 ? targetWeight : recipe.baseWeight
  };
};